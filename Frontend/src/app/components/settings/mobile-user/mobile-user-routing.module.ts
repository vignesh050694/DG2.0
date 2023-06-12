import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MobileUserAddComponent } from './mobile-user-add/mobile-user-add.component';
import { MobileUserComponent } from './mobile-user/mobile-user.component';

const routes: Routes = [
  {
    path:'',
    component:MobileUserComponent
  },
  {
    path: 'mobile-user-add',
    component: MobileUserAddComponent
  },
  {
    path: 'mobile-user-edit/:id',
    component: MobileUserAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileUserRoutingModule { }
