import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarResponse } from '../interfaces/car-response';
import { CarResponseById } from '../interfaces/car-response-by-id';
import { Car } from '../interfaces/car';
import { BASE_URL } from '../constants/constants';
import { UserAuthService } from '../components/security/services/user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private baseUrl: string = BASE_URL + '/cars';

  constructor(private http: HttpClient, 
    private userAuthService: UserAuthService) {}

  getCars(): Observable<CarResponse> {
    return this.http.get<CarResponse>(this.baseUrl);
  }

  getCarsPaginated(pageNumber: number = 0, pageSize: number = 10, sortBy: string = "make"): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`)
  }

  getCarById(id: number) {
    return this.http.get<CarResponseById>(`${this.baseUrl}/${id}`);
  }

  updateCar(car: Car) {
    const headers = this.getAuthHeaders();
    return this.http.put<CarResponse>(`${this.baseUrl}`, car, {headers});
  }

  addCar(car: Car): Observable<CarResponse> {
    const headers = this.getAuthHeaders();
    return this.http.post<CarResponse>(this.baseUrl, car, {headers});
  }

  deleteCarById(id: number): Observable<CarResponse> {
    const headers = this.getAuthHeaders();
    return this.http.delete<CarResponse>(`${this.baseUrl}/${id}`, {headers});
  }

  getAvailableCars(
    startDate: string,
    endDate: string
  ): Observable<CarResponse> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<CarResponse>(`${this.baseUrl}/available`, { params });
  }

  getCarsByCategoryId(id: number): Observable<CarResponse> {
    return this.http.get<CarResponse>(`${this.baseUrl}/category/${id}`);
  }

  getCarsByMatchingName(name: string) {
    const params = new HttpParams().set('matchingName', name);

    return this.http.get<CarResponse>(`${this.baseUrl}/filter`, { params });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.userAuthService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
