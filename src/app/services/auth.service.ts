import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  appUrl = "https://localhost:7248/";

  register(data: any) {
    return this.http.post(this.appUrl + "api/Company/register-company", data);
  }
  login(data: any) {
    return this.http.post(this.appUrl + "Authenticate/login", data);
  }
  getData() {
    return this.http.get(this.appUrl + "api/Advertisements")
  }
  // auth.service.ts
getUserRoles(): string[] {
  const authToken = localStorage.getItem('logintoken');
  if (authToken) {
    try {
      const tokenPayload = JSON.parse(atob(authToken.split('.')[1])); // Decode the JWT payload

      // Check if the 'roles' claim is present in the token
      if (tokenPayload && tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']) {
        const roles = tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        return Array.isArray(roles) ? roles : [roles];
      } else {
        console.error('Roles claim not found in the token.');
      }
    } catch (error) {
      console.error('Error decoding JWT:', error);
    }
  }
  return [];
}

}
