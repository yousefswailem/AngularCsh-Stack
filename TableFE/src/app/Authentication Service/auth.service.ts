import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Store the token
  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Retrieve the token
  getToken() {
    return localStorage.getItem('token');
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    if (!!localStorage.getItem('token')) {
      return true
    }
    return false
  }

  // Logout the user
  logout(): void {
    localStorage.removeItem('token');
  }
}
