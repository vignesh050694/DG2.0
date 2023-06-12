import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcurementAddComponent } from './procurement-add/procurement-add.component';
import { ProcurementComponent } from './procurement/procurement.component';

const routes: Routes = [
  {
    path:"",
    component:ProcurementComponent
  },
    {
      path: "procurement-add",
      component: ProcurementAddComponent
  },
  { path: 'procurement-edit/:id', component: ProcurementAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcurementRoutingModule { }
