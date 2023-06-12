import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/account/admin.guard';
import { FarmInputComponent } from './farm-input/farm-input.component';

const routes: Routes = [
  {
    path: '', component: FarmInputComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmInputRoutingModule { }
