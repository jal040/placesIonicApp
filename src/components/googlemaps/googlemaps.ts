import { Component, NgZone, ElementRef, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';
import { googlemaps } from 'googlemaps';

/**
 * Generated class for the GooglemapsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'googlemaps',
  templateUrl: 'googlemaps.html'
})
export class GooglemapsComponent {


  @ViewChild('map') mapElement: ElementRef;
  map:any;
  latLng:any;
  markers:any;
  mapOptions:any;  
  isKM:any=500;
  isType:any="";
 
  constructor(private ngZone: NgZone, private geolocation : Geolocation) { }

  text: string;


  ionViewDidLoad() {
    this.loadMap();
  }
  loadMap(){
    this.geolocation.getCurrentPosition().then((position) => {
this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          console.log('latLng',this.latLng);
     
      this.mapOptions = {
        center: this.latLng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }   
this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
    }, (err) => {
      alert('err '+err);
    });
  }


}
