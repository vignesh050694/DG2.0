import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { VillageService } from '../village.service';

@Component({
  selector: 'app-village-list',
  templateUrl: './village-list.component.html',
  styleUrls: ['./village-list.component.scss']
})
export class VillageListComponent implements OnInit {
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  @Output() deleteFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ['name', 'taluk', 'district', 'state', 'country'];
  definedColumns = ['name', 'taluk', 'district', 'state', 'country'];
  searchColumns: any[] = [{ name: 'name', canShow: true }, { name: 'taluk.name', canShow: true },
  { name: 'district.name', canShow: true }, { name: 'state.name', canShow: true }, { name: 'country.name', canShow: true }];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  villages: any[] = [];
  filters: any[] = [];
  constructor(private villageService: VillageService) { }

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
    this.villageService.getVillage(this.postPerPage, this.pageNumber, this.filters).subscribe((datas: any) => {
      this.villages = [];
      datas.data.forEach((data: any, index: number) => {
        var obj = {
          name: data.name,
          country: data?.taluk?.district?.state?.country?.name,
          state: data?.taluk?.district?.state?.name,
          district: data?.taluk?.district?.name,
          taluk: data?.taluk?.name,
          id: data?.id
        };
        this.villages.push(obj);
      })
      this.count = datas?.recordsTotal;
      this.datatrigger.emit(this.villages);
    })
  };

  onPaginate = (pageObject) => {
    this.postPerPage = pageObject.postPerPage;
    this.pageNumber = pageObject.pageNumber;
    this.loadData();
  }

  edit = (rowId: any) => {
    this.editFromList.emit(rowId);
  };

  deleteConfirm = (deleteId: any) => {
    this.villageService.deleteVillage(deleteId).subscribe((data: any) => {
      this.deleteFromList.emit(deleteId);
      this.loadData();
    })
  };

  onSearch = (filters: any[]) => {
    this.filters = filters
    this.loadData();
  };

}
