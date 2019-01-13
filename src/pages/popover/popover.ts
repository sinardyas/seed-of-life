import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, ToastController, NavController  } from 'ionic-angular';
import { ReflectionProvider } from '../../providers/reflection/reflection';
import { Clipboard } from '@ionic-native/clipboard';
import { SocialSharing } from '@ionic-native/social-sharing';


@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html'
})
export class PopoverPage {
  rc;

  constructor(
    public viewController: ViewController,
    public navParams: NavParams,
    public reflectionProdiver: ReflectionProvider,
    public clipboard: Clipboard,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public socialSharing: SocialSharing
  ) {
    this.rc = navParams.data.rc;
  }

  like() {
    let toast = this.toastCtrl.create({
      message: 'Liked!',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
    this.reflectionProdiver.addRefToFavorites(this.rc);
  }

  checkFav() {
    return this.reflectionProdiver.checkFav(this.rc);
  }

  copyToClipboard() {
    this.clipboard.copy(this.rc.title + '\n\n' + this.rc.body.replace(/<\/?[^>]+>/gi, ""));

    let toast = this.toastCtrl.create({
      message: 'Copied to Clipboard!',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  openNotesPage(rc) {
    this.navCtrl.push('NotesPage', { rc });
  }

  share() {
    this.socialSharing.share(this.rc.title + '\n\n' + this.rc.body.replace(/<\/?[^>]+>/gi, ""));
  }

}
