import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, Observable } from 'rxjs';
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { AppConfiguration } from '../../../../common/App.configuration';
import { GroupService } from '../group.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-group-add',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.scss']
})
export class GroupAddComponent implements OnInit {
  private eventsSubscription: Subscription;
  private editEventsSubscription: Subscription;
  public event: EventEmitter<any> = new EventEmitter();

  @Input() events: Observable<void>;
  @Output() saveEvent = new EventEmitter();

  isSubmit: boolean;
  groupForm: FormGroup;
  id: string;
  title: string;
  constructor(public formBuilder: FormBuilder, public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, private groupService: GroupService,
    private responseModalService: ResponseModalService,public datepipe: DatePipe,
    private appConfiguration: AppConfiguration) {
  }

  ngOnInit(): void {
    this.title = this.data?.title;
    this.groupForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      count: ["", [Validators.required]],
      formationDateStr: ['', Validators.required],
    });
    if (this.data.id) {
      this.groupService.getGroupById(this.data?.id).subscribe((data: any) => {
        this.id = data?.id;
        this.groupForm.patchValue({
          name: data?.name,
          count:data?.count,
          formationDateStr: new Date(data?.formationDateStr)
        });
      })
    }
    this.isSubmit = false;
  }
  submitForm = () => {
    this.isSubmit = true;
    this.saveEvent.emit(true);
    let groupData = this.groupForm?.value;
    groupData.formationDateStr = this.datepipe.transform(this.groupForm?.value?.formationDateStr, "MM/dd/yyyy");
    if (this.id) {
      groupData.id = this.id;
    }
    this.sendForm(groupData);
  };

  sendForm = (data) => {
    if (!this.groupForm.invalid) {
      this.groupService.addGroup(data).subscribe((data: any) => {
          this.cancel();
          this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
            'Group Added', 'Your information has been saved successfully!');
        });
    }
  };
  get basic() {
    return this.groupForm.controls;
  }

  triggerEvent=()=> {
    this.event.emit({ data: true });
  }
  cancel = () => {
    this.dialogRef.close(true);
  }
}

