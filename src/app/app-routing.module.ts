import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SceneComponent } from './ar-module/scene/scene.component';
import { HomeComponent } from './webpage/home/home.component';
import { ScanComponent } from './ar-module/scan/scan.component';
import { FrameComponent } from './webpage/frame/frame.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ar', component: SceneComponent },
  { path: 'home', component: FrameComponent },
  { path: 'scan', component: ScanComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
