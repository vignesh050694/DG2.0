import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionComponent } from './transaction/transaction.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '../master/season/season.module';
import { HttpClient } from '@angular/common/http';
import { CommonSharedModule } from '../../common/common-shared.module';
import { FarmerModule } from '../farmer/farmer.module';


@NgModule({
  declarations: [TransactionComponent],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      isolate: true
    }),
    CommonSharedModule,
    FarmerModule
  ]
})
export class TransactionModule { }
