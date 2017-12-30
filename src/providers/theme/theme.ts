import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the ThemeProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ThemeProvider {

  constructor() {
    console.log('Hello ThemeProvider Provider');
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
