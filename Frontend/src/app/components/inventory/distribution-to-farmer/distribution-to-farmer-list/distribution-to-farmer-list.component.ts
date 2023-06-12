import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { ReportService } from 'src/app/common/report/report.service';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { DistributionToFarmerService } from '../distribution-to-farmer.service';

@Component({
  selector: 'app-distribution-to-farmer-list',
  templateUrl: './distribution-to-farmer-list.component.html',
  styleUrls: ['./distribution-to-farmer-list.component.scss']
})
export class DistributionToFarmerListComponent implements OnInit {
  @ViewChild('trainingDetailModal', { static: false }) distributionToFarmerModal: ElementRef;
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
  distributionToFarmers: any[] = [];
  filters: any[] = [];
  detailData: any[] = [];
  distributionToFarmer: any;
  detailId:any;


  constructor(private reportService: ReportService,
     private responseModalService: ResponseModalService,
     private distributionToFarmerService: DistributionToFarmerService, ) {

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

  loadData () {
   this.reportService.getReport(this.postPerPage, this.pageNumber, this.filters, 'distribution_to_farmer_list').subscribe((datas: any) => {
      this.displayedColumns = datas?.displayColumns;
      this.definedColumns = datas?.definedColumns;
      this.distributionToFarmers = datas?.data;
      this.datatrigger.emit(this.distributionToFarmers);
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
    this.distributionToFarmerService.delete(id).subscribe((data: any) => {
      this.loadData();
      this.deleteFromList.emit();
    })
  }

  detail = (event) => {
    this.detailId=event;
    this.prepareDetailData(event);
    this.distributionToFarmerModal.nativeElement.className = 'pr-modal modal right fade show';
  };
  //detail table data
  prepareDetailData = (event) => {
    this.distributionToFarmerService.getById(event).subscribe(data => {
      this.distributionToFarmer = data;
    });
  };

  close() {
    this.distributionToFarmer = null;
    this.distributionToFarmerModal.nativeElement.className = 'pr-modal modal right fade';
  }

}
