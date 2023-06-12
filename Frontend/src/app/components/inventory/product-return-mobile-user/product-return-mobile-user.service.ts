import { Injectable } from '@angular/core';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { CommonHttpClientService } from 'src/app/common/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class ProductReturnMobileUserService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  addProductReturnMobileUser = (data: any) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.addProductReturnMobileUser, data);
  }

  getById = (id: String) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getProductReturnMobileUser + id);
  };

  delete = (id:String)=>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteProductReturnMobileUser + id);
  }

}
