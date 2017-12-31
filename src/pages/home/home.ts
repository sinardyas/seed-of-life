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
    // console.log(this.date);
    // console.log(this.test.getDate() + "-" + this.test.getMonth() + '-' + this.test.getFullYear());
    // this.today = this.test.getMonth()+1 + "-" + this.test.getDate() + "-"  + this.test.getFullYear();

    //this.temp.setDate(1);
    //this.temp.setMonth(1);
    //this.temp.setFullYear(2018);
    this.temp = new Date();

    this.day = this.temp.getDate();
    this.month = this.temp.getMonth()+1;
    this.year = this.temp.getFullYear();
    if(this.day < 10) {
      this.days = '0'+this.day;
    } else {
      this.days = this.day.toString();
    }
    if(this.month < 10) {
      this.months = '0'+this.month;
    } else {
      this.months = this.month.toString();
    }
    this.years = this.year.toString();
    this.dday = this.months + '-' + this.days + '-' + this.years;
    console.log(this.dday);
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

  presentPopover(myEvent, rc) {
    let popover = this.popoverController.create('PopoverPage', { rc: rc[0] });
    popover.present({
      ev: myEvent
    });
  }

}
