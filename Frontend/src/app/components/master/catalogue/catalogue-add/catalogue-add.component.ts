import { Component, OnInit, Input, Output, EventEmitter, Inject, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, Observable, ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MultiSelectComponent } from 'src/app/common/multi-select/multi-select.component';
import { trimValidator } from 'src/app/common/trim.validator';
import { AppConfiguration } from '../../../../common/App.configuration';
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { CatalogueService } from '../catalogue.service';

@Component({
  selector: 'app-catalogue-add',
  templateUrl: './catalogue-add.component.html',
  styleUrls: ['./catalogue-add.component.scss']
})
export class CatalogueAddComponent implements OnInit {
  @ViewChild('catalogueMultiSelect', { static: false }) catalogueMultiSelectComponent: MultiSelectComponent;
  public event: EventEmitter<any> = new EventEmitter();
  catalogueTypes = [];
  @Input() events: Observable<void>;
  @Output() saveEvent = new EventEmitter();
  public isSubmit: boolean = false;
  catalogueForm: FormGroup;
  id: string;
  title: string;
  selectedCatalogueType: any;

  protected _onDestroy = new Subject<void>();

  constructor(public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private catalogueService: CatalogueService,
    private responseModalService: ResponseModalService,
    private appConfiguration: AppConfiguration) {
  }

  ngOnInit() {
    this.title = this.data?.title;
    this.getCatalogues();
    this.catalogueForm = this.formBuilder.group({
      name: ['', [Validators.required, trimValidator]],
      catalogueType:[this.selectedCatalogueType,[Validators.required]],
      isActive: [false, [Validators.required]],
    });


  }

  getCatalogues = () => {
    this.catalogueService.getCataloguesTypes().subscribe((data: any[]) => {
      this.catalogueTypes = data;
      if (!!this.data.id) {
        this.catalogueService.getCataloguesById(this.data?.id).subscribe((data: any) => {
          this.selectedCatalogueType = data?.catalogueType;
          this.id = data?.id;
          this.catalogueForm = this.formBuilder.group({
            name: [data?.name],
            catalogueType : [this.selectedCatalogueType],
            isActive: [data?.isActive]
          });
        })
      }
    })
  }

  submitForm = () => {
    this.isSubmit = true;
    this.catalogueMultiSelectComponent.formInvalid();
    this.saveEvent.emit(true);
    this.catalogueForm.patchValue({catalogueType : this.selectedCatalogueType});
    let catalogueData = this.catalogueForm.value;
    if (this.id) {
      catalogueData.id = this.id;
    }
    this.sendForm(catalogueData);
  };

  sendForm = (data) => {
    this.catalogueForm.markAllAsTouched();
    if (!this.catalogueForm.invalid) {
      this.catalogueService.addCatalogue(data).subscribe((data: any) => {
        this.cancel();
        this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
          'Catalogue Added', 'Your information has been saved successfully!');
      });
    }
  };

  get basic() {
    return this.catalogueForm.controls;
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

}
