import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../../common/App.configuration';
import { CommonHttpClientService } from '../../../common/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class FarmInputService {

  constructor(private commonHttpClientService: CommonHttpClientService, private appConfiguration: AppConfiguration) { }
  getFarmInputCount() {
    return this.commonHttpClientService.httpGet(this.appConfiguration.getCategoryCount);
  }
}
