import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponseModalService } from '../../../../../common/response-modal/response-modal.service';
import { AppConfiguration } from '../../../../../common/App.configuration';
import { CategoryService } from '../category.service'
import { trimValidator } from 'src/app/common/trim.validator';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {
  @Output() saveEvent = new EventEmitter();
  isSubmit: boolean;
  categoryForm: FormGroup;
  id: string;
  title: string;

  constructor(public formBuilder: FormBuilder, public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, private categoryService: CategoryService,
    private responseModalService: ResponseModalService,
    private appConfiguration: AppConfiguration) {
  }

  ngOnInit(){
    this.title = this.data?.title;
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, trimValidator]],
    });
    if (this.data.id) {
      this.categoryService.getCategoryById(this.data?.id).subscribe((data: any) => {
        this.id = data?.id;
        this.categoryForm.patchValue({ name: data?.name });
      })
    }
    this.isSubmit = false;

  }

  submitForm = () => {
    this.isSubmit = true;
    this.saveEvent.emit(true);
    let countryData = this.categoryForm.value;
    if (this.id) {
      countryData.id = this.id;
    }
    this.sendForm(countryData);
  };

  sendForm = (data) => {
    if (!this.categoryForm.invalid) {
      this.categoryService.addCategory(data).subscribe((data: any) => {
          this.cancel();
          this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
            'Category Added', 'Your information has been saved successfully!');
      });
    }
  };

  get basic() {
    return this.categoryForm.controls;
  }

  cancel = () => {
    this.dialogRef.close(true);
  }
}
