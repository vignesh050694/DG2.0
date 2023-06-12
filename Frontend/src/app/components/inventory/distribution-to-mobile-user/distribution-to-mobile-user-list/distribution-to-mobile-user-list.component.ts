import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { ReportService } from 'src/app/common/report/report.service';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { DistributionToMobileUserService } from '../distribution-to-mobile-user.service';

@Component({
  selector: 'app-distribution-to-mobile-user-list',
  templateUrl: './distribution-to-mobile-user-list.component.html',
  styleUrls: ['./distribution-to-mobile-user-list.component.scss']
})
export class DistributionToMobileUserListComponent implements OnInit {

  @ViewChild('trainingDetailModal', { static: false }) distributionToMobileUserModal: ElementRef;
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
  distributionToMobileUsers: any[] = [];
  filters: any[] = [];
  detailData: any[] = [];
  distributionToMobileUser: any;
  detailId:any;

  constructor(private reportService: ReportService, private responseModalService: ResponseModalService, private distributionToMobileUserService :DistributionToMobileUserService ) {

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
    // this.reportService.getReport(this.postPerPage, this.pageNumber, this.filters, 'distribution_to_mobile_user_report').subscribe((datas: any) => {
      this.reportService.getReport(this.postPerPage, this.pageNumber, this.filters, 'distribution_to_mobile_user_list').subscribe((datas: any) => {
      this.displayedColumns = datas?.displayColumns;
      this.definedColumns = datas?.definedColumns;
      this.distributionToMobileUsers = datas?.data;
      this.datatrigger.emit(this.distributionToMobileUsers);
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
    this.distributionToMobileUserService.delete(id).subscribe((data: any) => {
      this.loadData();
      this.deleteFromList.emit();
    })
  }

  detail = (event) => {
    this.detailId=event;
    this.prepareDetailData(event);
    this.distributionToMobileUserModal.nativeElement.className = 'pr-modal modal right fade show';
  };

  prepareDetailData = (event) => {
    this.distributionToMobileUserService.getById(event).subscribe(data => {
      this.distributionToMobileUser = data;
    });
  };


  close() {
    this.distributionToMobileUser = null;
    this.distributionToMobileUserModal.nativeElement.className = 'pr-modal modal right fade';
  }

}
