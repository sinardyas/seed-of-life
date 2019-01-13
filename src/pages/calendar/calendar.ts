import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ReflectionProvider } from '../../providers/reflection/reflection';
import { Reflections } from '../models/reflections';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage implements OnInit {
  reflectionCollection: {id: number, title: string, body: string, date: string}[];
  ref: any;
  month: any;
  allRef: Reflections[] = [];
  monthCounter = 0;
  year = 0;
  date = new Date();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private reflectionProvider: ReflectionProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public database: AngularFireDatabase
  ) {
    this.monthCounter = this.date.getMonth() + 1;
    this.month = `${this.date.getMonth() + 1}`.padStart(2, '0');
    this.year = this.date.getFullYear();
  }

  ngOnInit() {
    let loading = this.loadingCtrl.create({ spinner: 'dots' });
    loading.present();

    this.storage.get(`MONTH_LIST:${this.month}:${this.year}`).then(data => {
      if (data) {
        data.forEach(ref => this.allRef.push(new Reflections(ref)));
        loading.dismiss();
      } else {
        this.reflectionProvider.getReflectionByMonth(this.month).subscribe(snapshot => {
          snapshot.forEach(val => this.allRef.push(new Reflections(val)));
          this.storage.set(`MONTH_LIST:${this.month}:${this.year}`, snapshot);
          loading.dismiss();
        }
      );
      }
    })
  }

  openCardDetail(rc) {
    this.navCtrl.push('CardDetailPage', { rc: rc });
  }

  fav(rc) {
    let toast = this.toastCtrl.create({
      message: 'Liked!',
      duration: 2000,
      position: 'bottom'
    });

    this.reflectionProvider.addRefToFavorites(rc);
    toast.present();
  }

  unfav(rc) {
    let toast = this.toastCtrl.create({
      message: 'Unliked!',
      duration: 2000,
      position: 'bottom'
    });

    this.reflectionProvider.removeRefFromFavorites(rc);
    toast.present();
  }

  btnNext() {
    this.allRef = [];
    this.monthCounter = this.monthCounter + 1;
    this.monthCounter = this.monthCounter > 12 ? 1 : this.monthCounter;
    this.month = `${this.monthCounter}`.padStart(2, '0');

    let loading = this.loadingCtrl.create({ spinner: 'dots' });
    loading.present();

    this.storage.get(`MONTH_LIST:${this.month}:${this.year}`).then(data => {
      if (data) {
        data.forEach(ref => this.allRef.push(new Reflections(ref)));
        loading.dismiss();
      } else {
        this.reflectionProvider.getReflectionByMonth(this.month).subscribe(snapshot => {
            snapshot.forEach(val => this.allRef.push(new Reflections(val)));
            loading.dismiss();
          }
        );
      }
    });
  }

  btnPrev() {
    this.allRef = [];
    this.monthCounter = this.monthCounter - 1;
    this.monthCounter = this.monthCounter < 1 ? 12 : this.monthCounter;
    this.month = `${this.monthCounter}`.padStart(2, '0');

    let loading = this.loadingCtrl.create({ spinner: 'dots' });
    loading.present();

    this.storage.get(`MONTH_LIST:${this.month}:${this.year}`).then(data => {
      if (data) {
        data.forEach(ref => this.allRef.push(new Reflections(ref)));
        loading.dismiss();
      } else {
        this.reflectionProvider.getReflectionByMonth(this.month).subscribe(snapshot => {
            snapshot.forEach(val => this.allRef.push(new Reflections(val)));
            loading.dismiss();
          }
        );
      }
    });
  }
}
