import { StaticFarmRoutes } from './static-farm.routing';
import { CommonSharedModule } from './../../../common/common-shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticFarmComponent } from './static-farm.component';
import { StaticFarmListComponent } from '../static-farm/static-farm-list/static-farm-list.component';
import { StaticFarmAddComponent } from '../static-farm/static-farm-add/static-farm-add.component'

@NgModule({
  imports: [
    CommonModule,
    StaticFarmRoutes,
    CommonSharedModule
      ],
  declarations: [StaticFarmComponent, StaticFarmListComponent, StaticFarmAddComponent]
})
export class StaticFarmModule { }
