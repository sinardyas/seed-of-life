import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReflectionProvider } from '../../providers/reflection/reflection';

/**
 * Generated class for the HistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public reflectionProvider: ReflectionProvider
  ) {
  }

  openCardDetail(rc){
    this.navCtrl.push('CardDetailPage', { rc: rc });
  }

}
