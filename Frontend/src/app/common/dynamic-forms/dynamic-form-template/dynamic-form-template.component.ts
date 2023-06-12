import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { DynamicFormBase } from '../dynamic-form-base';

@Component({
  selector: 'app-dynamic-form-template',
  templateUrl: './dynamic-form-template.component.html',
  styleUrls: ['./dynamic-form-template.component.scss']
})
export class DynamicFormTemplateComponent implements OnInit {
  public filterCtrl: FormControl = new FormControl();
  public filteredArray: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @Input() childFormData: DynamicFormBase<any>;
  @Input() form: FormGroup;



  constructor(private fb:FormBuilder) { }

  ngOnInit = () => {

    //if (this.childFormData.options.length > 0) {
    //  this.filteredArray.next(this.datas.slice());
    //}
  }

  get isValid() {
    return this.form.controls[this.childFormData.key].valid;
  }

  onSave = () => {
    console.log(this.form.value());
  }

  public objectComparisonFunction = function (option, value): boolean {
    return option.id === value.id;
  }
}
