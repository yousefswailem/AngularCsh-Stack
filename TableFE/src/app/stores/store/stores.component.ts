import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { Store } from '../store.model';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css'],
})
export class StoresComponent implements OnInit {
  stores: Store[] = [];
  p: number = 1; 

  constructor(private storeService: StoreService, private router: Router) { }

  ngOnInit() {
    this.storeService.getStores().subscribe((stores) => {
      this.stores = stores.sort((a, b) => b.id - a.id);
    });
  }
  refreshPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/stores']);
  }
  deleteStore(storeId: number) {
    if (confirm('Are you sure you want to delete this store?')) {
      this.storeService.deleteStore(storeId).subscribe(() => {
        console.log('Store deleted successfully');
        this.refreshPage();
      });
    }
  }
}
