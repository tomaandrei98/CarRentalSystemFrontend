import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginFormInit();
  }

  constructor(
    private authService: AuthService, // Import your AuthService
    private toastr: ToastrService,
    private router: Router
  ) {}

  loginFormInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  submitLoginForm() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.loginUser(username, password).subscribe(
        (response) => {
          this.toastr.success('Logged in successfully!', 'Welcome back!');

          localStorage.setItem('username', response.username);
          localStorage.setItem('role', response.role);
          localStorage.setItem('token', response.token);

          this.router.navigate(['/home']); 
        },
        (error) => {
          this.toastr.error('Login failed. Please check your credentials.');
        }
      );
    }
  }
}
