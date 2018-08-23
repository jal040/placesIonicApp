import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';

import { LoadingController } from 'ionic-angular';


/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  //AIzaSyDoB6brQbabzyzxjJd1z0I6yecUM6PA0cw

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public _userProvider: UserProvider,
    public loadCtrl: LoadingController
  ) {
  }

  user: any = {
    firstName: '',
    lastName: '',
    email: '',
    id: ''
  };


  presentLoadingDefault() {
    let loading = this.loadCtrl.create({
      content: 'Logging in...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter Homepage');
    this.presentLoadingDefault();
    this._userProvider.getUser(window.sessionStorage.getItem('userId'), window.sessionStorage.getItem('token')).subscribe(
      (res:any) => {
        console.log("USER INSIDE HOME");
        console.log(res);
        this.user.firstName = res.firstName;
        this.user.lastName = res.lastName;
        this.user.email = res.email;
        this.user.id = res.id;
      }
    );
  }

}
