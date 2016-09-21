import { Component } from '@angular/core';
import { NavController, Platform ,NavParams, LoadingController} from 'ionic-angular';

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
  data:any;
  initializeData:any;
  //test: any = null;
  constructor(private navCtrl: NavController, private list: List, public platform: Platform,private navParams: NavParams,public loadingCtrl: LoadingController) {
    let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  loading.present();
      this.initializeItems().then(()=>loading.dismiss());
      if(navParams.get('push')){
        //console.log(navParams.get('push'))
         loading.dismiss();
        this.navCtrl.push(DetailsPage,{data:navParams.get('push')});

      }
    //console.log( this.test);
  }

initializeItems() {
  this.initializeData = this.items = this.list.get_EMPCODE_EMPDESC('').then(data => {
    if (Object.keys(data).length > 0) {
   //console.log('555');
    return data;

    } else {
      return [{ EMPCODE: 'ไม่พบข้อมูล', EMPDESC: 'ลองใหม่อีกครั้ง' }]
    }
  });
    return this.initializeData

  }

  getItems(ev: any) {
    var val = ev.target.value;
    this.items = this.initializeData;
    //console.log(val);
 this.items = this.items.then((data)=>{
   if (val && val.trim() != '') {
this.data = data;
//console.log(this.data);
return this.data = this.data.filter((item) => {
        return (item.EMPCODE.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.EMPDESC.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
//console.log(this.data);

      }else{
        this.items = this.initializeData;
      }
 })
    // set val to the value of the searchbar
    // if the value is an empty string don't filter the items


  }
  itemSelected(item){
//console.log(item);
  this.navCtrl.push(DetailsPage,{data:item});



  }
  add() {
this.navCtrl.push(AddeditlistPage,{mode:'A'});
  }





}
