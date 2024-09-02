import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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

  constructor(private fb: FormBuilder, private auth : AuthService, private router: Router) { }

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
    alert("SignUp Successful!")
  }).catch((error:any)=>{
    console.error(error);
    error.message;
    alert("An error occured.Try again later!")
  })
  //   if (this.signupForm.valid) {
  //     const { name, email, password, confirmPassword } = this.signupForm.value;
    
  //     this.auth.register(this.email, this.password);
  //     this.email = '';
  //     this.password = '';
  //   }
  }



  // ngOnInit(): void {
  // }

  // onSignup() {

  //   // if(this.email == '') {
  //   //   alert('Please enter email');
  //   //   return;
  //   // }

  //   // if(this.password == '') {
  //   //   alert('Please enter password');
  //   //   return;
  //   // }

  //   this.auth.register(this.email,this.password);
    
  //   this.email = '';
  //   this.password = '';

  // }

}