import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Store the token
  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Retrieve the token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Check if the user is logged in
 isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Logout the user
  logout(): void {
    localStorage.removeItem('token');
  }
}
