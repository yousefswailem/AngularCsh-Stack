import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ColorService } from 'src/app/Color/color.service';
import { Color } from 'src/app/Color/color.model';
import { StoreService } from 'src/app/stores/store.service';
import { Store } from 'src/app/stores/store.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  colors: Color[] = [];
  stores: Store[] = [];
  p: number = 1; 
  
  constructor(
    private productService: ProductService,
    private colorService: ColorService,
    private storeService: StoreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    this.loadStores();
    this.loadColors();
  }

  loadStores() {
    this.storeService.getStores().subscribe(stores => {
      this.stores = stores;
      this.enrichProducts(); // Changed to a new method that checks for both stores and colors
    });
  }

  loadColors() {
    this.colorService.getColors().subscribe(colors => {
      this.colors = colors;
      this.enrichProducts(); // Changed to a new method that checks for both stores and colors
    });
  }

  enrichProducts() {
    if (this.stores.length && this.colors.length) {
      this.productService.getProducts().subscribe(products => {
        this.products = products.map(product => ({
          ...product,
          storeName: this.getStoreName(product.storeId),
          colorName: this.getColorName(product.colorId)
        }));
      });
    }
  }

  getColorName(colorId: number): string {
    const color = this.colors.find(c => c.id === colorId);
    return color && color.name ? color.name : 'Unknown';
  }

  getStoreName(storeId: number): string {
    const store = this.stores.find(s => s.id === storeId);
    return store ? store.name : 'Unknown'; // Simplified check for nullish value
  }

  refreshPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/products']);
  }

  deleteproduct(productId: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(() => {
        console.log('Product deleted successfully');
        this.refreshPage();
      });
    }
  }
}