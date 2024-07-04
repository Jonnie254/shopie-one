import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { UsersService } from '../../services/users.service';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css',
})
export class SalesComponent implements OnInit {
  orders: any[] = [];
  displayedOrders: any[] = [];

  constructor(
    private orderService: OrderService,
    private usersService: UsersService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.orderService.getAllOrders().subscribe((orders: any) => {
      this.orders = orders.orders;
      this.populateOrderDetails();
    });
  }

  populateOrderDetails() {
    const userRequests = this.orders.map((order) =>
      this.usersService.getUserDetails(order.user_id)
    );
    const productRequests = this.orders.map((order) =>
      this.productService.getProduct(order.product_id)
    );

    forkJoin([...userRequests, ...productRequests]).subscribe(
      (responses: any) => {
        const users = responses.slice(0, this.orders.length);
        const products = responses.slice(this.orders.length);

        this.displayedOrders = this.orders.map((order, index) => ({
          ...order,
          username: users[index].name,
          productName: products[index].name,
        }));
      }
    );
  }
}
