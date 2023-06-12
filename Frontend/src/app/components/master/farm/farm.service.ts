import { Injectable } from '@angular/core';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { CommonHttpClientService } from 'src/app/common/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class FarmService {
  addFarm(data: any) {
    throw new Error('Method not implemented.');
  }
  getFarmById(id: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  getAllFarm = () => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getAllFarms);
  }

}
