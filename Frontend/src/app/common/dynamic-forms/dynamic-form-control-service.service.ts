import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicFormBase } from './dynamic-form-base';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormControlServiceService {

  constructor() { }
  toFormGroup(dynamicForm: DynamicFormBase<any>[]) {
    let group: any = {};

    dynamicForm.filter((q:any)=> q.type != 3).forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required) : new FormControl(question.value || '');
    })

    return new FormGroup(group);
  }
}
