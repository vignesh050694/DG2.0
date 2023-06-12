import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ProcurementRoutingModule } from './procurement-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProcurementRoutingModule
  ],
  providers: [DatePipe]
})
export class ProcurementModule { }
