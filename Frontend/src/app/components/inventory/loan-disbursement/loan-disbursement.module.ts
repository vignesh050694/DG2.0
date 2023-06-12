import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LoanDisbursementComponent } from './loan-disbursement.component';
import { CommonSharedModule } from 'src/app/common/common-shared.module';
import { LoanDisbursementRoutes } from './loan-disbursement.routing';
import { LoanDisbursementAddComponent } from './loan-disbursement-add/loan-disbursement-add.component';
import { LoanDisbursementListComponent } from './loan-disbursement-list/loan-disbursement-list.component';
import { LoanDisbursementDetailsComponent } from './loan-disbursement-details/loan-disbursement-details.component'

@NgModule({
  imports: [
    CommonModule,
    LoanDisbursementRoutes,
    CommonSharedModule
  ],
  providers: [DatePipe],
  declarations: [LoanDisbursementComponent , LoanDisbursementAddComponent, LoanDisbursementListComponent, LoanDisbursementDetailsComponent]
})
export class LoanDisbursementModule { }
