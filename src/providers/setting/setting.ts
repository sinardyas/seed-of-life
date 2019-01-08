import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

/*
  Generated class for the SettingProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SettingProvider {
  private theme: BehaviorSubject<String>;
  private toggle: BehaviorSubject<Boolean>;
  private altBackground: Boolean = false;
  public backgroundColor: any;
  public fontStyle: any;
  public fontSize: any;

  constructor(public storage: Storage) {
    this.theme = new BehaviorSubject('');
    this.toggle = new BehaviorSubject(false);

    this.storage.get('fontsize').then((val) => {
      this.fontSize = val;
    });
    this.storage.get('backgroundcolor').then((val) => {
      this.backgroundColor = val;
    });
    this.storage.get('fontstyle').then((val) => {
      this.fontStyle = val;
    });
  }

  setActiveTheme(val) {
    this.theme.next(val);
  }

  setToggle(val) {
    this.toggle.next(val);
  }

  getActiveTheme() {
    return this.theme.asObservable();
  }

  getToggle() {
    return this.toggle.asObservable();
  }

  setBackground (isAlt: boolean){
      this.altBackground = isAlt;
  }

  isAltBackground() {
      return this.altBackground;
  }

  setMainBgColor(backgroundColor) {
    switch(backgroundColor) {
      case 'whiteverse': return 'white';
      case 'purpleverse': return 'purple';
      case 'tanverse': return 'tan';
      case 'greyverse': return 'grey';
      case 'defaultverse': return 'default';
    }
  }

  setVerseBgColor(backgroundColor) {
    return backgroundColor;
  }

  setFontStyle(fontStyle) {
    return fontStyle;
  }

  setVerseFontSize(fontSize) {
    switch(fontSize) {
      case 1: return 'smallverse';
      case 2: return 'mediumverse';
      case 3: return 'bigverse';
    }
  }

  setBodyFontSize(fontSize) {
    switch(fontSize) {
      case 1: return 'small';
      case 2: return 'medium';
      case 3: return 'big';
    }
  }
}
