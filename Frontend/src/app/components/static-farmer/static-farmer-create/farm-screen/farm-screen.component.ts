import { FarmDetailComponent } from './../farm-detail/farm-detail.component';
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { CatalougeTypes } from 'src/app/common/common.enum';
import { MultiSelectComponent } from 'src/app/common/multi-select/multi-select.component';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { CatalogueService } from 'src/app/components/master/catalogue/catalogue.service';
import { StaticFarmService } from '../../static-farm/static-farm.service';
import { StaticFarmerService } from '../../static-farmer.service';
import { FarmerFormService } from '../farmer-form.service';
import { FileUploader } from 'ng2-file-upload';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';
import { ImgService } from 'src/app/common/img.service';

@Component({
  selector: 'app-farm-screen',
  templateUrl: './farm-screen.component.html',
  styleUrls: ['./farm-screen.component.scss']
})
export class FarmScreenComponent implements OnInit {

  @ViewChild("farmerMultiSelect",{static:false}) farmerMultiSelectComponent:MultiSelectComponent
  private event: EventEmitter<any> = new EventEmitter();

  @Input() events: Observable<void>;
  @Output() saveEvent = new EventEmitter();
  @Output() actionTrigger = new EventEmitter();
  @Input() farmerId:any;
  @Input() id:any;
  matDialogRef: MatDialogRef<any>;

  isSubmit: boolean;
  farmForm: FormGroup;
  title: string;
  farmer:any;
  landOwnerships=[];
  approachRoads=[];
  landTopographys=[];
  landGradients=[];
  fertilityStatus=[];
  irrigationSources = [];
  irrigationTypes =[];
  certificationTypes=[];
  conversionStatus =[];
  selectedLandOwnerShip:any;
  selectedApproach:any;
  selectedGroup:any;
  selectedGradient:any;
  selectedTopography:any;
  selectedfertility:any;
  selectedIrrigation:any;
  selectedIrrigationType:any;
  selectedcertificationTypes:any;
  selectedConversionStatus:any;
  params:any;

//Image
  farmImgUrl: any;
  farmImgId: any;

  selectedFarmPhoto: File;

  public farmPhotoUploader: FileUploader = this.farmerService.getFileUploader();

  popupKey: any = {
    "farmImg": 1
  }

  constructor(public formBuilder: FormBuilder,
    private staticFarmService: StaticFarmService,
    private responseModalService: ResponseModalService,
    private appconfiguration: AppConfiguration,
    private catalogueService:CatalogueService,
    private datePipe:DatePipe,private formService:FarmerFormService,
    private farmerService: StaticFarmerService,
    private imgService: ImgService) {
    }


    //------------img preview-----------------------------
  imagePreview = (index: number) => {
     if (index == this.popupKey.farmImg) this.openModal(ImagePreviewComponent, this.farmImgUrl);
  }

  deleteImg = (index: number) => {
     if (index == this.popupKey.farmImg) {
      this.selectedFarmPhoto = null;
      this.farmImgId = '';
      this.farmImgUrl = '';
      $("farmImage").val('');
    }
  }

    getValue=(value:any)=>{
      if(value) return value;
      else return [];
    }

    openModal = (component: any, data: any) => {
      this.matDialogRef = this.responseModalService.openModalSM(component, data);
      // this.matDialogRef.afterClosed().subscribe(res => {
      //   if (res) {
      //     if (data == this.popupKey.bankDetail) { this.bankDetails.push(res); this.datatrigger1.emit(this.bankDetails); }
      //     else if (data == this.popupKey.animalDetail) { this.animalDetails.push(res); this.datatrigger2.emit(this.animalDetails); }
      //     else if (data == this.popupKey.equipmentDetail) { this.farmDetails.push(res); this.datatrigger3.emit(this.farmDetails); }
      //   }
      // });
    }

     // -----------file uploader--------------------


  getSelectedImage = (file: FileUploader, event: any, type: number) => {
    let result = this.imgService.getSelectedImage(file, event);
    switch (type) {
      case this.popupKey.farmImg:
        this.farmPhotoUploader = result?.uploader;
        this.selectedFarmPhoto = result?.image;
        this.farmImgUrl = result?.url; break;
    }
  }

  public onFarmPhoto = (event: any) => { this.getSelectedImage(this.farmPhotoUploader, event, this.popupKey.farmImg) };

  setImages = async (detail: any) => {
    this.farmImgId = detail?.farmPhoto;
    if (this.farmImgId) this.imgService.getImageById(this.farmImgId).toPromise().then((res: any) => {
      let blob = this.imgService.toBlob(res?.image, res?.type);
      (<HTMLInputElement>document.getElementById('farmImage')).files = this.imgService.toFile(blob, res?.name, res?.type);
      this.farmImgUrl = window.URL.createObjectURL(blob);
    });
  }

