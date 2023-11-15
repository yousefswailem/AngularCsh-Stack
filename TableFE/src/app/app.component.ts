import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLargeScreen = true;
  navbarVisible = false; // Initialize to false

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isLargeScreen = window.innerWidth > 600; // Set the threshold as needed
    if (this.isLargeScreen) {
      this.navbarVisible = true; // Navbar always visible on larger screens
    } else {
      this.navbarVisible = false; // Hide navbar on smaller screens
    }
  }

  constructor() {
    this.onResize(new Event('init')); // Call onResize with a dummy event
  }

  toggleNavbar() {
    if (!this.isLargeScreen) { // Only toggle on smaller screens
      this.navbarVisible = !this.navbarVisible;
    }
  }
}
