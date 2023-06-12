import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductTransferRoutingModule } from './product-transfer-routing.module';
import { ProductTransferComponent } from './product-transfer.component';
import { ProductTransferAddComponent } from './product-transfer-add/product-transfer-add.component';
import { ProductTransferListComponent } from './product-transfer-list/product-transfer-list.component';
import {ProductTransferDetailComponent} from '../product-transfer/product-transfer-detail/product-transfer-detail.component'
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
  declarations: [ProductTransferComponent, ProductTransferAddComponent, ProductTransferListComponent, ProductTransferDetailComponent],
  imports: [
    CommonModule,
    CommonSharedModule,
    ProductTransferRoutingModule,
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
    ProductTransferAddComponent
  ]
})
export class ProductTransferModule { }
