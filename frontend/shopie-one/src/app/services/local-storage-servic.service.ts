import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { OrderDetails } from '../interfaces/order';
import { BehaviorSubject } from 'rxjs';

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

  // BehaviorSubject to track the item count
  private itemCountSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  itemCount$ = this.itemCountSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.loadCart();
    }
  }

  private saveCart() {
    if (this.isBrowser) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.items));
      this.itemCountSubject.next(this.getTotalItemCount());
    }
  }

  private loadCart() {
    if (this.isBrowser) {
      const storedItems = localStorage.getItem(this.localStorageKey);
      if (storedItems) {
        this.items = JSON.parse(storedItems);
        this.itemCountSubject.next(this.getTotalItemCount());
      }
    }
  }

  addToCart(product: OrderDetails) {
    const existingItem = this.items.find(
      (item) => item.product.product_id === product.product_id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ product, quantity: 1 });
    }

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

  increaseQuantity(product_id: string) {
    const existingItem = this.items.find(
      (item) => item.product.product_id === product_id
    );

    if (existingItem) {
      existingItem.quantity += 1;
      this.saveCart();
    }
  }

  decreaseQuantity(product_id: string) {
    const existingItem = this.items.find(
      (item) => item.product.product_id === product_id
    );

    if (existingItem) {
      existingItem.quantity -= 1;
      if (existingItem.quantity === 0) {
        this.removeItem(product_id);
      } else {
        this.saveCart();
      }
    }
  }

  getTotalItemCount(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
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
