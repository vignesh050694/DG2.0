import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { StaticFarmAddComponent } from './static-farm-add/static-farm-add.component';

@Component({
  selector: 'app-static-farm',
  templateUrl: './static-farm.component.html',
  styleUrls: ['./static-farm.component.scss']
})
export class StaticFarmComponent implements OnInit {

  matDialogRef: MatDialogRef<any>;
  title: string = "Farm";                  //To set the title for page header
  buttonText: string = "Add Farm";
  farmReloadEvent: Subject<void> = new Subject<void>();
  editData: any = {};

   constructor(private responseModalService: ResponseModalService,private router:Router) {
     }

  ngOnInit():void {
  }

  add = () => {
    this.router.navigate(['farmer/static-farm/add'],{queryParams:{id:null}});
  }

  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalSM(component, data);
    this.matDialogRef.afterClosed().subscribe(res => {
      this.emitEventToReload();
    });
  }

  emitEventToReload = () => {
    this.farmReloadEvent.next();
  }

  edit = (rowId: any) => {
    this.router.navigate(['farmer/static-farm/edit'],{queryParams:{id:rowId}});
  }
}



