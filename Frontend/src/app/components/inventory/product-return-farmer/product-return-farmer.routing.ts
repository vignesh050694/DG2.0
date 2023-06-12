import { Routes, RouterModule } from '@angular/router';
import { ProductReturnFarmerComponent }from './product-return-farmer.component';
import { ProductReturnFarmerAddComponent }from './product-return-farmer-add/product-return-farmer-add.component';

const routes: Routes = [
  {
    path: "",
    component: ProductReturnFarmerComponent
  },
  {
    path: "add",
    component: ProductReturnFarmerAddComponent
  },
  { path: 'edit/:id',
    component: ProductReturnFarmerAddComponent
  },
];

export const ProductReturnFarmerRoutes = RouterModule.forChild(routes);
