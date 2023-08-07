import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryResponse } from '../interfaces/category-response';
import { Category } from '../interfaces/category';
import { CategoryResponseById } from '../interfaces/category-response-by-id';
import { BASE_URL } from '../constants/constants';
import { UserAuthService } from '../components/security/services/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl: string = BASE_URL + "/categories"

  constructor(private http: HttpClient,
    private userAuthService: UserAuthService) { }

  getCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(this.baseUrl);
  }

  getCategoryById(id: number) {
    return this.http.get<CategoryResponseById>(`${this.baseUrl}/${id}`)
  }

  getCategoriesPaginated(pageNumber: number = 0, pageSize: number = 10, sortBy: string = "id"): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`)
  }

  updateCategory(id: number, category: Category) {
    const headers = this.getAuthHeaders();
    return this.http.put<CategoryResponse>(`${this.baseUrl}/${id}`, category, {headers})
  }

  addCategory(category: Category): Observable<CategoryResponse> {
    const headers = this.getAuthHeaders();
    return this.http.post<CategoryResponse>(this.baseUrl, category, {headers});
  }

  deleteCategoryById(id: number): Observable<CategoryResponse> {
    const headers = this.getAuthHeaders();
    return this.http.delete<CategoryResponse>(`${this.baseUrl}/${id}`, {headers})
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.userAuthService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
