import { Routes } from '@angular/router';
import { SidebarComponent } from './admin-component/sidebar/sidebar.component';
import { LoginComponent } from './admin-user/login/login.component';
import { ProductsComponent } from './admin-component/products/products.component';
import { CustomerComponent } from './admin-component/customer/customer.component';
import { UserComponentComponent } from './user-component/user-component.component';
import { RegisterComponent } from './admin-user/register/register.component';
import { ProfileComponent } from './admin-user/profile/profile.component';
import { UserNavbarComponent } from './user-component/user-navbar/user-navbar.component';
import { UserCartComponent } from './user-component/user-cart/user-cart.component';
import { ForgotPasswordComponent } from './admin-user/forgot-password/forgot-password.component';
import { Login2Component } from './user-component/login2/login2.component';
import { UserCheckoutComponent } from './user-component/user-checkout/user-checkout.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    component: SidebarComponent,
    children: [
      { path: 'product', component: ProductsComponent },
      { path: 'customer', component: CustomerComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
  {
    path: 'users',
    component: Login2Component,
    children: [
      { path: 'view/:product_id', component: UserCartComponent },
      {
        path: 'products',
        component: UserComponentComponent,
      },
      { path: 'checkout', component: UserCheckoutComponent },
    ],
  },
];
