import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from '../../interfaces/products';

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
  products: any[] = [
    {
      name: 'Product 1',
      description: 'Desc 1',
      price: 100,
      quantity: 10,
      category: 'Category 1',
      image: '',
    },
    {
      name: 'Product 2',
      description: 'Desc 2',
      price: 200,
      quantity: 20,
      category: 'Category 2',
      image: '',
    },
    {
      name: 'Product 3',
      description: 'Desc 3',
      price: 300,
      quantity: 30,
      category: 'Category 3',
      image: '',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  get f() {
    return this.productForm.controls;
  }

  createForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required],
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
      formData.append('upload_preset', 'e-commerce');
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
          this.productForm.patchValue({ images: this.imageurl });
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
  onAddProduct() {
    this.editMode = false;
    this.productForm.reset();
    this.toggleProductForm();
  }

  onEditProduct(product: any) {
    this.editMode = true;
    this.currentProduct = product;
    this.productForm.patchValue(product);
    this.toggleProductForm();
  }

  onSubmit() {
    if (this.productForm.valid) {
      if (this.editMode) {
        // Update product
        const index = this.products.findIndex((p) => p === this.currentProduct);
        if (index !== -1) {
          this.products[index] = this.productForm.value;
        }
      } else {
        // Add new product
        this.products.push(this.productForm.value);
      }
      this.toggleProductForm();
      this.editMode = false;
      this.productForm.reset();
    }
  }

  onDeleteProduct(product: any) {
    this.products = this.products.filter((p) => p !== product);
  }
}
