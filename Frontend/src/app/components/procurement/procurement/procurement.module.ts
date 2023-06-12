import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ProcurementRoutingModule } from './procurement-routing.module';
import { ProcurementAddComponent } from './procurement-add/procurement-add.component';
import { ProcurementListComponent } from './procurement-list/procurement-list.component';
import { CommonSharedModule } from '../../../common/common-shared.module';
import { TranslateModule, TranslateLoader, TranslateService, TranslateStore, LangChangeEvent } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ProcurementComponent } from './procurement/procurement.component';
import { ProcurementProductDetailsComponent } from './procurement-product-details/procurement-product-details.component';

export function createTranslateLoader(http: HttpClient) {
  console.log('VendorModule createTranslateLoader');
  return new TranslateHttpLoader(
    http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [ProcurementAddComponent, ProcurementListComponent, ProcurementComponent, ProcurementProductDetailsComponent],
  imports: [
    CommonModule,
    ProcurementRoutingModule,
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
  providers: [DatePipe]
})
export class ProcurementModule { }
