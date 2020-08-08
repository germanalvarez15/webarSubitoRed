import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css'],
})
export class CoinComponent implements OnInit {
  @Input() iconRoute: string;
  playing: boolean;
  timeoutHandler: any;

  constructor() {}

  ngOnInit(): void {}

  onStartClick() {
    this.playing = true;
  }
  onEndClick() {
    this.playing = false;
  }
}
