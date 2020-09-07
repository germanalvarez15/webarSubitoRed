import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-target',
  templateUrl: './image-target.component.html',
  styleUrls: ['./image-target.component.css']
})
export class ImageTargetComponent implements OnInit {

  @Input() url: string;
  @Input() placeID: number;
  @Input() subPlaceID: number;
  constructor() { }

  ngOnInit(): void {
  }

}
