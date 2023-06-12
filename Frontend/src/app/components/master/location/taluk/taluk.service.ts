import { Injectable } from '@angular/core';
import { CommonHttpClientService } from '../../../../common/commonHttpService';
import { AppConfiguration } from '../../../../common/App.configuration';

@Injectable({
  providedIn: 'root'
})
export class TalukService {
  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  getTaluk = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getTaluk, data);
  }

  addTaluk = (data: any) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.addTaluk, data);
  }

  getTalukById = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getTalukById+id);
  }

  deleteTaluk = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteTaluk+id);
  }
  getAllTaluk = () => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getAllTaluk);
  }
  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }
}
