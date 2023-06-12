import { Component, OnInit, Input, Output, EventEmitter, Inject, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, Observable, ReplaySubject, Subject } from 'rxjs';
import { ResponseModalService } from '../../../../../common/response-modal/response-modal.service';
import { AppConfiguration } from '../../../../../common/App.configuration';
import { SubCategoryService } from '../sub-category.service'
import { takeUntil } from 'rxjs/operators';
import { trimValidator } from 'src/app/common/trim.validator';
import { MultiSelectComponent } from 'src/app/common/multi-select/multi-select.component';

@Component({
  selector: 'app-sub-category-add',
  templateUrl: './sub-category-add.component.html',
  styleUrls: ['./sub-category-add.component.scss']
})
export class SubCategoryAddComponent implements OnInit {
  @ViewChild('categoryMultiSelect', { static: false }) categoryMultiSelectComponent: MultiSelectComponent;
  @ViewChild('catalogueMultiSelect', { static: false }) catalogueMultiSelectComponent: MultiSelectComponent;
  private eventsSubscription: Subscription;
  private editEventsSubscription: Subscription;
  public event: EventEmitter<any> = new EventEmitter();
  @Input() events: Observable<void>;
  @Output() saveEvent = new EventEmitter();
  isSubmit: boolean = false;
  subCategoryForm: FormGroup;
  id: string;
  title: string;
  catalogues = [];
  categories = [];
  selectedCategory : any;
  selectedCatalogue: any;
  protected _onDestroy = new Subject<void>();
  constructor(public formBuilder: FormBuilder, public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, private subCategoryService: SubCategoryService,
    private responseModalService: ResponseModalService,
    private appConfiguration: AppConfiguration) {
  }

  ngOnInit(): void {
    this.getCatalogues();
    this.getCategory();
    this.title = this.data?.title;
    this.subCategoryForm = this.formBuilder.group({
      category: [this.selectedCategory, [Validators.required]],
      name: ['', [Validators.required, trimValidator]],
      unit: [this.selectedCatalogue, [Validators.required]],
      price: ['', [Validators.required, trimValidator,Validators.maxLength(6),Validators.pattern('[0-9]+')]]
    });
  }

  getCatalogues = () => {
    this.subCategoryService.getCatalogues().subscribe((data: any) => {
      this.catalogues = data;
      if (this.data.id) {
        this.subCategoryService.getSubCategoryById(this.data?.id).subscribe((data: any) => {
          this.id = data?.id;
          this.selectedCatalogue = data?.unit;
          this.selectedCategory = data?.category;
          this.subCategoryForm = this.formBuilder.group({
            category: [this.selectedCategory],
            name: [data?.name],
            unit: [this.selectedCatalogue],
            price: [data?.price],
          });
        })
      }
    });
  }
  getCategory = () => {
    this.subCategoryService.getAllCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  submitForm = () => {
    this.isSubmit = true;
    this.subCategoryForm.markAllAsTouched();
    this.catalogueMultiSelectComponent.formInvalid();
    this.categoryMultiSelectComponent.formInvalid();
    this.saveEvent.emit(true);
    this.subCategoryForm.patchValue({category:this.selectedCategory, unit:this.selectedCatalogue});
    let cropData = this.subCategoryForm?.value;
    if (this.id) {
      cropData.id = this.id;
    }
    this.sendForm(cropData);
  };

  sendForm = (data) => {
    if (!this.subCategoryForm.invalid) {
      this.subCategoryService.addSubCategory(data).subscribe((data: any) => {
          this.cancel();
          this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
            'Sub Category Added', 'Your information has been saved successfully!');
      });
    }
  };

  get basic() {
    return this.subCategoryForm.controls;
  }

  triggerEvent = () => {
    this.event.emit({ data: true });
  }
  cancel = () => {
    this.dialogRef.close(true);
  }
  ngOnDestroy = () =>  {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  public objectComparisonFunction = function (option, value): boolean {
    return option.id === value.id;
  }
}
