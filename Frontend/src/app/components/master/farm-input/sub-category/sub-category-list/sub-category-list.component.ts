import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { SubCategoryService } from '../sub-category.service';

@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.scss']
})
export class SubCategoryListComponent implements OnInit {
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  @Output() deleteFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ['category', 'name', 'unit', 'price'];
  definedColumns = ['category', 'name', 'unit', 'price'];
  searchColumns: any[] = [{name:'category.name',canShow:true},{name:'name',canShow:true},{name:'unit.name',canShow:true},{name:'price',canShow:true}];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  subCategories: any[] = [];
  filters: any[] = [];
  constructor(private subCategoryService: SubCategoryService) { }
  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe(() => {
      this.loadData();
    });
    this.loadData()
  }
  loadData = () => {
    this.subCategoryService.getSubCategory(this.postPerPage, this.pageNumber, this.filters).subscribe((datas: any) => {
      this.subCategories = [];
      datas?.data.forEach((subCategory) => {
        let data = {
          id: subCategory?.id,
          category: subCategory?.category?.name,
          name: subCategory?.name,
          unit: subCategory?.unit?.name,
          price: subCategory?.price,
        }
        this.subCategories.push(data);
      });
      this.datatrigger.emit(this.subCategories);
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
    this.subCategoryService.deleteSubCategory(id).subscribe((data: any) => {
      this.deleteFromList.emit(id);
      this.loadData();
    })
  }
  onSearch = (filters: any[]) => {
    this.filters = filters
    this.loadData();
  }
}
