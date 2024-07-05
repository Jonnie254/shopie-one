import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';
import { CheckoutDetails, OrderDetails } from '../../interfaces/order';
import { CartService } from '../../services/local-storage-servic.service';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-user-checkout',
  standalone: true,
  templateUrl: './user-checkout.component.html',
  styleUrl: './user-checkout.component.css',
  imports: [
    RouterOutlet,
    UserNavbarComponent,
    CommonModule,
  ],
})
export class UserCheckoutComponent {
  items: { product: OrderDetails; quantity: number }[] = [];
  userId: string | null = null;
  showConfirmationModal: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  showSuccessMessage = false;
  showErrorMessage: boolean = false;

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {
    this.loadCartItems();
    this.userId = localStorage.getItem('user_id');
  }

  confirmCheckout() {
    if (this.items.length === 0) {
      this.showErrorMessage = true;
      setTimeout(() => {
        this.showErrorMessage = false;
      }, 3000);
    } else {
      this.showConfirmationModal = true;
    }
  }
  loadCartItems() {
    this.items = this.cartService.getItems();
  }
  cancel() {
    this.showConfirmationModal = false;
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
  placeOrder() {
    this.showConfirmationModal = false;
    this.showSuccessMessage = true;

    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
    const orderItems: OrderDetails[] = this.items.map((item) => ({
      product_id: item.product.product_id,
      product_name: item.product.product_name,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const totalPrice = orderItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    const order: CheckoutDetails = {
      user_id: this.userId || '',
      order_id: '',
      order_items: orderItems,
      total_price: totalPrice,
    };

    this.orderService.placeOrder(order).subscribe(
      (response) => {
        console.log('Order placed successfully', response);
        this.cartService.clearCart();
        this.loadCartItems();
      },
      (error) => {
        console.error('Error placing order', error);
      }
    );
  }
}
