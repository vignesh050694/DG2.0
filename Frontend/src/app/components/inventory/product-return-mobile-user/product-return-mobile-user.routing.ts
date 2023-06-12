import { Routes, RouterModule } from '@angular/router';
import { ProductReturnMobileUserAddComponent } from './product-return-mobile-user-add/product-return-mobile-user-add.component';
import { ProductReturnMobileUserComponent } from './product-return-mobile-user.component';

const routes: Routes = [
  {  path: "",
  component: ProductReturnMobileUserComponent },
  {
    path: "add",
    component: ProductReturnMobileUserAddComponent
  },
  { path: 'edit/:id',
    component: ProductReturnMobileUserAddComponent
  },
];

export const ProductReturnMobileUserRoutes = RouterModule.forChild(routes);
