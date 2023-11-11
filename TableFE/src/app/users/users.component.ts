import { Component, OnInit } from '@angular/core';
import { User } from './User.model';
import { UserService } from './user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  newUser: User = {} as User;
  registerForm!: FormGroup;
  constructor(private userService: UserService, private fb: FormBuilder,private router: Router) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'name': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }


  onSubmit() {
    // Check if the form is valid
    if (this.registerForm.invalid) {
      console.log('Form is invalid. Please fill in all required fields.');
      return;
    }

    // Extract form values and assign them to newStore
    this.newUser.username = this.registerForm.get('username')?.value;
    this.newUser.name = this.registerForm.get('name')?.value;
    this.newUser.password = this.registerForm.get('password')?.value;

    this.userService.createUser(this.newUser).subscribe({
      next: (response: User) => {
        console.log('User created successfully');
        this.router.navigate(['/users']);
      },
      error: (error: any) => {
        console.error('Error creating the User:', error);
      }
    });
  }
}
