import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting/setting.component';
import { GeneralComponent } from './general/general.component';
import { MenuCreationComponent } from './menu-creation/menu-creation.component';
import { ContractFormComponent } from './contract-form/contract-form.component';


@NgModule({
  declarations: [SettingComponent, GeneralComponent, MenuCreationComponent, ContractFormComponent],
  imports: [
    CommonModule,
    SettingRoutingModule
  ]
})
export class SettingModule { }
