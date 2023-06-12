import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, Observable } from 'rxjs';
import { trimValidator } from 'src/app/common/trim.validator';
import { AppConfiguration } from '../../../../common/App.configuration';
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { WarehouseService } from '../warehouse.service';

@Component({
  selector: 'app-warehouse-add',
  templateUrl: './warehouse-add.component.html',
  styleUrls: ['./warehouse-add.component.scss']
})
export class WarehouseAddComponent implements OnInit {

  private eventsSubscription: Subscription;
  private editEventsSubscription: Subscription;
  public event: EventEmitter<any> = new EventEmitter();
  catalogueTypes = [];
  @Input() events: Observable<void>;
  @Output() saveEvent = new EventEmitter();

  isSubmit: boolean;
  warehouseForm: FormGroup;
  id: string;
  title: string;
  constructor(public formBuilder: FormBuilder, public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, private warehouseService: WarehouseService,
    private responseModalService: ResponseModalService,private appConfiguration: AppConfiguration) {
  }

  ngOnInit() {
    this.title = this.data?.title;
    this.warehouseForm = this.formBuilder.group({
      name: ['', [Validators.required, trimValidator]],
      address: [''],
      location: [''],
      phoneNumber: ['', [Validators.pattern('[0-9]{10}'), trimValidator]],
      warehouseInCharge: [''],
      storageCapacityInTonnes: [''],
      typeOfStorageCommodity: [''],
      warehouseOwnerShip: [''],
    });

    this.isSubmit = false;
    if (this.data.id) {
      this.warehouseService.getWarehousesById(this.data?.id).subscribe((data: any) => {
        this.id = data?.id;
        this.warehouseForm.patchValue({ name: data?.name,
          address: data?.address,
          location: data?.location,
          phoneNumber: data?.phoneNumber,
          warehouseInCharge: data?.warehouseInCharge,
          storageCapacityInTonnes: data?.storageCapacityInTonnes,
          typeOfStorageCommodity: data?.typeOfStorageCommodity,
          warehouseOwnerShip: data?.warehouseOwnerShip});
      })
    }
  }

  submitForm = () => {
    this.warehouseForm.markAllAsTouched();
    this.isSubmit = true;
    this.saveEvent.emit(true);
    let catalogueData = this.warehouseForm.value;
    if (this.id) {
      catalogueData.id = this.id;
    }
    this.sendForm(catalogueData);
  };

  sendForm = (data) => {
    if (!this.warehouseForm.invalid) {
      this.warehouseService.addWarehouse(data).subscribe((data: any) => {
          this.cancel();
          this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
            'Warehouse Added', 'Your information has been saved successfully!');
      });
    }
  };

  get basic() {
    return this.warehouseForm.controls;
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

}
