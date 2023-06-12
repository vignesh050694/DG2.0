import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserListComponent } from './user-list/user-list.component';
import { CommonSharedModule, } from '../../../common/common-shared.module'


@NgModule({
  declarations: [UserComponent, UserAddComponent, UserListComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    CommonSharedModule,
  ]
})
export class UserModule { }
