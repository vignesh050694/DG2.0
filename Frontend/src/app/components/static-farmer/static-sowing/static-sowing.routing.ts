import { StaticSowingComponent } from './static-sowing.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'', component:StaticSowingComponent
  },
];

export const StaticSowingRoutes = RouterModule.forChild(routes);
