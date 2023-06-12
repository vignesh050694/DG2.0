import { FarmerMapService } from './farmer-map.service';
import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StaticFarmerService } from './../../static-farmer.service';




@Component({
  selector: 'app-farmer-map',
  templateUrl: './farmer-map.component.html',
  styleUrls: ['./farmer-map.component.scss']
})
export class FarmerMapComponent implements OnInit {

  @Input() farmerData:any ;
  @Input() height :any = "300px";
  latitude: any = '';
  longitude: any = '' ;
  name=[];
  zoom= 1;
  minZoom= 3;
  distance = 0;
  minClusterSize = 5;
  style:any;
  previous:any;
  public searchControl: FormControl;
  ptsList: string;
  farm:any[];
  poligonsList:any = [];


  @ViewChild('search', {static: true}) public searchElementRef: ElementRef;


  constructor(public route: ActivatedRoute,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private staticFarmerService:StaticFarmerService,
    private farmerMapService:FarmerMapService,
    ) { }

  ngOnInit() {
    this.style = "height : "+this.height;
    this.getFarmsByFarmerId(this.farmerData?.id);

  }


  getFarmsByFarmerId=(id:any)=>{
    this.staticFarmerService.getFarmsByFarmerId(id).toPromise().then((data:any[])=>{
      this.poligonsList = [];
      data?.forEach((farm:any)=>{
        this.getCoordinatesByFarmId(farm?.id);
      })
    })
  }


  getCoordinatesByFarmId=(id:any)=>{
    let polygonPts =[];
    this.staticFarmerService.getCoordinatesByFarmId(id).toPromise().then((coordinates:any[])=>{
     coordinates.forEach((coordinate:any)=>{
        polygonPts.push(new google.maps.LatLng(coordinate?.latitude,  coordinate?.longitude));
    })
      if(coordinates.length > 0) this.poligonsList.push(polygonPts);
    })
  }



  clickedMarker(infowindow) {
    if (this.previous) {
        this.previous.close();
    }
    this.previous = infowindow;
 }

  mapClicked($event: MouseEvent) {
    this.farmerData.push({
      // lat: $event.coords1.lat,
      // lng: $event.coords1.lng,
      draggable: true
    });
  }

  clusterClick=(event:any)=>{
      console.log(event);
  }
}
