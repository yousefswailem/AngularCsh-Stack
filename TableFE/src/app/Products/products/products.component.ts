import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { StoreService } from 'src/app/stores/store.service';
import { Store } from 'src/app/stores/store.model';
import { ColorProduct } from '../color-product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  colorProducts: ColorProduct[] = [];
  stores: Store[] = [];
  p: number = 1; // Used for pagination, presumably

  constructor(
    private productService: ProductService,
    private storeService: StoreService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadStores();
    this.loadProducts();
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
        console.log(products);

        return {
          ...product,
          storeName
        };
      });
      this.products.forEach(product => {
        product.colorProducts = product.colorProducts.map(a => a.color.name);
      });
    });
  }

  getStoreName(storeId: number): string {
    const store = this.stores.find(s => s.id === storeId);
    return store ? store.name : 'Unknown';
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