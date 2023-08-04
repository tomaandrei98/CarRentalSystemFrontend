import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LeftBarComponent } from './components/left-bar/left-bar.component';
import { LeftBarExpandComponent } from './components/left-bar-expand/left-bar-expand.component';
import { CarsDisplayComponent } from './components/cars-display/cars-display.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { CategoryAdminComponent } from './components/admin/display/category-admin/category-admin.component';
import { CarAdminComponent } from './components/admin/display/car-admin/car-admin.component';
import { CustomerAdminComponent } from './components/admin/display/customer-admin/customer-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RentalAdminComponent } from './components/admin/display/rental-admin/rental-admin.component';
import { OurVehiclesComponent } from './components/user/display/our-vehicles/our-vehicles.component';
import { ImageUrlTruncatePipe } from './pipes/image-url-truncate.pipe';
import { AllVehiclesComponent } from './components/user/display/all-vehicles/all-vehicles.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LeftBarComponent,
    LeftBarExpandComponent,
    CarsDisplayComponent,
    AdminComponent,
    CategoryAdminComponent,
    CarAdminComponent,
    CustomerAdminComponent,
    RentalAdminComponent,
    OurVehiclesComponent,
    ImageUrlTruncatePipe,
    AllVehiclesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
