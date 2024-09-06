import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user$!: Observable<any>;
  // private userName = 'Nuru';
  private email = '';
  constructor(private fireauth: AngularFireAuth, private router: Router) { 
    this.user$ = this.fireauth.authState;
  }

 // Method to check if the user is logged in
 isLoggedIn(): Observable<any> {
  return this.fireauth.authState.pipe(
    map(user => !!user)
    // Return true if a user exists, otherwise false
  );
}
getUserEmail():Observable<string> {
  return this.fireauth.authState.pipe(
    map(user => user ? user.email || '' : '')
  );
}

  // Register method
  register(user : {email: string, password: string}) {
    return this.fireauth.createUserWithEmailAndPassword(user.email, user.password);
  //.then(res => {
  //     if (res.user) {
  //       alert('Registration Successful');
  //       this.sendEmailVerification(res.user);
  //       this.router.navigate(['/login']);
  //     }
  //   }, err => {
  //     alert(err.message);
  //     this.router.navigate(['/register']);
  //   });
  }
  // Login method
  login(user : {email: string, password: string}) {
    return this.fireauth.signInWithEmailAndPassword(user.email, user.password);
  }
  // login(email: string, password: string) {
  //   this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
  //     if (res.user) {
  //       localStorage.setItem('token', 'true');
  //       if (res.user.emailVerified) {
  //         this.router.navigate(['dashboard']);
  //       } else {
  //         this.router.navigate(['/verify-email']);
  //       }
  //     }
  //   }, err => {
  //     alert(err.message);
  //     this.router.navigate(['/login']);
  //   });
  // }
  // Sign out

   // Fetch current user data
   getUserData() {
    return this.fireauth.authState;
  }
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    });
    return this.fireauth.signOut();
  }

  // Forgot password
  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/verify-email']);
    }, err => {
      alert('Something went wrong');
    });
  }

  // Email verification
  sendEmailVerification(user: any) {
    if (user) {
      user.sendEmailVerification().then(() => {
        this.router.navigate(['/verify-email']);
      }, (err: any) => {
        alert('Something went wrong. Not able to send mail to your email.');
      });
    }
  }
  getCompanyId(): Promise<string | null> {
    return this.fireauth.currentUser.then(user => {
      if (user) {
        // Assuming the company ID is stored in the user's custom claims or user metadata
        return user.uid;  // Replace with the appropriate logic to get the company ID
      }
      return null;
    });
  }
  
  // Sign in with Google
  
 signInWithGoogle() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider())
    // .then(res => {
    //   if (res.user) {
    //     this.router.navigate(['/dashboard']);
    //     localStorage.setItem('token', JSON.stringify(res.user.uid));
    //   }
    // }, err => {
    //   alert(err.message);
    // });
  }

}


