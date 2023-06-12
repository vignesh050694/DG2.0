import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { ActionPopupComponent } from 'src/app/common/action-popup/action-popup.component';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';

@Component({
  selector: 'app-product-return-mobile-user-details',
  templateUrl: './product-return-mobile-user-details.component.html',
  styleUrls: ['./product-return-mobile-user-details.component.scss']
})
export class ProductReturnMobileUserDetailsComponent implements OnInit {

  matDialogRef: MatDialogRef<any>;
  filters: any[] = [];
  private eventsSubscription: Subscription;
  @Input() data: any[];
  @Input() private datatrigger: EventEmitter<any>;
  @Output() deleteRow = new EventEmitter();
  @Output() editRow = new EventEmitter();


  displayedColumns: string[] = ['category', 'product', 'unit', 'returnStock', 'actions'];
  definedColumns = ['category', 'product', 'unit', 'returnStock'];
  searchColumns: any[] = [];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  productDetails: any[] = [];
  rows = new MatTableDataSource([]);
  constructor(private responseModalService: ResponseModalService) { }

  ngOnInit(): void {
    this.rows.data = this.data;
    if (this.datatrigger) {
      this.datatrigger.subscribe(data => {
        this.reload(data);
      });
    }

  }

  reload = (data) => {
    this.rows.data = data;
  }

  edit = (row: any, index: any) => {
    row["index"] = index;
    this.editRow.emit(row);
  }

  delete = (template: TemplateRef<any>, row: any) => {
    let data = {
      title: "Delete",
      description: "Are You Sure?"
    }
    this.matDialogRef = this.responseModalService.openModalSM(ActionPopupComponent, data);
    this.matDialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.deleteRow.emit(row);
      }
    });
  }
}
