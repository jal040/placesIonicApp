import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MapProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MapProvider {

  constructor(public http: HttpClient) {
    // console.log('Hello MapProvider Provider');
  }
  
  listOfPlaces: any = [];

}
