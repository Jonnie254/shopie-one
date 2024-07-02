import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent {
  showProductForm: boolean = false;
  showOverlay: boolean = false;

  toggleProductForm() {
    this.showProductForm = !this.showProductForm;
    this.showOverlay = !this.showOverlay;
  }
}
