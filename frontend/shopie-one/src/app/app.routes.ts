import { Routes } from '@angular/router';
import { SidebarComponent } from './admin-component/sidebar/sidebar.component';
import { LoginComponent } from './admin-user/login/login.component';
import { ProductsComponent } from './admin-component/products/products.component';
import { CustomerComponent } from './admin-component/customer/customer.component';
import { RegisterComponent } from './admin-user/register/register.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    component: SidebarComponent,
    children: [
      { path: 'product', component: ProductsComponent },
      { path: 'customer', component: CustomerComponent },
    ],
  },
];
