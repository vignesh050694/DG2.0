import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ReportService } from '../../../../common/report/report.service';
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { ProcurementService } from '../procurement.service';

@Component({
  selector: 'app-procurement-list',
  templateUrl: './procurement-list.component.html',
  styleUrls: ['./procurement-list.component.scss']
})
export class ProcurementListComponent implements OnInit {
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
  procurements: any[] = [];
  filters: any[] = [];
  detailData: any[] = [];
  procurement: any;
  editId:any;

  constructor(private procurementService: ProcurementService, private responseModalService: ResponseModalService, private reportService: ReportService, private router: Router) {

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
    this.procurementService.getReport(this.postPerPage, this.pageNumber, this.filters, 'procurement_report').toPromise().then((datas:any)=>{
      this.displayedColumns = datas?.displayColumns;
      this.definedColumns = datas?.definedColumns;
      this.procurements = datas?.data;
      this.datatrigger.emit(this.procurements);
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
    this.procurementService.deleteProcurement(id).subscribe((data: any) => {
      this.loadData();
      this.deleteFromList.emit();
    })
  }
  onSearch = (filters: any[]) => {
    this.filters = filters
    this.loadData();
  }

  detail = (event) => {
    this.prepareDetailData(event);
    this.procurementModal.nativeElement.className = 'pr-modal modal right fade show';
  };

  prepareDetailData = (event) => {
    this.editId = event;
    this.procurementService.getById(event).subscribe(data => {
      this.procurement = data;
    });
  };

  close() {
    this.procurement = null;
    this.procurementModal.nativeElement.className = 'pr-modal modal right fade';
  }
}
//data-toggle="modal" data-target="#trainingDetailModal"
