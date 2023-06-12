import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { WarehouseStockComponent } from './warehouse-stock.component';
import { WarehouseStockRoutes } from './warehouse-stock.routing';
import { CommonSharedModule } from 'src/app/common/common-shared.module';
import { WarehouseStockAddComponent } from './warehouse-stock-add/warehouse-stock-add.component';
import { WarehouseStockTableComponent } from './warehouse-stock-table/warehouse-stock-table.component';
import { WarehouseStockListComponent } from './warehouse-stock-list/warehouse-stock-list.component';


@NgModule({
  imports: [
    CommonModule,
    WarehouseStockRoutes,
    CommonSharedModule,
  ],
  declarations: [WarehouseStockComponent, WarehouseStockAddComponent, WarehouseStockTableComponent, WarehouseStockListComponent],
  providers: [DatePipe]
})
export class WarehouseStockModule { }
