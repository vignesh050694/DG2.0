import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Guid } from 'guid-typescript';
import { CatalougeTypes } from 'src/app/common/common.enum';
import { CatalogueService } from 'src/app/components/master/catalogue/catalogue.service';

@Component({
  selector: 'app-bank-detail',
  templateUrl: './bank-detail.component.html',
  styleUrls: ['./bank-detail.component.scss']
})
export class BankDetailComponent implements OnInit {

  isSubmit: boolean;
  bankInformationForm:FormGroup;
  id: string;
  title: string;
  selectedAccType:any;
  accTypes =[];
  constructor(public formBuilder: FormBuilder, public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,private catalogueService:CatalogueService) {
  }

  getAccountTypes=()=>{
    this.catalogueService.getCataloguesByType(CatalougeTypes.accountType).toPromise().then((data:any)=>{
      this.accTypes = data;
    })
  }

  ngOnInit(): void {
    this.getAccountTypes();
    this.title = this.data?.title;
    this.bankInformationForm = this.formBuilder.group({
      accType: [''],
      accNo: ['', [Validators.required]],
      bankName: ['',[Validators.required]],
      bankBranch: ['',[Validators.required]],
      ifscCode:['']
    });

    this.isSubmit = false;
  }
  submitForm = () => {
    this.isSubmit = true;
    this.bankInformationForm.patchValue({
      accType :this.selectedAccType
    })
    let bankData = this.bankInformationForm?.value;
    if (this.id) {
      bankData['id'] = this.id;
    }else{
      bankData['id'] = "temp"+ Guid.create();
    }
    this.dialogRef.close(bankData);
  };

  get basic() {
    return this.bankInformationForm.controls;
  }


  cancel = () => {
    this.dialogRef.close(null);
  }


}
