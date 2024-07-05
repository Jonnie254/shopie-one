import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from './admin-user/register/register.component';
import { UserComponentComponent } from './user-component/user-component.component';
import { UserCartComponent } from './user-component/user-cart/user-cart.component';
import { UserCheckoutComponent } from './user-component/user-checkout/user-checkout.component';
import { LandingPageComponent } from './user-component/landing-page/landing-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    RegisterComponent,
    UserComponentComponent,
    UserCartComponent,
    UserCheckoutComponent,
    LandingPageComponent,
  ],
})
export class AppComponent {
  title = 'shopie-one';
}
