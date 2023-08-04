import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private carService: CarService,
    private categoryService: CategoryService) {

  }

  ngOnInit(): void {
    this.loadCars()
    this.loadCategories()
    this.filterCarFormInit()   
  }

  filterCarFormInit() {
    this.filterCarForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)])
    })
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
    this.categoryService.getCategories().subscribe(result => {
      this.categories = result.data
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
