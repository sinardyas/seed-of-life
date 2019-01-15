import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SettingProvider } from '../../providers/setting/setting';
import { LocalNotifications } from '@ionic-native/local-notifications';

/**
 * Generated class for the SettingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  fontStyle = {}
  fontSize = {}
  backgroundColor = {}
  reminder = {};
  toggle: Boolean;
  color: {value: string, label: string}[];
  style: {value: string, label: string}[];
  selectedTheme: String;

  constructor(
    private storage: Storage,
    private settings: SettingProvider,
    public localNotification: LocalNotifications
  ) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.settings.getToggle().subscribe(val => this.toggle = val);

    this.color = [{
      value: 'whiteverse',
      label: 'White'
    },
    {
      value: 'purpleverse',
      label: 'Purple'
    },
    {
      value: 'greyverse',
      label: 'Grey'
    },
    {
      value: 'tanverse',
      label: 'Tan'
    },
    {
      value: 'defaultverse',
      label: 'Default'
    }];

    this.style = [{
      value: 'arial',
      label: "Arial"
    },
    {
      value: 'timesnew',
      label: "Times New Roman"
    },
    {
      value: 'calibri',
      label: "Calibri"
    },
    {
      value: 'roboto',
      label: "Roboto"
    }];
  }

  ionViewCanLeave(){
    this.storage.set('FONT_SIZE', this.fontSize);
    this.storage.set('FONT_STYLE', this.fontStyle);
    this.storage.set('BACKGROUND_COLOR', this.backgroundColor);
    this.storage.set('reminder', this.reminder);
  }

  ionViewDidLoad(){
    this.storage.get('FONT_SIZE').then(val => this.fontSize = val || 2);
    this.storage.get('BACKGROUND_COLOR').then(val => this.backgroundColor = val || 'defaultverse');
    this.storage.get('FONT_STYLE').then(val => this.fontStyle = val || 'roboto');
    this.storage.get('reminder').then(val => this.reminder = val || '12:00');
  }

  toggleAppTheme() {
    let activeThemeValue = this.toggle ? 'dark-theme' : '';
    let toggelSetValue = this.toggle ? true : false;
    this.settings.setActiveTheme(activeThemeValue);
    this.settings.setToggle(toggelSetValue);
  }
}


