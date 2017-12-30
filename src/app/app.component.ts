import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { SettingProvider } from '../providers/setting/setting';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = 'HomePage';
  pages: Array<{title: string, icon:any, component: any}>;
  selectedTheme: String;
  toggle: Boolean;
  color: any;
  
  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private settings: SettingProvider,
    public storage: Storage,
    public localNotification: LocalNotifications
  ) {
    
      this.settings.getActiveTheme().subscribe( val => {
        this.selectedTheme = val;
        val === 'dark-theme' ? this.color = 'theme' : this.color = '';
      });
      this.settings.getToggle().subscribe( val => this.toggle = val );

      platform.ready().then(() => {
        statusBar.styleDefault();
        splashScreen.hide();
      });

      this.pages = [
        { title: 'Home', icon: 'home', component: 'HomePage' },
        { title: 'Calendar', icon: 'calendar', component: 'CalendarPage' },
        { title: 'Likes', icon: 'heart', component: 'FavoritesPage'},
        // { title: 'Notes', icon: 'create', component: 'NoteslistPage' },
        { title: 'Setting', icon: 'settings', component: 'SettingPage' }, 
        { title: 'Contact Us', icon: 'mail', component: 'ContactUsPage' },
        { title: 'Give', icon: 'ribbon', component: 'GivePage' }
      ];

      this.storage.get('reminder').then((val) => {
        if(val) {
          console.log("app component " + val);
        } else {
          console.log("zonk");

          var date = new Date();
          date.setDate(date.getDate());
          date.setHours(12);
          date.setMinutes(0);

          this.localNotification.schedule({
            title: 'Seed of Life',
            text: 'dont forget to take time and read your reflection :)',
            at: date,
            every: 'day'
          });
        }
      });

  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}

