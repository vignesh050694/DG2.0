import { FarmService } from './../../../master/farm/farm.service';
import { SeasonService } from './../../../master/season/season.service';
import { StaticSowingService } from './../static-sowing.service';
import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {  Subject } from 'rxjs';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { MultiSelectComponent } from 'src/app/common/multi-select/multi-select.component';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { trimValidator } from 'src/app/common/trim.validator';
import { LocationService } from 'src/app/components/master/location/location.service';
import { GroupService } from 'src/app/components/settings/group/group.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/components/master/product/product.service';
import { CropService } from 'src/app/components/master/product/crop/crop.service';
import { VarietyService } from 'src/app/components/master/product/variety/variety.service';
import { CatalougeTypes } from 'src/app/common/common.enum';
import { CatalogueService } from 'src/app/components/master/catalogue/catalogue.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-static-sowing-add',
  templateUrl: './static-sowing-add.component.html',
  styleUrls: ['./static-sowing-add.component.scss']
})
export class StaticSowingAddComponent implements OnInit {

  @ViewChild('cropMultiSelect', { static: false }) cropMultiSelectComponent: MultiSelectComponent;
  @ViewChild('varietyMultiSelect', { static: false }) varietyMultiSelectComponent: MultiSelectComponent;
  @ViewChild('seasonMultiSelect', { static: false }) seasonMultiSelectComponent: MultiSelectComponent;
  @ViewChild("farmMultiSelect", { static: false }) farmMultiSelecttComponent: MultiSelectComponent;
  @Output() saveEvent = new EventEmitter();

  farms = [];
  // selectedfarm: any = [];
  seasons=[];
  sowingForm: FormGroup;
  moreDetailForm:FormGroup;
  selectedSeedSource:any;
  id: string;
  title: string;
  public isSubmit: boolean = false;
  public event: EventEmitter<any> = new EventEmitter();
  protected _onDestroy = new Subject<void>();

  sowingData: any;
  selectedcrop: any;
  selectedvariety: any;
  selectedfarm: any;
  selectedSeason: any;
  selectedCropCategory: any;
  varieties = [];
  crops = [];
  sowingTypes=[];
  seedSources=[];
  cropCategories=[];
  selectedSowingType:any;


  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private responseModalService: ResponseModalService,
    private appconfiguration: AppConfiguration,
    private staticSowingService: StaticSowingService,
    private cropService: CropService,
    private seasonService:SeasonService,
    private farmService:FarmService,
    private varietyService:VarietyService,
    private catalogueService:CatalogueService,
    private datePipe:DatePipe
  ) { }

  setForm=()=>{
      this.sowingForm = this.formBuilder.group({
        farm:[""],
        season:[""],
        cropCategory:[""],
        crop:[""],
        variety:[""],
        sowingDateStr:[new Date()],
        cultivationArea:[""],
        sowingType:[""],
        seedSource:[""],
        seedQuantityUsed:[""],
        estimatedYield:[""]
     })
  }

  getCatalogueValues=()=>{
    this.catalogueService.getCataloguesByType(CatalougeTypes.sowingType).toPromise().then((data:any)=>{
      this.sowingTypes = data;
     });
     this.catalogueService.getCataloguesByType(CatalougeTypes.seedSource).toPromise().then((data:any)=>{
      this.seedSources = data;
     });
     this.catalogueService.getCataloguesByType(CatalougeTypes.cropCategory).toPromise().then((data:any)=>{
      this.cropCategories = data;
     });
  }

  setCatalogueValues=(data:any)=>{
    let catalougeIds = [
      data?.seedSource,data?.sowingType
    ];
    this.catalogueService.getCatalougesByIds(catalougeIds).toPromise().then((catalogues:any[])=>{
       this.selectedSeedSource = catalogues.find((catalogue:any)=>catalogue?.id === data?.seedSource);
       this.selectedSowingType = catalogues.find((catalogue:any)=>catalogue?.id === data?.sowingType);
       this.selectedCropCategory = catalogues.find((catalogue:any)=>catalogue?.id === data?.cropCategory);
    })
  }

  ngOnInit() {
    this.getSeasons();
    this.getFarms();
    this.getCrops();
    this.getCatalogueValues();
    this.setForm();
    this.title = this.data?.title;
    this.getValueById();
  }

  getValueById=()=>{
    if (this.data.id) {
      this.staticSowingService.getSowingById(this.data?.id).subscribe((data: any) => {
        this.id = data?.id;
          this.selectedfarm = data?.farm;
          this.getSeasonById(data?.season);
          this.getVarietyById(data?.variety);
          this.setCatalogueValues(data);
          this.sowingForm.patchValue({
            sowingDateStr:new Date(data?.sowingDateStr),
            cultivationArea:data?.cultivationArea,
            sowingType:data?.sowingType,
            seedSource:data?.seedSource,
            seedQuantityUsed:data?.seedQuantityUsed,
            estimatedYield:data?.estimatedYield
        });
      })
    }
  }

  getSeasonById=(id:any)=>{
    if(id){
      this.seasonService.getSeasonById(id).toPromise().then((season:any)=>{
        this.selectedSeason = season;
     })
    }
  }

  getVarietyById=(id:any)=>{
    if(id){
      this.varietyService.getVarietyById(id).toPromise().then((variety:any)=>{
        this.selectedcrop = variety?.crop
        this.selectedvariety = variety
      })
    }
  }

  getFarms = () => {
    this.farmService.getAllFarm().toPromise().then((data:any)=>{
       this.farms = data;
    });
  };


  getCrops = () => {
    this.cropService.getAllCrops().then((data: any[]) => {
      this.crops = data;
    });
  };


  getSeasons = () => {
    this.seasonService.getAllSeasons().subscribe((data: any[]) => {
      this.seasons = data;
    });
  }


  changeVariety = (event: any) =>{
    if(event?.id){
      this.staticSowingService.getVareityByCrop(event?.id).then((data: any[]) => {
         this.varieties = data;
      })
    }
  }


  validate=()=>{
     this.farmMultiSelecttComponent.formInvalid();
     this.cropMultiSelectComponent.formInvalid();
     this.varietyMultiSelectComponent.formInvalid();
  }

  submitForm = () => {
    this.isSubmit = true;
    this.validate();
    this.sowingForm.markAllAsTouched();
    this.saveEvent.emit(true);
    this.sowingForm.patchValue({
      farm:this.selectedfarm,
      season:this.selectedSeason?.id,
      crop:this.selectedcrop?.id,
      variety:this.selectedvariety?.id,
      sowingType:this.selectedSowingType?.id,
      seedSource:this.selectedSeedSource?.id,
      cropCategory:this.selectedCropCategory?.id,
    })
    let sowingData = this.sowingForm?.value;
    sowingData['sowingDateStr']=this.datePipe.transform(this.sowingForm.value.sowingDateStr,'MM/dd/yyyy');
    if(this.id){
      sowingData['id'] = this.id;
    }
    this.sendForm(sowingData);
  };

  sendForm =(data) =>{
    if(!this.sowingForm.invalid){
      this.staticSowingService.addSowing(data).subscribe((data: any) =>{
        this.cancel();
        this.responseModalService.OpenStatusModal(this.appconfiguration.successIconUrl,
          'Sowing Added', 'Your information has been saved successfullay!');
      });
    }
  };



  cancel = () => {
    this.dialogRef.close(true);
  };



  get basic() {
    return this.sowingForm.controls;
  }
}
