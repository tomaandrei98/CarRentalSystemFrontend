import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin/admin.component';
import { OurVehiclesComponent } from './components/user/display/our-vehicles/our-vehicles.component';
import { LoginComponent } from './components/security/login/login/login.component';
import { RegisterComponent } from './components/security/login/register/register.component';
import { UserAuthService } from './components/security/services/user-auth.service';
import { ForbiddenComponent } from './components/security/forbidden/forbidden.component';

export const canActivate = (role: string, userAuthService = inject(UserAuthService)) => userAuthService.isAdmin(role);

const routes: Routes = [
  {path: 'vehicles', component: OurVehiclesComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, canActivate:[() => canActivate("ADMIN")], data: {roles: ['ADMIN']}},
  {path: 'forbidden', component: ForbiddenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
