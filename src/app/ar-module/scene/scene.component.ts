import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css'],
})
export class SceneComponent implements OnInit {
  constructor(private router: Router) {}

  isActive: boolean = false;
  ngOnInit(): void {
    this.isActive = true;
  }

  goBack() {
    this.isActive = false;

    this.router.navigate(['']);
  }
}
