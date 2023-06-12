import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { CommonHttpClientService } from 'src/app/common/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  isFarmerSubmit: boolean = false;
  data: any[];
  constructor(
    private commonHttpClientService: CommonHttpClientService,
    private appConfiguration: AppConfiguration,
    private httpClient: HttpClient) { }

  setFarmerSubmit(submit: boolean) {
    this.isFarmerSubmit = submit;
  }
  getFarmerSubmit() {
    return this.isFarmerSubmit;
  }
  getDropdownDependency(url: string, params: any) {
    return this.commonHttpClientService.httpPost((this.appConfiguration.baseUrl + url), params);
  }

  getFormFields(id: string) {
    return this.commonHttpClientService.httpGet((this.appConfiguration.getFarmerMenu + id));
  }

  addFarmerDetails = (data: any) => {
    return this.commonHttpClientService.httpPost(this.appConfiguration.saveFarmerDetails, data);
  }

}
