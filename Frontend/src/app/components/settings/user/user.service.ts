import { Injectable } from '@angular/core';
import { CommonHttpClientService } from '../../../common/commonHttpService';
import { AppConfiguration } from '../../../common/App.configuration';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }
  getUserById = (id) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getUserById + id);
  }

  checkValidLogin = (data: any) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.checkUserLogin, data);
  }

  addUser = (data, token) => {
    let userData = {
      data: data,
      token: token
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.addUser, data);
  }
  getUser = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getUser, data);
  }
  deleteUser = (id) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteUser + id);
  }
  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }
}

