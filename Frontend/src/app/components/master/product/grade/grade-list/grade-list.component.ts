import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { GradeService } from '../grade.service';

@Component({
  selector: 'app-grade-list',
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.scss']
})
export class GradeListComponent implements OnInit {
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  @Output() deleteFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ['crop', 'variety', 'name', 'price'];
  definedColumns = ['crop', 'variety', 'name', 'price'];
  searchColumns: any[] = [{ name: 'crop.name', canShow: true }, { name: 'variety.name', canShow: true }, { name: 'name', canShow: true }, { name: 'price', canShow: true }];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  grades: any[] = [];
  filters: any[] = [];
  constructor(private gradeService: GradeService) { }

  // ngOnInit(): void {
  //   this.eventsSubscription = this.events.subscribe((data: any) => {
  //     if (data) {
  //       let filter = {
  //         key: "key",
  //         operation: ":",
  //         value: data
  //       }
  //       this.filters.push(filter);
  //     }
  //     this.loadData();
  //   });
  //   this.loadData()
  // }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((data: any) => {
      if (data != undefined) {
        this.filters = [];
        for (var i in data) {
          var key = i;
          var val = data[i];
          if (val) {
            this.filters.push({
              "key": key,
              "operation": ":",
              "value": val
            });
          }
        }
      }
      this.loadData();
    });
    this.loadData()
  }

  loadData = () => {
    this.gradeService.getGrade(this.postPerPage, this.pageNumber, this.filters).subscribe((datas: any) => {
      this.grades = [];
      datas.data.forEach((data) => {
        let obj = {
          id: data?.id,
          code: data?.code,
          crop: data?.variety?.crop?.name,
          variety: data?.variety?.name,
          price: data?.price,
          name: data?.name
        }
        this.grades.push(obj);
      })
      this.datatrigger.emit(this.grades);
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
    this.gradeService.deleteGrade(deleteId).subscribe((data: any) => {
      this.deleteFromList.emit(deleteId);
      this.loadData();
    })
  }
  onSearch = (filters: any[]) => {
    this.filters = filters
    this.loadData();
  }
}
