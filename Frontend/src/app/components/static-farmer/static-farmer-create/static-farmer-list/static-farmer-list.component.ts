import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { GroupService } from 'src/app/components/settings/group/group.service';
import {StaticFarmerService} from '../../static-farmer.service';

@Component({
  selector: 'app-static-farmer-list',
  templateUrl: './static-farmer-list.component.html',
  styleUrls: ['./static-farmer-list.component.scss']
})
export class StaticFarmerListComponent implements OnInit {

  @ViewChild('trainingDetailModal', { static: false }) staticFarmerModal: ElementRef;

  private eventsSubscription: Subscription;
  matDialogRef: MatDialogRef<any>;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ['name','emailId', 'mobileNumber', 'fatherName','group', 'Fpo/FgGroup','village','is active'];
  searchColumns: any[] = [
    {name:'f.name',canShow:true}, {name:'f.email_id',canShow:true},
    {name:'f.mobile_number',canShow:true}, {name:'f.father_name',canShow:true},
    {name:'fg.name',canShow:true},{name:'c.name',canShow:true},
    {name:'v.name',canShow:true}, {name:'f.is_active',canShow:false}];
  definedColumns = ['name', 'email', 'mobilenumber', 'fathername','group', 'fpogroup','village','isactive'];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  farmers: any[] = [];
  filters: any[] = [

  ];
  farmerDetail: any;
  detailId: any;
  farmerGroup:any;
  farmer:any;
  constructor(private farmerService: StaticFarmerService,private responseModalService: ResponseModalService,
    private groupService:GroupService,private router :Router) { }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((data) => {
      if (data != undefined) {
        this.filters.push(data);
      }
      this.loadData();
    });
    this.loadData()
  }


  // ngOnInit(): void {
  //   this.eventsSubscription = this.events.subscribe((data: any) => {
  //     if (data != undefined) {
  //       this.filters = [];
  //       for (var i in data) {
  //         var key = i;
  //         var val = data[i];
  //         if (val) {
  //           this.filters.push({
  //             "key": key,
  //             "operation": ":",
  //             "value": val
  //           });
  //         }
  //       }
  //     }
  //     this.loadData();
  //   });
  //   this.loadData()
  // }

  // getGroupById=(id:any)=>{
  //   this.farmerGroup = ""
  //   this.groupService.getGroupById(id).toPromise().then((data:any)=>{
  //     this.farmerGroup = data;
  //   })
  // }



  loadData = () => {
    this.farmerService.getFarmer(this.postPerPage, this.pageNumber, this.filters).toPromise().then((datas:any)=>{
      this.farmers = datas?.data;
      this.datatrigger.emit(this.farmers);
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

  deleteConfirm =(rowId: any) => {
    this.farmerService.deleteFarmer(rowId).subscribe((data: any) => {
      this.loadData();
    });
  }
  detail = (event) => {
    this.detailId=event;
    this.prepareDetailData(event);
    this.router.navigate(['farmer/static-farmer-create/detail'],{ queryParams: { id: event }});
    // this.staticFarmerModal.nativeElement.className = 'pr-modal modal right fade show';
  };
  close() {
    this.staticFarmerModal.nativeElement.className = 'pr-modal modal right fade';
  }

  prepareDetailData = (event) => {
    this.farmerService.getFarmerById(event).subscribe(data => {
      this.farmerDetail = data;
    });
  };

  onSearch=(filters:any[])=> {
    this.filters = filters;
    this.loadData();

  }
}
