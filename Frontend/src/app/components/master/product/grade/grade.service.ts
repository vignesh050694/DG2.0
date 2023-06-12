import { Injectable } from '@angular/core';
import { CommonHttpClientService } from '../../../../common/commonHttpService';
import { AppConfiguration } from '../../../../common/App.configuration';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  getGradeById = (id) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getGradeById + id);
  }

  addGrade = (data) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.addGrade, data);
  }
  getGrade = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getGrade, data);
  }
  deleteGrade = (id) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteGrade + id);
  }
  getAllGrade=()=>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.getAllGrade);
  }
  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }
}
