import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserAuthService } from '../../services/user-auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router) {}

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value.username, loginForm.value.password)
      .subscribe(response => {
        console.log(response)
        this.userAuthService.setToken(response.token)
        this.userAuthService.setRole(response.userDetails.authorities[0].authority)
        this.userAuthService.setUsername(response.userDetails.username)

        this.router.navigate(["vehicles"])
      },
      (error) => {
        console.log(error)
      })
  }
}
