import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ActionPopupComponent } from 'src/app/common/action-popup/action-popup.component';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';

@Component({
  selector: 'app-product-reception-detail',
  templateUrl: './product-reception-detail.component.html',
  styleUrls: ['./product-reception-detail.component.scss']
})
export class ProductReceptionDetailComponent implements OnInit {
  matDialogRef: MatDialogRef<any>;
  filters: any[] = [];
  private eventsSubscription: Subscription;
  @Input() data: any = [];
  productReceptionDetails: any[] = [];
  @Output() editRow = new EventEmitter();
  @Output() saveRow = new EventEmitter();
  @Output() deleteRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  // public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ['product', 'variety', 'gradeName', 'unit', 'transferedBags', 'transferedWeight', 'noOfBags', 'netWeight'];
  definedColumns = ['product', 'variety', 'gradeName', 'unit', 'transferedBags', 'transferedWeight'];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  productDetails: any[] = [];
  rows = new MatTableDataSource([]);
  constructor(private responseModalService: ResponseModalService, private router: Router) { }

  ngOnInit(): void {
    this.reload(this.data);
  }
  reload = (row:any[]) => {
    this.productReceptionDetails = [];
    if(row?.length >= 0){
      this.rows.data = row;
      row.forEach((rowData: any) => {
        let productReceptionDetails = {
          "gradeName": rowData?.gradeName,
          "grade": rowData?.grade,
          "noOfBags": rowData?.noOfBags as number,
          "netWeight": rowData?.netWeight as number
        }
        this.productReceptionDetails.push(productReceptionDetails);
      });
    }
  }
  delete = (template: TemplateRef<any>, row: any) => {
    let data = {
      title: "Delete",
      description: "Are You Sure?"
    }
    this.matDialogRef = this.responseModalService.openModalSM(ActionPopupComponent, data);
    this.matDialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.deleteRow.emit(row);
      }
    });
  }


  save = () => {
    this.saveRow.emit(this.productReceptionDetails);
  }

  // onSave = (data) => {

  // };

  cancel = () => {
    this.router.navigate(['procurement/product-reception']);
  }

}
