import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ActionPopupComponent } from 'src/app/common/action-popup/action-popup.component';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';

@Component({
  selector: 'app-distribution-stock-reception-details',
  templateUrl: './distribution-stock-reception-details.component.html',
  styleUrls: ['./distribution-stock-reception-details.component.scss']
})
export class DistributionStockReceptionDetailsComponent implements OnInit {

  matDialogRef: MatDialogRef<any>;
  filters: any[] = [];
  productReceptionDetails: any[] = [];
  private eventsSubscription: Subscription;
  @Input() data: any[];
  @Output() deleteRow = new EventEmitter();
  @Output() editRow = new EventEmitter();
  @Output() saveRow = new EventEmitter();

  displayedColumns: string[] = ['category', 'product','transferedStock','goodQuantity','damagedQuantity'];
  definedColumns = ['category', 'product','transferedStock'];
  searchColumns: any[] = [];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  productDetails: any[] = [];
  rows = new MatTableDataSource([]);

  constructor(private responseModalService: ResponseModalService) { }

  ngOnInit(): void {
    this.reload(this.data);
  }

  reload = (data) => {
    this.rows.data = data;
    this.data.forEach((rowData) => {
      let productReceptionDetails = {
        "category": rowData?.category,
        "product": rowData?.product,
        "goodQuantity": rowData?.goodQuantity,
        "damagedQuantity":rowData?.damagedQuantity,
        "id":rowData?.id
      }
      this.productReceptionDetails.push(productReceptionDetails);
    });
  }

  save = () => {
    this.saveRow.emit(this.productReceptionDetails);
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
