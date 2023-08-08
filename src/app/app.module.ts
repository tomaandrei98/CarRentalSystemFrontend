import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { CategoryAdminComponent } from './components/admin/display/category-admin/category-admin.component';
import { CarAdminComponent } from './components/admin/display/car-admin/car-admin.component';
import { CustomerAdminComponent } from './components/admin/display/customer-admin/customer-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RentalAdminComponent } from './components/admin/display/rental-admin/rental-admin.component';
import { OurVehiclesComponent } from './components/user/display/our-vehicles/our-vehicles.component';
import { ImageUrlTruncatePipe } from './pipes/image-url-truncate.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { CustomerService } from './services/customer.service';
import { TableOverflowPipe } from './pipes/table-overflow.pipe';
import { LoginComponent } from './components/register/login/login.component';
import { BookARentalComponent } from './components/user/display/book-a-rental/book-a-rental.component';
import { HomeComponent } from './components/user/display/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdminComponent,
    CategoryAdminComponent,
    CarAdminComponent,
    CustomerAdminComponent,
    RentalAdminComponent,
    OurVehiclesComponent,
    ImageUrlTruncatePipe,
    FooterComponent,
    TableOverflowPipe,
    LoginComponent,
    BookARentalComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
