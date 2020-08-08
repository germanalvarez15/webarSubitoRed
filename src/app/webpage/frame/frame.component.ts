import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css'],
})
export class FrameComponent implements OnInit {
  lugarActivo: string = 'estación fluvial';

  constructor() {}

  ngOnInit() {}
}
