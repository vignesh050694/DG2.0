import { StaticFarmerService } from './../../static-farmer.service';
import { MultiSelectComponent } from 'src/app/common/multi-select/multi-select.component';
import { StaticFarmService } from './../static-farm.service';
import { ResponseModalService } from './../../../../common/response-modal/response-modal.service';
import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { CatalogueService } from 'src/app/components/master/catalogue/catalogue.service';
import { CatalougeTypes } from 'src/app/common/common.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ImagePreviewComponent } from '../../static-farmer-create/image-preview/image-preview.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ImgService } from 'src/app/common/img.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-static-farm-add',
  templateUrl: './static-farm-add.component.html',
  styleUrls: ['./static-farm-add.component.scss']
})
export class StaticFarmAddComponent implements OnInit {
  @ViewChild("farmerMultiSelect",{static:false}) farmerMultiSelectComponent:MultiSelectComponent
  private event: EventEmitter<any> = new EventEmitter();

  @Input() events: Observable<void>;
  @Output() saveEvent = new EventEmitter();
  matDialogRef: MatDialogRef<any>;

  isSubmit: boolean;
  farmForm: FormGroup;
  id: string ;
  title: string;
  farmer:any;
  farmImgUrl:any;
  farmImgId:any;


  landOwnerships=[];
  approachRoads=[];
  landTopographies=[];
  landGradients=[];
  fertilityStatus=[];
  irrigationSources = [];
  irrigationTypes =[];
  certificationTypes=[];
  conversionStatus =[];
  farmers: [];

  selectedLandOwnerShip:any;
  selectedApproach:any;
  selectedGroup:any;
  selectedGradient:any;
  selectedTopography:any;
  selectedfertility:any;
  selectedIrrigation:any;
  selectedIrrigationType:any;
  selectedFarmCertificate:any;
  selectedConversionStatus:any;
  selectedFarmer: any;
  selectedFarmPhoto: File;

  public farmPhotoUpload: FileUploader = this.farmerService.getFileUploader();

  popupKey:any = {
    "farmImg":1
  }

