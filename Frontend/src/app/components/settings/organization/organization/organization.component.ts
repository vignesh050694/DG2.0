import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef } from "@angular/material/dialog";
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { OrganizationAddComponent } from '../organization-add/organization-add.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  matDialogRef: MatDialogRef<any>;
  //Trigger reload to list
  organizationReloadEvent: Subject<void> = new Subject<void>();
  //Page Header
  title: string = "Organization";                  //To set the title for page header
  buttonText: string = "Add Organization";             //To set the add button text for page header
  //Form
  editData: any = {};                  //Send edit data to add component

  constructor(
    private responseModalService: ResponseModalService,
    ) { }

  ngOnInit(): void {
  }
  add = () => {
    let data = { "title": "Add Organization" };
    this.openModal(OrganizationAddComponent, data);
  }
  emitEventToReload = () => {
    this.organizationReloadEvent.next();
  }
  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.editData.title = "Edit Organization";
    this.openModal(OrganizationAddComponent, this.editData);
  }
  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalMD(component, data);
    this.matDialogRef.afterClosed().subscribe(res => {
      this.emitEventToReload();
    });
  }
  search = (text) => {
    console.log(text);
  }
}
