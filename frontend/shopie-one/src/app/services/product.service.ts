import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductDetails } from '../interfaces/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  createProduct(new_product: ProductDetails) {
    return this.http.post('http://localhost:5700/products/create', new_product);
  }
  getProducts() {
    return this.http.get(' http://localhost:5700/products/all-products');
  }
  updateProduct(product_id: string, updateProduct: ProductDetails) {
    return this.http.put(
      `http://localhost:5700/products/${product_id}`,
      updateProduct
    );
  }
  deleteProduct(product_id: string) {
    return this.http.delete(`http://localhost:5700/products/${product_id}`);
  }
}
