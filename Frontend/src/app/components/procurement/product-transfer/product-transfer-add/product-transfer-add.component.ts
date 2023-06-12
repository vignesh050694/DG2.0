import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Subject } from 'rxjs';
import { MultiSelectComponent } from 'src/app/common/multi-select/multi-select.component';
import { ProductService } from 'src/app/components/master/product/product.service';
import { AppConfiguration } from '../../../../common/App.configuration';
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { CropService } from '../../../master/product/crop/crop.service';
import { WarehouseService } from '../../../master/warehouse/warehouse.service';
import { ProductTransferDetailComponent } from '../product-transfer-detail/product-transfer-detail.component';
import { ProductTransferService } from '../product-transfer.service'

@Component({
  selector: 'app-product-transfer-add',
  templateUrl: './product-transfer-add.component.html',
  styleUrls: ['./product-transfer-add.component.scss']
})
export class ProductTransferAddComponent implements OnInit {
  @ViewChild('senderMultiSelect', { static: false }) senderMultiSelectComponent: MultiSelectComponent;
  @ViewChild('receiverMultiSelect', { static: false }) receiverMultiSelectComponent: MultiSelectComponent;
  //@ViewChild('productMultiSelect', { static: false }) productMultiSelectComponent: MultiSelectComponent;
  @ViewChild('productTransferDetailsTab',{ static: false }) productTransferDetailComponent: ProductTransferDetailComponent;
  warehouses = [];
  crops = [];
  varieties = [];
  grades = [];
  selectedSenderWarehouse: any;
  selectedReceiverWarehouse: any;
  selectedProduct: any;
  noOfBagsAvailable: any;
  netWeightAvailable: any;

  // productTransferDetails = [];
  public datatrigger: EventEmitter<any> = new EventEmitter();
  // public saveTrigger: EventEmitter<any> = new EventEmitter();
  productTransferForm: FormGroup;
  public isAvailable : boolean = false;
  id: string;
  // productTransferData: any = {};
  showProductTransferDetails: boolean = false;
  productTransferDetails:Map<any,any>= new Map();

  crop: any;
  variety: any;
  grade: any;
  unit: any;
  available: any = "";
  noOfBags: number = 0;
  netWeight: number = 0;
  price: any;
  truckId: any;
  driverName: any;

  protected _onDestroy = new Subject<void>();
  editData:any;
  editcall:boolean = false;
  delArr:any =[];
  detailId : string;
  isSubmit: boolean = false;

  constructor(private warehouseService: WarehouseService,
    private productTransferService: ProductTransferService,
    private productService: ProductService,
    private cropService: CropService,
    public formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private responseModalService: ResponseModalService,
    private appConfiguration: AppConfiguration,
    public datepipe: DatePipe,) { }

  ngOnInit() {
    this.productTransferForm = this.formBuilder.group({
      senderWarehouse: ["", [Validators.required]],
      receiverWarehouse: ["", [Validators.required]],
      truckId: ["", [Validators.required]],
      driverName: ["", [Validators.required]],
      transferDateStr: ["", [Validators.required]]
    });
    this.getWarehouses();
    this.getCrops();
    this.getValueById();
  }

  getValueById(){
    this.id = this.route.snapshot.params.id;
    if(!!this.id){
      this.productTransferService.getById(this.id).subscribe((data:any)=>{
        this.selectedSenderWarehouse= data?.senderWarehouse;
        this.selectedReceiverWarehouse= data?.receiverWarehouse;
        this.setFormValue(this.selectedSenderWarehouse,this.selectedReceiverWarehouse,data?.truckId,data?.driverName,new Date(data?.transferDateStr))
        data?.productTransferDetails?.forEach((details, index)=>{
          let product={
            'id':details?.id,
            'product':details?.grade?.variety?.crop,
            'variety': details?.grade?.variety,
            'grade': details?.grade,
            'unit': details?.grade?.variety?.crop?.unit,
            'available': details?.available,
            'noOfBags': details?.noOfBags,
            'netWeight': details?.netWeight,
          }
          // this.detailId = details?.id;
          this.productTransferDetails.set(details?.id,product);
          // this.productDetails.add(product)
        })
        if (this.productTransferDetails?.size > 0) { this.productTransferDetailComponent.reload(this.productTransferDetails); this.showProductTransferDetails = true }
      })
   }
 }

