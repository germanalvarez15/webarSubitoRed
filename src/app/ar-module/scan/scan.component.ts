import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from '@angular/core';
import { PlacesEnum } from 'src/app/places.enum';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css'],
})
export class ScanComponent implements OnInit {
  @ViewChild('scanner', { static: false })
  scanner: ZXingScannerComponent;
  @Output() onScannResult: EventEmitter<PlacesEnum> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  /**
   * Some method.
   */
  scanSuccessHandler(event): void {
    this.onScannResult.emit(event);
    console.log('RESULTADO: ' + event);
  }
}
