import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin/admin.component';
import { OurVehiclesComponent } from './components/user/display/our-vehicles/our-vehicles.component';
import { RegisterComponent } from './components/register/register/register.component';
import { LoginComponent } from './components/register/login/login.component';
import { BookARentalComponent } from './components/user/display/book-a-rental/book-a-rental.component';
import { HomeComponent } from './components/user/display/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'vehicles', component: OurVehiclesComponent },
  { path: 'book', component: BookARentalComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
