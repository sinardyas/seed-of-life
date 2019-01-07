import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SettingProvider } from '../../providers/setting/setting';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-card-detail',
  templateUrl: 'card-detail.html',
})
export class CardDetailPage {
  rc;
  tabBarElement;
  date;

  fontSize = {}
  backgroundColor = {}
  fontStyle = {}

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverController: PopoverController,
    private storage: Storage,
    public settingProvider: SettingProvider
  ) {
    this.rc = navParams.data.rc;
    const dateValue = this.rc.date.split('-');
    this.date = moment(new Date(dateValue[2], dateValue[0] - 1, dateValue[1])).format('MMMM YYYY, DD');
  }

  ionViewWillEnter() {
    this.storage.get('fontsize').then((val) => {
      if(val) {
        this.fontSize = val;
      } else {
        this.fontSize = 'medium';
      }
    });
    this.storage.get('backgroundcolor').then((val) => {
      if(val) {
        this.backgroundColor = val;
      } else {
        this.backgroundColor = 'defaultverse';
      }
    });
    this.storage.get('fontstyle').then((val) => {
      if(val) {
        this.fontStyle = val;
      } else {
        this.fontStyle = 'roboto';
      }
    });
  }

  presentPopover(myEvent) {
    let popover = this.popoverController.create('PopoverPage', { rc: this.rc });
    popover.present({
      ev: myEvent
    });
  }
}
