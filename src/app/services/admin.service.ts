import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private router: Router) { }

  appUrl = "https://localhost:7248/";

// Advertisment
  getAD() {
    return this.http.get(this.appUrl + "api/Advertisements")
  }
  createAD(data: any) {
    return this.http.post(this.appUrl + "api/Advertisements",data)
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

  // Driver
  getDriver() {
    return this.http.get(this.appUrl + "api/Drivers")
  }
  createDriver(data: any) {
    return this.http.post(this.appUrl + "api/Drivers",data)
  }

  editDriver(ID: any) {
    return this.http.get(this.appUrl + "api/Drivers/"+ID)
  }
  deleteDriver(ID: any){
    return this.http.delete(this.appUrl + 'api/Drivers/'+ID)
  }
  updateDriver(ID: any,data: any) {
    return this.http.put(this.appUrl + "api/Drivers/"+ID, data);
  }

  // Feedback
  getfeedback() {
    return this.http.get(this.appUrl + "api/Feedback")
  }

  createfeedback(data: any) {
    return this.http.post(this.appUrl + "api/Feedback",data)
  }

  deletefeedback(ID: any){
    return this.http.delete(this.appUrl + 'api/Feedback/'+ID)
  }

}
