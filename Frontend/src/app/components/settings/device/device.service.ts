import { Injectable } from '@angular/core';
import { CommonHttpClientService } from '../../../common/commonHttpService';
import { AppConfiguration } from '../../../common/App.configuration';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }
  //getDeviceById = (id) => {
  //  return this.commonHttpClientService.httpGet(this.appConfiguration.getDeviceById + id);
  //}

  //addDevice = (data) => {
  //  return this.commonHttpClientService.httpPost(this.appConfiguration.addDevice, data);
  //}
  getDevice = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getDevice, data);
  }
  //deleteDevice = (id) => {
  //  return this.commonHttpClientService.httpGet(this.appConfiguration.deleteDevice + id);
  //}
  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }
}
