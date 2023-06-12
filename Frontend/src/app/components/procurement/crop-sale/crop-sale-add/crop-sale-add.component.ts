import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { FarmerService } from 'src/app/components/master/farmer/farmer.service';
import { FarmService } from 'src/app/components/master/farm/farm.service';
import { LocationService } from 'src/app/components/master/location/location.service';
import { CropService } from 'src/app/components/master/product/crop/crop.service';
import { ProductService } from 'src/app/components/master/product/product.service';
import { BuyerService } from 'src/app/components/master/buyer/buyer.service';
import { EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { AppConfiguration } from '../../../../common/App.configuration';
import { CropSaleService } from '../crop-sale.service';
import { DatePipe } from '@angular/common';
import { MultiSelectComponent } from 'src/app/common/multi-select/multi-select.component';
import { CropSaleProductDetailComponent } from '../crop-sale-product-detail/crop-sale-product-detail.component';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-crop-sale-add',
  templateUrl: './crop-sale-add.component.html',
  styleUrls: ['./crop-sale-add.component.scss']
})
export class CropSaleAddComponent implements OnInit {
  @ViewChild('villageMultiSelect', { static: false }) villageMultiSelectComponent: MultiSelectComponent;
  @ViewChild('farmerMultiSelect', { static: false }) farmerMultiSelectComponent: MultiSelectComponent;
  @ViewChild('farmMultiSelect', { static: false }) farmMultiSelectComponent: MultiSelectComponent;
  @ViewChild('buyerMultiSelect', { static: false }) buyerMultiSelectComponent: MultiSelectComponent;
  @ViewChild('cropSaleDetailsTab', { static: false }) cropSaleDetailsComponent: CropSaleProductDetailComponent;
  villages = [];
  farmers = [];
  farms = [];
  buyers = [];
  crops = [];
  varieties = [];
  grades = [];

  crop: any;
  variety: any;
  grade: any;
  unit: any ;
  price: number = 0;
  quantity: number = 0;
  batchNo: any;
  total: any;

  selectedFarmer: any;
  selectedFarm: any;
  selectedVillage: any;
  selectedBuyer: any;
  cropSaleForm: FormGroup;
  // productDetails: any[] = [];
  showProductDetails: boolean = false;
  id: string;
  public datatrigger: EventEmitter<any> = new EventEmitter();


  cropSaleDetails:Map<any,any>= new Map();

  protected _onDestroy = new Subject<void>();
  editData:any;
  editcall:boolean = false;
  detailId : string;
  isSubmit: boolean = false;
  delArr:any =[];

  constructor(public formBuilder: FormBuilder,
    private locationService: LocationService,
    private farmerService: FarmerService,
    private cropService: CropService,
    private productService: ProductService,
    private farmService: FarmService,
    private buyerService: BuyerService,
    private router: Router,
    private route: ActivatedRoute,
    private responseModalService: ResponseModalService,
    private appConfiguration: AppConfiguration,
    private cropSaleService: CropSaleService,
    public datepipe: DatePipe
  ) {
  }

  ngOnInit() {
    this.cropSaleForm = this.formBuilder.group({
      farmer: [""],
      farm: [""],
      village: [""],
      buyer: [""],
      date: [""]
    });
    this.getCrops();
    this.getVillages();
    this.getFarmers();
    this.getFarms();
    this.getBuyers();
    this.getValueById();
  }

  setFormValue = (village = "", farmer = "", farm = "",buyer = "", date) => {
    this.cropSaleForm.patchValue({
      village: village,
      farmer: farmer,
      farm: farm,
      buyer: buyer,
      date: date
    });
  };

  public objectComparisonFunction = function (option, value): boolean {
    return option.id === value.id;
  }

getValueById(){
  this.id = this.route.snapshot.params.id;
  if(!!this.id){
    this.cropSaleService.getById(this.id).subscribe((data:any)=>{
      this.selectedVillage= data?.village;
      this.selectedFarmer= data?.farmer;
      this.selectedFarm = data?.farm;
      this.selectedBuyer = data?.buyer;
      this.setFormValue(this.selectedVillage,this.selectedFarmer,this.selectedFarm,this.selectedBuyer,new Date(data?.date))
      data?.cropSaleDetails?.forEach((details, index)=>{
        let product={
          'id':details?.id,
          'product':details?.grade?.variety?.crop,
          'variety': details?.grade?.variety,
          'grade': details?.grade,
          'unit': details?.grade?.variety?.crop?.unit,
          'price':details?.grade?.price,
          'quantity':details?.quantity,
          'batchNo':details?.batchNo,
          'total':(details?.quantity)*(details?.grade?.price)
        }
        // this.detailId = details?.id;
        this.cropSaleDetails.set(details?.id,product);
        // this.productDetails.add(product)
      })
      if (this.cropSaleDetails?.size > 0) { this.cropSaleDetailsComponent.reload(this.cropSaleDetails); this.showProductDetails = true }
    })
 }
}

