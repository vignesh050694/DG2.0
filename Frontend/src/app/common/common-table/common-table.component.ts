import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActionPopupComponent } from '../action-popup/action-popup.component';
import { ResponseModalService } from '../response-modal/response-modal.service';
import { Page } from '../table-generic/Page';
import { MapDialouge } from '../table-generic/table-generic.component';

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss']
})
export class CommonTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() displayedColumns: string[];
  @Input() definedColumns: string[];
  @Input() searchColumns: any[];
  @Input() private datatrigger: EventEmitter<any>;
  @Input() count: number;
  @Input() isPagination: boolean = true;
  @Input() data: any = [];
  @Input() isAction: boolean = true;
  @Input() isEdit: boolean = true;
  @Input() isDetail: boolean = false;
  @Input() canShowSearch: boolean = true;


  @Output() editRow: EventEmitter<any> = new EventEmitter();
  @Output() detailRow: EventEmitter<any> = new EventEmitter();
  @Output() deleteRow: EventEmitter<any> = new EventEmitter();
  @Output() paginate = new EventEmitter();
  @Output() searchEvent = new EventEmitter();

  matDialogRef: MatDialogRef<any>;



  page = new Page();
  postPerPage: number = 10;
  pageNumber: number = 1;
  deleteObject: any;
  filters: any[] = [];
  tableData: any = []

  constructor(
    private responseModalService: ResponseModalService,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.tableData = this.data;
    if (this.datatrigger) {
      this.datatrigger.subscribe(data => {
        this.reload(data);
      });
    }
  }


  public getMap = (coordinates: any) => {
    if (coordinates && coordinates != undefined) {
      this.matDialog.closeAll();
      const dialogRef = this.matDialog.open(MapDialouge, {
        autoFocus: false,
        closeOnNavigation: true,
        height: 'auto',
        width: '30%',
        data: coordinates,
        disableClose: false,
        backdropClass: 'cdk-overlay-transparent-backdrop'
      });
      dialogRef.afterClosed().subscribe();
    }
  }

  reload = (data) => {
    this.tableData = data;
  }

  search = ($event: any) => {
    let filter = {
      key: $event?.target?.id,
      operation: ":",
      orPredicate: false,
      value: $event?.target?.value
    }
    let objIndex = this.filters.findIndex((obj => obj.key == $event?.target?.id));
    if (objIndex != -1) {
      this.filters[objIndex] = filter;
    }
    else {
      this.filters.push(filter);
    }
    this.searchEvent.emit(this.filters);
  }

  clearFilter() {
    this.filters = [];
    this.searchEvent.emit(this.filters);
  }

  edit = (row: any) => {
    this.editRow.emit(row);
  }

  delete = (row: any) => {
    let data = {
      title: "Delete",
      description: "Are You Sure?"
    }
    this.matDialogRef = this.responseModalService.openModalSM(ActionPopupComponent, data);
    this.matDialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.deleteRow.emit(row);
      }
    });
  }

  detail = (row: any) => {
    this.detailRow.emit(row);
  }

  reset = () => {
    $(".form-control").val("");
    this.clearFilter();
  }

  onPaginate = (pageEvent: PageEvent) => {
    this.postPerPage = +pageEvent.pageSize;
    this.pageNumber = +pageEvent.pageIndex + 1;
    let pageObject = { postPerPage: this.postPerPage, pageNumber: this.pageNumber };
    this.paginate.emit(pageObject);
  };
}
