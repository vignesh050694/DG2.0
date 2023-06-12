import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationComponent } from './organization/organization.component';
import { OrganizationAddComponent } from './organization-add/organization-add.component';

const routes: Routes = [
  {
    path:'',
    component:OrganizationComponent
  },
  {
    path: 'organization-add',
    component: OrganizationAddComponent
  },
  {
    path: 'organization-edit/:id',
    component: OrganizationAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
