import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../../common/App.configuration';
import { CommonHttpClientService } from '../../../common/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class CropSaleService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) {
  }
  getCropSale = (postPerPage: any, pageNumber: number, filter: any[], report: string) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage,
      "report": report
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getGenericReport, data);
  };
  addCropSale = (data: any) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.addCropSale, data);
  }
  getById = (id) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getCropSaleById + id);
  }

  delete = (id:String)=>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteCropSale + id);
  }

  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }
}
