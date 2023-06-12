import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { VendorComponent } from './vendor/vendor.component';
import { VendorAddComponent } from './vendor-add/vendor-add.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { CommonSharedModule } from '../../../common/common-shared.module';
import { TranslateModule, TranslateLoader, TranslateService, TranslateStore, LangChangeEvent } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
export function createTranslateLoader(http: HttpClient) {
  console.log('VendorModule createTranslateLoader');
  return new TranslateHttpLoader(
    http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [VendorComponent, VendorAddComponent, VendorListComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    VendorRoutingModule,
    CommonSharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      isolate: true
    })
  ]
})
export class VendorModule { }
