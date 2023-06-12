import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription, Observable } from 'rxjs';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { ActionPopupComponent } from 'src/app/common/action-popup/action-popup.component';
import { BuyerService } from '../buyer.service';

@Component({
  selector: 'app-buyer-list',
  templateUrl: './buyer-list.component.html',
  styleUrls: ['./buyer-list.component.scss']
})


export class BuyerListComponent implements OnInit {
  private eventsSubscription: Subscription;
  matDialogRef: MatDialogRef<any>;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ['name', 'Contact Person', 'Contact Number', 'Email'];
  searchColumns: any[] = [{name:'name',canShow:true}, {name:'contactPerson',canShow:true}, {name:'contactNo',canShow:true}, {name:'email',canShow:true}];
  definedColumns = ['name', 'contactPerson', 'contactNo', 'email'];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  buyers: any[] = [];
  filters: any[] = [];
  constructor(private BuyerService: BuyerService,private responseModalService: ResponseModalService) { }



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
    this.BuyerService.getBuyer(this.postPerPage, this.pageNumber, this.filters).subscribe((datas: any) => {
      this.buyers = datas?.data;
      this.datatrigger.emit(this.buyers);
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
    this.BuyerService.deleteBuyer(rowId).subscribe((data: any) => {
      this.loadData();
    });
  }

  onSearch=(filters:any[])=> {
    this.filters = filters
    this.loadData();
  }
}
