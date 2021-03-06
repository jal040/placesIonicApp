import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  // url: string = 'http://localhost:3000/api/appUsers?access_token=yfNiTPxCHAGFHbHPiG2iFlhJDLRfIhHRxFbtHQLxOzZp3Vca2Ogf8s07f2KHHMTr'

  url: string = 'http://localhost:3000/api/appUsers';

  registerUser(user){
    console.log("registering in service. about to call post method");
    return this.http.post(this.url, user);
  };

  loginUser(user){
    console.log("loggin in user in service");
    return this.http.post(this.url + '/login', user);
  };

  logoutUser(token) {
    return this.http.post(this.url +'/logout' + '?access_token=' + token, {});
  };

  getUser(id, token) {
    return this.http.get(this.url + '/' + id + '?access_token=' + token );
  };

}
