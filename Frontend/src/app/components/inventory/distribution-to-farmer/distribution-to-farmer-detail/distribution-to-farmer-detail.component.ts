import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { ActionPopupComponent } from 'src/app/common/action-popup/action-popup.component';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';

@Component({
  selector: 'app-distribution-to-farmer-detail',
  templateUrl: './distribution-to-farmer-detail.component.html',
  styleUrls: ['./distribution-to-farmer-detail.component.scss']
})
export class DistributionToFarmerDetailComponent implements OnInit {
  matDialogRef: MatDialogRef<any>;
  filters: any[] = [];
  private eventsSubscription: Subscription;
  @Input() data:Map<any,any> = new Map();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  @Output() deleteRow = new EventEmitter();
  @Output() editRow = new EventEmitter();


  displayedColumns: string[] = ['category', 'product', 'availableStock', 'costPrice', 'distributingStock', 'unit', 'totalPrice','batchNo' ,'actions'];
  definedColumns = ['category', 'productName','availableStock', 'costPrice', 'distributingStock', 'unit', 'totalPrice','batchNo'];
  searchColumns: any[] = [];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  productDetails: any[] = [];
  rows = new MatTableDataSource([]);
  constructor(private responseModalService: ResponseModalService) { }

  ngOnInit(): void {
    // this.rows.data = this.data;
    // if (this.datatrigger) {
    //   this.datatrigger.subscribe(data => {
    //     this.reload(data);
    //   });
    // }
    this.reload(this.data);

  }

  public reload = (data:Map<any,any>) => {
    if(data?.size > 0 && data){
       let arr = Array.from(data?.values());
       this.rows.data = arr;
       this.datatrigger.emit(arr);
    }
   }

  edit = (rowId: any) => {
    this.editRow.emit(rowId);
  }

  deleteConfirm = (rowId: any) => {
    let data = {
      title: "Delete",
      description: "Are You Sure?"
    }
    this.matDialogRef = this.responseModalService.openModalSM(ActionPopupComponent, data);
    this.matDialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.deleteRow.emit(rowId);
      }
    });
  }
}


  // edit = (row: any, index: any) => {
  //   row["index"] = index;
  //   this.editRow.emit(row);
  // }

  // delete = (template: TemplateRef<any>, row: any) => {
  //   let data = {
  //     title: "Delete",
  //     description: "Are You Sure?"
  //   }
  //   this.matDialogRef = this.responseModalService.openModalSM(ActionPopupComponent, data);
  //   this.matDialogRef.afterClosed().subscribe(res => {
  //     if (res) {
  //       this.deleteRow.emit(row);
  //     }
  //   });
  // }

