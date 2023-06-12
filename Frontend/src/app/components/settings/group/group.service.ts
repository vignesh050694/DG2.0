import { Injectable } from '@angular/core';
import { CommonHttpClientService } from '../../../common/commonHttpService';
import { AppConfiguration } from '../../../common/App.configuration';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }
  getGroupById = (id) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getGroupById+id);
  }

  addGroup = (data) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.addGroup, data);
  }

  getAllGroup = () => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getAllGroups);
  }


  getGroup = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getGroup,data);
  }
  deleteGroup = (id) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteGroup + id);
  }
  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }
}
