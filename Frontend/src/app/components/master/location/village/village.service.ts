import { Injectable } from '@angular/core';
import { CommonHttpClientService } from '../../../../common/commonHttpService';
import { AppConfiguration } from '../../../../common/App.configuration';

@Injectable({
  providedIn: 'root'
})
export class VillageService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  getVillage = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getVillage, data);
  }

  addVillage = (data: any) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.addVillage, data);
  }

  getAllVillages = () =>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.getAllVillage);
  }

  getVillageById = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getVillageById + id);
  }

  deleteVillage = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteVillage + id);
  }
  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }

  getVillageByTaluk = (taluk : string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getVillageByTaluk + taluk);
  }
}
