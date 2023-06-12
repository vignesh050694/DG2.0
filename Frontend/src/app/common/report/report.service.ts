import { Injectable } from '@angular/core';
import { AppConfiguration } from '../App.configuration';
import { CommonHttpClientService } from '../commonHttpService';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration, private httpClient: HttpClient) { }

  getReport = (postPerPage: any, pageNumber: number, filter: any[], report: string) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage,
      "report": report
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getGenericReport, data);
  }

  getReportAsync = (postPerPage: any, pageNumber: number, filter: any[], report: string) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage,
      "report": report
    }
    let http = this.commonHttpClientService.httpPost(this.appConfiguration.getGenericReport, data).toPromise()
    return http;
  }

  downloadPDF = (report): any => {
    console.log(this.appConfiguration.downloadPdf);
    return this.commonHttpClientService.httpGet(this.appConfiguration.downloadPdf + report);
  }

  getAggreate = (report: String) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getAggregateReport + report);
  };

  getFilters = (report: String) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getReportFilters + report);
  };

  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }
  getReportDetail = (id: string,report: string) => {
    let data = {
      "id": id,
      "report": report
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getReportDetail, data);
  }


}
