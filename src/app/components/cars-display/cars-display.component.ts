import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/interfaces/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cars-display',
  templateUrl: './cars-display.component.html',
  styleUrls: ['./cars-display.component.scss']
})
export class CarsDisplayComponent implements OnInit {
  cars: Car[] = []

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.getCars();
  }

  getCars(){
    this.carService.getCars().subscribe(response => {
      this.cars = response.data;
      console.log(this.cars)
    })
  }
}
