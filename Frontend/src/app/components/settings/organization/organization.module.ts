import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization/organization.component';
import { OrganizationAddComponent } from './organization-add/organization-add.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { CommonSharedModule } from 'src/app/common/common-shared.module';


@NgModule({
  declarations: [OrganizationComponent, OrganizationAddComponent, OrganizationListComponent],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    CommonSharedModule,
  ],
  entryComponents: [
    OrganizationAddComponent
  ],
})
export class OrganizationModule { }
