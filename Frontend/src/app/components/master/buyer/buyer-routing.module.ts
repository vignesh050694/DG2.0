import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/account/admin.guard';
import { BuyerComponent } from './buyer/buyer.component';

const routes: Routes = [
  {
    path: '', component: BuyerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerRoutingModule { }
