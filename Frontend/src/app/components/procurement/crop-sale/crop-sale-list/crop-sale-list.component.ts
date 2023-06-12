import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CropSaleComponent } from '../crop-sale.component';
import { CropSaleService } from '../crop-sale.service'

@Component({
  selector: 'app-crop-sale-list',
  templateUrl: './crop-sale-list.component.html',
  styleUrls: ['./crop-sale-list.component.scss']
})
export class CropSaleListComponent implements OnInit {
  @ViewChild('cropSaleComp',{static:false}) cropSaleComponent: CropSaleComponent;
  @ViewChild('trainingDetailModal', { static: false }) cropSaleModal: ElementRef;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  @Output() deleteFromList = new EventEmitter();
  cardArray: any[] = [];
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = [];
  searchColumns: any[] = [];
  definedColumns = [];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  cropSales: any[] = [];
  filters: any[] = [];
  private eventsSubscription: Subscription;
  cropSaleDetail: any;
  detailId: any;

  constructor(private router: Router, private cropSaleService: CropSaleService) { }


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

  // ngOnInit(): void {
  //   this.eventsSubscription = this.events.subscribe((data) => {
  //     if (data != undefined) {
  //       this.filters.push(data);
  //     }
  //     this.loadData();
  //   });
  //   this.loadData()
  // }

  loadData = () => {
    this.cropSaleService.getCropSale(this.postPerPage, this.pageNumber, this.filters, 'crop_sale_report').subscribe((datas: any) => {
      this.displayedColumns = datas?.displayColumns;
      this.definedColumns = datas?.definedColumns;
      this.cropSales = datas?.data;
      this.datatrigger.emit(this.cropSales);
      this.count = datas?.recordsTotal;
    });
  };

  onPaginate = (pageObject) => {
    this.postPerPage = pageObject.postPerPage;
    this.pageNumber = pageObject.pageNumber;
    this.loadData();
  };

  edit = (rowId: any) => {
    this.editFromList.emit(rowId);
  }
  deleteConfirm = (id) => {
    this.cropSaleService.delete(id).subscribe((res: any) => {
     this.loadData();
     this.deleteFromList.emit();
    })
  }

  detail = (event) => {
    this.detailId=event;
    this.prepareDetailData(event);
    this.cropSaleModal.nativeElement.className = 'pr-modal modal right fade show';
  };
  close() {
    this.cropSaleModal.nativeElement.className = 'pr-modal modal right fade';
  }
  prepareDetailData = (event) => {
    this.cropSaleService.getById(event).subscribe(data => {
      this.cropSaleDetail = data;
    });
  };
  onSearch = (filters: any[]) => {
    this.filters = filters
    this.loadData();
  }
}
