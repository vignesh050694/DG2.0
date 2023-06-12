import { EventEmitter, Output, TemplateRef } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ActionPopupComponent } from 'src/app/common/action-popup/action-popup.component';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';

@Component({
  selector: 'app-crop-harvest-product-detail',
  templateUrl: './crop-harvest-product-detail.component.html',
  styleUrls: ['./crop-harvest-product-detail.component.scss']
})
export class CropHarvestProductDetailComponent implements OnInit {

  matDialogRef: MatDialogRef<any>;
  filters: any[] = [];
  private eventsSubscription: Subscription;

  // @Input() data: any[];
  // @Input() private datatrigger: EventEmitter<any>;
  @Input() data: any= new Map();
  @Output() editRow = new EventEmitter();
  @Output() deleteRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();

  displayedColumns: string[] = ['Product Name', 'Variety', 'Grade', 'Unit', 'Quantity', 'actions'];
  definedColumns = ['product', 'variety', 'grade','unit', 'quantity'];

  searchColumns: any[] = [{ name: 'name', canShow: false }, { name: 'location', canShow: false },
  { name: 'warehouseInCharge', canShow: false }, { name: 'storageCapacityInTonnes', canShow: false }];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  cropHarvestDetails: Map<any,any> = new Map();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  rows = new MatTableDataSource([]);

  constructor(private responseModalService: ResponseModalService) { }

  // ngOnInit() {
  //   this.rows.data = this.data;
  //   if (this.datatrigger) {
  //     this.datatrigger.subscribe(data => {
  //       this.reload(data);
  //     });
  //   }
  // }
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

  // edit = (row: any,j:number) => {
  //   row['index']=j;
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

  deleteConfirm=(rowId:any)=>{
    this.deleteRow.emit(rowId);
  }
  edit=(rowId:any)=>{
    this.editFromList.emit(rowId);
  }
}
