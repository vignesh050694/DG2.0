import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DistributionStockReceptionComponent } from './distribution-stock-reception.component';
import { CommonSharedModule } from '../../../common/common-shared.module';
import { DistributionStockReceptionRoutes } from './distribution-stock-reception.routing';
import { DistributionStockReceptionAddComponent } from './distribution-stock-reception-add/distribution-stock-reception-add.component';
import { DistributionStockReceptionDetailsComponent } from './distribution-stock-reception-details/distribution-stock-reception-details.component'
import { DistributionStockReceptionListComponent } from './distribution-stock-reception-list/distribution-stock-reception-list.component'


@NgModule({
  imports: [
    CommonModule,
    DistributionStockReceptionRoutes,
    CommonSharedModule
  ],
  providers: [DatePipe],
  declarations: [DistributionStockReceptionComponent , DistributionStockReceptionAddComponent, DistributionStockReceptionDetailsComponent, DistributionStockReceptionListComponent]
})
export class DistributionStockReceptionModule { }
