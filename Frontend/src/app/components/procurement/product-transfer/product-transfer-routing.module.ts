import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductTransferAddComponent } from '../product-transfer/product-transfer-add/product-transfer-add.component';
import { ProductTransferComponent } from '../product-transfer/product-transfer.component';

const routes: Routes = [
  {
    path: '', component: ProductTransferComponent
  },
  {
    path: 'product-transfer-add', component: ProductTransferAddComponent
  },
  {
    path: 'product-transfer-edit/:id', component: ProductTransferAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductTransferRoutingModule { }
