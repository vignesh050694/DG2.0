import { Injectable, NgZone, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { AppConfiguration } from './App.configuration';
import { throwError, of, Observable } from 'rxjs';
import { catchError } from "rxjs/operators";
import { ResponseModalService } from './response-modal/response-modal.service';


const httpOptions = {
  headers: new HttpHeaders(
    {
       "Content-Type": "application/json",
       "Access-Control-Allow-Origin": "*"
    },)
};
const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
const uploadHttpOptions = {
  headers: headers
};
@Injectable({
  providedIn: 'root'
})
export class CommonHttpClientService{
  baseUrl: string = "";
  constructor(private httpClient: HttpClient, private appConfiguration: AppConfiguration,
    private injector: Injector, private zone: NgZone, private responseModalService: ResponseModalService) {
    this.baseUrl = this.appConfiguration.baseUrl;
  }


  httpGet = (url: string) => {
    return this.httpClient
      .get(this.baseUrl + url, httpOptions)
      .pipe(catchError(error => {
        this.errorHandler(error)
        return throwError(error);
      }));
  }

  httpPost = (url: string, data: any) => {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    return this.httpClient
      .post<any>(this.baseUrl + url, data, httpOptions)
      .pipe(catchError(error => {
        this.errorHandler(error)
        return throwError(error);
      }));
  }
  httpDelete = (url: string, data: any) => {
    return this.httpClient.delete(this.baseUrl + url + "?id=" + data, httpOptions)
      .pipe(catchError(error => {
        this.errorHandler(error)
        return throwError(error);
      }));
  }
  errorHandler = (error: any) => {
    if (error?.error?.message) {
      console.log(`Error: ${error?.error?.message}`);
      this.responseModalService.OpenStatusModal(this.appConfiguration.failureIconUrl, "Error", error?.error?.message)
    }
    else {
      // this.responseModalService.OpenStatusModal(this.appConfiguration.failureIconUrl, "Error", "something went wrong!")
      console.log(JSON.stringify(error));
    }
  }

  uploadFile = (body) => {
    let url = this.baseUrl+this.appConfiguration.uploadFile;
    return this.httpClient
      .post<any>(url, body).pipe(catchError(error => {
        this.errorHandler(error)
        return throwError(error);
      }));
  }

    getFile = (url: string) => {
     return this.httpClient.get(this.baseUrl + url, { responseType: 'blob' }).pipe(
          catchError((error) => {
            this.errorHandler(error);
            return throwError(error);
          })
     );
  };


}
