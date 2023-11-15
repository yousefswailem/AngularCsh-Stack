import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../User.model';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {


  editForm: FormGroup;
  currentUser!: User;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.formBuilder.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      password: [''],
    });
  }



  ngOnInit() {
    const userId = this.route.snapshot.params['id'];
    if (userId) {
      this.userService.getUser(userId).subscribe({
        next: (user) => {
          if (user) {
            this.currentUser = user;
            this.editForm.patchValue({
              username: user.username,
              name: user.name,
              passowrd: user.password
            });
          } else {
            this.router.navigate(['/user-not-found']); 
          }
        },
        error: (err) => { 
          console.error(`Error fetching user with ID ${userId}: `, err);
          this.router.navigate(['/error']);
        }
      });
    } else {
      console.log('User ID is missing or invalid.');
      this.router.navigate(['/invalid-user']); 
    }
  }
  

  
  updateUser() {
    if (this.editForm.valid) {
      const updatedUser: User = {
        ...this.currentUser,
        ...this.editForm.value
      };

      this.userService.updateUser(updatedUser).subscribe({
        next: (response) => {
          console.log('User updated successfully');
          this.router.navigate(['/userlist']); // Adjust as needed
        },
        error: (error) => {
          console.error('Error updating the user:', error);
        }
      });
    }
  }
}
