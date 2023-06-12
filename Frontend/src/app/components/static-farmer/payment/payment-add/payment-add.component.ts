import { FarmerService } from 'src/app/components/master/farmer/farmer.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TalukService } from './../../../master/location/taluk/taluk.service';
import { MobileUserService } from './../../../settings/mobile-user/mobile-user.service';
import { CatalogueService } from './../../../master/catalogue/catalogue.service';
import { PaymentService } from './../payment.service';
import { Component, OnInit, Inject, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocationService } from 'src/app/components/master/location/location.service';
import { MultiSelectComponent } from 'src/app/common/multi-select/multi-select.component';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { VillageService } from 'src/app/components/master/location/village/village.service';
import { StaticFarmerService } from '../../static-farmer.service';
import { even } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-payment-add',
  templateUrl: './payment-add.component.html',
  styleUrls: ['./payment-add.component.scss']
})
export class PaymentAddComponent implements OnInit {
  @ViewChild("paymentMultiSelect",{static:false}) paymentMultiSelectComponent:MultiSelectComponent;
  @ViewChild('catalogueMultiSelect', { static: false }) catalogueMultiSelectComponent: MultiSelectComponent;
  @ViewChild('mobileUserMultiSelect', { static: false }) mobileUserMultiSelectComponent: MultiSelectComponent;
  @ViewChild('talukMultiSelect', { static: false }) talukMultiSelectComponent: MultiSelectComponent;
  @ViewChild('villageMultiSelect', { static: false }) villageMultiSelectComponent: MultiSelectComponent;
  @ViewChild('farmerMultiSelect', { static: false }) farmerMultiSelectComponent: MultiSelectComponent;
  private event: EventEmitter<any> = new EventEmitter();

  @Input() events: Observable<void>;
  @Output() saveEvent = new EventEmitter();

  paymentTypeMultiSelectComponent: MultiSelectComponent;
  paymentForm: FormGroup;
  isSubmit: boolean = false;
  catalogue: any=[];
  mobileUsers: any=[];
  villages :any=[];
  taluk : any=[];
  farmers: any=[];
  paymentType =[];
  selectedCatalogue: any;
  selectedMobileUser : any;
  selectedVillage:any;
  selectedTaluk : any;
  selectedFarmer : any;
  selectedPaymentType: any;
  title: string;
  id: string;
  formGroup: FormGroup;
  selectedUser:any;
  selectedMode:any;
  payments :any[];
  amount:any;
  farmerLoanAmount: any;
  farmerLoanBalance: any;

  catalogues = [
    { id: 1, name: "Cash Advance" },
    { id: 2, name: "Distribution Payment" },
    { id: 3, name: "Procurement Advance" },
    { id: 4, name: "Procurement Payment" },
    { id: 5, name: "Distribution Advance" },
    { id: 6, name: "Loan Repayment" },
  ];


  constructor(  private responseModalService: ResponseModalService,
    public datepipe: DatePipe,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder,
    private catalogueService:CatalogueService,
    private mobileUserService:MobileUserService,
    private locationService:LocationService,
    private talukService:TalukService,
    private farmerService:FarmerService,
    private appconfiguration: AppConfiguration,
    private paymentService: PaymentService,
    private datePipe:DatePipe,
    private villageService:VillageService,
    private statiFarmerservice: StaticFarmerService) { }

    getVillages = () => {
      this.villageService.getAllVillages().toPromise().then((data: any[]) => {
        this.villages = data;
    });
    }

    getMobileUsers=()=>{
      this.mobileUserService.getAllMobileUser().toPromise().then((data:any)=>{
        this.mobileUsers = data;
      })
  }

  // getBalanceByFarmer = (event: any) =>{
  //  this.getLoanDetailByFarmerId(event?.id);
  //   this.paymentService.getBalanceByFarmer(event?.id).toPromise().then((data:any) =>{
  //     this.amount = data?.farmer?.farmerBalance?.amount;
  //   });
  //   this.paymentService.getBalanceByFarmer(event?.id).toPromise().then((data:any) => {
  //     this.farmerLoanBalance = data?.farmer?.farmerBalance?.amount;
  //   });
  // }

