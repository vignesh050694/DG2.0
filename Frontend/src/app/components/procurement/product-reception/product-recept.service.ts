import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../../common/App.configuration';
import { CommonHttpClientService } from '../../../common/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class ProductReceptService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration, private httpClient: HttpClient) { }
  addReception = (data: any) => {
    return this.commonHttpClientService.httpPost("procurement/reception/save", data);
  }
  getProductTransferByReceipt = (id: any) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getReceipt + id);
  }
  getReceiptByWarehouse = (id: any) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getReceiptByWarehouse + id);
  }
  getById = (id: String) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getProductReceptionById + id);
  };
  getProductReception = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getProductReception, data);
  }

  delete = (id:String)=>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteProductReception + id);
  }

  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }
}
