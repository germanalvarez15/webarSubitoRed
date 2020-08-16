import { Component, OnInit, Input } from '@angular/core';
import { MapService } from './map.service';
import { ZoneModel } from '../zone.model';

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.css'],
})
export class MapContainerComponent implements OnInit {
  @Input() zone: ZoneModel;

  isActive: boolean;
  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.mapService.onZoneSelected.subscribe((zone: ZoneModel) => {
      if (zone.id == this.zone.id && !this.isActive) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
    });
  }

  changeStatus() {
    this.mapService.onNewZoneSelected(this.zone);
  }
}