  getLoanDetailByFarmerId = (event:any) => {

      this.paymentService.getBalanceByFarmer(event?.id).toPromise().then((data:any) =>{
        if(data?.remainingBalance != null && data?.remainingBalance != undefined){
        this.amount = data?.remainingBalance;
        }
        else{
          this.amount = 0;
        }
      });
      this.statiFarmerservice.getLoansByFarmerId(event?.id).toPromise().then((data:any) => {
        if(data?.amount != null && data?.amount != undefined){
        this.farmerLoanAmount = data?.amount - this.amount;
        }
        else{
          this.farmerLoanAmount = 0;
        }
      });
      this.paymentService.getBalanceByFarmer(event?.id).toPromise().then((data:any) => {
        if(data?.remainingBalance != null && data?.remainingBalance != undefined){
        this.farmerLoanBalance = data?.remainingBalance;
        }
        else{
          this.farmerLoanBalance = 0;
        }
      });

  }



  ngOnInit(): void {
    this.getMobileUsers();
    this.getVillages();
    this.paymentForm = this.formBuilder.group({
      paymentMode:[""],
      date: [""],
      dateStr: [""],
      mobileUser:[""],
      taluk:[""],
      village: [""],
      farmer:[""],
      balance :[""],
      farmerLoanAmount:[""],
      farmerLoanBalance : [""],
      amount : [""]
    });
    //this.getCatalogue();
    this.getMobileUser();
    //this.getMobileUsers();
    this.getVillages();
    this.getTaluks();
    this.getFarmers();
  this.title = this.data?.title;
  if(this.data.id){
    this.paymentService.getPaymentById(this.data?.id).subscribe((data: any) => {
      this.id = data?.id;
      this.selectedCatalogue = data?.catalogue;
      this.selectedMobileUser=data?.mobileUsers;
      this.selectedTaluk=data?.taluk;
      this.selectedVillage=data?.village;
      this.selectedFarmer = data?.farmer?.farmerBalance;
      this.paymentForm.patchValue({
        catalogue:this.selectedCatalogue,
        mobileUser:this.selectedMobileUser,
        taluk : this.selectedTaluk,
        village:this.selectedVillage,
        farmer: this.selectedFarmer,
      });
    })
  }
  this.isSubmit = false;
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

  // getCatalogue = () => {
  //   // this.catalogueService.getCataloguesTypes().subscribe((data: any[]) => {
  //   //   this.catalogue = data;
  //   // });

  //   catalogue :  [
  //     {id : 1, title : "Teacher"},
  //     {id : 2, title : "Engineer"},
  //     {id : 3, title : "Doctor"}
  //   ];
  //   return this.catalogue;
  //   // this.catalogue.push({
  //   //   [{id:"1", name:"Cash advance"}],
  //   // })
  // };

  getMobileUser = () => {
    this.mobileUserService.getAllMobileUser().subscribe((data: any[]) => {
      this.mobileUsers = data;
    });
  };



  getTaluks = () => {
    this.talukService.getAllTaluk().subscribe((data: any[]) => {
      this.taluk = data;
    });
  };


  get basic() {
    return this.paymentForm.controls;
  }

  submitForm = () => {
    this.isSubmit = true;
    // this.paymentForm.markAllAsTouched();
    this.catalogueMultiSelectComponent.formInvalid();
    // this.mobileUserMultiSelectComponent.formInvalid();
    this.talukMultiSelectComponent.formInvalid();
    this.villageMultiSelectComponent.formInvalid();
    this.farmerMultiSelectComponent.formInvalid();
    this.saveEvent.emit(true);
    this.paymentForm.patchValue({
      //date:[new Date(dateStr)],
      //paymentMode:this.selectedCatalogue?.id,
      paymentMode :this.selectedMode?.name,
       mobileUser:this.selectedMobileUser?.id,
       farmer :this.selectedFarmer,
       taluk : this.selectedTaluk?.id,
       village : this.selectedVillage?.id,
      //  paymentData.from = this.datepipe.transform(this.paymentForm?.value?.from, "MM/dd/yyyy")
      })

    let paymentData = this.paymentForm.value;
    //paymentData['date'] = this.datePipe.transform(this.paymentForm.value.dateStr,'MM/dd/yyyy');
    if (this.id) {
      paymentData.id = this.id;
    }
    this.sendForm(paymentData);
  };

  sendForm = (data) => {
    if (!this.paymentForm.invalid) {
      this.paymentService.addPayment(data).subscribe((data: any) => {
        this.cancel();
        this.responseModalService.OpenStatusModal(this.appconfiguration.successIconUrl,
          'Payment Added','Your information has been saved successfully!');
      });
    }
  };

  cancel = () => {
    this.dialogRef.close(true);
  };

}
