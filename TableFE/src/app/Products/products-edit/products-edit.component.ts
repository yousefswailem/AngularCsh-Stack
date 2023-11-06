import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Color } from 'src/app/Color/color.model';
import { ColorService } from 'src/app/Color/color.service';
import { Store } from 'src/app/stores/store.model';
import { StoreService } from 'src/app/stores/store.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  editedProduct!: Product;
  editForm: FormGroup;
  colors: Color[] = [];
  stores: Store[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private colorService: ColorService,
    private storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router

  ) {
    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [null, [Validators.required, Validators.min(0)]],
      color: [null, [Validators.required]],
      store: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const productId = idParam ? +idParam : null;

    if (productId) {
      this.productService.getProduct(productId).subscribe((product) => {
        if (product) {
          this.editedProduct = product;

          this.editForm.setValue({
            name: this.editedProduct.name,
            price: this.editedProduct.price,
            color: this.editedProduct.color,
            store: this.editedProduct.store,

          });
        } else {
          console.log('Product not found.');
        }
      });
    } else {
      console.log('Product ID is missing or invalid. Handle this case as needed.');
    }

    this.colorService.getColors().subscribe((colors) => {
      this.colors = colors;
      // Set the current color if the product is loaded
      if (this.editedProduct) {
        this.editForm.patchValue({
          color: this.colors.find(c => c.id === this.editedProduct.colorId),
        });
      }
    });
    
    this.storeService.getStores().subscribe((stores) => {
      this.stores = stores;
      // Set the current store if the product is loaded
      if (this.editedProduct) {
        this.editForm.patchValue({
          store: this.stores.find(s => s.id === this.editedProduct.storeId),
        });
      }
    });
  }

  updateProduct() {
    if (this.editForm.valid) {
      const updatedData: Product = {
        id: this.editedProduct.id,
        name: this.editForm.get('name')?.value,
        price: this.editForm.get('price')?.value,
        colorName: this.editForm.get('color')?.value,
        storeName: this.editForm.get('store')?.value,
        store: this.editedProduct.store,
        color: this.editedProduct.color,
        colorId: this.editedProduct.colorId,
        storeId: this.editedProduct.storeId,
      };

      this.productService.upsertProduct(updatedData).subscribe({
        next: (response) => {
          console.log('Product updated successfully');
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('Error updating the product:', error);
        }
      });
    }
  }
}
