import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-dropdown-search',
  templateUrl: './dropdown-search.component.html',
  styleUrls: ['./dropdown-search.component.scss']
})
export class DropdownSearchComponent implements OnInit {
  public filterCtrl: FormControl = new FormControl();
  public filteredArray: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @Input() datas : any[];
  @Input() name: string;
  @Input() selectedData: any;
  @Input() private datatrigger: EventEmitter<any>;
  @Input() private savetrigger: EventEmitter<any>;
  @Output() valueEmitter = new EventEmitter();
  isSubmit: boolean = false;

  isError: boolean = false;
  protected _onDestroy = new Subject<void>();
  constructor() { }

  ngOnInit(): void {
    if (this.datas.length > 0) {
      this.filteredArray.next(this.datas.slice());
    }
    if (this.savetrigger) {
      this.savetrigger.subscribe((data) => {
        this.isSubmit = true;
        if (typeof this.selectedData != 'undefined' && this.selectedData) {
          this.save();
        }
        else
          this.isError = true

      });
    }
    if (this.datatrigger) {
      this.datatrigger.subscribe((data) => {
        this.datas = data;
        this.filteredArray.next(this.datas.slice());
      });
    }
    this.filterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filter();
      });
  }
  ngOnDestroy = () => {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  save = () => {
    this.valueEmitter.emit(this.selectedData);
  }
  protected filter = () => {
    if (!this.datas) {
      return;
    }
    // get the search keyword
    let search = this.filterCtrl.value;
    if (!search) {
      this.filteredArray.next(this.datas.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredArray.next(
      this.datas.filter(country => country.name.toLowerCase().indexOf(search) > -1)
    );
  }
  public objectComparisonFunction = function (option, value): boolean {
    return option.id === value.id;
  }
}
