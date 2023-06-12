import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, Observable } from 'rxjs';
import { trimValidator } from 'src/app/common/trim.validator';
import { AppConfiguration } from '../../../../common/App.configuration';
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { BuyerService } from '../buyer.service';

@Component({
  selector: 'app-buyer-add',
  templateUrl: './buyer-add.component.html',
  styleUrls: ['./buyer-add.component.scss']
})
export class BuyerAddComponent implements OnInit {
  private eventsSubscription: Subscription;
  private editEventsSubscription: Subscription;
  public event: EventEmitter<any> = new EventEmitter();

  @Input() events: Observable<void>;
  @Output() saveEvent = new EventEmitter();

  isSubmit: boolean;
  BuyerForm: FormGroup;
  id: string;
  title: string;
  constructor(public formBuilder: FormBuilder, public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, private buyerService: BuyerService,
    private responseModalService: ResponseModalService, private appConfiguration: AppConfiguration) {
  }
  ngOnInit(): void {
    this.title = this.data?.title;
    this.BuyerForm = this.formBuilder.group({
      name: ['', [Validators.required, trimValidator]],
      contactPerson: ['', [Validators.required, trimValidator]],
      contactNo: ['',[Validators.required,Validators.pattern('[0-9]{10}'), trimValidator]],
      email: ['',[Validators.email, trimValidator]]
    });
    if (this.data.id) {
      this.buyerService.getBuyerById(this.data?.id).subscribe((data: any) => {
        this.id = data?.id;
        this.BuyerForm = this.formBuilder.group({
          name: [data?.name],
          contactPerson: [data?.contactPerson],
          contactNo: [data?.contactNo],
          email: [data?.email]
        });
      })
    }
    this.isSubmit = false;
  }
  submitForm = () => {
    this.isSubmit = true;
    this.saveEvent.emit(true);
    let BuyerData = this.BuyerForm?.value;
    if (this.id) {
      BuyerData.id = this.id;
    }
    this.sendForm(BuyerData);
  };

  sendForm = (data) => {
    if (!this.BuyerForm.invalid) {
      this.buyerService.addBuyer(data).subscribe((data: any) => {
          this.cancel();
          this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
            'Buyer Added', 'Your information has been saved successfully!');
      });
    }
  };
  get basic() {
    return this.BuyerForm.controls;
  }

  triggerEvent = () => {
    this.event.emit({ data: true });
  }
  cancel = () => {
    this.dialogRef.close(true);
  }

}
