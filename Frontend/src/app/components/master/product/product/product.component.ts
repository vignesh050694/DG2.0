import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef } from "@angular/material/dialog";
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { AppConfiguration } from '../../../../common/App.configuration';
import { CropTabHeadingsEnum } from '../../../../common/common.enum';
import { VarietyAddComponent } from '../variety/variety-add/variety-add.component';
import { GradeAddComponent } from '../grade/grade-add/grade-add.component';
import { CropAddComponent } from '../crop/crop-add/crop-add.component';
import { CropService } from '../crop/crop.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  //Trigger reload to list
  cropReloadEvent: Subject<void> = new Subject<void>();
  vareityReloadEvent: Subject<void> = new Subject<void>();
  gradeReloadEvent: Subject<void> = new Subject<void>();

  //Form
  editData: any = {};                  //Send edit data to add component

  //Page Header
  title: string;                  //To set the title for page header
  buttonText: string;             //To set the add button text for page header

  //Tab
  headings: any[] = [];           //To get the header from enum for Tab
  selectedTab: any = "Crop";               //To get the selected tab by index
  matDialogRef: MatDialogRef<any>;

  cropCount = {};

  constructor(private responseModalService: ResponseModalService, private appConfiguration: AppConfiguration, private cropService: CropService) { }

  ngOnInit(): void {
    this.headings = Object["values"](CropTabHeadingsEnum);
    this.selectedTab = this.headings[0];
    this.headerTextChange();
    this.getProductCount();
  }
  tabChanged = (index: any): void => {
    this.selectedTab = this.headings[index];
    this.headerTextChange();
  };

  add = () => {
    let data = { "title": "Add " + this.selectedTab };
    if (this.selectedTab == this.headings[0]) {
      this.openModal(CropAddComponent, data);
    }
    if (this.selectedTab == this.headings[1]) {
      this.openModal(VarietyAddComponent, data);
    }
    if (this.selectedTab == this.headings[2]) {
      this.openModal(GradeAddComponent, data);
    }
  };

  cancel = (isPanelOpen) => {
  }

  save = (event) => {
    this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
      'Roles Added', 'Your information has been saved successfully!');
  };

  onsaveComplete = (event) => {
    this.emitEventToReload();
  }

  search = (text) => {
    this.cropReloadEvent.next(text);
  }

  headerTextChange = () => {
    this.title = this.selectedTab;
    this.buttonText = "Add " + this.selectedTab;
  };

  emitEventToReload = () => {
    if (this.selectedTab == this.headings[0]) {
      this.cropReloadEvent.next(null);
    }
    else if (this.selectedTab == this.headings[1]) {
      this.vareityReloadEvent.next();
    }
    else if (this.selectedTab == this.headings[2]) {
      this.gradeReloadEvent.next();
    }
  };

  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.editData.title = "Edit " + this.selectedTab;
    if (this.selectedTab == this.headings[0]) {
      this.openModal(CropAddComponent, this.editData);
    }
    if (this.selectedTab == this.headings[1]) {
      this.openModal(VarietyAddComponent, this.editData);
    }
    if (this.selectedTab == this.headings[2]) {
      this.openModal(GradeAddComponent, this.editData);
    }
    this.getProductCount();
  };

  delete = (event:any)=>{
   this.getProductCount();
  }

  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalSM(component, data);
    this.matDialogRef.afterClosed().subscribe(res => {
      this.emitEventToReload();
      this.getProductCount();
    });
  };

  getProductCount = () => {
    this.cropService.getCropCount().subscribe((data: any) => {
      this.cropCount = {
        'Crop': data.crop,
        'Variety': data.variety,
        'Grade': data.grade
      }
    });
  };


}
