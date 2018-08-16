import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { UserProvider } from '../../providers/user/user';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public _userProvider: UserProvider) {
  }

  registerInfo: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
    console.log("Registering!!");
    this._userProvider.registerUser(this.registerInfo);
    console.log("successful register!!");
    this.registerInfo.firstName = '';
    this.registerInfo.lastName = '';
    this.registerInfo.email = '';
    this.registerInfo.password = '';
    this.navCtrl.setRoot(TabsPage);
  }

}
