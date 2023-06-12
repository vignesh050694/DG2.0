import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { CropService } from 'src/app/components/master/product/crop/crop.service';
import { WarehouseService } from 'src/app/components/master/warehouse/warehouse.service';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductReceptService } from '../product-recept.service'
import { ProductService } from 'src/app/components/master/product/product.service';
import { DatePipe } from '@angular/common';
import { trimValidator } from 'src/app/common/trim.validator';
import { ProductReceptionDetailComponent } from '../product-reception-detail/product-reception-detail.component';
import { MultiSelectComponent } from 'src/app/common/multi-select/multi-select.component';

@Component({
  selector: 'app-product-reception-add',
  templateUrl: './product-reception-add.component.html',
  styleUrls: ['./product-reception-add.component.scss']
})
export class ProductReceptionAddComponent implements OnInit {
  @ViewChild('productReceptionDetails',{ static: false }) productReceptionDetailsTab: ProductReceptionDetailComponent;
  @ViewChild('senderMultiSelect', { static: false }) senderMultiSelectComponent: MultiSelectComponent;
  @ViewChild('ReceiverWarehouseMultiSelect', { static: false }) ReceiverWarehouseMultiSelectComponent: MultiSelectComponent;
  productReceptionForm: FormGroup;
  // public datatrigger: EventEmitter<any> = new EventEmitter();
  public warehouseFilterCtrl: FormControl = new FormControl();
  public receiptFilterCtrl: FormControl = new FormControl();
  productReceptionDetails: any = [];
  public saveTrigger: EventEmitter<any> = new EventEmitter();

  isSubmit: boolean = false;
  isProductReceptionDetails: boolean = false;
  warehouse: string = "";
  id: string;
  warehouses = [];
  crops = [];
  varieties = [];
  grades = [];
  receipts = [];
  productReceptionData :any = {};
  selectedReceiptNumber: any;
  selectedReceiverWarehouse: any;
  // selectedTransferReceiptNumber: any;
  transferedBags:number=0;
  transferedWeight:number=0;
  noOfBags: number = 0;
  netWeight: number = 0;

  editData:any;
  editcall:boolean = false;
  detailId : string;

  isWarehouseChanged = false;
  crop: string = "";
  variety: string = "";
  grade: string = "";
  unit: any;
  noOfBagsAvailable: any;
  netWeightAvailable: any;
  delArr:any =[];
  showProductDetails: boolean = false;
  dataEmiter: any;

  constructor(
    public formBuilder: FormBuilder,
    private warehouseService: WarehouseService,
    private cropService: CropService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private productReceptionService: ProductReceptService,
    private responseModalService: ResponseModalService,
    private appConfiguration: AppConfiguration,
    public datepipe: DatePipe
  ) { }

  ngOnInit() {
    this.productReceptionForm = this.formBuilder.group({
      receiverWarehouse: [],
      productReceptionDate: ['',[Validators.required]],
      receipt: ['', []],
      driverName: ['', []],
      truckId: ['', []]
    })

    // this.setForm();
    this.initiateDropDown();
    // this.editForm();
    this.getValueById();
  }
  // editForm = () => {
    getValueById(){
      this.id = this.route.snapshot.params.id;
      if (!!this.id) {
      this.productReceptionService.getById(this.id).subscribe((data: any) => {
        this.productReceptionData = data;
        this.selectedReceiverWarehouse = data?.receiverWarehouse;
        this.getTransferReceipts(this.selectedReceiverWarehouse);
        this.selectedReceiptNumber = data?.receiptionReceipt;
        // this.selectedReceiptNumber = {id:data?.transferReceiptNumber,name:data?.transferReceiptNumber};
        this.selectedReceiptNumber = {id:data?.receptionReceipt,name:data?.receptionReceipt};
        this.productReceptionForm.patchValue({
          receiverWarehouse: this.selectedReceiverWarehouse,
          productReceptionDate: new Date(this.productReceptionData?.productReceptionDate),
          // receptionReceipt: [this.selectedReceiptNumber],
          // driverName: [this.productReceptionData?.driverName],
          // truckId: [this.productReceptionData?.truckId]
        });
        this.productReceptionData?.productReceptionDetails.forEach((details, index) => {
          let product = {
            'product': details?.grade?.variety?.crop,
            'variety': details?.grade?.variety,
            'gradeName': details?.grade,
            'unit': details?.grade?.variety?.crop?.unit,
            'noOfBags': details?.noOfBags,
            'netWeight': details?.netWeight,
          }
          this.productReceptionDetails.push(product);
        })
        if (this.productReceptionDetails && this.productReceptionDetails.length > 0) {
          // this.datatrigger.emit(this.productReceptionDetails);
          this.isProductReceptionDetails = true;
        }
      })
     }
}

