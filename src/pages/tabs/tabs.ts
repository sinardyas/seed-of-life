import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingProvider } from '../../providers/setting/setting';


/**
 * Generated class for the TabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root = 'NotesPage';
  tab2Root = 'FavoritesPage';
  tab3Root = 'HistoryPage';
  selectedTheme: String;
  color: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private settings: SettingProvider
  ) {
      this.settings.getActiveTheme().subscribe( val => {
        if(val === 'dark-theme'){
          this.color = 'theme';
        } else {
          this.color = 'navbar';
        }
      });
    }
}
