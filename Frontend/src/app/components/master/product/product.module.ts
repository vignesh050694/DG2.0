import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VarietyAddComponent } from './variety/variety-add/variety-add.component';
import { VarietyListComponent } from './variety/variety-list/variety-list.component';
import { GradeAddComponent } from './grade/grade-add/grade-add.component';
import { GradeListComponent } from './grade/grade-list/grade-list.component';
import { CommonSharedModule } from '../../../common/common-shared.module';
import { CropAddComponent } from './crop/crop-add/crop-add.component';
import { CropListComponent } from './crop/crop-list/crop-list.component';
import { ProductComponent } from './product/product.component';
import { ProductRoutingModule } from './product-routing.module';


@NgModule({
  declarations: [ProductComponent, CropAddComponent, CropListComponent, VarietyAddComponent, VarietyListComponent, GradeAddComponent, GradeListComponent],
  imports: [
    CommonModule,
    CommonSharedModule,
    ProductRoutingModule
  ],
  entryComponents: [
    CropAddComponent,
    VarietyAddComponent,
    GradeAddComponent
  ]
})
export class ProductModule { }
