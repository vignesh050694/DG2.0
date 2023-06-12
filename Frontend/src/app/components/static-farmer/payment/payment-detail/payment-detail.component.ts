import { MatTableDataSource } from '@angular/material/table';
import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.scss']
})
export class PaymentDetailComponent implements OnInit {
  matDialogRef: MatDialogRef<any>;
  filters: any[] = [];
  private eventsSubscription: Subscription;

  @Input() data: any= new Map();
  @Output() editRow = new EventEmitter();
  @Output() deleteRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();

  displayedColumns: string[] =['date','farmer','mobileUser','actions'];
  definedColumns =['date','farmer','mobileuser'];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  searchColumns: any[] = [{name:'date',canShow:false}, {name:'f.name',canShow:true},{name:'a.name',canShow:true}];
  productTransferDetails: Map<any,any> = new Map();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  rows = new MatTableDataSource([]);
  constructor(private responseModalService: ResponseModalService) { }

  ngOnInit(): void {
    this.reload(this.data);
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

}
