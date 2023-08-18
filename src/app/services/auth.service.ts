import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    const params = new HttpParams()
    .set('first_name', userData.first_name)
    .set('last_name', userData.last_name)
    .set('email', userData.email)
    .set('password', userData.password)
    .set('phone', userData.phone)
    .set('username', userData.username)
    .set('role', userData.role);

    return this.http.post(`${this.baseUrl}/register`, null, {params});
  }

  loginUser(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post(`${this.baseUrl}/login`, null, { params });
  }

  isAdmin(): boolean {
    const role = localStorage.getItem('role');
    return role === 'ADMIN';
  }

  isLoggedIn(): boolean {
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');

    return !!username && !!role && !!token;
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
