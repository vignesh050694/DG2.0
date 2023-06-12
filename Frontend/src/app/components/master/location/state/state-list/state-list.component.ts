import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { StateService } from '../state.service';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.scss']
})
export class StateListComponent implements OnInit {
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  @Output() deleteFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ['name','country'];
  definedColumns = ['name', 'country'];
  searchColumns: any[] = [{name:'name',canShow:true}, {name:'country.name',canShow:true}];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  states: any[] = [];
  filters: any[] = [];
  constructor(private stateService: StateService) { }
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
    this.stateService.getState(this.postPerPage, this.pageNumber, this.filters).subscribe((datas: any) => {
      this.states = [];
      datas.data.forEach((data: any, index: number) => {
        let obj = {
          name: data?.name,
          country: data?.country?.name,
          id: data?.id
        };
        this.states.push(obj);
      })
      this.count = datas?.recordsTotal;
      this.datatrigger.emit(this.states);
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
    this.stateService.deleteState(deleteId).subscribe(()=>{
      this.deleteFromList.emit(deleteId);
      this.loadData();
    })
  }

  onSearch = (filters: any[]) => {
    this.filters = filters
    this.loadData();
  }
}
