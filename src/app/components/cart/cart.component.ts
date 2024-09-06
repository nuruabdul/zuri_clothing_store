import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { Product } from '../../models/product';
import { ProductService } from 'src/app/Services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: { id: string, name: string, price: number, pieces?: number, imageUrl: string }[] = [];
  totalPrice: number = 0;
  products: any[] = [];

  constructor(private cartService: CartService,
    private productService:ProductService,
    private router:Router
    ) {}

  ngOnInit(): void {
    this.loadCartItems();
   
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice(): void {
    
    this.totalPrice = this.cartItems.reduce((total, item) => {
      const quantity = item.pieces ?? 1; // Default to 1 if pieces is undefined
      return total + (item.price * quantity);
    }, 0);
  }

  removeFromCart(productId: string): void {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.calculateTotalPrice();
  }
  buyProduct(item:Product) {
    this.productService.setSelectedProduct(item);
    this.router.navigate(['/buy'], { state: { selectedProduct: item, } });
  

    // this.productService.updateProduct(product.id!, {
    //   ...product,
    //   availableItems: product.availableItems - product.quantity
    // }).then(() => {
    //   alert("Purchase successful!");
    //   this.addToCart(product);
    // }).catch(error => {
    //   console.error("Purchase failed:", error);
    //   alert("Purchase failed. Please try again.");
    // });
  
      // Navigate to the buy product component or pass data
      // Example: Assuming you are navigating to a different route with product data
    
    }
}
