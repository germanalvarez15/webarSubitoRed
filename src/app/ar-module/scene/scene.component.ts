import {
  Component,
  OnInit,
  ViewEncapsulation,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { PlacesEnum } from 'src/app/places.enum';
import { environment } from 'src/environments/environment';
import { OrientationService } from 'src/app/orientation.service';
import { ImageMarkerModel } from 'src/app/image-marker.model';
import { MapService } from 'src/app/webpage/frame/map-container/map.service';
const aframe = (window as any).AFRAME;
import adapter from 'webrtc-adapter';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css'],
})
export class SceneComponent implements OnInit {
  @ViewChild('marker') theMarker: ElementRef;
  onLandscape: boolean = false;
  zonesLoaded: boolean;
  placesEnum: any = PlacesEnum;
  markers: ImageMarkerModel[] = [];

  activeZoneType: PlacesEnum = 0;

  constructor(
    private router: Router,
    private orientationService: OrientationService,
    private mapService: MapService
  ) {
    if (this.router.url.includes('scan')) {
      this.onLandscape = this.onLandscapeMode();
    }
    this.activeZoneType = this.mapService.getZoneTypeToScan();
  }
  isActive: boolean = false;
  ngOnInit(): void {
    this.trackingListeners();

    this.orientationService.onOrientation.subscribe((orientation: string) => {
      if (orientation == 'landscape') {
        this.onLandscape = true;
      } else {
        this.onLandscape = false;
      }
    });

    this.markers = this.mapService.getAllMarkers();

    window.onpopstate = function (event) {
      window.location.reload();
    };
  }

  trackingListeners() {
    aframe.registerComponent('markerhandler2-2', function () {
      this.el.sceneEl.addEventListener('markerFound', (event) => {
        // redirect to custom URL
        window.location.href =
          window.location.origin + '?place=' + event.target.id;
      });
    });
    aframe.registerComponent('markerhandler2-3', function () {
      this.el.sceneEl.addEventListener('markerFound', (event) => {
        // redirect to custom URL
        window.location.href =
          window.location.origin + '?place=' + event.target.id;
      });
    });
    aframe.registerComponent('markerhandler3-2', function () {
      this.el.sceneEl.addEventListener('markerFound', (event) => {
        // redirect to custom URL
        window.location.href =
          window.location.origin + '?place=' + event.target.id;
      });
    });
    aframe.registerComponent('markerhandler3-3', function () {
      this.el.sceneEl.addEventListener('markerFound', (event) => {
        // redirect to custom URL
        window.location.href =
          window.location.origin + '?place=' + event.target.id;
      });
    });
    aframe.registerComponent('markerhandler4-2', function () {
      this.el.sceneEl.addEventListener('markerFound', (event) => {
        // redirect to custom URL
        window.location.href =
          window.location.origin + '?place=' + event.target.id;
      });
    });
    aframe.registerComponent('markerhandler7-2', function () {
      this.el.sceneEl.addEventListener('markerFound', (event) => {
        // redirect to custom URL
        window.location.href =
          window.location.origin + '?place=' + event.target.id;
      });
    });
    aframe.registerComponent('markerhandler8-2', function () {
      this.el.sceneEl.addEventListener('markerFound', (event) => {
        // redirect to custom URL
        window.location.href =
          window.location.origin + '?place=' + event.target.id;
      });
    });
    aframe.registerComponent('markerhandler8-3', function () {
      this.el.sceneEl.addEventListener('markerFound', (event) => {
        // redirect to custom URL
        window.location.href =
          window.location.origin + '?place=' + event.target.id;
      });
    });
    aframe.registerComponent('markerhandler9-2', function () {
      this.el.sceneEl.addEventListener('markerFound', (event) => {
        console.log(event);

        // redirect to custom URL
        window.location.href =
          window.location.origin + '?place=' + event.target.id;
      });
    });
    aframe.registerComponent('markerhandler9-3', function () {
      this.el.sceneEl.addEventListener('markerFound', (event) => {
        console.log(event);

        // redirect to custom URL
        window.location.href =
          window.location.origin + '?place=' + event.target.id;
      });
    });
    aframe.registerComponent('markerhandler9-4', function () {
      this.el.sceneEl.addEventListener('markerFound', (event) => {
        console.log(event);

        // redirect to custom URL
        window.location.href =
          window.location.origin + '?place=' + event.target.id;
      });
    });
    aframe.registerComponent('markerhandler9-5', function () {
      this.el.sceneEl.addEventListener('markerFound', (event) => {
        console.log(event);

        // redirect to custom URL
        window.location.href =
          window.location.origin + '?place=' + event.target.id;
      });
    });
    aframe.registerComponent('markerhandler9-6', function () {
      this.el.sceneEl.addEventListener('markerFound', (event) => {
        console.log(event);

        // redirect to custom URL
        window.location.href =
          window.location.origin + '?place=' + event.target.id;
      });
    });
    aframe.registerComponent('markerhandler10-2', function () {
      this.el.sceneEl.addEventListener('markerFound', (event) => {
        console.log(event);

        // redirect to custom URL
        window.location.href =
          window.location.origin + '?place=' + event.target.id;
      });
    });
    aframe.registerComponent('markerhandler10-3', function () {
      this.el.sceneEl.addEventListener('markerFound', (event) => {
        console.log(event);

        // redirect to custom URL
        window.location.href =
          window.location.origin + '?place=' + event.target.id;
      });
    });
    aframe.registerComponent('markerhandler10-4', function () {
      this.el.sceneEl.addEventListener('markerFound', (event) => {
        console.log(event);

        // redirect to custom URL
        window.location.href =
          window.location.origin + '?place=' + event.target.id;
      });
    });
  }

  goBack() {
    this.isActive = false;

    this.router.navigate(['']);
  }
  onLandscapeMode() {
    if (window.outerWidth > window.outerHeight) return true;
    else return false;
  }
}
