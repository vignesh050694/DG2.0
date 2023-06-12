import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmInspectionComponent } from './farm-inspection.component';
import { CommonSharedModule } from '../../../common/common-shared.module';
import { FarmInspectionRoutes } from './farm-inspection.routing';

@NgModule({
  imports: [
    CommonModule,
    CommonSharedModule,
    FarmInspectionRoutes
  ],
  declarations: [FarmInspectionComponent]
})
export class FarmInspectionModule { }
