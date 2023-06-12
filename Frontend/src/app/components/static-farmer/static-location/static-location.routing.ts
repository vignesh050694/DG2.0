import { Routes, RouterModule } from '@angular/router';
import { StaticLocationComponent } from './static-location.component';

const routes: Routes = [
  {
    path:'', component: StaticLocationComponent
  },
];

export const StaticLocationRoutes = RouterModule.forChild(routes);
