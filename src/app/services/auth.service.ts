import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  // private userRoles: string[] = [];
  // Method to check if the user has a specific role
  static hasUserRole(expectedRole: any): boolean {
    const roles = AuthService.getUserRolesFromToken();

    // Check if the expectedRole is present in the roles array
    return roles.includes(expectedRole);
  }

  getUserRoles(): string[] {
    return AuthService.getUserRolesFromToken();
  }



  // Static method for navigation
  // static redirectToLogin(router: Router): void {
  //   router.navigate(['/login']);
  // }


  constructor(private http: HttpClient, private router: Router) { }

  appUrl = "https://localhost:7248/";

  static redirectToLogin(router: Router, url?: string) {
    if (url) {
      router.navigate([url]);
    } else {
      router.navigate(['/login']); // Replace with your login route
    }
  }
  logout(): void {
    // Clear any user-related data or tokens from local storage or service
    localStorage.removeItem('logintoken');

    // Navigate to the login page or any other desired route
    this.router.navigate(['/login']);
  }
  register(data: any) {
    return this.http.post(this.appUrl + "api/Company/register-company", data);
  }

  login(data: any) {
    return this.http.post(this.appUrl + "Authenticate/login", data);
  }

  // Company
  status(id: any) {
    return this.http.get(this.appUrl + "api/Company/decline/"+id );
  }

  getData() {
    return this.http.get(this.appUrl + "api/Company")
  }
  frontData() {
    return this.http.get(this.appUrl + "api/Company/Companies")
  }

  editData(ID: any) {
    return this.http.get(this.appUrl + "api/Company/"+ID)
  }
  deleteData(ID: any){
    return this.http.delete(this.appUrl + 'api/Company/delete-company/'+ID)
  }
  updateData(ID: any,data: any) {
    return this.http.put(this.appUrl + "api/Company/"+ID, data);
  }
  // auth.service.ts
  private static getUserRolesFromToken(): string[] {
    const authToken = localStorage.getItem('logintoken');
    if (authToken) {
      try {
        const tokenPayload = JSON.parse(atob(authToken.split('.')[1])); // Decode the JWT payload

        // Check if the 'roles' claim is present in the token
        if (tokenPayload && tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']) {
          const roles = tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          const userRoles = Array.isArray(roles) ? roles : [roles];
          return userRoles;
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
