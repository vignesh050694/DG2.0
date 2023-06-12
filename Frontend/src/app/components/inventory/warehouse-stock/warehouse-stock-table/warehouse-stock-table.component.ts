import { convertUpdateArguments } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {  Subscription } from 'rxjs';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';


@Component({
  selector: 'app-warehouse-stock-table',
  templateUrl: './warehouse-stock-table.component.html',
  styleUrls: ['./warehouse-stock-table.component.scss']
})
export class WarehouseStockTableComponent implements OnInit {
  matDialogRef: MatDialogRef<any>;
  filters: any[] = [];
  private eventsSubscription: Subscription;
  @Input() data: any= new Map();
  @Output() deleteRow = new EventEmitter();
  @Output() editRow = new EventEmitter();
  displayedColumns: string[] = ['category', 'product', 'unit', 'goodQuantity', 'damangedQuantity', 'totalQuantity', 'actions'];
  definedColumns = ['category', 'subCategory', 'unit',  'goodQuantity', 'damagedQuantity', 'totalQuantity'];
  searchColumns: any[] = [];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  productDetails: Map<any,any> = new Map();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  rows = new MatTableDataSource([]);
  constructor(private responseModalService: ResponseModalService) { }

  ngOnInit(): void {
    this.reload(this.data);
    // this.rows.data = this.data;
  }
  public reload = (data:Map<any,any>) => {
  if(data?.size > 0 && data){
     let arr = Array.from(data?.values());
     this.rows.data = arr;
     this.datatrigger.emit(arr);
  }
  }

  deleteConfirm=(rowId:any)=>{
    this.deleteRow.emit(rowId);
  }
  edit=(rowId:any)=>{
    this.editFromList.emit(rowId);
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


}
