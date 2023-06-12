import { StaticSowingService } from './../static-sowing.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-static-sowing-list',
  templateUrl: './static-sowing-list.component.html',
  styleUrls: ['./static-sowing-list.component.scss']
})
export class StaticSowingListComponent implements OnInit {
  filters: any[] = [];
  displayedColumns: string[] = ['Sowing Date', 'crop', 'variety', 'farm', 'farmer', 'cultivationarea', 'estimatedyield'];
  definedColumns = ['date', 'crop', 'variety', 'farm', 'farmer', 'cultivationarea', 'estimatedyield'];
  searchColumns: any[] = [
    { name: 's.sowing_date', canShow: false },
    { name: 'c.name', canShow: true },
    { name: 'v.name', canShow: true },
    { name: 'f.name', canShow: true },
    { name: 'f2.name', canShow: true },
    { name: 's.cultivation_area', canShow: true },
    { name: 's.estimated_yield', canShow: true }];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  sowings: any[] = [];
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  constructor(private staticSowingService: StaticSowingService) { }


  ngOnInit() {
    this.eventsSubscription = this.events.subscribe(() => {
      this.reload();
    });
    this.reload();
  }
  reload = () => {
    this.staticSowingService.getSowing(this.postPerPage, this.pageNumber, this.filters).subscribe((datas: any) => {
      this.sowings = datas?.data;
      this.datatrigger.emit(this.sowings);
      this.count = datas?.recordsTotal;
    })
  };
  onPaginate = (pageObject) => {
    this.postPerPage = pageObject.postPerPage;
    this.pageNumber = pageObject.pageNumber;
    this.reload();
  }

  edit = (rowId: any) => {
    this.editFromList.emit(rowId);
  };

  deleteRow = (id: any) => {
    this.staticSowingService.deleteSowingById(id).toPromise().then(() => {
      this.reload();
    })
  }

  onSearch = (filters: any[]) => {
    this.filters = filters;
    this.reload();
  };

}

