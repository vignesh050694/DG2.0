import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProcurementService } from '../../procurement/procurement.service';
import { ProductTransferService } from '../product-transfer.service';

@Component({
  selector: 'app-product-transfer-list',
  templateUrl: './product-transfer-list.component.html',
  styleUrls: ['./product-transfer-list.component.scss']
})
export class ProductTransferListComponent implements OnInit {
  @ViewChild('trainingDetailModal', { static: false }) productTransferModal: ElementRef;
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  @Output() deleteFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = [];
  searchColumns: any[] = [];
  definedColumns = [];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  productTransfers: any[] = [];
  filters: any[] = [];
  productTransfer: any;
  detailId: any;

  constructor(
    private productTransferService: ProductTransferService,
    private procurementService: ProcurementService
    ) { }

  //ngOnInit(): void {
    //this.eventsSubscription = this.events.subscribe((data) => {
    //  if (data != undefined) {
    //    this.filters.push(data);
    //  }
    //  this.loadData();
    //});
   // this.loadData()
  //}

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((data: any) => {
      if (data != undefined) {
        this.filters = [];
        for (var i in data) {
          var key = i;
          var val = data[i];
          if (val) {
            this.filters.push({
              "key": key,
              "operation": ":",
              "value": val
            });
          }
        }
      }
      this.loadData();
    });
    this.loadData()
  }

  loadData = () => {
    this.procurementService.getReport(this.postPerPage, this.pageNumber, this.filters, 'product_transfer_report').subscribe((datas: any) => {
      this.displayedColumns = datas?.displayColumns;
      this.definedColumns = datas?.definedColumns;
      this.productTransfers = datas?.data;
      this.datatrigger.emit(this.productTransfers);
      this.count = datas?.recordsTotal;
    });
  }

  onPaginate = (pageObject) => {
    this.postPerPage = pageObject.postPerPage;
    this.pageNumber = pageObject.pageNumber;
    this.loadData();
  }

  edit = (rowId: any) => {
    this.editFromList.emit(rowId);
  }

  deleteConfirm = (id) => {
    this.productTransferService.delete(id).subscribe((data: any) => {
      this.loadData();
      this.deleteFromList.emit();
    })
  }

  onSearch = (filters: any[]) => {
    this.filters = filters
    this.loadData();
  }

  detail = (event) => {
    this.detailId=event;
    this.prepareDetailData(event); //to get detail of that row data
    this.productTransferModal.nativeElement.className = 'pr-modal modal right fade show';
  };

  prepareDetailData = (event) => {
    this.productTransferService.getById(event).subscribe(data => {
      this.productTransfer = data;
    });
  };

  close=()=> {
    this.productTransfer = null;
    this.productTransferModal.nativeElement.className = 'pr-modal modal right fade';
  }
}
