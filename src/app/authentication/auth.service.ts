import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth, private router: Router) { }



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
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    });
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


