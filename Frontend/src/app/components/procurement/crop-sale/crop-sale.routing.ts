import { Routes, RouterModule } from '@angular/router';
import { CropSaleAddComponent } from './crop-sale-add/crop-sale-add.component';
import { CropSaleComponent } from './crop-sale.component';

const routes: Routes = [
  {
    path: "",
    component: CropSaleComponent
  },
  {
    path: "add",
    component: CropSaleAddComponent
  },
  {
    path: 'edit/:id', component: CropSaleAddComponent
  },
];

export const CropSaleRoutes = RouterModule.forChild(routes);
