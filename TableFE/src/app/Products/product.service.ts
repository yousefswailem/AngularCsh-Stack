import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { ColorProduct } from './color-product.model';
import { Color } from '../Color/color.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products'; 

  constructor(private http: HttpClient) {}

  // Get a list of products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  
  getColorProducts(): Observable<ColorProduct[]> {
    return this.http.get<ColorProduct[]>(`${this.apiUrl}/colorproduct`);
  }

  // Get a single product by ID
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  upsertProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/upsert`, product);
  }

  // Delete a product by ID
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  getProductColors(productId: number): Observable<Color[]> {
    // Replace with the actual HTTP request to your backend
    return this.http.get<Color[]>(`/api/products/${productId}/colors`);
  }
}
