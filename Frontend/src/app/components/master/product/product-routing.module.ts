import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/account/admin.guard';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    /*path: "", component: ProductComponent,canActivate: [AdminGuard]*/
    path: "", component: ProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
