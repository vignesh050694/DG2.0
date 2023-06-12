import { StaticFarmComponent } from './static-farm.component';
import { Routes, RouterModule } from '@angular/router';
import { StaticFarmAddComponent } from './static-farm-add/static-farm-add.component';

const routes: Routes = [
  {
    path:'', component: StaticFarmComponent
   },
   {
    path:'edit', component: StaticFarmAddComponent
   },
   {
    path:'add', component: StaticFarmAddComponent
   },
];

export const StaticFarmRoutes = RouterModule.forChild(routes);
