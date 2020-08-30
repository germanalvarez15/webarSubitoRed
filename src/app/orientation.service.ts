import { EventEmitter, HostListener, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class OrientationService {
  onOrientation: EventEmitter<string> = new EventEmitter();

  onOrientationChanged(newOrientation: string) {
    this.onOrientation.emit(newOrientation);
  }
}
