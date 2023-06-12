import { Injectable } from '@angular/core';
import { CommonHttpClientService } from '../../../common/commonHttpService';
import { AppConfiguration } from '../../../common/App.configuration';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  getCatalogue = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getCatalogues, data);
  }

  getCataloguesTypes = () => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getCataloguesTypes);
  }

  getCataloguesById = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getCataloguesById + id);
  }

  getCataloguesByType = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getCataloguesByType + id);
  }

  addCatalogue = (data: any) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.addCatalogue, data);
  }

  deleteCatalogues = (id) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteCatalogues + id);
  }

  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }

  getCatalougesByIds=(ids:any)=>{
    return this.commonHttpClientService.httpPost(this.appConfiguration.getCataloguesByIds , ids);
  }

  getCataloguesByTypes=(list:any)=>{
    return this.commonHttpClientService.httpPost(this.appConfiguration.getCataloguesByTypes, list);
  }
}
