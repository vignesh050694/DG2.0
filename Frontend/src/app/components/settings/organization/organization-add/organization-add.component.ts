import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrganizationService } from '../organization.service';
import { AppConfiguration } from '../../../../common/App.configuration';
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';

@Component({
  selector: 'app-organization-add',
  templateUrl: './organization-add.component.html',
  styleUrls: ['./organization-add.component.scss']
})
export class OrganizationAddComponent implements OnInit {
  isSubmit: boolean =false;
  organizationForm: FormGroup;
  id: string;
  title: string="Organization Add";
  constructor(public formBuilder: FormBuilder,
    private organizationService: OrganizationService,
    private responseModalService: ResponseModalService,
    private appConfiguration: AppConfiguration,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,) {

  }
  ngOnInit(): void {
    this.title = this.data.title;
    this.organizationForm = this.formBuilder.group({
      organizationId: ["", [Validators.required]],
      name: ["", [Validators.required]],
      contactPerson: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      isActive: ['', [Validators.required]]
    });
    if (this.data.id) {
      this.organizationService.getOrganizationById(this.data.id).subscribe((data: any) => {
        this.id = data?.id;
        this.organizationForm.patchValue({
          organizationId: data?.organizationId,
          name: data?.name,
          contactPerson: data?.contactPerson,
          contactNumber: data?.contactNumber,
          address: data?.address,
          isActive: data?.isActive
        });
      })
    }
    this.isSubmit = false;
  }
  submitForm = () => {
    this.isSubmit = true;
    let organizationData = this.organizationForm?.value;
    if (this.id) {
      organizationData.id = this.id;
    }
    this.sendForm(organizationData);
  };
  sendForm = (data) => {
    if(!this.organizationForm.invalid){
      this.organizationService.addOrganization(data).subscribe((data:any)=>{
          this.cancel();
          this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
            'Organization Added', 'Your information has been saved successfully!');
      });
    }
  }
  get basic() {
    return this.organizationForm.controls;
  }
  cancel = () => {
    this.dialogRef.close(true);
  }
}
