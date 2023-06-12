import { Component, OnInit, Input, Output, EventEmitter, Inject, OnDestroy} from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, Observable, ReplaySubject, Subject } from 'rxjs';
import { ResponseModalService } from '../../../../../common/response-modal/response-modal.service';
import { CropService } from '../crop.service';
import { AppConfiguration } from '../../../../../common/App.configuration';
import { takeUntil } from 'rxjs/operators';
import { trimValidator } from 'src/app/common/trim.validator';

@Component({
  selector: 'app-crop-add',
  templateUrl: './crop-add.component.html',
  styleUrls: ['./crop-add.component.scss']
})
export class CropAddComponent implements OnInit,OnDestroy {
  private eventsSubscription: Subscription;
  private editEventsSubscription: Subscription;
  public event: EventEmitter<any> = new EventEmitter();

  @Input() events: Observable<void>;
  @Output() saveEvent = new EventEmitter();

  isSubmit: boolean;
  cropForm: FormGroup;
  id: string;
  title: string;
  catalogues = [];
  public catalogueFilterCtrl: FormControl = new FormControl();
  public filteredCatalogue: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  protected _onDestroy = new Subject<void>();
  constructor(public formBuilder: FormBuilder, public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, private cropService: CropService,
    private responseModalService: ResponseModalService,
    private appConfiguration: AppConfiguration) {
  }

  ngOnInit(): void {
    this.getCatalogues();
    this.title = this.data?.title;
    this.cropForm = this.formBuilder.group({
      name: ['', [Validators.required, trimValidator]],
      unit: ['', Validators.required],
    });
    this.isSubmit = false;
    this.catalogueFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.cropFilter();
      });
  }
  protected cropFilter = () =>  {
    if (!this.catalogues) {
      return;
    }
    // get the search keyword
    let search = this.catalogueFilterCtrl.value;
    if (!search) {
      this.filteredCatalogue.next(this.catalogues.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredCatalogue.next(
      this.catalogues.filter(catelogue => catelogue.name.toLowerCase().indexOf(search) > -1)
    );
  }
  getCatalogues = () => {
    this.cropService.getCatalogues().subscribe((data: any) => {
      this.catalogues = data;
      this.filteredCatalogue.next(this.catalogues.slice());
      if (this.data.id) {
        this.cropService.getCropById(this.data?.id).subscribe((data: any) => {
          this.id = data?.id;
          // let unit = { branch: null, id: "c1f4f167a7", isActive: true, isDeleted: false, name: "Litre", revisionNo: 1627039313466 };
          this.cropForm = this.formBuilder.group({
            name: [data?.name],
            unit: [data?.unit],
          });
        });
      }
    });
  }
  submitForm = () => {
    this.isSubmit = true;
    this.saveEvent.emit(true);
    let cropData = this.cropForm?.value;
    if (this.id) {
      cropData.id = this.id;
    }
    this.sendForm(cropData);
  };

  sendForm = (data) => {
    if (!this.cropForm.invalid) {
      this.cropService.addCrop(data).subscribe((data: any) => {
          this.cancel();
          this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
            'Crop Added', 'Your information has been saved successfully!');
      });
    }
  };
  get basic() {
    return this.cropForm.controls;
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
