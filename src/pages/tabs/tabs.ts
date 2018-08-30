import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { AccountPage } from '../account/account';
import { BookmarkedPage } from '../bookmarked/bookmarked';
import { ListPage } from '../list/list';

/**
 * Generated class for the TabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  // homeRoot = 'HomePage'
  // bookmarkedRoot = 'BookmarkedPage'
  // accountRoot = 'AccountPage'


  constructor(public navCtrl: NavController) {}

  /*The class properties of a TABS page will point to the pages 
  that you want to be able to route to.*/
  tab1Root = HomePage;

  //Make the rest!
  tab2Root = ListPage;

  tab3Root = BookmarkedPage;

  tab4Root = AccountPage;

}
