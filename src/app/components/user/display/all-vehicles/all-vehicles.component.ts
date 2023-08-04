import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/interfaces/car';
import { Category } from 'src/app/interfaces/category';
import { CarService } from 'src/app/services/car.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-all-vehicles',
  templateUrl: './all-vehicles.component.html',
  styleUrls: ['./all-vehicles.component.scss']
})
export class AllVehiclesComponent implements OnInit {
  cars: Car[] = [];
  categories: Category[] = [];

  constructor(private carService: CarService,
    private categoryService: CategoryService) {

  }
 
  ngOnInit(): void {
    this.loadCars()
    this.loadCategories()   
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
}
