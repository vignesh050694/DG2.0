import { Injectable } from '@angular/core';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { CommonHttpClientService } from 'src/app/common/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class FarmerMapService {

constructor( private commonHttpClientService: CommonHttpClientService,
  private appConfiguration: AppConfiguration) { }

  getFarmerview = () => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.getFarmerCount
    );
  };
}
