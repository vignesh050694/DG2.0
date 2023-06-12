import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CropSaleComponent } from './crop-sale.component';
import { CropSaleAddComponent } from './crop-sale-add/crop-sale-add.component';
import { CropSaleListComponent } from './crop-sale-list/crop-sale-list.component';
import { CropSaleProductDetailComponent } from './crop-sale-product-detail/crop-sale-product-detail.component';

import { CropSaleRoutes } from './crop-sale.routing';
import { CommonSharedModule } from 'src/app/common/common-shared.module';

@NgModule({
  imports: [
    CommonModule,
    CropSaleRoutes,
    CommonSharedModule
  ],
  declarations: [CropSaleComponent, CropSaleAddComponent, CropSaleListComponent, CropSaleProductDetailComponent],
  providers: [DatePipe]
})
export class CropSaleModule { }
