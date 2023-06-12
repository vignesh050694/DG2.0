import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticLocationRoutes } from './static-location.routing';
import { CommonSharedModule } from './../../../common/common-shared.module';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    StaticLocationRoutes,
    CommonSharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA4F9JYoct7v7oGvirzAx7_oK6XkNyL1oM'
    })
  ],
  declarations: [
  
  ] 
})
export class StaticLocationModule { }
