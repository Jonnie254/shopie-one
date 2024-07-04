import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  placeOrder(order: any) {
    return this.http.post('http://localhost:5700/orders/place-order', order);
  }
  getAllOrders() {
    return this.http.get('http://localhost:5700/orders/all-orders');
  }
}
