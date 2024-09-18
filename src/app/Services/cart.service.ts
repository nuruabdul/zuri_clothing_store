import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { Product } from '../models/product';
import { BehaviorSubject, Observable, of, } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartCollectionName = 'cart';

  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private authService: AuthService, private firestore: AngularFirestore) {}

  // Add product to cart
  // addToCart(product: Product) {
  //   return this.firestore.collection(this.cartCollectionName).add(product);
  // }
  addToCart(product: Product) {
    this.authService.getUserId().subscribe(userId => {
      if (userId) {
        this.firestore.collection('users').doc(userId).collection('cart').doc(product.id).set(product)
          .then(() => {
            const currentItems = this.cartItemsSubject.value;
            this.cartItemsSubject.next([...currentItems, product]);
          });
      }
    });
  }
  // Get all items in the cart
  // getCartItems(): Observable<Product[]> {
  //   return this.firestore.collection<Product>(this.cartCollectionName).valueChanges({ idField: 'id' });
  // }
   // Get all items in the cart
   getCartItems(): Observable<Product[]> {
    return this.authService.getUserId().pipe(
      switchMap(userId => {
        if (userId) {
          return this.firestore.collection('users').doc(userId).collection('cart').valueChanges().pipe(
            map((data: DocumentData[]) => data.map((doc: any) => ({
              id: doc.id,
              ...doc // Spread the rest of the properties
            }) as Product))
          );
        } else {
          return of([]); // Return an empty array if userId is not available
        }
      })
    );
  }

   // Remove item from cart
   removeFromCart(productId: string) {
    this.authService.getUserId().subscribe(userId => {
      if (userId) {
        this.firestore.collection('users').doc(userId).collection('cart').doc(productId).delete()
          .then(() => {
            const updatedItems = this.cartItemsSubject.value.filter(item => item.id !== productId);
            this.cartItemsSubject.next(updatedItems);
          });
      }
    });
  }
}
