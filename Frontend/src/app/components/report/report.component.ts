import { environment } from 'src/environments/environment';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Dropdown } from '../../common/dynamic-forms/dropdown';
import { DynamicFormBase } from '../../common/dynamic-forms/dynamic-form-base';
import { ReportService } from '../../common/report/report.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  @ViewChild('trainingDetailModal', { static: false }) reportModal: ElementRef;
  matDialogRef: MatDialogRef<any>;
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = [];
  searchColumns: any[] = [];
  definedColumns = [];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  datas: any[] = [];
  filters: any[] = [];
  keys: any[] = [];
  detailData: any[] = [];
  cardArray: any[] = [];
  queryData: any[] = [];
  reportName: any;
  formData: DynamicFormBase<any>[] = [];
  isFilterDataLoaded: boolean = false;
  isAddBtn: boolean;
  isDetail: boolean;
  routePath: String;
  isDateRange: boolean = false;
  dataKey: any = {
    'distribution_to_farmer_report': 'dtf.date',
    'distribution_to_mobile_user_report': 'dtmu.date',
    'Warehouse_stock_Report': 'ws.date',
    'farm_inspection_report': 'fi.inspection_date'
  }

  selectedTab: any = null;
  tabs: any = [];
  pdfDownloadUrl = environment.baseUrl + "report/download-pdf?report=";
  excelDownloadUrl = environment.baseUrl + "report/download-excel?report=";
  title: any;
  detailPageData: any = {};
  constructor(
    private reportService: ReportService,
    private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.reportName = params['reportName'];
      this.title = this.reportName.replaceAll('_', ' ')
      this.loadAggregate();
      this.getTabs();
      this.loadData();
      this.getFormData();
      if (this.reportName === 'distribution_to_farmer_report'
        || this.reportName === 'distribution_to_mobile_user_report'
        || this.reportName === 'Warehouse_stock_Report'
        || this.reportName === 'farm_inspection_report'
      ) {
        this.isDateRange = true;
      }
    });

  }

  getTabs = () => {
    if (this.reportName == 'farm_inspection_report') {
      this.tabs = [{ key: 0, value: 'regular based', alias: 'fi.type' }, { key: 1, value: 'need based', alias: 'fi.type' }];
      this.tabChanged(0);
    }
  }
  tabChanged = (index: any): void => {
    this.selectedTab = this.tabs[index];
    this.loadData();
  };
  loadAggregate = () => {
    this.cardArray = [];
    this.reportService.getAggreate(this.reportName).subscribe((data: any[]) => {
      data.forEach(aggr => {
        let card = {
          "name": aggr.id,
          "count": aggr.name,
          "image": aggr.icon
        }
        this.cardArray.push(card);
      });
    });
  }


  loadData = () => {
    if (this.selectedTab) this.filters.push({ "key": this.selectedTab?.alias, "operation": ":", "value": this.selectedTab?.key });
    this.reportService.getReport(this.postPerPage, this.pageNumber, this.filters, this.reportName).subscribe((datas: any) => {
      this.filters = [];
      this.displayedColumns = datas?.displayColumns;
      this.definedColumns = datas?.definedColumns;
      this.datas = datas?.data;
      this.datatrigger.emit(this.datas);
      this.count = datas?.recordsTotal;
      this.isDetail = datas?.isDetail;
      this.isAddBtn = datas?.isAddBtn;
      this.routePath = datas?.route;
    });
  };

  async getFormData() {
    await this.reportService.getFilters(this.reportName).subscribe((data: any[]) => {
      data.forEach(filter => {
        if (filter.type == 1) {
          this.formData.push(
            new Dropdown({
              key: filter?.key,
              label: filter?.label,
              options: filter?.data,
              order: 0
            })
          );
          this.keys.push(filter?.key)
        }
      });
      this.isFilterDataLoaded = true;
      return this.formData.sort((a, b) => a.order - b.order);
    });
  }

  onPaginate = (pageObject) => {
    this.postPerPage = pageObject.postPerPage;
    this.pageNumber = pageObject.pageNumber;
    this.loadData();
  };

  edit = (rowId: any) => {
    this.editFromList.emit(rowId);
  }
  editDetail = (event: any) => {
  }
  deleteConfirm = (id) => {
    console.log(id);
    //this.procurementService.deleteBuyer(id).subscribe((data: any) => {
    //  this.loadData();
    //})
  }
  onSearch = (data: any[]) => {
    if (data != undefined) {
      this.filters = [];
      for (var i in data) {
        if (i === 'daterange') {
          this.filters.push({
            "key": this.dataKey[this.reportName],
            "operation": "<>",
            "value": data[i]
          });
        } else {
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
    }
    this.loadData();
    //this.filters = data
    // console.log(data.toString.length);
    // if(data.length>0){
    //   var query = (JSON.stringify(data));
    //   let re = /\"/gi;
    //   query = query.replace(re,"");
    //   query = query.replace("{","");
    //   query = query.replace("}","");
    //   this.queryData = query.split(",");
    //   this.queryData = this.queryData.toString().split(":");
    // }
    // var query = (JSON.stringify(data));
    // let re = /\"/gi;
    // query = query.replace(re,"");
    // query = query.replace("{","");
    // query = query.replace("}","");
    // this.queryData = query.split(":");
    // let arr ={
    //   key: this.queryData[0],
    //   operation: ":",
    //   value:this.queryData[1]
    // }
    // this.filters=[];
    // this.filters.push(arr);
  }
  detail = (event) => {
    this.prepareDetailData(event);
    this.reportModal.nativeElement.className = 'pr-modal modal right fade show';
  };

  prepareDetailData = (event) => {
    this.reportService.getReportDetail(event, this.reportName).subscribe(data => {
      this.detailPageData = data;
    });
  };

  close() {
    this.detailPageData = null;
    this.reportModal.nativeElement.className = 'pr-modal modal right fade';
  }

  export = (url) => {
    window.open(url + this.reportName, "_blank")
  };

}
