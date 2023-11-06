import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Color } from '../color.model'; // Import the Color model if you have one
import { ColorService } from '../color.service'; // Import the ColorService
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-color',
  templateUrl: './create-color.component.html',
  styleUrls: ['./create-color.component.css']
})
export class CreateColorComponent implements OnInit {
  createColorForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private colorService: ColorService,private router: Router) {
    this.createColorForm = this.formBuilder.group({
      name: ['', Validators.required],
      hexCode: ['', Validators.required],
      red: [0, [Validators.required, Validators.min(0), Validators.max(255)]],
      green: [0, [Validators.required, Validators.min(0), Validators.max(255)]],
      blue: [0, [Validators.required, Validators.min(0), Validators.max(255)]],
    });
  }

  refreshPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/colors']);
  }
  ngOnInit() {
    // Additional initialization logic can go here
  }

  createColor() {
    if (this.createColorForm.valid) {
      const newColor: Color = this.createColorForm.value as Color;
      this.colorService.upsertColor(newColor).subscribe(response => {
        console.log('Color created successfully');
        // You can navigate to another page or handle the response as needed
        this.refreshPage()
      });
    }
  }
}
