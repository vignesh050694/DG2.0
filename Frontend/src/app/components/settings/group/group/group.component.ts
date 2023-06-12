import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef } from "@angular/material/dialog";
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { GroupAddComponent } from '../group-add/group-add.component';
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  matDialogRef: MatDialogRef<any>;
  //Trigger reload to list
  groupReloadEvent: Subject<void> = new Subject<void>();
  //Page Header
  title: string = "Group";                  //To set the title for page header
  buttonText: string = "Add Group";             //To set the add button text for page header
  //Form
  editData: any = {};                  //Send edit data to add component

  constructor(private responseModalService: ResponseModalService) { }
  ngOnInit(): void {

  }
  add = () => {
    let data = { "title": "Add Group" };
    this.openModal(GroupAddComponent, data);
  }
  emitEventToReload=()=> {
    this.groupReloadEvent.next();
  }
  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.editData.title = "Edit Group";
    this.openModal(GroupAddComponent, this.editData);
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
