import { map } from 'rxjs/operators';
import { ProcurementService } from './../../procurement/procurement/procurement.service';
import { Component, OnInit } from '@angular/core';
import { elementClass } from '@rxweb/reactive-form-validators';
import { AppConfiguration } from 'src/app/common/App.configuration';
import { environment } from 'src/environments/environment';
import { LocationService } from '../../master/location/location.service';
import { VarietyService } from '../../master/product/variety/variety.service';
import { SeasonService } from '../../master/season/season.service';
import { GroupService } from '../../settings/group/group.service';
import { StaticFarmerService } from '../../static-farmer/static-farmer.service';
import { StaticSowingService } from '../../static-farmer/static-sowing/static-sowing.service';
import { FarmerService } from '../farmer.service';
declare var $: any;
declare var Chart: any;
@Component({
  selector: 'app-farm-location',
  templateUrl: './farm-location.component.html',
  styleUrls: ['./farm-location.component.scss'],
})
export class FarmLocationComponent implements OnInit {
  mapClickedIndex: any;
  previousIndex: any;
  data: any;
  farmerAggregate: any =[];
  farmerDetails : any;
  sowingDetails:any =[];
  procurementDetails:any = [];
  farmerCoordinates:any =[];
  farmerImage:any = "";
  countries = [];
  states = [];
  districts = [];
  taluks = [];
  villages =[];
  farmers = [];
  selectedCountry: any;
  selectedState: any;
  selectedDistrict: any;
  selectedTaluk: any;
  selectedVillage:any;
  selectedFarmer:any;
  isSubmit:boolean = false;
  filters:any =[];
  sowingIndex:number = 0;

  changeSowingIndex=(index:any)=>{
   this.sowingIndex = index;
  }


  cardIcons :any = ["assets/images/icons/farmers-ico.png","assets/images/icons/plots-ico.png"];
  constructor(private farmerService: FarmerService,
    private staticFarmerService: StaticFarmerService,
    private varietyService:VarietyService,
    private seasonService:SeasonService,
    private groupService:GroupService,
    private locationService:LocationService,
    private procurementService:ProcurementService
    ) {}

    getFarmerCoordinates=()=>{
        this.staticFarmerService.getFarmerCoordinates(this.filters).toPromise().then((coordinates:any)=>{
           this.farmerCoordinates = coordinates;
        })
    }

    getFilterObj=(key:any,operation:any,value:any)=>{
      return {key:key,operation :operation,value:value};
    }

    search=()=>{
      this.sowingIndex = 0;
      this.filters = [];
       if(this.selectedVillage)
       this.filters.push(this.getFilterObj('v.id','=',this.selectedVillage?.id));
       else if(this.selectedTaluk)
       this.filters.push(this.getFilterObj('t.id','=',this.selectedTaluk?.id));
       else if(this.selectedDistrict)
       this.filters.push(this.getFilterObj('d.id','=',this.selectedDistrict?.id));
       else if(this.selectedState)
       this.filters.push(this.getFilterObj('s.id','=',this.selectedState?.id));
       else if(this.selectedCountry)
       this.filters.push(this.getFilterObj('c.id','=',this.selectedCountry?.id));
       if(this.selectedFarmer)
       this.filters.push(this.getFilterObj('f.id','=',this.selectedFarmer?.id));
       this.reload();
    }

    reload=()=>{
      this.getFarmerCoordinates();
      $('.collapse').removeClass('show');
      $('.maps-farmer-info-wrap').hide();
      this.clear();
    }

    getFarmers=()=>{
        this.staticFarmerService.getDropFarmers().toPromise().then((data:any)=>{
          this.farmers = data;
        })
    }
    clear=()=>{
      this.selectedVillage = "";
      this.selectedTaluk = "";
      this.selectedDistrict = "";
      this.selectedState = "";
      this.selectedCountry = "";
      this.selectedFarmer = "";

    }

   ngOnInit(): void {
    this.getFarmerAggregate();
    this.getFarmerCoordinates();
    this.getCountries();
    this.getFarmers();
    $(document).ready(function () {
      $('.maps-farmer-info-wrap').hide();
      $('body').addClass('farmer-dash-hidden');
      $('.pr-sidebar-active .pr-content > .container-fluid').css(
        'padding-bottom',
        '0'
      );
      $('.pr-collapse-link').click(function () {
        //var attr = $(this).attr('aria-expanded');
        if ($(this).attr('aria-expanded') == 'false') {
          $(this).parents('.maps-farmer-info-collapse').addClass('open');
        } else {
          $(this).parents('.maps-farmer-info-collapse').removeClass('open');
        }
      });
      $('#farmerDashToggle, .farmer-dash .bttn-close').click(function () {
        $('body').toggleClass('farmer-dash-hidden');
      });
    });
  }

