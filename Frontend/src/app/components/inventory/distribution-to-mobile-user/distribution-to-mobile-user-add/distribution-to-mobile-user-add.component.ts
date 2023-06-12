import { ChangeDetectorRef, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SeasonService } from 'src/app/components/master/season/season.service';
import { WarehouseService } from 'src/app/components/master/warehouse/warehouse.service';
import { MobileUserService } from '../../../settings/mobile-user/mobile-user.service';
import { CropService } from '../../../master/product/crop/crop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { DistributionToMobileUserService } from '../distribution-to-mobile-user.service';
import { SubCategoryService } from '../../../master/farm-input/sub-category/sub-category.service';
import { GroupService } from '../../../settings/group/group.service';
import { DatePipe } from '@angular/common';
import { MultiSelectComponent } from 'src/app/common/multi-select/multi-select.component';
import { DistributionToMobileUserDetailsComponent } from '../distribution-to-mobile-user-details/distribution-to-mobile-user-details.component';
import { Guid } from 'guid-typescript';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-distribution-to-mobile-user-add',
  templateUrl: './distribution-to-mobile-user-add.component.html',
  styleUrls: ['./distribution-to-mobile-user-add.component.scss'],
})
export class DistributionToMobileUserAddComponent implements OnInit {
  public datatrigger: EventEmitter<any> = new EventEmitter();
  @ViewChild('warehouseMultiSelect', { static: false }) wareHouseMultiSelectComponent: MultiSelectComponent;
  @ViewChild('mobileUserMultiSelect', { static: false }) mobileUserMultiSelectComponent: MultiSelectComponent;
  @ViewChild('seasonMultiSelect', { static: false }) seasonMultiSelectComponent: MultiSelectComponent;
  @ViewChild('groupMultiSelect', { static: false }) groupMultiSelectComponent: MultiSelectComponent;
  @ViewChild('distributionToMobileUserDetailsTab', { static: false }) DistributionToMobileUserDetailsComponent: DistributionToMobileUserDetailsComponent;
  isSubmit: boolean = false;
  isAvailable: boolean = false;
  distributionToMobileUserForm: FormGroup;
  seasons: any=[];
  warehouses: any=[];
  subCategories = [];
  mobileUsers: any=[];
  crops: any=[];
  warehouse: any;
  categories:any=[];
  groups: any=[];
  detailSubmit:boolean=false;
  distributionToMobileUserDetails: Map<any,any> = new Map();
  showDistributionToMobileUserDetails: boolean = false;
  category:any={};
  product: any = {};
  unit: string = '';
  batchNo: string = '';
  unitPrice: number = 0;
  availableStocks: number = 0;
  distributingStockMobileUser: number = 0;
  selectedWarehouse: any;
  selectedSeason: any;
  selectedMobileUser: any;
  selectedGroupName: any;
  editcall:boolean = false;
  delArr:any = [];
  id: string;
  detailId: string;
  distributionToMobileUserData: any = {};

  None:any[]=[{'name':'None'}]

  constructor(
    public formBuilder: FormBuilder,
    private seasonService: SeasonService,
    private warehouseService: WarehouseService,
    private mobileUserService: MobileUserService,
    private cropService: CropService,
    private router: Router,
    private responseModalService: ResponseModalService,
    private appConfiguration: AppConfiguration,
    private distributionToMobileUserService: DistributionToMobileUserService,
    private subCategoryService: SubCategoryService,
    private groupService: GroupService,
    public datepipe: DatePipe,
    private route: ActivatedRoute,
    private cdref: ChangeDetectorRef

  ) {}

