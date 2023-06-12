import { Injectable } from '@angular/core';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { CommonHttpClientService } from 'src/app/common/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class DistributionStockTransferService {

constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

addDistributionStockTransfer = (data: any) => {
  return this.commonHttpClientService.httpPost(this.appConfiguration.addDistributionStockTransfer , data);
}

getById = (id: String) => {
  return this.commonHttpClientService.httpGet(this.appConfiguration.getDistributionStockTransferById + id);
};

getDistributionStockTransfer = (postPerPage: any, pageNumber: number, filter: any[]) => {
  let data = {
    "draw": this.randomNumber(),
    "filter": filter,
    "pageNo": pageNumber,
    "pageSize": postPerPage
  }
  return this.commonHttpClientService.httpPost(this.appConfiguration.getDistributionStockTransfer, data);
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

delete = (id:String)=>{
  return this.commonHttpClientService.httpGet(this.appConfiguration.deleteDistributionStockTransfer + id);
}

randomNumber = () => {
  return Math.floor((Math.random() * 100) + 1);
}

}
