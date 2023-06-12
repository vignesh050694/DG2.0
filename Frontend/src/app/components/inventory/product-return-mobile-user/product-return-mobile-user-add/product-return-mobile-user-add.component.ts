import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, ReplaySubject } from 'rxjs';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { SubCategoryService } from 'src/app/components/master/farm-input/sub-category/sub-category.service';
import { FarmerService } from 'src/app/components/master/farmer/farmer.service';
import { SeasonService } from 'src/app/components/master/season/season.service';
import { WarehouseService } from 'src/app/components/master/warehouse/warehouse.service';
import { GroupService } from 'src/app/components/settings/group/group.service';
import { MobileUserService } from 'src/app/components/settings/mobile-user/mobile-user.service';
import { LoanDisbursementService } from '../../loan-disbursement/loan-disbursement.service';
import { ProductReturnMobileUserService } from '../product-return-mobile-user.service';
import { DistributionToMobileUserService } from '../../distribution-to-mobile-user/distribution-to-mobile-user.service';
import { MultiSelectComponent } from 'src/app/common/multi-select/multi-select.component';
import { ProductReturnMobileUserDetailsComponent } from '../product-return-mobile-user-details/product-return-mobile-user-details.component';

@Component({
  selector: 'app-product-return-mobile-user-add',
  templateUrl: './product-return-mobile-user-add.component.html',
  styleUrls: ['./product-return-mobile-user-add.component.scss']
})
export class ProductReturnMobileUserAddComponent implements OnInit {
  public savetrigger: EventEmitter<any> = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  public detailDatatrigger: EventEmitter<any> = new EventEmitter();

  @ViewChild('groupMultiSelect', { static: false }) groupMultiSelectComponent: MultiSelectComponent;
  @ViewChild('warehouseMultiSelect', { static: false }) warehouseMultiSelectComponent: MultiSelectComponent;
  @ViewChild('seasonMultiSelect', { static: false }) seasonMultiSelectComponent: MultiSelectComponent;
  @ViewChild('mobileUserMultiSelect', { static: false }) mobileUserMultiSelectComponent: MultiSelectComponent;
  @ViewChild('productReturnMobileUserDetail', { static: false }) productReturnMobileUserDetailComponent: ProductReturnMobileUserDetailsComponent;
  productReturnMobileUserForm : FormGroup;
  productReturnMobileUserDetails: any[] = [];
  warehouses = [];
  groups = [];
  seasons = [];
  mobileUsers = [];
  categories = [];
  products = [];
  selectedSeason: any;
  selectedMobileUser: any;
  selectedWarehouse: any;
  selectedGroup: any;
  availableStocks: any = 0;
  showProductReturnMobileUserDetails: boolean = false;
  isSubmit = false;
  id : string;
  detailId : string;
  isAvailable:boolean=false;

  category: any={};
  product: any={};
  unit: string = "";
  returnStock : number = 0;

