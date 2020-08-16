import { Injectable, EventEmitter } from '@angular/core';
import { ZoneModel } from '../zone.model';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  onZoneSelected: EventEmitter<ZoneModel> = new EventEmitter();
  constructor() {}

  onNewZoneSelected(zone: ZoneModel) {
    this.onZoneSelected.emit(zone);
  }
}