    catalougeValues=async ()=>{
      let catArr =this.formService.getFarmCatalogueArr();
      await  this.catalogueService.getCataloguesByTypes(catArr).toPromise().then((datas:any)=>{
        this.landOwnerships = this.getValue(datas[CatalougeTypes.landOwnership]);
        this.landTopographys =  this.getValue(datas[CatalougeTypes.landTopography]);
        this.approachRoads = this.getValue(datas[CatalougeTypes.approachRoad]);
        this.landGradients =this.getValue(datas[CatalougeTypes.landGradient]);
        this.fertilityStatus = this.getValue(datas[CatalougeTypes.fertilityStatus]);
        this.irrigationSources= this.getValue(datas[CatalougeTypes.irrigationSource]);
        this.irrigationTypes=this.getValue(datas[CatalougeTypes.irrigationTypes]);
        this.conversionStatus= this.getValue(datas[CatalougeTypes.currentConversionStatus]);
        this.certificationTypes=this.getValue(datas[CatalougeTypes.farmCertificate]);
      });
      return true;
    }

    setCatalogueValues=(data:any)=>{
      this.selectedApproach = this.approachRoads.find((catalogue:any)=>catalogue?.id === data?.approachRoad);
      this.selectedGradient = this.landGradients.find((catalogue:any)=>catalogue?.id === data?.landGradient);
      this.selectedConversionStatus = this.conversionStatus.find((catalogue:any)=>catalogue?.id === data?.conversionStatus);
      this.selectedcertificationTypes = this.certificationTypes.find((catalogue:any)=>catalogue?.id === data?.farmCertificate);
      this.selectedfertility = this.fertilityStatus.find((catalogue:any)=>catalogue?.id === data?.fertilityStatus);
      this.selectedIrrigation = this.irrigationSources.find((catalogue:any)=>catalogue?.id === data?.irrigation);
      this.selectedIrrigationType = this.irrigationTypes.find((catalogue:any)=>catalogue?.id === data?.irrigationType);
      this.selectedLandOwnerShip = this.landOwnerships.find((catalogue:any)=>catalogue?.id === data?.landOwnership);
      this.selectedTopography = this.landTopographys.find((catalogue:any)=>catalogue?.id === data?.topography);
    }

  async ngOnInit(): Promise<void> {
  this.title = 'Add'
  this.farmForm =this.formService.getFarmForm();
  let isComplete = await this.catalougeValues();
  if(this.id){
    if(isComplete) this.getValueById();
  }
  this.isSubmit = false;
  }

  getValueById(){
    this.title = 'Edit';
    this.staticFarmService.getFarmById(this.id).subscribe((data: any) =>{
      this.setCatalogueValues(data);
      this.setImages(data);
      this.farmer = data?.farmer;
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
        conversionDateStr:new Date(data?.conversionDateStr),
        isQualified:data?.isQualified,
        nameOfInspector:data?.nameOfInspector
      });
    })
  }

  async saveImages() {
    try {
      let fd = new FormData();
      fd = new FormData();
      fd.append('image', this.selectedFarmPhoto);
      if (this.selectedFarmPhoto) await this.farmerService.imageUpload(fd).toPromise().then((data) => { this.farmImgId = data?.id; });
    } catch (e) {
      console.log(e);
    }
    return true;
  }

  submitForm = async () => {
    this.isSubmit = true;
    let isComplete = await this.saveImages();
    this.saveEvent.emit(true);
    this.farmForm.patchValue({
      conversionStatus:this.selectedConversionStatus?.id,
      fertilityStatus:this.selectedfertility?.id,
      irrigation:this.selectedIrrigation?.id,
      irrigationType:this.selectedIrrigationType?.id,
      topography:this.selectedTopography?.id,
      landGradient:this.selectedGradient?.id,
      landOwnership:this.selectedLandOwnerShip?.id,
      approachRoad:this.selectedApproach?.id,
      farmCertificate:this.selectedcertificationTypes?.id,

    })
    let farmData = this.farmForm?.value;
    farmData['lastDayStr'] = this.datePipe.transform(this.farmForm.value.lastDayStr,'MM/dd/yyyy');
    farmData['conversionDateStr'] = this.datePipe.transform(this.farmForm.value.conversionDateStr,'MM/dd/yyyy');
    if(this.id){
      farmData['id'] = this.id;
      farmData['farmer']= this.farmer;
    }
    if (isComplete) {
      farmData['farmPhoto'] = this.farmImgId;
    }
    farmData['farmer']= {id:this.farmerId,name:""};
    this.sendForm(farmData);
  };

  sendForm =(data) =>{
    if(!this.farmForm.invalid){
      this.staticFarmService.addFarm(data).subscribe((data: any) =>{
        this.responseModalService.OpenStatusModal(this.appconfiguration.successIconUrl,
          'Farm Added', 'Your information has been saved successfullay!');
          this.cancel();
      });
    }
  };
  get basic(){
    return this.farmForm.controls;
  }
  triggerEvent = () =>{
    this.event.emit({data: true});
  }

  cancel=()=>{
    // window.history.back();
    // this.router.navigate(['farmer/static-farmer-create/detail?id='+this.params?.farmerId]);
    this.actionTrigger.emit({isEdit:false,farmId:null});
  }
}

