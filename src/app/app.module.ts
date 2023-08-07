import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

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
import { FooterComponent } from './components/footer/footer.component';
import { CustomerService } from './services/customer.service';
import { TableOverflowPipe } from './pipes/table-overflow.pipe';
import { LoginComponent } from './components/security/login/login/login.component';
import { RegisterComponent } from './components/security/login/register/register.component';
import { ForbiddenComponent } from './components/security/forbidden/forbidden.component';
import { CategoryService } from './services/category.service';
import { UserAuthService } from './components/security/services/user-auth.service';
import { AuthInterceptor } from './components/security/auth/auth.interceptor';

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
    AllVehiclesComponent,
    FooterComponent,
    TableOverflowPipe,
    LoginComponent,
    RegisterComponent,
    ForbiddenComponent
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
