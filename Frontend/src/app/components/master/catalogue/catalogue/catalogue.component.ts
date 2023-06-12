import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef } from "@angular/material/dialog";
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { CatalogueAddComponent } from '../catalogue-add/catalogue-add.component';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  matDialogRef: MatDialogRef<any>;
  //Trigger reload to list
  vendorReloadEvent: Subject<void> = new Subject<void>();
  //Page Header
  title: string = "catalogue";                  //To set the title for page header
  buttonText: string = "Add Catalogue";             //To set the add button text for page header
  //Form
  editData: any = {};                  //Send edit data to add component
  constructor(private responseModalService: ResponseModalService) {
  }

  ngOnInit(): void {
  }

  add = () => {
    let data = { "title": "Add Catalogue" };
    this.openModal(CatalogueAddComponent, data);
  }

  emitEventToReload = () => {
    this.vendorReloadEvent.next();
  }

  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.editData.title = "Edit Catalogue";
    this.openModal(CatalogueAddComponent, this.editData);
  }

  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalSM(component, data);
    this.matDialogRef.afterClosed().subscribe(res => {
      this.emitEventToReload();
    });
  }

  search = (text) => {
    console.log(text);
  }
}
