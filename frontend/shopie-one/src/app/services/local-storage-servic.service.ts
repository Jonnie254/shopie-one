import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { OrderDetails } from '../interfaces/order';

interface CartItem {
  product: OrderDetails;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private localStorageKey = 'cartItems';
  private items: CartItem[] = [];
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.loadCart();
    }
  }

  private saveCart() {
    if (this.isBrowser) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.items));
    }
  }

  private loadCart() {
    if (this.isBrowser) {
      const storedItems = localStorage.getItem(this.localStorageKey);
      if (storedItems) {
        console.log(storedItems);
        this.items = JSON.parse(storedItems);
      }
    }
  }

  addToCart(product: OrderDetails) {
    const existingItem = this.items.find(
      (item) => item.product.product_id === product.product_id
    );

    if (existingItem) {
      // Increase quantity based on the stored value
      existingItem.quantity += 1;
    } else {
      // Add new item with quantity 1
      this.items.push({ product, quantity: 1 });
    }

    // Update localStorage with the latest items
    this.saveCart();
  }

  removeItem(product_id: string) {
    if (this.isBrowser) {
      const index = this.items.findIndex(
        (item) => item.product.product_id === product_id
      );
      if (index !== -1) {
        this.items.splice(index, 1);
        this.saveCart();
      }
    }
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    if (this.isBrowser) {
      this.items = [];
      this.saveCart();
    }
  }
}
