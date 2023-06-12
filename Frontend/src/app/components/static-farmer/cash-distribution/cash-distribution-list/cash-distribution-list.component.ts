import { CashDistributionService } from './../cash-distribution.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { MobileUserService } from 'src/app/components/settings/mobile-user/mobile-user.service';

@Component({
  selector: 'app-cash-distribution-list',
  templateUrl: './cash-distribution-list.component.html',
  styleUrls: ['./cash-distribution-list.component.scss']
})
export class CashDistributionListComponent implements OnInit {

  private eventsSubscription: Subscription;
  matDialogref: MatDialogRef<any>;
  @Input() events: Observable<void>;
  @Output() editFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ['idNo','name','balance'];
  searchColumns: any[] = [{name:'idNo',canShow:true },{ name: 'name', canShow: true },{name:'balance',canShow:true }];
  definedColumns = ['idNo', 'name','balance',];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  cashDistributions: any[] = [];
  farmer: any[] = [];
  filters: any[] = [];
  constructor(
    private cashDistributionService: CashDistributionService,
    private responseModalService: ResponseModalService,
    private mobileUserService: MobileUserService
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
    this.mobileUserService.getMobileUser(this.postPerPage, this.pageNumber, this.filters).subscribe((datas: any) => {
      this.cashDistributions = [];
          this.cashDistributions = datas.data;
      this.datatrigger.emit(this.cashDistributions);
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

  }

  onSearch=(filters:any[])=> {
    this.filters = filters
    this.loadData();
  }
}


