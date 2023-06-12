import { Component, OnInit } from '@angular/core';
import { UserAddComponent } from '../user-add/user-add.component';
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  matDialogRef: MatDialogRef<any>;
  //Trigger reload to list
  userReloadEvent: Subject<void> = new Subject<void>();
  //Page Header
  title: string = "User";                  //To set the title for page header
  buttonText: string = "Add User";             //To set the add button text for page header
  //Form
  editData: any = {};                  //Send edit data to add component
  constructor(private responseModalService: ResponseModalService, private readonly translate: TranslateService,
    private router: Router) {
    this.translate.use(this.translate.store.currentLang);
  }
  ngOnInit(): void {
  }
  add = () => {
    this.router.navigate(['/settings/user/user-add']);
  }
  emitEventToReload = () => {
    this.userReloadEvent.next();
  }
  edit = (rowId: any) => {
    this.router.navigate(['/settings/user/user-edit', rowId]);
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

