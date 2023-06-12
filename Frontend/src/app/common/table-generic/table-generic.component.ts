import { Component, OnInit, ViewChild, Output, EventEmitter, TemplateRef, Input, ElementRef, Inject, OnDestroy, HostListener } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Page } from './Page';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponseModalService } from '../response-modal/response-modal.service';
import { ActionPopupComponent } from '../action-popup/action-popup.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'table-generic',
  templateUrl: './table-generic.component.html',
  styleUrls: ['./table-generic.component.scss']
})
export class TableGenericComponent implements OnInit {
  dataSource: MatTableDataSource<TableGenericComponent>;
  matDialogRef: MatDialogRef<any>;
  @ViewChild('table') table: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() displayedColumns: string[];
  @Input() definedColumns: string[];
  @Input() searchColumns: any[];
  @Input() data;
  @Input() isAction: boolean = true;
  @Input() isEdit: boolean = true;
  @Input() isDetail: boolean = false;
  @Input() canShowSearch: boolean = true;
  @Input() isAllActions: boolean = false;
  @Input() showReset: boolean = true;
  @Input() private datatrigger: EventEmitter<any>;
  @Output() editRow = new EventEmitter();
  @Output() detailRow = new EventEmitter();
  @Output() deleteRow = new EventEmitter();
  @Output() paginate = new EventEmitter();
  @Output() searchEvent = new EventEmitter();
  @Input() count: number;
  @Input() isPagination: boolean = true;
  rows = new MatTableDataSource([]);
  page = new Page();
  postPerPage: number = 10;
  pageNumber: number = 1;
  deleteObject: any;
  filters: any[] = [];
  panelOpenState: boolean = false;

  constructor(
    private responseModalService: ResponseModalService,
    private _liveAnnouncer: LiveAnnouncer,
    private matDialog: MatDialog) {
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

  ngOnInit(): void {
    this.rows.data = this.data;
    if (this.datatrigger) {
      this.datatrigger.subscribe(data => {
        this.reload(data);
      });
    }

  }
  // reload = (data) => {
  //   this.rows.data = data;
  //   this.rows.sort = this.sort;
  // }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  reload = (data) => {
    this.rows.data = data;
    this.rows.sort = this.sort;
  }

  onPaginate = (pageEvent: PageEvent) => {
    this.postPerPage = +pageEvent.pageSize;
    this.pageNumber = +pageEvent.pageIndex + 1;
    let pageObject = { postPerPage: this.postPerPage, pageNumber: this.pageNumber };
    this.paginate.emit(pageObject);
  };
  edit = (row: any) => {
    this.editRow.emit(row);
  }

  delete = (template: TemplateRef<any>, row: any) => {
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

  search = ($event: any) => {
    let filter = {
      key: $event?.target?.id,
      operation: ":",
      orPredicate: false,
      value: $event?.target?.value
    }
    let inputElement = document.getElementById($event?.target?.id);
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
  detail = (row: any) => {
    this.detailRow.emit(row);
  }
}

@Component({
  selector: 'map-dialouge',
  templateUrl: './map-dialog.html',
  styleUrls: ['./table-generic.component.scss']
})

export class MapDialouge {
  zoom: number = 2;
  minClusterSize: any = 2;
  lat: any = 13.124363;
  lng: any = 80.282201;
  markers: any = [];
  constructor(public dialogRef: MatDialogRef<MapDialouge>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialogRef.disableClose = true;
    this.markers = [];
    var arr = this.data.split(',')
    if (arr.length > 0 && arr[0] && arr[1]) {
      this.markers.push({
        lat: arr[0],
        lon: arr[1]
      })
      this.lat = parseFloat(arr[0]);
      this.lng = parseFloat(arr[1]);
    }
  }

  cancel() {
    this.dialogRef.close();
  }




}
