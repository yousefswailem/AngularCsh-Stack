import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ColorService } from 'src/app/Color/color.service';
import { Color } from 'src/app/Color/color.model';
import { StoreService } from 'src/app/stores/store.service';
import { Store } from 'src/app/stores/store.model';
import { forkJoin } from 'rxjs';
import { ColorProduct } from '../color-product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  colors: Color[] = [];
  stores: Store[] = [];
  colorProducts: ColorProduct[] = [];
  p: number = 1; // Used for pagination, presumably

  constructor(
    private productService: ProductService,
    private storeService: StoreService,
    private router: Router
  ) {}

    ngOnInit() {
      this.loadStores();
      this.loadProducts();
      console.log(this.colorProducts);

    }

  loadStores() {
    this.storeService.getStores().subscribe(stores => {
      this.stores = stores;
    });
  }



  loadProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products.map(product => {
        const storeName = this.getStoreName(product.storeId);
        const colorIds = this.getColorId(product.id);
        return { ...product, storeName,colorIds }; 
      });
    });
  }

  getStoreName(storeId: number): string {
    const store = this.stores.find(s => s.id === storeId);
    return store ? store.name : 'Unknown';
  }
  getColorId(productId: number): number[] {
    // In a real application, replace this with actual logic to get color IDs
    return this.colorProducts
      .filter(cp => cp.ProductId === productId)
      .map(cp => cp.ColorId);
  }

  refreshPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/products']);
  }

  deleteproduct(productId: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          console.log('Product deleted successfully');
          this.refreshPage();
        },
        error: (error) => {
          console.error('Error deleting the product:', error);
        }
      });
    }
  }
}