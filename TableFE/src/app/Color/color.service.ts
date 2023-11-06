import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Color } from './color.model';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private apiUrl = 'http://localhost:3000/api/colors'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getColors(): Observable<Color[]> {
    return this.http.get<Color[]>(`${this.apiUrl}`);
  }

  getColor(id: number): Observable<Color> {
    return this.http.get<Color>(`${this.apiUrl}/${id}`);
  }
  
  upsertColor(color: Color): Observable<Color> {
    return this.http.post<Color>(`${this.apiUrl}/upsert`, color);
  }

  deleteColor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
