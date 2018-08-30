import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PlacesProvider } from '../../providers/places/places';

/**
 * Generated class for the BookmarkedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookmarked',
  templateUrl: 'bookmarked.html',
})
export class BookmarkedPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public _placesProvider: PlacesProvider
  ) {
  }

  // bookmarkedPlaces: Array<any> = [
  //   {
  //     name: '',
  //     rating: 0,
  //     address: ''
  //   }
  // ];

  temp: any;

  bookmarkedPlaces: Array<any>;


  ionViewDidLoad() {
    console.log('ionViewDidLoad BookmarkedPage');
    this.getBookmarkedPlaces();
  }

  getBookmarkedPlaces(){
    this.bookmarkedPlaces = [];
    this._placesProvider.getBookmarked().subscribe(
      (res:any) => {
        console.log(res);
        this.bookmarkedPlaces = res.map( obj => {
          return( {
            name: obj.name,
            rating: obj.rating,
            address: obj.address,
            id: obj.id,
            bookmarked: true
          });
        })
      }
    );
  }

  removeBookmark(place){
    this._placesProvider.remove(place).subscribe(
      (res:any) => {
        console.log(res);
        console.log("Before");
        console.log(this.bookmarkedPlaces);
        this.bookmarkedPlaces = this.bookmarkedPlaces.filter(pl => pl.name != place.name);
        console.log("After");
        console.log(this.bookmarkedPlaces);
      }
    )
  }

  

}

// list.splice( list.indexOf('foo'), 1 );
// const result = words.filter(word => word.length > 6)