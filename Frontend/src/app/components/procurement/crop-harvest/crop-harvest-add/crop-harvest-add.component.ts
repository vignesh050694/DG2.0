import { Subject } from 'rxjs';
import { Guid } from 'guid-typescript';
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, EventEmitter, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { MultiSelectComponent } from 'src/app/common/multi-select/multi-select.component';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { FarmService } from 'src/app/components/master/farm/farm.service';
import { FarmerService } from 'src/app/components/master/farmer/farmer.service';
import { LocationService } from 'src/app/components/master/location/location.service';
import { CropService } from 'src/app/components/master/product/crop/crop.service';
import { ProductService } from 'src/app/components/master/product/product.service';
import { CropHarvestProductDetailComponent } from '../crop-harvest-product-detail/crop-harvest-product-detail.component';
import { CropHarvestService } from '../crop-harvest.service';

@Component({
  selector: 'app-crop-harvest-add',
  templateUrl: './crop-harvest-add.component.html',
  styleUrls: ['./crop-harvest-add.component.scss']
})
export class CropHarvestAddComponent implements OnInit {
  @ViewChild('villageMultiSelect', { static: false }) villageMultiSelectComponent: MultiSelectComponent;
  @ViewChild('farmerMultiSelect', { static: false }) farmerMultiSelectComponent: MultiSelectComponent;
  @ViewChild('farmMultiSelect', { static: false }) farmMultiSelectComponent: MultiSelectComponent;
  @ViewChild('cropHarvestDetailsTab', { static: false }) cropHarvestDetailsComponent: CropHarvestProductDetailComponent;
  public isSubmit: boolean = false;
  cropHarvestDetails:Map<any,any>= new Map();
  id: string;
  detailId: string;
  public datatrigger: EventEmitter<any> = new EventEmitter();
  showProductDetails: boolean = false;
  villages = [];
  farmers = [];
  farms = [];
  protected _onDestroy = new Subject <void>();
  crop: string = "";
  variety: string = "";
  grade: string = "";
  unit: any;
  sowingDate : any;
  quantity: number = 0;
  selectedFarmer: any;
  selectedFarm: any;
  selectedVillage: any;
  delArr:any =[];
  crops = [];
  varieties = [];
  grades = [];
  editData:any;
  editcall:boolean = false;
  // procurementForm: FormGroup;
  cropHarvestForm: FormGroup

  public villageFilterCtrl: FormControl = new FormControl();
  public filteredVillages: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  // productDetails: any[] = [];
  showcropHarvestDetails: boolean = false;

