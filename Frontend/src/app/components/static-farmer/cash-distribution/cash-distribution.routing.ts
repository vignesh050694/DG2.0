import { Routes, RouterModule } from '@angular/router';
import { CashDistributionComponent } from './cash-distribution.component';

const routes: Routes = [
  {
    path:'',component: CashDistributionComponent
   },
];

export const CashDistributionRoutes = RouterModule.forChild(routes);
