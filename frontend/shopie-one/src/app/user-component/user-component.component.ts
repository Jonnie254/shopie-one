import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserNavbarComponent } from './user-navbar/user-navbar.component';
import { CommonModule } from '@angular/common';
import { UserCartComponent } from './user-cart/user-cart.component';
import { ProductService } from '../services/product.service';
import { ProductDetails } from '../interfaces/products';

@Component({
  selector: 'app-user-component',
  standalone: true,
  templateUrl: './user-component.component.html',
  styleUrl: './user-component.component.css',
  imports: [
    RouterOutlet,
    UserNavbarComponent,
    CommonModule,
    UserCartComponent,
    RouterLink,
  ],
})
export class UserComponentComponent {
  products: ProductDetails[] = [];
  constructor(private Router: Router, private productservice: ProductService) {
    this.getAllProducts();
  }

  getOneProduct(product_id: string) {
    this.productservice.getProduct(product_id).subscribe(
      (response: any) => {
        this.products = response.product;
      },
      (error) => {
        console.error('Error fetching product:', error);
      }
    );
  }

  navitagateToProduct(index: number) {
    let product = this.products[index];
    let product_id = product.product_id;
    this.Router.navigate(['user/view', product_id]);
  }
  getAllProducts() {
    this.productservice.getProducts().subscribe(
      (response: any) => {
        console.log('Products:', response);
        this.products = response.products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
