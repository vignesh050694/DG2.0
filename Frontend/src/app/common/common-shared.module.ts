import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MapDialouge, TableGenericComponent } from '../common/table-generic/table-generic.component'
import { MaterialModule } from './material.module';
import { ResponseModalComponent } from './response-modal/response-modal.component';
import { ResponseModalService } from './response-modal/response-modal.service';
import { ActionPopupComponent } from './action-popup/action-popup.component';
import { TitleCasePipe } from './pipes/title-case.pipe';
import { PageHeaderComponent } from './page-header/page-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileUploadModule } from "ng2-file-upload";
import { DetailGenericComponent } from './detail-generic/detail-generic.component';
import { TranslateModule, TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ObjStringPipe } from './pipes/obj-string.pipe';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SearchFilterComponent } from '../common/search-filter/search-filter.component';
import { DynamicFormTemplateComponent } from './dynamic-forms/dynamic-form-template/dynamic-form-template.component';
import { DynamicFormsComponent } from './dynamic-forms/dynamic-forms/dynamic-forms.component';
import { DropdownSearchComponent } from './dropdown-search/dropdown-search.component';
import { RxReactiveDynamicFormsModule } from '@rxweb/reactive-dynamic-forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { MultiSelectDynamicTableComponent } from './multi-select-dynamic-table/multi-select-dynamic-table.component';
import { MultiSelectDynamicComponent } from './multi-select-dynamic/multi-select-dynamic.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { AgmCoreModule } from '@agm/core';
import { CommonTableComponent } from './common-table/common-table.component';
import { SelectDropdownComponent } from './select-dropdown/select-dropdown.component';
import { GenericDropdownComponent } from './generic-dropdown/generic-dropdown.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [TableGenericComponent, DetailGenericComponent, ResponseModalComponent, TitleCasePipe,
    PageHeaderComponent, FileUploadComponent, ObjStringPipe, ActionPopupComponent, SearchFilterComponent,
    DynamicFormsComponent, DynamicFormTemplateComponent, DropdownSearchComponent, MultiSelectComponent, MultiSelectDynamicComponent, MultiSelectDynamicTableComponent, MapDialouge,
    CommonTableComponent,
    SelectDropdownComponent,
    GenericDropdownComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FileUploadModule,
    TranslateModule.forChild(),
    NgxMatSelectSearchModule,
    RxReactiveFormsModule,
    RxReactiveDynamicFormsModule,
    HighchartsChartModule,
    AgmJsMarkerClustererModule,MatInputModule,
    MatSelectModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA4F9JYoct7v7oGvirzAx7_oK6XkNyL1oM'
    }),
  ],
  exports: [
    TableGenericComponent,
    ResponseModalComponent,
    MaterialModule,
    TitleCasePipe,
    PageHeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    FileUploadComponent,
    HttpClientModule,
    FileUploadModule,
    DetailGenericComponent,
    TranslateModule,
    ObjStringPipe,
    NgxMatSelectSearchModule,
    ActionPopupComponent,
    SearchFilterComponent,
    DynamicFormsComponent,
    DropdownSearchComponent,
    RxReactiveFormsModule,
    RxReactiveDynamicFormsModule,
    MultiSelectComponent,
    MultiSelectDynamicComponent,
    MultiSelectDynamicTableComponent,
    HighchartsChartModule,
    MapDialouge,
    AgmJsMarkerClustererModule,
    CommonTableComponent,SelectDropdownComponent,GenericDropdownComponent
  ],
  entryComponents: [
    ActionPopupComponent
  ],
  providers: [ResponseModalService, DatePipe]
})
export class CommonSharedModule {

}
