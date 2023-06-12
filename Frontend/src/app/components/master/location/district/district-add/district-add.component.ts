import { Component, OnInit, Input, Output, EventEmitter, Inject, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, Observable, ReplaySubject, Subject } from 'rxjs';
import { DistrictService } from '../district.service';
import { take, takeUntil } from 'rxjs/operators';
import { LocationService } from '../../location.service';
import { ResponseModalService } from '../../../../../common/response-modal/response-modal.service';
import { AppConfiguration } from '../../../../../common/App.configuration';
import { trimValidator } from 'src/app/common/trim.validator';
import { MultiSelectComponent } from 'src/app/common/multi-select/multi-select.component';

@Component({
  selector: 'app-district-add',
  templateUrl: './district-add.component.html',
  styleUrls: ['./district-add.component.scss']
})
export class DistrictAddComponent implements OnInit, OnDestroy {
  @ViewChild('countryMultiSelect', { static: false }) countryMultiSelectComponent: MultiSelectComponent;
  @ViewChild('stateMultiSelect', { static: false }) stateMultiSelectComponent: MultiSelectComponent;
  private eventsSubscription: Subscription;
  private editEventsSubscription: Subscription;
  public event: EventEmitter<any> = new EventEmitter();
  protected _onDestroy = new Subject<void>();
  @Input() events: Observable<void>;
  @Output() saveEvent = new EventEmitter();

  isSubmit: boolean = false;
  districtForm: FormGroup;
  id: string;
  title: string;
  countries = [];
  states = [];
  selectedCountry: any;
  selectedState: any;
  constructor(public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private districtService: DistrictService,
    private locationService: LocationService,
    private responseModalService: ResponseModalService,
    private appConfiguration: AppConfiguration) { }

  ngOnInit() {
    this.title = this.data?.title;
    this.getCountries();
    this.districtForm = this.formBuilder.group({
      name: ['', [Validators.required, trimValidator]],
      country: [""],
      state: [""],
    });
    if (this.data.id) {
      this.districtService.getDistrictById(this.data?.id).toPromise().then((data:any)=>{
        this.id = data?.id;
        this.selectedCountry = data?.state?.country;
        this.selectedState = data?.state;
         this.districtForm.patchValue({
          country: this.selectedCountry,
          state: this.selectedState,
          name: data?.name
        });
      })
    }
  }

  getCountries = () => {
    this.locationService.getAllCountries().subscribe((data: any[]) => {
      this.countries = data;
    })
  }

  changeState = (event:any)=>{
    this.getStates(event?.id)
  }

  getStates = (event:any) => {
    this.locationService.getAllStateByCountry(event).subscribe((data: any[]) => {
      this.states = data;
    });
  }
  submitForm = () => {
    this.isSubmit = true;
    this.countryMultiSelectComponent.formInvalid();
    this.stateMultiSelectComponent.formInvalid();
    this.saveEvent.emit(true);
    this.districtForm.patchValue({
      country:this.selectedCountry,
      state:this.selectedState
    })
    let districtData = this.districtForm.value;
    if (this.id) {
      districtData.id = this.id;
    }
    this.sendForm(districtData);
  };

  sendForm = (data) => {
      if (!this.districtForm.invalid) {
        this.districtService.addDistrict(data).subscribe((data: any) => {
            this.cancel();
            this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
              'District Added', 'Your information has been saved successfully!');
        });
      }
  };

  get basic() {
    return this.districtForm.controls;
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
