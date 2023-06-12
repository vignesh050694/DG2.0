import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MouseEvent } from "@agm/core";


@Component({
  selector: 'app-Maps',
  templateUrl: './Maps.component.html',
  styleUrls: ['./Maps.component.scss'],
})
export class MapsComponent {
  // google maps zoom level
  @Input() zoom: number = 6;
  minClusterSize:any = 2;
  @Input() lat: number = 13.124363;
  @Input() lng: number = 80.282201;
  @Output() clicked = new EventEmitter<any>();
  @Input() markers: any = [];
  previous;

  clickedMarker(index: number) {
    this.clicked.emit(index);
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  mapClicked(){
    this.clicked.emit(false);
  }
}

// just an interface for type safety.
interface marker {
  lat: number;
  lon: number;
  label?: string;
  draggable: boolean;
}
