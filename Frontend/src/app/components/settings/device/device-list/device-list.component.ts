import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter, TemplateRef, ElementRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { DeviceService } from '../device.service';
import { ExportService } from '../../../../common/export-services/export.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
  @ViewChild('tablegeneric', { static: false }) tablegeneric: any;
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ['Code', 'Name', 'Serial No', 'Status','Version','Date'];
  definedColumns = ['code', 'name', 'serialNo', 'isActive','version', 'date'];
  searchColumns: any[] = ['code', 'name', 'serialNo', 'isActive','version', 'date'];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  devices: any[] = [];
  filters: [] = [];
  constructor(private deviceService: DeviceService, private exportService:ExportService) { }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe(() => {
      this.loadData();
    });
    this.loadData()
  }
  loadData = () => {
    this.deviceService.getDevice(this.postPerPage, this.pageNumber, this.filters).subscribe((datas: any) => {
      this.devices = datas?.data;
      this.datatrigger.emit(this.devices);
      this.count = datas?.recordsTotal;
    })

  }
  onPaginate = (pageObject) => {
    this.postPerPage = pageObject.postPerPage;
    this.pageNumber = pageObject.pageNumber;
    this.loadData();
  }

  edit = (rowId: any) => {
    this.editFromList.emit(rowId);
  }
  deleteConfirm = (id) => {
    //console.log(id);
    //this.vendorService.deleteVendor(id).subscribe((data: any) => {

    //})
  }
  exportToExcel = () => {
    this.exportService.exportToExcel(this.devices);
  }
}
