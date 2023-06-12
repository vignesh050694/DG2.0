import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { MultiSelectComponent } from 'src/app/common/multi-select/multi-select.component';
import { ResponseModalService } from 'src/app/common/response-modal/response-modal.service';
import { LocationService } from 'src/app/components/master/location/location.service';
import { VillageService } from 'src/app/components/master/location/village/village.service';
import { GroupService } from 'src/app/components/settings/group/group.service';
import { StaticFarmerService } from '../../static-farmer.service';
import { DatePipe } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { Guid } from 'guid-typescript';
import { CatalogueService } from 'src/app/components/master/catalogue/catalogue.service';
import { CatalougeTypes } from 'src/app/common/common.enum';
import { SeasonService } from 'src/app/components/master/season/season.service';
import { ProductService } from 'src/app/components/master/product/product.service';
import { FileUploader } from 'ng2-file-upload';
import { FarmerFormService } from '../../static-farmer-create/farmer-form.service';
import { BankDetailComponent } from '../bank-detail/bank-detail.component';
import { AnimalDetailComponent } from '../animal-detail/animal-detail.component';
import { EquipmentDetailComponent } from '../equipment-detail/equipment-detail.component';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';
import { ImgService } from '../../../../common/img.service';
import { CropService } from 'src/app/components/master/product/crop/crop.service';


