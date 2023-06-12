import { Injectable } from '@angular/core';
import { CommonHttpClientService } from '../../../../common/commonHttpService';
import { AppConfiguration } from '../../../../common/App.configuration';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  getSubCategoryById = (id) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getSubCategoryById + id);
  }

  getProductByCategory = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getSubCategoryByCategory + id);
  };


  addSubCategory = (data) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.addSubCategory, data);
  }

  getSubCategory = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getSubCategory, data);
  }

  deleteSubCategory = (id) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteSubCategory + id);
  }

  getAllCategories = () => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getAllCategory);
  }

  getCatalogues = () => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getAllCatalogues);
  }



  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }
}
