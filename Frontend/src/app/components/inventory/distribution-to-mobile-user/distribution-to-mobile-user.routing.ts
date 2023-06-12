import { Routes, RouterModule } from '@angular/router';
import { DistributionToMobileUserComponent } from './distribution-to-mobile-user.component';
import {DistributionToMobileUserAddComponent} from '../distribution-to-mobile-user/distribution-to-mobile-user-add/distribution-to-mobile-user-add.component'

const routes: Routes = [
  {
    path: "",
    component: DistributionToMobileUserComponent
  },
  {
    path: "add",
    component: DistributionToMobileUserAddComponent
  },
  {path:"edit/:id", component: DistributionToMobileUserAddComponent}
];

export const DistributionToMobileUserRoutes = RouterModule.forChild(routes);
