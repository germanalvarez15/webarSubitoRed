import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SceneComponent } from './ar-module/scene/scene.component';
import { HomeComponent } from './webpage/home/home.component';
import { ScanComponent } from './ar-module/scan/scan.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  declarations: [AppComponent, SceneComponent, HomeComponent, ScanComponent],
  imports: [BrowserModule, AppRoutingModule, ZXingScannerModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
