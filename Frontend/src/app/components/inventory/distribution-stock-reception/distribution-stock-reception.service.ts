import { Injectable } from '@angular/core';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { CommonHttpClientService } from 'src/app/common/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class DistributionStockReceptionService {

constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

addDistributionStockReception = (data: any) => {
  return this.commonHttpClientService.httpPost(this.appConfiguration.addDistributionStockReception , data);
}

getDistributionStockReceptionByReceipt = (id: any) => {
  return this.commonHttpClientService.httpGet(this.appConfiguration.ByReceipt + id);
}

getDistributionStockReceptionReceiptByWarehouse = (id : any) =>{
  return this.commonHttpClientService.httpGet(this.appConfiguration.getDistributionReceiptByWarehouse + id);
}

getById = (id: String) => {
  return this.commonHttpClientService.httpGet(this.appConfiguration.getDistributionStockReceptionById + id);
};

getDistributionStockReception = (postPerPage: any, pageNumber: number, filter: any[]) => {
  let data = {
    "draw": this.randomNumber(),
    "filter": filter,
    "pageNo": pageNumber,
    "pageSize": postPerPage
  }
  return this.commonHttpClientService.httpPost(this.appConfiguration.getDistributionStockReception, data);
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
  return this.commonHttpClientService.httpGet(this.appConfiguration.deleteDistributionStockReception + id);
}

randomNumber = () => {
  return Math.floor((Math.random() * 100) + 1);
}

}
