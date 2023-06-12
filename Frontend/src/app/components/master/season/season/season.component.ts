import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from '@ngx-translate/core';
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { CountryAddComponent } from '../../location/country/country-add/country-add.component';
import { SeasonAddComponent } from '../season-add/season-add.component';


@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.scss']
})
export class SeasonComponent implements OnInit {
  matDialogRef: MatDialogRef<any>;
  //Trigger reload to list
  seasonReloadEvent: Subject<void> = new Subject<void>();
  //Page Header
  title: string = "Season";                  //To set the title for page header
  buttonText: string = "Add Season";             //To set the add button text for page header
  //Form
  editData: any = {};                  //Send edit data to add component

  constructor(private responseModalService: ResponseModalService, private readonly translate: TranslateService) {
    this.translate.use(this.translate.store.currentLang);
  }

  ngOnInit(): void {
  }
  add = () => {
    let data = { "title": "Add Season" };
    this.openModal(SeasonAddComponent, data);
  }
  emitEventToReload = () => {
    this.seasonReloadEvent.next();
  }
  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.editData.title = "Edit Season";
    this.openModal(SeasonAddComponent, this.editData);
  }
  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalSM(component, data);
    this.matDialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.emitEventToReload();
      }
    });
  }
  search = (text) => {
  }
}
