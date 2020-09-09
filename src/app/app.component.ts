import { Component, ViewEncapsulation, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { OrientationService } from './orientation.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'webarSubitoRed';
  onLandscape: boolean = false;

  constructor(private orientationService: OrientationService) {}

  @HostListener('window:orientationchange', ['$event']) onOrientationChange(
    event
  ) {
    setTimeout(() => {
      if (window.outerWidth > window.outerHeight) {
        this.orientationService.onOrientationChanged('landscape');
      } else {
        this.orientationService.onOrientationChanged('portrait');
      }
    }, 200);
  }
}
