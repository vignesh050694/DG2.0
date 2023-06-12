import { ChangeDetectorRef, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SeasonService } from 'src/app/components/master/season/season.service';
import { WarehouseService } from 'src/app/components/master/warehouse/warehouse.service';
import { MobileUserService } from 'src/app/components/settings/mobile-user/mobile-user.service';
import { TalukService } from '../../../master/location/taluk/taluk.service';
import { FarmerService } from '../../../master/farmer/farmer.service';
import { DistributionToFarmerService } from '../distribution-to-farmer.service';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { SubCategoryService } from 'src/app/components/master/farm-input/sub-category/sub-category.service';
import { LocationService } from 'src/app/components/master/location/location.service';
import { DatePipe } from '@angular/common';
import { DistributionToMobileUserService } from '../../distribution-to-mobile-user/distribution-to-mobile-user.service';
import { MultiSelectComponent } from 'src/app/common/multi-select/multi-select.component';
import { DistributionToFarmerDetailComponent } from '../distribution-to-farmer-detail/distribution-to-farmer-detail.component';
import { Guid } from 'guid-typescript';


@Component({
  selector: 'app-distribution-to-farmer-add',
  templateUrl: './distribution-to-farmer-add.component.html',
  styleUrls: ['./distribution-to-farmer-add.component.scss'],
})
export class DistributionToFarmerAddComponent implements OnInit {
  public datatrigger: EventEmitter<any> = new EventEmitter();
  @ViewChild('wareHouseMultiSelect', { static: false }) wareHouseMultiSelectComponent: MultiSelectComponent;
  @ViewChild('mobileUserMultiSelect', { static: false }) mobileUserMultiSelectComponent: MultiSelectComponent;
  @ViewChild('seasonMultiSelect', { static: false }) seasonMultiSelectComponent: MultiSelectComponent;
  @ViewChild('talukMultiSelect', { static: false }) talukMultiSelectComponent: MultiSelectComponent;
  @ViewChild('villageMultiSelect', { static: false }) villageMultiSelectComponent: MultiSelectComponent;
  @ViewChild('farmerMultiSelect', { static: false }) farmerMultiSelectComponent: MultiSelectComponent;
  @ViewChild('distributionToFarmerDetail', { static: false }) distributionToFarmerDetailComponent: DistributionToFarmerDetailComponent;
  distributionToFarmerForm: FormGroup;
  id: string;
  detailId: string;
  seasons = [];
  categories = [];
  subCategories = [];
  warehouses = [];
  taluks = [];
  farmers = [];
  villages = [];
  mobileUsers = [];
  distributionToFarmerDetails: Map<any,any> = new Map();
  showDistrbutionToFarmerDetails: boolean = false;
  isSubmit: boolean = false;
  isAvailable: boolean = false;
  selectedWarehouse: any;
  selectedSeason: any;
  selectedVillage: any;
  selectedFarmer: any;
  selectedTaluk: any;
  selectedMobileUser: any;
  category: any = '';
  subCategory: any = '';
  unit: any = '';
  batchNo: any = '';
  availableStocks: number = 0;
  distributingStock: number = 0;
  costPrice: number = 0;
  totalPrice: number = 0;
  editCall:boolean = false;
  delArr:any = [];
  constructor(
    public formBuilder: FormBuilder,
    private seasonService: SeasonService,
    private warehouseService: WarehouseService,
    private mobileUserService: MobileUserService,
    private talukService: TalukService,
    private router: Router,
    private farmerService: FarmerService,
    private locationService: LocationService,
    private subCategoryService: SubCategoryService,
    private appConfiguration: AppConfiguration,
    private distributionToMobileUserService: DistributionToMobileUserService,
    private distributionToFarmerService: DistributionToFarmerService,
    private responseModalService: ResponseModalService,
    public datepipe: DatePipe,
    private route: ActivatedRoute,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.distributionToFarmerForm = this.formBuilder.group({
      date:["", [Validators.required]],
      season: [null,[Validators.required]],
      stockType:[true],
      warehouse: [null],
      mobileUser:[null],
      farmerType:[true],
      taluk: [null],
      village: [null],
      farmer: [null],
      mobileNumber:[""],
      farmerName:[""],
    });
    this.getFarmers();
    this.getSeasons();
    this.getTaluks();
    this.getWarehouses();
    this.getVillages();
    this.getCategory();
    this.getMobileUsers();
    this.getValueById();
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  setFormValue = (
    date = "",
    stockType = false,
    farmerType = false,
    season = "",
    warehouse = null,
    mobileUser = null,
    taluk = null,
    village = null,
    farmer = null,
    mobileNumber="",
    farmerName="",
  ) => {
    this.distributionToFarmerForm.patchValue({
      date:new Date(date),
      season: season,
      stockType:stockType,
      warehouse: warehouse,
      mobileUser:mobileUser,
      farmerType:farmerType,
      taluk:taluk,
      village: village,
      farmer: farmer,
      mobileNumber:mobileNumber,
      farmerName:farmerName,
    });
  };
  //shows product list by category
  getProductByCategory = (event: any) => {
    this.subCategory={};
    this.subCategories=[];
    this.subCategoryService
      .getProductByCategory(event?.id)
      .subscribe((data: any[]) => {
        this.subCategories = data;
      });
  };

  getValueById(){
    this.id = this.route.snapshot.params.id;
    if (!!this.id) {
      this.distributionToFarmerService.getById(this.id).subscribe((data:any) => {
          this.selectedFarmer= data?.farmer;
          this.selectedMobileUser= data?.mobileUser;
          this.selectedSeason = data?.season;
          this.selectedWarehouse = data?.warehouse;
          this.selectedTaluk = data?.taluk;
          this.selectedVillage = data?.village;
          this.setFormValue(
            data?.date,
            data?.stockType,
            data?.farmerType,
            this.selectedSeason,
            this.selectedWarehouse,
            this.selectedMobileUser,
            this.selectedTaluk,
            this.selectedVillage,
            this.selectedFarmer,
            data?.mobileNumber,
            data?.farmerName
            )
          data?.distributionToFarmerDetails?.forEach((details:any)=>{
            let product={
              'id':details?.id as string,
              'category':details?.productName?.category,
              'productName':details?.productName,
              'availableStock':details?.availableStock,
              'unit':details?.productName?.unit,
              'costPrice': details?.productName?.price,
              'totalPrice': (details?.distributingStock)*(details?.productName?.price),
              'distributingStock': details?.distributingStock,
              'batchNo': details?.batchNo
            }
            this.detailId = details?.id;
            this.distributionToFarmerDetails.set(product?.id,product);
          })
          if (this.distributionToFarmerDetails?.size > 0) {
            this.distributionToFarmerDetailComponent.reload(this.distributionToFarmerDetails);
            this.showDistrbutionToFarmerDetails = true;
          }
        });
    }
  }


  changeSubCategory=(event:any)=>{
    this.unit = event?.unit?.name;
    this.costPrice = event?.price;
    this.getUnitAndStock(event);
  }
  onWarehouseChange=(event)=>{
    this.category= "";
    this.subCategory= "";
  }

  onMobileUserChange=(event)=>{
    this.category= "";
    this.subCategory= "";
  }


  getUnitAndStock = (event: any) => {
    let warehouseCriteria = {
      key: 'warehouse',
      operation: ':',
      value: this.selectedWarehouse?.id,
    };

    let mobileUserCriteria = {
      key: 'mobileUser',
      operation: ':',
      value: this.selectedMobileUser?.id,
    };

    let productCriteria = {
      key: 'product',
      operation: ':',
      value: event?.id,
    };

    if (this.distributionToFarmerForm?.value?.stockType == true) {
      let criterias = [warehouseCriteria, productCriteria];
      this.warehouseService.getWarehouseStock(criterias).subscribe((data) => {
        if (data) {
          this.availableStocks = data?.goodQty;
          this.isAvailable= true;

        } else {
          this.availableStocks = 0;
        }
      });
    } else {
      let criterias = [mobileUserCriteria, productCriteria];
      this.distributionToMobileUserService
        .getMobileUserStock(criterias)
        .subscribe((data) => {
          if (data) {
            this.availableStocks = data.quantity;
            this.isAvailable = true;
          } else {
            // this.availableStocks = 0;
            // this.subCategory = null;
            // this.unit = null;
          }
        });
    }

  };

  setTotalPrice = () => {
    this.totalPrice = Number(this.costPrice) * Number(this.distributingStock);
  };

  getSeasons = () => {
    this.seasonService.getAllSeasons().subscribe((data: any[]) => {
      this.seasons = data;
    });
  };

  getWarehouses = () => {
    this.warehouseService.getAllWarehouse().subscribe((data: any[]) => {
      this.warehouses = data;
    });
  };

  getTaluks = () => {
    this.talukService.getAllTaluk().subscribe((data: any[]) => {
      this.taluks = data;
    });
  };

  getVillages = () => {
    this.locationService.getAllVillages().subscribe((data: any[]) => {
      this.villages = data;
    });
  };

  getMobileUsers = () => {
    this.mobileUserService.getAllMobileUser().subscribe((data: any[]) => {
      this.mobileUsers = data;
    });
  };


  getFarmers = () => {
    let filter = [
      {
        key: 'isDeleted',
        operation: ':',
        value: false,
      },
    ];
    this.farmerService.getAllFarmer(filter).subscribe((data: any[]) => {
      this.farmers = data;
    });
  };

  getCategory = () => {
    this.subCategoryService.getAllCategories().subscribe((data: any[]) => {
      this.categories = data;
    });
  };
  //product information
  addProductInformation = () => {
    if(this.editCall){
      // this.distributionToFarmerDetails.delete(this.detailId);
      this.editCall = false;
    }else{
      this.detailId = "temp"+ Guid.create();
    }
    let product = {
      category: this.category,
      productName: this.subCategory,
      unit: this.unit,
      availableStock: this.availableStocks as number,
      distributingStock: this.distributingStock as number,
      costPrice: this.costPrice as number,
      totalPrice: this.totalPrice as number,
      batchNo: this.batchNo,
      id: this.detailId as string
    };
    if (
      this.distributingStock <= this.availableStocks &&
      this.distributingStock > 0
    ) {
      this.distributionToFarmerDetails.set(product?.id,product);
      this.setDistributionToFarmerDetail();
      this.isAvailable=false;
      this.showDistrbutionToFarmerDetails = true;
      this.distributionToFarmerDetailComponent.reload(this.distributionToFarmerDetails);
    }
  };


  changeStock(){
    this.selectedMobileUser= null;
    this.selectedWarehouse= null;
  }
  changeFarmer(){
    this.selectedTaluk= null;
    this.selectedFarmer= null;
    this.selectedVillage = null;
    this.distributionToFarmerForm.patchValue({
       farmerName :"",
       mobileNumber:""
    });
  }

  save = () => {
    this.isSubmit = true;
    // this.villageMultiSelectComponent.formInvalid();
    // this.seasonMultiSelectComponent.formInvalid();
    // if (this.distributionToFarmerForm?.value?.stockType==true) {
    //   this.wareHouseMultiSelectComponent.formInvalid();
    // }
    // else  {
    //   this.mobileUserMultiSelectComponent.formInvalid();
    // }
    // if(this.distributionToFarmerForm?.value?.farmerType==true){
    //   this.talukMultiSelectComponent.formInvalid();
    //   this.farmerMultiSelectComponent.formInvalid();
    // }
     this.distributionToFarmerForm.patchValue({
      season:this.selectedSeason,
      taluk:this.selectedTaluk,
      village:this.selectedVillage,
      farmer:this.selectedFarmer,
      warehouse:this.selectedWarehouse,
      mobileUser:this.selectedMobileUser,
    });
    if (
      this.distributionToFarmerForm.valid &&
      (this.selectedWarehouse!=null||this.selectedMobileUser!=null)&&
      this.distributionToFarmerDetails.size > 0) {
      let data = this.distributionToFarmerForm.value;
      if(!!this.id) { data["id"]=this.id; }
      if (data?.date != null)
        data.date = this.datepipe.transform(
          this.distributionToFarmerForm?.value?.date,
          'MM/dd/yyyy'
        );
        let arr = Array.from(this.distributionToFarmerDetails?.values());
        arr.map((obj)=>{if(obj?.id.substring(0, 4) == 'temp'){obj.id = null}});
        data["distributionToFarmerDetails"] = arr;
      this.distributionToFarmerService
        .addDistributionToFarmer(data)
        .subscribe(() => {
          if(this.delArr?.length > 0){
            this.delArr.forEach((id)=>{
              this.distributionToFarmerService.deleteDetail(id).toPromise().then(()=>{});
            })
          }
          this.responseModalService.OpenStatusModal(
            this.appConfiguration.successIconUrl,
            'Distribution to Farmer Added',
            'Your information has been saved successfully!'
          );
          this.router.navigate(['inventory/distribution-to-farmer/']);
        });
    } else {
      this.distributionToFarmerForm.markAllAsTouched();
    }
  };

  //get value from table row


  //set value from table to input while editing
  setDistributionToFarmerDetail = (
    category = '',
    subCategory = '',
    unit = '',
    availableStock = 0,
    distributingStock = 0,
    costPrice = 0,
    totalPrice = 0,
    batchNo = '',
    detailId = ''
  ) => {
    this.category = category;
    this.subCategory = subCategory;
    this.unit = unit;
    this.availableStocks = availableStock;
    this.distributingStock = distributingStock;
    this.costPrice = costPrice;
    this.totalPrice = totalPrice;
    this.batchNo = batchNo;
    this.detailId = detailId
  };

  edit=(rowId:string)=>{
    this.setDistributionToFarmerDetail();
    let selectedObj = this.distributionToFarmerDetails.get(rowId);
    if(selectedObj){
      this.editCall = true;
      this.setDistributionToFarmerDetail(
        selectedObj?.category,
        selectedObj?.productName,
        selectedObj?.unit,
        selectedObj?.availableStocks as number,
        selectedObj?.distributingStock  as number,
        selectedObj?.costPrice as number,
        selectedObj?.totalPrice as number,
        selectedObj?.batchNo,
        selectedObj?.id
      );
    }
  }

  deleteConfirm = (rowId) => {
    if(rowId.substring(0, 4) == 'temp'){}else{this.delArr.push(rowId)}
    this.distributionToFarmerDetails.delete(rowId);
    this.distributionToFarmerDetailComponent.reload(this.distributionToFarmerDetails);
  };

  cancel = () => {
    this.router.navigate(['inventory/distribution-to-farmer/']);
  };

  clear(){
    this.setDistributionToFarmerDetail();
  }

  //fet the form controls obj
  get basic() {
    return this.distributionToFarmerForm.controls;
  }

  //For search filter in dropdown
  public objectComparisonFunction = function (option, value): boolean {
    return option.id === value.id;
  };
}

// edit = (row: any) => {
//   this.setDistributionToFarmerDetail(row?.category, row?.productName, row?.unit?.name, row?.availableStock, row?.distributingStock, row?.productName?.price, row?.totalPrice, row?.batchNo);
//   this.deleteConfirm(row?.index);
// };

// deleteConfirm = (index) => {
//   this.distributionToFarmerDetails.splice(index, 1);
//   this.distributionToFarmerDetailComponent.reload(this.distributionToFarmerDetails);
// };
