import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { MultiSelectComponent } from 'src/app/common/multi-select/multi-select.component';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { trimValidator } from 'src/app/common/trim.validator';
import { CatalogueService } from '../../catalogue/catalogue.service';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-training-add',
  templateUrl: './training-add.component.html',
  styleUrls: ['./training-add.component.scss'],
})
export class TrainingAddComponent implements OnInit {
  @ViewChild('trainingTypeMultiSelect', { static: false })
  trainingTypeMultiSelectComponent: MultiSelectComponent;
  trainingTypes = [];
  trainingForm: FormGroup;
  selectedTrainingType: any;
  id: string;
  title: string;
  public isSubmit: boolean = false;

  public event: EventEmitter<any> = new EventEmitter();
  protected _onDestroy = new Subject<void>();
  @Output() saveEvent = new EventEmitter();

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private catalogueService: CatalogueService,
    private responseModalService: ResponseModalService,
    private appConfiguration: AppConfiguration,
    private trainingService: TrainingService
  ) {}

  ngOnInit() {
    this.title = this.data?.title;
    this.getTrainingTypes();
    this.trainingForm = this.formBuilder.group({
      name: ['', [Validators.required, trimValidator]],
      trainingType: [this.selectedTrainingType, [Validators.required]],
    });
  }

  getTrainingTypes = () => {
    this.trainingService.getTrainingTypes().subscribe((data: any[]) => {
      this.trainingTypes = data;
      if (this.data.id) {
        this.trainingService.getTrainingById(this.data?.id).subscribe((data: any) => {
          this.selectedTrainingType = data?.trainingType;
          this.id = data?.id;
          this.trainingForm = this.formBuilder.group({
            name: [data?.name],
            trainingType:[this.selectedTrainingType]
          });
        })
      }
    })
  }

  submitForm = () => {
    this.isSubmit = true;
    this.trainingForm.markAllAsTouched();
    this.trainingTypeMultiSelectComponent.formInvalid();
    this.saveEvent.emit(true);
    this.trainingForm.patchValue({trainingType : this.selectedTrainingType});
    let trainingData = this.trainingForm.value;
    if (this.id) {
      trainingData.id = this.id;
    }
    this.sendForm(trainingData);
  };

  sendForm = (data) => {
    if (!this.trainingForm.invalid) {
      this.trainingService.addTraining(data).subscribe((data: any) => {
        this.cancel();
        this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,'Training Added','Your information has been saved successfully!');
      });
    }
  };

  cancel = () => {
    this.dialogRef.close(true);
  };

  public objectComparisonFunction = function (option, value): boolean {
    return option.id === value.id;
  };

  get basic() {
    return this.trainingForm.controls;
  }

  triggerEvent = () => {
    this.event.emit({ data: true });
  };
}
