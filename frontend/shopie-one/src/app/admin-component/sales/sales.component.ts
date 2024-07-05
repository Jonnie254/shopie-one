import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css',
})
export class SalesComponent {
  orders: any[] = [];
  displayedOrders: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor(private orderService: OrderService) {
    this.fetchOrders();
  }

  fetchOrders() {
    this.orderService.getAllOrders().subscribe((orders: any) => {
      this.orders = orders.orders;
      this.displayedOrders = orders.orders;
    });
  }

  updateDisplayedOrders() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedOrders = this.orders.slice(startIndex, endIndex);
  }
  goToPage(page: number) {
    this.currentPage = page;
    this.updateDisplayedOrders();
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.updateDisplayedOrders();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedOrders();
    }
  }

  totalPages() {
    return Math.ceil(this.orders.length / this.itemsPerPage);
  }
}
