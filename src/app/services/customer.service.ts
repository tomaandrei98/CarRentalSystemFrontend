import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerResponse } from '../interfaces/customer-response';
import { CustomerResponseById } from '../interfaces/customer-response-by-id';
import { Customer } from '../interfaces/customer';
import { BASE_URL } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl: string = BASE_URL + "/customers"

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>(this.baseUrl)
  }

  getCustomerById(id: number): Observable<CustomerResponseById> {
    return this.http.get<CustomerResponseById>(`${this.baseUrl}/${id}`)
  }

  getCustomersPaginated(pageNumber: number = 0, pageSize: number = 10, sortBy: string = "firstName"): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`)
  }

  updateCustomer(id: number, customer: Customer): Observable<CustomerResponse> {
    return this.http.put<CustomerResponse>(`${this.baseUrl}/${id}`, customer)
  }

  addCustomer(customer: Customer): Observable<CustomerResponse> {
    return this.http.post<CustomerResponse>(this.baseUrl, customer)
  }

  deleteCustomerById(id: number): Observable<CustomerResponse> {
    return this.http.delete<CustomerResponse>(`${this.baseUrl}/${id}`)
  }
}
