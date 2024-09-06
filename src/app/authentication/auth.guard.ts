import { CanActivateFn,Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import {  inject } from '@angular/core';

// Using CanActivateFn: 
// We have implemented the authGuard as a function using the CanActivateFn provided by Angular.

// Dependency Injection with inject():
// Instead of passing services via constructor (like in class-based guards), we use the inject() function to inject the AuthService and Router.

export const authGuard: CanActivateFn = (route, state) => {
   // Injecting services (Router and AuthService)
   const authService = inject(AuthService);
   const router = inject(Router);
    // Check if user is logged in
  return authService.isLoggedIn().pipe(
    take(1), // Take the first value and complete the observable
    map(user => {
      if (user) {
        return true;  // Allow access if user is authenticated
      } else {
        // Redirect to the login page if user is not authenticated
        router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    })
  );

};
// Check for Authentication:

// The authService.isLoggedIn() method returns an observable that emits the current authentication status.
// We use .pipe(take(1)) to automatically complete the observable after the first value is emitted.

// 
// 