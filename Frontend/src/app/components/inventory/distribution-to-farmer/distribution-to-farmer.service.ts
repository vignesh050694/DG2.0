import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../../common/App.configuration';
import { CommonHttpClientService } from '../../../common/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class DistributionToFarmerService {


  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  addDistributionToFarmer = (data: any) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.addDistributionToFarmer, data);
  }

  getById = (id: String) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getDistributionToFarmerById + id);
  };

  delete = (id:String)=>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteDistributionToFarmer + id);
  }

  deleteDetail = (id:String)=>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteDistributionToFarmerDetail + id);
  }

}
