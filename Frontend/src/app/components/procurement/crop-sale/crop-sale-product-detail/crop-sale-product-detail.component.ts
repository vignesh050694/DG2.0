import { EventEmitter, Output, TemplateRef } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ActionPopupComponent } from 'src/app/common/action-popup/action-popup.component';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';

@Component({
  selector: 'app-crop-sale-product-detail',
  templateUrl: './crop-sale-product-detail.component.html',
  styleUrls: ['./crop-sale-product-detail.component.scss']
})
export class CropSaleProductDetailComponent implements OnInit {
  // matDialogRef: MatDialogRef<any>;
  // filters: any[] = [];
  // private eventsSubscription: Subscription;

  // @Input() data: any[];
  // @Input() private datatrigger: EventEmitter<any>;
  // @Output() editRow = new EventEmitter();
  // @Output() deleteRow = new EventEmitter();

  matDialogRef: MatDialogRef<any>;
  filters: any[] = [];
  private eventsSubscription: Subscription;
  // @Input() data: any[];
  @Input() data: any= new Map();
  // @Input() private datatrigger: EventEmitter<any>;
  @Output() editRow = new EventEmitter();
  @Output() deleteRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();

  // displayedColumns: string[] = ['Product', 'Variety', 'Grade', 'Unit', 'Price', 'Quantity', 'Batch No', 'TotalPrice', 'actions'];
  // definedColumns = ['product', 'variety', 'grade', 'unit', 'price', 'quantity', 'batchNo', 'total'];

  // searchColumns: any[] = [{ name: 'name', canShow: true }, { name: 'location', canShow: true },
  // { name: 'warehouseInCharge', canShow: true }, { name: 'storageCapacityInTonnes', canShow: true }];
  // postPerPage: number = 10;
  // pageNumber: number = 1;
  // count: number = 0;

  // productDetails: any[] = [];
  // rows = new MatTableDataSource([]);
  
  displayedColumns: string[] = ['Product', 'Variety', 'Grade', 'Unit', 'Price', 'Quantity', 'Batch No', 'TotalPrice', 'actions'];
  definedColumns = ['product', 'variety', 'grade', 'unit', 'price', 'quantity', 'batchNo', 'total'];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  searchColumns: any[] = [];
  productTransferDetails: Map<any,any> = new Map();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  rows = new MatTableDataSource([]);

  constructor(
    private responseModalService: ResponseModalService
    ) { }

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

  // ngOnInit() {
  //   this.rows.data = this.data;
  //   if (this.datatrigger) {
  //     this.datatrigger.subscribe(data => {
  //       this.reload(data);
  //     });
  //   }
  // }

  // reload = (data) => {
  //   this.rows.data = data;
  // };

  // edit = (row: any ,index:number) => {
  //   row['index'] = index;
  //   this.editRow.emit(row);
  // };

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
  // };

}
