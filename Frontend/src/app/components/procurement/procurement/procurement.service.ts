import { Injectable } from '@angular/core';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { CommonHttpClientService } from 'src/app/common/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class ProcurementService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  addProcurement = (data: any) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.addProcurement, data);
  }

  getProcuremnt = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getProcurement, data);
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

  getAggreate = (report: String) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getAggregateReport + report);
  };

  deleteProcurement = (id: String)=>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteProcurement+ id);
  }

  getById = (id: String) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getProcurementById + id);
  };

  getFilters = (report: String) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getReportFilters + report);
  };

  delete = (id:String)=>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteProcurement + id);
  }

  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }

  getLastFiveProcurementByFarmer=(id:any)=>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.getProcurementByFarmerId + id);
  }

}
