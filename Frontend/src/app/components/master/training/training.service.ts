import { Injectable } from '@angular/core';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { CommonHttpClientService } from 'src/app/common/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  getTrainingTypes() {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getAllTrainingTypes);
  }


  addTraining = (data: any) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.addTraining, data);
  }


  getTraining = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getTrainings, data);
  }

  getTrainingById(id: string) {
    return this.commonHttpClientService.httpGet(this.appConfiguration.addTrainingById+id);
  }

  deleteTraining = (id) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteTraining + id);
  }

  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }

}
