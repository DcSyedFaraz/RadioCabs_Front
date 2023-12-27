import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private router: Router) { }

  appUrl = "https://localhost:7248/";

  // Requests
  getCompanies() {
    return this.http.get(`${this.appUrl}api/Company/request`);
  }

  getAdvertisements() {
    return this.http.get(`${this.appUrl}api/Advertisements/request`);
  }

  getDrivers() {
    return this.http.get(`${this.appUrl}api/Drivers/request`);
  }

  // Search
  search(keyword: string) {
    return this.http.get(`${this.appUrl}api/company/search?keyword=${keyword}`);
  }

  // Advertisment
  getAD() {
    return this.http.get(this.appUrl + "api/Advertisements")
  }
  frontAD() {
    return this.http.get(this.appUrl + "api/Advertisements/front")
  }
  createAD(data: any) {
    return this.http.post(this.appUrl + "api/Advertisements", data)
  }
  editAD(ID: any) {
    return this.http.get(this.appUrl + "api/Advertisements/" + ID)
  }
  deleteAD(ID: any) {
    return this.http.delete(this.appUrl + 'api/Advertisements/' + ID)
  }
  updateAD(ID: any, data: any) {
    return this.http.put(this.appUrl + "api/Advertisements/" + ID, data);
  }



  // Status
  appAD(ID: any) {
    return this.http.get(this.appUrl + "api/Advertisements/approved/" + ID)
  }
  decAD(ID: any) {
    return this.http.get(this.appUrl + "api/Advertisements/decline/" + ID)
  }

  // Driver
  getDriver() {
    return this.http.get(this.appUrl + "api/Drivers")
  }
  frontDriver() {
    return this.http.get(this.appUrl + "api/Drivers/front")
  }
  createDriver(data: any) {
    return this.http.post(this.appUrl + "api/Drivers", data)
  }

  editDriver(ID: any) {
    return this.http.get(this.appUrl + "api/Drivers/" + ID)
  }
  deleteDriver(ID: any) {
    return this.http.delete(this.appUrl + 'api/Drivers/' + ID)
  }
  updateDriver(ID: any, data: any) {
    return this.http.put(this.appUrl + "api/Drivers/" + ID, data);
  }
  // Status
  appDriver(ID: any) {
    return this.http.get(this.appUrl + "api/Drivers/approved/" + ID)
  }
  decDriver(ID: any) {
    return this.http.get(this.appUrl + "api/Drivers/decline/" + ID)
  }

  // Company Status

  appCompany(ID: any) {
    return this.http.get(this.appUrl + "api/Company/approved/" + ID)
  }
  decCompany(ID: any) {
    return this.http.get(this.appUrl + "api/Company/decline/" + ID)
  }

  // Feedback
  getFeed() {
    return this.http.get(this.appUrl + "api/Feedback")
  }

  editFeed(ID: any) {
    return this.http.get(this.appUrl + "api/Feedback/" + ID)
  }

  deleteFeed(ID: any) {
    return this.http.delete(this.appUrl + 'api/Feedback/' + ID)
  }

  createfeedback(data: any) {
    return this.http.post(this.appUrl + "api/Feedback", data)
  }



}
