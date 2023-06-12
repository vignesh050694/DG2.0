import { ChangeDetectorRef, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { from, ReplaySubject } from 'rxjs';
import { LocationService } from 'src/app/components/master/location/location.service';
import { TalukService } from 'src/app/components/master/location/taluk/taluk.service';
import { SeasonService } from 'src/app/components/master/season/season.service';
import { WarehouseService } from 'src/app/components/master/warehouse/warehouse.service';
import { ProcurementService } from '../procurement.service'
import { FarmerService } from 'src/app/components/master/farmer/farmer.service'
import { CropService } from 'src/app/components/master/product/crop/crop.service';
import { ProductService } from 'src/app/components/master/product/product.service';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MultiSelectComponent } from 'src/app/common/multi-select/multi-select.component';
import { ProcurementProductDetailsComponent } from '../procurement-product-details/procurement-product-details.component';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-procurement-add',
  templateUrl: './procurement-add.component.html',
  styleUrls: ['./procurement-add.component.scss']
})
export class ProcurementAddComponent implements OnInit, OnDestroy {
  @ViewChild('seasonMultiSelect', { static: false }) seasonMultiSelectComponent: MultiSelectComponent;
  @ViewChild('warehouseMultiSelect', { static: false }) warehouseMultiSelectComponent: MultiSelectComponent;
  @ViewChild('talukMultiSelect', { static: false }) talukMultiSelectComponent: MultiSelectComponent;
  @ViewChild('villageMultiSelect', { static: false }) villageMultiSelectComponent: MultiSelectComponent;
  @ViewChild('farmerMultiSelect', { static: false }) farmerMultiSelectComponent: MultiSelectComponent;
  @ViewChild('procurementDetails', { static: false }) procurementProductDetailsComponent: ProcurementProductDetailsComponent;
  @ViewChild('cropMultiSelect', { static: false }) cropMultiSelectComponent: MultiSelectComponent;
  @ViewChild('varietyMultiSelect', { static: false }) varietyMultiSelectComponent: MultiSelectComponent;
  @ViewChild('gradeMultiSelect', { static: false }) gradeMultiSelectComponent: MultiSelectComponent;

  public datatrigger: EventEmitter<any> = new EventEmitter();
  // procurementFrom: FormGroup;
  productDetails:Map<any,any>= new Map();
  seasons = [];
  warehouses = [];
  taluks = [];
  villages = [];
  farmers = [];
  crops = [];
  varieties = [];
  grades = [];
  protected _onDestroy = new Subject<void>();

  selectedFarmer: any;
  selectedSeason: any;
  selectedVillage: any;
  selectedWarehouse: any;
  selectedTaluk: any;

  //table ngmodal values

  crop: any;
  variety: any;
  grade: any;
  unit: any;
  price: number = 0;
  noOfBags: number = 0;
  netWeight: number = 0;
  payment: number = 0;
  isUnRegistered = false;
  procurement: any;
  showProductDetails: boolean = false;
  //form Related
  procurementForm: FormGroup;
  isSubmit: boolean = false;
  //ID for Edit
  id: string;
  detailId : string = "";
  procurementData: any = {};
  delArr:any =[];
  editData:any;
  editcall:boolean = false;
  constructor(
    public formBuilder: FormBuilder,
    public datepipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    private cropService: CropService,
    private talukService: TalukService,
    private seasonService: SeasonService,
    private farmerService: FarmerService,
    private productService: ProductService,
    private locationService: LocationService,
    private warehouseService: WarehouseService,
    private appConfiguration: AppConfiguration,
    private procurementService: ProcurementService,
    private responseModalService: ResponseModalService,
    private cdref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.procurementForm=this.formBuilder.group({
      season: [""],
      warehouse :[""],
      farmer :[" "],
      village :[""],
      taluk :[" "],
      // crop :[" ",[Validators.required]],
      farmerName:[""],
      mobileNumber:[""],
      isRegistered:[""],
      procurementDateStr:[new Date(), [Validators.required]]
    })
    // this.setFormValue();
    this.getSeasons();
    this.getWarehouses();
    this.getFarmers();
    this.getVillages();
    this.getTaluk();
    this.getCrops();
    this.getValueById();
  }


  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  // setFormValue = (
  //   season = '',
  //   warehouse = '',
  //   village = '',
  //   farmer = '',
  //   taluk = '',
  //   isCreate=true
  // ) => {
  //   this.procurementForm = this.formBuilder.group({
  //     season: season,
  //     warehouse: warehouse,
  //     village: village,
  //     farmer: farmer,
  //     taluk: taluk,
  //     farmerName:[this.procurementForm?.value?.farmerName],
  //     mobileNumber:[this.procurementForm?.value?.mobileNumber],
  //     isRegistered:[this.procurementForm?.value?.isRegistered],
  //     procurementDateStr:[this.procurementForm?.value?.procurementDateStr, [Validators.required]]
  //   });
  //   if(isCreate==true){
  //     this.procurementForm.controls.isRegistered.setValue(true);
  //     this.procurementForm.controls.procurementDateStr.setValue(new Date());
  //   }
  // };

