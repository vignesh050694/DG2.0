import { Injectable } from '@angular/core';
import { CommonHttpClientService } from '../../../../common/commonHttpService';
import { AppConfiguration } from '../../../../common/App.configuration';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private commonHttpClientService: CommonHttpClientService,
    private appConfiguration: AppConfiguration) {
    
  }
  getCountry=(postPerPage: any, pageNumber: number, filter: any[])=> {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getCountry, data);
  }

  addCountry = (data: any) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.addCountry, data);
  }

  getCountryById = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getCountryById + id);
  }
  deleteCountry = (id) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteCountry + id);
  }
  randomNumber=()=> {
    return Math.floor((Math.random() * 100) + 1);
  }
}
