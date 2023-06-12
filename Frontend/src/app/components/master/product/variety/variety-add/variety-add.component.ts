import { Component, OnInit, Input, Output, EventEmitter, Inject,OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, Observable, Subject, ReplaySubject } from 'rxjs';
import { AppConfiguration } from '../../../../../common/App.configuration';
import { VarietyService } from '../variety.service';
import { ProductService } from '../../../product/product.service'
import { ResponseModalService } from '../../../../../common/response-modal/response-modal.service';
import { takeUntil } from 'rxjs/operators';
import { MultiSelectComponent } from 'src/app/common/multi-select/multi-select.component';
import { trimValidator } from 'src/app/common/trim.validator';

@Component({
  selector: 'app-variety-add',
  templateUrl: './variety-add.component.html',
  styleUrls: ['./variety-add.component.scss']
})
export class VarietyAddComponent implements OnInit,OnDestroy {
  @ViewChild('cropMultiSelect', { static: false }) cropMultiSelectComponent: MultiSelectComponent;
  private eventsSubscription: Subscription;
  private editEventsSubscription: Subscription;
  public event: EventEmitter<any> = new EventEmitter();

  @Input() events: Observable<void>;
  @Output() saveEvent = new EventEmitter();

  isSubmit: boolean = false;
  varietiesForm: FormGroup;
  id: string;
  selectedCrop: any;
  title: string;
  crops = [];
  protected _onDestroy = new Subject<void>();
  constructor(public formBuilder: FormBuilder,
     public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
     private varietyService: VarietyService,
    private responseModalService: ResponseModalService,
     private productService: ProductService,
    private appConfiguration: AppConfiguration) {
  }
  ngOnInit() {
    this.title = this.data?.title;
    this.getCrops();
    this.varietiesForm = this.formBuilder.group({
      name: ['', [Validators.required, trimValidator]],
      crop:[this.selectedCrop,[Validators.required]],
      daysToGrow: ['', [Validators.required, trimValidator,Validators.maxLength(4),Validators.pattern('[0-9]+')]],
    });
  }

  getCrops = () => {
    this.productService.getAllCrops().subscribe((data: any[]) => {
      this.crops = data;
      if (this.data.id) {
        this.varietyService.getVarietyById(this.data?.id).subscribe((data: any) => {
          this.selectedCrop = data?.crop;
          this.id = data?.id;
          this.varietiesForm = this.formBuilder.group({
            name: [data?.name],
            daysToGrow: [data?.daysToGrow],
            crop:[this.selectedCrop]
          });
        })
      }
    })
  }

  submitForm = () => {
    this.isSubmit = true;
    this.varietiesForm.markAllAsTouched();
    this.cropMultiSelectComponent.formInvalid();
    this.saveEvent.emit(true);
    this.varietiesForm.patchValue({crop:this.selectedCrop});
    let stateData = this.varietiesForm.value;
    if (this.id) {
      stateData.id = this.id;
    }
    this.sendForm(stateData);
  };

  sendForm = (data) => {
    if (!this.varietiesForm.invalid) {
      this.varietyService.addVariety(data).subscribe((data: any) => {
          this.cancel();
          this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
            'Variety Added', 'Your information has been saved successfully!');
      });
    }
  };

  get basic() {
    return this.varietiesForm.controls;
  }

  triggerEvent = () => {
    this.event.emit({ data: true });
  }
  cancel = () => {
    this.dialogRef.close(true);
  }
  public objectComparisonFunction = function (option, value): boolean {
    return option.id === value.id;
  }
  ngOnDestroy = () =>  {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}
