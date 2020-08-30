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
const aframe = (window as any).AFRAME;

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css'],
})
export class SceneComponent implements OnInit {
  @ViewChild('marker') theMarker: ElementRef;
  onLandscape: boolean = false;
  placesEnum: any = PlacesEnum;

  constructor(
    private router: Router,
    private orientationService: OrientationService
  ) {
    if (this.router.url.includes('scan')) {
      this.onLandscape = this.onLandscapeMode();
    }
  }
  isActive: boolean = false;
  ngOnInit(): void {
    aframe.registerComponent('markerhandler', {
      init: function () {
        this.el.sceneEl.addEventListener('markerFound', (event) => {
          // redirect to custom URL

          window.location.href =
            window.location.origin + '/home/' + event.target.id;
          /*
          this.router.navigate([environment.routes.home], {
            queryParams: {
              place: event.target.id,
            },
          });
          */
        });
      },
    });

    this.orientationService.onOrientation.subscribe((orientation: string) => {
      if (orientation == 'landscape') {
        this.onLandscape = true;
      } else {
        this.onLandscape = false;
      }
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
