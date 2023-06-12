import { FarmerMapComponent } from './farmer-map/farmer-map.component';
import { SowingDetailComponent } from './sowing-detail/sowing-detail.component';
import { FarmDetailComponent } from './farm-detail/farm-detail.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticFarmerCreateComponent } from './static-farmer-create.component';
import { CommonSharedModule } from 'src/app/common/common-shared.module';
import { StaticFarmerCreateRoutes } from '../static-farmer-create/static-farmer-create.routing';
import {  StaticFarmerAddComponent} from './static-farmer-add/static-farmer-add.component';
import {StaticFarmerListComponent} from './static-farmer-list/static-farmer-list.component';
import { MatStepperModule } from '@angular/material/stepper';
import {StaticFarmerDetailComponent} from './static-farmer-detail/static-farmer-detail.component';
import {FarmListScreenComponent, FarmScreenComponent} from './farm-screen/farm-screen.component';
import { SowingScreenComponent,SowingListScreenComponent } from './sowing-screen/sowing-screen.component';
import {BankDetailComponent} from './bank-detail/bank-detail.component';
import {AnimalDetailComponent} from './animal-detail/animal-detail.component';
import {EquipmentDetailComponent} from './equipment-detail/equipment-detail.component';
import {ImagePreviewComponent} from './image-preview/image-preview.component';
import { AgmCoreModule } from '@agm/core';




@NgModule({
  imports: [
    CommonModule,
    CommonSharedModule,
    StaticFarmerCreateRoutes,
    MatStepperModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA4F9JYoct7v7oGvirzAx7_oK6XkNyL1oM'
    }),

  ],
  providers: [
  ],
  declarations: [
    StaticFarmerCreateComponent,
    StaticFarmerAddComponent,
    StaticFarmerListComponent,
    StaticFarmerDetailComponent,
    FarmScreenComponent,
    FarmListScreenComponent,
    SowingScreenComponent,
    SowingListScreenComponent,
    FarmDetailComponent,
    SowingDetailComponent,
    BankDetailComponent,
    AnimalDetailComponent,
    EquipmentDetailComponent,
    ImagePreviewComponent,
    FarmerMapComponent
  ]
})
export class StaticFarmerCreateModule { }
