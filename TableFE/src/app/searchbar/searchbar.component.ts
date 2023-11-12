import { Component, EventEmitter, Output } from '@angular/core';
import { ProductService } from '../Products/product.service';
import { Product } from '../Products/product.model';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchBarComponent {
  searchResults: Product[] = [];
  searchQuery: string = '';
  @Output() searchPerformed = new EventEmitter<string>();

  constructor(private productService: ProductService) { }
  onSearch(): void {
    this.searchPerformed.emit(this.searchQuery);
  }

  search(): void {
    this.searchPerformed.emit(this.searchQuery);
  }
}