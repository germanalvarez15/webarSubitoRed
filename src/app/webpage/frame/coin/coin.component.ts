import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ZoneModel } from '../zone.model';
import { MapService } from '../map-container/map.service';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CoinComponent implements OnInit {
  @Input() zone: ZoneModel;
  playing: boolean;
  timeoutHandler: any;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.mapService.onZoneSelected.subscribe((zone: ZoneModel) => {
      if (zone.id == this.zone.id && !this.playing) {
        this.playing = true;
      } else {
        this.playing = false;
      }
    });
  }

  onStartClick() {
    this.playing = true;
  }
  onEndClick() {
    this.playing = false;
  }
  onChangeState() {
    this.mapService.onNewZoneSelected(this.zone);
  }
}
