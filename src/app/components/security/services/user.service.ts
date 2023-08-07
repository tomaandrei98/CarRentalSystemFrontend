import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "http://localhost:8080/auth";

  constructor(private httpClient: HttpClient,
    private userAuthService: UserAuthService) { }


    public register(first_name: string, 
      last_name: string,
      username: string,
      email: string,
      password: string,
      role: string): Observable<any> {

      const params = new URLSearchParams();
      params.set('first_name', first_name);
      params.set('last_name', last_name);
      params.set('email', email);
      params.set('username', username);
      params.set('password', password);
      params.set('role', role);
  
      const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', "No-Auth": "True" });
  
      return this.httpClient.post<any>(`${this.apiUrl}/register`, params, { headers });
    }

    public login(username: string, password: string): Observable<any> {
      const params = new URLSearchParams();
      params.set('username', username);
      params.set('password', password);
  
      const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', "No-Auth": "True" });
  
      return this.httpClient.post<any>(`${this.apiUrl}/login`, params.toString(), { headers });
    }
  
    public roleMatch(allowedRoles: Array<string>) {
      let isMatch = false;
      const userRole: any = this.userAuthService.getRole()
  
      if (userRole != null && userRole) {
        for (let i = 0; i < allowedRoles.length; i++) {
          if (userRole === allowedRoles[i]) {
            isMatch = true;
            return isMatch
          } else {
            return isMatch
          }
        }
      } 
  
      return false
    }
}
