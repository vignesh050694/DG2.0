import { Routes, RouterModule } from '@angular/router';
import { StockWarehouseComponent } from './stock-warehouse.component';

const routes: Routes = [
  {
    path: "",
    component: StockWarehouseComponent
 },
];

export const StockWarehouseRoutes = RouterModule.forChild(routes);
