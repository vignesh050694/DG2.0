import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { TileStyler } from '@angular/material/grid-list/tile-styler';
import { Subscription, Observable } from 'rxjs';
import { DistrictService } from '../district.service';

@Component({
  selector: 'app-district-list',
  templateUrl: './district-list.component.html',
  styleUrls: ['./district-list.component.scss']
})
export class DistrictListComponent implements OnInit {
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  @Output() deleteFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ['name', 'state','country'];
  definedColumns = ['name', 'state', 'country'];
  searchColumns: any[] = [{name:'name',canShow:true}, {name:'state.name',canShow:true}, {name:'country.name',canShow:true}];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  districts: any[] = [];
  filters: any[] = [];
  constructor(private districtService: DistrictService) { }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((data: any) => {
      if (data) {
        let filter = {
          key: "key",
          operation: ":",
          value: data
        }
        this.filters.push(filter);
      }
      this.loadData();
    });
    this.loadData()
  }
  loadData = () => {
    this.districtService.getDistrict(this.postPerPage, this.pageNumber, this.filters).subscribe((datas: any) => {
      this.districts = [];
      datas.data.forEach((data: any, index: number) => {
        var obj = {
          name: data.name,
          country: data?.state?.country?.name,
          state: data?.state?.name,
          id: data?.id
        };
        this.districts.push(obj);
      })
      this.count = datas?.recordsTotal;
      this.datatrigger.emit(this.districts);
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
  deleteConfirm = (deleteId: any) => {
    this.districtService.deleteDistrict(deleteId).subscribe(()=>{
      this.deleteFromList.emit(deleteId);
      this.loadData();
    })
  }

  onSearch = (filters: any[]) => {
    this.filters = filters
    this.loadData();
  }
}
