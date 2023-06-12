import { Injectable } from '@angular/core';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { CommonHttpClientService } from 'src/app/common/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class LoanDisbursementService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  addLoanDisbursement = (data: any) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.addLoanDisbursement, data);
  }

  getLoanDisbursement = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getLoanDisbursement, data);
  };

  getReport = (postPerPage: any, pageNumber: number, filter: any[], report: string) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage,
      "report": report
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getGenericReport, data);
  };

  getFilters = (report: String) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getReportFilters + report);
  };

  getById = (id: String) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getLoanDisbursementById + id);
  };

  delete = (id:String)=>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteLoanDisbursement + id);
  }


  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }

}