  None:any=[{'name':'None'}]

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    private responseModalService : ResponseModalService,
    private warehouseService : WarehouseService,
    private subCategoryService: SubCategoryService,
    private seasonService: SeasonService,
    private mobileUserService: MobileUserService,
    private productReturnMobileUserService : ProductReturnMobileUserService,
    private groupService: GroupService,
    private datepipe : DatePipe,
    private distributionToMobileUserService : DistributionToMobileUserService,
    private appConfiguration: AppConfiguration,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.setFormValue();
    this.getSeasons();
    this.getMobileUsers();
    this.getWarehouses();
    this.getCategory();
    this.getGroups();
    this.getValueById();
  }

  setFormValue = (season="",mobileUser="",warehouse="",groupName="") => {
    this.productReturnMobileUserForm = this.formBuilder.group({
      date: [this.productReturnMobileUserForm?.value?.date, [Validators.required]],
      season: [season, [Validators.required]],
      mobileUser: [mobileUser, [Validators.required]],
      warehouse: [warehouse,[Validators.required]],
      groupName:[groupName,[Validators.required]]
    });
  };

  getValueById = () =>{
    this.id = this.route.snapshot.params.id;
    if (!!this.id) {
      this.productReturnMobileUserService.getById(this.id).subscribe((data:any) => {
         this.selectedMobileUser = data?.mobileUser;
         this.selectedSeason = data?.season;
         this.selectedGroup = data?.groupName;
         this.selectedWarehouse = data?.warehouse;
          this.productReturnMobileUserForm = this.formBuilder.group({
            date: [new Date(data?.date)],
            warehouse:[this.selectedWarehouse],
            season:[this.selectedSeason],
            mobileUser:[this.selectedMobileUser],
            group:[this.selectedGroup],
          });
          data?.productReturnMobileUserDetails?.forEach((details, index)=>{
            let product={
              'id':details?.id,
              'category':details?.product?.category,
              'product':details?.product,
              'availableStock':details?.availableStock,
              'unit':details?.product?.unit,
              'returnStock': details?.returnStock
            }
            this.detailId = details?.id;
            this.productReturnMobileUserDetails.push(product);
            if (data?.productReturnMobileUserDetails != null) {
              this.datatrigger.emit(this.productReturnMobileUserDetails);
              this.showProductReturnMobileUserDetails = true;
            }
          })
      } );
    }
  }

  getGroups=() =>{
    this.groupService.getAllGroup().subscribe((data:any[]) =>{
      this.groups = data;
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

  getWarehouses = () =>{
    this.warehouseService.getAllWarehouse().subscribe((data: any[])=>{
      this.warehouses = data;
    });
  }
  onMobileUserChange=(event)=>{
    this.category={};
    this.product={};
  }

  getCategory = () =>{
    this.subCategoryService.getAllCategories().subscribe((data: any[])=>{
      this.categories = data;
    });
  }
  getProductByCategory = (event: any) => {
    this.subCategoryService.getProductByCategory(event?.id).subscribe((data: any[]) => {
      this.products = data;
    });
  }

  getUnitAndStock = (event: any) => {
    this.unit = event?.unit?.name;
    this.savetrigger.emit();
    let mobileUserCriteria = {
      "key": "mobileUser",
      "operation": ":",
      "value": this.selectedMobileUser?.id
    };

    let productCriteria = {
      "key": "product",
      "operation": ":",
      "value": event?.id
    };

    let criterias = [mobileUserCriteria, productCriteria];
    this.distributionToMobileUserService
        .getMobileUserStock(criterias)
        .subscribe((data) => {
          if (data) {
            this.availableStocks = data.quantity;
            this.isAvailable = true;
          } else {
            this.availableStocks = 0;
            // this.unit = null;
            // this.product = null;
          }
        });
  };

  deleteConfirm = (index) => {
    this.productReturnMobileUserDetails.splice(index, 1);
    this.productReturnMobileUserDetailComponent.reload(this.productReturnMobileUserDetails);
  }

  cancel = () =>{
    this.router.navigate(['inventory/product-return-mobile-user/']);
  }

  edit = (row: any) => {
    this.setProductReturnMobileUserDetail(row?.category, row?.product, row?.availableStock, row?.unit, row?.returnStock );
    this.deleteConfirm(row?.index);
  }

  setProductReturnMobileUserDetail = (category="" , product = "", availableStock = 0 , unit = "", returnStock=0, detailId = this.detailId) =>{
    this.category = category;
    this.product = product;
    this.availableStocks = availableStock;
    this.unit = unit;
    this.returnStock = returnStock;
    this.detailId = detailId;
  }

  addProductReturnMobileUserInformation = () =>{
      let productList = {
        category: this.category,
        product: this.product,
        availableStock: this.availableStocks,
        unit: this.unit,
        returnStock : this.returnStock,
        id: this.detailId
      }
      if(this.returnStock <= this.availableStocks && this.returnStock > 0){
        this.setProductReturnMobileUserDetail();
        this.productReturnMobileUserDetails.push(productList);
        this.isAvailable=false;
        this.showProductReturnMobileUserDetails = true;
        this.productReturnMobileUserDetailComponent.reload(this.productReturnMobileUserDetails);
      }
    };

  save = ()=>{
    this.isSubmit = true;
    this.groupMultiSelectComponent.formInvalid();
    this.seasonMultiSelectComponent.formInvalid();
    this.warehouseMultiSelectComponent.formInvalid();
    this.mobileUserMultiSelectComponent.formInvalid();
    this.setFormValue(this.selectedSeason,this.selectedMobileUser,this.selectedWarehouse,this.selectedGroup);
    if (this.productReturnMobileUserForm.valid && this.productReturnMobileUserDetails.length > 0) {
      let data = this.productReturnMobileUserForm.value;
      if(!!this.id) { data["id"]=this.id; }
      if (data.date != null)
        data["date"] = this.datepipe.transform(this.productReturnMobileUserForm?.value?.date, "MM/dd/yyyy");
      data["productReturnMobileUserDetails"] = this.productReturnMobileUserDetails;
      this.productReturnMobileUserService.addProductReturnMobileUser(data).subscribe(() => {
        this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
          'Product Return to Mobile User Added', 'Your information has been saved successfully!');
            this.cancel();
       });
    } else {
      this.productReturnMobileUserForm.markAllAsTouched();
    }
  }
  get basic() {
    return this.productReturnMobileUserForm.controls;
  }
}
