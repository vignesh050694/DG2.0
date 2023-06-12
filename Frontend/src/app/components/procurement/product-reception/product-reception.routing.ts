import { Routes, RouterModule } from '@angular/router';
import { ProductReceptionAddComponent } from './product-reception-add/product-reception-add.component';
import { ProductReceptionComponent } from './product-reception.component';

const routes: Routes = [
  {
    path: '', component: ProductReceptionComponent
  },
  {
    path: 'add', component: ProductReceptionAddComponent
  },
  {
    path: 'product-reception-edit/:id', component: ProductReceptionAddComponent
  },
];


export const ProductReceptionRoutes = RouterModule.forChild(routes);
