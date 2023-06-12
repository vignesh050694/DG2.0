import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { MobileUserService } from '../mobile-user.service';

@Component({
  selector: 'app-mobile-user-list',
  templateUrl: './mobile-user-list.component.html',
  styleUrls: ['./mobile-user-list.component.scss']
})
export class MobileUserListComponent implements OnInit {

  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ['date (yyyy-mm-dd)', 'userId', 'name', 'mobileNumber', 'loginStatus', 'status'];
  definedColumns = ['date', 'userId', 'name', 'mobileNo', 'isDeleted', 'isActive'];
  searchColumns: any[] = [
    { name: 'date', canShow: true },
    { name: 'userId', canShow: true },
    { name: 'name', canShow: true },
    { name: 'mobileNo', canShow: true },
    { name: 'isDeleted', canShow: true },
    { name: 'isActive', canShow: true }
  ];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  mobileUsers: any[] = [];
  filters: any[] = [];
  constructor(private mobileUserService: MobileUserService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe(() => {
      this.reload();
    });
    this.reload();
  }
  reload = () => {
    this.mobileUserService.getMobileUser(this.postPerPage, this.pageNumber, this.filters).subscribe((datas: any) => {
      this.mobileUsers = [];
      datas.data.forEach((mobileUser) => {
        let data = {
          id: mobileUser?.id,
          userId: mobileUser?.userId,
          name: mobileUser?.name,
          mobileNo: mobileUser?.mobileNo,
          isDeleted: mobileUser?.isDeleted,
          isActive: mobileUser?.isActive,
          date: this.datePipe.transform(new Date(mobileUser?.date), 'yyyy-MM-dd')
        }
        this.mobileUsers.push(data);
      })
      this.datatrigger.emit(this.mobileUsers);
      this.count = datas?.recordsTotal;
    })

  }
  onPaginate = (pageObject) => {
    this.postPerPage = pageObject.postPerPage;
    this.pageNumber = pageObject.pageNumber;
    this.reload();
  }

  edit = (rowId: any) => {
    this.editFromList.emit(rowId);
  }
  deleteConfirm = (id) => {
    this.mobileUserService.deleteMobileUser(id).subscribe((res: any) => {
      this.reload();
    })
  }

  onSearch = (filters: any[]) => {
    this.filters = filters
    this.reload();
  }

}
