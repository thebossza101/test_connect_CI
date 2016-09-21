import { Component } from '@angular/core';
import { NavController, Platform ,NavParams} from 'ionic-angular';

import { List } from '../../providers/list/list';
import { DetailsPage } from '../details/details';

import { AddeditlistPage } from '../addeditlist/addeditlist';
//details
/*
  Generated class for the ListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/list/list.html',
  providers: [List]
})
export class ListPage {
  items: any = null;
  push:any;
  //test: any = null;
  constructor(private navCtrl: NavController, private list: List, public platform: Platform,private navParams: NavParams) {
      this.initializeItems();
      if(navParams.get('push')){
        //console.log(navParams.get('push'))
        this.navCtrl.push(DetailsPage,{data:navParams.get('push')});
      }
    //console.log( this.test);
  }

  initializeItems() {
    this.items = this.list.get_EMPCODE_EMPDESC('').then(data => {
      if (Object.keys(data).length > 0) {
        return data
      } else {
        return [{ EMPCODE: 'ไม่พบข้อมูล', EMPDESC: 'ลองใหม่อีกครั้ง' }]
      }
    });
  }

  getItems(ev: any) {

    // set val to the value of the searchbar
    let val = ev.target.value;
    //console.log(val);
    // if the value is an empty string don't filter the items

    if (val && val.trim() != '') {
    this.items = this.items.filter((item) => {
      return (item.EMPCODE.toLowerCase().indexOf(val.toLowerCase()) > -1)||(item.EMPDESC.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }
      //console.log(this.items);


  }
  itemSelected(item){
//console.log(item);
  this.navCtrl.push(DetailsPage,{data:item});



  }
  add() {
this.navCtrl.push(AddeditlistPage,{mode:'A'});
  }





}
