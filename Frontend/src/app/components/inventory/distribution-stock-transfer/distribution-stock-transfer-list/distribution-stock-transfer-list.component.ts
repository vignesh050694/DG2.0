import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription, Observable } from 'rxjs';
import { ReportService } from 'src/app/common/report/report.service';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { DistributionStockTransferService } from '../distribution-stock-transfer.service';

@Component({
  selector: 'app-distribution-stock-transfer-list',
  templateUrl: './distribution-stock-transfer-list.component.html',
  styleUrls: ['./distribution-stock-transfer-list.component.scss']
})
export class DistributionStockTransferListComponent implements OnInit {

  @ViewChild('trainingDetailModal', { static: false }) distributionStockTransferModel: ElementRef;
  matDialogRef: MatDialogRef<any>;
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
  distributionStockTransfers: any[] = [];
  filters: any[] = [];
  detailData: any[] = [];
  distributionStockTransfer: any;
  detailId: any;

  constructor(private reportService: ReportService, private responseModalService: ResponseModalService,private distributionStockTransferService:DistributionStockTransferService) { }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((data) => {
      if (data != undefined) {
        this.filters.push(data);
      }
      this.loadData();
    });
    this.loadData()
  }

  loadData = () => {
    this.reportService.getReport(this.postPerPage, this.pageNumber, this.filters, 'distribution_stock_transfer_report').subscribe((datas: any) => {
      this.displayedColumns = datas?.displayColumns;
      this.definedColumns = datas?.definedColumns;
      this.distributionStockTransfers = datas?.data;
      this.datatrigger.emit(this.distributionStockTransfers);
      this.count = datas?.recordsTotal;
    });
  };

  onPaginate = (pageObject) => {
    this.postPerPage = pageObject.postPerPage;
    this.pageNumber = pageObject.pageNumber;
    this.loadData();
  };

  onSearch = (filters: any[]) => {
    this.filters = filters
    this.loadData();
  }

  edit = (rowId: any) => {
    this.editFromList.emit(rowId);
  }
  deleteConfirm = (id) => {
    this.distributionStockTransferService.delete(id).subscribe((data: any) => {
      this.loadData();
      this.deleteFromList.emit();
    })
  }

  detail = (event) => {
    this.detailId=event;
    this.prepareDetailData(event);
    this.distributionStockTransferModel.nativeElement.className = 'pr-modal modal right fade show';
  };

  prepareDetailData = (event) => {
    this.distributionStockTransferService.getById(event).subscribe(data => {
      this.distributionStockTransfer = data;
    });
  };


  close() {
    this.distributionStockTransfer = null;
    this.distributionStockTransferModel.nativeElement.className = 'pr-modal modal right fade';
  }

}
