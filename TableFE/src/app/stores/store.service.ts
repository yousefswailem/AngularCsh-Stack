import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from './store.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private apiUrl = 'http://localhost:3000/api/stores';

  constructor(private http: HttpClient) {}

  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(this.apiUrl);
  }

  getStore(id: number): Observable<Store> {
    return this.http.get<Store>(`${this.apiUrl}/${id}`);
  }

  upsertStore(store: Store): Observable<Store> {
    return this.http.post<Store>(`${this.apiUrl}/upsert`, store);
  }

  deleteStore(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
