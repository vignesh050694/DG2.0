import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { ReportService } from 'src/app/common/report/report.service';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { ProductReturnFarmerService } from '../product-return-farmer.service';

@Component({
  selector: 'app-product-return-farmer-list',
  templateUrl: './product-return-farmer-list.component.html',
  styleUrls: ['./product-return-farmer-list.component.scss']
})
export class ProductReturnFarmerListComponent implements OnInit {
  @ViewChild('trainingDetailModal', { static: false }) productReturnFarmerModal: ElementRef;
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
  productReturnFarmers: any[] = [];
  filters: any[] = [];
  detailData: any[] = [];
  productReturnFarmer: any;
  detailId: any;


  constructor(private reportService: ReportService, private responseModalService: ResponseModalService ,private productReturnFarmerService : ProductReturnFarmerService) {

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
    this.reportService.getReport(this.postPerPage, this.pageNumber, this.filters, 'product_return_farmer_report').subscribe((datas: any) => {
      this.displayedColumns = datas?.displayColumns;
      this.definedColumns = datas?.definedColumns;
      this.productReturnFarmers = datas?.data;
      this.datatrigger.emit(this.productReturnFarmers);
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
    this.productReturnFarmerService.delete(id).subscribe((data: any) => {
      this.loadData();
      this.deleteFromList.emit();
    })
  }
  detail(event) {
    this.detailId=event;
    this.prepareDetailData(event);
    this.productReturnFarmerModal.nativeElement.className = 'pr-modal modal right fade show';
  };

  prepareDetailData = (event) => {
    this.productReturnFarmerService.getById(event).subscribe(data => {
    this.productReturnFarmer = data;
    });
  };

  close() {
    this.productReturnFarmer = null;
    this.productReturnFarmerModal.nativeElement.className = 'pr-modal modal right fade';
  }

}
