import { Component, OnInit, Output, EventEmitter, Inject,OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { GradeService } from '../grade.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../product.service';
import { ResponseModalService } from '../../../../../common/response-modal/response-modal.service';
import { AppConfiguration } from '../../../../../common/App.configuration';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { trimValidator } from 'src/app/common/trim.validator';
import { MultiSelectComponent } from 'src/app/common/multi-select/multi-select.component';

@Component({
  selector: 'app-grade-add',
  templateUrl: './grade-add.component.html',
  styleUrls: ['./grade-add.component.scss']
})
export class GradeAddComponent implements OnInit,OnDestroy {
  @ViewChild('cropMultiSelect', { static: false }) cropMultiSelectComponent: MultiSelectComponent;
  @ViewChild('varietyMultiSelect', { static: false }) varietyMultiSelectComponent: MultiSelectComponent;
  @Output() saveEvent = new EventEmitter();
  isSubmit: boolean = false;
  gradeForm: FormGroup;
  id: string;
  title: string;
  selectedCrop: any;
  selectedVariety: any;
  varieties = [];
  crops = [];
  protected _onDestroy = new Subject<void>();

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    private gradeService: GradeService,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private responseModalService: ResponseModalService,
    private appConfiguration: AppConfiguration) {
  }

  async ngOnInit() {
    this.getCrops();
    this.title = this.data?.title;
    this.gradeForm = this.formBuilder.group({
      name: ['', [Validators.required, trimValidator]],
      crop: [this.selectedCrop, [Validators.required]],
      variety: [this.selectedVariety, Validators.required],
      price: ['', Validators.required, trimValidator],
    });
  }

  getCrops = () => {
    this.productService.getAllCrops().subscribe((data: any[]) => {
      this.crops = data;
      if (this.data.id) {
        this.gradeService.getGradeById(this.data?.id).subscribe(async(data: any) => {
          this.id = data?.id;
          this.selectedCrop = data?.variety?.crop;
          this.selectedVariety = data?.variety;
          await this.getVariety(data?.variety?.crop?.id);
         this.gradeForm = this.formBuilder.group({
           name: [data?.name],
           crop: [this.selectedCrop],
           variety: [this.selectedVariety],
           price: [data?.price]
          });
        })
      }
    })
  }

  changeVariety = (event: any) =>{
    this.getVariety(event?.id);
  }

  async getVariety(event: any) {
    this.productService.getVareityByCrop(event).then((data: any[]) => {
      this.varieties = data;
    })
  }
  submitForm = () => {
    this.isSubmit = true;
    this.gradeForm.markAllAsTouched();
    this.cropMultiSelectComponent.formInvalid();
    this.varietyMultiSelectComponent.formInvalid();
    this.saveEvent.emit(true);
    this.gradeForm.patchValue({crop:this.selectedCrop, variety:this.selectedVariety});
    let gradeData = this.gradeForm.value;
    if (this.id) {
      gradeData.id = this.id;
    }
    this.sendForm(gradeData);
  };
  sendForm = (gradeData) => {
    if (!this.gradeForm.invalid) {
      this.gradeService.addGrade(gradeData).subscribe((data: any) => {
          this.cancel();
          this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
            'Grade Added', 'Your information has been saved successfully!');
      });
    }
  };
  get basic() {
    return this.gradeForm.controls;
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
