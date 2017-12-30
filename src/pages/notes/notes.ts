import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingProvider } from '../../providers/setting/setting';
import * as moment from 'moment';

/**
 * Generated class for the NotesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class NotesPage {
  rc;
  date;
  notes;
  selectedTheme;
  color;
  toggle;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public settings: SettingProvider
  ) {
    this.rc = this.navParams.data.rc;
    this.date = moment(this.rc.date).format("MMMM YYYY, DD"); 

    this.settings.getActiveTheme().subscribe( val => {
      this.selectedTheme = val;
      val === 'dark-theme' ? this.color = 'theme' : this.color = '';
    });
    this.settings.getToggle().subscribe( val => this.toggle = val );
  }

  addNotes() {
    console.log('note added! ', this.notes);
  }

  editNotes() {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotesPage', this.rc);
  }

}
