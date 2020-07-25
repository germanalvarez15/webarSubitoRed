import { Component, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css'],
})
export class ScanComponent implements OnInit {
  @ViewChild('scanner', { static: false })
  scanner: ZXingScannerComponent;

  constructor() {}

  ngOnInit(): void {}

  /**
   * Some method.
   */
  scanSuccessHandler(event): void {
    console.log('RESULTADO: ' + event);
  }
}
