import { EventEmitter, Injectable } from '@angular/core'
import { FooterModel } from './footer/footerType.model';

@Injectable({
  providedIn: 'root',
})
export class PopupService{
  public onOpenFooterPopup: EventEmitter<FooterModel> = new EventEmitter();
  public onIsPopupOpened: EventEmitter<boolean> = new EventEmitter();
}
