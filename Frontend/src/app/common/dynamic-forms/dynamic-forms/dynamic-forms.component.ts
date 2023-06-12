import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicFormBase } from 'src/app/common/dynamic-forms/dynamic-form-base'
import { AppConfiguration } from '../../App.configuration';
import { DynamicFormControlServiceService } from '../dynamic-form-control-service.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dynamic-forms',
  templateUrl: './dynamic-forms.component.html',
  styleUrls: ['./dynamic-forms.component.scss']
})
export class DynamicFormsComponent implements OnInit {
  @Input() formData: DynamicFormBase<any>[] = [];
  @Input() reportName: string;
  @Output() searchEvent = new EventEmitter();
  form: FormGroup;
  @Input() isDateRange : boolean = false;
  payLoad = '';
  pdfDownloadUrl = "";
  excelDownloadUrl = "";
  canShowSearch: boolean = true;
  panelOpenState: boolean = true;
  dateForm:FormGroup;
  today = new Date();
  month = this.today.getMonth();
  year = this.today.getFullYear();
  dateRange = new FormGroup({
   start: new FormControl(new Date(this.year, this.month, 1)),
   end: new FormControl(new Date(this.year, this.month, 25)),
 });
  constructor(
    private dynamicFormControlServiceService: DynamicFormControlServiceService,
    private appConfiguration: AppConfiguration,
    private datePipe :DatePipe) { }

  async ngOnInit() {
    this.form = this.dynamicFormControlServiceService.toFormGroup(this.formData);
    this.pdfDownloadUrl = this.appConfiguration.baseUrl + this.appConfiguration.downloadPdf + this.reportName;
    this.excelDownloadUrl = this.appConfiguration.baseUrl + this.appConfiguration.downloadExcel + this.reportName;
  }

  onSave = () => {
    if(this.isDateRange == true){
      let start=this.datePipe.transform(this.dateRange.value.start,"yyyy-MM-dd");
      let end= this.datePipe.transform(this.dateRange.value.end,"yyyy-MM-dd");
      if(start && end){
        this.form.value['daterange'] = start+"/"+end;
      }
    }
    this.searchEvent.emit(this.form.value);
    this.payLoad = JSON.stringify(this.form.value);
  };

  reset = () => {
    this.form.reset();
    this.dateRange.reset();
    this.onSave();
  };

  export = (url) => {
    window.open(url,"_blank")
  };

}
