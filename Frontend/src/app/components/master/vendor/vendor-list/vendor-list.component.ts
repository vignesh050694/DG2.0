import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent implements OnInit {
  filters: any[] = [];
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ['name', 'address', 'contactPerson', 'contactNumber','emailId'];
  definedColumns = ['name', 'address', 'contactPerson', 'contactNumber', 'emailId'];
  searchColumns: any[] = [{name:'name',canShow:true}, {name:'address',canShow:true},
  {name:'contactPerson',canShow:true}, {name:'contactNumber',canShow:true}, {name:'emailId',canShow:true}];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  vendors: any[] = [];
  constructor(private vendorService: VendorService) { }
  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe(() => {
      this.loadData();
    });
    this.loadData()
  }
  loadData = () => {
    this.vendorService.getVendor(this.postPerPage, this.pageNumber, this.filters).subscribe((datas: any) => {
      this.vendors = datas?.data;
      this.datatrigger.emit(this.vendors);
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
    this.vendorService.deleteVendor(id).subscribe((data: any) => {
      this.loadData();
    })
  }
  onSearch = (filters: any[]) => {
    this.filters = filters
    this.loadData();
  }
}
