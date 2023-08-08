import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/interfaces/car';
import { CarResponse } from 'src/app/interfaces/car-response';
import { Category } from 'src/app/interfaces/category';
import { CarService } from 'src/app/services/car.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-car-admin',
  templateUrl: './car-admin.component.html',
  styleUrls: ['./car-admin.component.scss'],
})
export class CarAdminComponent implements OnInit {
  status = ['AVAILABLE', 'RENTED', 'MAINTENANCE', 'SOLD'];
  transmission = ['MANUAL', 'AUTOMATIC']
  cars: Car[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  categories: Category[] = [];
  addCarForm!: FormGroup;
  updateCarForm!: FormGroup;
  id!: number;
  carToUpdate!: Car;

  constructor(
    private carService: CarService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCars();
    this.loadCategories();
    this.addCarFormInit();
    this.updateCarFormInit();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((result) => {
      this.categories = result.data;
      // console.log(this.categories);
    });
  }

  loadCars() {
    // this.carService.getCars().subscribe(result => {
    //   this.cars = result.data
    //   console.log(this.cars)
    // })

    this.carService.getCarsPaginated().subscribe((result) => {
      this.cars = result.data.cars;
      this.totalPages = result.data.numberOfPages;
      // console.log('paginated: ' + JSON.stringify(result));
    });
  }

  goToNextOrPreviousPage(direction: string) {
    this.goToPage(
      direction === 'forward' ? this.currentPage + 1 : this.currentPage - 1
    );
  }

  goToPage(pageNumber: number = 0) {
    this.carService
      .getCarsPaginated(pageNumber, 10, 'make')
      .subscribe((result) => {
        this.currentPage = pageNumber;
        this.cars = result.data.cars;
        this.totalPages = result.data.numberOfPages;
        // console.log('paginated: ' + JSON.stringify(result));
      });
  }

  addCarFormInit() {
    this.addCarForm = new FormGroup({
      make: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required, this.yearValidator]),
      imageUrl: new FormControl('', [Validators.required]),
      rentalPricePerDay: new FormControl('', [
        Validators.required,
        Validators.min(0),
        this.rentalPriceValidator,
      ]),
      status: new FormControl(''),
      seats: new FormControl('', [Validators.required, this.oneDigitValidator]),
      transmission: new FormControl('', [Validators.required]),
      smallBag: new FormControl('', [Validators.required, this.oneDigitValidator]),
      largeBag: new FormControl('', [Validators.required, this.oneDigitValidator]),
      categoryId: new FormControl(''),
    });
  }

  // validators
  rentalPriceValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const rentalPrice = Number(control.value);
    if (rentalPrice < 0) {
      return { negativeRentalPrice: true };
    }
    return null;
  }

  yearValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const yearPattern = /^[0-9]{4}$/;
    if (!yearPattern.test(control.value)) {
      return { invalidYear: true };
    }
    return null;
  }

  oneDigitValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const yearPattern = /^[0-9]{1}$/;
    if (!yearPattern.test(control.value)) {
      return { invalidSeats: true };
    }

    if  (control.value === 0) {
      return { invalidSeats: true}
    }

    return null;
  }

  
  updateCarFormInit() {
    this.updateCarForm = new FormGroup({
      id: new FormControl(''),
      make: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required, this.yearValidator]),
      imageUrl: new FormControl('', [Validators.required]),
      rentalPricePerDay: new FormControl('', [
        Validators.required,
        Validators.min(0),
        this.rentalPriceValidator,
      ]),
      status: new FormControl(''),
      seats: new FormControl('', [Validators.required, this.oneDigitValidator]),
      transmission: new FormControl('', [Validators.required]),
      smallBag: new FormControl('', [Validators.required, this.oneDigitValidator]),
      largeBag: new FormControl('', [Validators.required, this.oneDigitValidator]),
      categoryId: new FormControl(''),
    });
  }

  submitFormData() {
    console.log(this.addCarForm.value);

    this.carService.addCar(this.addCarForm.value).subscribe((result) => {
      this.addCarForm.reset();
      console.log(result);
      console.log('Car added successfully.');
      this.loadCars();
    });

    this.router.navigateByUrl('/admin');
  }

  submitUpdatedFormData() {
    console.log(this.updateCarForm.value);

    this.carService.updateCar(this.updateCarForm.value).subscribe((result) => {
      this.updateCarForm.reset();
      console.log(result);
      console.log('Car updated successfully.');
      this.loadCars();
    });
  }

  populateModalForEdit(car: Car) {
    if (car.id) {
      this.id = car.id;

      this.carService.getCarById(this.id).subscribe((response) => {
        this.carToUpdate = response.data;
        this.updateCarForm.patchValue({
          id: this.id,
        });
      });
    }
  }

  confirmDelete(car: Car) {
    const confirmation = confirm(
      `Are you sure you want to delete the car: ${JSON.stringify(car)}?`
    );

    if (confirmation) {
      this.deleteCar(car);
    }
  }

  deleteCar(car: Car) {
    if (car.id) {
      this.carService.deleteCarById(car.id).subscribe(
        (data: CarResponse) => {
          console.log(data.message);
          this.loadCars();
        },
        (error) => {
          console.log(error);
          console.log('Error while deleting the car:', error.error.message);
          if (error.status === 404) {
            console.log('Car not found:', error.error.message);
          } else if (error.status === 400) {
            console.log('Bad request:', error.error.message);
          } else {
            console.log('An error occurred:', error.error.message);
          }
        }
      );
    }
  }
}
