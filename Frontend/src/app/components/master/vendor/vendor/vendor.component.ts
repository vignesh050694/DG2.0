import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from '@ngx-translate/core';
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { VendorAddComponent } from '../vendor-add/vendor-add.component';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
  matDialogRef: MatDialogRef<any>;
  vendorReloadEvent: Subject<void> = new Subject<void>();
  title: string = "Vendor";
  buttonText: string = "Add Vendor";

  editData: any = {};

  constructor(private responseModalService: ResponseModalService, private readonly translate: TranslateService) {
    this.translate.use(this.translate.store.currentLang);
  }

  ngOnInit(): void {
  }
  add = () => {
    let data = { "title": "Add Vendor" };
    this.openModal(VendorAddComponent, data);
  }

  emitEventToReload = () => {
    this.vendorReloadEvent.next();
  }
  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.editData.title = "Edit Vendor";
    this.openModal(VendorAddComponent, this.editData);
  }
  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalSM(component, data);
    this.matDialogRef.afterClosed().subscribe(res => {
      this.emitEventToReload();
    });
  }
  search = (text) => {
    console.log(text);
  };

}
