import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SceneComponent } from './ar-module/scene/scene.component';
import { HomeComponent } from './webpage/home/home.component';
import { ScanComponent } from './ar-module/scan/scan.component';
import { FrameComponent } from './webpage/frame/frame.component';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  { path: '', component: FrameComponent },
  { path: environment.routes.scan, component: ScanComponent },
  { path: environment.routes.home, component: FrameComponent },
  { path: environment.routes.home + '/:place', component: FrameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
