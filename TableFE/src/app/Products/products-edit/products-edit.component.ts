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
      colorId: [[], [Validators.required]], // Changed to an array to support multiple color IDs
      storeId: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const productId = idParam ? +idParam : null;

    if (productId) {
      this.productService.getProduct(productId).subscribe((product) => {
        if (product) {
          this.editedProduct = product;
          this.setInitialColorSelections(product); // Ensure this function is properly setting the colorIds
          this.editForm.patchValue({
            name: product.name,
            price: product.price,
            storeId: product.storeId,
            colorId: product.colorIds,
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
          color: this.colors.find(c => this.editedProduct.colorIds?.includes(c.id)) ?? null,
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
  private setInitialColorSelections(product: Product) {
    this.editForm.get('colorId')!.setValue(product.colorIds || []);
  }


  updateProduct() {
    if (this.editForm.valid) {
      const updatedData = {
        ...this.editedProduct,
        name: this.editForm.value.name,
        price: this.editForm.value.price,
        storeId: this.editForm.value.storeId,
        colorId: this.editForm.value.colorId,
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
