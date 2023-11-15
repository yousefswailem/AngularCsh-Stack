import { Component, OnInit } from '@angular/core';
import { User } from '../User.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit{
  users!: User[];

  p: number = 1;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }


  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        console.log('user deleted successfully');
        this.router.navigate(['/userlist']);
      });
    }
  }


  sortColumn: keyof User | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';

  groupByColumn(colName: keyof User) {
    if (this.sortColumn === colName) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortOrder = 'asc';
    }
    this.sortColumn = colName;

    this.users.sort((a, b) => {
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
