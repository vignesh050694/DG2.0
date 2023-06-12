import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ActionPopupComponent } from 'src/app/common/action-popup/action-popup.component';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';

@Component({
  selector: 'app-product-transfer-detail',
  templateUrl: './product-transfer-detail.component.html',
  styleUrls: ['./product-transfer-detail.component.scss']
})
export class ProductTransferDetailComponent implements OnInit {
  matDialogRef: MatDialogRef<any>;
  filters: any[] = [];
  private eventsSubscription: Subscription;
  // @Input() data: any[];
  @Input() data: any= new Map();
  // @Input() private datatrigger: EventEmitter<any>;
  @Output() editRow = new EventEmitter();
  @Output() deleteRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();

   displayedColumns: string[] = ['product','variety', 'grade', 'unit', 'noOfBags', 'netWeight','actions'];
  definedColumns = ['product','variety', 'grade', 'unit', 'noOfBags', 'netWeight'];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  searchColumns: any[] = [];
  productTransferDetails: Map<any,any> = new Map();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  rows = new MatTableDataSource([]);

  constructor(
    private responseModalService: ResponseModalService,
    private router: Router
    ) { }

  // async ngOnInit() {
  //   this.rows.data = this.data;
  //   if (this.datatrigger) {
  //     this.datatrigger.subscribe(data => {
  //       this.reload(data);
  //     });
  //   }
  //   if (this.saveTrigger) {
  //     this.saveTrigger.subscribe((data) => {
  //       this.save();
  //     });
  //   }
  // }
  // reload= (data:any[]) => {
  //   this.rows.data = data;
  // }
  // save = () => {
  //   this.data.forEach((data: any, index: number) => {
  //     let noOfBags = (<HTMLInputElement>document.getElementById('noOfBags' + index)).value;
  //     let netWeight = (<HTMLInputElement>document.getElementById('netWeight' + index)).value;
  //     let grade = {
  //       'id': data.gradeId
  //     };
  //     let productTransferData = {
  //       'noOfBags': noOfBags,
  //       'netWeight': netWeight,
  //       'grade': grade
  //     };
  //     this.productTransferDetails.push(productTransferData);


  //   });
  //   this.saveEmit.emit(this.productTransferDetails);
  // }

  // ngOnInit(): void {
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

  deleteConfirm=(rowId:any)=>{
    this.deleteRow.emit(rowId);
  }

  edit=(rowId:any)=>{
    this.editFromList.emit(rowId);
  }

  // reload = (data) => {
  //   this.rows.data = data;
  // }

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