  setForm = () => {
    this.productReceptionForm.patchValue({
      receiverWarehouse: '',
      productReceptionDate: '',
      receipt: '',
      driverName: '',
      truckId: ''
    });

    this.isSubmit = false;
  };

  initiateDropDown = () => {
    //dropdown methods
    this.getWarehouses();
    this.getCrops();//Product

  };

  getWarehouses = () => {
    this.warehouseService.getAllWarehouse().subscribe((data: any[]) => {
      this.warehouses = data;
    });
  };

  changeCrop = (id) => {
    this.getVarietyByCrop(id?.value?.id);
    this.unit = id?.value?.unit?.name;
  }

  getVarietyByCrop = (id: string) => {
    this.productService.getVareityByCrop(id).then((data: any[]) => {
      this.varieties = data;
    });
  }

  getCrops = () => {
    this.cropService.getAllCrops().then((data: any[]) => {
      this.crops = data;
    });
  };

  changeWarehouse = (event) => {
    if(event){
      this.getTransferReceipts(event);
    }
  };
  changeReceipt = (event) => {
    this.productReceptionService.getProductTransferByReceipt(event?.id).toPromise().then((data:any) => {
      this.productReceptionForm.patchValue({
        truckId: data?.truckId,
        driverName: data?.driverName
      });
      this.addProductInformation(data);
    });
  };

  // getTransferReceipts = () => {
  //   this.productReceptionService.getReceiptByWarehouse(this.warehouse).subscribe((receipts:any[]) => {
  //     receipts.forEach((data:any)=>{
  //       this.receipts.push({'name':data})
  //     })
  //     // this.receipts = receipts;
  //   });
  // };



  // getTransferReceipts = (event: any) => {
  //   this.productReceptionService.getReceiptByWarehouse(event?.id).subscribe((receipts:any[]) => {
  //     receipts.forEach((element:any)=>{
  //       let obj ={
  //         "id":element,
  //         "name":element
  //       }
  //       this.receipts.push(obj);
  //     })
  //       this.productReceptionForm.patchValue({transferReceiptNumber : this.selectedTransferReceiptNumber});
  //     });
  // };
  getTransferReceipts = (event: any) => {
    this.productReceptionService.getReceiptByWarehouse(event?.id).subscribe((receipts:any[]) => {
      receipts.forEach((receipt)=>{
        this.receipts.push({id:receipt,name:receipt});
      })
      // this.productReceptionForm.patchValue({
      //   receptionReceipt:this.selectedReceiptNumber
      // })
        // this.receipts = receipts;
        //this.dataEmiter.name = event;
        // this.productReceptionForm.patchValue({transferReceiptNumber : this.receipts});
      });
  };

  public objectComparisonFunction = function (option, value): boolean {
    return option.id === value.id;
  };

  addProductInformation(data: any) {
    this.productReceptionDetails = [];
    data?.productTransferDetails?.forEach(detail => {
      let productDetailValue = {
        "product": detail?.grade?.variety?.crop?.name,
        "variety": detail?.grade?.variety?.name,
        "gradeName": detail?.grade?.name,
        "grade": detail?.grade,
        "unit": detail?.grade?.variety?.crop?.name,
        "transferedBags": detail?.noOfBags,
        "transferedWeight": detail?.netWeight,
        "noOfBags": null,
        "netWeight": null,
      }
      //  this.setProductDetailValue();
      this.productReceptionDetails.push(productDetailValue);
    });
    this.productReceptionDetailsTab?.reload(this.productReceptionDetails);
    this.isProductReceptionDetails = true;

    // if(this.productReceptionDetails && this.productReceptionDetails?.length >= 0){
      //  this.datatrigger.emit(this.productReceptionDetails);
    // }
  }

  // setProductDetailValue = (productReceptionDetail: any) => {
  //   if (productReceptionDetail)
  //     this.productReceptionForm.reset();
  //   else {
  //     this.productReceptionForm = this.formBuilder.group({
  //       receiverWarehouse: productReceptionDetail?.receiverWarehouse,
  //       receipt: productReceptionDetail?.receipt,
  //       productReceptionDate: productReceptionDetail?.productReceptionDate,
  //       driverName: productReceptionDetail?.driverName,
  //       truckId: productReceptionDetail?.truckId
  //     });
  //   }
  // };


