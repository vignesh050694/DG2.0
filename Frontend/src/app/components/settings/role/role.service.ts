import { Injectable } from '@angular/core';
import { CommonHttpClientService } from '../../../common/commonHttpService';
import { AppConfiguration } from '../../../common/App.configuration';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }
  getParentMenu = () => {
    let data = [
      {
        "key": "parent",
        "operation": "NULL",
        "orPredicate": false,
        "value": null
      }
    ];
    return this.commonHttpClientService.httpPost(this.appConfiguration.getMenus, data);
  }
  getRoleMenu = (parentMenuId: string, roleId: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getRoleMenu + parentMenuId + '&role=' + roleId);
  }
  saveRole = (data: any) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.saveRole, data);
  }
  getRoles = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getRoles, data);
  }

  getAllRoles = () => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getAllRoles);
  }
  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }
}
