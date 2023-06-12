import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { trimValidator } from 'src/app/common/trim.validator';
import { MobileUserService } from 'src/app/components/settings/mobile-user/mobile-user.service';
import { CashDistributionService } from '../cash-distribution.service';

@Component({
  selector: 'app-cash-distribution-add',
  templateUrl: './cash-distribution-add.component.html',
  styleUrls: ['./cash-distribution-add.component.scss']
})
export class CashDistributionAddComponent implements OnInit {


  private event: EventEmitter<any> = new EventEmitter();

  @Input() events: Observable<void>;
  @Output() saveEvent = new EventEmitter();

  isSubmit: boolean = false;
  cashDistributionForm: FormGroup;
  id: string;
  title: string;
  CashDistributiondata: any;
  selectedGroup: any;
  mobileUserId: any = [];
  selectedMobileUserId: any =[];
  name :string;
  mobileId : any;
  mobileUsers:any = [];
  selectedUser:any;

  constructor(public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private responseModalService: ResponseModalService,
    private appconfiguration: AppConfiguration,
    private cashDistributionService:CashDistributionService,
    private mobileUserService : MobileUserService) {
    }

    getMobileUsers=()=>{
        this.mobileUserService.getAllMobileUser().toPromise().then((data:any)=>{
          this.mobileUsers = data;
        })
    }

  ngOnInit(): void {
     this.getMobileUsers();
    this.cashDistributionForm = this.formBuilder.group({
      // mobileUserId:[''],
      // mobileUser:['',[Validators.required]],
      updateBalance:['',[Validators.required]]
    });
  this.title = this.data?.title;
  if(this.data.id){
    this.cashDistributionService.getCashDistributionById(this.data?.id).subscribe((data: any) =>{
      this.id = data?.id;
      // this.cashDistributionForm.patchValue({
      //  mobileUserId:data?.mobileUserId,
      //  mobileUser:data?.mobileUser,
      //  balance:data?.balance
      // });
    })
  }
  this.isSubmit = false;
  }

  submitForm = () => {
    this.isSubmit = true;
    this.saveEvent.emit(true);
    this.cashDistributionForm.patchValue({
      mobileUser:this.selectedUser?.id,
      mobileUserId:this.selectedUser?.idNo
    })
    let CashDistributionData = this.cashDistributionForm?.value;
    if(this.data.id){
      CashDistributionData.id = this.data.id;
    }
    this.sendForm(CashDistributionData);
  };

  sendForm =(data) =>{
    if(!this.cashDistributionForm.invalid){
      this.mobileUserService.addMobileUser(data).subscribe((data: any) =>{
        this.cancel();
        this.responseModalService.OpenStatusModal(this.appconfiguration.successIconUrl,
          'Cash Distribution Updated', 'Your information has been saved successfullay!');
      });
    }
  };
  get basic(){
    return this.cashDistributionForm.controls;
  }
  triggerEvent = () =>{
    this.event.emit({data: true});
  }
  cancel = () =>{
    this.dialogRef.close(true);
  }

  changeMobile = (event:any) => {
    this.mobileUserService.getMobileUserByName(event?.name).toPromise().then((data: any[]) => {
      this.mobileId = data;
  });
}

}
