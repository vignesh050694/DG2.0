import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DistributionToFarmerComponent } from './distribution-to-farmer.component';
import { DistributionToFarmerRoutes } from './distribution-to-farmer.routing';
import { CommonSharedModule } from '../../../common/common-shared.module';
import { DistributionToFarmerAddComponent } from './distribution-to-farmer-add/distribution-to-farmer-add.component';
import { DistributionToFarmerListComponent } from './distribution-to-farmer-list/distribution-to-farmer-list.component';
import { DistributionToFarmerDetailComponent }from './distribution-to-farmer-detail/distribution-to-farmer-detail.component';


@NgModule({
  imports: [
    CommonModule,
    DistributionToFarmerRoutes,
    CommonSharedModule,
  ],
  providers: [DatePipe],
  declarations: [DistributionToFarmerComponent , DistributionToFarmerAddComponent, DistributionToFarmerListComponent, DistributionToFarmerDetailComponent]
})
export class DistributionToFarmerModule { }
