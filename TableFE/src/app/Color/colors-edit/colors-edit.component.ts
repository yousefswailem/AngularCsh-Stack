// color-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Color } from '../color.model';
import { ColorService } from '../color.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-color-edit',
  templateUrl: './colors-edit.component.html',
  styleUrls: ['./colors-edit.component.css']
})
export class ColorEditComponent implements OnInit {
  editedColor!: Color;
  editForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      hexCode: ['', [Validators.required, Validators.pattern(/^#(?:[0-9a-fA-F]{3}){1,2}$/)]],
      red: [null, [Validators.required, Validators.min(0), Validators.max(255)]],
      green: [null, [Validators.required, Validators.min(0), Validators.max(255)]],
      blue: [null, [Validators.required, Validators.min(0), Validators.max(255)]],
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const colorId = idParam ? +idParam : null;
  
    if (colorId) {
      this.colorService.getColor(colorId).subscribe({
        next: (color) => {
          this.editedColor = color;
          this.editForm.setValue({
            name: color.name,
            hexCode: color.hexCode,
            red: color.red,
            green: color.green,
            blue: color.blue,
          });
        },
        error: (error) => { // Called when there is an error in retrieval.
          console.error('API error during fetching color:', error);

        }
      });
    } else {
      console.error('Color ID is missing or invalid.');
    }
  }
  

  upsertColor() {
    if (this.editForm.valid) {
      const formData: Color = {
        id: this.editedColor?.id,
        name: this.editForm.get('name')?.value,
        hexCode: this.editForm.get('hexCode')?.value,
        red: this.editForm.get('red')?.value,
        green: this.editForm.get('green')?.value,
        blue: this.editForm.get('blue')?.value,
      };

      this.colorService.upsertColor(formData).subscribe({
        next: (response) => {
          console.log('Color upserted successfully');
          this.router.navigate(['/colors']);
        },
        error: (error) => {
          console.error('Error during color upsert:', error);
        }
      });
    }
  }
}
