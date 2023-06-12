import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { SubCategoryService } from 'src/app/components/master/farm-input/sub-category/sub-category.service';
import { FarmerService } from 'src/app/components/master/farmer/farmer.service';
import { TalukService } from 'src/app/components/master/location/taluk/taluk.service';
import { VillageService } from 'src/app/components/master/location/village/village.service';
import { SeasonService } from 'src/app/components/master/season/season.service';
import { WarehouseService } from 'src/app/components/master/warehouse/warehouse.service';
import { MobileUserService } from 'src/app/components/settings/mobile-user/mobile-user.service';
import { MultiSelectComponent } from '../../../../common/multi-select/multi-select.component';
import { ProductReturnFarmerDetailComponent } from '../product-return-farmer-detail/product-return-farmer-detail.component';
import { ProductReturnFarmerService } from '../product-return-farmer.service';

@Component({
  selector: 'app-product-return-farmer-add',
  templateUrl: './product-return-farmer-add.component.html',
  styleUrls: ['./product-return-farmer-add.component.scss']
})
export class ProductReturnFarmerAddComponent implements OnInit {
  productReturnFarmerForm : FormGroup;
  public datatrigger: EventEmitter<any> = new EventEmitter();
  @ViewChild('villageMultiSelect', { static: false }) villageMultiSelectComponent: MultiSelectComponent;
  @ViewChild('warehouseMultiSelect', { static: false }) warehouseMultiSelectComponent: MultiSelectComponent;
  @ViewChild('seasonMultiSelect', { static: false }) seasonMultiSelectComponent: MultiSelectComponent;
  @ViewChild('farmerMultiSelect', { static: false }) farmerMultiSelectComponent: MultiSelectComponent;
  @ViewChild('talukMultiSelect', { static: false }) talukMultiSelectComponent: MultiSelectComponent;
  @ViewChild('mobileUserMultiSelect', { static: false }) mobileUserMultiSelectComponent: MultiSelectComponent;
  @ViewChild('productReturnFarmerDetail', { static: false }) productReturnFarmerDetailComponent: ProductReturnFarmerDetailComponent;
  isSubmit: boolean = false;
  productReturnFarmerDetails: any = [];
  warehouses: any=[];
  villages: any=[];
  groups : any=[];
  seasons: any=[];
  farmers: any=[];
  taluks: any=[];
  mobileUsers: any=[];
  categories: any=[];
  subCategories:any = [];
  selectedSeason: any={};
  selectedFarmer: any={};
  selectedWarehouse: any={};
  selectedMobileUser: any={};
  selectedVillage: any={};
  selectedTaluk: any={};
  showProductReturnFarmerDetails: boolean = false;
  isStock = true;
  isFarmerRegistered = true;
  id: string;
  detailId: string='';

  category: any = {};
  subCategory: any = {};
  unit: string = "";
  returnQuantity: number = 0;

  None:any=[{'name':'None'}]

  constructor(public formBuilder: FormBuilder,
    private farmerService: FarmerService ,
    private router: Router,
    private responseModalService : ResponseModalService,
    private mobileUserService : MobileUserService,
    private subCategoryService: SubCategoryService,
    private productReturnFarmerService :ProductReturnFarmerService,
    private seasonService: SeasonService,
    private warehouseService: WarehouseService,
    private villageService: VillageService,
    private talukService: TalukService,
    private datepipe : DatePipe,
    private appConfiguration: AppConfiguration,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.setFormValue();
    this.getMobileUsers();
    this.getWarehouses();
    this.getFarmers();
    this.getSeasons();
    this.getVillages();
    this.getTaluks();
    this.getCategory();
    this.getValueById();
  }


  setFormValue = (
    date="",
    warehouse="",
    season="",
    village="",
    farmer="",
    taluk="",
    mobileuser="",
    farmerName="",
    mobileNumber="",
    isCreate = true) => {
    this.productReturnFarmerForm = this.formBuilder.group({
      date:[date, [Validators.required]],
      warehouse:[warehouse],
      season:[season, [Validators.required]],
      village:[village, [Validators.required]],
      farmer:[farmer],
      taluk:[taluk],
      stockType:[this.productReturnFarmerForm?.value?.stockType],
      mobileuser:[mobileuser],
      farmerType:[this.productReturnFarmerForm?.value?.farmerType],
      farmerName:[farmerName],
      mobileNumber:[mobileNumber]
    });
  if(isCreate==true){
    this.productReturnFarmerForm.controls.stockType.setValue(true);
    this.productReturnFarmerForm.controls.farmerType.setValue(true);
    this.productReturnFarmerForm.controls.date.setValue(new Date());
  }
  };

