import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { MultiSelectComponent } from 'src/app/common/multi-select/multi-select.component';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { trimValidator } from 'src/app/common/trim.validator';
import { SubCategoryService } from 'src/app/components/master/farm-input/sub-category/sub-category.service';
import { WarehouseService } from 'src/app/components/master/warehouse/warehouse.service';
import { SeasonService } from '../../../master/season/season.service';
import { DistributionStockTransferDetailsComponent } from '../distribution-stock-transfer-details/distribution-stock-transfer-details.component';
import { DistributionStockTransferService } from '../distribution-stock-transfer.service';

@Component({
  selector: 'app-distribution-stock-transfer-add',
  templateUrl: './distribution-stock-transfer-add.component.html',
  styleUrls: ['./distribution-stock-transfer-add.component.scss'],
})
export class DistributionStockTransferAddComponent implements OnInit {
  @ViewChild('seasonMultiSelect', { static: false }) seasonMultiSelectComponent: MultiSelectComponent;
  @ViewChild('senderMultiSelect', { static: false }) senderMultiSelectComponent: MultiSelectComponent;
  @ViewChild('receiverMultiSelect', { static: false }) receiverMultiSelectComponent: MultiSelectComponent;
  @ViewChild('distributionStockTransferDetailsTab', { static: false }) distributionStockTransferDetailsComponent: DistributionStockTransferDetailsComponent;
  public isSubmit: boolean = false;
  public isAvailable : boolean = false;
  id: string;
  detailId: string;
  public datatrigger: EventEmitter<any> = new EventEmitter();

  category: any={};
  product: any = {};
  unit: string = '';
  distributingStockTransfer: number = 0;
  availableStocks: number = 0;
  None:any=[{'name':'None'}]

  seasons = [];
  warehouses = [];
  subCategories = [];
  crops = [];
  categories = [];
  warehouse: string = '';

  selectedSenderWarehouse: any;
  selectedReceiverWarehouse: any;
  selectedSeason: any;
  selectedReceiptNumber: any;

