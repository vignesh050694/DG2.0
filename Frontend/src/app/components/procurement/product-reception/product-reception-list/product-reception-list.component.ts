import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { ReportService } from 'src/app/common/report/report.service';
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { ProductReceptService } from '../product-recept.service';

@Component({
  selector: 'app-product-reception-list',
  templateUrl: './product-reception-list.component.html',
  styleUrls: ['./product-reception-list.component.scss']
})
export class ProductReceptionListComponent implements OnInit {
  @ViewChild('trainingDetailModal', { static: false }) procurementModal: ElementRef;
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
  productReceptions: any[] = [];
  filters: any[] = [];
  detailData: any[] = [];
  productReceptionDetail: any;
  detailId: any;

  constructor(private reportService: ReportService, private responseModalService: ResponseModalService , private productReceptionService: ProductReceptService) {

  }

  // ngOnInit(): void {
  //   this.eventsSubscription = this.events.subscribe((data) => {
  //     if (data != undefined) {
  //       this.filters.push(data);
  //     }
  //     this.loadData();
  //   });
  //   this.loadData()
  // }

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
    this.reportService.getReport(this.postPerPage, this.pageNumber, this.filters, 'product_reception_report').subscribe((datas: any) => {
      this.displayedColumns = datas?.displayColumns;
      this.definedColumns = datas?.definedColumns;
      this.productReceptions = datas?.data;
      this.datatrigger.emit(this.productReceptions);
      this.count = datas?.recordsTotal;
    });
  };

  onPaginate = (pageObject) => {
    this.postPerPage = pageObject.postPerPage;
    this.pageNumber = pageObject.pageNumber;
    this.loadData();
  };

  edit = (rowId: any) => {
    this.editFromList.emit(rowId);
  }
  deleteConfirm = (id) => {
    this.productReceptionService.delete(id).subscribe((data: any) => {
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
    this.prepareDetailData(event);
    this.procurementModal.nativeElement.className = 'pr-modal modal right fade show';
  };

  prepareDetailData = (event) => {
    this.productReceptionService.getById(event).subscribe(data => {
      this.productReceptionDetail = data;
    });
  };

  close() {
    this.productReceptionDetail = null;
    this.procurementModal.nativeElement.className = 'pr-modal modal right fade';
  }

}
