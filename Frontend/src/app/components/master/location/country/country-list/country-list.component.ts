import { Component, OnInit, ViewChild, AfterViewInit,Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  @Output() deleteFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ['name'];
  definedColumns = ["name"];
  searchColumns: any[] = [{name:'name',canShow:true}];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  countries: any[] = [];
  filters: any[]=[];
  constructor(private countryService: CountryService) { }
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
    this.countryService.getCountry(this.postPerPage, this.pageNumber, this.filters).subscribe((datas: any) => {
      this.countries = datas.data;
      this.datatrigger.emit(this.countries);
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

  deleteConfirm = (deleteId:any) => {
    this.countryService.deleteCountry(deleteId).subscribe((data: any) => {
      this.deleteFromList.emit(deleteId);
      this.loadData();
    })
  }
  onSearch = (filters: any[]) => {
    this.filters = filters;
    this.loadData();
  }
}
