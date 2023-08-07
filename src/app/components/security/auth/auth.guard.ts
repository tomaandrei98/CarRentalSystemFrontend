import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let userAuthService = new UserAuthService();
  let router = new Router()
  let userService = new UserService(inject(HttpClient), new UserAuthService())

  if (userAuthService.getToken() !== null) {
    const role = route.data['role'] as Array<string>;

    if (role) {
      const match = userService.roleMatch(role)

      if (match) {
        router.navigate(['/admin'])
        return true;
      } else {
        router.navigate(['/forbidden'])
        return false
      }
    }
  }

  router.navigate(['/login'])
  return false;
};
