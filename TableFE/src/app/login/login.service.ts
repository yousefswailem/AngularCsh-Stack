import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = 'http://localhost:3000/api/users/login';
  
  constructor(private http: HttpClient) { }

  login(credentials: { user: any }): Observable<any> {
    return this.http.post<any>(`${this.loginUrl}`, credentials);
  }
}
