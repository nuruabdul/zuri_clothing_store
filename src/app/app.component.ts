import { Component,OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { CartService } from './Services/cart.service';
import { Product } from './models/product';
import { SidebarComponent } from './sidebar/sidebar.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'zuri_clothing_store';
  isSidebarActive = false;
  isLoggedIn = false; // Set this based on your authentication logic
  cartItemCount: number = 0;
isNavbarActive = false
    cartItems: Product[] = [];

  @ViewChild(SidebarComponent) sidebarComponent!: SidebarComponent;
  faShoppingCart = faShoppingCart;
  faSignOutAlt = faSignOutAlt;
  constructor(private fireAuth: AngularFireAuth, private router: Router,private cartService: CartService) {}

  ngOnInit(): void {
    // Check the user's authentication state
    this.fireAuth.authState.subscribe(user => {
      this.isLoggedIn = !!user;
    });
       // Subscribe to cart items to update count
       this.cartService.getCartItems().subscribe(items => {
        this.cartItems = items;
        this.cartItemCount = items.length;
      });
    // this.updateCartCount();
    // this.loadCartItems();
  }


  toggleSidebar() {
    this.sidebarComponent.toggleSidebar();
  }

  togglenavbar(){
   
  }
  // updateCartCount() {
  //   this.cartService.getCartItemCount().subscribe(count => {
  //     this.cartItemCount = count;
  //   });
  // }
  loadCartItems() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }
  
  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId);
    this.loadCartItems();
  }
  
  
  
  

  calculateTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  }
  logout() {
    this.fireAuth.signOut().then(() => {
      this.isLoggedIn = false;
      this.router.navigate(['/login']);  // Navigate to login after logout
    });
  }
}
