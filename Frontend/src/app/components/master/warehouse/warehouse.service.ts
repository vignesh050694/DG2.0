import { Injectable } from '@angular/core';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { CommonHttpClientService } from 'src/app/common/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  getWarehouse = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getWarehouse, data);
  }

  getWarehouseStock = (criterias: any[]) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.getWarehouseStock, criterias);
  };

  getWarehousesById = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getWarehouseById + id);
  }
  addWarehouse = (data: any) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.addWarehouse, data);
  }
  deleteWarehouse = (id) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteWarehouse + id);
  }
  getAllWarehouse = () => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getAllWarehouses);
  }
  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }
}
