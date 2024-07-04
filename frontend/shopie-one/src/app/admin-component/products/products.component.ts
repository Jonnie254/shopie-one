import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProductDetails } from '../../interfaces/products';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  spinnerVisible: boolean = false;
  productForm: FormGroup = new FormGroup({});
  showProductForm: boolean = false;
  showOverlay: boolean = false;
  editMode: boolean = false;
  currentProduct: any = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  products: ProductDetails[] = [];
  isDeleteModalVisible: boolean = false;
  productToDelete: ProductDetails | null = null;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.getAllProducts();
    this.createForm();
  }

  getAllProducts() {
    this.productService.getProducts().subscribe(
      (response: any) => {
        console.log('Products:', response);
        this.products = response.products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  get f() {
    return this.productForm.controls;
  }

  createForm() {
    this.productForm = this.fb.group({
      product_name: ['', Validators.required],
      product_description: ['', Validators.required],
      product_price: ['', Validators.required],
      product_quantity: ['', Validators.required],
      product_image: ['', Validators.required],
      product_category: ['Clothes', Validators.required],
    });
  }

  showSpinner() {
    this.spinnerVisible = true;
  }

  hideSpinner() {
    this.spinnerVisible = false;
  }

  toggleProductForm() {
    this.showProductForm = !this.showProductForm;
    this.showOverlay = !this.showOverlay;
  }

  imageurl: string = '';
  getImagesUrl(event: any) {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'tours_travel');
      formData.append('cloud_name', 'do9a5sjgi');
      this.imageurl = '';
      this.showSpinner();

      fetch('https://api.cloudinary.com/v1_1/do9a5sjgi/image/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          this.imageurl = result.url;
          this.productForm.patchValue({ product_image: this.imageurl });
          setTimeout(() => {
            this.hideSpinner();
          }, 2000);
        })
        .catch((error) => {
          console.error('Error:', error);
          this.hideSpinner();
        });
    }
  }

  showDeleteModal(product: ProductDetails): void {
    this.productToDelete = product;
    this.isDeleteModalVisible = true;
  }

  hideDeleteModal(): void {
    this.isDeleteModalVisible = false;
    this.productToDelete = null;
  }

  confirmDelete(): void {
    if (this.productToDelete && this.productToDelete.product_id) {
      this.onDeleteProduct(this.productToDelete.product_id);
      this.hideDeleteModal();
    } else {
      console.error('Product ID is undefined.');
    }
  }
  onAddProduct() {
    this.editMode = false;
    this.productForm.reset();
    this.toggleProductForm();
  }

  patchFormValues(product: ProductDetails) {
    this.productForm.patchValue({
      product_name: product.product_name,
      product_description: product.product_description,
      product_price: product.product_price,
      product_quantity: product.product_quantity,
      product_image: product.product_image,
      product_category: product.product_category,
    });
  }

  onEditProduct(product: ProductDetails) {
    this.editMode = true;
    this.currentProduct = product;
    this.patchFormValues(product);
    this.productForm.patchValue(product);
    this.toggleProductForm();
  }

  createProduct() {
    if (this.productForm.valid) {
      const product = this.productForm.value;

      if (this.editMode) {
        const productId = this.currentProduct.product_id;
        if (productId) {
          this.productService.updateProduct(productId, product).subscribe(
            (response) => {
              console.log('Product updated successfully:', response);
              this.successMessage = 'Product updated successfully';
              setTimeout(() => {
                this.successMessage = null;
              }, 3000);
              this.errorMessage = null;
              this.toggleProductForm();
              this.productForm.reset();
              this.clearMessagesAfterTimeout();
            },
            (error) => {
              console.error('Error updating product:', error);
              this.successMessage = null;
              this.errorMessage = 'Error updating product. Please try again.';
              this.clearMessagesAfterTimeout();
            }
          );
        }
      } else {
        this.productService.createProduct(product).subscribe(
          (response) => {
            this.toggleProductForm();
            this.productForm.reset();
            this.successMessage = 'Product created successfully';
            setTimeout(() => {
              this.successMessage = null;
            }, 3000);
            this.getAllProducts();
            this.clearMessagesAfterTimeout();
          },
          (error) => {
            console.error('Error creating product:', error);
            this.successMessage = null;
            this.errorMessage = 'Error creating product. Please try again.';
            this.clearMessagesAfterTimeout();
          }
        );
      }
    } else {
      console.error('Form is invalid. Cannot submit.');
    }
  }

  onDeleteProduct(product_id: string): void {
    if (product_id) {
      this.productService.deleteProduct(product_id).subscribe(
        (response) => {
          console.log('Product deleted successfully:', response);
          this.successMessage = 'Product deleted successfully';
          setTimeout(() => {
            this.successMessage = null;
          }, 3000);
          this.errorMessage = null;
          this.getAllProducts();
          this.clearMessagesAfterTimeout();
        },
        (error) => {
          console.error('Error deleting product:', error);
          this.successMessage = null;
          this.errorMessage = 'Error deleting product. Please try again.';
          this.clearMessagesAfterTimeout();
        }
      );
    } else {
      console.error('Product ID is undefined.');
    }
  }
  private clearMessagesAfterTimeout() {
    setTimeout(() => {
      this.successMessage = null;
      this.errorMessage = null;
    }, 3000);
  }
}
