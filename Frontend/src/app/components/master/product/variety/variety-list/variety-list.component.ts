import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { VarietyService } from '../variety.service';

@Component({
  selector: 'app-variety-list',
  templateUrl: './variety-list.component.html',
  styleUrls: ['./variety-list.component.scss']
})
export class VarietyListComponent implements OnInit {
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  @Output() deleteFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ['crop', 'name', 'Crop Cycle(Days)'];
  definedColumns = ['crop', 'name', 'daysToGrow'];

  searchColumns: any[] = [{ name: 'crop.name', displayName: 'Crop', canShow: true }, { name: 'name', canShow: true }, { name: 'daysToGrow', canShow: true }];

  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  varieties: any[] = [];
  filters: any[] = [];
  constructor(private varietyService: VarietyService) { }
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
    this.varietyService.getVariety(this.postPerPage, this.pageNumber, this.filters).subscribe((datas: any) => {
      this.varieties = [];
      datas.data.forEach((data) => {
        let obj = {
          id: data?.id,
          code: data?.code,
          crop: data?.crop?.name,
          daysToGrow: data?.daysToGrow,
          expectedYield: data?.expectedYield,
          initialHarvest: data?.initialHarvest,
          name: data?.name
        }
        this.varieties.push(obj);
      })
      this.datatrigger.emit(this.varieties);
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
    this.varietyService.deleteVariety(id).subscribe((data: any) => {
      this.deleteFromList.emit(id);
      this.loadData();
    })
  }
  onSearch = (filters: any[]) => {
    this.filters = filters
    this.loadData();
  }
}

