import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { CatalogueService } from '../catalogue.service';


@Component({
  selector: 'app-catalogue-list',
  templateUrl: './catalogue-list.component.html',
  styleUrls: ['./catalogue-list.component.scss']
})
export class CatalogueListComponent implements OnInit {
  private eventsSubscription: Subscription;
  filters: any[] = [];
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ['catalogueType', 'catalogueName', 'status'];
  definedColumns = ['catalogueType', 'name', 'isActive'];
  searchColumns: any[] = [{name:'catalogueType.name',canShow:true}, {name:'name',canShow:true},{name:'name',canShow:false}];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  catalogues: any[] = [];
  constructor(private catalogueService: CatalogueService) { }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe(() => {
      this.reload();
    });
    this.reload();
  }

  reload = () => {
    this.catalogueService.getCatalogue(this.postPerPage, this.pageNumber, this.filters).subscribe((datas: any) => {
      this.catalogues = [];
      datas.data.forEach((catalogue) => {
        let data = {
          id: catalogue?.id,
          catalogueType: catalogue?.catalogueType?.name,
          name: catalogue?.name,
          isActive: catalogue?.isActive
        }
        this.catalogues.push(data);
      })
      this.datatrigger.emit(this.catalogues);
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
    this.catalogueService.deleteCatalogues(id).subscribe((data: any) => {
      this.reload();
    })
  }
  onSearch = (filters: any[]) => {
    this.filters = filters
    this.reload();
  }
}