  getValueById = () =>{
    this.id = this.route.snapshot.params.id;
    if (!!this.id) {
      this.productReturnFarmerService.getById(this.id).subscribe((data:any) => {
         this.selectedFarmer = data?.farmer;
         this.selectedSeason = data?.season;
         this.selectedTaluk = data?.taluk;
         this.selectedVillage = data?.village;
         this.selectedWarehouse = data?.warehouse;
          this.productReturnFarmerForm = this.formBuilder.group({
            date: [new Date(data?.date)],
            warehouse:[this.selectedWarehouse],
            season:[this.selectedSeason],
            farmer:[this.selectedFarmer],
            village:[this.selectedVillage],
            taluk:[this.selectedTaluk],
            farmerName:[data?.farmerName],
            mobileNumber:[data?.mobileNumber],
            stockType:[data?.stockType],
            farmerType:[data?.farmerType],
          });
          data?.productReturnFarmerDetails?.forEach((details, index)=>{
            let product={
              'id':details?.id,
              'category':details?.productName?.category,
              'productName':details?.productName,
              'unit':details?.productName?.unit,
              'quantity': details?.quantity
            }
            this.detailId = details?.id;
            this.productReturnFarmerDetails.push(product);
            if (data?.productReturnFarmerDetails != null) {
              this.datatrigger.emit(this.productReturnFarmerDetails);
              this.showProductReturnFarmerDetails = true;
            }
          })
        });
    }

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

  getWarehouses=() =>{
    this.warehouseService.getAllWarehouse().subscribe((data:any[]) =>{
      this.warehouses = data;
    });
  }

  getVillages=() =>{
    this.villageService.getAllVillages().subscribe((data:any[]) =>{
      this.villages = data;
    });
  }

  getSeasons=() =>{
    this.seasonService.getAllSeasons().subscribe((data:any[]) =>{
      this.seasons = data;
    });
  }

  getMobileUsers=() =>{
    this.mobileUserService.getAllMobileUser().subscribe((data:any[]) =>{
      this.mobileUsers = data;
    });
  }

  getTaluks=() =>{
    this.talukService.getAllTaluk().subscribe((data:any[]) =>{
      this.taluks = data;
    });
  }


  getCategory = () =>{
    this.subCategoryService.getAllCategories().subscribe((data: any[])=>{
      this.categories = data;
    });
  }

  getUnitAndStock = (event: any) => {
    this.unit = event?.unit?.name;
  };


  getProductByCategory = (event: any) => {
    this.subCategory={};
    this.subCategories=[];
    this.subCategoryService.getProductByCategory(event?.id).subscribe((data: any[]) => {
      this.subCategories = data;
    });
  }

  // toggleStock = (e) => {
  //   if (e.target.checked) {
  //     this.isStock = true;
  //   } else {
  //     this.isStock = false;
  //   }
  // };

  // toggleFarmer = (e) => {
  //   if (e.target.checked) {
  //     this.isFarmerRegistered = true;
  //   } else {
  //     this.isFarmerRegistered = false;
  //   }
  // };

  changeStock(){
    this.selectedMobileUser={};
    this.selectedWarehouse={};
  }
  changeFarmer(){
    this.selectedTaluk={};
    this.selectedFarmer={};
    this.productReturnFarmerForm.controls.farmerName.setValue("");
    this.productReturnFarmerForm.controls.mobileNumber.setValue("");
  }


  save = () => {
    this.isSubmit = true;
    this.villageMultiSelectComponent.formInvalid();
    this.seasonMultiSelectComponent.formInvalid();
    if (this.productReturnFarmerForm?.value?.stockType) {
      this.warehouseMultiSelectComponent.formInvalid();
    }
    else {
      this.mobileUserMultiSelectComponent.formInvalid();
    }
    if (this.productReturnFarmerForm?.value?.farmerType==true) {
      this.talukMultiSelectComponent.formInvalid();
      this.farmerMultiSelectComponent.formInvalid();
    }
    this.setFormValue(
      this.productReturnFarmerForm?.value?.date,
      this.selectedWarehouse,this.selectedSeason,
      this.selectedVillage,this.selectedFarmer,
      this.selectedTaluk,
      this.selectedMobileUser,
      this.productReturnFarmerForm?.value?.farmerName,
      this.productReturnFarmerForm?.value?.mobileNumber,
      false);
    if (
      this.productReturnFarmerForm.valid &&(this.selectedWarehouse!=null||this.selectedMobileUser!=null)&&
      this.productReturnFarmerDetails.length > 0
    ) {
      let data = this.productReturnFarmerForm.value;
      if(!!this.id) { data["id"]=this.id; }
      if (data.date != null)
        data.date = this.datepipe.transform(this.productReturnFarmerForm?.value?.date, "MM/dd/yyyy");
      data["productReturnFarmerDetails"] = this.productReturnFarmerDetails;
      this.productReturnFarmerService.addProductReturnFarmer(data).subscribe(() => {
        this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
          'Product Return Farmer Added', 'Your information has been saved successfully!');
        this.router.navigate(['inventory/product-return-farmer/']);
      });
    } else {
      this.productReturnFarmerForm.markAllAsTouched();
    }
  }

  cancel = () =>{
    this.router.navigate(['inventory/product-return-farmer/']);
  }
  edit = (row: any) => {
    this.getProductByCategory(row?.productName?.category);
    this.setProductReturnFarmerDetail(row?.category, row?.productName, row?.unit, row?.quantity);
    this.deleteConfirm(row?.index);
  }

  //detail data
  setProductReturnFarmerDetail = (category="" , subCategory = "", unit = "" , returnQuantity = 0, detailId = this.detailId) =>{
    this.category = category;
    this.subCategory = subCategory;
    this.unit = unit;
    this.returnQuantity = returnQuantity;
    this.detailId = detailId;
  }
  deleteConfirm = (index) => {
    this.productReturnFarmerDetails.splice(index, 1);
    this.productReturnFarmerDetailComponent.reload(this.productReturnFarmerDetails);
  }
  //loan disbursement information
  addProductReturnFarmerInformation = () =>{
    let productList = {
      'category': this.category,
      'productName': this.subCategory,
      'unit': this.unit,
      'quantity': this.returnQuantity,
      'id': this.detailId
    }
    this.setProductReturnFarmerDetail();
    this.productReturnFarmerDetails.push(productList);
    this.showProductReturnFarmerDetails = true;
    this.productReturnFarmerDetailComponent.reload(this.productReturnFarmerDetails);
    };

    get basic() {
      return this.productReturnFarmerForm.controls;
    }
}
