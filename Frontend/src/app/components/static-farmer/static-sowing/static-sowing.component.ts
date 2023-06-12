import { StaticSowingAddComponent } from './static-sowing-add/static-sowing-add.component';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-static-sowing',
  templateUrl: './static-sowing.component.html',
  styleUrls: ['./static-sowing.component.scss']
})
export class StaticSowingComponent implements OnInit {

  matDialogRef: MatDialogRef<any>;
  //Trigger reload to list
  sowingReloadEvent: Subject<void> = new Subject<void>();
  //Page Header
  title: string = "Sowing";                  //To set the title for page header
  buttonText: string = "Add Sowing";             //To set the add button text for page header
  //Form
  editData: any = {};

  constructor(
    private responseModalService: ResponseModalService
  ) { }

  ngOnInit(): void{
  }

  add = () => {
    let data = { "title": "Add Sowing" };
    this.openModal(StaticSowingAddComponent, data);
  }

  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalMD(component, data);
    this.matDialogRef.afterClosed().subscribe(res => {
      this.emitEventToReload();
    });
  }

  emitEventToReload = () => {
    this.sowingReloadEvent.next();
  }

  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.editData.title = "Edit Sowing";
    this.openModal(StaticSowingAddComponent, this.editData);
  }

  search = (event) => {

  }
}
