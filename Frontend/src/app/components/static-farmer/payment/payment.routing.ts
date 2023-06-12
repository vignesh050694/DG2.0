import { PaymentComponent } from './payment.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path:'',component:PaymentComponent },
];

export const PaymentRoutes = RouterModule.forChild(routes);
