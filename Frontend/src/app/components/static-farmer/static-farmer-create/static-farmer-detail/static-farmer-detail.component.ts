import { GroupService } from 'src/app/components/settings/group/group.service';
import { CropService } from './../../../master/product/crop/crop.service';
import { FarmerService } from './../../../farmer/farmer.service';
import { FarmerMapService } from './../farmer-map/farmer-map.service';
import { VillageService } from 'src/app/components/master/location/village/village.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { FarmerTabHeadingsEnum } from '../../../../common/common.enum';
import { StaticFarmerService } from '../../static-farmer.service';
import { environment } from 'src/environments/environment';
import { CatalogueService } from 'src/app/components/master/catalogue/catalogue.service';
import { event, data } from 'jquery';


@Component({
  selector: 'app-static-farmer-detail',
  templateUrl: './static-farmer-detail.component.html',
  styleUrls: ['./static-farmer-detail.component.scss']
})
export class StaticFarmerDetailComponent implements OnInit {

  @ViewChild('trainingDetailModal', { static: false }) farmerDetails: ElementRef;
  id: any;
  farmerReloadEvent: Subject<void> = new Subject<void>();
  farmReloadEvent: Subject<void> = new Subject<void>();
  sowingReloadEvent: Subject<void> = new Subject<void>();
  tabs: any = [{ key: 0, value: 'Farmer Detail' }, { key: 1, value: 'Farm Detail' }, { key: 2, value: 'Sowing Detail' }];
  buttonText: string;
  farmer: any;
  family: any;
  loan: any;
  farmerDetail: any;
  detailId: any;
  farmerCount = {};
  editData: any = {};
  title: string;
  selectedTab: any = "farmer";
  matDialogRef: MatDialogRef<any>;


  location: any;
  isFarm: boolean = false;
  farmId: any;
  sowingId: any;
  farmer1: any;
  mapData1: any = [];
  isSowing: boolean = false;
  crop: any;
  fgGroup: any;

  constructor(
    private route: ActivatedRoute,
    private responseModalService: ResponseModalService,
    private appConfiguration: AppConfiguration,
    private farmerService: StaticFarmerService,
    private villageService: VillageService,
    private router: Router,
    private farmerMapService: FarmerMapService,
    private catalogueService: CatalogueService,
    private cropService: CropService,
    private groupService: GroupService) {
  }

  getVillageById = (id: any) => {
    this.villageService.getVillageById(id).toPromise().then((data: any) => {
      this.location = data;
    })
  }
  showFarmScreen(event) {
    this.isFarm = event?.isEdit;
    this.farmId = event?.farmId;
  }

  displaySowingScreen(event) {
    this.isSowing = event?.isEdit;
    this.sowingId = event?.sowingId;
  }

  getCropById = (id: any) => {
    this.cropService.getCropById(id).toPromise().then((data: any) => {
      this.crop = data;
    })
  }

  getFarmerGroupById = (id: any) => {
    this.groupService.getGroupById(id).toPromise().then((data: any) => {
      this.fgGroup = data;
    })
  }

  ngOnInit(): void {
    // this.getTabs();
    this.getFarmerCount();
    this.headerTextChange();
    this.selectedTab = this.tabs[0];
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
    });
    if (this.id) {
      this.farmerService.getFarmerById(this.id).toPromise().then((data: any) => {
        this.farmer = data;
        this.getCatalogueValues(data);
        if (data?.image) {
          this.farmer['imageUrl'] = environment.baseUrl + this.appConfiguration.getImageUrl + data?.image;
          this.farmer['proofUrl'] = environment.baseUrl + this.appConfiguration.getImageUrl + data?.proofPhoto;
          this.farmer['printUrl'] = environment.baseUrl + this.appConfiguration.getImageUrl + data?.fingerPrintImg;
        }
        this.getVillageById(this.farmer?.village);
        this.getFarmerGroupById(this.farmer?.farmerGroup);
        this.getCropById(this.family?.cropInsured);
      });
    }
  }

  getCatalogueValues = (data) => {
    let catalougeArr = ['icsUnitNo', 'icsTracenetRegNo', 'certificateType', 'department', 'loanTakenFrom', 'purpose', 'period', 'security', 'fpoGroup'];
    catalougeArr.forEach((catalogue: any) => {
      if (data[catalogue]) {
        this.catalogueService.getCataloguesById(data[catalogue]).toPromise().then((value: any) => {
          this.farmer[catalogue] = value;
        })
      } else if (data?.loan[catalogue]) {
        this.catalogueService.getCataloguesById(data?.loan[catalogue]).toPromise().then((value: any) => {
          this.farmer["loan"][catalogue] = value;
        })
      }
    });
  }


  // getTabs=()=>{
  //     this.tabs = [{key:0,value:'regular based',alias:'fi.type'},{key:1,value:'need based',alias:'fi.type'}];
  //     this.tabChanged(0);

  // }

  getAllFarmers() {
    this.farmerService.getAllFarmers().toPromise().then((data: any) => {
      this.mapData1 = this.farmerMapService.getFarmerview();
    })
  }


  headerTextChange = () => {
    this.title = this.selectedTab;
  };

  tabChanged = (index: any): void => {
    this.selectedTab = this.tabs[index];
    this.isFarm = false;
    this.isSowing = false;
  };

  cancel = () => {
    this.router.navigate(['farmer/static-farmer-create'])
  }

  save = (event) => {
    this.responseModalService.OpenStatusModal(
      this.appConfiguration.successIconUrl,
      'Roles Added',
      'Your information has been saved successfully!'
    );
  };


  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalSM(component, data);
    this.matDialogRef.afterClosed().subscribe(res => {
      this.getFarmerCount();
    });
  };


  getFarmerCount = () => {
    this.farmerService.getAllFarmers().subscribe((data: any) => {
      this.farmerCount = {
        'Farmer': data.farmer,
        'Farm': data.farm,
        'Sowing': data.sowing
      }
    });
  };

  edit = () => {
    this.router.navigate(['farmer/static-farmer-create/edit'], { queryParams: { id: this.id } });
  }


  deleteConfirm = () => {
    this.farmerService.deleteFarmer(this.id).subscribe((data: any) => {
      this.prepareDetailData(this.id)
    })
  }

  //   this.farmerService.deleteFarmer(rowId).subscribe((data: any) => {
  //     this.loadData();
  //   });
  // }
  detail = (event) => {
    this.detailId = event;
    this.prepareDetailData(event);

  };

  prepareDetailData = (event) => {
    this.farmerService.getFarmerById(event).subscribe(data => {
      this.farmerDetail = data;
    });
  };



}




