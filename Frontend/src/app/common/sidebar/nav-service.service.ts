import { Injectable } from '@angular/core';
import { AppConfiguration } from '../App.configuration';
import { CommonHttpClientService } from '../commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class NavServiceService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }
  getMenu = (data: any) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.getMenu, data);
  }
}