  ngOnInit() {
    this.distributionToMobileUserForm = this.formBuilder.group({
      season: ["", [Validators.required]],
      warehouse: ["", [Validators.required]],
      mobileUser: ["", [Validators.required]],
      groupName: ["", [Validators.required]],
      date:["", [Validators.required]]
    });
    // this.setFormValue();
    this.getSeasons();
    this.getWarehouses();
    this.getCrops();
    this.getCategory();
    this.getMobileUsers();
    this.getGroup();
    this.getValueById();
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  setFormValue = (
    season = '',
    warehouse = '',
    mobileUser = '',
    groupName = '',
    date = ''
  ) => {
    this.distributionToMobileUserForm.patchValue({
      season: season,
      warehouse: warehouse,
      mobileUser: mobileUser,
      groupName: groupName,
      date:new Date(date)
    });
  };

  getValueById(){
    this.id = this.route.snapshot.params.id;
    if (!!this.id) {
      this.distributionToMobileUserService.getById(this.id).subscribe((data:any) => {
        this.selectedGroupName= data?.groupName;
        this.selectedMobileUser= data?.mobileUser;
        this.selectedSeason = data?.season;
        this.selectedWarehouse = data?.warehouse;
        this.setFormValue(this.selectedSeason,this.selectedWarehouse,this.selectedMobileUser,this.selectedGroupName,data?.date)
       data?.distributionToMobileUserDetails?.forEach((details, index)=>{
            let product={
              'id':details?.id,
              'category':details?.product?.category,
              'product':details?.product,
              'availableStock':details?.availableStock,
              'unit':details?.product?.unit,
              'pricePerUnit': details?.product?.price,
              'distributionQuantity': details?.distributionQuantity,
              'batchNo': details?.batchNo
            }
            this.detailId = details?.id;
            this.distributionToMobileUserDetails.set(product?.id,product);
          })
          if (this.distributionToMobileUserDetails != null && this.distributionToMobileUserDetails.size > 0) {
            this.DistributionToMobileUserDetailsComponent.reload(this.distributionToMobileUserDetails);
            this.showDistributionToMobileUserDetails = true;
          }
        });
    }
  }

  getProductByCategory = (event: any) => {
    this.product={}
    this.subCategories=[];
    this.subCategoryService
      .getProductByCategory(event?.id)
      .subscribe((data: any[]) => {
        this.subCategories = data;
      });
  };

  changeSubCategory = (event: any) => {
    this.unit = event?.unit?.name;
    this.unitPrice = event?.price;
    this.getUnitAndStock(event);
  }

  onWarehouseChange=(event)=>{
   this.category={};
   this.product={};


  }

  getUnitAndStock = (event: any) => {
    let warehouseCriteria = {
      key: 'warehouse',
      operation: ':',
      value: this.selectedWarehouse?.id,
    };
    let productCriteria = {
      key: 'product',
      operation: ':',
      value: event?.id,
    };
    let criterias = [warehouseCriteria, productCriteria];
    this.warehouseService.getWarehouseStock(criterias).subscribe((data) => {
      if (data) {
        this.availableStocks = data.goodQty;
        this.isAvailable = true;
      } else {
        this.availableStocks = 0;
        // this.product=null;
        // this.unit=null;
      }
    });
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

  getCrops = () => {
    this.cropService.getAllCrops().then((data: any[]) => {
      this.crops = data;
    });
  };

  getCategory = () => {
    this.subCategoryService.getAllCategories().subscribe((data: any[]) => {
      this.categories = data;
    });
  };

  getMobileUsers = () => {
    this.mobileUserService.getAllMobileUser().subscribe((data: any[]) => {
      this.mobileUsers = data;
    });
  };

  getGroup = () => {
    this.groupService.getAllGroup().subscribe((data: any[]) => {
      this.groups = data;
    });
  };

  save = () => {
    this.isSubmit = true;
    this.wareHouseMultiSelectComponent.formInvalid();
    this.seasonMultiSelectComponent.formInvalid();
    this.mobileUserMultiSelectComponent.formInvalid();
    this.groupMultiSelectComponent.formInvalid();
    this.setFormValue(
      this.selectedSeason,
      this.selectedWarehouse,
      this.selectedMobileUser,
      this.selectedGroupName,
      this.distributionToMobileUserForm?.value?.date
    );
    if (
      this.distributionToMobileUserForm.valid &&
      this.distributionToMobileUserDetails.size > 0
    ) {
      let data = this.distributionToMobileUserForm.value;
      if(!!this.id) { data["id"]=this.id; }
      let arr = Array.from(this.distributionToMobileUserDetails?.values());
      arr.map((obj)=>{if(obj?.id.substring(0, 4) == 'temp'){obj.id = null}});
      data["distributionToMobileUserDetails"] = arr;
      if (data?.date != null)
        data.date = this.datepipe.transform(
          this.distributionToMobileUserForm?.value?.date,
          'MM/dd/yyyy'
        );
      this.distributionToMobileUserService
        .addDistributionToMobileUser(data)
        .subscribe(() => {
          if(this.delArr?.length > 0){
            this.delArr.forEach((id)=>{
              this.distributionToMobileUserService.deleteDetail(id).toPromise().then((data)=>{});
            })
          }
          this.responseModalService.OpenStatusModal(
            this.appConfiguration.successIconUrl,
            'DistributionToMobileUser Added',
            'Your information has been saved successfully!'
          );
          this.cancel();
        });
    } else {
      this.distributionToMobileUserForm.markAllAsTouched();
    }
  };

  cancel = () => {
    this.router.navigate(['inventory/distribution-to-mobile-user']);
  };
  clear(){
    this.setDistributionToMobileUserDetails();
  }

  edit(rowId){
   let selectedObj = this.distributionToMobileUserDetails.get(rowId);
   this.setDistributionToMobileUserDetails();
   if(selectedObj){
    this.editcall=true;
    this.setDistributionToMobileUserDetails(
      selectedObj?.category,
      selectedObj?.product,
      selectedObj?.availableStock,
      selectedObj?.unit,
      selectedObj?.unitPrice,
      selectedObj?.distributionQuantity,
      selectedObj?.batchNo,
      selectedObj?.id
      )
    }
  }

  deleteConfirm = (rowId:string) => {
    if(rowId.substring(0, 4) == 'temp'){}else{
      this.delArr.push(rowId);
    }
    this.distributionToMobileUserDetails.delete(rowId);
    this.DistributionToMobileUserDetailsComponent.reload(this.distributionToMobileUserDetails);
  };



  //detail data
  setDistributionToMobileUserDetails = (
    category = '',
    product = '',
    availableStock = 0,
    unit = '',
    unitPrice = 0,
    distributionQuantity = 0,
    batchNo = '',
    detailId = this.detailId
  ) => {
    this.category = category;
    this.product = product;
    this.availableStocks = availableStock as number;
    this.unit = unit;
    this.unitPrice = unitPrice as number;
    this.distributingStockMobileUser = distributionQuantity as number;
    this.batchNo = batchNo;
    this.detailId = detailId;
  };

  //mobile user information
  addDistributionToMobileUserInformation = () => {
    if(this.editcall){
      // this.distributionToMobileUserDetails.delete(this.detailId);
      this.editcall = false;
    }else{
      this.detailId = "temp"+ Guid.create();
    }
    let product = {
      category: this.category,
      product: this.product,
      availableStock: this.availableStocks,
      unit: this.unit,
      pricePerUnit: this.unitPrice,
      distributionQuantity: this.distributingStockMobileUser,
      batchNo: this.batchNo,
      id: this.detailId
    };
    if (
      (this.distributingStockMobileUser <= this.availableStocks||
      this.distributingStockMobileUser > 0) &&  this.availableStocks>0
    )
    {
      this.setDistributionToMobileUserDetails();
       this.distributionToMobileUserDetails.set(product?.id,product);
      this.isAvailable=false;
      this.showDistributionToMobileUserDetails = true;
      this.DistributionToMobileUserDetailsComponent.reload(this.distributionToMobileUserDetails);
    }
  };

  public objectComparisonFunction = function (option, value): boolean {
    return option.id === value.id;
  };

  get basic() {
    return this.distributionToMobileUserForm.controls;
  }

}

// deleteConfirm = (index) => {
//   this.distributionToMobileUserDetails.splice(index, 1);
//   this.DistributionToMobileUserDetailsComponent.reload(this.distributionToMobileUserDetails);
// };

// edit = (row: any) => {
//   this.getProductByCategory(row?.category);
//   this.setDistributionToMobileUserDetails(
//     row?.category,
//     row?.product,
//     row?.availableStock,
//     row?.product?.unit?.name,
//     row?.product?.price,
//     row?.distributionQuantity,
//     row?.batchNo,
//   );
//   this.deleteConfirm(row?.index);
// };
