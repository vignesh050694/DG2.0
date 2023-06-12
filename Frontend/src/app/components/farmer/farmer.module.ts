import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonSharedModule } from '../../common/common-shared.module'
import { FarmerRoutingModule } from './farmer-routing.module';
import { AddFarmerComponent } from './add-farmer/add-farmer.component';
import { FarmerWidgetComponent } from './farmer-widget/farmer-widget.component';
import { FarmLocationComponent } from './farm-location/farm-location.component';
import { MapsComponent } from './Maps/Maps.component';
import { AgmCoreModule } from '@agm/core';



@NgModule({
  declarations: [AddFarmerComponent, FarmerWidgetComponent, FarmLocationComponent, MapsComponent],
  imports: [
    CommonModule,
    FarmerRoutingModule,
    CommonSharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA4F9JYoct7v7oGvirzAx7_oK6XkNyL1oM'
    }),
  ],
  exports: [
    FarmerWidgetComponent,
  ]
})
export class FarmerModule { }
