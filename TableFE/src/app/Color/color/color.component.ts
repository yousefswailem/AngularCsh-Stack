import { Component, OnInit } from '@angular/core';
import { Color } from '../color.model';
import { ColorService } from '../color.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-colors',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorsComponent implements OnInit {
  colors: Color[] = [];
  p: number = 1; 

  constructor(private colorService: ColorService, private router: Router) {}
  ngOnInit() {
    this.colorService.getColors().subscribe((colors) => {
      this.colors = colors;
      // For each color, fetch its name.
    });
  }

  refreshPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/colors']);
  }

  deleteColor(colorId: number) {
    if (confirm('Are you sure you want to delete this color?')) {
      this.colorService.deleteColor(colorId).subscribe(() => {
        console.log('Color deleted successfully');
        this.refreshPage();
      });
    }
  }
}
