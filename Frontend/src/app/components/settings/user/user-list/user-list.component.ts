import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ['userName', 'firstName', 'lastName', 'mobileNumber', 'role', 'isActive'];
  definedColumns = ['userName', 'firstName', 'lastName', 'mobileNumber', 'role', 'isActive'];
  searchColumns: any[] = [
    { name: 'userName', canShow: true },
    { name: 'firstName', canShow: true },
    { name: 'lastName', canShow: true },
    { name: 'mobileNumber', canShow: true },
    { name: 'role', canShow: true },
    { name: 'isActive', canShow: true }
  ];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  users: any[] = [];
  filters: [] = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe(() => {
      this.loadData();
    });
    this.loadData()
  }
  //to display data in the table
  loadData = () => {
    this.userService.getUser(this.postPerPage, this.pageNumber, this.filters).subscribe((datas: any) => {
      this.users = datas?.data;
      this.datatrigger.emit(this.users);
      this.count = datas?.recordsTotal;
    })

  }
  onPaginate = (pageObject) => {
    this.postPerPage = pageObject.postPerPage;
    this.pageNumber = pageObject.pageNumber;
    this.loadData();
  }

  //edit option
  edit = (rowId: any) => {
    this.editFromList.emit(rowId);
  }

  //delete option
  deleteConfirm = (id) => {
    console.log(id);
    this.userService.deleteUser(id).subscribe((data: any) => {

    })
  }
}
