import { Injectable } from '@angular/core';
import { CommonHttpClientService } from '../../../../common/commonHttpService';
import { AppConfiguration } from '../../../../common/App.configuration';

@Injectable({
  providedIn: 'root'
})
export class VarietyService {
  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  getVarietyById = (id) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getVarietyById + id);
  }

  addVariety = (data) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.addVareity, data);
  }
  getVariety = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getVariety, data);
  }
  deleteVariety = (id) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteVariety + id);
  }
  getAllVariety=()=>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.getAllVareity);
  }
  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }

  async getVareityByCrop(id) {
    let data = await this.commonHttpClientService.httpGet(this.appConfiguration.getVareityByCrop + id).toPromise();
    return data;
  }
}
