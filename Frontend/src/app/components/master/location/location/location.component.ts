import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subject } from 'rxjs';
import { CountryAddComponent } from '../country/country-add/country-add.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ResponseModalService } from '../../../../common/response-modal/response-modal.service';
import { LocationTabHeadingsEnum } from '../../../../common/common.enum';
import { VillageAddComponent } from '../village/village-add/village-add.component';
import { TalukAddComponent } from '../taluk/taluk-add/taluk-add.component';
import { DistrictAddComponent } from '../district/district-add/district-add.component';
import { StateAddComponent } from '../state/state-add/state-add.component';
import { AppConfiguration } from '../../../../common/App.configuration';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  //Trigger reload to list
  countryReloadEvent: Subject<void> = new Subject<void>();
  stateReloadEvent: Subject<void> = new Subject<void>();
  districtReloadEvent: Subject<void> = new Subject<void>();
  talukReloadEvent: Subject<void> = new Subject<void>();
  villageReloadEvent: Subject<void> = new Subject<void>();
  locationCount = {};

  //Form
  editData: any = {}; //Send edit data to add component

  //Page Header
  title: string; //To set the title for page header
  buttonText: string; //To set the add button text for page header

  //Tab
  headings: any[] = []; //To get the header from enum for Tab
  selectedTab: any; //To get the selected tab by index
  matDialogRef: MatDialogRef<any>;

  constructor(
    private responseModalService: ResponseModalService,
    private appConfiguration: AppConfiguration,
    private locationService: LocationService
  ) {
    this.headings = Object['values'](LocationTabHeadingsEnum);
    this.selectedTab = this.headings[0];
  }

  async ngOnInit() {
    this.getLocationCount();
    this.headerTextChange();
  }

  tabChanged = (index: number): void => {
    this.selectedTab = this.headings[index];
    this.headerTextChange();
  };



  add = () => {
    let data = { title: 'Add ' + this.selectedTab };
    if (this.selectedTab == this.headings[0]) {
      this.openModal(CountryAddComponent, data);
    }
    if (this.selectedTab == this.headings[1]) {
      this.openModal(StateAddComponent, data);
    }
    if (this.selectedTab == this.headings[2]) {
      this.openModal(DistrictAddComponent, data);
    }
    if (this.selectedTab == this.headings[3]) {
      this.openModal(TalukAddComponent, data);
    }
    if (this.selectedTab == this.headings[4]) {
      this.openModal(VillageAddComponent, data);
    }
  };

  cancel = (isPanelOpen) => {};

  save = (event) => {
    this.responseModalService.OpenStatusModal(
      this.appConfiguration.successIconUrl,
      'Roles Added',
      'Your information has been saved successfully!'
    );
  };

  onsaveComplete = (event) => {
    this.emitEventToReload();
  };

  search = (text) => {
    this.stateReloadEvent.next(text);
  };

  headerTextChange = () => {
    //$('#'+this.selectedTab).addClass('active');
    this.title = this.selectedTab;
    this.buttonText = 'Add ' + this.selectedTab;

  };

  getCssClass=(heading)=>{
    let cssClass = 'nav-link media';
    if(heading == this.headings[0])
      cssClass = 'nav-link media active';
    return cssClass;
  }

  emitEventToReload = () => {
    if (this.selectedTab == this.headings[0]) {
      this.countryReloadEvent.next(null);
    } else if (this.selectedTab == this.headings[1]) {
      this.stateReloadEvent.next();
    } else if (this.selectedTab == this.headings[2]) {
      this.districtReloadEvent.next();
    } else if (this.selectedTab == this.headings[3]) {
      this.talukReloadEvent.next();
    } else if (this.selectedTab == this.headings[4]) {
      this.villageReloadEvent.next();
    }
  };

  edit = (id: any) => {
    this.editData.id = id;
    this.editData.title = 'Edit ' + this.selectedTab;
    if (this.selectedTab == this.headings[0]) {
      this.openModal(CountryAddComponent, this.editData);
    }
    if (this.selectedTab == this.headings[1]) {
      this.openModal(StateAddComponent, this.editData);
    }
    if (this.selectedTab == this.headings[2]) {
      this.openModal(DistrictAddComponent, this.editData);
    }
    if (this.selectedTab == this.headings[3]) {
      this.openModal(TalukAddComponent, this.editData);
    }
    if (this.selectedTab == this.headings[4]) {
      this.openModal(VillageAddComponent, this.editData);
    }
  };

  delete = (event: any) => {
    this.getLocationCount();
  };

  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalSM(component, data);
    this.matDialogRef.afterClosed().subscribe((res) => {
      this.emitEventToReload();
      this.getLocationCount();
    });
  };

  getLocationCount = () => {
    this.locationService.getLocationCount().subscribe((data: any) => {
      this.locationCount = {
        Country: data.country,
        State: data.state,
        District: data.district,
        Taluk: data.taluk,
        Village: data.village,
      };
    });
  };
}
