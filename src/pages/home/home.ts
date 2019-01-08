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
  today: string;

  reflections = {} as Reflections;
  reflectionRef$: FirebaseListObservable<Reflections[]>;
  listOfReflectionRef$: FirebaseListObservable<Reflections[]>;
  rc: Reflections[];
  date = new Date().toISOString().substring(0,10);
  test = new Date();
  temp = new Date();
  day = 0;
  month = 0;
  year = 0;
  days: string;
  months: string;
  years: string;
  dday: string;


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
    this.temp = new Date();

    const dayValue = `${this.temp.getDate()}`;
    const monthValue = `${this.temp.getMonth() + 1}`;
    const yearValue = `${this.temp.getFullYear()}`;

    this.dday = `${monthValue.padStart(2, '0')}-${dayValue.padStart(2, '0')}-${yearValue.padStart(2, '0')}`;
  }

  ngOnInit() {
    let loading = this.loadingCtrl.create({
        spinner: 'dots'
      });
    loading.present();

    this.database.list('/reflection', {
        query: {
        orderByChild: 'date',
        equalTo: this.dday,
        preserveSnapshot: true
      }
    }).subscribe(
      snapshot => {
        snapshot.forEach( data => {
          var arr = [];
          arr.push(data);
          this.rc = arr;
        });
        loading.dismiss();
      },
    );
  }

  ionViewWillEnter() {
    this.storage.get('fontsize').then((val) => {
      this.fontSize = val || 'medium';
    });
    this.storage.get('backgroundcolor').then((val) => {
      this.backgroundColor = val || 'defaultverse';
    });
    this.storage.get('fontstyle').then((val) => {
      this.fontStyle = val || 'roboto';
    });
  }

  presentPopover(myEvent, rc) {
    let popover = this.popoverController.create('PopoverPage', { rc: rc[0] });
    popover.present({
      ev: myEvent
    });
  }

}
