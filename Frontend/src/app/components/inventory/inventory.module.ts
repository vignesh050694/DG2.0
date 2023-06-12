import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { CommonSharedModule } from 'src/app/common/common-shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CommonSharedModule,
    InventoryRoutingModule
  ]
})
export class InventoryModule { }
