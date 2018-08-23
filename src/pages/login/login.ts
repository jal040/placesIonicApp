import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { UserProvider } from '../../providers/user/user';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public _userProvider: UserProvider) {
  }

  loginInfo: any = {
    email: '',
    password: ''
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    console.log("Logging in!!");
    this._userProvider.loginUser(this.loginInfo).subscribe(
      (res:any) => {
        console.log(res);
        window.sessionStorage.setItem('token', res.token);
        window.sessionStorage.setItem('userId', res.userId);
      }
    )
    this.navCtrl.setRoot(TabsPage);
  }

}
