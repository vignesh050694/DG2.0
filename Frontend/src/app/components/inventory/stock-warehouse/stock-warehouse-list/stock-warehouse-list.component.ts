import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { ReportService } from 'src/app/common/report/report.service';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';

@Component({
  selector: 'app-stock-warehouse-list',
  templateUrl: './stock-warehouse-list.component.html',
  styleUrls: ['./stock-warehouse-list.component.scss']
})
export class StockWarehouseListComponent implements OnInit {
  @ViewChild('trainingDetailModal', { static: false }) stocksWarehouseModal: ElementRef;
  matDialogRef: MatDialogRef<any>;
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = [];
  searchColumns: any[] = [];
  definedColumns = [];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  stocksWarehouses: any[] = [];
  filters: any[] = [];
  detailData: any[] = [];
  stocksWarehouse: any;


  constructor(private reportService: ReportService, private responseModalService: ResponseModalService) {

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
    this.reportService.getReport(this.postPerPage, this.pageNumber, this.filters, 'Warehouse_stock_Report').subscribe((datas: any) => {
      this.displayedColumns = datas?.displayColumns;
      this.definedColumns = datas?.definedColumns;
      this.stocksWarehouses = datas?.data;
      this.datatrigger.emit(this.stocksWarehouses);
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
    console.log(id);
  }
  detail(event) {
    this.prepareDetailData(event);
    this.stocksWarehouseModal.nativeElement.className = 'pr-modal modal right fade show';
  };

  prepareDetailData = (event) => {
    // this.warehouseStockService.getById(event).subscribe(data => {
    //   this.stocksWarehouse = data;
    // });
  };

  close() {
    this.stocksWarehouse = null;
    this.stocksWarehouseModal.nativeElement.className = 'pr-modal modal right fade';
  }

}

