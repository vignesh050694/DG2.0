import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, Observable } from 'rxjs';
import { SeasonService } from '../season.service';
import { DatePipe } from '@angular/common'
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { AppConfiguration } from '../../../../common/App.configuration';
import { trimValidator } from '../../../../common/trim.validator'

@Component({
  selector: 'app-season-add',
  templateUrl: './season-add.component.html',
  styleUrls: ['./season-add.component.scss']
})
export class SeasonAddComponent implements OnInit {
  private eventsSubscription: Subscription;
  private editEventsSubscription: Subscription;
  public event: EventEmitter<any> = new EventEmitter();

  @Input() events: Observable<void>;
  @Output() saveEvent = new EventEmitter();

  isSubmit: boolean;
  seasonForm: FormGroup;
  id: string;
  title: string;
  minDate: Date;
  fromDate: any;
  toDate: any;
  seasonRange: any;
  constructor(public formBuilder: FormBuilder, public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, private seasonService: SeasonService,
    public datepipe: DatePipe, private responseModalService: ResponseModalService,
    private appConfiguration: AppConfiguration) {
  }

  ngOnInit(): void {
    this.title = this.data?.title;
    this.seasonForm = this.formBuilder.group({
      name: ['', [Validators.required, trimValidator]],
      from: ['', [Validators.required]],
      to: ['', [Validators.required]]
    });
    if (this.data.id) {
      this.seasonService.getSeasonById(this.data?.id).subscribe((data: any) => {
        this.id = data?.id;
        this.seasonForm = this.formBuilder.group({
          name: [data?.name],
          from: [new Date(data?.from)],
          to: [new Date(data?.to)],
        });
      })
    }
    //this.isSubmit = false;
  }
  submitForm = () => {
    this.isSubmit = true;
    this.saveEvent.emit(true);
    let seasonData = this.seasonForm?.value;
    seasonData.from = this.datepipe.transform(this.seasonForm?.value?.from, "MM/dd/yyyy");
    seasonData.to = this.datepipe.transform(this.seasonForm?.value?.to, "MM/dd/yyyy");
    if (this.id) {
      seasonData.id = this.id;
    }
    this.sendForm(seasonData);
  };

  sendForm = (data) => {
    if (!this.seasonForm.invalid) {
      this.seasonService.addSeason(data).subscribe((data: any) => {
        if (data != null) {
          this.dialogRef.close(true);
          this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
            'Season Added', 'Your information has been saved successfully!');
        }
      });
    }
  };
  get basic() {
    return this.seasonForm.controls;
  }

  triggerEvent = () => {
    this.event.emit({ data: true });
  }
  cancel = () => {
    this.dialogRef.close(false);
  }

  dateRange = (event: any) => {
    this.fromDate = event?.value;
    this.toDate = new Date(this.fromDate);
    this.toDate.setMonth(this.toDate.getMonth() + 1);
    this.seasonRange = this.toDate.toISOString().slice(0, 10);
    //this.fromDate=new Date(event?.getDate());
  }

}
