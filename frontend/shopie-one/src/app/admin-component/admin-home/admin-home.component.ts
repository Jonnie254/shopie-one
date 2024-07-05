import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartModule } from 'primeng/chart';
import { OrderService } from '../../services/order.service';
import { UsersService } from '../../services/users.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [ChartModule, CommonModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css',
})
export class AdminHomeComponent {
  orders: any[] = [];
  ordersPerDay: any[] = [];
  ordersPerDayChart: any;
  chartOptions: any;
  totalRevenue: number = 0;
  totalUsers: number = 0;
  totalProducts: number = 0;

  constructor(
    private orderService: OrderService,
    private userservice: UsersService,
    private productService: ProductService
  ) {
    this.fetchOrders();
    this.fetchUsers();
    this.fetchProducts();
  }
  fetchOrders() {
    this.orderService.getAllOrders().subscribe((response: any) => {
      this.orders = response.orders;
      this.calculateOrdersPerDay();
      this.calculateTotalRevenue();
    });
  }

  fetchProducts() {
    this.productService.getProducts().subscribe(
      (response: any) => {
        const products = response.products;
        this.totalProducts = products.length;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  fetchUsers() {
    this.userservice.getAllUsers().subscribe(
      (response: any) => {
        const users = response.users;
        this.totalUsers = users.length;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  calculateTotalRevenue() {
    this.totalRevenue = this.orders.reduce(
      (acc, order) => acc + order.total_price,
      0
    );
  }
  calculateOrdersPerDay() {
    const ordersCountMap = new Map<string, number>();
    this.orders.forEach((order) => {
      const orderDate = new Date(order.order_date).toLocaleDateString();
      if (ordersCountMap.has(orderDate)) {
        ordersCountMap.set(orderDate, ordersCountMap.get(orderDate)! + 1);
      } else {
        ordersCountMap.set(orderDate, 1);
      }
    });

    this.ordersPerDay = Array.from(ordersCountMap, ([date, count]) => ({
      date,
      count,
    }));

    this.ordersPerDayChart = {
      labels: this.ordersPerDay.map((data) => data.date),
      datasets: [
        {
          label: 'Orders per Day',
          data: this.ordersPerDay.map((data) => data.count),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 0.5,
        },
      ],
    };
  }
}
