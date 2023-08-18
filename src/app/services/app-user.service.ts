import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BASE_URL } from '../constants/constants';
import { AppUserResponse } from '../interfaces/app-user-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {
  private baseUrl: string = BASE_URL + '/users';

  constructor(private http: HttpClient,
    private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`)
  }

  getAppUsers(): Observable<AppUserResponse> {
    const headers = this.getAuthHeaders()
    return this.http.get<AppUserResponse>(this.baseUrl, { headers })
  }


  getAppUsersPaginated(pageNumber: number = 0, pageSize: number = 10, sortBy: string = "firstName"): Observable<any> {
    const headers = this.getAuthHeaders()
    return this.http.get<any>(`${this.baseUrl}/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`, { headers })
  }

  updateUser(userId: number, userData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    const url = `${this.baseUrl}/${userId}`;
    return this.http.put(url, userData, { headers });
  }

  deleteUser(username: string): Observable<any> {
    const headers = this.getAuthHeaders();
    const url = `${this.baseUrl}/${username}`;
    return this.http.delete(url, { headers });
  }
}
