import { Component, OnInit, Input, Output, EventEmitter, Inject, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, Observable, ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { TalukService } from '../taluk.service';
import { LocationService } from '../../location.service';
import { ResponseModalService } from '../../../../../common/response-modal/response-modal.service';
import { AppConfiguration } from '../../../../../common/App.configuration';
import { trimValidator } from 'src/app/common/trim.validator';
import { MultiSelectComponent } from 'src/app/common/multi-select/multi-select.component';

@Component({
  selector: 'app-taluk-add',
  templateUrl: './taluk-add.component.html',
  styleUrls: ['./taluk-add.component.scss']
})
export class TalukAddComponent implements OnInit,OnDestroy  {
  @ViewChild('countryMultiSelect', { static: false }) countryMultiSelectComponent: MultiSelectComponent;
  @ViewChild('stateMultiSelect', { static: false }) stateMultiSelectComponent: MultiSelectComponent;
  @ViewChild('districtMultiSelect', { static: false }) districtMultiSelectComponent: MultiSelectComponent;
  private eventsSubscription: Subscription;
  private editEventsSubscription: Subscription;
  public event: EventEmitter<any> = new EventEmitter();
  protected _onDestroy = new Subject<void>();
  @Input() events: Observable<void>;
  @Output() saveEvent = new EventEmitter();

  isSubmit: boolean = false;
  talukForm: FormGroup;
  id: string;
  title: string;
  countries = [];
  states = [];
  districts = [];
  selectedCountry: any;
  selectedState: any;
  selectedDistrict: any;

  constructor(public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private talukService: TalukService,
    private locationService: LocationService,
    private responseModalService: ResponseModalService,
    private appConfiguration: AppConfiguration) { }

  ngOnInit() {
    this.getCountries();
    this.title = this.data?.title;
    this.talukForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*"), trimValidator]],
      country: [""],
      state: [""],
      district: [""]
    });
    if (this.data.id) {
      this.talukService.getTalukById(this.data?.id).toPromise().then((data:any)=>{
        this.id = data?.id;
        this.selectedCountry = data?.district?.state?.country;
        this.selectedState = data?.district?.state;
        this.selectedDistrict = data?.district;
        this.talukForm.patchValue({
          country:  this.selectedCountry,
          state: this.selectedState,
          district: this.selectedDistrict,
          name: data?.name
        });
      })
    }
  }

  changeState = (event) => {
    this.getStates(event?.id);
  }
  changeDistrict = (event) => {
    this.getDistricts(event?.id);
  }

  getCountries  =  () =>  {
    this.locationService.getAllCountries().subscribe((data: any[]) => {
      this.countries = data;
    })
  }

  getStates = (id) => {
    this.locationService.getAllStateByCountry(id).subscribe((data: any[]) => {
      this.states = data;
    })
  }
  getDistricts = (id) => {
    this.locationService.getAllDistrictByState(id).subscribe((data: any[]) => {
      this.districts = data;
    })
  }

  submitForm = () => {
    this.isSubmit = true;
    this.countryMultiSelectComponent.formInvalid();
    this.stateMultiSelectComponent.formInvalid();
    this.districtMultiSelectComponent.formInvalid();
    this.saveEvent.emit(true);
    this.talukForm.patchValue({
      country:this.selectedCountry,
      state:this.selectedState,
      district:this.selectedDistrict
    })
    let talukData = this.talukForm.value;
    if (this.id) {
      talukData.id = this.id;
    }
    this.sendForm(talukData);
  };

  sendForm = (data) => {
    if (!this.talukForm.invalid) {
      this.talukService.addTaluk(data).subscribe((data: any[]) => {
          this.cancel();
          this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
            'Taluk Added', 'Your information has been saved successfully!');
      });
    }
  };
  get basic() {
    return this.talukForm.controls;
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
  ngOnDestroy = () => {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}
