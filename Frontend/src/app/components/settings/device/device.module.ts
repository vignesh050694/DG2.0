import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceRoutingModule } from './device-routing.module';
import { DeviceComponent } from './device/device.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { CommonSharedModule } from '../../../common/common-shared.module'


@NgModule({
  declarations: [DeviceComponent, DeviceListComponent],
  imports: [
    CommonModule,
    DeviceRoutingModule,
    CommonSharedModule
  ]
})
export class DeviceModule { }
