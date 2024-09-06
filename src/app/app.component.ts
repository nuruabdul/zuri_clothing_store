import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { CartService } from './Services/cart.service';
import { Product } from './models/product';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthService } from './authentication/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'zuri_clothing_store';
  isSidebarActive = false;
  popularProducts: any[] = [];
  isLoggedIn: boolean = false; // Set this based on your authentication logic
  cartItemCount: number = 0;
  isNavbarActive = false
  email: string = '';
  greeting: string = '';
  cartItems: Product[] = [];

  @ViewChild(SidebarComponent) sidebarComponent!: SidebarComponent;
  faShoppingCart = faShoppingCart;
  faSignOutAlt = faSignOutAlt;
  constructor(private fireAuth: AngularFireAuth, private authService: AuthService, private router: Router, private cartService: CartService) { 
     // Subscribe to authentication state changes
     this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
        this.email = user.displayName || user.email || 'User';  // Use display name or email as username
      } else {
        this.isLoggedIn = false;
        this.email = '';
      }
    });
  }

  ngOnInit(): void {
    // Subscribe to the user's authentication state
    this.authService.isLoggedIn().subscribe(user => {
      this.isLoggedIn = !!user;  // If user is logged in, set isLoggedIn to true
      if (this.isLoggedIn) {
        this.authService.getUserEmail().subscribe(email =>{
          this.email = email; // Set the email to display in Navbar.
          this.greeting = this.getGreeting(email);
        });
      }
    });   
    // Subscribe to cart items to update count
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.cartItemCount = items.length;
    });
    // this.updateCartCount();
    // this.loadCartItems();
  }

    // Method to format the email into a greeting
    getGreeting(email:string):string{
      const name = email.split('@')[0].replace( /[^a-zA-Z]/g, ''); 
      return `Hi! ${name}`;
      //Get the part before "@"
   
    }

  


  toggleSidebar() {
    this.sidebarComponent.toggleSidebar();
  }

  togglenavbar() {

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
    this.authService.logout().then(() => {
      this.router.navigate(['/dashboard']);  // Redirect to login page after logout
      this.isLoggedIn = false;
      this.email = '';
    });
  }
}
