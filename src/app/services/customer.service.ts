import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { CustomerResponse } from '../interfaces/customer-response';
import { CustomerResponseById } from '../interfaces/customer-response-by-id';
import { Customer } from '../interfaces/customer';
import { BASE_URL } from '../constants/constants';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl: string = BASE_URL + "/customers"

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`)
  }

  getCustomers(): Observable<CustomerResponse> {
    const headers = this.getAuthHeaders()
    return this.http.get<CustomerResponse>(this.baseUrl, { headers })
  }

  getCustomerById(id: number): Observable<CustomerResponseById> {
    const headers = this.getAuthHeaders()
    return this.http.get<CustomerResponseById>(`${this.baseUrl}/${id}`, { headers })
  }

  getCustomersPaginated(pageNumber: number = 0, pageSize: number = 10, sortBy: string = "firstName"): Observable<any> {
    const headers = this.getAuthHeaders()
    return this.http.get<any>(`${this.baseUrl}/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`, { headers })
  }

  updateCustomer(id: number, customer: Customer): Observable<CustomerResponse> {
    const headers = this.getAuthHeaders()
    return this.http.put<CustomerResponse>(`${this.baseUrl}/${id}`, customer, { headers })
  }

  addCustomer(customer: Customer): Observable<CustomerResponse> {
    const headers = this.getAuthHeaders()
    return this.http.post<CustomerResponse>(this.baseUrl, customer, { headers })
  }

  checkEmailExists(email: string): Observable<boolean> {
    const headers = this.getAuthHeaders()
    return this.http.get<boolean>(`${this.baseUrl}/check-email?email=${email}`, { headers });
  }

  deleteCustomerById(id: number): Observable<CustomerResponse> {
    const headers = this.getAuthHeaders()
    return this.http.delete<CustomerResponse>(`${this.baseUrl}/${id}`, { headers })
  }
}
