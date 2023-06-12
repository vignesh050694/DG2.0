import { Injectable } from '@angular/core';
import { CommonHttpClientService } from '../../../common/commonHttpService';
import { AppConfiguration } from '../../../common/App.configuration';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  getBuyerById = (id) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getBuyerById + id);
  }

  getAllBuyers = () => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getAllBuyer);
  }

  addBuyer = (data) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.addBuyer, data);
  }

  getBuyer = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getBuyer, data);
  }

  deleteBuyer = (id) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteBuyer + id);
  }

  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }
}
