import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { TrainingAddComponent } from '../training-add/training-add.component';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  matDialogRef: MatDialogRef<any>;
  title: string = "Training";                  //To set the title for page header
  buttonText: string = "Add Training";
  vendorReloadEvent: Subject<void> = new Subject<void>();
  editData: any = {};

  constructor(private responseModalService: ResponseModalService) { }

  ngOnInit(): void {
  }

  add = () => {
    let data = { "title": "Add Training" };
    this.openModal(TrainingAddComponent, data);
  }

  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalSM(component, data);
    this.matDialogRef.afterClosed().subscribe(res => {
      this.emitEventToReload();
    });
  }

  emitEventToReload = () => {
    this.vendorReloadEvent.next();
  }

  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.editData.title = "Edit Training";
    this.openModal(TrainingAddComponent, this.editData);
  }

}