@Component({
  selector: 'app-static-farmer-add',
  templateUrl: './static-farmer-add.component.html',
  styleUrls: ['./static-farmer-add.component.scss']
})
export class StaticFarmerAddComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  @ViewChild('farmerGroupMultiSelect', { static: false }) farmerGroupMultiSelectComponent: MultiSelectComponent;
  @ViewChild('countryMultiSelect', { static: false }) countryMultiSelectComponent: MultiSelectComponent;
  @ViewChild('stateMultiSelect', { static: false }) stateMultiSelectComponent: MultiSelectComponent;
  @ViewChild('districtMultiSelect', { static: false }) districtMultiSelectComponent: MultiSelectComponent;
  @ViewChild('talukMultiSelect', { static: false }) talukMultiSelectComponent: MultiSelectComponent;
  @ViewChild('villageMultiSelect', { static: false }) villageMultiSelectComponent: MultiSelectComponent;
  @ViewChild('farmTypeMultiSelect', { static: false }) farmTypeMultiSelectComponent: MultiSelectComponent;
  @Input() events: Observable<void>;
  @Output() saveEvent = new EventEmitter();

  popupKey: any = {
    "bankDetail": 1, "animalDetail": 2, "equipmentDetail": 3,
    "farmerImg": 4, "proofImg": 5, "printImg": 6, "farmImg": 7
  }

  title: any;
  id: any;
  familyId: any;
  loanId: any;
  imageurl: any;
  imageId: any;
  proofImgUrl: any;
  proofImgId: any;
  printImgUrl: any;
  printImgId: any;
  farmImgUrl: any;
  farmImgId: any;
  selectedImage: File;
  selectedIdImage: File;
  selectedFingerPrint: File;
  selectedFarmPhoto: File;
  public uploader: FileUploader = this.farmerService.getFileUploader();
  public fingerPrintUploader: FileUploader = this.farmerService.getFileUploader();
  public idImageUploader: FileUploader = this.farmerService.getFileUploader();
  public farmPhotoUploader: FileUploader = this.farmerService.getFileUploader();

  public datatrigger1: EventEmitter<any> = new EventEmitter();
  public datatrigger2: EventEmitter<any> = new EventEmitter();
  public datatrigger3: EventEmitter<any> = new EventEmitter();


  isSubmit: boolean;

  //--------forms------------
  farmerForm: FormGroup;
  farmForm: FormGroup;
  sowingForm: FormGroup;
  familyForm: FormGroup;
  loanForm: FormGroup;

  //------drop-downs------
  farmerGroups: any = [];
  countries = [];
  states = [];
  districts = [];
  taluks = [];
  villages = [];
  seasons = [];
  crops = [];
  varieties = [];
  defaultImgUrl = "assets/images/profile-upload.png";

  //catalouges
  landOwnerships: any = [];
  landTopographies: any = [];
  approachRoads: any = [];
  landGradients: any = [];
  certificateTypes: any = [];
  fertilityStatus: any = [];
  irrigationSources: any = [];
  irrigationTypes: any = [];
  sowingTypes: any = [];
  seedSources: any = [];
  conversionStatus: any = [];
  loantakenfroms: any = [];
  purposes: any = [];
  periods: any = [];
  securitys: any = [];
  farmEquipments: any = [];
  idProofs: any = [];
  educations: any = [];
  maritalStatus: any = [];
  yearOfIcs: any = [];
  icsUnitNos: any = [];
  icsTracenets: any = [];
  farmCertificates: any = [];
  cropCategories: any = [];
  departments: any = [];
  fpoGroups: any = [];
  enrollmentPlaces: any = [];

  selectedTab: any;
  selectedCountry: any;
  selectedState: any;
  selectedDistrict: any;
  selectedTaluk: any;
  selectedVillage: any;
  selectedLandOwnerShip: any;
  selectedGroup: any;
  selectedGradient: any;
  selectedApproach: any;
  selectedTopography: any;
  selectedfertility: any;
  selectedIrrigation: any;
  selectedIrrigationType: any;
  selectedFarmCertificate: any;
  selectedConversionStatus: any;
  selectedSowingType: any;
  selectedFarm: any;
  selectedSeason: any;
  selectedCrop: any;
  selectedCrop1: any;
  selectedVariety: any;
  selectedSeedSource: any;
  selectedIdProof: any;
  selectedEducation: any;
  selectedMaritalStatus: any;
  selectedIcsUnitNo: any;
  selectedIcsTracenet: any;
  selectedYearOfIcs: any;
  selectedDepartment: any;
  selectedCertificate: any;
  selectedCropCategory: any;
  selectedloanTakenFrom: any;
  selectedPurpose: any;
  selectedPeriod: any;
  selectedSecurity: any;
  selectedFpoGroup: any;
  selectedEnrollmentPlace: any;

  //------tabs------

  tabs: any = [
    {
      "key": 1,
      "value": "Farmer Details", class: "active"
    },
    {
      "key": 2,
      "value": "Farm Details"
    },
    {
      "key": 3,
      "value": "Sowing Details"
    },
    {
      "key": 4,
      "value": "Family Details"
    },
    {
      "key": 5,
      "value": "Other Details"
    },
    {
      "key": 6,
      "value": "Loan Details"
    }
  ]

  totalTab: number = this.tabs.length;

  next(tab: number) {
    this.tabChange(tab + 1);
  }
  cancel1(tab: number) {
    if(tab - 1 == 0) {
      this.route.navigate(['farmer/static-farmer-create'])
    }
   else{
    this.tabChange(tab - 1);
   }

  }

  tabChange(tab: number) {
    if (tab >= 1 && tab <= this.tabs.length) {
      this.selectedTab = tab;
      for (var i = tab - 1; i >= 1; i--) {
        $("#" + i.toString()).removeClass("active");
        $("#" + i.toString()).addClass("finished");
      }
      for (var i = tab; i <= this.totalTab; i++) {
        $("#" + i.toString()).removeClass("active");
        $("#" + i.toString()).removeClass("finished");
      }
      $("#" + tab.toString()).addClass("active");
    }
  }
  //------------bank-list-----------------
  displayedColumns1: string[] = ['Account Type', 'Account Number', 'Bank Name', 'Branch Details', 'IFSC/Sort Code', 'actions'];
  searchColumns1: any[] = [];
  definedColumns1 = ['accType', 'accNo', 'bankName', 'bankBranch', 'ifscCode'];
  //------------animal-list-----------------
  displayedColumns2: string[] = ['Farm Animal', 'Animal count', 'Fodder', 'Animal Housing', 'Revenue', 'Breed Name', 'actions'];
  searchColumns2: any[] = [];
  definedColumns2 = ['animalType', 'animalCount', 'foodType', 'houseType', 'revenue', 'breedName'];
  //------------equipment-list-----------------
  displayedColumns3: string[] = ['Farm Equipment Item', '	Farm Equipment Item Count', 'actions'];
  searchColumns3: any[] = [];
  definedColumns3 = ['vehicleType', 'vehicleCount'];
  //------------img preview-----------------------------
  imagePreview = (index: number) => {
    if (index == this.popupKey.proofImg) this.openModal(ImagePreviewComponent, this.proofImgUrl);
    else if (index == this.popupKey.printImg) this.openModal(ImagePreviewComponent, this.printImgUrl);
    else if (index == this.popupKey.farmImg) this.openModal(ImagePreviewComponent, this.farmImgUrl);
  }

  deleteImg = (index: number) => {
    if (index == this.popupKey.farmerImg) {
      this.selectedImage = null;
      this.imageId = '';
      this.imageurl = '';
      $('#imageUploadTxt').val('No file chosen');
    }
    else if (index == this.popupKey.proofImg) {
      this.selectedIdImage = null;
      this.proofImgId = '';
      this.proofImgUrl = '';
      $("#idImage").val('');
    } else if (index == this.popupKey.printImg) {
      this.selectedFingerPrint = null;
      this.printImgId = '';
      this.printImgUrl = '';
      $("#printImage").val('');
    }
    else if (index == this.popupKey.farmImg) {
      this.selectedFarmPhoto = null;
      this.farmImgId = '';
      this.farmImgUrl = '';
      $("farmImage").val('');
    }
  }

  // -----------information-add--------------------------
  bankDetails: any = [];
  animalDetails: any = [];
  farmDetails: any = [];
  matDialogRef: MatDialogRef<any>;

  addBankInformation() { this.openModal(BankDetailComponent, this.popupKey.bankDetail) }
  addAnimalInformation() { this.openModal(AnimalDetailComponent, this.popupKey.animalDetail) }
  addFarmInformation() { this.openModal(EquipmentDetailComponent, this.popupKey.equipmentDetail) }

  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalSM(component, data);
    this.matDialogRef.afterClosed().subscribe(res => {
      if (res) {
        if (data == this.popupKey.bankDetail) { this.bankDetails.push(res); this.datatrigger1.emit(this.bankDetails); }
        else if (data == this.popupKey.animalDetail) { this.animalDetails.push(res); this.datatrigger2.emit(this.animalDetails); }
        else if (data == this.popupKey.equipmentDetail) { this.farmDetails.push(res); this.datatrigger3.emit(this.farmDetails); }
      }
    });
  }

  // -----------delete-detail--------------------------

  deleteConfirm1(id: any) {
    this.bankDetails = this.bankDetails.filter((detail: any) => detail?.id != id);
    this.datatrigger1.emit(this.bankDetails);
  }
  deleteConfirm2(id: any) {
    this.animalDetails = this.animalDetails.filter((detail: any) => detail?.id != id);
    this.datatrigger2.emit(this.animalDetails);
  }
  deleteConfirm3(id: any) {
    this.farmDetails = this.farmDetails.filter((detail: any) => detail?.id != id);
    this.datatrigger3.emit(this.farmDetails);
  }

  //------------- catalogue --------------
  catalogueArr: any = [];
  // -----------file uploader--------------------


  getSelectedImage = (file: FileUploader, event: any, type: number) => {
    let result = this.imgService.getSelectedImage(file, event);
    switch (type) {
      case this.popupKey.farmerImg:
        this.uploader = result?.uploader;
        this.selectedImage = result?.image;
        this.imageurl = result?.url; break;
      case this.popupKey.proofImg:
        this.idImageUploader = result?.uploader;
        this.selectedIdImage = result?.image;
        this.proofImgUrl = result?.url; break;
      case this.popupKey.printImg:
        this.fingerPrintUploader = result?.uploader;
        this.selectedFingerPrint = result?.image;
        this.printImgUrl = result?.url; break;
      case this.popupKey.farmImg:
        this.farmPhotoUploader = result?.uploader;
        this.selectedFarmPhoto = result?.image;
        this.farmImgUrl = result?.url; break;
    }
  }

  public onFarmerImg = (event: any) => { this.getSelectedImage(this.uploader, event, this.popupKey.farmerImg) };
  public onIdImage = (event: any) => { this.getSelectedImage(this.idImageUploader, event, this.popupKey.proofImg) };
  public onFingerPrint = (event: any) => { this.getSelectedImage(this.fingerPrintUploader, event, this.popupKey.printImg) };
  public onFarmPhoto = (event: any) => { this.getSelectedImage(this.farmPhotoUploader, event, this.popupKey.farmImg) };

  // -----------******************--------------------


  constructor(
    public formBuilder: FormBuilder,
    private farmerService: StaticFarmerService,
    private responseModalService: ResponseModalService,
    private appConfiguration: AppConfiguration,
    private groupService: GroupService,
    private locationService: LocationService,
    private route: Router,
    private villageService: VillageService,
    private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private catalogueService: CatalogueService,
    private seasonService: SeasonService,
    private productService: ProductService,
    private formService: FarmerFormService,
    private imgService: ImgService,
    private cropService: CropService
  ) {
  }

  getValue = (value: any) => {
    if (value) return value;
    else return [];
  }

  catalougeValues = async () => {
    await this.catalogueService.getCataloguesByTypes(this.catalogueArr).toPromise().then((datas: any) => {
      this.landOwnerships = this.getValue(datas[CatalougeTypes.landOwnership]);
      this.landTopographies = this.getValue(datas[CatalougeTypes.landTopography]);
      this.approachRoads = this.getValue(datas[CatalougeTypes.approachRoad]);
      this.landGradients = this.getValue(datas[CatalougeTypes.landGradient]);
      this.certificateTypes = this.getValue(datas[CatalougeTypes.certificationType]);
      this.fertilityStatus = this.getValue(datas[CatalougeTypes.fertilityStatus]);
      this.irrigationSources = this.getValue(datas[CatalougeTypes.irrigationSource]);
      this.irrigationTypes = this.getValue(datas[CatalougeTypes.irrigationTypes]);
      this.sowingTypes = this.getValue(datas[CatalougeTypes.sowingType]);
      this.seedSources = this.getValue(datas[CatalougeTypes.seedSource]);
      this.conversionStatus = this.getValue(datas[CatalougeTypes.currentConversionStatus]);
      this.loantakenfroms = this.getValue(datas[CatalougeTypes.loantakenfrom]);
      this.purposes = this.getValue(datas[CatalougeTypes.purpose]);
      this.periods = this.getValue(datas[CatalougeTypes.period]);
      this.securitys = this.getValue(datas[CatalougeTypes.security]);
      this.farmEquipments = this.getValue(datas[CatalougeTypes.farmEquipments]);
      this.idProofs = this.getValue(datas[CatalougeTypes.idProof]);
      this.educations = this.getValue(datas[CatalougeTypes.education]);
      this.maritalStatus = this.getValue(datas[CatalougeTypes.maritalStatus]);
      this.yearOfIcs = this.getValue(datas[CatalougeTypes.yearOfIcs]);
      this.icsUnitNos = this.getValue(datas[CatalougeTypes.icsUnitNo]);
      this.icsTracenets = this.getValue(datas[CatalougeTypes.icsTracenetRegNo]);
      this.farmCertificates = this.getValue(datas[CatalougeTypes.farmCertificate]);
      this.cropCategories = this.getValue(datas[CatalougeTypes.cropCategory]);
      this.departments = this.getValue(datas[CatalougeTypes.department]);
      this.fpoGroups = this.getValue(datas[CatalougeTypes.fpoGroup]);
      this.enrollmentPlaces = this.getValue(datas[CatalougeTypes.enrollmentPlace]);
    }).catch((err: any) => console.log(err));
    return true;

  }

  getSeasons = () => {
    this.seasonService.getAllSeasons().toPromise().then((data: any) => {
      this.seasons = data;
    })
  }

  getCrops = () => {
    this.productService.getAllCrops().toPromise().then((data: any) => {
      this.crops = data;
    })
  }

  onCropChange = (event: any) => {
    if (event?.id) {
      this.productService.getVareityByCrop((event?.id)).then((data: any) => {
        this.varieties = data;
      })
    }
  }

  setForms = () => {
    this.farmerForm = this.formService.getFarmerForm();
    this.farmForm = this.formService.getFarmForm();
    this.sowingForm = this.formService.getSowingForm();
    this.familyForm = this.formService.getFamilyForm();
    this.loanForm = this.formService.getLoanFrom();
  }

  async ngOnInit(): Promise<void> {
    this.setForms();
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params.id;
    });

    if (this.id) {
      this.catalogueArr = [...this.formService.getFarmerCatalougeArr()];
      this.tabs = [{
        "key": 1,
        "value": "Farmer Details", class: "active"
      },
      {
        "key": 2,
        "value": "Family Details"
      },
      {
        "key": 3,
        "value": "Other Details"
      },
      {
        "key": 4,
        "value": "Loan Details"
      }
      ]
    } else {
      this.catalogueArr = [...this.formService.getFarmerCatalougeArr(), ...this.formService.getFarmCatalogueArr(), ...this.formService.getSowingCatalogueArr()];
    }
    let isComplete = await this.catalougeValues();
    this.title = this.id ? "Edit" : "Add";
    this.tabChange(this.tabs[0].key);
    this.getCrops();
    this.getSeasons();
    this.getFarmerGroups();
    this.getCountries();
    this.isSubmit = false;
    if (isComplete) this.getValueById();
  }

  get basic() { return this.farmerForm.controls }
  get basicFarm() { return this.farmForm.controls }
  get basicSowing() { return this.sowingForm.controls }
  get basicFamily() { return this.familyForm.controls }
  get basicLoan() { return this.loanForm.controls }

  setImages = async (detail: any) => {
    this.imageId = detail?.image;
    this.proofImgId = detail?.proofPhoto;
    this.printImgId = detail?.fingerPrintImg;
    this.farmImgId = detail?.farmPhoto;
    if (this.imageId) this.imgService.getImageById(this.imageId).toPromise().then((res: any) => {
      $('#imageUploadTxt').val(res?.name);
      this.imageurl = window.URL.createObjectURL(this.imgService.toBlob(res?.image, res?.type));
    });
    if (this.proofImgId) this.imgService.getImageById(this.proofImgId).toPromise().then((res: any) => {
      let blob = this.imgService.toBlob(res?.image, res?.type);
      (<HTMLInputElement>document.getElementById('idImage')).files = this.imgService.toFile(blob, res?.name, res?.type);
      this.proofImgUrl = window.URL.createObjectURL(blob);
    });
    if (this.printImgId) this.imgService.getImageById(this.printImgId).toPromise().then((res: any) => {
      let blob = this.imgService.toBlob(res?.image, res?.type);
      (<HTMLInputElement>document.getElementById('printImage')).files = this.imgService.toFile(blob, res?.name, res?.type);
      this.printImgUrl = window.URL.createObjectURL(blob);
    });
    if (this.farmImgId) this.imgService.getImageById(this.farmImgId).toPromise().then((res: any) => {
      let blob = this.imgService.toBlob(res?.image, res?.type);
      (<HTMLInputElement>document.getElementById('farmImage')).files = this.imgService.toFile(blob, res?.name, res?.type);
      this.farmImgUrl = window.URL.createObjectURL(blob);
    });
  }

  patchCatalogues = (data: any) => {
    this.selectedCertificate = this.certificateTypes?.find((e) => e?.id === data?.certificateType);
    this.selectedIcsUnitNo = this.icsUnitNos?.find((e) => e?.id === data?.icsUnitNo);
    this.selectedIcsTracenet = this.icsTracenets?.find((e) => e?.id === data?.icsTracenetRegNo);
    this.selectedDepartment = this.departments?.find((e) => e?.id === data?.department);
    this.selectedYearOfIcs = this.yearOfIcs?.find((e) => e?.id === data?.yearOfIcs);
    this.selectedEducation = this.educations?.find((e) => e?.id === data?.education);
    this.selectedMaritalStatus = this.maritalStatus?.find((e) => e?.id === data?.maritalStatus);
    this.selectedIdProof = this.idProofs?.find((e) => e?.id === data?.idProof);
    this.selectedFpoGroup = this.fpoGroups?.find((e) => e?.id === data?.fpoGroup);
    this.selectedEnrollmentPlace = this.enrollmentPlaces?.find((e) => e?.id === data?.enrollmentPlace);
    if (data?.loan) {
      this.selectedloanTakenFrom = this.loantakenfroms?.find((e) => e?.id == data?.loan?.loanTakenFrom);
      this.selectedPurpose = this.purposes?.find((e) => e?.id == data?.loan?.purpose);
      this.selectedPeriod = this.periods?.find((e) => e?.id == data?.loan?.period);
      this.selectedSecurity = this.securitys?.find((e) => e?.id == data?.loan?.security);
    }
  }


  getValueById = () => {
    if (this.id) {
      this.farmerService.getFarmerById(this.id).toPromise().then(async (data: any) => {
        this.id = data?.id;
        this.familyId = data?.family?.id;
        this.loanId = data?.loan?.id;
        this.setImages(data);
        if (data?.village) this.getVillageById(data?.village);
        if (data?.farmerGroup) this.getGroupById(data?.farmerGroup);
        if(data?.family?.cropInsured) this.getCropById(data?.family?.cropInsured);
        this.patchCatalogues(data);
        this.farmerForm = this.formService.patchFarmerForm(this.farmerForm, data);
        this.familyForm = this.formService.patchFamilyForm(this.familyForm, data?.family);
        this.loanForm = this.formService.patchLoanForm(this.loanForm, data?.loan);
        this.bankDetails = data?.bankInformationList?.length > 0 ? await this.getBankDetails(data?.bankInformationList) : [];
        // this.bankDetails = data?.bankInformationList?.length > 0 ?  data?.bankInformationList: []
        this.datatrigger1.emit(this.bankDetails);
        this.animalDetails = data?.animalHusbandryList?.length > 0 ? await this.getAnimalDetails(data?.animalHusbandryList) : [];
        this.datatrigger2.emit(this.animalDetails);
        this.farmDetails = data?.farmEquipmentList?.length > 0 ? await this.getEquipmentDetails(data?.farmEquipmentList) : [];
        // this.farmDetails = data?.farmEquipmentList?.length > 0 ? data?.farmEquipmentList : [] ;
        this.datatrigger3.emit(this.farmDetails);
      })
    }
  }

  getBankDetails = async (bankDetails: any) => {
    let details = [];
    await this.catalogueService.getCataloguesByType(CatalougeTypes.accountType).toPromise().then((data: any) => {
      bankDetails.forEach((bank: any) => {
        bank["accType"] = data.find((cat: any) => cat?.id === bank?.accType);
        details.push(bank);
      })
    });
    return details;
  }

  getAnimalDetails = (details: any) => {
    let aniDetails = [];
    let catArr = ["foodType", "houseType", "animalType"];
    details.forEach((animal: any) => {
      catArr.forEach((cat: any) => {
        if (animal[cat]) {
          this.catalogueService.getCataloguesById(animal[cat]).toPromise().then((data: any) => {
            animal[cat] = data;
          });
        }
      })
      aniDetails.push(animal);
    })
    return aniDetails;
  }

  getEquipmentDetails = async (farmDetails: any) => {
    let equipmentDetails = [];
    await this.catalogueService.getCataloguesByType(CatalougeTypes.farmEquipments).toPromise().then((data: any) => {
      farmDetails.forEach((equip: any) => {
        equip["vehicleType"] = data.find((cat1: any) => cat1?.id === equip?.vehicleType);
        equipmentDetails.push(equip);
      })
    });
    return equipmentDetails;
  }

  toggleCertifiedFarmer(value: any) {
    this.farmerForm.patchValue({
      yearOfIcs: "",
      farmerCodeByIcs: "",
      icsTracenetRegNo: "",
      icsUnitNo: "",
      certificateType: "",
      icsCode: "",
      farmerCodeByTracenet: ""
    })
  }

  toggleGovtScheme = (value: any) => {
    this.farmerForm.patchValue({
      department: '',
      schemaName: ''
    })
  }

  toggleLifeInsurance(value: any) {
    this.farmerForm.patchValue({
      lifeInsurance: ''
    })
  }

  toggleLoanDetails(value: any) {
    this.farmerForm.patchValue({
      amount: ''
    })
  }



  getVillageById = (id: any) => {
    this.villageService.getVillageById(id).toPromise().then((data: any) => {
      this.selectedCountry = data?.taluk?.district?.state?.country;
      this.selectedState = data?.taluk?.district?.state;
      this.selectedDistrict = data?.taluk?.district;
      this.selectedTaluk = data?.taluk;
      this.selectedVillage = data;
    })
  }



  getGroupById = (id: any) => {
    this.groupService.getGroupById(id).toPromise().then((data: any) => {
      this.selectedGroup = data;
    })
  }

  getCropById = (id:any) => {
    this.cropService.getCropById(id).toPromise().then((data:any) => {
      this.selectedCrop1 = data;
    })
  }


  getFarmerGroups = () => {
    this.groupService.getAllGroup().toPromise().then((data: any[]) => {
      this.farmerGroups = data;
    })
  }

  validate() {
    this.farmerGroupMultiSelectComponent.formInvalid();
    // this.countryMultiSelectComponent.formInvalid();
    // this.stateMultiSelectComponent.formInvalid();
    // this.districtMultiSelectComponent.formInvalid();
    // this.talukMultiSelectComponent.formInvalid();
    this.villageMultiSelectComponent.formInvalid();
  }

  async saveImages() {
    try {
      let fd = new FormData();
      fd.append('image', this.selectedImage);
      if (this.selectedImage) await this.farmerService.imageUpload(fd).toPromise().then((data) => { this.imageId = data?.id; });
      fd = new FormData();
      fd.append('image', this.selectedIdImage);
      if (this.selectedIdImage) await this.farmerService.imageUpload(fd).toPromise().then((data) => { this.proofImgId = data?.id; });
      fd = new FormData();
      fd.append('image', this.selectedFingerPrint);
      if (this.selectedFingerPrint) await this.farmerService.imageUpload(fd).toPromise().then((data) => { this.printImgId = data?.id; });
      fd = new FormData();
      fd.append('image', this.selectedFarmPhoto);
      if (this.selectedFarmPhoto) await this.farmerService.imageUpload(fd).toPromise().then((data) => { this.farmImgId = data?.id; });
    } catch (e) {
      console.log(e);
    }
    return true;
  }

  format = (date: any) => {
    if (date) return this.datePipe.transform(date, 'MM/dd/yyyy');
    else return null;
  }


  async submitForm() {
    this.isSubmit = true;
    let isComplete = await this.saveImages();
    //farmer
    this.farmerForm.patchValue({
      village: this.selectedVillage?.id,
      farmerGroup: this.selectedGroup?.id,
      icsTracenetRegNo: this.selectedIcsTracenet?.id,
      icsUnitNo: this.selectedIcsUnitNo?.id,
      yearOfIcs: this.selectedYearOfIcs?.id,
      education: this.selectedEducation?.id,
      maritalStatus: this.selectedMaritalStatus?.id,
      department: this.selectedDepartment?.id,
      certificateType: this.selectedCertificate?.id,
      idProof: this.selectedIdProof?.id,
      fpoGroup: this.selectedFpoGroup?.id,
      enrollmentPlace: this.selectedEnrollmentPlace?.id,

    });
    let farmerData = this.farmerForm.value;
    farmerData['id'] = this.id ? this.id : null;
    farmerData['enrollmentDateStr'] = this.format(this.farmerForm.value.enrollmentDateStr);
    farmerData['dobStr'] = this.format(this.farmerForm.value.dobStr);
    if (isComplete) {
      farmerData['image'] = this.imageId;
      farmerData['proofPhoto'] = this.proofImgId;
      farmerData['fingerPrintImg'] = this.printImgId;
    }
    //farm
    this.farmForm.patchValue({
      landOwnership: this.selectedLandOwnerShip?.id,
      approachRoad: this.selectedApproach?.id,
      topography: this.selectedTopography?.id,
      landGradient: this.selectedGradient?.id,
      fertilityStatus: this.selectedfertility?.id,
      irrigation: this.selectedIrrigation?.id,
      irrigationType: this.selectedIrrigationType?.id,
      farmCertificate: this.selectedFarmCertificate?.id,
      conversionStatus: this.selectedConversionStatus?.id
    })
    let farmData = this.farmForm.value;
    farmData['lastDayStr'] = this.format(this.farmForm.value.lastDayStr);
    farmData['conversionDateStr'] = this.format(this.farmForm.value.conversionDateStr);
    if (isComplete) {
      farmData['farmPhoto'] = this.farmImgId;
    }
    //sowing
    this.sowingForm.patchValue({
      season: this.selectedSeason?.id,
      variety: this.selectedVariety?.id,
      sowingType: this.selectedSowingType?.id,
      seedSource: this.selectedSeedSource?.id,
      cropCategory: this.selectedCropCategory?.id,
    })
    let sowingData = this.sowingForm.value;
    sowingData['sowingDateStr'] = this.format(this.sowingForm.value.sowingDateStr);

    //family
    this.familyForm.patchValue({
      cropInsured: this.selectedCrop1?.id
    });
    let familyData = this.familyForm.value;
    familyData['id'] = this.familyId;

    //loan
    this.loanForm.patchValue({
      loanTakenFrom: this.selectedloanTakenFrom?.id,
      purpose: this.selectedPurpose?.id,
      period: this.selectedPeriod?.id,
      security: this.selectedSecurity?.id
    })
    let loanData = this.loanForm.value;
    loanData['id'] = this.loanId;
    loanData['repaymentDateStr'] = this.format(this.loanForm.value.repaymentDateStr);

    //overAll
    this.bankDetails = this.bankDetails.map((obj: any) => {
      obj.id = obj?.id.toString().substring(0, 4) == 'temp' ? null : obj?.id;
      obj.accType = obj?.accType ? obj?.accType?.id : "";
      return obj;
    });
    this.animalDetails = this.animalDetails.map((obj: any) => {
      obj.id = obj?.id.toString().substring(0, 4) == 'temp' ? null : obj?.id;
      obj.foodType = obj?.foodType ? obj?.foodType?.id : null;
      obj.animalType = obj?.animalType ? obj?.animalType?.id : null;
      obj.houseType = obj?.houseType ? obj?.houseType?.id : null;
      return obj;
    });
    this.farmDetails = this.farmDetails.map((obj: any) => {
      obj.id = obj?.id.toString().substring(0, 4) == 'temp' ? null : obj?.id;
      obj.vehicleType = obj?.vehicleType ? obj?.vehicleType?.id : null;
      return obj;
    });
    let merged = Object.assign(
      farmerData,
      { farmerFarm: this.id ? null : farmData },
      { sowing: this.id ? null : sowingData },
      { family: familyData },
      { loan: loanData },
      { bankInformationList: this.bankDetails },
      { animalHusbandryList: this.animalDetails },
      { farmEquipmentList: this.farmDetails }
    );
    this.farmerService.addFarmer(merged).toPromise().then(() => {
      this.responseModalService.OpenStatusModal(this.appConfiguration.successIconUrl,
        'Farmer Added', 'Your information has been saved successfully!');
      this.cancel();
    }).catch((err: any) => this.cancel());

  };


  getCountries = () => {
    this.locationService.getAllCountries().subscribe((data: any[]) => {
      this.countries = data;
    })
  }

  changeState = (event) => {
    this.selectedState = "";
    this.selectedDistrict = "";
    this.selectedTaluk = "";
    this.selectedVillage = "";
    if (event?.id) {
      this.locationService.getAllStateByCountry(event?.id).toPromise().then((data: any[]) => {
        this.states = data;
      })
    }
  }
  changeDistrict = (event) => {
    this.selectedDistrict = "";
    this.selectedTaluk = "";
    this.selectedVillage = "";
    if (event?.id) {
      this.locationService.getAllDistrictByState(event?.id).toPromise().then((data: any[]) => {
        this.districts = data;
      })
    };
  }

  changeTaluk = (event) => {
    this.selectedTaluk = "";
    this.selectedVillage = "";
    if (event?.id) {
      this.locationService.getAllTalukByDistrict(event?.id).subscribe((data: any[]) => {
        this.taluks = data;
      })
    }
  }

  changeVillage = (event) => {
    this.selectedVillage = "";
    if (event?.id) {
      this.locationService.getVillageByTaluk(event?.id).toPromise().then((data: any[]) => {
        this.villages = data;
      });
    }
  }

  cancel = () => {
    this.route.navigate(['farmer/static-farmer-create']);
  }

}



