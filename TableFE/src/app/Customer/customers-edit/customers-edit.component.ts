import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service'; 
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customers-edit',
  templateUrl: './customers-edit.component.html',
  styleUrls: ['./customers-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  editForm: FormGroup; 
  currentCustomer!: Customer;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: [''],
      phone: [''],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    const customerId = this.route.snapshot.params['id'];
    if (customerId) {
      this.customerService.getCustomer(customerId).subscribe({
        next: (customer) => {
          if (customer) {
            this.currentCustomer = customer;
            this.editForm.patchValue({
              firstName: customer.firstName,
              lastName: customer.lastName,
              address: customer.address,
              phone: customer.phone,
              email: customer.email
            });
          } else {
            console.log(`Customer with ID ${customerId} not found.`);
            this.router.navigate(['/customer-not-found']); 
          }
        },
        error: (err) => { 
          console.error(`Error fetching customer with ID ${customerId}: `, err);
          this.router.navigate(['/error']);
        }
      });
    } else {
      console.log('Customer ID is missing or invalid.');
      this.router.navigate(['/invalid-customer']); 
    }
  }
  
  updateCustomer() {
    if (this.editForm.valid) {
      const updatedCustomer: Customer = {
        ...this.currentCustomer,
        ...this.editForm.value
      };

      this.customerService.updateCustomer(updatedCustomer).subscribe({
        next: (response) => {
          console.log('Customer updated successfully');
          this.router.navigate(['/customers']); // Adjust as needed
        },
        error: (error) => {
          console.error('Error updating the customer:', error);
        }
      });
    }
  }
}
