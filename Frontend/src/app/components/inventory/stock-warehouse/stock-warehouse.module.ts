import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockWarehouseComponent } from './stock-warehouse.component';
import { CommonSharedModule } from 'src/app/common/common-shared.module';
import { StockWarehouseRoutes } from './stock-warehouse.routing';
import { StockWarehouseListComponent } from './stock-warehouse-list/stock-warehouse-list.component';

@NgModule({
  imports: [
    CommonModule,
    StockWarehouseRoutes,
    CommonSharedModule,
  ],
  declarations: [StockWarehouseComponent, StockWarehouseListComponent]
})
export class StockWarehouseModule { }
