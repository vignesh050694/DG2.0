import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerRoutingModule } from './buyer-routing.module';
import { BuyerComponent } from './buyer/buyer.component';
import { BuyerAddComponent } from './buyer-add/buyer-add.component';
import { BuyerListComponent } from './buyer-list/buyer-list.component';
import { TranslateModule, TranslateLoader, TranslateService, TranslateStore, LangChangeEvent } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { CommonSharedModule } from '../../../common/common-shared.module';
export function createTranslateLoader(http: HttpClient) {
  console.log('VendorModule createTranslateLoader');
  return new TranslateHttpLoader(
    http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [BuyerComponent, BuyerAddComponent, BuyerListComponent],
  imports: [
    CommonModule,
    BuyerRoutingModule,
    CommonSharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      isolate: true
    })
  ],
  entryComponents: [
    BuyerAddComponent
  ]
})
export class BuyerModule { }
