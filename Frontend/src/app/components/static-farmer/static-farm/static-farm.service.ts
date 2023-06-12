import { AppConfiguration } from './../../../common/App.configuration';
import { Injectable } from '@angular/core';
import { CommonHttpClientService } from 'src/app/common/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class StaticFarmService {

constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  getFarm = (postPerPage: any, pageNumber: number,filter: any[]) =>{
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage,
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getFarm, data);
  }

  addFarm = (data: any) =>{
    return this.commonHttpClientService.httpPost(this.appConfiguration.addFarm, data);
  }

  getFarmById = (id: string) =>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.getFarmById + id);
  }

  deleteFarm = (id: string) =>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteFarm +id);
  }

  getAllFarm = (filter: any[]) =>{
    return this.commonHttpClientService.httpPost(this.appConfiguration.getAllFarm, filter);
  }

  getAllFarms = () =>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.getAllFarm);
  }
  randomNumber =() =>{
    return Math.floor((Math.random()*100) + 1);
  }
}
