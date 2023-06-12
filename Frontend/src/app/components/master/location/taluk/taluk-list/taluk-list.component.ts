import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { TalukService } from '../taluk.service';

@Component({
  selector: 'app-taluk-list',
  templateUrl: './taluk-list.component.html',
  styleUrls: ['./taluk-list.component.scss']
})
export class TalukListComponent implements OnInit {
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  @Output() deleteFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ['name', 'district', 'state', 'country'];
  definedColumns = ['name', 'district', 'state', 'country'];
  searchColumns: any[] = [{name:'name',canShow:true}, {name:'district.name',canShow:true}, {name:'state.name',canShow:true}, {name:'country.name',canShow:true}];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  taluks: any[] = [];
  filters: any[] = [];
  constructor(private talukService: TalukService) { }

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
    this.talukService.getTaluk(this.postPerPage, this.pageNumber, this.filters).subscribe((datas: any) => {
      this.taluks = [];
      datas.data.forEach((data: any, index: number) => {
        var obj = {
          name: data.name,
          country: data?.district?.state?.country?.name,
          state: data?.district?.state?.name,
          district: data?.district?.name,
          id: data?.id
        };
        this.taluks.push(obj);
      })
      this.count = datas?.recordsTotal;
      this.datatrigger.emit(this.taluks);
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
  deleteConfirm(deleteId: any) {
    this.talukService.deleteTaluk(deleteId).subscribe((data: any) => {
      this.deleteFromList.emit(deleteId);
      this.loadData();
    });
  }
  onSearch = (filters: any[]) => {
    this.filters = filters
    this.loadData();
  }
}
