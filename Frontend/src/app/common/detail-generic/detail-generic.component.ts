import { Component, OnInit, ViewChild, Output, EventEmitter, TemplateRef, Input } from '@angular/core';
import { DetailGeneric } from './detail-generic';

@Component({
  selector: 'app-detail-generic',
  templateUrl: './detail-generic.component.html',
  styleUrls: ['./detail-generic.component.scss']
})
export class DetailGenericComponent implements OnInit {
  @Input() detaildatas: DetailGeneric[];
  @Input() isEdit: boolean;
  @Input() isDelete: boolean;

  constructor() { }

  ngOnInit(): void {
    console.log(this.detaildatas[0]);
  }

}
