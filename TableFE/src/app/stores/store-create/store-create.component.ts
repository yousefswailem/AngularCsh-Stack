import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/stores/store.model';
import { StoreService } from 'src/app/stores/store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-create',
  templateUrl: './store-create.component.html',
  styleUrls: ['./store-create.component.css']
})
export class StoreCreateComponent implements OnInit {
  storeCreate!: FormGroup;
  newStore: Store = {} as Store;

  constructor(private storeService: StoreService, private fb: FormBuilder,private router: Router) {}

  ngOnInit(): void {
    this.storeCreate = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      location: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  onSubmit() {
    // Check if the form is valid
    if (this.storeCreate.invalid) {
      console.log('Form is invalid. Please fill in all required fields.');
      return;
    }

    // Extract form values and assign them to newStore
    this.newStore.name = this.storeCreate.get('name')?.value;
    this.newStore.location = this.storeCreate.get('location')?.value;

    this.storeService.upsertStore(this.newStore).subscribe({
      next: (response: Store) => {
        console.log('Store created successfully');
        this.router.navigate(['/stores']);
      },
      error: (error: any) => {
        console.error('Error creating the store:', error);
      }
    });
  }
}
