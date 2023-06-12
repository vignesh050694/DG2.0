import { Component, OnInit, Input, Output, EventEmitter, Inject, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, Observable, ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { VillageService } from '../village.service';
import { LocationService } from '../../location.service';
import { ResponseModalService } from '../../../../../common/response-modal/response-modal.service';
import { AppConfiguration } from '../../../../../common/App.configuration';
import { trimValidator } from 'src/app/common/trim.validator';
import { MultiSelectComponent } from 'src/app/common/multi-select/multi-select.component';

@Component({
  selector: 'app-village-add',
  templateUrl: './village-add.component.html',
  styleUrls: ['./village-add.component.scss']
})
export class VillageAddComponent implements OnInit, OnDestroy {
  @ViewChild('countryMultiSelect', { static: false }) countryMultiSelectComponent: MultiSelectComponent;
  @ViewChild('stateMultiSelect', { static: false }) stateMultiSelectComponent: MultiSelectComponent;
  @ViewChild('districtMultiSelect', { static: false }) districtMultiSelectComponent: MultiSelectComponent;
  @ViewChild('talukMultiSelect', { static: false }) talukMultiSelectComponent: MultiSelectComponent;
  private eventsSubscription: Subscription;
  private editEventsSubscription: Subscription;
  public event: EventEmitter<any> = new EventEmitter();

  @Input() events: Observable<void>;
  @Output() saveEvent = new EventEmitter();
  protected _onDestroy = new Subject<void>();
  isSubmit: boolean = false;
  villageForm: FormGroup;
  id: string;
  title: string;
  countries = [];
  states = [];
  districts = [];
  taluks = [];
  selectedCountry: any;
  selectedState: any;
  selectedDistrict: any;
  selectedTaluk: any;

  constructor(public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private villageService: VillageService,
    private locationService: LocationService,
    private responseModalService: ResponseModalService,
    private appConfiguration: AppConfiguration) {

  }

  ngOnInit() {
    this.getCountries();
    this.title = this.data?.title;
    this.villageForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*"), trimValidator]],
      country: [""],
      state: [""],
      district: [""],
      taluk: [""],
    });
    if (this.data?.id) {
      this.villageService.getVillageById(this.data?.id).subscribe(async (data: any) => {
        this.id = data?.id;
        this.selectedCountry= data?.taluk?.district?.state?.country;
        this.selectedState= data?.taluk?.district?.state;
        this.selectedDistrict=data?.taluk?.district;
        this.selectedTaluk=data?.taluk;
        this.villageForm.patchValue({
          country: this.selectedCountry,
          state: this.selectedState,
          district: this.selectedDistrict,
          taluk: this.selectedTaluk,
          name: data?.name
        });
      })
    }
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

  getTaluk = (id) => {
    this.locationService.getAllTalukByDistrict(id).subscribe((data: any[]) => {
      this.taluks = data;
    })
  }
  changeState = (event) => {
    this.getStates(event?.id);
  }
  changeDistrict = (event) => {
    this.getDistricts(event?.id);
  }

  changeTaluk = (event) => {
    this.getTaluk(event?.id);
  }

  submitForm = () => {
    this.isSubmit = true;
    this.countryMultiSelectComponent.formInvalid();
    this.stateMultiSelectComponent.formInvalid();
    this.districtMultiSelectComponent.formInvalid();
    this.talukMultiSelectComponent.formInvalid();
    this.saveEvent.emit(true);
    this.villageForm.patchValue({
      country:this.selectedCountry,
      state:this.selectedState,
      district:this.selectedDistrict,
      taluk:this.selectedTaluk
    })
    let villageData = this.villageForm.value;
    if (this.id) {
      villageData.id = this.id;
    }
    this.sendForm(villageData);
  };

  sendForm = (data) => {
    if (!this.villageForm.invalid) {
      this.villageService.addVillage(data).subscribe((data: any) => {
          this.cancel();
          this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
            'Village Added', 'Your information has been saved successfully!');
      });
    }
  };

  get basic() {
    return this.villageForm.controls;
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
