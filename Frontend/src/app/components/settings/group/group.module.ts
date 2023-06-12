import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group/group.component';
import { GroupAddComponent } from './group-add/group-add.component';
import { GroupListComponent } from './group-list/group-list.component';
import { CommonSharedModule } from 'src/app/common/common-shared.module';


@NgModule({
  declarations: [GroupComponent, GroupAddComponent, GroupListComponent],
  imports: [
    CommonModule,
    GroupRoutingModule,
    CommonSharedModule,
  ],
  entryComponents: [
    GroupAddComponent
  ],
  providers: [DatePipe]
})
export class GroupModule { }
