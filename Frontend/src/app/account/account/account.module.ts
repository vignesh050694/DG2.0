import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { CommonSharedModule } from 'src/app/common/common-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccountRoutingModule,
    CommonSharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
  ]
})
export class AccountModule { }
