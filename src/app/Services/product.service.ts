import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

export interface Product {
  id?: string;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
}
// This file defines the ProductService which interacts with Firebase Firestore,
//  for product data and Firebase Storage for product images.
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsCollection = this.firestore.collection<Product>('products');

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  addProduct(product: Product, file: File): Promise<void> {
    return this.uploadImage(file).then((url) => {
      product.imageUrl = url;
      return this.productsCollection.add(product).then(() => void 0);  // Ensures the return type is Promise<void>
    });
  }
  
  private uploadImage(file: File): Promise<string> {
  
    const filePath = `products/${file.name}_${Date.now()}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    return fileRef.put(file).then(() => fileRef.getDownloadURL().toPromise())
    .catch(error => {
      console.error('Upload failed:', error);
      throw error;
    });
  //   return task.snapshotChanges().pipe(
  //     finalize(() => fileRef.getDownloadURL()),
  //     switchMap(() => fileRef.getDownloadURL())
  //   ).toPromise();
  }
  
  getProducts(): Observable<Product[]> {
    return this.productsCollection.valueChanges({ idField: 'id' });
  }

  updateProduct(id: string, product: Product): Promise<void> {
    return this.productsCollection.doc(id).update(product);
  }

  deleteProduct(id: string): Promise<void> {
    return this.productsCollection.doc(id).delete();
  }
}
