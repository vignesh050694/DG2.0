import { ResponseModalService } from './../../../common/response-modal/response-modal.service';
import { CashDistributionAddComponent } from './cash-distribution-add/cash-distribution-add.component';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-cash-distribution',
  templateUrl: './cash-distribution.component.html',
  styleUrls: ['./cash-distribution.component.scss']
})
export class CashDistributionComponent implements OnInit {

 matDialogRef: MatDialogRef<any>;
  title: string = "Cash Distribution";                  //To set the title for page header
  buttonText: string = "Add Cash Distribution";
  cashDistributionReloadEvent: Subject<void> = new Subject<void>();
  editData: any = {};

   constructor(private responseModalService: ResponseModalService) {
     }

  ngOnInit():void {
  }

  add = () => {
    let data = { "title": "Add Cash Distribution" };
    this.openModal(CashDistributionAddComponent, data);
  }

  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalSM(component, data);
    this.matDialogRef.afterClosed().subscribe(res => {
      this.emitEventToReload();
    });
  }

  emitEventToReload = () => {
    this.cashDistributionReloadEvent.next();
  }

  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.editData.title = "Edit Cash Distribution";
    this.openModal(CashDistributionAddComponent, this.editData);
  }

}
