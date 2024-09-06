import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm!: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  password: string = '';
  email: string = '';

  constructor(private fb: FormBuilder,private snackBar: MatSnackBar, private auth : AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      telephone: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  registerWithEmailandPassword(): void {
  const userData = Object.assign(this.signupForm.value, {email: this.signupForm.value.email});
  this.auth.register(userData).then((res: any)=>{
    this.router.navigateByUrl('login');
    this.snackBar.open('SignUp Successful!', 'Close', { duration: 3000 });
    }).catch((error: any) => {
  }).catch((error:any)=>{
    console.error(error);
    this.snackBar.open('An error occurred. Try again later!', 'Close', { duration: 3000 });
  })
 
  }


}