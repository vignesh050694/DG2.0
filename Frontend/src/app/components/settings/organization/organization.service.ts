import { Injectable } from '@angular/core';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { CommonHttpClientService } from 'src/app/common/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  addOrganization = (data) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.addOrganization, data);
  }

  getOrganization = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getOrganization,data);
  }
  getOrganizationById = (id:string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getOrganizationById+id);
  }
  deleteOrganization = (id) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteOrganization + id);
  }
  getAllOrganization = () => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getAllOrganization);
  }
  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }
}
