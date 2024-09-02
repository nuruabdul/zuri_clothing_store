import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId);
    this.loadCartItems(); // Reload cart items after removal
    console.log('Item removed from cart');
  }
}
