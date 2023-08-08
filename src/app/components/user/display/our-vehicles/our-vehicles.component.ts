import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Car } from 'src/app/interfaces/car';
import { Category } from 'src/app/interfaces/category';
import { CarService } from 'src/app/services/car.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-our-vehicles',
  templateUrl: './our-vehicles.component.html',
  styleUrls: ['./our-vehicles.component.scss']
})
export class OurVehiclesComponent implements OnInit {
  cars: Car[] = [];
  categories: Category[] = [];
  filterCarForm!: FormGroup;
  priceFilterForm!: FormGroup;

  constructor(private carService: CarService,
    private categoryService: CategoryService) {

  }

  ngOnInit(): void {
    this.loadCars()
    this.loadCategories()
    this.filterCarFormInit()   
    this.priceFilterFormInit();
  }

  filterCarFormInit() {
    this.filterCarForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)])
    })
  }

  priceFilterFormInit() {
    this.priceFilterForm = new FormGroup({
      minPrice: new FormControl('', [Validators.required]),
      maxPrice: new FormControl('', [Validators.required])
    });
  }

  filterByPriceRange() {
    const minPrice = this.priceFilterForm.value.minPrice;
    const maxPrice = this.priceFilterForm.value.maxPrice;

    if (minPrice !== null && maxPrice !== null && minPrice > maxPrice) {
      // Handle the case where the user input is invalid (minPrice > maxPrice)
      return;
    }

    this.cars = this.cars
      .filter(car => { 
        return car.rentalPricePerDay >= minPrice && car.rentalPricePerDay <= maxPrice
      });

    this.priceFilterForm.reset()
    // You can add logic here to call the backend with the price range parameters
    // and update the cars list accordingly
  }


  filterFormData() {
    this.carService.getCarsByMatchingName(this.filterCarForm.value.name).subscribe(result => {
      this.cars = result.data
      this.filterCarForm.reset()
    })
  }

  loadCars() {
    this.carService.getCars().subscribe(result => {
      this.cars = result.data
    })
  }

  loadCategories() {
    this.categoryService.getCategoriesPaginated().subscribe(result => {
      this.categories = result.data.categories
    })
  }

  filterCarsByCategory(category: Category) {
    if(category.id) {
      this.carService.getCarsByCategoryId(category.id).subscribe(result => {
        this.cars = result.data
      })
    }
  }

}
