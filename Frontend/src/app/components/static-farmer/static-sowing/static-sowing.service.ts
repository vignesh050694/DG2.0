import { AppConfiguration } from 'src/app/common/App.configuration';
import { CommonHttpClientService } from 'src/app/common/commonHttpService';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaticSowingService {

constructor(
  private commonHttpClientService: CommonHttpClientService,
  private appConfiguration: AppConfiguration
) { }

getSowing = (postPerPage: any, pageNumber: number, filter: any[]) => {
  let data = {
    "draw": this.randomNumber(),
    "filter": filter,
    "pageNo": pageNumber,
    "pageSize": postPerPage
  }
  return this.commonHttpClientService.httpPost(this.appConfiguration.getSowing, data);
}

addSowing = (data: any) => {
  return this.commonHttpClientService.httpPost(this.appConfiguration.addSowing, data);
}

getSowingById = (id: string) => {
  return this.commonHttpClientService.httpGet(this.appConfiguration.getSowingById + id);
}

deleteSowingById = (id: string) => {
  return this.commonHttpClientService.httpGet(this.appConfiguration.deleteSowingById + id);
}

getAllSowing = (filter: any[]) => {
  return this.commonHttpClientService.httpPost(this.appConfiguration.getAllSowing, filter);
}
getSowingByFarmId = () => {
  return this.commonHttpClientService.httpGet(this.appConfiguration.getSowingByFarmId);
}

getAllFarms = () => {
  return this.commonHttpClientService.httpGet(this.appConfiguration.getAllFarm);
};
randomNumber = () => {
  return Math.floor((Math.random() * 100) + 1);
}

getAllCrops = () => {
  return this.commonHttpClientService.httpGet(this.appConfiguration.getAllCrops);
}
getAllVareity = () => {
  return this.commonHttpClientService.httpGet(this.appConfiguration.getAllVareity);
}
async getVareityByCrop(id) {
  let data = await this.commonHttpClientService.httpGet(this.appConfiguration.getVareityByCrop + id).toPromise();
  return data;
}
async getGradeByVariety(id) {
  let data = await this.commonHttpClientService.httpGet(this.appConfiguration.getGradeByVariety + id).toPromise();
  return data;
}
}
