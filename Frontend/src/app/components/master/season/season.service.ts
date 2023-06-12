import { Injectable } from '@angular/core';
import { CommonHttpClientService } from '../../../common/commonHttpService';
import { AppConfiguration } from '../../../common/App.configuration';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  getSeasonById = (id) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getSeasonById+id);
  }

  addSeason = (data) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.addSeason, data);
  }
  getSeason = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      "draw": this.randomNumber(),
      "filter": filter,
      "pageNo": pageNumber,
      "pageSize": postPerPage
    }
    return this.commonHttpClientService.httpPost(this.appConfiguration.getSeason,data);
  }
  deleteSeason = (id) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.deleteSeason + id);
  }
  getAllSeasons=()=>{
    return this.commonHttpClientService.httpGet(this.appConfiguration.getAllSeasons);
  }
  randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
  }
}
