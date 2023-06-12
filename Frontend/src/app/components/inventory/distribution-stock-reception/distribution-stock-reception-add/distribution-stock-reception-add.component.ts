import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { MultiSelectComponent } from 'src/app/common/multi-select/multi-select.component';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { SubCategoryService } from 'src/app/components/master/farm-input/sub-category/sub-category.service';
import { SeasonService } from 'src/app/components/master/season/season.service';
import { WarehouseService } from 'src/app/components/master/warehouse/warehouse.service';
import { DistributionStockReceptionService } from '../distribution-stock-reception.service';
import { DistributionStockReceptionDetailsComponent } from '../distribution-stock-reception-details/distribution-stock-reception-details.component';

@Component({
  selector: 'app-distribution-stock-reception-add',
  templateUrl: './distribution-stock-reception-add.component.html',
  styleUrls: ['./distribution-stock-reception-add.component.scss'],
})
export class DistributionStockReceptionAddComponent implements OnInit {
  @ViewChild('wareHouseMultiSelect', { static: false })wareHouseMultiSelectComponent: MultiSelectComponent;
  @ViewChild('transferReceiptMultiSelect', { static: false })transferReceiptMultiSelectComponent: MultiSelectComponent;
  @ViewChild('seasonMultiSelect', { static: false })seasonMultiSelectComponent: MultiSelectComponent;
  @ViewChild('distributionStockReceptionDetailsTab', { static: false })distributionStockReceptionDetailsComponent: DistributionStockReceptionDetailsComponent;
  public datatrigger: EventEmitter<any> = new EventEmitter();
  id: string;
  detailId: string;
  distributionStockReceptionForm: FormGroup;
  seasons: any[]=[];
  warehouses: any[]=[];
  subCategories = [];
  crops = [];
  categories: any[];
  warehouse: any;
  warehouseId: any;
  selectedWarehouse: any;
  selectedSeason: any;
  selectedReceiptNumber: any;
  selectedTransferReceiptNumber: any;
  isWarehouseChanged = false;
  isSubmit: boolean = false;

  category: string = '';
  product: string = '';
  damagedQuantity: number = 0;
  distributingStock: number = 0;
  goodQuantity: number = 0;

  distributionStockReceptionDetails: any[] = [];
  showDistributionStockReceptionDetails: boolean = false;
  None:any=[{'name':'None'}]

  receipts:any = [];
  constructor(
    public formBuilder: FormBuilder,
    private seasonService: SeasonService,
    private warehouseService: WarehouseService,
    public datepipe: DatePipe,
    private distributionStockReceptionService: DistributionStockReceptionService,
    private responseModalService: ResponseModalService,
    private appConfiguration: AppConfiguration,
    private router: Router,
    private subCategoryService: SubCategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.setFormValue();
    this.getEditValue();
    this.getSeasons();
    this.getWarehouses();
    this.getCategory();
  }

  setFormValue = (
    season = '',
    receiverWarehouse = '',
    transferReceiptNumber = '',
    date = '',
    truckId = '',
    driverName = ''
  ) => {
    this.distributionStockReceptionForm = this.formBuilder.group({
      season: [season, [Validators.required]],
      receiverWarehouse: [receiverWarehouse, [Validators.required]],
      transferReceiptNumber: [transferReceiptNumber, [Validators.required]],
      date: [date, [Validators.required]],
      truckId: [truckId, [Validators.required]],
      driverName: [driverName, [Validators.required]],
    });
  };

  getEditValue = () => {
    this.id = this.route.snapshot.params.id;
    if((!!this.id)){
       this.distributionStockReceptionService.getById(this.id).toPromise().then((data:any)=>{
        this.selectedWarehouse = data?.receiverWarehouse;
        this.selectedSeason = data?.season;
        this.selectedTransferReceiptNumber = data?.transferReceiptNumber;
        this.selectedReceiptNumber = data?.receiptNumber;
         this.distributionStockReceptionForm = this.formBuilder.group({
           date:[new Date(data?.date)],
           truckId:[data?.truckId],
           driverName:[data?.driverName],
           transferReceiptNumber:[this.selectedTransferReceiptNumber],
           season:[this.selectedSeason],
           warehouse:[this.selectedWarehouse],
         })
         data?.distributionStockReceptionDetails?.forEach((details, index) => {
          let product = {
            'id': details?.id,
            'category':details?.product?.category,
            'product': details?.product,
            'transferedStock': ((details?.goodQuantity) + (details?.damagedQuantity)),
            'goodQuantity' : details?.goodQuantity,
            'damagedQuantity': details?.damagedQuantity
       }
       this.detailId = details?.id;
       this.distributionStockReceptionDetails.push(product);
         })
         if (data?.distributionStockReceptionDetails != null) {
          this.datatrigger.emit(this.distributionStockReceptionDetails);
          this.showDistributionStockReceptionDetails = true;
        }
      })
    }

  }

