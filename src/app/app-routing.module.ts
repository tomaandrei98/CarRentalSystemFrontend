import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin/admin.component';
import { OurVehiclesComponent } from './components/user/display/our-vehicles/our-vehicles.component';

const routes: Routes = [
  {
    path: 'vehicles',
    component: OurVehiclesComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
