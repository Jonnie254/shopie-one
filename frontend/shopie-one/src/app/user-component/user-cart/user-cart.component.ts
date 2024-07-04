import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductDetails } from '../../interfaces/products';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';
import { CommonModule } from '@angular/common';
import { UserComponentComponent } from '../user-component.component';
import { CartService } from '../../services/local-storage-servic.service';

@Component({
  selector: 'app-user-cart',
  standalone: true,
  templateUrl: './user-cart.component.html',
  styleUrl: './user-cart.component.css',
  imports: [
    UserNavbarComponent,
    CommonModule,
    RouterOutlet,
    UserComponentComponent,
  ],
})
export class UserCartComponent {
  product: ProductDetails | null = null;
  productId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {
    const product_id = this.route.snapshot.paramMap.get('product_id');
    if (product_id) {
      this.getOneProduct(product_id);
    }
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart({
        product_id: this.product.product_id,
        product_name: this.product.product_name,
        quantity: 1,
        price: this.product.product_price,
      });
      console.log('Product added to cart:', this.product);
    } else {
      console.error('No product selected to add to cart.');
    }
  }

  getOneProduct(product_id: string): void {
    this.productService.getProduct(product_id).subscribe(
      (response: any) => {
        this.product = response.product;
        console.log('Product:', this.product);
      },
      (error) => {
        console.error('Error fetching product:', error);
      }
    );
  }
}
