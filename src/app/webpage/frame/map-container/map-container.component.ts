import { Component, OnInit, Input, HostListener } from '@angular/core';
import { MapService } from './map.service';
import { ZoneModel } from '../zone.model';
import { OrientationService } from 'src/app/orientation.service';

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.css'],
})
export class MapContainerComponent implements OnInit {
  @Input() zone: ZoneModel;
  onLandscape: boolean = false;

  isActive: boolean;
  constructor(
    private mapService: MapService,
    private orientationService: OrientationService
  ) {}

  ngOnInit(): void {
    this.mapService.onZoneSelected.subscribe((zone: ZoneModel) => {
      if (zone.id == this.zone.id && !this.isActive) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
    });

    this.orientationService.onOrientation.subscribe((orientation: string) => {
      console.log('ORIENTACION: ' + orientation);
      if (orientation == 'landscape') {
        this.onLandscape = true;
      } else {
        this.onLandscape = false;
      }
    });
    this.onLandscape = this.onLandscapeMode();
  }

  changeStatus() {
    this.mapService.onNewZoneSelected(this.zone);
  }
  onLandscapeMode() {
    if (window.outerWidth > window.outerHeight) return true;
    else return false;
  }
}
