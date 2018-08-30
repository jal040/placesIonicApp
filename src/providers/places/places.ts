import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PlacesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlacesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PlacesProvider Provider');
  }

  url: string = "http://localhost:3000/api/places";

  addToFav(place){
    console.log("Bookmarking");
    let token = window.sessionStorage.getItem('token');
    console.log(token);
    return this.http.post(this.url + "?access_token=" + token, place);
  }

  getBookmarked(){
    let token = window.sessionStorage.getItem('token');
    return this.http.get(this.url + "?access_token=" + token);
  }

  remove(place){
    // http://localhost:3000/api/places/5b874ef2f93452c477d1e280?access_token=H2pIS2OjbCL3jNOOmk7z6AVLngOiVFBQOD0pijQssCxuvlnl2LFTWYSSi8QkR0KN
    let token = window.sessionStorage.getItem('token');
    return this.http.delete(this.url + '/' + place.id + "?access_token=" + token )
  }

}
