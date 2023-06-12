import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmInputRoutingModule } from './farm-input-routing.module';
import { FarmInputComponent } from './farm-input/farm-input.component';
import { CategoryAddComponent } from './category/category-add/category-add.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { SubCategoryAddComponent } from './sub-category/sub-category-add/sub-category-add.component';
import { SubCategoryListComponent } from './sub-category/sub-category-list/sub-category-list.component';
import { CommonSharedModule } from '../../../common/common-shared.module';


@NgModule({
  declarations: [FarmInputComponent, CategoryAddComponent, CategoryListComponent, SubCategoryAddComponent, SubCategoryListComponent],
  imports: [
    CommonModule,
    FarmInputRoutingModule,
    CommonSharedModule,
  ],
  entryComponents: [
    CategoryAddComponent,
    SubCategoryAddComponent
  ]
})
export class FarmInputModule { }
