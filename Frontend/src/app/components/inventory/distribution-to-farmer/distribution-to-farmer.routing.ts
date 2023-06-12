import { Routes, RouterModule } from '@angular/router';
import { DistributionToFarmerComponent } from './distribution-to-farmer.component';
import {DistributionToFarmerAddComponent} from '././distribution-to-farmer-add/distribution-to-farmer-add.component'


const routes: Routes = [
  {
    path: "",
    component: DistributionToFarmerComponent
  },
  {
   path: "add",
    component: DistributionToFarmerAddComponent
  },{
    path: "edit/:id",
     component: DistributionToFarmerAddComponent
   }

];

export const DistributionToFarmerRoutes = RouterModule.forChild(routes);
