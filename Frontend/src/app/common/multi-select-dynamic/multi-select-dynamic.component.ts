import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NgForm, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Observable, ReplaySubject, Subject, Subscription } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { FarmerWidgetComponent } from '../../components/farmer/farmer-widget/farmer-widget.component';

@Component({
  selector: 'app-multi-select-dynamic',
  templateUrl: './multi-select-dynamic.component.html',
  styleUrls: ['./multi-select-dynamic.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiSelectDynamicComponent),
    multi: true
  }]
})
export class MultiSelectDynamicComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
  @ViewChild('multiSelectDynamic') multiSelectDynamic: ElementRef;
  private eventsSubscription: Subscription;
  @Input() options: any[];
  @Input() isRequired: boolean;
  @Input() label: string;
  @Input() dropDownValue: any = {};
  @Input() emitId: string;
  @Input() events: Observable<any[]>;
  @Input() isMultiSelect: boolean = true;
  @Input() isSubmit: boolean;
  @Input() dropDownId: any;
  @Input() widgetName: string;
  @Input() disabled: boolean;
  @Output() dropDownValueChange = new EventEmitter();
  @Output() dropDownNameChange = new EventEmitter();
  @Output() updateOption: EventEmitter<any> = new EventEmitter();
  public _value: string;
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
  multiSelectDynamicForm: FormGroup;

  @ViewChild('multiSelectDynamic', { static: false }) multiSelect: MatSelect;
  @ViewChild('dropDownForm', { static: false }) dropDownForm: NgForm;

  protected _onDestroy = new Subject();

  constructor(public formBuilder: FormBuilder,) {
  }
  ngOnInit() {
    console.log(this.widgetName);
    if (!!!this.widgetName)
      this.widgetName = this.dropDownId;
    this.updateOptions(this.options);
    this.eventsSubscription = this.events?.subscribe((data: any[]) => {
      if (!!data)
        this.updateOptions(data);
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
  onFocus($event) {
    //console.log($event);
    this.updateOption.emit(this.dropDownId);
    //this.updateOptions();
  }
  ngAfterViewInit() {
    this.setInitialValue();
  }
  onchange(event) {
    this.writeValue(event);
    this.dropDownValueChange.emit(event);
  }
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
    this.multiSelectDynamicForm.markAllAsTouched();
  }
  get basic() {
    return this.multiSelectDynamicForm.controls;
  }
  updateOptions(options: any[]) {
    this.options = options;
    if (!!this.options)
      this.filteredWebsitesMulti.next(this.options.slice());

    this.websiteMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterWebsiteMulti();
      });
    this.multiSelectDynamicForm = this.formBuilder.group({
      multiSelect: ['']
    });
  }

}
