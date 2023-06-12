import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../../common/App.configuration';
import { CommonHttpClientService } from '../../../common/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class ProductTransferService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  getTransferGrades(warehouse: string, product: string) {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getTransferGrades + '?crop=' + product + '&warehouse=' + warehouse);
  }

  getById = (id: String) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getProductTransferById + id);
  };

  addProductTransfer(data: any) {
    return this.commonHttpClientService.httpPost(this.appConfiguration.addProductTransfer, data);
  }
  getProductTransfer = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getProductTransfer, data);
  }

  delete = (id:String)=>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteProductTransfer + id);
  }

  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }
}
