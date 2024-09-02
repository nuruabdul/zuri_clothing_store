import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from '../models/product';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartCollectionName = 'cart';
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private firestore: AngularFirestore) {}

  // Add product to cart
  // addToCart(product: Product) {
  //   return this.firestore.collection(this.cartCollectionName).add(product);
  // }
  addToCart(product: Product) {
    const currentItems = this.cartItemsSubject.value;
    this.cartItemsSubject.next([...currentItems, product]);
  }
  // Get all items in the cart
  // getCartItems(): Observable<Product[]> {
  //   return this.firestore.collection<Product>(this.cartCollectionName).valueChanges({ idField: 'id' });
  // }
  getCartItems() {
    return this.cartItems$;
  }

  // Remove item from cart
  removeFromCart(productId: string) {
    const updatedItems = this.cartItemsSubject.value.filter(item => item.id !== productId);
    this.cartItemsSubject.next(updatedItems);
  }
  // removeFromCart(productId: string) {
  //   const currentItems = this.cartItemsSubject.value.filter(item => item.id !== productId);
  //   this.cartItemsSubject.next(currentItems);
  // }
}
