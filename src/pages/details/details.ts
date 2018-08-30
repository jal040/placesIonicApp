import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PlacesProvider } from '../../providers/places/places';
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
  bookmarked: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public _placesProvider: PlacesProvider
  ) {
    this.place = navParams.get('place');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
    console.log(this.place);
  }

  bookmark(){
    console.log("bookmarking");
    this.bookmarked = true;
    console.log(this.place);
    this._placesProvider.addToFav(this.place).subscribe(
      (res) => {
        console.log(res);
      }
    );
  }

  removeBookmark(){
    this.bookmarked = false;
    this._placesProvider.remove(this.place).subscribe(
      (res) => {
        console.log(res);
      }
    )
  }

}
