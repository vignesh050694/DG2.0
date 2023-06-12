import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role/role.component';
import { RoleAddComponent } from './role-add/role-add.component';
import { RoleListComponent } from './role-list/role-list.component';
import { CommonSharedModule } from '../.../../../../common/common-shared.module'

@NgModule({
  declarations: [RoleComponent, RoleAddComponent, RoleListComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    CommonSharedModule
  ]
})
export class RoleModule { }
