import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserAuthService } from '../../services/user-auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  register(registerForm: NgForm) {
    this.userService
      .register(
        registerForm.value.first_name,
        registerForm.value.last_name,
        registerForm.value.email,
        registerForm.value.username,
        registerForm.value.password,
        registerForm.value.role
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['login']);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
