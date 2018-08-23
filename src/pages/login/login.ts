import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { UserProvider } from '../../providers/user/user';
import { TabsPage } from '../tabs/tabs';
import { LoadingController } from 'ionic-angular';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public _userProvider: UserProvider,
    public loadCtrl: LoadingController
  ) {
  }

  loginInfo: any = {
    email: '',
    password: ''
  }

  // presentLoadingDefault() {
  //   let loading = this.loadCtrl.create({
  //     content: 'Logging in...'
  //   });
  
  //   loading.present();
  
  //   setTimeout(() => {
  //     loading.dismiss();
  //   }, 2000);
  // }
  loading = this.loadCtrl.create({
    content: 'Logging in...',
    duration: 2000
  });

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
    this.loading.present()
      .then(_ =>
        this.navCtrl.setRoot(TabsPage)
      );
    
  }

}
