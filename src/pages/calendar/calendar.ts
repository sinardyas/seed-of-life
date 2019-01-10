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
  _liked = [];
  _state: any;
  ref: any;
  month: any;
  allRef: Reflections[] = [];
  tempAllRef: Reflections[] = [];
  temp: FirebaseListObservable<Reflections[]>;
  monthCounter = 0;
  date = new Date();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private reflectionProvider: ReflectionProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public database: AngularFireDatabase
  ) {
    this.storage.get('likedRef').then( (data) => {
      this._liked = data;
    });

    const monthValue = `${this.date.getMonth() + 1}`;
    this.month = monthValue.padStart(2, '0')
  }

  ngOnInit() {
    let loading = this.loadingCtrl.create({
      spinner: 'dots'
    });
    loading.present();

    this.temp = this.reflectionProvider.getReflectionByMonth(this.month.toString());
    this.temp.subscribe(
      snapshot => {
        snapshot.forEach(data => {
          this.allRef.push(new Reflections(data));
          this.storage.set(`MONTH_LIST_REFLECTION:${this.month}`, this.allRef);
        });
        loading.dismiss();
      }
    );
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
    this.month = this.monthCounter < 13 ? `${this.monthCounter}`.padStart(2, '0') : '01';

    let loading = this.loadingCtrl.create({
      spinner: 'dots'
    });
    loading.present();

    this.temp = this.reflectionProvider.getReflectionByMonth(this.month);
    this.temp.subscribe(
      snapshot => {
        snapshot.forEach( data => {
          this.allRef.push(new Reflections(data));
        });
        loading.dismiss();
      }
    );
  }

  btnPrev() {
    this.allRef = [];
    this.monthCounter = this.monthCounter - 1;
    this.month = this.monthCounter > 1 ? `${this.monthCounter}`.padStart(2, '0') : '12';

    let loading = this.loadingCtrl.create({
      spinner: 'dots'
    });
    loading.present();

    this.temp = this.reflectionProvider.getReflectionByMonth(this.month);
    this.temp.subscribe(
      snapshot => {
        snapshot.forEach( data => {
          this.allRef.push(new Reflections(data));
        });
        loading.dismiss();
      }
    );
  }
}
