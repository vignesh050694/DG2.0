import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogueRoutingModule } from './catalogue-routing.module';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { CatalogueAddComponent } from './catalogue-add/catalogue-add.component';
import { CatalogueListComponent } from './catalogue-list/catalogue-list.component';
import { CommonSharedModule } from 'src/app/common/common-shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [CatalogueComponent, CatalogueAddComponent, CatalogueListComponent],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    CommonSharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ]
})
export class CatalogueModule { }
