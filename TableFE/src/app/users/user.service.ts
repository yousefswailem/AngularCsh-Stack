import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'http://localhost:3000/api/users';  // URL to web api

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.usersUrl}`, user);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${id}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersUrl}`);
  }

   deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.usersUrl}/${id}`);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(`${this.usersUrl}/${user.id}`, user);
  }
  
}
