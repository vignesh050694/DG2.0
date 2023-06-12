import { Injectable } from '@angular/core';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { CommonHttpClientService } from 'src/app/common/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class DistributionToMobileUserService {

constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }


addDistributionToMobileUser = (data: any) => {
  return this.commonHttpClientService.httpPost(this.appConfiguration.addDistributionToMobileUser , data);
}

getMobileUserStock = (criterias: any[]) => {
  return this.commonHttpClientService.httpPost(this.appConfiguration.getMobileUserStock, criterias);
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
  return this.commonHttpClientService.httpGet(this.appConfiguration.getDistributionToMobileUserById + id);
};

delete = (id:String)=>{
  return this.commonHttpClientService.httpGet(this.appConfiguration.deleteDistributionToMobileUser + id);
}

deleteDetail = (id:String)=>{
  return this.commonHttpClientService.httpGet(this.appConfiguration.deleteDistributionToMobileUserDetail + id);
}



randomNumber = () => {
  return Math.floor((Math.random() * 100) + 1);
}

}
