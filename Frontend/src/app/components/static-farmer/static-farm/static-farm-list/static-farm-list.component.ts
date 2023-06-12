import { StaticFarmService } from './../static-farm.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-static-farm-list',
  templateUrl: './static-farm-list.component.html',
  styleUrls: ['./static-farm-list.component.scss']
})
export class StaticFarmListComponent implements OnInit {

  private eventsSubscription: Subscription;
  matDialogref: MatDialogRef<any>;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ['farmName', 'farmer', 'surveyNo', 'conversionStatus'];
  searchColumns: any[] = [{ name: 'f.name', canShow: true }, { name: 'f1.name', canShow: true }, { name: 'f.survey_no', canShow: true }, { name: 'c.name', canShow: true }];
  definedColumns = ['name', 'farmer', 'surveyno', 'conversionstatus'];
  // displayedColumns: string[] = ['name' ,'farmer','Totallandholding','Address','actions'];
  // searchColumns: any[] = [{name:'name',canShow:true },{ name: 'farmer.name', canShow: true },{name:'totalLandHolding',canShow:true },{name:'address',canShow:true }];
  // definedColumns = ['name', 'farmer','totalLandHolding','address'];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  farms: any[] = [];
  farmer: any[] = [];
  filters: any[] = [];
  constructor(
    private staticFarmService: StaticFarmService,
    private responseModalService: ResponseModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((data) => {
      if (data != undefined) {
        this.filters.push(data);
      }
      this.loadData();
    });
    this.loadData()
  }
  loadData = () => {
    this.staticFarmService.getFarm(this.postPerPage, this.pageNumber, this.filters).subscribe((datas: any) => {
      this.farms = datas?.data;
      this.datatrigger.emit(this.farms);
      this.count = datas?.recordsTotal;
    })
  };

  // loadData = () => {
  //   this.staticFarmService.getFarm(this.postPerPage, this.pageNumber, this.filters).subscribe((datas: any) => {
  //    // this.farms = datas?.data;
  //     this.farms = [];
  //         datas.data.forEach((data) => {
  //           let obj = {
  //             id: data?.id,
  //            // unit: data?.unit?.name,
  //             name: data?.name,
  //             farmer: data?.farmer?.name,
  //             address: data?.address,
  //             totalLandHolding: data?.totalLandHolding
  //           }
  //           this.farms.push(obj);
  //         });
  //     this.datatrigger.emit(this.farms);
  //     this.count = datas?.recordsTotal;
  //   })
  // }
  // loadData = () => {
  //   this.CropService.getCrop(this.postPerPage, this.pageNumber, this.filters).subscribe((datas: any) => {
  //     this.crops = [];
  //     datas.data.forEach((data) => {
  //       let obj = {
  //         id: data?.id,
  //         unit: data?.unit?.name,
  //         name: data?.name
  //       }
  //       this.crops.push(obj);
  //     });
  //     this.datatrigger.emit(this.crops);
  //     this.count = datas?.recordsTotal;
  //   })
  // }

  onPaginate = (pageObject) => {
    this.postPerPage = pageObject.postPerPage;
    this.pageNumber = pageObject.pageNumber;
    this.loadData();
  }

  edit = (rowId: any) => {
    this.editFromList.emit(rowId);
  }

  deleteConfirm = (rowId: any) => {
    this.staticFarmService.deleteFarm(rowId).subscribe((data: any) => {
      this.loadData();
    });
  }

  onSearch = (filters: any[]) => {
    this.filters = filters
    this.loadData();
  }
}
