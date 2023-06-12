import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CountryService } from '../country.service';
import { ResponseModalService } from '../../../../../common/response-modal/response-modal.service';
import { AppConfiguration } from '../../../../../common/App.configuration';
import { trimValidator } from 'src/app/common/trim.validator';

@Component({
  selector: 'app-country-add',
  templateUrl: './country-add.component.html',
  styleUrls: ['./country-add.component.scss']
})
export class CountryAddComponent implements OnInit {
  @Output() saveEvent = new EventEmitter();

  isSubmit: boolean;
  countryForm: FormGroup;
  id: string;
  title: string;

  constructor(public formBuilder: FormBuilder, public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, private countryService: CountryService,
    private responseModalService: ResponseModalService,
    private appConfiguration: AppConfiguration) {
  }

  ngOnInit() {
    this.title = this.data?.title;
    this.countryForm = this.formBuilder.group({
      name: ['', [Validators.required, trimValidator]],
    });
    if (this.data.id) {
      this.countryService.getCountryById(this.data?.id).subscribe((data: any) => {
        this.id = data?.id;
        this.countryForm.setValue({ name: data?.name });
      })
    }
    this.isSubmit = false;

  }

  submitForm = () => {
    this.isSubmit = true;
    this.saveEvent.emit(true);
    let countryData = this.countryForm.value;
    if (this.id) {
      countryData.id = this.id;
    }
    this.sendForm(countryData);
  };

  sendForm = (data) => {
    if (!this.countryForm.invalid) {
      this.countryService.addCountry(data).subscribe((data: any) => {
        this.cancel();
          this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
            'Country Added', 'Your information has been saved successfully!');
      });
    }
  };

  get basic() {
    return this.countryForm.controls;
  }

  cancel = () => {
    this.dialogRef.close(true);
  }

  public onSelect(item) {
  }
}
