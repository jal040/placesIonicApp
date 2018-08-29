import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MapProvider } from '../../providers/map/map';
import { DetailsPage } from'../details/details';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  selectedPlace: any;
  places: any = [];
  place: any = {
    name: '',
    rating: 0,
    address: ''
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public _mapProvider: MapProvider
  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.selectedPlace = navParams.get('place');
  }

  ionViewDidLoad(){
    this.loadList();
    // console.log("LIST OF PLACES: ", this.places)
  }

  loadList(){
    let len = this._mapProvider.listOfPlaces.length;
    let places1 = this._mapProvider.listOfPlaces;
    this.places = [];

    this.places = this._mapProvider.listOfPlaces.map( obj => {
      return( {
        name: obj.name,
        rating: obj.rating,
        address: obj.vicinity
      });
    })
    console.log(this.places);
    // console.log(this._mapProvider.listOfPlaces);
    // for(let i = 0; i < len; i++){
    //   this.place.name = places1[i].name;
    //   this.place.rating = places1[i].rating;
    //   this.place.address = places1[i].vicinity;
    //   this.places.push(this.place);
    //   // console.log("for loop");
    //   // console.log(this.places); 

    // }
  }

  goToPlace(event, place){
    console.log("going to place")
    console.log(place);
    this.navCtrl.push(DetailsPage, {
      place: place
    })
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
