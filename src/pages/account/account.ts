import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';
import { TabsPage } from '../tabs/tabs';
import { WelcomePage } from '../welcome/welcome';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public _userProvider: UserProvider, public _app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  logout(){
    console.log("logging out");
    this._userProvider.logoutUser(window.sessionStorage.getItem('token'));
    window.sessionStorage.clear();
    localStorage.removeItem("userId");
    this._app.getRootNav().setRoot(WelcomePage);
    // this.navCtrl.setRoot(WelcomePage);
  }

}
