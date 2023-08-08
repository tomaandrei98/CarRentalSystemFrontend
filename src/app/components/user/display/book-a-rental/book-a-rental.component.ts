import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/interfaces/car';
import { Rental } from 'src/app/interfaces/rental';
import { RentalResponse } from 'src/app/interfaces/rental-response';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-book-a-rental',
  templateUrl: './book-a-rental.component.html',
  styleUrls: ['./book-a-rental.component.scss']
})
export class BookARentalComponent {
  rentals: Rental[] = [];
  addRentalForm!: FormGroup;
  availableCars!: Car[];
  totalPages: number = 0;
  currentPage: number = 0;
  errorMessage: string = '';
  selectedCarIds: number[] = [];

  constructor(private rentalService: RentalService,
    private carService: CarService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
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

  submitFormData() {
    const formData = this.addRentalForm.value;

    const rentalFormData = {
      email: formData.email,
      startDate: formData.startDate,
      endDate: formData.endDate,
      carsId: this.selectedCarIds
    };

    console.log(rentalFormData)

    this.rentalService.addRental(rentalFormData)
    .subscribe(result => {
      this.addRentalForm.reset()
      console.log(result)
      console.log("Rental added successfully.")
      window.location.reload();
    })

  }

  toggleCarSelection(carId: number) {
    const index = this.selectedCarIds.indexOf(carId);
  
    if (index !== -1) {
      // Car ID is already selected, remove it
      this.selectedCarIds.splice(index, 1);
    } else {
      // Car ID is not selected, add it
      this.selectedCarIds.push(carId);
    }
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
    })
  }
}
