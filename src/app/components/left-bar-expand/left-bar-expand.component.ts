import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-left-bar-expand',
  templateUrl: './left-bar-expand.component.html',
  styleUrls: ['./left-bar-expand.component.scss']
})
export class LeftBarExpandComponent implements OnInit {
  categories: Category[] = []

  constructor(private categoryService: CategoryService){}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.data;
      console.log(this.categories);
    })
  }
}
