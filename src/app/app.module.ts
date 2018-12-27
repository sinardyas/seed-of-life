import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Clipboard } from '@ionic-native/clipboard';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MyApp } from './app.component';
import { FIREBASE_CREDENTIALS } from './firebase.credential';
import { SettingProvider } from '../providers/setting/setting';
import { ReflectionProvider } from '../providers/reflection/reflection';
import { NoteProvider } from '../providers/note/note';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      menuType: 'push', 
      tabsHideOnSubPages: true
    }),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Clipboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SettingProvider,
    ReflectionProvider,
    NoteProvider,
    SocialSharing,
    LocalNotifications,
    BackgroundMode
  ]
})
export class AppModule {}
