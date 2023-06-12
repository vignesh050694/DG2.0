import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './training/training.component';
import { TrainingListComponent } from './training-list/training-list.component';
import { TrainingAddComponent } from './training-add/training-add.component';
import { CommonSharedModule } from 'src/app/common/common-shared.module';


@NgModule({
  declarations: [TrainingComponent, TrainingListComponent, TrainingAddComponent],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    CommonSharedModule
  ]
})
export class TrainingModule { }
