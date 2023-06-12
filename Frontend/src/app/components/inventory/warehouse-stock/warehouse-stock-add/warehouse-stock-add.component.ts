import { DatePipe } from '@angular/common';
import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { ChangeDetectorRef, EventEmitter, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { trimValidator } from 'src/app/common/trim.validator';
import { CategoryService } from 'src/app/components/master/farm-input/category/category.service';
import { SubCategoryService } from 'src/app/components/master/farm-input/sub-category/sub-category.service';
import { SeasonService } from 'src/app/components/master/season/season.service';
import { VendorService } from 'src/app/components/master/vendor/vendor.service';
import { WarehouseService } from 'src/app/components/master/warehouse/warehouse.service';
import { AppConfiguration } from '../../../../common/App.configuration';
import { MultiSelectComponent } from '../../../../common/multi-select/multi-select.component';
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { WarehouseStockTableComponent } from '../warehouse-stock-table/warehouse-stock-table.component';
import { WarhouseStockService } from '../warhouse-stock.service';
import { Guid } from 'guid-typescript';


@Component({
  selector: 'app-warehouse-stock-add',
  templateUrl: './warehouse-stock-add.component.html',
  styleUrls: ['./warehouse-stock-add.component.scss']
})
export class WarehouseStockAddComponent implements OnInit {
  // public datatrigger: EventEmitter<any> = new EventEmitter();
  @ViewChild('wareHouseMultiSelect', { static: false }) wareHouseMultiSelectComponent: MultiSelectComponent;
  @ViewChild('vendorMultiSelect', { static: false }) vendorMultiSelectComponent: MultiSelectComponent;
  @ViewChild('seasonMultiSelect', { static: false }) seasonMultiSelectComponent: MultiSelectComponent;
  @ViewChild('warehouseStockTable', { static: false }) warehouseStockTableComponent: WarehouseStockTableComponent;
  warehouseStockForm: FormGroup;
  productDetails:Map<any,any>= new Map();
  seasons = [];
  warehouses = [];
  vendors = [];
  categories = [];
  subCategories = [];
  varieties = [];
  availableStock: number = 0;
  showProductDetails: boolean = false;
  category: any ={};
  subCategory: any = {};
  unit: string = "" ;
  currentStock: number = 0;
  goodQuantity: number = 0;
  damagedQuantity: number = 0;
  totalQuantity: number = 0;
  None:any=[{'name':'None'}];
  selectedVendor: any = null;
  warehouseStockDetails: any;;
  selectedSeason: any = null;
  selectedWarehouse: any = null;
  isSubmit: boolean = false;
  id: string;
  detailId: string;
  warehouseStockData: any = {};
  editData:any;
  editcall:boolean = false;
  tempId: string;
  delArr:any =[];
  constructor(
    public formBuilder: FormBuilder,
    private warehouseService: WarehouseService,
    private vendorService: VendorService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private seasonService: SeasonService,
    private router: Router,
    private warhouseStockService: WarhouseStockService,
    public datepipe: DatePipe,
    private responseModalService: ResponseModalService,
    private appConfiguration: AppConfiguration,
    private route : ActivatedRoute,
    private cdref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.warehouseStockForm = this.formBuilder.group({
      season: ["", [Validators.required]],
      warehouse: ["", [Validators.required]],
      invoice: ["", [Validators.required]],
      vendor: ["", [Validators.required]],
      date: ["", [Validators.required]]
    })
    this.getSeasons();
    this.getWarehouses();
    this.getVendors();
    this.getCategories();
    this.getValueById();
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  setFormValue = (season = "", warehouse = "",vendor = "", invoice = "", date) => {
    this.warehouseStockForm.patchValue({
      season: season,
      warehouse: warehouse,
      vendor: vendor,
      invoice: invoice,
      date: date
    });
  };

  getValueById(){
    this.id = this.route.snapshot.params.id;
    if(!!this.id){
      this.warhouseStockService.getById(this.id).subscribe((data:any)=>{
        this.selectedSeason= data?.season;
        this.selectedVendor= data?.vendor;
        this.selectedWarehouse= data?.warehouse;
        this.setFormValue(this.selectedSeason,this.selectedWarehouse,this.selectedVendor,data?.invoice,new Date(data?.date))
        data?.warehouseStockDetails?.forEach((details, index)=>{
          let product={
            'id':details?.id,
            'category':details?.subCategory?.category,
            'subCategory':details?.subCategory,
            'unit':details?.subCategory?.unit,
            'availableStock':details?.availableStock,
            'goodQuantity':details?.goodQuantity,
            'damagedQuantity':details?.damagedQuantity,
            'totalQuantity':((details?.goodQuantity) + (details.damagedQuantity))
          }
          // this.detailId = details?.id;
          this.productDetails.set(details?.id,product);
          // this.productDetails.add(product)
        })
        if (this.productDetails?.size > 0) { this.warehouseStockTableComponent.reload(this.productDetails); this.showProductDetails = true }
      })
   }
 }

  getSeasons = () => {
    this.seasonService.getAllSeasons().subscribe((data: any[]) => {
      this.seasons = data;
    });
  }

  getWarehouses = () => {
    this.warehouseService.getAllWarehouse().subscribe((data: any[]) => {
      this.warehouses = data;
    });
  }

  getVendors = () => {
    this.vendorService.getAllVendors().subscribe((data: any[]) => {
      this.vendors = data;
    });
  }


  getCategories = () => {
    this.categoryService.getCategory(10000, 1, []).subscribe((data: any) => {
      this.categories = data.data;
    });
  }

  getProductByCategory = (id) => {
    this.subCategoryService.getProductByCategory(id).subscribe((data: any[]) => {
      this.subCategories = data;
    });
  }

  changeCategory = (event: any) =>{
    this.subCategory={}
    this.subCategories=[];
    this.getProductByCategory(event?.id);
  }
  changeSubCategory = (event: any) => {
    this.unit = event?.unit?.name;
    this.getUnitAndStock(event);
  }
  onWarehouseChange=(event)=>{
      this.category={};
      this.subCategory={};
  }

  getUnitAndStock = (event: any) => {
    let warehouseCriteria = {
      "key": "warehouse",
      "operation": ":",
      "value": this.selectedWarehouse?.id
    };

    let productCriteria = {
      "key": "product",
      "operation": ":",
      "value": event?.id
    };

    let criterias = [warehouseCriteria, productCriteria];
    this.warehouseService.getWarehouseStock(criterias).subscribe(data => {
      if (data) {
        this.currentStock = data.goodQty;
      } else {
        // this.currentStock = 0;
        // this.subCategory = null;
        // this.unit = null;
      }
    });
  };

  //stock information
  addProductInformation = () => {
    if(this.editcall){
      this.editcall = false;
      // this.productDetails.delete(this.detailId);
    }else{
      this.detailId = "temp"+ Guid.create();
    }
    let product = {
      'category': this.category,
      'subCategory': this.subCategory,
      'unit': this.unit as string,
      'currentStock': this.currentStock as number,
      'goodQuantity': this.goodQuantity as number,
      'damagedQuantity': this.damagedQuantity as number,
      'totalQuantity': this.totalQuantity as number,
      'id':this.detailId
    }
    if(this.category && this.subCategory){
    this.setWarehouseDetails();
    this.productDetails.set(product?.id,product);
    this.showProductDetails = true;
    this.warehouseStockTableComponent.reload(this.productDetails);
    }
  };



  setTotalPrice = () => {
    this.totalQuantity = Number(this.goodQuantity) + Number(this.damagedQuantity);
  };

  save = () => {
    this.isSubmit = true;
    this.wareHouseMultiSelectComponent.formInvalid();
    this.vendorMultiSelectComponent.formInvalid();
    this.seasonMultiSelectComponent.formInvalid();
    this.setFormValue(this.selectedSeason, this.selectedWarehouse,this.selectedVendor, this.warehouseStockForm.value?.invoice,this.warehouseStockForm.value?.date);
    if (this.warehouseStockForm.valid && this.productDetails.size > 0) {
      let data = this.warehouseStockForm.value;
      if(!!this.id) { data["id"]=this.id; }
      if (data.date != null)
      data.date = this.datepipe.transform(this.warehouseStockForm?.value?.date, "MM/dd/yyyy");
      let arr = Array.from(this.productDetails?.values());
      arr.map((obj)=>{if(obj?.id.substring(0, 4) == 'temp'){obj.id = null;}});
      data["warehouseStockDetails"] = arr;
      this.warhouseStockService.addWarehouseStock(data).toPromise().then(()=>{
        if(this.delArr?.length > 0){
          this.delArr.forEach((id)=>{
            this.warhouseStockService.deleteDetail(id).toPromise().then((data)=>{});
          })
        }
        this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
          'Warehouse Stock Added', 'Your information has been saved successfully!');
        this.cancel();
      });

    } else {
      this.warehouseStockForm.markAllAsTouched();
    }
  }

  cancel = () => {
    this.router.navigate(['inventory/warehouse-stock']);
  };

  clear(){
    this.setWarehouseDetails();
  }

  public objectComparisonFunction = function (option, value): boolean {
    return option.id === value.id;
  };
  get basic() {
    return this.warehouseStockForm.controls;
  }

  edit = (rowId: any) => {
    this.setWarehouseDetails();
    this.editData = this.productDetails.get(rowId);
    if (!!this.editData) {
      this.editcall=true;
      this.setWarehouseDetails(
        this.editData?.id,
        this.editData?.category,
        this.editData?.subCategory,
        this.editData?.unit as string,
        this.editData?.currentStock as number,
        this.editData?.goodQuantity as number,
        this.editData?.damagedQuantity as number,
        this.editData?.totalQuantity as number);
    }
  }

  deleteConfirm = (rowId:string) => {
    if(rowId.substring(0, 4) == 'temp'){}else{
      this.delArr.push(rowId);
    }
    this.productDetails.delete(rowId);
    this.warehouseStockTableComponent.reload(this.productDetails);
  };

  setWarehouseDetails = (
    id = null,
    category = "",
    subCategory = "",
    unit = null,
    currentStock = null,
    goodQuantity = null,
    damagedQuantity = null,
    totalQuantity = null,
    ) => {
    this.category = category;
    this.subCategory = subCategory;
    this.unit = unit;
    this.currentStock = currentStock;
    this.goodQuantity = goodQuantity;
    this.damagedQuantity = damagedQuantity;
    this.totalQuantity = totalQuantity;
    this.detailId = id;
  };



}

// findDataById(rowId) {
//   let obj = this.productDetails.find((detail, index) => {
//     if (detail.id === rowId) {
//       detail["index"] = index;
//       return detail;
//     }
//   });
//   return obj;
//   this.productDetails.get(rowId);
// }


  //stock Detail
  // setWarehouseStockDetail = (category = "", subCategory = "", unit = "", currentStock = "", goodQuantity = 0, damagedQuantity = 0, totalQuantity = 0, detailId = this.detailId) => {
  //   this.category = category;
  //   this.subCategory = subCategory;
  //   this.unit = unit;
  //   this.currentStock = currentStock;
  //   this.goodQuantity = goodQuantity;
  //   this.damagedQuantity = damagedQuantity;
  //   this.totalQuantity = totalQuantity;
  //   this.detailId = detailId;
  // }

  // deleteConfirm = (index) => {
  //   this.productDetails.splice(index, 1);
  //   this.warehouseStockTableComponent.reload(this.productDetails);
  // }

  // edit = (row: any) => {
  //   this.getProductByCategory(row?.subCategory?.category?.id);
  //   this.setWarehouseStockDetail(row?.category, row?.subCategory, row?.unit?.name, row?.currentStock, row?.goodQuantity, row?.damagedQuantity, row?.totalQuantity);
  //   this.deleteConfirm(row?.index);
  // }
