import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { data } from 'jquery';
import { Observable, Subject, Subscription } from 'rxjs';
import { FarmerService } from '../farmer.service';

@Component({
  selector: 'app-farmer-widget',
  templateUrl: './farmer-widget.component.html',
  styleUrls: ['./farmer-widget.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FarmerWidgetComponent),
    multi: true
  }]
})
export class FarmerWidgetComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  private _value: any;
  // Whatever name for this (myValue) you choose here, use it in the .html file.
  public get myValue(): any {
    return this._value;
  }
  public set myValue(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }
  data: any[] = [];;
  dropdownValues: any = {};
  @Input() widget: any;
  @Input() value: any;
  @Input() pageId: any;
  @Output() valueChange = new EventEmitter();
  @Output() onError = new EventEmitter();
  @Input() pageData: any;
  optionReloadEvent: Subject<any> = new Subject<any>();
  @Output() pageDataChange = new EventEmitter();
  constructor(public farmerService: FarmerService, public httpClient: HttpClient) { }

  ngOnInit(): void {
    if (this.widget.type == 'table') {
      this.addNewRowInTable();
    }
    if (this.widget.type == 'multi-edit-table') {
      if (!!this.widget.tableControls) {
        this.widget.tableControls.forEach((table, index) => {
          let data = {
            "data": {
            }
          };
          console.log(this.widget.multiEditData);
          if (this.widget.multiEditData == undefined) {
            this.widget.multiEditData = [];
            this.widget.multiEditData.push(data);
          }
          else
            this.widget.multiEditData.push(data);
        });
      }
    }
  }

  ngAfterViewInit() {

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

  saveText(value) {
    this.value = value.target.value;
  }

  //to get DropDown Value and to get Dependency DropDown Value
  onDropDownValueChange = (event) => {
    try {
      this.writeValue(event);
      this.valueChange.emit(event);

      let params = {};
      if (this.widget?.dependency) {
        params["pid"] = this.farmerService.getPage();
        params[this.widget.id] = event?.id;
        if (!!!event.id)
          params[this.widget.id] = event;

        if (!!this.widget.dependency.depends && this.widget.dependency.depends.length) {
          this.widget.dependency.depends.forEach((depend: any) => {
            params[depend] = this.farmerService.result[depend];
          });
        }
        if (!!this.widget.dependency.childId) {
          params["component"] = this.widget.dependency.childId;
          if (!!this.widget.endPoint) {
            this.farmerService.getDropdownDependency(this.widget.endPoint, params).subscribe((data: any) => {
              if (Array.isArray(data)) {
                //For Dependency DropDown
                let farmerValues = this.farmerService.getOptionValues();
                farmerValues["select-" + this.widget.dependency.childId] = data;
                this.farmerService.setOptionValues(farmerValues);
              } else {
                for (var k in data) {
                  $("#" + k).text(data[k]);
                }

              }

            });

          }
        }
      }
      //emitts the Value
      if (!!this.widget.changeValues) {
        this.widget.changeValues.forEach((value: any) => {
          $('#widget-' + value.id).val(value.value).change();
          $('#widget-' + value.id).val(value.value).trigger('input');
        });
      }
    } catch (e) {
      console.log(e);
    }

  };


  onTableDropDownValueChange = (event) => {
    let params = {};
    if (this.widget?.dependency) {
      // params["pid"] = 'warehouse_stock_entry';
      params["pid"] = this.farmerService.getPage();
      params[this.widget.id] = $("#select-" + this.widget.id).val();

      if (!!this.widget.dependency.depends && this.widget.dependency.depends.length) {
        this.widget.dependency.depends.forEach((depend: any) => {
          params[depend] = this.farmerService.result[depend];
        });
      }

      if (!!this.widget.dependency.childId) {
        var options = $("#select-" + this.widget.dependency.childId);
        params["component"] = this.widget.id;
        if (!!this.widget.endPoint) {
          //remove previous options
          $("#select-" + this.widget.dependency.childId).html("<option value=''>Select</option>");
          try {
            this.farmerService.getDropdownDependency(this.widget.endPoint, params).subscribe((datas: any) => {
              datas?.forEach((data) => {
                options.append($("<option />").val(data?.id).text(data?.name));
                //options.append('<mat-option _ngcontent-xpt-c330="" role="option" class="mat-option mat-focus-indicator ng-tns-c130-13 ng-star-inserted" ng-reflect-value="6bc6b67389" id="mat-option-14" tabindex="0" aria-disabled="false" style=""><span class="mat-option-text"> India </span><div mat-ripple="" class="mat-ripple mat-option-ripple" ng-reflect-trigger="[object HTMLElement]" ng-reflect-disabled="false"></div></mat-option>');
              });
            });
          } catch (e) {

          }
        }
      }

      //emitts the Value
      this.valueChange.emit(this.value);
    }
    else {
      this.valueChange.emit(this.value);
    }
    if (!!this.widget.changeValues) {
      this.widget.changeValues.forEach((value: any) => {
        $('#widget-' + value.id).val(value.value).change();
        $('#widget-' + value.id).val(value.value).trigger('input');
      });
    }
  }

  //to get the Table From The Drop Down Value
  async onTableDropDownChange(event) {
    let params = {};
    if (this.widget?.dependency) {
      params[this.widget.id] = event;
      params["pid"] = this.farmerService.getPage();
      if (!!this.widget.dependency.depends && this.widget.dependency.depends.length) {
        this.widget.dependency.depends.forEach((depend: any) => {
          //get the Dependent Field Name and Dependent Value
          if (!(this.widget.id == depend))
            params[depend] = this.farmerService.result[depend];
        });
      }
      if (!!this.widget.dependency.childId) {
        params["component"] = this.widget?.id;
        if (!!this.widget.endPoint) {
          this.farmerService.getDropdownDependency(this.widget.endPoint, params).toPromise().then((datas: any[]) => {
            let pageids = this.pageData.pages;
            pageids.forEach((id: any) => {
              let cardData = this.pageData.segments[id?.id].card;
              cardData.forEach((card: any, cardIndex: number) => {
                let sectionData = card.sections;
                sectionData.forEach((section: any, sectionIndex: number) => {
                  let controls = section.controls;
                  controls.forEach((control: any, controlIndex: number) => {
                    if (control.id == this.widget.dependency.childId) {
                      var someString: any = datas;
                      //getting the String Format Data from Api
                      //var someString: any = '[{"isEdit":false,"data":{"accountType":"Savings","accountNumber":"32110004050899","bankName":"HDFCBank","branchDetails":"Porur","ifscCode":"HDFCL0000234"}},{"isEdit":false,"data":{"accountType":"AnimalAccount","accountNumber":"32110004050809","bankName":"HDFCBank","branchDetails":"Erode","ifscCode":"HDFCL0000112"}}]';
                      //converting the String Data to JSON
                      var jsonObject: any = someString;
                      if (jsonObject.type == 'multi-edit-table') {
                        this.pageData.segments[id?.id].card[cardIndex].sections[sectionIndex].controls[controlIndex] = jsonObject
                      } else {
                        this.pageData.segments[id?.id].card[cardIndex].sections[sectionIndex].controls[controlIndex].tableData = jsonObject
                      }

                      //Emitting the Updated Json Data
                      this.pageDataChange.emit(this.pageData);
                    }
                  });
                });
              });
            });
          });
        }
      }
      //Emitts the Value
      this.valueChange.emit(this.value);
    }
    else {
      this.valueChange.emit(this.value);
    }
    if (!!this.widget.changeValues) {
      this.widget.changeValues.forEach((value: any) => {
        $('#widget-' + value.id).val(value.value).change();
        $('#widget-' + value.id).val(value.value).trigger('input');
      });
    }
  }

  uploadImage = (value) => {
    console.log(value);
    this.writeValue(value);
    this.value = value;
    this.valueChange.emit(this.value);
  };

  //to Show Error Messages
  isError = (rules: any, value: string) => {
    let containsError = false;
    if (this.farmerService.getFarmerSubmit()) {
      if (rules?.required?.isRequired)
        if (!(!!value)) {
          containsError = true;
          this.onError.emit(containsError);
          return rules?.required?.errorMessage;
        }
        else {
          this.onError.emit(containsError);
        }
      else if ((!!rules?.pattern?.condition)) {
        var regex = new RegExp(rules?.pattern?.condition);
        if (!(regex.test(value))) {
          containsError = true;
          this.onError.emit(containsError);
          return rules?.pattern?.errorMessage;
        }
        else {
          this.onError.emit(containsError);
        }
      }

    }
    else {
      return "";
    }
  }

  //to show Some Fields Using Check Box Value
  onCheckboxChange(event, showIds: any[], showOffIds: any[], switchIds: any[], switchOffIds: any[]) {
    showIds.forEach((id: string) => {
      if (event?.target.checked == true) {
        $('#parent-' + id).show();
      }
      else {
        $('#parent-' + id).hide();
      }
    })
    showOffIds.forEach((id: string) => {
      if (event?.target.checked == true) {
        $('#parent-' + id).hide();
      }
      else {
        $('#parent-' + id).show();
      }
    });
    switchIds.forEach((id: string)=>{
      if(event?.target.checked == true){
        let pageids = this.pageData.pages;
        pageids.forEach((pageid: any) => {
          let cardData = this.pageData.segments[pageid?.id].card;
          cardData.forEach((cardArray: any, cardIndex: number) => {
            let sectionData = cardArray.sections;
            sectionData.forEach((section: any, sectionIndex: number) => {
              let controls = section.controls;
              controls.forEach((control: any, controlIndex: number) => {
                if (control.id == id) {
                    this.pageData.segments[pageid?.id].card[cardIndex].sections[sectionIndex].controls[controlIndex].isDisabled = false;
                  }
                  //Emitting the Updated Json Data
                  this.pageDataChange.emit(this.pageData);
              });
            });
          });
        });
      }
      else{
        let pageids = this.pageData.pages;
        pageids.forEach((pageid: any) => {
          let cardData = this.pageData.segments[pageid?.id].card;
          cardData.forEach((cardArray: any, cardIndex: number) => {
            let sectionData = cardArray.sections;
            sectionData.forEach((section: any, sectionIndex: number) => {
              let controls = section.controls;
              controls.forEach((control: any, controlIndex: number) => {
                if (control.id == id) {
                    this.pageData.segments[pageid?.id].card[cardIndex].sections[sectionIndex].controls[controlIndex].isDisabled = true;
                  }
                  //Emitting the Updated Json Data
                  this.pageDataChange.emit(this.pageData);
              });
            });
          });
        });
      }
    });
    switchOffIds.forEach((id: string)=>{
      if(event?.target.checked == true){
        let pageids = this.pageData.pages;
        pageids.forEach((pageid: any) => {
          let cardData = this.pageData.segments[pageid?.id].card;
          cardData.forEach((cardArray: any, cardIndex: number) => {
            let sectionData = cardArray.sections;
            sectionData.forEach((section: any, sectionIndex: number) => {
              let controls = section.controls;
              controls.forEach((control: any, controlIndex: number) => {
                if (control.id == id) {
                    this.pageData.segments[pageid?.id].card[cardIndex].sections[sectionIndex].controls[controlIndex].isDisabled = true;
                  }
                  //Emitting the Updated Json Data
                  this.pageDataChange.emit(this.pageData);
              });
            });
          });
        });
      }
      else{
        let pageids = this.pageData.pages;
        pageids.forEach((pageid: any) => {
          let cardData = this.pageData.segments[pageid?.id].card;
          cardData.forEach((cardArray: any, cardIndex: number) => {
            let sectionData = cardArray.sections;
            sectionData.forEach((section: any, sectionIndex: number) => {
              let controls = section.controls;
              controls.forEach((control: any, controlIndex: number) => {
                if (control.id == id) {
                    this.pageData.segments[pageid?.id].card[cardIndex].sections[sectionIndex].controls[controlIndex].isDisabled = false;
                  }
                  //Emitting the Updated Json Data
                  this.pageDataChange.emit(this.pageData);
              });
            });
          });
        });
      }
    });
  }

  //to edit the Table
  editTable = (isEdit, index) => {
    (this.widget.controls.forEach(editData => {
      $('.' + editData?.class).focus();
    }));
    this.widget.tableData[index].isEdit = !isEdit;
    if (isEdit) {
      this.valueChange.emit(this.widget.tableData);
    }
  };

  //to delete the Table
  deleteRowTable(index) {
    this.widget.tableData.splice(index, 1);
    this.valueChange.emit(this.widget.tableData);
  }

  //to add Data in the Table
  addNewRowInTable() {
    let data = {
      "isEdit": true, data: {}
    };
    this.widget.controls.forEach((control: any) => {
      data.data[control.id] = "";
    });
    //updates the First Row
    this.widget.tableData.unshift(data);
  }

  evalOp = (op: any) => {
    if (op != null && op != undefined) {
      var value = '0';
      for (let key in op?.operation) {
        if (key == 'inputs') {
          let values = op?.operation[key];
          values.forEach(element => {
            value = value + op?.operation.operation + $("#widget-" + element).val();
          });
        }
      }
      value = eval(value);
      //  $("#" + op.target).text(value);
      $("#widget-" + op.target).text(value);
      $("#widget-" + op.target).val(value).trigger("click");
    }
  };
  updateOption = (dropDownId) => {
    let values = this.farmerService.getOptionValues();
    //[{ "id": "123", "name": "test" }]
    if (!!values[dropDownId]) {
      let data = {};
      data["values"] = values[dropDownId];
      console.log(this.widget.id);
      this.optionReloadEvent.next(values[dropDownId]);
    }
  }
  saveMultiEditTable = () => {
    this.valueChange.emit(this.widget.tableData);
  }
  onMultiEditValueChange(columnId: string, event: any, i: number, tableId) {
    let pageids = this.pageData.pages;
    pageids.forEach((id: any) => {
      let cardData = this.pageData.segments[id?.id].card;
      cardData.forEach((card: any, cardIndex: number) => {
        let sectionData = card.sections;
        sectionData.forEach((section: any, sectionIndex: number) => {
          let controls = section.controls;
          controls.forEach((control: any, controlIndex: number) => {
            if (control.id == tableId) {
              let tableData = this.pageData.segments[id?.id].card[cardIndex].sections[sectionIndex].controls[controlIndex].tableData;
              let data = tableData[i].data;
              data[columnId] = event;
              tableData[i].data = data;
              this.pageData.segments[id?.id].card[cardIndex].sections[sectionIndex].controls[controlIndex].tableData = tableData;
              //Emitting the Updated Json Data
              this.valueChange.emit(tableData);
            }
          });
        });
      });
    });
  }
  onMultiEditChange(data) {
    this.valueChange.emit(data);
  }
}
