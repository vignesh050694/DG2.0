import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter, TemplateRef, ElementRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { RoleService } from '../role.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {
  @ViewChild('tablegeneric', { static: false }) tablegeneric: any;
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ["name", "isAdmin"];
  definedColumns = ["name", "isAdmin"];
  searchColumns: any[] = [
    { name: 'name', canShow: true },
    { name: 'isAdmin', canShow: true },
  ];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  roles: any[] = [];
  filters: [] = [];
  constructor(private roleService: RoleService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //this.eventsSubscription = this.events.subscribe(() => {
    //  this.loadData();
    //});
    this.loadData()
  }
  loadData = () => {
    this.roleService.getRoles(this.postPerPage, this.pageNumber, this.filters).subscribe((datas: any) => {
      this.roles = datas?.data;
      this.datatrigger.emit(this.roles);
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
  deleteConfirm = (id) => {
    //console.log(id);
    //this.vendorService.deleteVendor(id).subscribe((data: any) => {

    //})
  }
}
