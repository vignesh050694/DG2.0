import { Routes, RouterModule } from '@angular/router';
import { DistributionStockTransferAddComponent } from './distribution-stock-transfer-add/distribution-stock-transfer-add.component';
import { DistributionStockTransferComponent } from './distribution-stock-transfer.component';

const routes: Routes = [
  {
    path: "",
    component: DistributionStockTransferComponent
  },
  {
    path: "add",
    component: DistributionStockTransferAddComponent
  },
  {
    path: "edit/:id",
    component: DistributionStockTransferAddComponent
  },
];

export const DistributionStockTransferRoutes = RouterModule.forChild(routes);
