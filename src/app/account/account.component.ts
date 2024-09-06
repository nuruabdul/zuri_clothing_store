import { Component,OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { ProductService } from '../Services/product.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})


export class AccountComponent implements OnInit {
  user: any; // Firebase user data
  userOrders$!: Observable<any[]>; // Observable for user orders from Firestore
  userId: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch logged-in user's data from Firebase Auth
  this.afAuth.authState.subscribe(user => {
    if (user) {
      this.user = user;
      this.userId = user.uid;

      // Fetch user orders from Firestore
      this.userOrders$ = this.firestore
        .collection('orders', ref => ref.where('userId', '==', this.userId))
        .valueChanges();
    }
  });
  }

  updateProfile(): void {
    // Logic to update profile information (such as name) in Firebase Auth or Firestore
    if (this.user) {
      this.user.updateProfile({
        displayName: this.user.displayName,
        photoURL: this.user.photoURL
      }).then(() => {
        console.log('Profile updated successfully');
        alert('Profile updated successfully')
      }).catch((error: any) => {
        console.error('Error updating profile: ', error);
      });
    }
  }

  logout(): void {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
