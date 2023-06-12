import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AgmMap, AgmMarker } from '@agm/core';
import { StaticFarmerService } from '../static-farmer.service';


@Component({
  selector: 'app-static-location',
  templateUrl: './static-location.component.html',
  styleUrls: ['./static-location.component.css']
})

export class StaticLocationComponent implements OnInit{

	constructor(
		//  private staticFarmerService: StaticFarmerService
	 ) {}	
   ngOnInit(): void {
     
   }
    

  }

// 	// google maps zoom level
//   zoom: number = 8;
  
//   // initial center position for the map
//   lat: number = 51.673858;
//   lng: number = 7.815982;

//   clickedMarker(label: string, index: number) {
//     console.log(`clicked the marker: ${label || index}`)
//   }


//   mapClicked($event: MouseEvent) {
//    this.markers.push({
// 	   lat: 0,
// 	   lng: 0,
// 	   draggable: false
//    });
//  }
  
//   markerDragEnd(m: Markers, $event: MouseEvent) {
//     console.log('dragEnd', m, $event);
//   }
  
//   markers: Markers[] = [];
// }

// // just an interface for type safety.
// interface Markers {
// 	lat: number;
// 	lng: number;
// 	label?: string;
// 	draggable: boolean;
// }