import { Injectable } from '@angular/core';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { CommonHttpClientService } from 'src/app/common/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class MobileUserService {
  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  addMobileUser = (data) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.addMobileUser, data);
  }

  getMobileUser = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getMobileUser,data);
  }
  getMobileUserById = (id:string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getMobileUserById+id);
  }
  deleteMobileUser = (id) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteMobileUser + id);
  }
  getAllMobileUser = () =>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.getAllMobileUsers);
  }
  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }

  getMobileUserByName = (name:string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getMobileUserByName+name);
  }

  getBalanceByFarmer = (id : string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getBalanceByPayment + id);
  }
}

