import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { SubCategoryService } from 'src/app/components/master/farm-input/sub-category/sub-category.service';
import { FarmerService } from 'src/app/components/master/farmer/farmer.service';
import { GroupService } from 'src/app/components/settings/group/group.service';
import { MultiSelectComponent } from '../../../../common/multi-select/multi-select.component';
import { VendorService } from '../../../master/vendor/vendor.service';
import { LoanDisbursementDetailsComponent } from '../loan-disbursement-details/loan-disbursement-details.component';
import { LoanDisbursementService } from '../loan-disbursement.service';

@Component({
  selector: 'app-loan-disbursement-add',
  templateUrl: './loan-disbursement-add.component.html',
  styleUrls: ['./loan-disbursement-add.component.scss']
})
export class LoanDisbursementAddComponent implements OnInit {
  @ViewChild('loanDisbursementTable', { static: false }) loanDisbursementDetailsComponent: LoanDisbursementDetailsComponent;
  @ViewChild('vendorMultiSelect', { static: false }) vendorMultiSelectComponent: MultiSelectComponent;
  @ViewChild('farmerMultiSelect', { static: false }) farmerMultiSelectComponent: MultiSelectComponent;
  @ViewChild('groupMultiSelect', { static: false }) groupMultiSelectComponent: MultiSelectComponent;
  id: string;
  detailId: string;
  public datatrigger: EventEmitter<any> = new EventEmitter();
  loanDisbursementForm : FormGroup;
  loanDisbursementDetails: any[] = [];
  farmers = [];
  groups = [];
  vendors = [];
  categories = [];
  products = [];
  selectedFarmer: any;
  selectedVendor: any;
  selectedGroup: any;
  showLoanDisbursmentDetails: boolean = false;
  isSubmit: boolean = false;
  category: any = {};
  product: any = {};
  unitPrice: number = 0;
  quantity: number = 0;
  amount : number = 0;
  payment : any;
  repayment : any;
  tenturePeriod : any ;
  interest : any;

  constructor(
    public formBuilder: FormBuilder,
    private farmerService: FarmerService ,
    private router: Router,
    private responseModalService : ResponseModalService,
    private vendorService : VendorService,
    private subCategoryService: SubCategoryService,
    private loanDisbursementService : LoanDisbursementService,
    private groupService: GroupService,
    private datepipe : DatePipe,
    private appConfiguration: AppConfiguration,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.setForm();
    this.getVendors();
    this.getFarmers();
    this.getCategory();
    this.getGroup();
    this.getValueById();
  }

  setForm = (date="",vendor="",farmerName="",groupName="") => {
    this.loanDisbursementForm = this.formBuilder.group({
      date: [date, [Validators.required]],
      vendor: [vendor, [Validators.required]],
      farmerName: [farmerName, [Validators.required]],
      groupName:[groupName]
    });
  };


  getValueById(){
    this.id = this.route.snapshot.params.id;
    if((!!this.id)){
      this.loanDisbursementService.getById(this.id).subscribe((data:any)=>{
        this.selectedVendor=data?.vendor;
        this.selectedFarmer= data?.farmerName;
        this.selectedGroup= data?.groupName;
        this.loanDisbursementForm = this.formBuilder.group({
           date:[new Date(data?.date)],
           vendor:[this.selectedVendor],
           farmer:[this.selectedFarmer],
           group:[this.selectedGroup]
        })
        data?.loanDisbursementDetails.forEach((details:any) => {
          let product = {
            'category':details?.product?.category,
            'product': details?.product,
            'unitPrice': details?.unitPrice,
            'quantity':details?.quantity,
            'amount':details?.amount,
            'id':details?.id
       }
       this.detailId = details?.id;
       this.loanDisbursementDetails.push(product);
      })
      if (data?.loanDisbursementDetails != null) {
       this.datatrigger.emit(this.loanDisbursementDetails);
       this.showLoanDisbursmentDetails = true;
     }
    })
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

   getVendors = () =>{
    this.vendorService.getAllVendors().subscribe((data: any[])=>{
      this.vendors = data;
    });
  }

  getGroup=() =>{
    this.groupService.getAllGroup().subscribe((data:any[]) =>{
      this.groups = data;
    });
  }

  getCategory = () =>{
    this.subCategoryService.getAllCategories().subscribe((data: any[])=>{
      this.categories = data;
    });
  }
  getProductByCategory =  (id: any) => {
    this.product={};
    this.products=[];
    this.subCategoryService.getProductByCategory(id).subscribe((data: any[]) => {
      this.products = data;
    });
  }

  changeCategory = (event: any) =>{
    this.getProductByCategory(event?.id);
  }

  changeSubCategory = (event: any) =>{
    this.unitPrice = event?.price;
  }

  save = () => {
    this.isSubmit = true;
    this.vendorMultiSelectComponent.formInvalid();
    this.farmerMultiSelectComponent.formInvalid();
    this.groupMultiSelectComponent.formInvalid();
    this.setForm(this.loanDisbursementForm.value?.date,this.selectedVendor,this.selectedFarmer,this.selectedGroup);
    if (this.loanDisbursementForm.valid && this.loanDisbursementDetails.length > 0) {
      let data = this.loanDisbursementForm.value;
      if(!!this.id) { data["id"]=this.id; }
      if (data.date != null)
        data.date = this.datepipe.transform(this.loanDisbursementForm?.value?.date, "MM/dd/yyyy");
      data["loanDisbursementDetails"] = this.loanDisbursementDetails;
      this.loanDisbursementService.addLoanDisbursement(data).subscribe(() => {
        this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
          'Loan Disbursement Added', 'Your information has been saved successfully!');
        this.router.navigate(['inventory/loan-disbursement/']);
      });
    } else {
      this.loanDisbursementForm.markAllAsTouched();
    }
  }

  cancel = () =>{
    this.router.navigate(['inventory/loan-disbursement/']);
  }
  edit = (row: any) => {
    this.getProductByCategory(row?.category?.id);
    this.setLoanDisbursementDetail(row?.category, row?.product, row?.unitPrice, row?.quantity );
    this.deleteConfirm(row?.index);
  }

  repaymentPerYear=()=>{
    this.repayment =(this.payment+((this.payment/100)*this.interest))/this.tenturePeriod;}

  //detail data
  setLoanDisbursementDetail = (category="" , product = "", unitPrice = 0 , quantity = 0, amount=0, detailId = this.detailId) =>{
    this.category = category;
    this.product = product;
    this.unitPrice = unitPrice;
    this.quantity = quantity;
    this.amount = amount;
    this.detailId = this.detailId;
  }
  deleteConfirm = (index) => {
    this.loanDisbursementDetails.splice(index, 1);
    this.loanDisbursementDetailsComponent.reload(this.loanDisbursementDetails);
  }
  //loan disbursement information
  addLoanDisbursementInformation = () =>{
    let productList = {
      'category': this.category,
      'product': this.product,
      'unitPrice': this.unitPrice,
      'quantity': this.quantity,
      'amount' : this.quantity*this.unitPrice,
      'id':this.detailId
    }
    if(!!this.category && !!this.product && !!this.quantity){
       this.setLoanDisbursementDetail();
       this.loanDisbursementDetails.push(productList);
      this.getTotalAmount();
      this.showLoanDisbursmentDetails = true;
      this.loanDisbursementDetailsComponent.reload(this.loanDisbursementDetails);
    }
    };

    get basic() {
      return this.loanDisbursementForm.controls;
  }
  getTotalAmount() {
    let amount = 0;
    this.loanDisbursementDetails.forEach((detail) => {
      amount = amount + detail.amount
    })
    return amount;
  }
  }

