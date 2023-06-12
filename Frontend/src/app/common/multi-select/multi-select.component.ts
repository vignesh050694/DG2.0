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
  selector: "app-multi-select",
  templateUrl: "./multi-select.component.html",
  styleUrls: ["./multi-select.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true,
    },
  ],
})
export class MultiSelectComponent
  implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor
{
  show:boolean = false;
  public filteredWebsitesMulti: any = new ReplaySubject(1);
  title = "app-material3";
  private option:any;
  tempVar:any = "No option available";
  @Input() set options(value:any){
      this.option = value;
      this.filteredWebsitesMulti.next(this.option?.slice());
  }
  get options(){
    return this.option;
  }
  @Input() label: string;
  @Input() dropDownValue: string = "";
  @Input() isMultiSelect: boolean = true;
  @Input() isSubmit: boolean;
  @Input() isRequired: boolean;
  @Output() dropDownValueChange = new EventEmitter();
  @Input() dropDownId: any;

  private _value: string;
  // Whatever name for this (myValue) you choose here, use it in the .html file.
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

  constructor(public formBuilder: FormBuilder) {}

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

  // ngOnChanges(changes: SimpleChanges): void {
  //   this.check();
  // }

  onChange = (_) => {};
  onTouched = () => {};

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
    // this.filteredWebsitesMulti.next(this.options?.slice());
  }

  /**
   * Write code on Method
   *
   * method logical code
   */
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
    this.filteredWebsitesMulti.complete();
  }
  // modelChange(event) {}
  // protected setInitialValue() {
  //   this.filteredWebsitesMulti
  //     .pipe(take(1), takeUntil(this._onDestroy))
  //     .subscribe(() => {
  //       this.multiSelect.compareWith = (a: any, b: any) =>
  //         a && b && a.id === b.id;
  //     });
  // }

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
      this.options.filter(
        (bank) => bank?.name.toLowerCase().indexOf(search) > -1
      )
    );
  }
  public formInvalid() {
    this.multiSelectForm.markAllAsTouched();
  }
  get basic() {
    return this.multiSelectForm?.controls;
  }
  public objectComparisonFunction = function (option, value): boolean {
    return option?.id === value?.id;
  };
}
