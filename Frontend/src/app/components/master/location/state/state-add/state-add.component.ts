import { Component, OnInit, Input, Output, EventEmitter, Inject, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, Observable, ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { StateService } from '../state.service';
import { LocationService } from '../../location.service';
import { AppConfiguration } from '../../../../../common/App.configuration';
import { ResponseModalService } from '../../../../../common/response-modal/response-modal.service';
import { trimValidator } from 'src/app/common/trim.validator';
import { MultiSelectComponent } from 'src/app/common/multi-select/multi-select.component';

@Component({
  selector: 'app-state-add',
  templateUrl: './state-add.component.html',
  styleUrls: ['./state-add.component.scss']
})
export class StateAddComponent implements OnInit {
  @ViewChild('countryMultiSelect', { static: false }) countryMultiSelectComponent: MultiSelectComponent;
  private eventsSubscription: Subscription;
  private editEventsSubscription: Subscription;
  public event: EventEmitter<any> = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  public savetrigger: EventEmitter<any> = new EventEmitter();
  countries = [];
  selectedCountry: any;
  @Input() events: Observable<void>;
  @Output() saveEvent = new EventEmitter();
  isSubmit: boolean = false;
  stateForm: FormGroup;
  id: string;
  title: string;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public formBuilder: FormBuilder,
    private stateService: StateService,
    private locationService: LocationService,
    private responseModalService: ResponseModalService,
    private appConfiguration: AppConfiguration
    ) { }

  ngOnInit() {
    this.title = this.data?.title;
    this.getCountries();
    this.stateForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*"), trimValidator]],
      country: [""]
    });
    if (this.data?.id) {
      this.stateService.getStateById(this.data?.id).toPromise().then((data:any)=>{
        this.id = data?.id;
        this.selectedCountry = data?.country;
        this.stateForm.patchValue({
          name: data?.name,
          country: this.selectedCountry
        });
      })
    }

    this.isSubmit = false;
  }

  getCountries  =  () =>  {
    this.locationService.getAllCountries().subscribe((data: any[]) => {
      this.countries = data;
    })
  }

  submitForm = () => {
    this.isSubmit = true;
    this.countryMultiSelectComponent.formInvalid();
    this.saveEvent.emit(true);
    this.stateForm.patchValue({
      country:this.selectedCountry
    })
    let stateData = this.stateForm.value;
    if (this.id) {
      stateData.id = this.id;
    }
    this.sendForm(stateData);
  };

  sendForm = (data) => {
    if (!this.stateForm.invalid) {
      this.stateService.addState(data).subscribe((data: any) => {
          this.cancel();
          this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
            'State Added', 'Your information has been saved successfully!');
      });
    }
  };

  get basic() {
    return this.stateForm.controls;
  }

  triggerEvent = () => {
    this.event.emit({ data: true });
  }
  cancel = () => {
    this.dialogRef.close(true);
  }
  saveCountry = (value: any) => {
    this.selectedCountry = value;
  }
}
