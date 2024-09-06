import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  hide: boolean = true;
  passwordControl: FormControl = new FormControl('', Validators.required);


  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })
  constructor(
    private auth: AuthService,
     private router: Router,
      private fb: FormBuilder,
      private snackBar:MatSnackBar) {
  }
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],

    });
  }
  onLogin() {
    console.log(this.loginForm.value);
    const userData = Object.assign(this.loginForm.value, { email: this.loginForm.value.email });
    console.log(userData);

    this.auth.login(userData).then((res: any) => {
      this.router.navigateByUrl('/products');
      this.snackBar.open('Login Successful', 'Close', { 
        duration: 3000,
        panelClass: ['custom-snackbar']
      });
      
    }).catch((error: any) => {
      console.error(error);
      this.snackBar.open(error.message, 'Close', { duration: 3000 });
    })

  }
  loginWithGoogle() {
    this.auth.signInWithGoogle().then((res: any) => {
      this.router.navigateByUrl('products');
      this.snackBar.open('Google SignIn Successful', 'Close', { duration: 3000 });
    }).catch((error: any) => {
      console.error(error);
      this.snackBar.open('Google SignIn Failed. Try again later.', 'Close', { duration: 3000 });
    });
  }
}
