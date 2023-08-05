import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Car } from 'src/app/interfaces/car';
import { Rental } from 'src/app/interfaces/rental';
import { RentalResponse } from 'src/app/interfaces/rental-response';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-admin',
  templateUrl: './rental-admin.component.html',
  styleUrls: ['./rental-admin.component.scss']
})
export class RentalAdminComponent implements OnInit {
  rentals: Rental[] = [];
  addRentalForm!: FormGroup;
  availableCars!: Car[];
  totalPages: number = 0;
  currentPage: number = 0;
  errorMessage: string = '';

  constructor(private rentalService: RentalService,
    private carService: CarService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadRentals()  
    this.addRentalFormInit()
  }

  addRentalFormInit() {
    this.addRentalForm = new FormGroup({
      email: new FormControl('', [Validators.required, this.emailValidator]),
      startDate: new FormControl('', [Validators.required, this.startDateValidator]),
      endDate: new FormControl('', [Validators.required]),
      carsId: new FormControl('')
    })
  }

  // validations
  emailValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailPattern.test(control.value)) {
      return { invalidEmail: true };
    }
    return null;
  }

  startDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const startDate = new Date(control.value);
    const today = new Date();
    today.setHours(0,0,0,0)
    
    if (startDate < today) {
      return { startDateBeforeToday: true };
    }
    return null;
  }

  loadRentals() {
    // this.rentalService.getRentals().subscribe(result => {
    //   this.rentals = result.data
    //   console.log(this.rentals)
    // })  

    this.rentalService.getRentalsPaginated().subscribe(result => {
      this.rentals = result.data.rentals
      this.totalPages = result.data.numberOfPages;
    })
  }

  goToPage(pageNumber: number) {
    this.rentalService
      .getRentalsPaginated(pageNumber, 10, 'id')
      .subscribe((result) => {
        this.currentPage = pageNumber;
        this.rentals = result.data.rentals;
        this.totalPages = result.data.numberOfPages;
      });
  }

  goToNextOrPreviousPage(direction: string) {
    this.goToPage(
      direction === 'forward' ? this.currentPage + 1 : this.currentPage - 1
    );
  }

  submitFormData() {
    console.log(this.addRentalForm.value)

    this.rentalService.addRental(this.addRentalForm.value)
    .subscribe(result => {
      this.addRentalForm.reset()
      console.log(result)
      console.log("Rental added successfully.")
      window.location.reload();
    })

  }

  populateAvailableCars() {
    const startDate = this.addRentalForm.get('startDate')?.value;
    const endDate = this.addRentalForm.get('endDate')?.value;
  
    if (!startDate || !endDate) {
      this.errorMessage = 'Pick the start date and the end date.';
      return;
    } else {
      this.errorMessage = ''
    }

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
  
    if (endDateObj < startDateObj) {
      this.errorMessage = 'End date cannot be before the start date.';
      return;
    } else {
      this.errorMessage = ''
    }

    this.carService.getAvailableCars(startDate, endDate).subscribe(result => {
      this.availableCars = result.data
      console.log(this.availableCars)
    })
  }


  confirmDelete(rental: Rental) {
    const confirmation = confirm(
      `Are you sure you want to delete the rental: ${JSON.stringify(rental)}?`
    )

    if(confirmation) {
      this.deleteCategory(rental);
    }
  }

  deleteCategory(rental: Rental) {
    if(rental.id) {
      this.rentalService.deleteRentalById(rental.id)
      .subscribe((data: RentalResponse) => {
        console.log(data.message)
        this.loadRentals()

        window.location.reload()
      })  
    }

  }

  confirmReturn(rental: Rental) {
    const confirmation = confirm(
      `Are you sure you want to return the rental: ${JSON.stringify(rental)}?`
    )

    if(confirmation) {
      this.returnRental(rental);
    }
  }

  returnRental(rental: Rental) {
    this.rentalService.returnRental(rental.id)
    .subscribe(result => {
      console.log("Rental returned successfully.");
      this.loadRentals()
    })

    window.location.reload()
  }
}
