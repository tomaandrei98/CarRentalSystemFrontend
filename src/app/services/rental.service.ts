import { Injectable } from '@angular/core';
import { BASE_URL } from '../constants/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RentalResponse } from '../interfaces/rental-response';
import { Rental } from '../interfaces/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private baseUrl: string = BASE_URL + "/rentals"

  constructor(private http: HttpClient) { }

  getRentals(): Observable<RentalResponse> {
    return this.http.get<RentalResponse>(this.baseUrl)
  }

  addRental(rental: Rental): Observable<RentalResponse> {
    return this.http.post<RentalResponse>(this.baseUrl, rental)
  }

  deleteRentalById(id: number): Observable<RentalResponse> {
    return this.http.delete<RentalResponse>(`${this.baseUrl}/${id}`)
  }

  returnRental(id: number): Observable<RentalResponse> {
    return this.http.get<RentalResponse>(`${this.baseUrl}/return/${id}`)
  }
}
