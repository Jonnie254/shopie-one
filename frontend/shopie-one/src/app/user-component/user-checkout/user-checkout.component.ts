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
  items: { product: OrderDetails; quantity: number }[] = [];

  constructor(private cartService: CartService) {
    this.loadCartItems();
  }

  loadCartItems() {
    this.items = this.cartService.getItems();
  }

  removeItem(product_id: string) {
    this.cartService.removeItem(product_id);
    this.loadCartItems();
  }
  increaseQuantity(product_id: string) {
    this.cartService.increaseQuantity(product_id);
    this.loadCartItems();
  }

  decreaseQuantity(product_id: string) {
    this.cartService.decreaseQuantity(product_id);
    this.loadCartItems();
  }
}
