import { Routes, RouterModule } from '@angular/router';
import { WarehouseStockAddComponent } from './warehouse-stock-add/warehouse-stock-add.component';
import { WarehouseStockComponent } from './warehouse-stock.component';

const routes: Routes = [
  {
    path: "",
    component: WarehouseStockComponent
  },
  {
    path: "add",
    component: WarehouseStockAddComponent
  },
  { path: 'edit/:id',
    component: WarehouseStockAddComponent
  },
];

export const WarehouseStockRoutes = RouterModule.forChild(routes);
