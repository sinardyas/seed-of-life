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
  _liked = [];
  _readed = [];  

  constructor(public storage: Storage, public afdb: AngularFireDatabase) {
    this.storage.get('like').then( (data) => {
      this._liked = data;
    });

    this.storage.get('read').then( (data) => {
      this._readed = data;
    })
  }

  getMonth(month) {

    console.log("provider: " + month);
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
      return this._liked;
  }

  getReadedRef() {
    return this._readed;
  }

  getAllReflection() {
    return this.afdb.list('/reflection', { preserveSnapshot: true });
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

  getFavFromStorage(){
    this.storage.get('likedRef').then( (data) => {
      this._liked = data;
    });
  }

  isFavorited(ref){
      return this.favoritesRef.findIndex( refs => refs == ref );
  }

  addRefToFavorites(ref) {
    this.storage.get('like').then( (data) => {
      data ? data = data.concat([ref]) : data = [ref];
      this.storage.set('like', data).then( (res) => {
        this._liked = res;
      });
    });
  }

  removeRefFromFavorites(ref) {        
    this.storage.get('like').then( (data) => {
      this.like = data.indexOf(ref);
      data.splice(this.like, 1);
      this.storage.set('like', data).then( (res) => {
        this._liked = res;
      });
    });
  }

  checkFav(rc) {
    this.state = false;
    if(this._liked != null) {
      this._liked.forEach( (data) => {
        if(data._id == rc._id) this.state = true; 
      });
    } 
    return this.state;
  }

  markAsRead(ref) {
    this.storage.get('read').then( (data) => {
      data ? data = data.concat([ref]) : data = [ref];
      this.storage.set('read', data).then( (res) => {
        this._readed = res;
      });
    });
  }

  markAsUnread(ref) {
    this.storage.get('read').then( (data) => {
      this.read = data.indexOf(ref);
      data.splice(this.read, 1);
      this.storage.set('read', data).then( (res) => {
        this._readed = res;
      });
    });
  }

  checkRead(ref) {
    this.state = false;
    if(this._readed != null) {
      this._readed.forEach( (data) => {
        if(data._id == ref._id) this.state = true; 
      });
    } 
    return this.state;
  }

}
