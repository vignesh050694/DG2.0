import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from '@ngx-translate/core';
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
  matDialogRef: MatDialogRef<any>;
  //Trigger reload to list
  deviceReloadEvent: Subject<void> = new Subject<void>();
  //Page Header
  title: string = "Device";                  //To set the title for page header
  buttonText: string = "Add Device";             //To set the add button text for page header
  //Form
  editData: any = {};                  //Send edit data to add component
  constructor(private responseModalService: ResponseModalService, private readonly translate: TranslateService) {
    this.translate.use(this.translate.store.currentLang);
  }

  ngOnInit(): void {
  }
  emitEventToReload = () => {
    this.deviceReloadEvent.next();
  }
  add = () => {

  }
  edit = (rowId) => {

  }
  search = (text) => {
    console.log(text);
  }
}
