import { PaymentListComponent } from './payment-list/payment-list.component';
import { PaymentAddComponent } from './payment-add/payment-add.component';
import { CommonSharedModule } from './../../../common/common-shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { PaymentRoutes } from './payment.routing';

@NgModule({
  imports: [
    CommonModule,
    PaymentRoutes,
    CommonSharedModule

  ],
  declarations: [PaymentComponent,PaymentAddComponent,PaymentListComponent]
})
export class PaymentModule { }
