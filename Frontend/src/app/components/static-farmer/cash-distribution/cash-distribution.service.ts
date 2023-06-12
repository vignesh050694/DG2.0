import { Injectable } from '@angular/core';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { CommonHttpClientService } from 'src/app/common/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class CashDistributionService {

constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

getCashDistribution = (postPerPage: any, pageNumber: number,filter: any[]) =>{
  let data = {
    "draw": this.randomNumber(),
    "filter": filter,
    "pageNo": pageNumber,
    "pageSize": postPerPage,
  }
  return this.commonHttpClientService.httpPost(this.appConfiguration.getCashDistribution, data);
}

addCashDistribution = (data: any) =>{
  return this.commonHttpClientService.httpPost(this.appConfiguration.addCashDistribution, data);
}

getCashDistributionById = (id: string) =>{
  return this.commonHttpClientService.httpGet(this.appConfiguration.getCashDistributionById + id);
}

// deleteCashDistribution = (id: string) =>{
//   return this.commonHttpClientService.httpGet(this.appConfiguration.deleteCashDistribution +id);
// }

getAllCashDistribution = (filter: any[]) =>{
  return this.commonHttpClientService.httpPost(this.appConfiguration.getAllCashDistribution, filter);
}

getAllCashDistributions = () =>{
  return this.commonHttpClientService.httpGet(this.appConfiguration.getAllCashDistribution);
}
randomNumber =() =>{
  return Math.floor((Math.random()*100) + 1);
}
}
