import { Component } from '@angular/core';
import { AuthService } from '../Authentication Service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    private auth: AuthService
  ) { }


  logout() {
    this.auth.logout()
  }

}

