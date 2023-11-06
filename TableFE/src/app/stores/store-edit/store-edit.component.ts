// store-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '../store.model';
import { StoreService } from '../store.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-store-edit',
  templateUrl: './store-edit.component.html',
  styleUrls: ['./store-edit.component.css']
})
export class StoreEditComponent implements OnInit {
  editedStore!: Store;
  editForm: FormGroup; // Declare editForm without the "!" operator

  // ... other class properties ...

  constructor(
    private formBuilder: FormBuilder,
    private storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      location: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const storeId = idParam ? +idParam : null;
    
    if (storeId) {
      this.storeService.getStore(storeId).subscribe((store) => {
        if (store) {
          this.editedStore = store;
  
          this.editForm.setValue({
            name: this.editedStore.name,
            location: this.editedStore.location,
          });
        } else {
          console.log('Store not found.');
          // You might want to handle this case, such as redirecting to an error page.
        }
      });
    } else {
      console.log('Store ID is missing or invalid. Handle this case as needed.');
      // You might want to handle this case, such as redirecting to an error page.
    }
  }
 updateStore() {
  if (this.editForm.valid) {
    const updatedData: Store = {
      id: this.editedStore.id,
      name: this.editForm.get('name')?.value,
      location: this.editForm.get('location')?.value
    };

    this.storeService.upsertStore(updatedData).subscribe({
      next: (response) => {
        console.log('Store updated successfully');
        this.router.navigate(['/stores']);
      },
      error: (error) => {
        console.error('Error updating the store:', error);
      }
    });
  }
}
}
