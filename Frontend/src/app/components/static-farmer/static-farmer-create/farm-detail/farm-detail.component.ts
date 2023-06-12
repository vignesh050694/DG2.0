import { AppConfiguration } from './../../../../common/App.configuration';
import { StaticFarmService } from './../../static-farm/static-farm.service';
import { EventEmitter, Inject, Output } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { CatalogueService } from 'src/app/components/master/catalogue/catalogue.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FarmScreenComponent } from '../farm-screen/farm-screen.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-farm-detail',
  templateUrl: './farm-detail.component.html',
  styleUrls: ['./farm-detail.component.scss']
})
export class FarmDetailComponent implements OnInit {
  farm: any;
  constructor( public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, private responseModalService: ResponseModalService,
    private staticFarmService:StaticFarmService,private catalogueService:CatalogueService, private router:Router,
    private appConfiguration: AppConfiguration) { }

    getCatalogueValues=(data)=>{
      let catalougeArr = ['approachRoad','landOwnership','fertilityStatus','farmCertificate','irrigation','irrigationType','conversionStatus','certificationTypes','landGradient','topography'];
      catalougeArr.forEach((catalogue:any)=>{
        if(data[catalogue]){
          this.catalogueService.getCataloguesById(data[catalogue]).toPromise().then((value:any)=>{
            this.farm[catalogue] = value;
          });
        }
       });
    }

  ngOnInit() :void {
      if(this.data){
        this.staticFarmService.getFarmById(this.data).toPromise().then((data:any)=>{
           this.farm = data;
           this.getCatalogueValues(data);
           if(data?.farmPhoto){
            this.farm['farmPhotoUrl'] = environment.baseUrl+this.appConfiguration.getImageUrl+data?.farmPhoto;
           }
        });
      }
  }

  deleteConfirm = () => {
    this.dialogRef.close({key:"delete",value:this.data});
  }

  close() {
    this.dialogRef.close(false);
  }

  edit = () => {
    this.dialogRef.close({key:"edit",value:this.data});
  }
 }

