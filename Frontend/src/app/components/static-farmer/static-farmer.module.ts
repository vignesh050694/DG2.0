import { FarmerMapComponent } from './static-farmer-create/farmer-map/farmer-map.component';
import { CommonSharedModule } from './../../common/common-shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticLocationComponent } from './static-location/static-location.component';
import { AgmCoreModule } from '@agm/core';
import { StaticFarmerRoutes } from './static-farmer.routing';

@NgModule({
  imports: [
    CommonModule,
    StaticFarmerRoutes,
    CommonSharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA4F9JYoct7v7oGvirzAx7_oK6XkNyL1oM'
    })
  ],
  declarations: [StaticLocationComponent],
})
export class StaticFarmerModule { }
