import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder,) {
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
      alert('Login Successful')
    }).catch((error: any) => {
      console.error(error);
      alert(error.message);
    })

    //   // if (this.loginForm.valid) {
    //   //   const { email, password, rememberMe } = this.loginForm.value;


    //   //   // Handle login logic here
    //   // }
    //   this.auth.login(this.email, this.password);
    //   this.email = '';
    //   this.password = '';
    //   this.router.navigate(['/comp-dashboard']);
  }
  loginWithGoogle() {
    this.auth.signInWithGoogle().then((res: any) => {
      this.router.navigateByUrl('dashboard');
    }).catch((error: any) => {
      console.error(error);
    });
  }
}
