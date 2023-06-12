import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { CropHarvestService } from '../crop-harvest.service';
import { ReportService } from 'src/app/common/report/report.service';

@Component({
  selector: 'app-crop-harvest-list',
  templateUrl: './crop-harvest-list.component.html',
  styleUrls: ['./crop-harvest-list.component.scss']
})
export class CropHarvestListComponent implements OnInit {
  @ViewChild('trainingDetailModal', { static: false }) cropHarvestModal: ElementRef;
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
  cropHarvests: any[] = [];
  filters: any[] = [];
  detailData: any[] = [];
  cropHarvest: any;
  detailId:any;
  constructor(private router: Router, private reportService: ReportService, private cropHarvestService: CropHarvestService, private responseModalService: ResponseModalService) { }
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
    this.displayedColumns = [];
    this.definedColumns = [];
    this.cropHarvests = [];
    this.reportService.getReport(this.postPerPage, this.pageNumber, this.filters, 'crop_harvest_report').subscribe((datas: any) => {
      this.displayedColumns = datas?.displayColumns;
      this.definedColumns = datas?.definedColumns;
      this.cropHarvests = datas?.data;
      this.datatrigger.emit(this.cropHarvests);
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
    this.cropHarvestService.delete(id).subscribe((data: any) => {
      this.loadData();
      this.deleteFromList.emit();
    })
  }
  onSearch = (filters: any[]) => {
    this.filters = filters
    this.loadData();
  }
  detail(event) {
    this.detailId=event;
    this.prepareDetailData(event);
    this.cropHarvestModal.nativeElement.className = 'pr-modal modal right fade show';
  }
  prepareDetailData = (event) => {
    this.cropHarvestService.getById(event).subscribe(data => {
      this.cropHarvest = data;
    });
  };
  close = () => {
    this.cropHarvest = null;
    this.cropHarvestModal.nativeElement.className = 'pr-modal modal right fade';
  }
}
