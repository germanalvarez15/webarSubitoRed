import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SceneComponent } from './ar-module/scene/scene.component';
import { HomeComponent } from './webpage/home/home.component';
import { ScanComponent } from './ar-module/scan/scan.component';
import { FrameComponent } from './webpage/frame/frame.component';
import { CoinComponent } from './webpage/frame/coin/coin.component';
import { MapContainerComponent } from './webpage/frame/map-container/map-container.component';
import { ImageTargetComponent } from './ar-module/scene/image-target/image-target.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  declarations: [
    AppComponent,
    SceneComponent,
    HomeComponent,
    ScanComponent,
    FrameComponent,
    CoinComponent,
    MapContainerComponent,
    ImageTargetComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ZXingScannerModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
