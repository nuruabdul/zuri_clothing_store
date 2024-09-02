import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { CartService } from '../Services/cart.service';
import { faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isSidebarActive: boolean = true;

  isLoggedIn = false; // Set this based on your authentication logic
  cartItemCount: number = 0;
isNavbarActive = false

  isMenClothingExpanded: boolean = false;
  isWomenClothingExpanded: boolean = false;
  isKidsClothingExpanded: boolean = false;

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  toggleMenClothing(event: Event) {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
    this.isMenClothingExpanded = !this.isMenClothingExpanded;
  }

  toggleWomenClothing(event: Event) {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
    this.isWomenClothingExpanded = !this.isWomenClothingExpanded;
  }

  toggleKidsClothing(event: Event) {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
    this.isKidsClothingExpanded = !this.isKidsClothingExpanded;
  }
}