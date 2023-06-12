
import { CatalougeTypes } from './../../../../common/common.enum';
import { SeasonService } from 'src/app/components/master/season/season.service';
import { VarietyService } from './../../../master/product/variety/variety.service';
import { FarmService } from 'src/app/components/master/farm/farm.service';
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { MultiSelectComponent } from 'src/app/common/multi-select/multi-select.component';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { CatalogueService } from 'src/app/components/master/catalogue/catalogue.service';
import { StaticFarmerService } from '../../static-farmer.service';
import { StaticSowingService } from '../../static-sowing/static-sowing.service';
import { CropService } from 'src/app/components/master/product/crop/crop.service';
import { ProductService } from 'src/app/components/master/product/product.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SowingDetailComponent } from '../sowing-detail/sowing-detail.component';
import { FarmerFormService } from '../farmer-form.service';

@Component({
  selector: 'app-sowing-screen',
  templateUrl: './sowing-screen.component.html',
  styleUrls: ['./sowing-screen.component.scss']
})
export class SowingScreenComponent implements OnInit {

  @ViewChild('cropMultiSelect', { static: false }) cropMultiSelectComponent: MultiSelectComponent;
  @ViewChild('varietyMultiSelect', { static: false }) varietyMultiSelectComponent: MultiSelectComponent;
  @ViewChild('seasonMultiSelect', { static: false }) seasonMultiSelectComponent: MultiSelectComponent;
  @ViewChild("farmMultiSelect", { static: false }) farmMultiSelecttComponent: MultiSelectComponent;
  private event: EventEmitter<any> = new EventEmitter();

  @Input() events: Observable<void>;
  @Output() saveEvent = new EventEmitter();
  @Output() actionTrigger = new EventEmitter();
  @Input() farmId: any;
  @Input() id: any;
  @Input() farmerId: any;
  isSubmit: boolean;
  sowingForm: FormGroup;
  title: string;
  farmer: any;
  selectedSeedSource: any;
  selectedSowingType: any;
  sowingTypes = [];
  seedSources = [];
  cropCategories = [];
  farm: any;
  sowingData: any;
  selectedcrop: any;
  selectedvariety: any;
  selectedfarm: any;
  selectedSeason: any;
  selectedCropCategory: any;
  varieties = [];
  crops = [];
  farms = [];
  seasons = [];

  constructor(
    public formBuilder: FormBuilder,
    // private dialogRef : MatDialogRef<any>,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    private staticSowingService: StaticSowingService,
    private responseModalService: ResponseModalService,
    private appconfiguration: AppConfiguration,
    private farmerService: StaticFarmerService,
    private farmService: FarmService,
    private catalogueService: CatalogueService,
    private varietyService: VarietyService,
    private seasonService: SeasonService,
    private cropService: CropService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private productService: ProductService, private formService: FarmerFormService) { }

  setSowingForm = () => {
    this.sowingForm = this.formBuilder.group({
      farm: [""],
      season: [""],
      cropCategory: [""],
      crop: [""],
      variety: [""],
      sowingDateStr: [new Date()],
      cultivationArea: [""],
      sowingType: [""],
      seedSource: [""],
      seedQuantityUsed: [""],
      estimatedYield: [""]
    })
  }


  getValue = (value: any) => {
    if (value) return value;
    else return [];
  }

  getCatalogueValues = async () => {
    let catArr = this.formService.getSowingCatalogueArr();
    await this.catalogueService.getCataloguesByTypes(catArr).toPromise().then((datas: any) => {
      this.sowingTypes = this.getValue(datas[CatalougeTypes.sowingType]);
      this.seedSources = this.getValue(datas[CatalougeTypes.seedSource]);
      this.cropCategories = this.getValue(datas[CatalougeTypes.cropCategory]);
    });
    return true;
  }

  setCatalogueValues = (data: any) => {
    this.selectedSowingType = this.sowingTypes.find((catalogue: any) => catalogue?.id === data?.sowingType);
    this.selectedSeedSource = this.seedSources.find((catalogue: any) => catalogue?.id === data?.seedSource);
    this.selectedCropCategory = this.cropCategories.find((catalogue: any) => catalogue?.id === data?.cropCategory);
  }

  async ngOnInit() {
    this.title = 'Add'
    this.setSowingForm();
    this.getCatalogueValues();
    await this.getSeasons();
    this.getCrops();
    this.getFarms();
    if (this.id) {
      this.title = 'Edit';
      this.staticSowingService.getSowingById(this.id).subscribe((data: any) => {
        this.setCatalogueValues(data);
        this.getVarietyById(data?.variety);
        this.id = data?.id;
        this.farmer = data?.farmer;
        this.farm = data?.farm;
        this.selectedSeason = data?.season ? this.seasons.find((season: any) => season?.id === data?.season) : null;
        this.selectedcrop = data?.variety?.crop;
        this.selectedvariety = data?.variety;
        this.selectedfarm = data?.farm;
        this.sowingForm.patchValue({
          sowingDateStr: new Date(data?.sowingDateStr),
          cultivationArea: data?.cultivationArea,
          seedQuantityUsed: data?.seedQuantityUsed,
          estimatedYield: data?.estimatedYield,
          season: this.selectedSeason?.seasonName,
          crop: this.selectedcrop?.crop,
          variety: this.selectedvariety?.variety,
          farm: this.selectedfarm?.farm
        });
      })
    }
    this.isSubmit = false;
  }

  getSeasons = async () => {
    await this.seasonService.getAllSeasons().toPromise().then((data: any) => {
      this.seasons = data;
    })
  }
  getCrops = () => {
    this.productService.getAllCrops().toPromise().then((data: any) => {
      this.crops = data;
    })
  }

