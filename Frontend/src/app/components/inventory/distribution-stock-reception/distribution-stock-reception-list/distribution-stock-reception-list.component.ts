import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription, Observable } from 'rxjs';
import { ReportService } from 'src/app/common/report/report.service';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { DistributionStockTransferService } from '../../distribution-stock-transfer/distribution-stock-transfer.service';
import { DistributionStockReceptionComponent } from '../distribution-stock-reception.component';
import { DistributionStockReceptionService } from '../distribution-stock-reception.service';

@Component({
  selector: 'app-distribution-stock-reception-list',
  templateUrl: './distribution-stock-reception-list.component.html',
  styleUrls: ['./distribution-stock-reception-list.component.scss']
})
export class DistributionStockReceptionListComponent implements OnInit {
  @ViewChild('distributionStockReception', {static:false})distributionStockReceptionComponet: DistributionStockReceptionComponent;
  @ViewChild('trainingDetailModal', { static: false }) distributionStockReceptionModel: ElementRef;
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
  distributionStockReceptions: any[] = [];
  filters: any[] = [];
  detailData: any[] = [];
  distributionStockReception: any;
  detailId: any;

  constructor(private reportService: ReportService, private responseModalService: ResponseModalService,private distributionStockReceptionService:DistributionStockReceptionService) { }



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
    this.reportService.getReport(this.postPerPage, this.pageNumber, this.filters, 'distribution_stock_reception_report').subscribe((datas: any) => {
      this.displayedColumns = datas?.displayColumns;
      this.definedColumns = datas?.definedColumns;
      this.distributionStockReceptions = datas?.data;
      this.datatrigger.emit(this.distributionStockReceptions);
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
    this.distributionStockReceptionService.delete(id).subscribe((data: any) => {
      this.loadData();
      this.deleteFromList.emit();
    })
  }

  detail = (event) => {
    this.detailId=event;
    this.prepareDetailData(event);
    this.distributionStockReceptionModel.nativeElement.className = 'pr-modal modal right fade show';
  };

  prepareDetailData = (event) => {
    this.distributionStockReceptionService.getById(event).subscribe(data => {
      this.distributionStockReception = data;
    });
  };

  close() {
    this.distributionStockReception = null;
    this.distributionStockReceptionModel.nativeElement.className = 'pr-modal modal right fade';
  }

}
