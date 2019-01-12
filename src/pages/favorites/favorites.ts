import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  likedRef = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  openCardDetail(rc){
    this.navCtrl.push('CardDetailPage', { rc: rc });
  }

}
