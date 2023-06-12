import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { MultiSelectComponent } from 'src/app/common/multi-select/multi-select.component';
import { CatalogueService } from 'src/app/components/master/catalogue/catalogue.service';
import { AppConfiguration } from '../../../../common/App.configuration';
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { MobileUserService } from '../mobile-user.service';

@Component({
  selector: 'app-mobile-user-add',
  templateUrl: './mobile-user-add.component.html',
  styleUrls: ['./mobile-user-add.component.scss']
})
export class MobileUserAddComponent implements OnInit {
  @ViewChild('idTypeMultiSelect', { static: false }) idTypeMultiSelectComponent: MultiSelectComponent;
  @Input() events: Observable<void>;
  @Output() saveEvent = new EventEmitter();
  public event: EventEmitter<any> = new EventEmitter();
  idTypes: any[] = [];
  public isSubmit: boolean = false;
  mobileUserForm: FormGroup;
  id: string;
  title: string;
  selectedIdType: any;
  constructor(public formBuilder: FormBuilder,
    private mobileUserService: MobileUserService,
    private responseModalService: ResponseModalService,
    private appConfiguration: AppConfiguration,
    private router: Router,
    private datePipe: DatePipe,
    private catalogueService : CatalogueService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getIdTypes();
    this.mobileUserForm = this.formBuilder.group({
      userId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      gender: [],
      date: [new Date()],
      address: [''],
      emailId: ['',[Validators.email]],
      phoneNo: ['',[Validators.pattern('[0-9]{10}')]],
      mobileNo: ['',[Validators.pattern('[0-9]{10}')]],
      idNo: ['',[Validators.required]],
      idType: [this.selectedIdType],
      isActive: [],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

  }
  get basic() {
    return this.mobileUserForm.controls;
  }

  submitForm = () => {
    this.mobileUserForm.markAllAsTouched();
    this.isSubmit = true;
    this.idTypeMultiSelectComponent.formInvalid();
    this.mobileUserForm.patchValue({idType : this.selectedIdType});
    this.saveEvent.emit(true);
    let mobileUserData = this.mobileUserForm?.value;
    if (this.id) {
      mobileUserData.id = this.id;
    }
    this.sendForm(mobileUserData);
  };

  sendForm = (data) => {
    if (!this.mobileUserForm.invalid) {
      this.mobileUserService.addMobileUser(data).subscribe((data: any) => {
        this.cancel();
        this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
          'Mobile User Added', 'Your information has been saved successfully!');
      });
    }
  };

  getIdTypes = () => {
    this.catalogueService.getCataloguesTypes().subscribe((data: any[]) => {
      this.idTypes = data;
      this.id = this.route.snapshot.params.id;
    if (this.id != undefined) {
      this.mobileUserService.getMobileUserById(this.id).subscribe((data: any) => {
        this.selectedIdType=data?.idType;
        this.mobileUserForm = this.formBuilder.group({
          userId: [data?.userId],
          name: [data?.name],
          gender: [data?.gender],
          date: [new Date(data?.date)],
          address: [data?.address],
          emailId: [data?.emailId],
          phoneNo: [data?.phoneNo],
          mobileNo: [data?.mobileNo],
          idNo:[data?.idNo],
          isActive: [data?.isActive],
          password: [data?.password],
          confirmPassword: [data?.confirmPassword],
          idType: [this.selectedIdType]
        });
      })
    }
    });
  };

  triggerEvent = () => {
    this.event.emit({ data: true });
  }

  cancel = () => {
    this.router.navigate(['settings/mobile-user'])
  };

  public objectComparisonFunction = function (option, value): boolean
  {
    return option.id === value.id;
  }
}
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
