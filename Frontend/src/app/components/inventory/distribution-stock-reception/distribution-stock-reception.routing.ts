import { Routes, RouterModule } from '@angular/router';
import { DistributionStockReceptionComponent } from './distribution-stock-reception.component';
import { DistributionStockReceptionAddComponent } from './distribution-stock-reception-add/distribution-stock-reception-add.component';


const routes: Routes = [
  {
    path: "",
    component: DistributionStockReceptionComponent
  },
  {
    path: "add",
    component: DistributionStockReceptionAddComponent
  },
  {
    path: "edit/:id",
    component: DistributionStockReceptionAddComponent
  },
];

export const DistributionStockReceptionRoutes = RouterModule.forChild(routes);
