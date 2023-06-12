import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef } from "@angular/material/dialog";
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { MobileUserAddComponent } from '../mobile-user-add/mobile-user-add.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-user',
  templateUrl: './mobile-user.component.html',
  styleUrls: ['./mobile-user.component.scss']
})
export class MobileUserComponent implements OnInit {

  matDialogRef: MatDialogRef<any>;
  //Trigger reload to list
  mobileUserReloadEvent: Subject<void> = new Subject<void>();
  //Page Header
  title: string = "Mobile User";                  //To set the title for page header
  buttonText: string = "Add Mobile User";             //To set the add button text for page header
  //Form
  editData: any = {};                  //Send edit data to add component
  constructor(private responseModalService: ResponseModalService, private router: Router) {
  }
  ngOnInit(): void {
  }
  add = () => {
    this.router.navigate(['settings/mobile-user/mobile-user-add']);
  }
  emitEventToReload = () => {
    this.mobileUserReloadEvent.next();
  }
  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.router.navigate(['settings/mobile-user/mobile-user-edit/' + rowId]);
  }
  search = (text) => {
    console.log(text);
  }
}
