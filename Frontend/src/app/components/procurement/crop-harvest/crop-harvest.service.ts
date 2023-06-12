import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../../common/App.configuration';
import { CommonHttpClientService } from '../../../common/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class CropHarvestService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  addCropHarvest(data: any) {
    return this.commonHttpClientService.httpPost(this.appConfiguration.addCropHarvest, data);
  }

  getById = (id: String) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getCropHarvestById + id);
  };

  getCropHarvest = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getCropHarvest, data);
  }

  delete = (id:String)=>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteCropHarvest + id);
  }

  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }
}
