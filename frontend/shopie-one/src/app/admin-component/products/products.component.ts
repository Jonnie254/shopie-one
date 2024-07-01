import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  showProductForm: boolean = false;
  showOverlay: boolean = false;

  toggleProductForm() {
    this.showProductForm = !this.showProductForm;
    this.showOverlay = !this.showOverlay;
  }
}
