import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationRoutingModule } from './location-routing.module';
import { CountryAddComponent } from './country/country-add/country-add.component';
import { LocationComponent } from './location/location.component';
import { CountryListComponent } from './country/country-list/country-list.component';
import { CommonSharedModule } from '../../../common/common-shared.module';
import { StateAddComponent } from './state/state-add/state-add.component';
import { StateListComponent } from './state/state-list/state-list.component';
import { DistrictListComponent } from './district/district-list/district-list.component';
import { DistrictAddComponent } from './district/district-add/district-add.component';
import { TalukAddComponent } from './taluk/taluk-add/taluk-add.component';
import { TalukListComponent } from './taluk/taluk-list/taluk-list.component';
import { VillageAddComponent } from './village/village-add/village-add.component';
import { VillageListComponent } from './village/village-list/village-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    CountryAddComponent,
    LocationComponent,
    CountryListComponent,
    StateAddComponent,
    StateListComponent,
    DistrictAddComponent,
    DistrictListComponent,
    TalukAddComponent,
    TalukListComponent,
    VillageAddComponent,
    VillageListComponent
  ],
  imports: [
    CommonModule,
    CommonSharedModule,
    LocationRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  entryComponents: [
    CountryAddComponent,
    StateAddComponent,
    DistrictAddComponent,
    TalukAddComponent,
    VillageAddComponent
  ]
})
export class LocationModule { }
