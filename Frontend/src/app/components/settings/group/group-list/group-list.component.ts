import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { GroupService } from '../group.service';
import { ExportService } from '../../../../common/export-services/export.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ['name', 'Formation Date(yyyy-mm-dd)'];
  definedColumns = ['name', 'formationDate'];
  searchColumns: any[] = [{ name: 'formationDate', canShow: true }, { name: 'name', canShow: true }];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  groups: any[] = [];
  filters: any[] = [];
  constructor(private groupService: GroupService, private exportService: ExportService, private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe(() => {
      this.loadData();
    });
    this.loadData()
    //this.responsiveModalService.OpenModal('assets/images/icons/modal-success-ico.png', 'Roles Added','Your information has been saved successfully!');
  }
  loadData = () => {
    this.groupService.getGroup(this.postPerPage, this.pageNumber, this.filters).subscribe((datas: any) => {
      this.groups = [];
      datas.data.forEach((group) => {
        let data = {
          id: group?.id,
          name: group?.name,
          formationDateStr: group?.formationDateStr != "" ? this.datePipe.transform(new Date(group?.formationDateStr), 'yyyy-MM-dd') : ""
        }
        this.groups.push(data);
      })
      this.datatrigger.emit(this.groups);
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
    this.groupService.deleteGroup(id).subscribe((data: any) => {
      this.loadData();
    })
  }
  exportToExcel = () => {
    this.exportService.exportToExcel(this.groups);
  }
  onSearch = (filters: any[]) => {
    this.filters = filters
    this.loadData();
  }
}
