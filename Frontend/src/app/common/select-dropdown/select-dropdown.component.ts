import {
  AfterViewInit,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  NG_VALUE_ACCESSOR,
  Validators,
} from "@angular/forms";
import { MatSelect } from "@angular/material/select";
import { of, ReplaySubject, Subject } from "rxjs";
import { delay, take, takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.scss']
})
export class SelectDropdownComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
  show: boolean = false;
  public filteredWebsitesMulti: any[] | object;
  title = "app-material3";
  private option: any;
  tempVar: any = "No option available";
  @Input() set options(value: any[] | object) {
    this.option = value;
    if (Array.isArray(this.options)) {
      this.filteredWebsitesMulti = this.options.slice();
    } else {
      this.filteredWebsitesMulti = this.options;
    }

  }
  get options(): any[] | object {
    return this.option;
  }
  @Input() label: string;
  @Input() dropDownValue: string = "";
  @Input() isMultiSelect: boolean = true;
  @Input() isSubmit: boolean;
  @Input() isRequired: boolean;
  @Output() dropDownValueChange = new EventEmitter();
  @Input() dropDownId: any;
  @Input() labelField: string;
  @Input() valueField: string;
  private _value: string;
  public get myValue(): string {
    return this._value;
  }
  public set myValue(v: string) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }
  public dropDownControl: FormControl;
  public websiteMultiFilterCtrl: FormControl = new FormControl();
  multiSelectForm: FormGroup;

  @ViewChild("multiSelect", { static: false }) multiSelect: MatSelect;
  @ViewChild("dropDownForm", { static: false }) dropDownForm: NgForm;

  protected _onDestroy = new Subject();

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.websiteMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterWebsiteMulti();
      });
    this.multiSelectForm = this.formBuilder.group({
      multiSelect: [""],
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
    throw new Error("Method not implemented.");
  }

  ngAfterViewInit() { }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
   
  }

  protected filterWebsiteMulti() {
    if (!this.options) {
      return;
    }
  
    let search = this.websiteMultiFilterCtrl.value;
  
    if (!search) {
      if (Array.isArray(this.options)) {
        this.filteredWebsitesMulti = this.options.slice();
      } else {
        this.filteredWebsitesMulti = this.options;
      }
      return;
    } else {
      search = search.toLowerCase();
    }

    if (Array.isArray(this.options)) {
      this.filteredWebsitesMulti = this.options.filter((option) => {
        const value = JSON.stringify(option).toLowerCase();
        return value.includes(search);
      });
    } else {
      this.filteredWebsitesMulti =  this.filterObject(this.options, (value) => value.toLowerCase().includes(search.toLowerCase()));
 
      
    }
  }
  public filterObject(obj: any, condition: (value: any) => boolean): any {
    return Object.keys(obj).reduce((filteredObj, key) => {
      if (condition(obj[key])) {
        filteredObj[key] = obj[key];
      }
      return filteredObj;
    }, {});
  }
  public formInvalid() {
    this.multiSelectForm.markAllAsTouched();
  }

  get basic() {
    return this.multiSelectForm?.controls;
  }

  isArray(obj: any): boolean {
    return Array.isArray(obj);
  }

  getObjectKeys(obj: any) {
   
    return obj!=null && obj!=undefined ? Object.keys(obj) : '';
  }

  public objectComparisonFunction = function (option, value): boolean {
    return option?.id === value?.id;
  };

}
