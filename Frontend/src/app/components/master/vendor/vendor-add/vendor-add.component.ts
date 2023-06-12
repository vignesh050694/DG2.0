import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, Observable } from 'rxjs';
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { VendorService } from '../vendor.service';
import { AppConfiguration } from '../../../../common/App.configuration';
import { trimValidator } from 'src/app/common/trim.validator';

@Component({
  selector: 'app-vendor-add',
  templateUrl: './vendor-add.component.html',
  styleUrls: ['./vendor-add.component.scss']
})
export class VendorAddComponent implements OnInit {
  private eventsSubscription: Subscription;
  private editEventsSubscription: Subscription;
  public event: EventEmitter<any> = new EventEmitter();

  @Input() events: Observable<void>;
  @Output() saveEvent = new EventEmitter();

  isSubmit: boolean;
  vendorForm: FormGroup;
  id: string;
  title: string;
  constructor(public formBuilder: FormBuilder, public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, private vendorService: VendorService,
    private responseModalService: ResponseModalService, private appConfiguration: AppConfiguration) {
  }

  ngOnInit(): void {
    this.title = this.data?.title;
    this.vendorForm = this.formBuilder.group({
      name: ['', [Validators.required, trimValidator]],
      address: ['',[trimValidator]],
      contactPerson: ['',[trimValidator]],
      contactNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}'), trimValidator]],
      emailId: ['', [Validators.email, Validators.required, trimValidator]]
    });
    if (this.data.id) {
      this.vendorService.getVendorById(this.data?.id).subscribe((data: any) => {
        this.id = data?.id;
        this.vendorForm = this.formBuilder.group({
          name: [data?.name],
          address: [data?.address],
          contactPerson: [data?.contactPerson],
          contactNumber: [data?.contactNumber],
          emailId: [data?.emailId]
        });
      })
    }
    this.isSubmit = false;
  }
  submitForm = () => {
    this.isSubmit = true;
    this.saveEvent.emit(true);
    let vendorData = this.vendorForm?.value;
    if (this.id) {
      vendorData.id = this.id;
    }
    this.sendForm(vendorData);
  };

  sendForm = (data) => {
    if (!this.vendorForm.invalid) {
      this.vendorService.addVendor(data).subscribe((data: any) => {
        this.cancel();
        this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
          'Vendor Added', 'Your information has been saved successfully!');
      });
    }
  };
  get basic() {
    return this.vendorForm.controls;
  }

  triggerEvent = () => {
    this.event.emit({ data: true });
  }
  cancel = () => {
    this.dialogRef.close(true);
  }
}