  //season list
  getSeasons = () => {
    this.seasonService.getAllSeasons().toPromise().then((data: any[]) => {
      this.seasons = data;
    });
  };

  //warehouse list
  getWarehouses = () => {
    this.warehouseService.getAllWarehouse().toPromise().then((data: any[]) => {
      this.warehouses = data;
    });
  };

  //category List
  getCategory = () => {
    this.subCategoryService.getAllCategories().toPromise().then((data: any[]) => {
      this.categories = data;
    });
  };

// SubCategory List Using Category
  getProductByCategory = (event: any) => {
    this.subCategoryService.getProductByCategory(event?.id).toPromise().then((data: any[]) => {
        this.subCategories = data;
      });
  };

  changeWarehouse = (event) => {
    if(event){
      this.getTransferReceipts(event);
    }
  };

  changeReceipt = (event) => {
    //this.distributionStockReceptionDetails = [];
    this.distributionStockReceptionService.getDistributionStockReceptionByReceipt(event?.name).toPromise().then((data:any) => {this.distributionStockReceptionForm.patchValue({truckId: data?.truckId,driverName: data?.driverName});
        this.addDistributionStockReceptionInformation(data);
      });
  };

  getTransferReceipts = (event: any) => {
    this.distributionStockReceptionService.getDistributionStockReceptionReceiptByWarehouse(event?.id).toPromise().then((receipts:any[]) => {
        this.receipts = receipts;
        this.distributionStockReceptionForm.patchValue({transferReceiptNumber : this.selectedTransferReceiptNumber});
      });
  };

  save = () => {
    this.isSubmit = true;
    this.wareHouseMultiSelectComponent.formInvalid();
    this.transferReceiptMultiSelectComponent.formInvalid();
    this.seasonMultiSelectComponent.formInvalid();
    this.distributionStockReceptionDetails = this.distributionStockReceptionDetailsComponent.productReceptionDetails
    this.setFormValue(
      this.selectedSeason,
      this.selectedWarehouse,
      this.selectedTransferReceiptNumber,
      this.distributionStockReceptionForm.value?.date,
      this.distributionStockReceptionForm.value?.truckId,
      this.distributionStockReceptionForm.value?.driverName
    );
    if (this.distributionStockReceptionForm.valid) {
      let data = this.distributionStockReceptionForm.value;
      if(!!this.id){ data.id = this.id;}
      if(!!this.selectedReceiptNumber){ data.receiptNumber = this.selectedReceiptNumber};
      data['transferReceiptNumber'] = this.selectedTransferReceiptNumber?.name;
      data['distributionStockReceptionDetails'] = this.distributionStockReceptionDetails;
      if (data.date != null)
        data.date = this.datepipe.transform(
          this.distributionStockReceptionForm?.value?.date,
          'MM/dd/yyyy'
        );
      this.distributionStockReceptionService.addDistributionStockReception(data).toPromise().then(() => {
          this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,'DistributionStockReception Added','Your information has been saved successfully!');
          this.cancel();
        });
    } else {
      this.distributionStockReceptionForm.markAllAsTouched();
    }
  };

  cancel = () => {
    this.router.navigate(['inventory/distribution-stock-reception']);
  };

  edit = (row: any) => {
    this.setDistributionStockReceptionDetails(
      row?.category,
      row?.product,
      row?.distributingStock,
      row?.goodQuantity,
      row?.damagedQuantity
    );
    this.deleteConfirm(row?.index);
  };

  deleteConfirm = (index) => {
    this.distributionStockReceptionDetails.splice(index, 1);
    this.distributionStockReceptionDetailsComponent.reload(this.distributionStockReceptionDetails);
  };

  setDistributionStockReceptionDetails = (
    category = '',
    product = '',
    distributingStock = 0,
    goodQuantity = 0,
    damagedQuantity = 0,
    detailId = this.detailId
  ) => {
    this.category = category;
    this.product = product;
    this.distributingStock = distributingStock;
    this.goodQuantity = goodQuantity;
    this.damagedQuantity = damagedQuantity;
    this.detailId = detailId;
  };

  addDistributionStockReceptionInformation = (data: any) => {
    this.distributionStockReceptionDetails = [];
    this.showDistributionStockReceptionDetails = false;
    data?.distributionStockTransferDetails?.forEach(detail => {
      let productDetailValue = {
        "id": this.detailId,
        "category":detail?.product?.category,
        "product": detail?.product,
        "transferedStock": detail?.distributingStock,
        "goodQuantity": "",
        "damagedQuantity":""
      }
      //   this.setProductDetailValue({});
      this.distributionStockReceptionDetails.push(productDetailValue);
    });

    if (data?.distributionStockTransferDetails != null) {
      this.datatrigger.emit(this.distributionStockReceptionDetails);
      this.showDistributionStockReceptionDetails = true;
    }
  }

  get basic() {
    return this.distributionStockReceptionForm.controls;
  }
}
