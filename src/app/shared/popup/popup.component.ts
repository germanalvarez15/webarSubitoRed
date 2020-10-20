import { Component, OnInit } from '@angular/core';
import { FooterModel } from './footer/footerType.model';
import { PopupService } from './popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  isActive: boolean = false;
  activeData: FooterModel;
  constructor(
    private popupService: PopupService
  ) { }

  ngOnInit(): void {
    this.popupService.onOpenFooterPopup.subscribe((data:FooterModel) => {
      if(data){
        this.isActive = true;
        this.activeData = data;
      }
    })
  }

  onClosePopup(){
    this.isActive = false;
    this.popupService.onIsPopupOpened.emit(false);
  }
}
