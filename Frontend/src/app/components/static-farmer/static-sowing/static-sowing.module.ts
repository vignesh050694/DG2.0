import { CommonSharedModule } from 'src/app/common/common-shared.module';
import { StaticSowingListComponent } from './static-sowing-list/static-sowing-list.component';
import { StaticSowingAddComponent } from './static-sowing-add/static-sowing-add.component';
import { StaticSowingRoutes } from './static-sowing.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticSowingComponent } from './static-sowing.component';

@NgModule({
  imports: [
    CommonModule,
    StaticSowingRoutes,
    CommonSharedModule

  ],
  declarations: [StaticSowingComponent, StaticSowingAddComponent, StaticSowingListComponent]
})
export class StaticSowingModule { }