  getFarmerAggregate = () =>{
    this.farmerService.getFarmerAggregate().toPromise().then((data: any)=>{
      this.farmerAggregate = data;
    })
  }

  getSowingDetails=(data:any)=>{
    this.sowingDetails = [];
    data.forEach((element:any) => {
     if(element?.variety){
       this.varietyService.getVarietyById(element?.variety).toPromise().then((data:any)=>{
         element['variety']= data;
       });
     }
     if(element?.season){
         this.seasonService.getSeasonById(element?.season).toPromise().then((data:any)=>{
           element['season'] = data;
         });
     }
     this.sowingDetails.push(element);
    });
  }

  getFarmerDetails=(data:any)=>{
    if(data?.farmerGroup){
      this.groupService.getGroupById(data?.farmerGroup).toPromise().then((group:any)=>{
        data['farmerGroup'] = group ;
      });
    }
    if(data?.image){
      data['imageUrl'] = environment.baseUrl+'farmer/file/get/by-id?id='+data?.image;
    }
    this.farmerDetails = data;
    // console.log(this.farmerDetails);
  }

  getProcurementDetails=(data)=>{
     this.procurementDetails = data.map((element:any) => {
        let weight =0 ;
        if(element?.procurementDetails.length > 0){
           element?.procurementDetails.forEach((detail:any) => {
           weight = weight + detail?.netWeight;
          });
        }else {
          weight = 0;
        }
        element['weight'] = weight;
        return element;
     });
  }

  getDetails = () => {
    this.farmerDetails = "";
    let farmerId = this.farmerCoordinates[this.mapClickedIndex]?.id;
    this.staticFarmerService.getFarmerById(farmerId).toPromise().then((data: any) => {
        this.getFarmerDetails(data);
    });
    this.staticFarmerService.getSowingsByFarmer(farmerId).toPromise().then((data:any)=>{
      this.getSowingDetails(data);
    });
    this.procurementService.getLastFiveProcurementByFarmer(farmerId).toPromise().then((data:any)=>{
      this.getProcurementDetails(data);
    })
  }

  toShowCardOrNot = () =>{
    if ($('.maps-farmer-info-wrap').is(':visible')) {
      if (this.previousIndex == this.mapClickedIndex) {
        $('.maps-farmer-info-wrap').hide();
      } else {
        $('.maps-farmer-info-wrap').show();
      }
    } else {
      if (!$('.maps-farmer-info-wrap').is(':visible')) {
          $('.maps-farmer-info-wrap').show();
      }
    }
  }

  showFarmer = (event: any) => {
    this.sowingIndex= 0;
    if(event === false){
      $('.maps-farmer-info-wrap').hide();
    }else{
      if (!!this.mapClickedIndex) {
        this.previousIndex = this.mapClickedIndex;
        this.mapClickedIndex = event;
        this.toShowCardOrNot();
        this.getDetails();
      } else {
        this.mapClickedIndex = event;
        this.previousIndex = this.mapClickedIndex;
        this.toShowCardOrNot();
        this.getDetails();
      }
    }

  }

  getCountries  =  () =>  {
    this.locationService.getAllCountries().subscribe((data: any[]) => {
      this.countries = data;
    })
  }

  getStates = (id) => {
    this.locationService.getAllStateByCountry(id).subscribe((data: any[]) => {
      this.states = data;
    })
  }
  getDistricts = (id) => {
    this.locationService.getAllDistrictByState(id).subscribe((data: any[]) => {
      this.districts = data;
    })
  }

  getTaluk = (id) => {
    this.locationService.getAllTalukByDistrict(id).subscribe((data: any[]) => {
      this.taluks = data;
    })
  }

  getVillage=(id)=>{
    this.locationService.getVillageByTaluk(id).toPromise().then((data:any)=>{
      this.villages = data;
    })
  }
  changeState = (event) => {
    if(event){
      this.getStates(event?.id);
    }
  }
  changeDistrict = (event) => {
    if(event){
      this.getDistricts(event?.id);
    }
  }

  changeTaluk = (event) => {
    if(event){
      this.getTaluk(event?.id);
    }
  }

  changeVillage=(event)=>{
    if(event){
      this.getVillage(event?.id);
    }
  }
}
