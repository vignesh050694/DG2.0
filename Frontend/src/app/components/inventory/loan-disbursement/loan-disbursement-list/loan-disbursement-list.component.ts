import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { ReportService } from 'src/app/common/report/report.service';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { LoanDisbursementService } from '../loan-disbursement.service';

@Component({
  selector: 'app-loan-disbursement-list',
  templateUrl: './loan-disbursement-list.component.html',
  styleUrls: ['./loan-disbursement-list.component.scss']
})
export class LoanDisbursementListComponent implements OnInit {
  @ViewChild('trainingDetailModal', { static: false }) loanDisbursementModal: ElementRef;
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
  loanDisbursements: any[] = [];
  filters: any[] = [];
  detailData: any[] = [];
  loanDisbursement: any;
  detailId: any;

  constructor(private reportService: ReportService,
    private responseModalService: ResponseModalService,
    private loanDisbursementService:LoanDisbursementService)
    { }

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
    this.reportService.getReport(this.postPerPage, this.pageNumber, this.filters, 'loan_disbursement_report').subscribe((datas: any) => {
      if (datas != null) {
        this.displayedColumns = datas?.displayColumns;
        this.definedColumns = datas?.definedColumns;
        this.loanDisbursements = datas?.data;
        this.datatrigger.emit(this.loanDisbursements);
        this.count = datas?.recordsTotal;
      }

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
    this.loanDisbursementService.delete(id).subscribe((data: any) => {
      this.loadData();
      this.deleteFromList.emit();
    })
  }

  detail = (event) => {
    this.detailId=event;
    this.prepareDetailData(event);
    this.loanDisbursementModal.nativeElement.className = 'pr-modal modal right fade show';
  };

  prepareDetailData = (event) => {
    this.loanDisbursementService.getById(event).subscribe(data => {
      this.loanDisbursement = data;
    });
  };


  close() {
    this.loanDisbursement = null;
    this.loanDisbursementModal.nativeElement.className = 'pr-modal modal right fade';
  }

}
