import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/account/admin.guard';
import { CatalogueComponent } from './catalogue/catalogue.component';

const routes: Routes = [
  {
    path:'',
    component:CatalogueComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueRoutingModule { }
