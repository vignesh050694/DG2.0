import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { ActionPopupComponent } from 'src/app/common/action-popup/action-popup.component';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';

@Component({
  selector: 'app-distribution-to-mobile-user-details',
  templateUrl: './distribution-to-mobile-user-details.component.html',
  styleUrls: ['./distribution-to-mobile-user-details.component.scss']
})
export class DistributionToMobileUserDetailsComponent implements OnInit {
  matDialogRef: MatDialogRef<any>;
  filters: any[] = [];
  @Input() data: Map<any,any> = new Map();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  @Output() deleteRow = new EventEmitter();
  @Output() editRow = new EventEmitter();
  displayedColumns: string[] = ['category', 'product','availableStock', 'unit', 'pricePerUnit', 'distributionQuantity','batchNo', 'actions'];
  definedColumns = ['category', 'product','availableStock', 'unit', 'pricePerUnit', 'distributionQuantity','batchNo'];
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

  // reload = (data) => {
  //   this.rows.data = data;
  // }

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
