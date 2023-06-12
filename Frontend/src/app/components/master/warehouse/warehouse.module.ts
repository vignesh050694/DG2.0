import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { WarehouseAddComponent } from './warehouse-add/warehouse-add.component';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
import { CommonSharedModule } from 'src/app/common/common-shared.module';


@NgModule({
  declarations: [WarehouseComponent, WarehouseAddComponent, WarehouseListComponent],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    CommonSharedModule,
  ],
  entryComponents: [
    WarehouseAddComponent
  ],
})
export class WarehouseModule { }
