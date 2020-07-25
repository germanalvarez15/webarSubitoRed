import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SceneComponent } from './ar-module/scene/scene.component';
import { HomeComponent } from './webpage/home/home.component';
import { ScanComponent } from './ar-module/scan/scan.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ar', component: SceneComponent },
  { path: 'scan', component: ScanComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
