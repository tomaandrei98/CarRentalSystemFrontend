import { Injectable } from '@angular/core';
import { BASE_URL } from '../constants/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RentalResponse } from '../interfaces/rental-response';
import { Rental } from '../interfaces/rental';
import { RentalCreate } from '../interfaces/rental-create';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private baseUrl: string = BASE_URL + "/rentals"

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`)
  }
  
  getRentals(): Observable<RentalResponse> {
    const headers = this.getAuthHeaders()
    return this.http.get<RentalResponse>(this.baseUrl, { headers })
  }

  getRentalsPaginated(pageNumber: number = 0, pageSize: number = 10, sortBy: string = "startDate"): Observable<any> {
    const headers = this.getAuthHeaders()
    return this.http.get<any>(`${this.baseUrl}/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`, { headers })
  }

  addRental(rental: RentalCreate): Observable<RentalResponse> {
    const headers = this.getAuthHeaders()
    return this.http.post<RentalResponse>(this.baseUrl, rental, { headers })
  }

  addRentalWithEmail(rental: RentalCreate): Observable<RentalResponse> {
    const headers = this.getAuthHeaders()
    return this.http.post<RentalResponse>(`${this.baseUrl}/admin`, rental, { headers })
  }

  deleteRentalById(id: number): Observable<RentalResponse> {
    const headers = this.getAuthHeaders()
    return this.http.delete<RentalResponse>(`${this.baseUrl}/${id}`, { headers })
  }

  returnRental(id: number): Observable<RentalResponse> {
    const headers = this.getAuthHeaders()
    return this.http.get<RentalResponse>(`${this.baseUrl}/return/${id}`, { headers })
  }
}
