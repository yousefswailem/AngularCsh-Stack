import { Component, OnInit } from '@angular/core';
import { User } from './User.model';
import { UserService } from './user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  newUser: User = {} as User;
  registerForm!: FormGroup;
  submitAttempted = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'name': new FormControl(null, Validators.required),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }


  onSubmit() {
    this.submitAttempted = true; 
    
    if (this.registerForm.invalid) {
      return;
    }

    this.newUser.username = this.registerForm.get('username')?.value;
    this.newUser.name = this.registerForm.get('name')?.value;
    this.newUser.password = this.registerForm.get('password')?.value;

    this.userService.createUser(this.newUser).subscribe({
      next: (response: User) => {
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        if (error.status === 400 && error.error.message === 'Username is already taken.') {
          alert('Username is already taken.');
        }
        else {
          console.error('Error creating the User:', error);
        }
      }
    });
  }


}
