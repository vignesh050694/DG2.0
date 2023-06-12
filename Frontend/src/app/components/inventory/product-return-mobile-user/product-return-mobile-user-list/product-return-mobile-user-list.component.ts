import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { ReportService } from 'src/app/common/report/report.service';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { ProductReturnMobileUserService } from '../product-return-mobile-user.service';

@Component({
  selector: 'app-product-return-mobile-user-list',
  templateUrl: './product-return-mobile-user-list.component.html',
  styleUrls: ['./product-return-mobile-user-list.component.scss']
})
export class ProductReturnMobileUserListComponent implements OnInit {
  @ViewChild('trainingDetailModal', { static: false }) productReturnMobileUserModal: ElementRef;
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
  productReturnMobileUsers: any[] = [];
  filters: any[] = [];
  detailData: any[] = [];
  productReturnMobileUser: any;
  detailId:any;


  constructor(private reportService: ReportService, private responseModalService: ResponseModalService ,private productReturnMobileUserService : ProductReturnMobileUserService) {

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
    this.reportService.getReport(this.postPerPage, this.pageNumber, this.filters, 'product_return_mobile_user_list').subscribe((datas: any) => {
      this.displayedColumns = datas?.displayColumns;
      this.definedColumns = datas?.definedColumns;
      this.productReturnMobileUsers = datas?.data;
      this.datatrigger.emit(this.productReturnMobileUsers);
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
    this.productReturnMobileUserService.delete(id).subscribe((data: any) => {
      this.loadData();
      this.deleteFromList.emit();
    })
  }
  detail(event) {
    this.detailId=event;
    this.prepareDetailData(event);
    this.productReturnMobileUserModal.nativeElement.className = 'pr-modal modal right fade show';
  };

  prepareDetailData = (event) => {
    this.productReturnMobileUserService.getById(event).subscribe(data => {
    this.productReturnMobileUser = data;
    });
  };

  close() {
    this.productReturnMobileUser = null;
    this.productReturnMobileUserModal.nativeElement.className = 'pr-modal modal right fade';
  }
}
