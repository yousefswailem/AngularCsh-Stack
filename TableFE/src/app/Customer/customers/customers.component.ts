import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  p: number = 1;

  constructor(private customerService: CustomerService, private router: Router) {}

  ngOnInit() {
    this.customerService.getCustomers().subscribe((customers) => {
      this.customers = customers;
    });
  }

  refreshPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/customers']);
  }

  deleteCustomer(customerId: number) {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(customerId).subscribe(() => {
        console.log('Customer deleted successfully');
        this.refreshPage();
      });
    }
  }



  sortColumn: keyof Customer | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';

  groupByColumn(colName: keyof Customer) {
    if (this.sortColumn === colName) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortOrder = 'asc';
    }
    this.sortColumn = colName;

    this.customers.sort((a, b) => {
      // If the property is undefined, default it to an empty string for comparison
      const aValue = a[colName] || '';
      const bValue = b[colName] || '';

      // Now we can safely compare the values
      if (aValue < bValue) return this.sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }


  }    