  // setProductDetailValue = (receiverWarehouse = "",receipt="" ,driverName = "",truckId = "", productReceptionDate) => {
  //   this.productReceptionForm.patchValue({
  //     receiverWarehouse: receiverWarehouse,
  //     receipt:receipt,
  //     driverName: driverName,
  //     truckId: truckId,
  //     productReceptionDate: productReceptionDate
  //   });
  // };


  setProductDetailValue = (
    id = null,
    crop = "",
    variety = "",
    grade = "",
    unit = "",
    transferedBags = 0,
    transferedWeight=0,
    noOfBags = 0,
    netWeight = 0,
    ) => {
      this.crop = crop;
      this.variety = variety;
      this.grade = grade;
      this.unit = unit;
      this.transferedBags = transferedBags;
      this.transferedWeight=transferedWeight;
      this.noOfBags = noOfBags;
      this.netWeight = netWeight;
    this.detailId = id;
  };


  //   edit = (row: any) => {
  //   this.getVarietyByCrop(row?.grade?.variety?.crop.id);

  //   this.setProductDetailValue(row?.product, row?.variety, row?.grade, row?.unit?.name,row?.transferedBags,row?.transferedWeight ,row?.noOfBags, row?.netWeight);
  //   // this.deleteConfirm(row?.index);
  // };


  edit = (rowId: any) => {
    this.setForm();
    this.editData = this.productReceptionDetails.get(rowId);
    // if (!!this.editData) {
    //   this.editcall=true;
    //   this.setProductDetailValue(
    //     this.editData?.id,
    //     this.editData?.product,
    //     this.editData?.variety,
    //     this.editData?.grade,
    //     this.editData?.unit as string,
    //     this.editData?.transferedBags,
    //     this.editData?.transferedWeight,
    //     this.editData?.noOfBags as number,
    //     this.editData?.netWeight as number);
    // }
  }

  save = () => {
    this.productReceptionDetailsTab.save();
    // this.saveTrigger.emit();
  }

  deleteConfirm(){

  }

  onSave = (data) => {
    this.productReceptionForm.patchValue({
      receiverWarehouse: this.selectedReceiverWarehouse,
      receipt:this.selectedReceiptNumber?.id,
    })
    let jsonData = this.productReceptionForm.value;
    jsonData["productReceptionDetails"] = data;
    if (jsonData.productReceptionDate != null)
      jsonData.productReceptionDate = this.datepipe.transform(this.productReceptionForm?.value?.productReceptionDate, "MM/dd/yyyy");
      console.log(jsonData);
    this.productReceptionService.addReception(jsonData).subscribe((data: any) => {
      this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
        'Product Reception Added', 'Your information has been saved successfully!');
      this.cancel();
    });
  }

  save1 = () => {
    this.isSubmit = true;
    // this.senderMultiSelectComponent.formInvalid();
    // this.receiverMultiSelectComponent.formInvalid();
    // this.setProductDetailValue(
    //   this.selectedReceiverWarehouse,
    //   this.selectedReceiptNumber,
    //   this.productReceptionForm.value?.driverName,
    //   this.productReceptionForm.value?.truckId,
    //   this.productReceptionForm.value?.productReceptionDate
    //   );
    // if (this.productReceptionForm.valid && this.productReceptionDetails.length > 0) {
      let data = this.productReceptionForm.value;
      if(!!this.id) { data["id"]=this.id; }
      if (data.productReceptionDate != null)
      data.productReceptionDate = this.datepipe.transform(this.productReceptionForm?.value?.productReceptionDate, "MM/dd/yyyy");
      data['productReceptionDetails'] = this.productReceptionDetails;
      // let arr = Array.from(this.productReceptionDetails?.values());
      // arr.map((obj)=>{if(obj?.id.substring(0, 4) == 'temp'){obj.id = null;}});
      // data["productTransferDetails"] = arr;
      console.log(data);




      // this.productReceptionService.addReception(data).toPromise().then(()=>{
      //   if(this.delArr?.length > 0){
      //     this.delArr.forEach((id)=>{
      //       this.productReceptionService.delete(id).toPromise().then((data)=>{});
      //     })
      //   }
      //   this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
      //     'Product Transfer Added', 'Your information has been saved successfully!');
      //   this.cancel();
      // });

    // } else {
    //   this.productReceptionForm.markAllAsTouched();
    // }
  }


  cancel = () => {
    this.router.navigate(['procurement/product-reception/']);
  };

}