  imagePreview=(index:number)=>{
     if( index == this.popupKey.farmImg) this.openModal(ImagePreviewComponent,this.farmImgUrl);
  }

  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalSM(component, data);
  }

  getSelectedImage=(file:FileUploader,event:any,type:number)=>{
    let result = this.imgService.getSelectedImage(file,event);
    switch(type){
      case this.popupKey.farmImg :
         this.farmPhotoUpload = result?.uploader;
         this.selectedFarmPhoto = result?.image;
         this.farmImgUrl = result?.url;  break;
    }
  }

  public onFarmPhoto=(event:any)=> {this.getSelectedImage(this.farmPhotoUpload,event,this.popupKey.farmImg)};


  constructor(public formBuilder: FormBuilder,
    private staticFarmService: StaticFarmService,
    private responseModalService: ResponseModalService,
    private appconfiguration: AppConfiguration,
    private farmerService:StaticFarmerService,
    private catalogueService:CatalogueService,
    private route:ActivatedRoute,
    private router:Router,
    private datePipe:DatePipe,
    private imgService:ImgService) {
    }

    getAllFarmers = () => {
      this.farmerService.getAllFarmers().toPromise().then((data:any) => {
        this.farmers = data;
      })
    }
    setFarmForm=()=>{
      this.farmForm = this.formBuilder.group({
        name:[""],
        farmPhoto:[""],
        surveyNo:[""],
        ppArea:[""],
        landOwnership:[""],
        isSameFarmer:[true],
        farmAddress:[""],
        approachRoad:[""],
        registrationNumber:[""],
        topography:[""],
        landGradient:[""],
        totalLandHolding:[""],
        fertilityStatus:[""],
        irrigation:[""],
        irrigationType:[""],
        latitude:[""],
        longitude:[""],
        fullTimeWorkers:[""],
        partTimeWorkers:[""],
        seasonalWorkers:[""],
        conventionalLand:[""],
        pastureLand:[""],
        conventionalCrops:[""],
        estimatedYield:[""],
        lastDayStr:[new Date()],
        farmCertificate:[""],
        conversionStatus:[""],
        conversionDateStr:[new Date()],
        isQualified:[false],
        nameOfInspector:[""]
      });
    }

    catalougeValues=()=>{
      this.catalogueService.getCataloguesByType(CatalougeTypes.landOwnership).toPromise().then((data:any)=>{
          this.landOwnerships = data;
      });
      this.catalogueService.getCataloguesByType(CatalougeTypes.landTopography).toPromise().then((data:any)=>{
          this.landTopographies = data;
      })
       this.catalogueService.getCataloguesByType(CatalougeTypes.approachRoad).toPromise().then((data:any)=>{
         this.approachRoads = data;
       });
       this.catalogueService.getCataloguesByType(CatalougeTypes.landGradient).toPromise().then((data:any)=>{
        this.landGradients = data;
       });
       this.catalogueService.getCataloguesByType(CatalougeTypes.fertilityStatus).toPromise().then((data:any)=>{
        this.fertilityStatus = data;
       });
       this.catalogueService.getCataloguesByType(CatalougeTypes.irrigationSource).toPromise().then((data:any)=>{
        this.irrigationSources = data;
       });
       this.catalogueService.getCataloguesByType(CatalougeTypes.irrigationTypes).toPromise().then((data:any)=>{
        this.irrigationTypes = data;
       });
       this.catalogueService.getCataloguesByType(CatalougeTypes.certificationType).toPromise().then((data:any)=>{
        this.certificationTypes = data;
       });
       this.catalogueService.getCataloguesByType(CatalougeTypes.currentConversionStatus).toPromise().then((data:any)=>{
        this.conversionStatus = data;
       });

    }

    setCatalogueValues=(data:any)=>{
      let catalougeIds = [
        data?.approachRoad,data?.landGradient,data?.conversionStatus, data?.farmCertificate,
        data?.fertilityStatus,data?.irrigation,data?.irrigationType,data?.landOwnership,data?.topography
      ];
      this.catalogueService.getCatalougesByIds(catalougeIds).toPromise().then((catalogues:any[])=>{
         this.selectedApproach = catalogues.find((catalogue:any)=>catalogue?.id === data?.approachRoad);
         this.selectedGradient = catalogues.find((catalogue:any)=>catalogue?.id === data?.landGradient);
         this.selectedConversionStatus = catalogues.find((catalogue:any)=>catalogue?.id === data?.conversionStatus);
         this.selectedFarmCertificate = catalogues.find((catalogue:any)=>catalogue?.id === data?.farmCertificate);
         this.selectedfertility = catalogues.find((catalogue:any)=>catalogue?.id === data?.fertilityStatus);
         this.selectedIrrigation = catalogues.find((catalogue:any)=>catalogue?.id === data?.irrigation);
         this.selectedIrrigationType = catalogues.find((catalogue:any)=>catalogue?.id === data?.irrigationType);
         this.selectedLandOwnerShip = catalogues.find((catalogue:any)=>catalogue?.id === data?.landOwnership);
         this.selectedTopography = catalogues.find((catalogue:any)=>catalogue?.id === data?.topography);
      })
    }

  ngOnInit(): void {
  this.route.queryParams.subscribe((params:any)=>{this.id = params.id; this.title = this.id ? "Edit" : "Add";});
  // this.farmer = {id:'e95399066a',name:''};
  this.setFarmForm();
  this.catalougeValues();
  this.getAllFarmers();
  if(this.id){
    this.staticFarmService.getFarmById(this.id).subscribe((data: any) =>{
      this.setCatalogueValues(data);
      this.setImages(data);
      this.id = data?.id;
      this.selectedFarmer = data?.farmer;
      // this.farmer = data?.farmer;
      this.farmForm.patchValue({
        name:data?.name,
        surveyNo:data?.surveyNo,
        ppArea:data?.ppArea,
        isSameFarmer:data?.isSameFarmer,
        farmAddress:data?.farmAddress,
        registrationNumber:data?.registrationNumber,
        totalLandHolding:data?.totalLandHolding,
        latitude:data?.latitude,
        longitude:data?.longitude,
        fullTimeWorkers:data?.fullTimeWorkers,
        partTimeWorkers:data?.partTimeWorkers,
        seasonalWorkers:data?.seasonalWorkers,
        conventionalLand:data?.conventionalLand,
        pastureLand:data?.pastureLand,
        conventionalCrops:data?.conventionalCrops,
        estimatedYield:data?.estimatedYield,
        lastDayStr:new Date(data?.lastDayStr),
        farmCertificate:data?.farmCertificate,
        conversionDateStr:new Date(data?.conversionDateStr),
        isQualified:data?.isQualified,
        nameOfInspector:data?.nameOfInspector
      });
    })
  }
  // if (this.data.id) {
  //   this.staticFarmService.getFarmById(this.data?.id).subscribe((data: any) => {
  //     this.id = data?.id;
  //     this.farmForm = this.formBuilder.group({
  //       name: [data?.name],
  //       address: [data?.address],
  //       contactPerson: [data?.contactPerson],
  //       contactNumber: [data?.contactNumber],
  //       emailId: [data?.emailId]
  //     });
  //   })
  // }
  this.isSubmit = false;
  }

  setImages= async (detail:any)=>{
    this.farmImgId = detail?.farmPhoto;
    if(this.farmImgId) this.imgService.getImageById(this.farmImgId).toPromise().then((res:any)=>{
      let blob = this.imgService.toBlob(res?.image,res?.type);
      (<HTMLInputElement>document.getElementById('farmImage')).files = this.imgService.toFile(blob,res?.name,res?.type);
      this.farmImgUrl = window.URL.createObjectURL(blob);
    });
  }

  submitForm = async () => {
    this.isSubmit = true;
    let isComplete = await this.saveImages();
    // this.farmerMultiSelectComponent.formInvalid();
    this.saveEvent.emit(true);
    this.farmForm.patchValue({
      farmer: this.selectedFarmer,
      conversionStatus:this.selectedConversionStatus?.id,
      fertilityStatus:this.selectedfertility?.id,
      irrigation:this.selectedIrrigation?.id,
      irrigationType:this.selectedIrrigationType?.id,
      topography:this.selectedTopography?.id,
      landGradient:this.selectedGradient?.id,
      landOwnership:this.selectedLandOwnerShip?.id,
      approachRoad:this.selectedApproach?.id,
      farmCertificate:this.selectedFarmCertificate?.id
    })
    let farmData = this.farmForm?.value;
    farmData['lastDayStr'] = this.datePipe.transform(this.farmForm.value.lastDayStr,'MM/dd/yyyy');
    farmData['conversionDateStr'] = this.datePipe.transform(this.farmForm.value.conversionDateStr,'MM/dd/yyyy');
    if(isComplete) {
      farmData['farmPhoto'] = this.farmImgId;
     }
    if(this.id){
      farmData['id'] = this.id;
      // farmData['farmer']= this.farmer;
    }
    this.sendForm(farmData);
  };

  sendForm =(data) =>{
    if(!this.farmForm.invalid){
      this.staticFarmService.addFarm(data).subscribe((data: any) =>{
        this.cancel();
        this.responseModalService.OpenStatusModal(this.appconfiguration.successIconUrl,
          'Farm Added', 'Your information has been saved successfullay!');
      });
    }
  };
  get basic(){
    return this.farmForm.controls;
  }
  triggerEvent = () =>{
    this.event.emit({data: true});
  }

  async saveImages() {
    try{
      let fd = new FormData();
      fd = new FormData();
      fd.append('image',this.selectedFarmPhoto);
      if(this.selectedFarmPhoto) await this.farmerService.imageUpload(fd).toPromise().then((data)=>{this.farmImgId = data?.id;});
    }catch(e){
      console.log(e);
    }
    return true;
  }


  cancel=()=>{
    this.router.navigate(['farmer/static-farm']);
  }

}
