import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading } from 'ionic-angular';

import { HomePage } from '../home/home';
import { UserProvider } from '../../providers/user/user';
import { TabsPage } from '../tabs/tabs';
import { LoadingController } from 'ionic-angular';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public _userProvider: UserProvider,
    public loadCtrl: LoadingController
  ) {
  }

  registerInfo: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  loading = this.loadCtrl.create({
    content: 'Logging in...',
    duration: 2000
  });

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
    console.log("Registering!!");
    window.sessionStorage.clear();
    this._userProvider.registerUser(this.registerInfo).subscribe(
      (res: any) => {
        console.log(res);
        window.sessionStorage.setItem('token', res.token);
        window.sessionStorage.setItem('userId', res.userId);
      }
    );
    console.log("successful register!!");
    this.registerInfo.firstName = '';
    this.registerInfo.lastName = '';
    this.registerInfo.email = '';
    this.registerInfo.password = '';
    this.loading.present()
      .then(_ => 
        this.navCtrl.setRoot(TabsPage)
      );
    
  }

}
