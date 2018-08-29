import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';
import { MapProvider } from '../../providers/map/map';

import { LoadingController } from 'ionic-angular';
import { GoogleMaps, Marker } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { DetailsPage } from '../details/details';


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

  user: any = {
    firstName: '',
    lastName: '',
    email: '',
    id: ''
  };

  query: string;

  @ViewChild('map') mapElement;
  map: any;
  lat: any;
  lng: any;
  latLng: any;
  markers: any = [];

  GoogleAutocomplete: any;
  autocomplete: any;
  autocompleteItems: any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public _userProvider: UserProvider,
    public _mapProvider: MapProvider,
    public loadCtrl: LoadingController,
    public geo: Geolocation,
    private zone: NgZone
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    
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

    this.initMap();

    // this.loading.present()
    // .then(_ => {
    //   this.navCtrl.setRoot(TabsPage)
    // }).catch((e) => {
    //   console.log('error: ', e);
    // });
  }

  initMap(){
    console.log("map");

    this.geo.getCurrentPosition().then( (position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;

      this.latLng = new google.maps.LatLng(this.lat, this.lng);

      let mapOptions = {
        center: this.latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      let marker = new google.maps.Marker({
        map: this.map,
        draggable: true,
        animation: google.maps.Animation.BOUNCE,
        position: {lat: this.lat, lng: this.lng}
      });

      let infowindow = new google.maps.InfoWindow({
        content: 'Your current location'
      })

      marker.addListener('click', function() {
        infowindow.setContent("Your current location");
        infowindow.open(this.map, marker);
      });

      this.findNearbyPlaces();

    }, (err) => {
      console.log(err);
    });
  };


  findNearbyPlaces(){
    // console.log("finding nearby places");
    this.markers = [];
    let service = new google.maps.places.PlacesService(this.map);
    service.nearbySearch({
      location: this.latLng,
      radius: 500,
      type: ''
    }, (results, status) => {
      this.callback(results, status);
    })
  }

  callback(results, status){
    // console.log("in callback")
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++){
        // console.log("marker: ", results[i]);
        this.markers.push(results[i]);
        this.createMarker(results[i]);
      }
    }
    this._mapProvider.listOfPlaces = this.markers;
    console.log("List of places in Map provider: ");
    console.log( this._mapProvider.listOfPlaces);
  }


  createMarker(place){
    let placeLocation = place.geometry.location;
    // console.log("PLACE LOCATION: ", placeLocation);

    let marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location
    });

    let infowindow = new google.maps.InfoWindow();

    marker.addListener('click', function() {
      console.log("inside marker");
      console.log(place.name);
      infowindow.setContent(place.name);
      infowindow.open(this.map, marker);
    });
  }


  updateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }

  selectSearchResult(searchItem){
    console.log(searchItem);
    this.navCtrl.push(DetailsPage, {
      searchItem: searchItem
    })
  }

}
