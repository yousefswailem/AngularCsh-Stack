import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { Store } from 'src/app/stores/store.model';
import { StoreService } from 'src/app/stores/store.service';
import { Router } from '@angular/router';
import { Color } from 'src/app/Color/color.model';
import { ColorService } from 'src/app/Color/color.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  createProductForm!: FormGroup;
  stores: Store[] = [];
  colors: Color[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private storeService: StoreService,
    private colorService: ColorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createProductForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [null, [Validators.required, Validators.min(0)]],
      storeId: [null, [Validators.required]],
      colorId: [[], [Validators.required]] 
        });
    this.colorService.getColors().subscribe((colors) => {
      this.colors = colors;
    });
    this.storeService.getStores().subscribe((stores) => {
      this.stores = stores;
    });
  }

  createProduct() {
    if (!this.createProductForm.valid) {
      console.log('Form is invalid. Please fill in all required fields.');
      return;
    }

    const newProduct: Product = this.createProductForm.value;
    this.router.navigate(['/products']);
    this.productService.upsertProduct(newProduct).subscribe({
      next: (response: any) => {
        console.log('Product created successfully', response);
        this.router.navigate(['/products']);
      },
      error: (error: any) => {
        console.error('Error creating the product:', error);
      }
    });
  }
}
