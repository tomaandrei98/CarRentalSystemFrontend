import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryResponse } from '../interfaces/category-response';
import { Category } from '../interfaces/category';
import { CategoryResponseById } from '../interfaces/category-response-by-id';
import { BASE_URL } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl: string = BASE_URL + "/categories"

  constructor(private http: HttpClient) { }

  getCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(this.baseUrl);
  }

  getCategoryById(id: number) {
    return this.http.get<CategoryResponseById>(`${this.baseUrl}/${id}`)
  }

  updateCategory(id: number, category: Category) {
    return this.http.put<CategoryResponse>(`${this.baseUrl}/${id}`, category)
  }

  addCategory(category: Category): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(this.baseUrl, category);
  }

  deleteCategoryById(id: number): Observable<CategoryResponse> {
    return this.http.delete<CategoryResponse>(`${this.baseUrl}/${id}`)
  }
}
