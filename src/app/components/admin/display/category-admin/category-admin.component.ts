import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { CategoryResponse } from 'src/app/interfaces/category-response';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-admin',
  templateUrl: './category-admin.component.html',
  styleUrls: ['./category-admin.component.scss']
})
export class CategoryAdminComponent implements OnInit {
  categories: Category[] = []
  addCategoryForm!: FormGroup;
  updateCategoryForm!: FormGroup;
  totalPages: number = 0;
  currentPage: number = 0;
  categoryToUpdate!: Category;
  id!: number

  constructor(private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadCategories();
    this.addCategoryFormInit();
    this.updateCategoryFormInit();
  }
  
  addCategoryFormInit() {
    this.addCategoryForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl('', [Validators.required, Validators.minLength(2)])
    })
  }

  updateCategoryFormInit() {
    this.updateCategoryForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl('', [Validators.required, Validators.minLength(2)])
    })
  }

  loadCategories() {
    // this.categoryService.getCategories().subscribe(response => {
    //   this.categories = response.data
    //   console.log(this.categories)
    // })

    this.categoryService.getCategoriesPaginated().subscribe((result) => {
      this.categories = result.data.categories;
      this.totalPages = result.data.numberOfPages;
      // console.log('paginated: ' + JSON.stringify(result));
    });
  }

  goToPage(pageNumber: number) {
    this.categoryService
      .getCategoriesPaginated(pageNumber, 10, 'id')
      .subscribe((result) => {
        this.currentPage = pageNumber;
        this.categories = result.data.categories;
        this.totalPages = result.data.numberOfPages;
      });
  }

  goToNextOrPreviousPage(direction: string) {
    this.goToPage(
      direction === 'forward' ? this.currentPage + 1 : this.currentPage - 1
    );
  }

  submitFormData() {
    // console.log(this.addCategoryForm.value);
    
    this.categoryService.addCategory(this.addCategoryForm.value)
    .subscribe(data => {
      this.addCategoryForm.reset();
      console.log(data);
      console.log("Category added successfully.");
      this.loadCategories()
    })
    
    // window.location.reload();

    this.router.navigateByUrl('/admin')
  }

  submitUpdatedFormData() {
    // console.log(this.updateCategoryForm.value);

    this.categoryService.updateCategory(this.id, this.updateCategoryForm.value)
      .subscribe(
        result => {
          this.updateCategoryForm.reset()
          console.log(result)
          console.log("Category updated successfully.")
          this.loadCategories()
        }
      )
  }

  populateModalForEdit(category: Category) {
    if(category.id) {
      this.id = category.id

      this.categoryService.getCategoryById(this.id)
      .subscribe(response => {
        this.categoryToUpdate = response.data
      })
    }
  }

  confirmDelete(category: Category) {
    const confirmation = confirm(
      `Are you sure you want to delete the category: ${JSON.stringify(category)}?`
    )

    if(confirmation) {
      this.deleteCategory(category);
    }
  }

  deleteCategory(category: Category) {
    if(category.id) {
      this.categoryService.deleteCategoryById(category.id)
      .subscribe((data: CategoryResponse) => {
        console.log(data.message)
        this.loadCategories()
      })  
    }
  }
}
