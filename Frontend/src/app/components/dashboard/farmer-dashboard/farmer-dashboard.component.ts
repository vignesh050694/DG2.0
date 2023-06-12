import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { AgmMap } from '@agm/core';

@Component({
  selector: 'app-farmer-dashboard',
  templateUrl: './farmer-dashboard.component.html',
  styleUrls: ['./farmer-dashboard.component.scss']
})
export class FarmerDashboardComponent implements OnInit {

  cardArray: any[] = [];

  @ViewChild(AgmMap)
  public agmMap: AgmMap

  constructor(private dashBoardService: DashboardService) {

  }

  async ngOnInit() {
    /* this.dashBoardService.getFarmerData().toPromise().then((data: any) => {
      this.cardArray = data;
    }) */
  }

  ngAfterViewInit(): void {

  }

  // google maps zoom level
  zoom: number = 8;

  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }


  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ]

}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
