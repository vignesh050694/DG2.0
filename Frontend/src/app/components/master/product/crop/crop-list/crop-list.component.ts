import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { CropService } from '../crop.service';

@Component({
  selector: 'app-crop-list',
  templateUrl: './crop-list.component.html',
  styleUrls: ['./crop-list.component.scss']
})
export class CropListComponent implements OnInit {
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  @Output() deleteFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ['name', 'unit'];
  definedColumns = ['name', 'unit'];
  searchColumns: any[] = [{ name: 'name', canShow: true }, { name: 'unit.name', canShow: true }];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  crops: any[] = [];
  filters: any[] = [];
  constructor(private CropService: CropService) { }
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
    this.CropService.getCrop(this.postPerPage, this.pageNumber, this.filters).subscribe((datas: any) => {
      this.crops = [];
      datas.data.forEach((data) => {
        let obj = {
          id: data?.id,
          unit: data?.unit?.name,
          name: data?.name
        }
        this.crops.push(obj);
      });
      this.datatrigger.emit(this.crops);
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
  deleteConfirm = (deleteId: any) => {
    this.CropService.deleteCrop(deleteId).subscribe((res:any) => {
      this.deleteFromList.emit(deleteId);
      this.loadData();
    })
  }
  onSearch = (filters: any[]) => {
    this.filters = filters
    this.loadData();
  }
}
