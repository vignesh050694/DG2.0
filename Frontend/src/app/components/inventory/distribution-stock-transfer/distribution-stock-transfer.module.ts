import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DistributionStockTransferComponent } from './distribution-stock-transfer.component';
import { DistributionStockTransferAddComponent } from './distribution-stock-transfer-add/distribution-stock-transfer-add.component';
import { DistributionStockTransferRoutes } from './distribution-stock-transfer.routing';
import { CommonSharedModule } from '../../../common/common-shared.module';
import {DistributionStockTransferDetailsComponent} from './distribution-stock-transfer-details/distribution-stock-transfer-details.component'
import {DistributionStockTransferListComponent} from './distribution-stock-transfer-list/distribution-stock-transfer-list.component'

@NgModule({
  imports: [
    CommonModule,
    DistributionStockTransferRoutes,
    CommonSharedModule
  ],
  providers: [DatePipe],
  declarations: [DistributionStockTransferComponent , DistributionStockTransferAddComponent , DistributionStockTransferDetailsComponent,DistributionStockTransferListComponent]
})
export class DistributionStockTransferModule { }
