import { ProductService } from './../../../master/product/product.service';
import { StaticSowingService } from './../../static-sowing/static-sowing.service';
import {  EventEmitter, Inject, Output } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { CatalogueService } from 'src/app/components/master/catalogue/catalogue.service';
import { SowingScreenComponent } from '../sowing-screen/sowing-screen.component';
import { SeasonService } from 'src/app/components/master/season/season.service';

@Component({
  selector: 'app-sowing-detail',
  templateUrl: './sowing-detail.component.html',
  styleUrls: ['./sowing-detail.component.scss']
})
export class SowingDetailComponent implements OnInit {
  varities :any=[];
  sowing: any;
  season:any;

  constructor( public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,private responseModalService: ResponseModalService,
    private staticSowingService:StaticSowingService,private catalogueService:CatalogueService,
    private seasonService:SeasonService,private productService:ProductService) { }


    getCatalogueValues=(data)=>{
      let catalougeArr = ['sowingType','seedSource'];
      catalougeArr.forEach((catalogue:any)=>{
        if(data[catalogue]){
          this.catalogueService.getCataloguesById(data[catalogue]).toPromise().then((value:any)=>{
            this.sowing[catalogue] = value;
            console.log();
          })
        }
       });
    }

    ngOnInit() :void {
      if(this.data){
        this.staticSowingService.getSowingById(this.data).toPromise().then((data:any)=>{
           this.sowing = data;
           this.getCatalogueValues(data);
        });
      }
  }

   getVariety =(event: any) => {
    this.productService.getVareityByCrop(event).then((data: any[]) => {
      this.varities=data
    })
  }

  getSeasonById = (id:any) => {
    this.seasonService.getSeasonById(id).toPromise().then((data:any) => {
      this.season = data;
    })
  }
  
  deleteConfirm = () => {
    this.dialogRef.close({key:"delete",value:this.data});

  }

  edit = () => {
    this.dialogRef.close({key:"edit",value:this.data});

  }

  close() {
    this.dialogRef.close();
  }





}
