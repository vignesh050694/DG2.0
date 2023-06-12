import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CropHarvestComponent } from './crop-harvest.component';
import { CropHarvestRoutes } from './crop-harvest.routing';
import { CropHarvestAddComponent } from './crop-harvest-add/crop-harvest-add.component';
import { CommonSharedModule } from '../../../common/common-shared.module';
import { CropHarvestProductDetailComponent } from '../crop-harvest/crop-harvest-product-detail/crop-harvest-product-detail.component';
import{CropHarvestListComponent} from '../crop-harvest/crop-harvest-list/crop-harvest-list.component'


@NgModule({
  imports: [
    CommonModule,
    CommonSharedModule,
    CropHarvestRoutes,
  ],
  declarations: [CropHarvestComponent, CropHarvestAddComponent,CropHarvestListComponent, CropHarvestProductDetailComponent],
  providers: [DatePipe]
})
export class CropHarvestModule { }
