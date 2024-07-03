import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';
import { OrderDetails } from '../../interfaces/order';
import { CartService } from '../../services/local-storage-servic.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-checkout',
  standalone: true,
  templateUrl: './user-checkout.component.html',
  styleUrl: './user-checkout.component.css',
  imports: [RouterOutlet, UserNavbarComponent, CommonModule],
})
export class UserCheckoutComponent {
  items: OrderDetails[] = [];

  constructor(private cartService: CartService) {
    this.loadCartItems();
    this.items = this.cartService.getItems().map((item) => item.product);
  }

  loadCartItems() {
    this.items = this.cartService.getItems().map((item) => item.product);
  }

  removeItem(product_id: string) {
    console.log('Removing item:', product_id);
    this.cartService.removeItem(product_id);
    this.loadCartItems();
  }
}
