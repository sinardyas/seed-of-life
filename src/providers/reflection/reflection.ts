import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Reflections } from '../../data/reflections.interface';
import { AngularFireDatabase } from "angularfire2/database";
import 'rxjs/add/operator/map';

@Injectable()
export class ReflectionProvider {
  private favoritesRef: Reflections[] = [];
  like;
  read;
  state;
  month;
  likedRef = [];
  readedRef = [];

  constructor(public storage: Storage, public afdb: AngularFireDatabase) {
    this.storage.get('LIKED_LIST').then(data => this.likedRef = data);
    this.storage.get('READED_LIST').then(data => this.readedRef = data)
  }

  getMonth(month) {
    switch(month) {
      case '01': return 'January';
      case '02': return 'February';
      case '03': return 'March';
      case '04': return 'April';
      case '05': return 'May';
      case '06': return 'June';
      case '07': return 'July';
      case '08': return 'August';
      case '09': return 'September';
      case '10': return 'October';
      case '11': return 'November';
      case '12': return 'December';
    }
  }

  getFavoritedRef() {
    return this.likedRef;
  }

  getReadedRef() {
    return this.readedRef;
  }

  getReflectionByMonth(month) {
    return this.afdb.list('/reflection', {
      query: {
        orderByChild: 'date',
        startAt: month,
        endAt: month + '\uf8ff',
        preserveSnapshot: true
      }
    });
  }

  addRefToFavorites(ref) {
    this.storage.get('LIKED_LIST').then(data => {
      data ? data = data.concat([ref]) : data = [ref];
      this.storage.set('LIKED_LIST', data).then(res => this.likedRef = res);
    });
  }

  removeRefFromFavorites(ref) {
    this.storage.get('LIKED_LIST').then(data => {
      this.like = data.indexOf(ref);
      data.splice(this.like, 1);

      this.storage.set('LIKED_LIST', data).then(res => this.likedRef = res);
    });
  }

  checkFav(rc) {
    this.state = false;

    if(this.likedRef) {
      this.likedRef.forEach(data => {
        if(data._id == rc._id) {
          this.state = true;
        }
      });
    }

    return this.state;
  }

  markAsRead(ref) {
    this.storage.get('READED_LIST').then(data => {
      data ? data = data.concat([ref]) : data = [ref];
      this.storage.set('READED_LIST', data).then(res => this.readedRef = res);
    });
  }

  markAsUnread(ref) {
    this.storage.get('READED_LIST').then(data => {
      this.read = data.indexOf(ref);
      data.splice(this.read, 1);
      this.storage.set('READED_LIST', data).then(res => this.readedRef = res);
    });
  }

  checkRead(ref) {
    this.state = false;
    if(this.readedRef) {
      this.readedRef.forEach(data => {
        if(data._id == ref._id) {
          this.state = true
        }
      });
    }
    return this.state;
  }

}
