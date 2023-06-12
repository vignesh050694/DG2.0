import { Injectable } from '@angular/core';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { CommonHttpClientService } from 'src/app/common/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class ProductReturnFarmerService {
  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  addProductReturnFarmer = (data: any) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.addProductReturnFarmer, data);
  }

  getById = (id: String) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getProductReturnFarmer + id);
  };

  delete = (id:String)=>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteProductReturnFarmer + id);
  }

}
