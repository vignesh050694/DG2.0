import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from '@ngx-translate/core';
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { BuyerAddComponent } from '../buyer-add/buyer-add.component';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.scss']
})
export class BuyerComponent implements OnInit {
  matDialogRef: MatDialogRef<any>;
  //Trigger reload to list
  buyerReloadEvent: Subject<void> = new Subject<void>();
  //Page Header
  title: string = "Buyer";                  //To set the title for page header
  buttonText: string = "Add Buyer";             //To set the add button text for page header
  //Form
  editData: any = {};                  //Send edit data to add component
  constructor(private responseModalService: ResponseModalService, private readonly translate: TranslateService) {
    this.translate.use(this.translate.store.currentLang);
  }
  ngOnInit(): void {
  }
  add = () => {
    let data = { "title": "Add Buyer" };
    this.openModal(BuyerAddComponent, data);
  }
  emitEventToReload = () => {
    this.buyerReloadEvent.next();
  }
  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.editData.title = "Edit Buyer";
    this.openModal(BuyerAddComponent, this.editData);
  }
  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalSM(component, data);
    this.matDialogRef.afterClosed().subscribe(res => {
      this.emitEventToReload();
    });
  }
  search = (text) => {
    this.buyerReloadEvent.next(text);
  }
}
