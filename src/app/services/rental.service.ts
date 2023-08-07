import { Injectable } from '@angular/core';
import { BASE_URL } from '../constants/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RentalResponse } from '../interfaces/rental-response';
import { Rental } from '../interfaces/rental';
import { UserAuthService } from '../components/security/services/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private baseUrl: string = BASE_URL + "/rentals"

  constructor(private http: HttpClient, private userAuthService: UserAuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.userAuthService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getRentals(): Observable<RentalResponse> {
    const headers = this.getAuthHeaders();
    return this.http.get<RentalResponse>(this.baseUrl, { headers })
  }

  getRentalsPaginated(pageNumber: number = 0, pageSize: number = 10, sortBy: string = "id"): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.baseUrl}/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`, { headers })
  }

  addRental(rental: Rental): Observable<RentalResponse> {
    const headers = this.getAuthHeaders();
    return this.http.post<RentalResponse>(this.baseUrl, rental, { headers })
  }

  deleteRentalById(id: number): Observable<RentalResponse> {
    const headers = this.getAuthHeaders();
    return this.http.delete<RentalResponse>(`${this.baseUrl}/${id}`, { headers })
  }

  returnRental(id: number): Observable<RentalResponse> {
    const headers = this.getAuthHeaders();
    return this.http.get<RentalResponse>(`${this.baseUrl}/return/${id}`, { headers })
  }
}
