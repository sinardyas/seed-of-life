import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReflectionProvider } from '../../providers/reflection/reflection';

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  likedRef = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private reflectionProvider: ReflectionProvider
  ) {}

  openCardDetail(rc){
    this.navCtrl.push('CardDetailPage', { rc: rc });
  }

}
