import { Injectable } from '@angular/core';
import { BASE_URL } from '../constants/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RentalResponse } from '../interfaces/rental-response';
import { Rental } from '../interfaces/rental';
import { RentalCreate } from '../interfaces/rental-create';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private baseUrl: string = BASE_URL + "/rentals"

  constructor(private http: HttpClient) { }

  getRentals(): Observable<RentalResponse> {
    return this.http.get<RentalResponse>(this.baseUrl)
  }

  getRentalsPaginated(pageNumber: number = 0, pageSize: number = 10, sortBy: string = "startDate"): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`)
  }

  addRental(rental: RentalCreate): Observable<RentalResponse> {
    return this.http.post<RentalResponse>(this.baseUrl, rental)
  }

  deleteRentalById(id: number): Observable<RentalResponse> {
    return this.http.delete<RentalResponse>(`${this.baseUrl}/${id}`)
  }

  returnRental(id: number): Observable<RentalResponse> {
    return this.http.get<RentalResponse>(`${this.baseUrl}/return/${id}`)
  }
}