  distributionStockTransferForm: FormGroup;
  distributionStockTransferDetails: any[] = [];
  showDistributionStockTransferDetails: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private seasonService: SeasonService,
    private subCategoryService: SubCategoryService,
    private warehouseService: WarehouseService,
    private router: Router,
    private responseModalService: ResponseModalService,
    private appConfiguration: AppConfiguration,
    private distributionStockTransferService: DistributionStockTransferService,
    public datepipe: DatePipe,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.setFormValue();
    this.getSeasons();
    this.getWarehouses();
    this.getCategory();
    this.getValueById();
  }

  setFormValue = (
    season = '',
    senderWarehouse = '',
    receiverWarehouse = '',
    date = '',
    truckId = '',
    driverName = ''
  ) => {
    this.distributionStockTransferForm = this.formBuilder.group({
      season: [season, [Validators.required]],
      senderWarehouse: [senderWarehouse, [Validators.required]],
      receiverWarehouse: [receiverWarehouse, [Validators.required]],
      date: [date, [Validators.required]],
      truckId: [truckId, [Validators.required, trimValidator]],
      driverName: [driverName, [Validators.required, trimValidator]],
    });
  };

  getValueById(){
    this.id = this.route.snapshot.params.id;
    if((!!this.id)){
       this.distributionStockTransferService.getById(this.id).subscribe((data:any)=>{
        this.selectedReceiverWarehouse = data?.receiverWarehouse;
        this.selectedSeason = data?.season;
        this.selectedSenderWarehouse = data?.senderWarehouse;
        this.selectedReceiptNumber = data?.receiptNumber;
         this.distributionStockTransferForm = this.formBuilder.group({
           date:[new Date(data?.date)],
           truckId:[data?.truckId],
           driverName:[data?.driverName],
           receiverWarehouse:[this.selectedReceiverWarehouse],
           senderWarehouse:[this.selectedSenderWarehouse],
           season:[this.selectedSeason]
         })
         data?.distributionStockTransferDetails?.forEach((details, index) => {
          let product = {
            'id': details?.id,
            'category':details?.product?.category,
            'product': details?.product,
            'availableStock': details?.availableStock,
            'distributingStock' : details?.distributingStock,
            'unit': details?.product?.unit?.name
       }
       this.detailId = details?.id;
       this.distributionStockTransferDetails.push(product);
         })
         if (data?.distributionStockTransferDetails != null) {
          this.showDistributionStockTransferDetails = true;
          this.datatrigger.emit(this.distributionStockTransferDetails);
        }
       })
    }
  }

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

  getCategory = () => {
    this.subCategoryService.getAllCategories().subscribe((data: any[]) => {
      this.categories = data;
    });
  };

  getProductByCategory = (id: any) => {
    this.subCategoryService
      .getProductByCategory(id)
      .subscribe((data: any[]) => {
        this.subCategories = data;
      });
  };

  changeCategory = (event: any) =>{
    this.product={};
    this.subCategories=[];
    this.getProductByCategory(event?.id);
  }

  changeSubCategory = (event: any) => {
    this.unit = event?.unit?.name;
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
      value: this.selectedSenderWarehouse?.id,
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
        // this.product = null;
        // this.unit = null;
      }
    });
  };

  setDistributionStockTransferDetails = (
    category = '',
    product = '',
    availableStock = 0,
    distributingStock = 0,
    unit = '',
    detailId = this.detailId
  ) => {
    this.category = category;
    this.product = product;
    this.availableStocks = availableStock;
    this.distributingStockTransfer = distributingStock;
    this.unit = unit;
    this.detailId = detailId;
  };

  addDistributionStockTransferInformation = () => {
    let product = {
      category: this.category,
      product: this.product,
      availableStock: this.availableStocks,
      distributingStock: this.distributingStockTransfer,
      unit: this.unit,
      id: this.detailId
    };
    if (
      this.distributingStockTransfer <= this.availableStocks &&
      this.distributingStockTransfer > 0
    ) {
      this.setDistributionStockTransferDetails();
      this.distributionStockTransferDetails.push(product);
      this.isAvailable=false;
      this.showDistributionStockTransferDetails = true;
      this.distributionStockTransferDetailsComponent.reload(this.distributionStockTransferDetails);
    }
  };

  edit = (row: any) => {
    this.getProductByCategory(row?.subCategory?.category?.id);
    this.setDistributionStockTransferDetails(row?.category, row?.product, row?.availableStock, row?.distributingStock, row?.unit?.name);
    this.deleteConfirm(row?.index);
  };

  deleteConfirm = (index) => {
    this.distributionStockTransferDetails.splice(index, 1);
    this.distributionStockTransferDetailsComponent.reload(this.distributionStockTransferDetails);
  };

  save = () => {
    this.isSubmit = true;
    this.seasonMultiSelectComponent.formInvalid();
    this.senderMultiSelectComponent.formInvalid();
    this.receiverMultiSelectComponent.formInvalid();
    this.setFormValue(
      this.selectedSeason,
      this.selectedSenderWarehouse,
      this.selectedReceiverWarehouse,
      this.distributionStockTransferForm.value?.date,
      this.distributionStockTransferForm.value?.truckId,
      this.distributionStockTransferForm.value?.driverName
    );
    this.distributionStockTransferForm.markAllAsTouched;
    if (
      this.distributionStockTransferForm.valid &&
      this.distributionStockTransferDetails.length > 0
    ) {
      let data = this.distributionStockTransferForm.value;
      if(!!this.id){ data.id = this.id;}
      if(!!this.selectedReceiptNumber){ data.receiptNumber = this.selectedReceiptNumber};
      data['distributionStockTransferDetails'] =
        this.distributionStockTransferDetails;
      if (data.date != null)
        data.date = this.datepipe.transform(
          this.distributionStockTransferForm?.value?.date,
          'MM/dd/yyyy'
        );
      this.distributionStockTransferService
        .addDistributionStockTransfer(data)
        .subscribe(() => {
          this.responseModalService.OpenStatusModal(
            this.appConfiguration.successIconUrl,
            'DistributionStockTransfer Added',
            'Your information has been saved successfully!'
          );
          this.cancel();
        });
    } else {
      this.distributionStockTransferForm.markAllAsTouched();
    }
  };

  cancel = () => {
    this.router.navigate(['inventory/distribution-stock-transfer']);
  };


  changeWarehouse = (event) => {
    this.warehouse = event?.value?.id;
  };

  get basic() {
    return this.distributionStockTransferForm.controls;
  }

  public objectComparisonFunction = function (option, value): boolean {
    return option.id === value.id;
  };
}
