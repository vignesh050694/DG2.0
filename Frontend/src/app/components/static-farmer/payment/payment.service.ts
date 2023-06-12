import { AppConfiguration } from 'src/app/common/App.configuration';
import { CommonHttpClientService } from 'src/app/common/commonHttpService';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

getPayment = (postPerPage:any,pageNumber: number,filter:any[])=> {
  let data = {
    "draw": this.randomNumber(),
    "filter": filter,
    "pageNo": pageNumber,
    "pageSize": postPerPage,
  }
  return this.commonHttpClientService.httpPost(this.appConfiguration.getPayment,data);
}
getPaymentById(id: string) {
  return this.commonHttpClientService.httpGet(this.appConfiguration.getPaymentById+id);
}

addPayment = (data: any) => {
  return this.commonHttpClientService.httpPost(this.appConfiguration.addPayment, data);
}


getAllPayment = (filter: any[]) =>{
  return this.commonHttpClientService.httpPost(this.appConfiguration.getPayment, filter);
}
randomNumber =() =>{
  return Math.floor((Math.random()*100) + 1);
}

getAllPayments = () => {
  return this.commonHttpClientService.httpGet(this.appConfiguration.getAllPayment)
}

getBalanceByFarmer = (event :any) => {
  return this.commonHttpClientService.httpGet(this.appConfiguration.getAmountByFarmer+event)
}


}
