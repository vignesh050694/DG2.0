import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavigationExtras } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    catchError(error => {
      if (error) {
        switch (error.status) {
          case 400:
            if (error.error.errors) {
              const modalStateError = [];
              for (const key of error.error.errors) {
                if (error.error.errors[key])
                  modalStateError.push(error.error.errors[key]);
              }
              throw modalStateError.flat;
            }
            else {
              console.log(error.statusText, error.status);
            }
            break;
          case 401:
            console.log(error.statusText, error.status);
            break;
          case 404:
            //nav to error page
            break;
          case 500:
            const navigationExtras: NavigationExtras = { state: { error: error.error } }
            //navigate to error page passing nav extras
            break;
          default:
            //default message
            break;
        }
      }
      return throwError(error);
    })
    return next.handle(request);
  }
}
