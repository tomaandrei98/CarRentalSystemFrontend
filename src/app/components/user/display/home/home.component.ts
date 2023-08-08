import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/interfaces/car';
import { Category } from 'src/app/interfaces/category';
import { CarService } from 'src/app/services/car.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
    this.categoryService.getCategoriesPaginated().subscribe(result => {
      this.categories = result.data.categories
    })
  }
}
