import { Component, OnInit } from '@angular/core';
import { IonicPage, PopoverController, LoadingController, MenuController, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Reflections } from '../../data/reflections.interface';
import { Storage } from '@ionic/storage';
import { SettingProvider } from '../../providers/setting/setting';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  fontSize = {}
  backgroundColor = {}
  fontStyle = {}
  rc: Reflections[];
  date = new Date();
  fullDate: string;
  yesterdayDate: string;

  constructor(
    public menu: MenuController,
    public popoverController: PopoverController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: AngularFireDatabase,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public settingProvider: SettingProvider
  ) {
    const dayValue = `${this.date.getDate()}`;
    const yesterdayValue = `${this.date.getDate() - 1}`;
    const monthValue = `${this.date.getMonth() + 1}`;
    const yearValue = `${this.date.getFullYear()}`;

    this.fullDate = `${monthValue.padStart(2, '0')}-${dayValue.padStart(2, '0')}-${yearValue.padStart(2, '0')}`;
    this.yesterdayDate = `${monthValue.padStart(2, '0')}-${yesterdayValue.padStart(2, '0')}-${yearValue.padStart(2, '0')}`;
  }

  ngOnInit() {
    let loading = this.loadingCtrl.create({ spinner: 'dots' });
    loading.present();
    this.storage.get(`TODAY_REFLECTION:${this.fullDate}`).then(val => {
      if (val) {
        this.rc = val;
        loading.dismiss();
      } else {
        this.database.list('/reflection', {
          query: {
            orderByChild: 'date',
            equalTo: this.fullDate,
            preserveSnapshot: true
          }
        }).subscribe(snapshot => {
            this.rc = snapshot;
            this.storage.set(`TODAY_REFLECTION:${this.fullDate}`, snapshot).then(() => {
              this.storage.remove(`TODAY_REFLECTION:${this.yesterdayDate}`)
            });
            loading.dismiss();
          },
        );
      }
    });
  }

  ionViewWillEnter() {
    this.storage.get('FONT_SIZE').then(val => this.fontSize = val || 'medium');
    this.storage.get('BACKGROUND_COLOR').then(val => this.backgroundColor = val || 'defaultverse');
    this.storage.get('FONT_STYLE').then(val => this.fontStyle = val || 'roboto');
  }

  presentPopover(ev, rc) {
    let popover = this.popoverController.create('PopoverPage', { rc: rc[0] });
    popover.present({ ev });
  }

}
