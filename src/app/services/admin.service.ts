import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private router: Router) { }

  appUrl = "https://localhost:7248/";

  getAD() {
    return this.http.get(this.appUrl + "api/Advertisements")
  }

  editAD(ID: any) {
    return this.http.get(this.appUrl + "api/Advertisements/"+ID)
  }
  deleteAD(ID: any){
    return this.http.delete(this.appUrl + 'api/Advertisements/'+ID)
  }
  updateAD(ID: any,data: any) {
    return this.http.put(this.appUrl + "api/Advertisements/"+ID, data);
  }
}
