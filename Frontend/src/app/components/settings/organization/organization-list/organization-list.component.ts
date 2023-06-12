import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { OrganizationService } from '../organization.service';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ['organizationId', 'name', 'contactPerson', 'contactNumber', 'address', 'status'];
  definedColumns = ['organizationId', 'name', 'contactPerson', 'contactNumber', 'address', 'isActive'];
  searchColumns = [{ name: 'organizationId', canShow: true }, { name: 'name', canShow: true }, { name: 'contactPerson', canShow: true }, { name: 'contactNumber', canShow: true },
  { name: 'address', canShow: true }, { name: 'isActive', canShow: false }];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  organizations: any[] = [];
  filters: any[] = [];
  constructor(private organizationService: OrganizationService) { }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe(() => {
      this.reload();
    });
    this.reload();
  }
  reload = () => {
    this.organizationService.getOrganization(this.postPerPage, this.pageNumber, this.filters).subscribe((datas: any) => {
      this.organizations = datas.data;
      this.datatrigger.emit(this.organizations);
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
    this.organizationService.deleteOrganization(id).subscribe((data: any) => {
      this.reload();
    })
  }
  onSearch = (filters: any[]) => {
    this.filters = filters
    this.reload();
  }
}