  getVillages = () => {
    this.locationService.getAllVillages().subscribe((data: any[]) => {
      this.villages = data;
    });
  }

  getFarmers = () => {
    let fitlers = [
      {
        "key": "isDeleted",
        "operation": ":",
        "value": false
      }
    ];
    this.farmerService.getAllFarmer(fitlers).subscribe((data: any[]) => {
      this.farmers = data;
    });
  };

  getFarms = () => {
    this.farmService.getAllFarm().subscribe((data: any[]) => {
      this.farms = data;
    });
  };

  getCrops = async() => {
    await this.cropService.getAllCrops().then((data: any[]) => {
      this.crops = data;
    });
  };

  getBuyers = () => {
    this.buyerService.getAllBuyers().subscribe((data: any[]) => {
      this.buyers = data
    });
  };

  async getVarietyByCrop(id: any){
    await this.productService.getVareityByCrop(id).then((data: any[]) => {
      this.varieties = data;
    });
  }

  async getGradeByVariety(id: string) {
   await this.productService.getGradeByVariety(id).then((data: any[]) => {
      this.grades = data;
    });
  }

  changeCrop = (event) => {
    if (!!event) {
      this.getVarietyByCrop(event?.id);
      this.unit = event?.unit?.name;
    }
  }

  changeVariety = (event) => {
    this.getGradeByVariety(event?.id);
  }

  async changeGrade (grade) {
    this.price = grade?.price;
  }


  calcTotal = () => {
    this.total = this.price * this.quantity;
    this.cropSaleForm.get("payment").patchValue(this.total);
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
    'price': this.price as number,
    'quantity': this.quantity as number,
    'batchNo': this.batchNo as number,
    'total': this.total as number
  }
  this.setProductDetailValue();
  this.cropSaleDetails.set(product?.id,product);
  this.showProductDetails = true;
  this.cropSaleDetailsComponent.reload(this.cropSaleDetails);

};

  setProductDetailValue = (
    id = null,
    crop = "",
    variety = "",
    grade = "",
    unit = null,
    price = 0,
    quantity = 0,
    batchNo = "",
    total = 0
    ) => {
    this.crop = crop;
    this.variety = variety;
    this.grade = grade;
    this.unit = unit;
    this.price = price;
    this.quantity = quantity;
    this.batchNo = batchNo;
    this.total = total;
    this.detailId = id;
  };

  deleteConfirm = (rowId:string) => {

    if(rowId.substring(0, 4) == 'temp'){}else{
      this.delArr.push(rowId);
    }
    this.cropSaleDetails.delete(rowId);
    this.cropSaleDetailsComponent.reload(this.cropSaleDetails);
  }

  edit = (rowId: any) => {
    this.setProductDetailValue();
    this.editData = this.cropSaleDetails.get(rowId);
    if (!!this.editData) {
      this.editcall=true;
      this.setProductDetailValue(
        this.editData?.id,
        this.editData?.product,
        this.editData?.variety,
        this.editData?.grade,
        this.editData?.unit as string,
        this.editData?.price,
        this.editData?.quantity,
        this.editData?.batchNo,
        this.editData?.total as number);
    }
  }

  save = () => {
    this.isSubmit = true;
    this.villageMultiSelectComponent.formInvalid();
    this.farmerMultiSelectComponent.formInvalid();
    this.farmMultiSelectComponent.formInvalid();
    this.buyerMultiSelectComponent.formInvalid();
    this.setFormValue(
      this.selectedVillage,
      this.selectedFarmer,
      this.selectedFarm,
      this.selectedBuyer,
      this.cropSaleForm.value?.date
      );
    if (this.cropSaleForm.valid && this.cropSaleDetails.size > 0) {
      let data = this.cropSaleForm.value;
      if(!!this.id) { data["id"]=this.id; }
      if (data.date != null)
      data.date = this.datepipe.transform(this.cropSaleForm?.value?.date, "MM/dd/yyyy");
      let arr = Array.from(this.cropSaleDetails?.values());
      arr.map((obj)=>{if(obj?.id.substring(0, 4) == 'temp'){obj.id = null;}});
      data["cropSaleDetails"] = arr;
      this.cropSaleService.addCropSale(data).toPromise().then(()=>{
        if(this.delArr?.length > 0){
          this.delArr.forEach((id)=>{
            this.cropSaleService.delete(id).toPromise().then((data)=>{});
          })
        }
        this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
          'Crop Sale Added', 'Your information has been saved successfully!');
        this.cancel();
      });

    } else {
      this.cropSaleForm.markAllAsTouched();
    }
  }


  cancel = () => {
    this.router.navigate(['procurement/crop-sale']);
  };

  clear(){
    this.setProductDetailValue();
  }

  ngOnDestroy = () => {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  get basic() {
    return this.cropSaleForm.controls;
  }

}
