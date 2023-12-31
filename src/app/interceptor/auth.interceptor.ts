import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('logintoken')
    const newclone = request.clone({
      setHeaders:{
        Authorization:`Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })





    return next.handle(newclone);
  }


}
