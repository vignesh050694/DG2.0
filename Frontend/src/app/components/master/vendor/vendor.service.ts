import { Injectable } from '@angular/core';
import { CommonHttpClientService } from '../../../common/commonHttpService';
import { AppConfiguration } from '../../../common/App.configuration';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }
  getVendorById = (id) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getVendorById + id);
  }

  addVendor = (data) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.addVendor, data);
  }

  getAllVendors = () =>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.getAllVendor);
  }

  getVendor = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getVendor, data);
  }
  deleteVendor = (id) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteVendor + id);
  }
  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }
}