  getValueById(){
    this.id = this.route.snapshot.params.id;
    if (!!this.id) {
      this.procurementService.getById(this.id).subscribe((data:any) => {
        this.selectedFarmer =data?.farmer;
        this.selectedSeason = data?.season;
        this.selectedTaluk = data?.village?.taluk;
        this.selectedVillage = data?.village;
        this.selectedWarehouse = data?.warehouse;
        this.payment = data?.payment;
        this.procurementForm.patchValue({
          procurementDateStr: new Date(data?.procurementDateStr),
          farmer: this.selectedFarmer,
          isRegistered: data?.isRegistered,
          taluk:this.selectedTaluk,
          village: this.selectedVillage,
          warehouse: this.selectedWarehouse,
          season: this.selectedSeason,
          farmerName: data?.farmerName,
          mobileNumber: data?.mobileNumber,
          payment:this.payment
        });
        data?.procurementDetails.forEach((details:any) => {
          let product = {
            'id':details?.id,
            'productName': details?.grade?.variety?.crop,
            'variety': details?.grade?.variety,
            'grade': details?.grade,
            'unit': details?.grade?.variety?.crop?.unit,
            'price': details?.grade?.price,
            'noOfBags': details?.noOfBags,
            'netWeight': details?.netWeight,
          }
          // this.detailId = details?.id;
          this.productDetails.set(details?.id,product);
        })
        if (this.productDetails?.size > 0)
        {
          this.procurementProductDetailsComponent.reload(this.productDetails);
          this.showProductDetails = true }
        // if (data?.procurementDetails != null) {
        //   this.datatrigger.emit(this.productDetails);
        //   this.showProductDetails = true;
        // }
      });
    }
  }

  //getdropdownvalue methods
  getWarehouses = () => {
    this.warehouseService.getAllWarehouse().subscribe((data: any[]) => {
      this.warehouses = data;
    });
  }
  getSeasons = () => {
    this.seasonService.getAllSeasons().subscribe((data: any[]) => {
      this.seasons = data;
    });
  }

  getTaluk = () => {
    this.talukService.getAllTaluk().subscribe((data: any[]) => {
      this.taluks = data;
    });
  }

  getVillages = () => {
    this.locationService.getAllVillages().subscribe((data: any[]) => {
      this.villages = data;
    });
  }

  getFarmers = () => {
    this.farmerService.getAllFarmers().toPromise().then((data:any)=>{
      this.farmers = data;
    });
  }

  getCrops = () => {
    this.cropService.getAllCrops().then((data: any[]) => {
      this.crops = data;
    });
  }

  getVarietyByCrop = (id: string) => {
    this.productService.getVareityByCrop(id).then((data: any[]) => {
      this.varieties = data;
    });
  }

  getGradeByVariety = (id: string) => {
    this.productService.getGradeByVariety(id).then((data: any[]) => {
      this.grades = data;
    });
  }

  changeCrop = (event) => {
    this.getVarietyByCrop(event?.id);
    this.unit = event?.unit?.name;
  }

  changeVariety = (event) => {
    this.getGradeByVariety(event?.id);
  }

  changeGrade = (event) => {
    this.price = event?.price;
  }

  addProductInformation = () => {
    // if(!!this.crop && !!this.variety && !!this.grade && !!this.unit && !!this.price && !!this.noOfBags && !!this.netWeight){
      if(this.editcall){
        this.editcall = false;
        this.productDetails.delete(this.detailId);
      }else{
        this.detailId = "temp"+ Guid.create();
      }
    let product = {
      'id':this.detailId,
      'productName': this.crop,
      'variety': this.variety,
      'grade': this.grade,
      'unit': this.unit,
      'price': this.price,
      'noOfBags': this.noOfBags,
      'netWeight': this.netWeight,
    }
    this.setProductDetailValue();
    this.productDetails.set(product?.id,product);
    this.showProductDetails = true;
    this.procurementProductDetailsComponent.reload(this.productDetails);
  }

  toggle(event:any){
    if(this.procurementForm.value.isRegistered == true){
      this.selectedTaluk = "";
      this.selectedVillage = "";
      this.procurementForm.patchValue({
        farmerName:"",
        mobileNumber:""
      })
    }else{
        this.selectedFarmer = "";
    }
  }

