import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { StoreService } from 'src/app/stores/store.service';
import { Store } from 'src/app/stores/store.model';
import { ColorProduct } from '../color-product.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }), // start with an opacity of 0
        animate('500ms ease-in', style({ opacity: 1 })), // animate to an opacity of 1
      ]),
      transition('* => void', [
        animate('500ms ease-out', style({ opacity: 0 })), // animate to an opacity of 0
      ]),
    ]),
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ]),
  ],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  colorProducts: ColorProduct[] = [];
  stores: Store[] = [];
  p: number = 1; // Used for pagination, presumably
  searchTerm: string = ''; 
  flip: string = 'inactive';

  constructor(
    private productService: ProductService,
    private storeService: StoreService,
    private router: Router
  ) { }


  filterProducts() {
        if (!this.searchTerm) {
          return this.products;
        }
        return this.products.filter(product =>
          product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          product.storeName?.toLowerCase().includes(this.searchTerm.toLowerCase()) 
        );
      }

      onSearchChange(searchTerm: string): void {
            this.searchTerm = searchTerm;
          }

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



  sortColumn: keyof Product | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';

  groupByColumn(colName: keyof Product) {
    if (this.sortColumn === colName) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortOrder = 'asc';
    }
    this.sortColumn = colName;

    this.products.sort((a, b) => {
      // If the property is undefined, default it to an empty string for comparison
      const aValue = a[colName] || '';
      const bValue = b[colName] || '';

      // Now we can safely compare the values
      if (aValue < bValue) return this.sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }


  showCreateProduct: boolean = false; 
  goToCreateProduct() {
    this.flip = 'active'; // Activate flip animation
    setTimeout(() => {
      this.showCreateProduct = true; // Show the create product component
    }, 500); // Delay for half a second to show animation
  }

  
  backToProductList() {
    this.flip = 'inactive'; // Activate flip animation for back transition
    setTimeout(() => {
      this.showCreateProduct = false; // Hide the create product component
    });
  }

}