@Component({
  selector: 'app-farm-list-screen',
  template: `
    <div class="col-auto align-self-center" style="display:flex;justify-content: flex-end;padding:10px;align-items:center;">
      <button (click)="add()" class="btn bttn-primary bttn-add st mr-2">+</button><span class="p p-14 fw-700 text-dark">Add Farm</span>
    </div>
  <!-- <table-generic [count]="count" [displayedColumns]="displayedColumns" [definedColumns]="definedColumns" [searchColumns]="searchColumns"
               [canShowSearch]="true" [data]="farms" [isAction]="true" [datatrigger]="datatrigger" (editRow)='edit($event)'
               (paginate)='onPaginate($event)' [isDetail]="true" (detailRow)="detail($event)"  (searchEvent)='onSearch($event)' (deleteRow)='deleteConfirm($event)'>
  </table-generic> -->
  <app-common-table [count]="count" [displayedColumns]="displayedColumns" [definedColumns]="definedColumns" [searchColumns]="searchColumns"
               [canShowSearch]="true" [data]="farms" [isAction]="true" [datatrigger]="datatrigger" (editRow)='edit($event)'
               (paginate)='onPaginate($event)' [isDetail]="true" (detailRow)="detail($event)"  (searchEvent)='onSearch($event)' (deleteRow)='deleteConfirm($event)'>
  </app-common-table>
  `,
  styleUrls: ['./farm-screen.component.scss']
})
export class FarmListScreenComponent implements OnInit {

  @Input() farmerId:any;
  @Output() actionTrigger = new EventEmitter();
  matDialogRef: MatDialogRef<any>;

  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ['farmName' ,'farmer','surveyNo','conversionStatus'];
  searchColumns: any[] = [{name:'f.name',canShow:true },{ name: 'f1.name', canShow: true },{name:'f.survey_no',canShow:true },{name:'c.name',canShow:true }];
  definedColumns = ['name', 'farmer','surveyno','conversionstatus'];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  farms: any[] = [];
  farmer: any[] = [];
  filters: any[] = [];
  detailId: any;
  constructor(
    private staticFarmService: StaticFarmService,
    private responseModalService: ResponseModalService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.loadData()
  }

  // openModal = (component: any, data: any) => {
  //   this.matDialogRef = this.responseModalService.openModalSM(component, data);
  // }

  detail=(id:any)=>{
    this.matDialogRef = this.responseModalService.openModalRight(FarmDetailComponent,id);
    this.matDialogRef.afterClosed().subscribe((res:any) => {
      if(res){
        if(res?.key === "edit"){ this.edit(res?.value) }
        else if(res?.key === "delete"){ this.deleteConfirm(res?.value) }
      }
    });
  }

  edit = (rowId: any) => {
    this.actionTrigger.emit({isEdit:true,farmId:rowId});
    // this.router.navigate(['farmer/static-farmer-create/farm'],{queryParams:{id:rowId,farmerId:this.farmerId}});
  }
  loadData = () => {
    this.filters.push({key:'f1.id',operation:'=',value:this.farmerId});
    this.staticFarmService.getFarm(this.postPerPage, this.pageNumber, this.filters).subscribe((datas: any) => {
      this.filters =[];
      this.farms = [];
      this.farms = datas.data;
      this.datatrigger.emit(this.farms);
      this.count = datas?.recordsTotal;
    })
  }

  onPaginate = (pageObject) => {
    this.postPerPage = pageObject.postPerPage;
    this.pageNumber = pageObject.pageNumber;
    this.loadData();
  }

  add=()=>{
    this.actionTrigger.emit({isEdit:true,farmId:null});
    // this.router.navigate(['farmer/static-farmer-create/farm'],{queryParams:{id:null,farmerId:this.farmerId}});
  }

  // edit = (rowId: any) => {
  //   this.actionTrigger.emit({isEdit:true,farmId:rowId});
  //   // this.router.navigate(['farmer/static-farmer-create/farm'],{queryParams:{id:rowId,farmerId:this.farmerId}});
  // }

  deleteConfirm =(rowId: any) => {
    this.staticFarmService.deleteFarm(rowId).subscribe((data: any) => {
      this.loadData();
    });
  }

  onSearch=(filters:any[])=> {
    this.filters = filters
    this.loadData();
  }


}