  getVarietyById = (id) => {
    this.varietyService.getVarietyById(id).toPromise().then((data: any) => {
      this.selectedcrop = data?.crop;
      this.selectedvariety = data;
    })
  }

  changeVariety = (event: any) => {
    if (event?.id) {
      this.staticSowingService.getVareityByCrop(event?.id).then((data: any[]) => {
        this.varieties = data;
      })
    }
  }


  getFarms = () => {
    this.farmerService.getFarmsByFarmerId(this.farmerId).toPromise().then((data: any) => {
      this.farms = data;
    })
  }

  submitForm = () => {
    this.isSubmit = true;
    this.validate();
    this.sowingForm.markAllAsTouched();
    this.saveEvent.emit(true);
    this.sowingForm.patchValue({
      farm: this.selectedfarm,
      season: this.selectedSeason?.id,
      crop: this.selectedcrop?.id,
      variety: this.selectedvariety?.id,
      sowingType: this.selectedSowingType?.id,
      seedSource: this.selectedSeedSource?.id,
      cropCategory: this.selectedCropCategory?.id,
    })
    let sowingData = this.sowingForm?.value;
    sowingData['sowingDateStr'] = this.datePipe.transform(this.sowingForm.value.sowingDateStr, 'MM/dd/yyyy');
    if (this.id) {
      sowingData['id'] = this.id;
      sowingData['']
    }
    this.sendForm(sowingData);
  };

  sendForm = (data) => {
    if (!this.sowingForm.invalid) {
      this.staticSowingService.addSowing(data).subscribe((data: any) => {
        this.cancel();
        this.responseModalService.OpenStatusModal(this.appconfiguration.successIconUrl,
          'Sowing Added', 'Your information has been saved successfullay!');
      });
    }
  };

  validate = () => {
    this.farmMultiSelecttComponent.formInvalid();
    this.cropMultiSelectComponent.formInvalid();
    this.varietyMultiSelectComponent.formInvalid();
  }

  triggerEvent = () => {
    this.event.emit({ data: true });
  }

  get basic() {
    return this.sowingForm.controls;
  }

  cancel = () => {
    this.actionTrigger.emit({ isEdit: false, farmId: null });
  }
}

@Component({
  selector: 'app-sowing-list-screen',
  template: `
    <div class="col-auto align-self-center" style="display:flex;justify-content: flex-end;padding:10px;align-items:center;">
      <button (click)="add()" class="btn bttn-primary bttn-add st mr-2">+</button><span class="p p-14 fw-700 text-dark">Add Sowing</span>
    </div>
    <app-common-table [count]="count" [displayedColumns]="displayedColumns" [definedColumns]="definedColumns"
  [searchColumns]="searchColumns" [canShowSearch]="true" [data]="sowings" [isAction]="true"
  [datatrigger]="datatrigger" (editRow)='edit($event)' [isDetail]="true"  (detailRow)="detail($event)" (deleteRow)="deleteConfirm($event)" (paginate)='onPaginate($event)' (searchEvent)='onSearch($event)'>

</app-common-table>

  `,
  styleUrls: ['./sowing-screen.component.scss']
})
export class SowingListScreenComponent implements OnInit {

  @Input() farmerId: any;
  @Output() actionTrigger = new EventEmitter();
  matDialogRef: MatDialogRef<any>;

  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ['Sowing Date', 'crop', 'variety', 'farm', 'farmer', 'cultivationarea', 'estimatedyield', 'actions'];
  searchColumns: any[] = [
    { name: 's.sowing_date', canShow: false },
    { name: 'c.name', canShow: true },
    { name: 'v.name', canShow: true },
    { name: 'f.name', canShow: true },
    { name: 'f2.name', canShow: true },
    { name: 's.cultivation_area', canShow: true },
    { name: 's.estimated_yield', canShow: true }];
  definedColumns = ['date', 'crop', 'variety', 'farm', 'farmer', 'cultivationarea', 'estimatedyield'];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  sowings: any[] = [];
  farms: any[] = [];
  farmer: any[] = [];
  filters: any[] = [];
  constructor(
    private staticSowingService: StaticSowingService,
    private responseModalService: ResponseModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

  detail = (id: any) => {
    this.matDialogRef = this.responseModalService.openModalRight(SowingDetailComponent, id);
    this.matDialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res?.key === "edit") { this.edit(res?.value) }
        else if (res?.key === "delete") { this.deleteConfirm(res?.value) }
      }
    });
  }



  loadData = () => {
    this.filters.push({ key: 'f2.id', operation: '=', value: this.farmerId });
    this.staticSowingService.getSowing(this.postPerPage, this.pageNumber, this.filters).subscribe((datas: any) => {
      this.filters = [];
      this.sowings = [];
      this.sowings = datas.data;
      this.datatrigger.emit(this.sowings);
      this.count = datas?.recordsTotal;
    })
  }

  onPaginate = (pageObject) => {
    this.postPerPage = pageObject.postPerPage;
    this.pageNumber = pageObject.pageNumber;
    this.loadData();
  }

  add = () => {
    this.actionTrigger.emit({ isEdit: true, sowingId: null });
  }

  edit = (rowId: any) => {
    this.actionTrigger.emit({ isEdit: true, sowingId: rowId });
  }

  deleteConfirm = (rowId: any) => {
    this.staticSowingService.deleteSowingById(rowId).subscribe((data: any) => {
      this.loadData();
    });
  }

  onSearch = (filters: any[]) => {
    this.filters = filters
    this.loadData();
  }


}
