import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { AuthService } from '../Authentication Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router : Router, private authService : AuthService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      Username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.loginService.login(this.form.value)
      .subscribe({
        next: (data) => {
          this.authService.storeToken(data.token)
          this.router.navigate(['/products']);
        },
        error: (error) => {
          alert(error?.error.message)
        }
      });

  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control!.markAsTouched({ onlySelf: true });
    });
  }

  isFieldValid(field: string) {
    return !this.form.get(field)?.valid && this.form.get(field)?.touched;
  }

  displayFieldCss(field: string) {
    return {
      'alert-validate': this.isFieldValid(field)
    };
  }
}