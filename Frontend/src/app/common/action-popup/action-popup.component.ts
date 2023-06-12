import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-action-popup',
  templateUrl: './action-popup.component.html',
  styleUrls: ['./action-popup.component.scss']
})
export class ActionPopupComponent implements OnInit {
  title: string
  description: string;
  constructor(private _mdr: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.title = data.title;
    this.description = data.description;
  }

  ngOnInit(): void {
  }
  close = () => {
    this._mdr.close(false)
  }
  confirm = (resp:boolean) =>{

  }
}

