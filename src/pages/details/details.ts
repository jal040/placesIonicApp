import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  place: any;
  searchItem: any;

  // if place came from search, true
  // if place came from list, false
  search: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.place = navParams.get('place');
    this.searchItem = navParams.get('searchItem');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
    console.log(this.place);

    if(this.place){
      console.log("this item is from list")
      this.search = false
    } else {
      console.log("this item is from search")
      this.search = true;
    }
  }

}
