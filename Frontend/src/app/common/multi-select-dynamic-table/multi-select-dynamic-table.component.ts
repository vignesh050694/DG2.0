import { AfterViewInit, Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NgForm, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-multi-select-dynamic-table',
  templateUrl: './multi-select-dynamic-table.component.html',
  styleUrls: ['./multi-select-dynamic-table.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiSelectDynamicTableComponent),
    multi: true
  }]
})
export class MultiSelectDynamicTableComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {

  title = 'app-material3';
  @Input() options: any[];
  @Input() isRequired: boolean;
  @Input() label: string;
  @Input() dropDownValue: string = "";
  @Input() isMultiSelect: boolean = true;
  @Input() isSubmit: boolean;
  @Output() dropDownValueChange = new EventEmitter();
  @Input() dropDownId: any;

  private _value: string;
  // Whatever name for this (myValue) you choose here, use it in the .html file.
  public get myValue(): string { return this._value }
  public set myValue(v: string) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }
  public dropDownControl: FormControl
  public websiteMultiFilterCtrl: FormControl = new FormControl();
  public filteredWebsitesMulti: any = new ReplaySubject(1);
  multiSelectTableForm: FormGroup;

  @ViewChild('multiSelect', { static: false }) multiSelect: MatSelect;
  @ViewChild('dropDownForm', { static: false }) dropDownForm: NgForm;

  protected _onDestroy = new Subject();

  constructor(public formBuilder: FormBuilder,) {
  }

  ngOnInit() {
    this.filteredWebsitesMulti.next(this.options.slice());

    this.websiteMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterWebsiteMulti();
      });
    this.multiSelectTableForm = this.formBuilder.group({
      multiSelect: ['']
    });
  }
  onChange = (_) => { };
  onTouched = () => { };

  writeValue(value: any): void {
    this.myValue = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  /**
   * Write code on Method
   *
   * method logical code
   */


  /**
   * Write code on Method
   *
   * method logical code
   */
  ngAfterViewInit() {
    //this.setInitialValue();
  }

  /**
   * Write code on Method
   *
   * method logical code
   */
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  modelChange(event) {
    console.log(event.target.value);
  }
  protected setInitialValue() {
    this.filteredWebsitesMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.multiSelect.compareWith = (a: any, b: any) => a && b && a.id === b.id;
      });
  }

  protected filterWebsiteMulti() {
    if (!this.options) {
      return;
    }

    let search = this.websiteMultiFilterCtrl.value;
    if (!search) {
      this.filteredWebsitesMulti.next(this.options.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredWebsitesMulti.next(
      this.options.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }
  public formInvalid() {
    this.multiSelectTableForm.markAllAsTouched();
  }
  get basic() {
    return this.multiSelectTableForm.controls;
  }
}
