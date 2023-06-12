import { Injectable } from '@angular/core';
import { CommonHttpClientService } from '../../../common/commonHttpService';
import { AppConfiguration } from '../../../common/App.configuration';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }
  getAllCrops = () => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getAllCrops);
  }
  getAllVareity = () => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getAllVareity);
  }
  async getVareityByCrop(id) {
    let data = await this.commonHttpClientService.httpGet(this.appConfiguration.getVareityByCrop + id).toPromise();
    return data;
  }
  async getGradeByVariety(id) {
    let data = await this.commonHttpClientService.httpGet(this.appConfiguration.getGradeByVariety + id).toPromise();
    return data;
  }
}
