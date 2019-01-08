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
    this.settings.getToggle().subscribe( val => this.toggle = val);

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
    this.storage.set('fontsize', this.fontSize);
    this.storage.set('fontstyle', this.fontStyle);
    this.storage.set('backgroundcolor', this.backgroundColor);
    this.storage.set('reminder', this.reminder);

    var date = new Date();
    date.setDate(date.getDate());
    date.setHours(12);
    date.setMinutes(15);

    this.localNotification.schedule({
      title: 'Seed of Life',
      text: 'dont forget to take time and read your reflection :)',
      trigger: { at: date },
      every: 'day'
    });
  }

  ionViewDidLoad(){
    this.storage.get('fontsize').then((val) => {
      this.fontSize = val || 2;
    });
    this.storage.get('backgroundcolor').then((val) => {
      this.backgroundColor = val || 'defaultverse';
    });
    this.storage.get('fontstyle').then((val) => {
      this.fontStyle = val || 'roboto';
    });
    this.storage.get('reminder').then((val) => {
      this.reminder = val || '12:00';
    });
  }

  toggleAppTheme() {
    if (this.toggle) {
      this.settings.setActiveTheme('dark-theme');
      this.settings.setToggle(true);
    } else {
      this.settings.setActiveTheme('');
      this.settings.setToggle(false);
    }
  }
}


