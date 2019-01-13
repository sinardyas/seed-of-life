import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReflectionProvider } from '../../providers/reflection/reflection';
@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  constructor(
    public navCtrl: NavController,
    private reflectionProvider: ReflectionProvider,
    public navParams: NavParams
  ) {}

  openCardDetail(rc){
    this.navCtrl.push('CardDetailPage', { rc });
  }
}
