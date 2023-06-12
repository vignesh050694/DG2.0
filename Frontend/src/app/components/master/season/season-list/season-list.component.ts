import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { SeasonService } from '../season.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { AppConfiguration } from '../../../../common/App.configuration';

@Component({
  selector: 'app-season-list',
  templateUrl: './season-list.component.html',
  styleUrls: ['./season-list.component.scss']
})
export class SeasonListComponent implements OnInit {
  filters: any[] = [];
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ['name', 'from (YYYY-MM-DD)', 'to  (YYYY-MM-DD)'];
  definedColumns = ["name", "from", "to"];
  searchColumns: any[] = [{ name: 'name', canShow: true }, { name: 'fromDate', canShow: true }, { name: 'toDate', canShow: true }];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  seasons: any[] = [];
  seasonForm: FormGroup;
  constructor(private seasonService: SeasonService, public formBuilder: FormBuilder, public datepipe: DatePipe,
    private responseModalService: ResponseModalService, private appConfiguration: AppConfiguration, private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.seasonForm = this.formBuilder.group({
      name: [''],
      from: [''],
      to: ['']
    });
    this.eventsSubscription = this.events.subscribe(() => {
      this.loadData();
    });
    this.loadData()
  }
  loadData = () => {
    this.seasons = [];
    this.seasonService.getSeason(this.postPerPage, this.pageNumber, this.filters).subscribe((datas: any) => {
      datas.data.forEach((season) => {
        let data = {
          id: season?.id,
          name: season?.name,
          from: this.datePipe.transform(new Date(season?.from), 'yyyy-MM-dd'),
          to: this.datePipe.transform(new Date(season?.to), 'yyyy-MM-dd')
        }
        this.seasons.push(data);
      })
      // this.seasons = datas.data;
      this.datatrigger.emit(this.seasons);
      this.count = datas?.recordsTotal;
    })

  }
  onPaginate = (pageObject) => {
    //pageObject.postPerPage...pageNumber
    this.postPerPage = pageObject.postPerPage;
    this.pageNumber = pageObject.pageNumber;
    this.loadData();
  }

  edit = (rowId: any) => {
    this.editFromList.emit(rowId);
  }
  deleteConfirm = (id) => {
    this.seasonService.deleteSeason(id).subscribe((res: any) => {
      this.loadData();
    })
  }
  onSearch = (filters: any[]) => {
    this.filters = filters;
    this.loadData();
  }
}
