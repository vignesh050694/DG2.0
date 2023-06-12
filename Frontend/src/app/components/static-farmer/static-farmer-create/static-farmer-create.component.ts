import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { BuyerAddComponent } from '../../master/buyer/buyer-add/buyer-add.component';
import { StaticFarmerAddComponent } from './static-farmer-add/static-farmer-add.component';

@Component({
  selector: 'app-static-farmer-create',
  templateUrl: './static-farmer-create.component.html',
  styleUrls: ['./static-farmer-create.component.scss']
})
export class StaticFarmerCreateComponent implements OnInit {

  matDialogRef: MatDialogRef<any>;
  //Trigger reload to list
  farmerReloadEvent: Subject<void> = new Subject<void>();
  //Page Header
  title: string = "Farmer";                  //To set the title for page header
  buttonText: string = "Add Farmer";             //To set the add button text for page header
  //Form
  editData: any = {};                  //Send edit data to add component
  constructor(private responseModalService: ResponseModalService, private readonly translate: TranslateService,private router:Router) {
    this.translate.use(this.translate.store.currentLang);
  }
  ngOnInit(): void {
  }
  add = () => {
    let data = { "title": "Add Farmer" };
    this.router.navigate(['farmer/static-farmer-create/add']);
    // this.openModal(StaticFarmerAddComponent, data);
  }
  emitEventToReload = () => {
    this.farmerReloadEvent.next();
  }
  edit = (rowId: any) => {
    // alert(rowId);
    // this.editData.id = rowId;
    // this.editData.title = "Edit Farmer";
    this.router.navigate(['farmer/static-farmer-create/edit'],{ queryParams: { id: rowId }});
    // this.openModal(StaticFarmerAddComponent, this.editData);
  }
  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalMD(component, data);
    this.matDialogRef.afterClosed().subscribe(res => {
      this.emitEventToReload();
    });
  }
  search = (text) => {
    this.farmerReloadEvent.next(text);
  }
}
