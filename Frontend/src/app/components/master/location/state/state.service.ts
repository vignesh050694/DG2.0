import { Injectable } from '@angular/core';
import { CommonHttpClientService } from '../../../../common/commonHttpService';
import { AppConfiguration } from '../../../../common/App.configuration';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private commonHttpClientService: CommonHttpClientService,
    private appConfiguration: AppConfiguration) { }

  getState =(postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getState, data);
  }

  addState = (data: any) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.addState, data);
  }

  getStateById = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getStateById+ id);
  }

  deleteState = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteState+id);
  }

  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }
}