  constructor(public formBuilder: FormBuilder,
    private locationService: LocationService,
    private farmerService: FarmerService,
    private farmService: FarmService,
    private router: Router,
    private cropService: CropService,
    private productService: ProductService,
    private responseModalService: ResponseModalService,
    private appConfiguration: AppConfiguration,
    private cropHarvestSerice: CropHarvestService,
    public datepipe: DatePipe,
    public route: ActivatedRoute,
    private cdref: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.cropHarvestForm=this.formBuilder.group({
      date:["",[Validators.required]],
      village :[""],
      farmer :[" "],
      crop :[" "],
      farm:[""]


    })
    this.setFormValue();
    this.getVillages();
    this.getFarmers();
    this.getFarms();
    this.getCrops();
    this.getValueById();
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
  setFormValue = (
    date = '',
    farmer = '',
    farm = '',
    village = '',
    isCreate=true
  )=> {
    this.cropHarvestForm = this.formBuilder.group({
      date: date,
      farm: farm,
      village: village,
      farmer: farmer
    });
  };

  getValueById(){
    this.id = this.route.snapshot.params.id;
    if((!!this.id)){
      this.cropHarvestSerice.getById(this.id).subscribe((data:any)=>{
        this.selectedVillage = data?.village;
        this.selectedFarmer = data?.farmer;
        this.selectedFarm = data?.farm;
        this.cropHarvestForm = this.formBuilder.group({
          // this.cropHarvestForm.patchValue({
           date:[new Date(data?.date)],
           village:this.selectedVillage,
           farmer:this.selectedFarmer,
           farm:this.selectedFarm
        })
        data?.cropHarvestDetails.forEach((details:any) => {
          let product = {
            'id':details?.id,
            'product':details?.grade?.variety?.crop,
            'variety': details?.grade?.variety,
            'grade': details?.grade,
            'sowingDate':details?.sowingDate,
            'unit': details?.grade?.variety?.crop?.unit,
            'quantity':details?.quantity
            // 'sowingDate':new Date(details?.sowingDate)
       }
      //  this.detailId = details?.id;
       this.cropHarvestDetails.set(details?.id,product);
      })
      if (this.cropHarvestDetails?.size > 0)
      {
        this.cropHarvestDetailsComponent.reload(this.cropHarvestDetails);
        this.showcropHarvestDetails = true }
      // if (data?.cropHarvestDetails != null) {
      //  this.datatrigger.emit(this.cropHarvestDetails);
      //  this.showcropHarvestDetails = true;
    })

  }
}

  getCrops = () => {
    this.cropService.getAllCrops().then((data: any[]) => {
      this.crops = data;
    });
  };

  getVillages = () => {
    this.locationService.getAllVillages().subscribe((data: any[]) => {
      this.villages = data;
    });
  }

  changeCrop = (event: any)=>{
    this.unit = event?.unit?.name;
    this.getVarietyByCrop(event?.id);
  }

  getVarietyByCrop = (event: any) => {
    this.productService.getVareityByCrop(event).then((data: any[]) => {
      this.varieties = data;
    });
  }

  changeVariety = (event)=> {
    this.getGradeByVariety(event?.id);
  }

  getGradeByVariety = (id: string) => {
    this.productService.getGradeByVariety(id).then((data: any[]) => {
      this.grades = data;
    });
  }


  getFarmers = () => {
    let filter = [{
      "key": "isDeleted",
      "operation": ":",
      "value": false
    }];
    this.farmerService.getAllFarmer(filter).subscribe((data: any[]) => {
      this.farmers = data;
    });
  }

  getFarms = () => {
    this.farmService.getAllFarm().subscribe((data: any[]) => {
      this.farms = data;
    });
  };

  addProductInformation = () => {
    if(this.editcall){
      this.editcall = false;
      // this.productDetails.delete(this.detailId);
    }else{
      this.detailId = "temp"+ Guid.create();
    }
    let product = {
      'id':this.detailId,
      'product': this.crop,
      'variety': this.variety,
      'grade': this.grade,
      'unit': this.unit as string,
      'sowingDate': this.sowingDate,
      'quantity': this.quantity as number,

    }
    this.setcropHarvestDetailValue();
    this.cropHarvestDetails.set(product?.id,product);
    this.showcropHarvestDetails = true;
    this.cropHarvestDetailsComponent.reload(this.cropHarvestDetails);

  };

  // addProductInformation = () => {
  //   let product = {
  //     'product': this.crop,
  //     'variety': this.variety,
  //     'grade': this.grade,
  //     'unit': this.unit,
  //     'sowingDate': this.sowingDate,
  //     'quantity': this.quantity,
  //     'id':this.detailId
  //   }
  //   this.setcropHarvestDetailValue();
  //   this.productDetails.push(product);
  //   this.showProductDetails = true;
  //   this.cropHarvestDetailsComponent.reload(this.productDetails);

  // }

  setcropHarvestDetailValue = (
    id= null,
    crop = "",
    variety = "",
    grade = "",
    sowingDate="",
    unit = null,
    quantity = 0,
     ) => {
    this.crop = crop;
    this.variety = variety;
    this.grade = grade;
    this.sowingDate = new Date(sowingDate);
    this.unit = unit;
    this.quantity = quantity;
    this.detailId = id;
  };

  // edit = (row: any) => {
  //   this.crop = row?.grade?.variety?.crop;
  //   this.variety = row?.grade?.variety;
  //   this.grade = row?.grade;
  //   this.getVarietyByCrop(row?.grade?.variety?.crop?.id);
  //   this.getGradeByVariety(row?.grade?.variety?.id);
  //   this.setProductDetailValue(row?.product, row?.variety, row?.grade, row?.sowingDate, row?.variety?.crop?.unit?.name, row?.quantity);
  //   this.deleteConfirm(row?.index);
  // }


  edit = (rowId: any) => {
    this.setcropHarvestDetailValue();
    this.editData = this.cropHarvestDetails.get(rowId);
    if (!!this.editData) {
      this.editcall=true;
      this.setcropHarvestDetailValue(
        this.editData?.id,
        this.editData?.product,
        this.editData?.variety,
        this.editData?.grade,
        this.editData?.sowingDate,
        this.editData?.unit as string,
        this.editData?.quantity as number
       );
    }
  }


  deleteConfirm = (rowId:string) => {
    if(rowId.substring(0, 4) == 'temp'){}else{
      this.delArr.push(rowId);
    }
    this.cropHarvestDetails.delete(rowId);
    this.cropHarvestDetailsComponent.reload(this.cropHarvestDetails);
  }

  save = () => {
    this.isSubmit = true;
      this.isSubmit=true;
    this.villageMultiSelectComponent.formInvalid();
    this.farmerMultiSelectComponent.formInvalid();
    this.farmMultiSelectComponent.formInvalid();
    this.setFormValue(this.cropHarvestForm?.value?.date,this.selectedFarmer,this.selectedFarm,this.selectedVillage);
    if (this.cropHarvestForm.valid && this.cropHarvestDetails.size > 0) {
      let data = this.cropHarvestForm.value;
      if(!!this.id) { data["id"]=this.id; }
      if (data.date != null)
      data.date = this.datepipe.transform(this.cropHarvestForm?.value?.date, "MM/dd/yyyy");
      let arr = Array.from(this.cropHarvestDetails?.values());
      arr.map((obj)=>{if(obj?.id.substring(0, 4) == 'temp'){obj.id = null;}});
      data["cropHarvestDetails"] = arr;
      this.cropHarvestSerice.addCropHarvest(data).toPromise().then(()=>{
        if(this.delArr?.length > 0){
          this.delArr.forEach((id)=>{
            this.cropHarvestSerice.delete(id).toPromise().then((data)=>{});
          })
        }
        this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
          'Crop Harvest Added', 'Your information has been saved successfully!');
        this.cancel();
      });

    } else {
      this.cropHarvestForm.markAllAsTouched();
    }
  }


  cancel = () => {
    this.router.navigate(['procurement/crop-harvest/']);
  }


  clear(){
    this.setcropHarvestDetailValue();
  }

  ngOnDestroy = () => {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  get basic() {
    return this.cropHarvestForm.controls;
  }


  public objectComparisonFunction = function (option, value): boolean {
    return option.id === value.id;
  };
}