  getCrops = async() => {
    await this.cropService.getAllCrops().then((data: any[]) => {
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
    this.selectedProduct = event?.id;
    this.getVarietyByCrop(event?.id);
    this.unit = event?.unit?.name;

  }

  changeVariety = (event) => {
    this.getGradeByVariety(event?.id);
  }

  changeGrade = (event) => {
    this.price = event?.price;
    // this.getTransferGrades();
  }

  getWarehouses = () => {
    this.warehouseService.getAllWarehouse().subscribe((data: any[]) => {
      this.warehouses = data;
    });
  }

  // getTransferGrades = () => {
  //     this.productTransferService.getTransferGrades(this.selectedSenderWarehouse?.id, this.selectedProduct).subscribe((data: any) => {
  //     //this.productTransferDetails = data;
  //     this.noOfBagsAvailable = data[2]?.bags;
  //     this.netWeightAvailable = data[2]?.netWeight;
  //     if(!!this.netWeightAvailable && !!this.noOfBagsAvailable){
  //     this.available = this.noOfBagsAvailable+"-Bags "+this.netWeightAvailable+"-Weights";}
  //     this.datatrigger.emit(this.productTransferDetails);
  //     })
  // }

   //stock information
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
      // 'available': this.available as number,
      'noOfBags': this.noOfBags as number,
      'netWeight': this.netWeight as number
    }
    this.setProductDetailValue();
    this.productTransferDetails.set(product?.id,product);
    this.showProductTransferDetails = true;
    this.productTransferDetailComponent.reload(this.productTransferDetails);

  };

  setFormValue = (senderWarehouse = "", receiverWarehouse = "", driverName = "",truckId = "", transferDateStr) => {
    this.productTransferForm.patchValue({
      senderWarehouse: senderWarehouse,
      receiverWarehouse: receiverWarehouse,
      driverName: driverName,
      truckId: truckId,
      transferDateStr: transferDateStr
    });
  };

  setProductDetailValue = (
    id = null,
    crop = "",
    variety = "",
    grade = "",
    unit = null,
    // available = 0,
    noOfBags = 0,
    netWeight = 0,
    ) => {
    this.crop = crop;
    this.variety = variety;
    this.grade = grade;
    this.unit = unit;
    // this.available = available;
    this.noOfBags = noOfBags;
    this.netWeight = netWeight;
    this.detailId = id;
  };

  save = () => {
    this.isSubmit = true;
    // this.senderMultiSelectComponent.formInvalid();
    // this.receiverMultiSelectComponent.formInvalid();
    this.setFormValue(
      this.selectedSenderWarehouse,
      this.selectedReceiverWarehouse,
      this.productTransferForm.value?.driverName,
      this.productTransferForm.value?.truckId,
      this.productTransferForm.value?.transferDateStr
      );
    if (this.productTransferForm.valid && this.productTransferDetails.size > 0) {
      let data = this.productTransferForm.value;
      if(!!this.id) { data["id"]=this.id; }
      if (data.transferDateStr != null)
      data.transferDateStr = this.datepipe.transform(this.productTransferForm?.value?.transferDateStr, "MM/dd/yyyy");
      let arr = Array.from(this.productTransferDetails?.values());
      arr.map((obj)=>{if(obj?.id.substring(0, 4) == 'temp'){obj.id = null;}});
      data["productTransferDetails"] = arr;
      this.productTransferService.addProductTransfer(data).toPromise().then(()=>{
        if(this.delArr?.length > 0){
          this.delArr.forEach((id)=>{
            this.productTransferService.delete(id).toPromise().then((data)=>{});
          })
        }
        this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
          'Product Transfer Added', 'Your information has been saved successfully!');
        this.cancel();
      });

    } else {
      this.productTransferForm.markAllAsTouched();
    }
  }

  edit = (rowId: any) => {
    this.setProductDetailValue();
    this.editData = this.productTransferDetails.get(rowId);
    if (!!this.editData) {
      this.editcall=true;
      this.setProductDetailValue(
        this.editData?.id,
        this.editData?.product,
        this.editData?.variety,
        this.editData?.grade,
        this.editData?.unit as string,
        // this.editData?.available as number,
        this.editData?.noOfBags as number,
        this.editData?.netWeight as number);
    }
  }

  deleteConfirm = (rowId:string) => {

    if(rowId.substring(0, 4) == 'temp'){}else{
      this.delArr.push(rowId);
    }
    this.productTransferDetails.delete(rowId);
    this.productTransferDetailComponent.reload(this.productTransferDetails);
  }

  cancel = () => {
    this.router.navigate(['procurement/product-transfer/']);
  };

  public objectComparisonFunction = function (option, value): boolean {
    return option.id === value.id;
  };

  clear(){
    this.setProductDetailValue();
  }

  ngOnDestroy = () => {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  get basic() {
    return this.productTransferForm.controls;
  }

}
