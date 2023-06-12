import { CashDistributionListComponent } from './cash-distribution-list/cash-distribution-list.component';
import { CashDistributionAddComponent } from './cash-distribution-add/cash-distribution-add.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashDistributionComponent } from './cash-distribution.component';
import { CommonSharedModule} from './../../../common/common-shared.module';
import { CashDistributionRoutes } from './cash-distribution.routing';

@NgModule({
  imports: [
    CommonModule,
    CashDistributionRoutes,
    CommonSharedModule
  ],
  declarations: [CashDistributionComponent,CashDistributionAddComponent,CashDistributionListComponent]
})
export class CashDistributionModule { }
