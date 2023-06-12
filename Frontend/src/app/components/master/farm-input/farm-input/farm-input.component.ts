import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef } from "@angular/material/dialog";
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { AppConfiguration } from '../../../../common/App.configuration';
import { FarmInputHeadingEnum } from '../../../../common/common.enum';
import { CategoryAddComponent } from '../category/category-add/category-add.component';
import { SubCategoryAddComponent } from '../sub-category/sub-category-add/sub-category-add.component'
import { FarmInputService } from '../farm-input.service'

@Component({
  selector: 'app-farm-input',
  templateUrl: './farm-input.component.html',
  styleUrls: ['./farm-input.component.scss']
})
export class FarmInputComponent implements OnInit {
  //Trigger reload to list
  categoryReloadEvent: Subject<void> = new Subject<void>();
  subCategoryReloadEvent: Subject<void> = new Subject<void>();
  farmInputCount: any = {};

  //Form
  editData: any = {};                  //Send edit data to add component

  //Page Header
  title: string;                  //To set the title for page header
  buttonText: string;             //To set the add button text for page header

  //Tab
  headings: any[] = [];           //To get the header from enum for Tab
  selectedTab: any;               //To get the selected tab by index
  matDialogRef: MatDialogRef<any>;

  constructor(private responseModalService: ResponseModalService,
    private appConfiguration: AppConfiguration,
    private farmInputService: FarmInputService) {
      this.headings = Object["values"](FarmInputHeadingEnum);
     }

  ngOnInit(): void {
    this.getFarmInputCount();
    this.selectedTab = this.headings[0];
    this.headerTextChange();
  }
  tabChanged = (index: any): void => {
    this.selectedTab = this.headings[index];
    this.headerTextChange();
  }
  add = () => {
    let data = { "title": "Add " + this.selectedTab };
    if (this.selectedTab == this.headings[0]) {
      this.openModal(CategoryAddComponent, data);
    }
    if (this.selectedTab == this.headings[1]) {
      this.openModal(SubCategoryAddComponent, data);
    }
  }
  cancel = (isPanelOpen) => {
  }
  save = (event) => {
    this.getFarmInputCount();
    this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
      'Roles Added', 'Your information has been saved successfully!');
  }
  onsaveComplete = (event) => {
    this.emitEventToReload();
  }
  search = (text) => {
    this.categoryReloadEvent.next(text);
  }
  headerTextChange = () => {
    this.title = this.selectedTab;
    this.buttonText = "Add " + this.selectedTab;
  }
  emitEventToReload = () =>  {
    if (this.selectedTab == this.headings[0]) {
      this.categoryReloadEvent.next(null);
    }
    else if (this.selectedTab == this.headings[1]) {
      this.subCategoryReloadEvent.next();
    }
  }
  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.editData.title = "Edit " + this.selectedTab;
    if (this.selectedTab == this.headings[0]) {
      this.openModal(CategoryAddComponent, this.editData);
    }
    if (this.selectedTab == this.headings[1]) {
      this.openModal(SubCategoryAddComponent, this.editData);
    }
  }

  delete=(event:any)=>{
    this.getFarmInputCount();
  }
  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalSM(component, data);
    this.matDialogRef.afterClosed().subscribe(res => {
      this.emitEventToReload();
      this.getFarmInputCount();
    });
  }
  getFarmInputCount = () => {
    this.farmInputService.getFarmInputCount().subscribe((data: any) => {
      this.farmInputCount = {
        'Category': data.category,
        'Sub-Category': data.subCategory
      }
    });
  };
}
