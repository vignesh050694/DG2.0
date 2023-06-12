import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-response-modal',
  templateUrl: './response-modal.component.html',
  styleUrls: ['./response-modal.component.scss']
})
export class ResponseModalComponent implements OnInit {
  icon: string;
  title: string
  description: string;
  constructor(private _mdr: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.icon = data.icon;
    this.title = data.title;
    this.description = data.description;
  }

  ngOnInit(): void {
  }
  close = () => {
    this._mdr.close(false)
  }
}
