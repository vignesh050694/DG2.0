import { Routes, RouterModule } from '@angular/router';
import { LoanDisbursementComponent } from './loan-disbursement.component';
import { LoanDisbursementAddComponent } from './loan-disbursement-add/loan-disbursement-add.component';

const routes: Routes = [
  {
    path: "",
    component: LoanDisbursementComponent
  },
  {
    path: "add",
    component: LoanDisbursementAddComponent
  },
  {path: "edit/:id", component: LoanDisbursementAddComponent}
];

export const LoanDisbursementRoutes = RouterModule.forChild(routes);
