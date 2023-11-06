import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './customer.model'; // make sure to import your customer model

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:3000/api/customers';

  constructor(private http: HttpClient) { }

  // Fetch all customers
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  // Fetch a single customer by id
  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  // Create a new customer
  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}/create`, customer);
  }

  // Update an existing customer
  updateCustomer(customer: Customer): Observable<any> {
    return this.http.put(`${this.apiUrl}/${customer.id}`, customer);
  }

  // Delete a customer
  deleteCustomer(id: number): Observable<Customer> {
    return this.http.delete<Customer>(`${this.apiUrl}/${id}`);
  }
}
