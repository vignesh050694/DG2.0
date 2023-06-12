import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DistributionToMobileUserComponent } from './distribution-to-mobile-user.component';
import { DistributionToMobileUserRoutes } from './distribution-to-mobile-user.routing';
import { CommonSharedModule } from '../../../common/common-shared.module';
import { DistributionToMobileUserAddComponent } from './distribution-to-mobile-user-add/distribution-to-mobile-user-add.component';
import { DistributionToMobileUserListComponent } from './distribution-to-mobile-user-list/distribution-to-mobile-user-list.component';
import { DistributionToMobileUserDetailsComponent }from './distribution-to-mobile-user-details/distribution-to-mobile-user-details.component';

@NgModule({
  imports: [
    CommonModule,
    DistributionToMobileUserRoutes,
    CommonSharedModule
  ],
  providers: [DatePipe],
  declarations: [DistributionToMobileUserComponent , DistributionToMobileUserAddComponent, DistributionToMobileUserListComponent, DistributionToMobileUserDetailsComponent]
})
export class DistributionToMobileUserModule { }
