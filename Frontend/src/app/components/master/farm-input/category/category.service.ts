import { Injectable } from '@angular/core';
import { CommonHttpClientService } from '../../../../common/commonHttpService';
import { AppConfiguration } from '../../../../common/App.configuration';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  getCategoryById = (id) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getCategoryById + id);
  }

  addCategory = (data) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.addCategory, data);
  }
  getCategory = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getCategory, data);
  }
  deleteCategory = (id) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteCategory + id);
  }
  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }
}

