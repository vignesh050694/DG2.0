import { PaymentService } from './payment.service';
import { PaymentAddComponent } from './payment-add/payment-add.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Dropdown } from './../../../common/dynamic-forms/dropdown';
import { ResponseModalService } from './../../../common/response-modal/response-modal.service';

import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ReportService } from 'src/app/common/report/report.service';
import { DynamicFormBase } from 'src/app/common/dynamic-forms/dynamic-form-base';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  matDialogRef: MatDialogRef<any>;
  paymentReloadEvent: Subject<void> = new Subject<void>();
  cardArray: any[] = [];
  editData: any = {};
  buttonText: String = "Add Payment";
  title: String = "Payment";
  formData: DynamicFormBase<any>[] = [];
  isFilterDataLoaded: boolean = false;
  constructor(private responseModalService: ResponseModalService,private router: Router, private reportService: ReportService) { }

  ngOnInit():void {
  }

  add = () => {
    let data ={ "title": "Add Payment"}
    this.router.navigate(['farmer/payment/add']);
    this.openModalMD(PaymentAddComponent,data);
  };
  openModalMD=(component:any, data:any)=>{
    this.matDialogRef = this.responseModalService.openModalMD(component,data);
    this.matDialogRef.afterClosed().subscribe(res =>{
      this.emitEventToReload();
    });
  }

  emitEventToReload = () => {
    this.paymentReloadEvent.next();
  };

  edit = (rowId: any) => {
       this.editData.id = rowId;
       this.editData.title ='payment';
      this.openModalMD(PaymentAddComponent,this.editData);
    };

  // delete = (event:any) => {
  //   this.getAggregate();
  // }

  // getAggregate = () =>{
  //   this.cardArray = [];
  //   this.reportService.getAggreate('payment_list').subscribe((data:any[]) => {
  //     data.forEach(aggr => {
  //       let card = {
  //         "name": aggr.id,
  //         "count": aggr.name,
  //         "image": aggr.icon
  //       }
  //       this.cardArray.push(card);
  //     });
  //   });
  // }

  // async getFormData() {

  //   // warehouse_stock_Entry_report
  //   await this.reportService.getFilters('payment_list').subscribe((data:any[])=> {
  //     data.forEach(filter => {
  //       if (filter.type == 1) {
  //         this.formData.push(
  //           new Dropdown({
  //             key: filter?.key,
  //             label: filter?.label,
  //             options: filter?.data,
  //             order: 0
  //           })
  //         );
  //       }
  //     });
  //     this.isFilterDataLoaded = true;
  //     return this.formData.sort((a, b) => a.order - b.order);
  //   });
  // }

  search(event) {
    this.paymentReloadEvent.next(event);
  }

}
