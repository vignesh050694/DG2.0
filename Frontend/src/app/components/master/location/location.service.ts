import { Injectable } from '@angular/core';
import { CommonHttpClientService } from '../../../common/commonHttpService';
import { AppConfiguration } from '../../../common/App.configuration';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }

  getAllCountries = () => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getAllCountry);
  }
  getAllStateByCountry = (id) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getStatesByCountry + id);
  }

  getAllDistrictByState = (id) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getAllDistrictByState + id);
  }

  getAllTalukByDistrict = (id) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getAllTalukByDistrict + id);
  }

  getVillageByTaluk = (id: string) => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getVillageByTaluk + id);
  }

  getLocationCount = () => {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getLocationCount);
  }

  getAllVillages() {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getAllVillage);
  }

}