  // setProductDetailValue = (
  //   crop = "",
  //   variety = "",
  //   grade = "",
  //   unit = "",
  //   price = 0,
  //   noOfBags = 0,
  //   netWeight = 0,
  //   detailId = this.detailId) => {
  //   this.crop = crop;
  //   this.variety = variety;
  //   this.grade = grade;
  //   this.unit = unit;
  //   this.price = price;
  //   this.noOfBags = noOfBags;
  //   this.netWeight = netWeight;
  //   this.detailId = detailId;
  // };

  setProductDetailValue = (
    id = "",
    crop = "",
    variety = "",
    grade = "",
    unit = "",
    price = 0,
    noOfBags = 0,
    netWeight = 0,
    ) => {
      this.crop = crop;
      this.variety = variety;
      this.grade = grade;
      this.unit = unit;
      this.price = price;
      this.noOfBags = noOfBags;
      this.netWeight = netWeight;
      this.detailId = id;
  };


  // edit = (rowId: any) => {
  //   // this.getVarietyByCrop(rowId?.productName.id);
  //   // this.getGradeByVariety(rowId?.variety?.id);
  //   // this.setProductDetailValue();
  //   this.editData = this.productDetails.get(rowId);
  //   // if (!!this.editData) {
  //   this.editcall=true;
  //   this.setProductDetailValue(
  //     this.editData?.productName,
  //     this.editData?.variety,
  //     this.editData?.grade,
  //     this.editData?.unit as string,
  //     this.editData?.price as number,
  //     this.editData?.noOfBags as number,
  //     this.editData?.netWeight as number);
  //   // this.deleteConfirm(rowId?.index);
  // }
  edit = (rowId: any) => {
    this.setProductDetailValue();
    this.editData = this.productDetails.get(rowId);
    if (!!this.editData) {
      this.editcall=true;
      this.setProductDetailValue(
        this.editData?.id,
        this.editData?.productName,
        this.editData?.variety,
        this.editData?.grade,
        this.editData?.unit as string,
        this.editData?.price as number,
        this.editData?.noOfBags as number,
        this.editData?.netWeight as number);
    }
  }

  deleteConfirm = (rowId:string) => {

    if(rowId.substring(0, 4) == 'temp'){}else{
      this.delArr.push(rowId);
    }
    this.productDetails.delete(rowId);
    this.procurementProductDetailsComponent.reload(this.productDetails);
  }

  save = () => {
    this.isSubmit = true;
    this.seasonMultiSelectComponent.formInvalid();
    this.warehouseMultiSelectComponent.formInvalid();
    if (this.procurementForm?.value?.isRegistered) {
      this.farmerMultiSelectComponent.formInvalid();
    }else{
      this.talukMultiSelectComponent.formInvalid();
      this.villageMultiSelectComponent.formInvalid();
    }
    if(!this.selectedTaluk) this.selectedTaluk = null;
    if(!this.selectedVillage) this.selectedVillage = null;
    this.procurementForm.patchValue({
      season: this.selectedSeason,
      warehouse : this.selectedWarehouse,
      farmer : this.selectedFarmer,
      village : this.selectedVillage,
      taluk :this.selectedTaluk,
    })
    // this.setFormValue(this.selectedSeason, this.selectedWarehouse, this.selectedVillage, this.selectedFarmer, this.selectedTaluk, false);
    if (this.procurementForm.valid && this.productDetails.size > 0) {
      let data = this.procurementForm.value;
      if(!!this.id) { data["id"]=this.id; }
      if (data.procurementDateStr != null) data.procurementDateStr = this.datepipe.transform(this.procurementForm?.value?.procurementDateStr, "MM/dd/yyyy");
      let finalDetail = [];
      this.productDetails.forEach((detail=>{
          finalDetail.push({
          'id':detail?.id,
          'grade': detail?.grade,
          'noOfBags': parseFloat(detail?.noOfBags),
          'netWeight': parseFloat(detail?.netWeight),
        })
      }))
        data["procurementDetails"] = finalDetail;
        if(!data.farmer){
          data.farmer = null;
        }
        this.procurementService.addProcurement(data).toPromise().then(()=>{
          this.router.navigate(['procurement/procurement/']);
          this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
          'Procurement Added', 'Your information has been saved successfully!');

       });
    } else {
      this.procurementForm.markAllAsTouched();
    }
  }

  cancel = () => {
    this.router.navigate(['procurement/procurement/']);
  }

  clear(){
    this.setProductDetailValue();
  }

  ngOnDestroy = () => {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  get basic() {
    return this.procurementForm.controls;
  }

  public objectComparisonFunction = function (option, value): boolean {
    return option.id === value.id;
  };
}

