import { Component } from '@angular/core';
import { UserAuthService } from '../security/services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private userAuthSerivce: UserAuthService,
    private router: Router) {}

  public isLoggedIn() {
    return this.userAuthSerivce.isLoggedIn()
  }

  public logout() {
    this.userAuthSerivce.clear();
    this.router.navigate(['/vehicles'])
  }

  public isAdmin() {
    return this.userAuthSerivce.getRole() === 'ADMIN';
  }

}
