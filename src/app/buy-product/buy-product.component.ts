import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../Services/product.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit{
  product: Product = {
    id: '',
    name: '',
    category: '',
    price: 0,
    description: '',
    imageUrl: '',
    availableItems: 0 // Ensure this is always initialized
  };
  selectedProduct: Product | null = null; // Ensure this is properly passed and assigned
  quantity: number = 1;
  paymentMethod: string = '';               // Store selected payment method
  userId: string = ''; // To store the user ID
  pieces: number = 1;                    // Initial quantity
  totalAmount: number = 0;                  // Total amount based on quantity
  location: string = '';                    // Store location
  constructor(private productService: ProductService,private route: ActivatedRoute, private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,) {}

  ngOnInit(): void {
      // Retrieve the selected product from the product service
  
      this.selectedProduct = this.productService.getSelectedProduct();
      if (this.selectedProduct) {
        this.updateTotalAmount();
      }
  }
  submitOrder(): void {
    if (this.selectedProduct) {
      const orderId = this.firestore.createId(); // Generate a unique order ID
      const order = {
        orderId: orderId,
        userId: this.userId,
        date: new Date(), // Store the current timestamp
        total: this.totalAmount,
        status: 'pending', // Set initial order status
        productDetails: {
          productId: this.selectedProduct.id,
          productName: this.selectedProduct.name,
          pieces: this.pieces,
          price: this.selectedProduct.price
        }
      };


      // Ensure the quantity does not exceed available items
      if (this.pieces > (this.selectedProduct?.quantity ?? 0)) {
        alert('The number of items exceeds the available quantity!');
        return;
      }
      this.firestore.collection('orders').doc(orderId).set(order)
      .then(() => {
        alert('Order submitted successfully!');
       
      })
      .catch(error => {
        console.error('Error submitting order: ', error);
        alert('Failed to submit order. Please try again later.');
      });
  
    //   // Submit the order to Firebase Firestore
    //   this.productService.submitOrder(order)
    //     .then(() => {
    //       alert('Order submitted successfully!');
    //       // Optionally, reset form or navigate to another page
    //     })
    //     .catch(error => {
    //       console.error('Error submitting order:', error);
    //       alert('Failed to submit order. Please try again later.');
    //     });
    }
  }
  updateTotalAmount() {
    if (this.selectedProduct) {
      this.totalAmount = this.selectedProduct.price * this.pieces;
    }
  }
}
