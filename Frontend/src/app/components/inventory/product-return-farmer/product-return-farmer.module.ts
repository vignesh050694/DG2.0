import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProductReturnFarmerComponent } from './product-return-farmer.component';
import { CommonSharedModule } from 'src/app/common/common-shared.module';
import { ProductReturnFarmerRoutes }from './product-return-farmer.routing';
import { ProductReturnFarmerAddComponent } from './product-return-farmer-add/product-return-farmer-add.component';
import { ProductReturnFarmerListComponent } from './product-return-farmer-list/product-return-farmer-list.component';
import { ProductReturnFarmerDetailComponent } from './product-return-farmer-detail/product-return-farmer-detail.component';

@NgModule({
  imports: [
    CommonModule,
    ProductReturnFarmerRoutes,
    CommonSharedModule,
  ],
  declarations: [ProductReturnFarmerComponent, ProductReturnFarmerAddComponent, ProductReturnFarmerListComponent, ProductReturnFarmerDetailComponent],
  providers: [DatePipe]
})
export class ProductReturnFarmerModule { }
