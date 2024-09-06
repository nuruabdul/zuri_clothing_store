import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { AddProductComponent } from './add-product/add-product.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { authGuard } from './authentication/auth.guard';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  { 
    path: '', redirectTo: '/dashboard', pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'dashboard', component: DashboardComponent},
  {
     path: 'products', 
     component: ProductListComponent,
     canActivate: [authGuard],  // Protect this route
    },
  { path: 'cart', component: CartComponent,
  canActivate: [authGuard], 
  }, // Protect this route},

  { path: 'add-products',
   component: AddProductComponent,
   canActivate: [authGuard], },

  { 
    path: 'buy',
     component: BuyProductComponent,
     canActivate: [authGuard], 
    },
  { 
    path: 'account',
     component: AccountComponent,
     canActivate: [authGuard], 
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
