import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { CategoryResponse } from 'src/app/interfaces/category-response';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.scss']
})
export class LeftBarComponent implements OnInit{
  categories: Category[] = []

  constructor(private categoryService: CategoryService){}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.data
      console.log(this.categories)
    })
  }
}
