import { PaymentService } from './../payment.service';
import { Component, EventEmitter, OnInit, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { Observable, Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { PaymentComponent } from '../payment.component';
import { GroupService } from 'src/app/components/settings/group/group.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})

export class PaymentListComponent implements OnInit {

  @ViewChild('trainingDetailModal', { static: false }) paymentModal: ElementRef;

  private eventsSubscription: Subscription;
  matDialogRef: MatDialogRef<any>;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  detailId: any;
  count: number = 0;
  displayedColumns = ['date','farmer','mobileUser','amount'];
  searchColumns: any[] = [{name:'date',canShow:false}, {name:'f.name',canShow:true},{name:'a.name',canShow:true},{name:'amount',canShow:true}];
  definedColumns = ['date','farmer','mobileuser','amount'];
  payments: any[] = [];
  filters: any[] = [];
  cardArray: any[] = [];
  postPerPage: number = 10;
  pageNumber: number = 1;
  paymentDetail: any;
  constructor(private responseModalService: ResponseModalService,private paymentService:PaymentService,private groupService:GroupService) { }

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe((data) => {
      if(data != undefined){
        this.filters.push(data);
      }
      this.reload();
    });
    this.reload();
  }

  reload = () => {
    this.paymentService.getPayment(this.postPerPage, this.pageNumber,this.filters).subscribe((datas: any) => {
      // this.payments = [];
      this.payments = datas.data;
      this.datatrigger.emit(this.payments);
      this.count = datas?.recordsTotal;
    })
  };


  onPaginate = (pageObject) => {
    this.postPerPage = pageObject.postPerPage;
    this.pageNumber = pageObject.pageNumber;
    this.reload();
  }


  onSearch = (filters: any[]) => {
    this.filters = filters;
    this.reload();
  };

  edit = (rowId: any) => {
    this.editFromList.emit(rowId);
  }

  detail = (event) => {
    this.detailId=event;
    this.prepareDetailData(event);
    this.paymentModal.nativeElement.className = 'pr-modal modal right fade show';
  };

  prepareDetailData = (event) => {
    this.paymentService.getPaymentById(event).subscribe(data => {
      this.paymentDetail = data;
    });
  };

  close() {
    this.paymentModal.nativeElement.className = 'pr-modal modal right fade';
  }



}
