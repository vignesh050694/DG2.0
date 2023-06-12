import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef } from "@angular/material/dialog";
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { WarehouseAddComponent } from '../warehouse-add/warehouse-add.component';
@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {
  matDialogRef: MatDialogRef<any>;
  //Trigger reload to list
  warehouseReloadEvent: Subject<void> = new Subject<void>();
  //Page Header
  title: string = "Warehouse";                  //To set the title for page header
  buttonText: string = "Add Warehouse";             //To set the add button text for page header
  //Form
  editData: any = {};                  //Send edit data to add component
  constructor(private responseModalService: ResponseModalService) {
  }
  ngOnInit(): void {
  }
  add = () => {
    let data = { "title": "Add Warehouse" };
    this.openModal(WarehouseAddComponent, data);
  }
  emitEventToReload = () => {
    this.warehouseReloadEvent.next();
  };

  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.editData.title = "Edit Warehouse";
    this.openModal(WarehouseAddComponent, this.editData);
  };

  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalLG(component, data);
    this.matDialogRef.afterClosed().subscribe(res => {
      this.emitEventToReload();
    });
  }

  search = (text) => {
    console.log(text);
  };

}
