import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { ReportService } from 'src/app/common/report/report.service';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { WarhouseStockService } from '../warhouse-stock.service';

@Component({
  selector: 'app-warehouse-stock-list',
  templateUrl: './warehouse-stock-list.component.html',
  styleUrls: ['./warehouse-stock-list.component.scss']
})
export class WarehouseStockListComponent implements OnInit {

  @ViewChild('trainingDetailModal', { static: false }) warehouseStockModal: ElementRef;
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
  warehouseStocks: any[] = [];
  filters: any[] = [];
  detailData: any[] = [];
  warehouseStock: any;
  detailId: any;


  constructor(private reportService: ReportService, private responseModalService: ResponseModalService ,private warehouseStockService : WarhouseStockService) {

  }

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
    // this.reportService.getReport(this.postPerPage, this.pageNumber, this.filters, 'warehouse_stock_entry').subscribe((datas: any) => {
      this.reportService.getReport(this.postPerPage, this.pageNumber, this.filters, 'warehouse_stock_entry_list').subscribe((datas: any) => {
      this.displayedColumns = datas?.displayColumns;
      this.definedColumns = datas?.definedColumns;
      this.warehouseStocks = datas?.data;
      this.datatrigger.emit(this.warehouseStocks);
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
    this.warehouseStockService.delete(id).subscribe((data: any) => {
      this.loadData();
      this.deleteFromList.emit();
    })
  }
  detail(event) {
    this.detailId=event;
    this.prepareDetailData(event);
    this.warehouseStockModal.nativeElement.className = 'pr-modal modal right fade show';
  };

  prepareDetailData = (event) => {
    this.warehouseStockService.getById(event).subscribe(data => {
      this.warehouseStock = data;
    });
  };

  close() {
    this.warehouseStock = null;
    this.warehouseStockModal.nativeElement.className = 'pr-modal modal right fade';
  }
}
