import { Injectable } from '@angular/core';
import { CommonHttpClientService } from '../../../../common/commonHttpService';
import { AppConfiguration } from '../../../../common/App.configuration';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  getDistrict = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getDistrict, data);
  }

  addDistrict = (data: any) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.addDistrict, data);
  }

  getDistrictById = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getDistrictById+id);
  }

  deleteDistrict = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteDistrict+id);
  }

  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }
}
