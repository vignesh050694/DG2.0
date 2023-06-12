import { Injectable } from '@angular/core';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { CommonHttpClientService } from 'src/app/common/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  getFarmer = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getFarmer, data);
  }

  addFarmer = (data: any) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.addFarmer, data);
  }

  getFarmerById = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getFarmerById + id);
  }

  deleteFarmer = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteFarmer + id);
  }
  getAllFarmer = (filter: any[]) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.getAllFarmer, filter);
  }
  getAllFarmers = () => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getAllFarmer);
  }
  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }
}
