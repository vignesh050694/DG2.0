import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../../common/App.configuration';
import { CommonHttpClientService } from '../../../common/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class WarhouseStockService {
  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  addWarehouseStock = (data: any) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.addWarehouseStock, data);
  }

  getWarehouseStock = (postPerPage: any, pageNumber: number, filter: any[]) => {
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

  getById = (id: String) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getWarehouseStockById + id);
  };

  getFilters = (report: String) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getReportFilters + report);
  };

  delete = (id:String)=>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteWarehouseStock + id);
  }

  deleteDetail = (id:String)=>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteWarehouseStockDetail + id);
  }

  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }
}
