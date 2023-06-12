import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MobileUserRoutingModule } from './mobile-user-routing.module';
import { MobileUserComponent } from './mobile-user/mobile-user.component';
import { MobileUserAddComponent } from './mobile-user-add/mobile-user-add.component';
import { MobileUserListComponent } from './mobile-user-list/mobile-user-list.component';
import { CommonSharedModule } from 'src/app/common/common-shared.module';


@NgModule({
  declarations: [MobileUserComponent, MobileUserAddComponent, MobileUserListComponent],
  imports: [
    CommonModule,
    MobileUserRoutingModule,
    CommonSharedModule,
  ],
  entryComponents: [
    MobileUserAddComponent
  ],
  providers: [DatePipe],
})
export class MobileUserModule { }
