import { Injectable } from '@angular/core';
import { CommonHttpClientService } from '../../../../common/commonHttpService';
import { AppConfiguration } from '../../../../common/App.configuration';

@Injectable({
  providedIn: 'root'
})
export class CropService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  getCrop = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getCrop, data);
  }
  addCrop = (data) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.addCrop, data);
  }
  getCropById = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getCropById + id);
  }
  deleteCrop = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteCrop + id);
  }
  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }
  getCatalogues = () => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getAllCatalogues);
  }
  async getAllCrops() {
    let data = await this.commonHttpClientService.httpGet(this.appConfiguration.getAllCrops).toPromise();
    return data;
  }

  getCropCount = () => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getCropCount);
  }

}
