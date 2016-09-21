import { Component } from '@angular/core';
import { NavController, Platform ,NavParams, LoadingController,Storage, SqlStorage} from 'ionic-angular';

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
  sql: Storage;
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

    //sql
    //this.insert_sql();
  }
initializeItems() {
  this.initializeData = this.list.get_EMPCODE_EMPDESC('').then(data => {
  //  console.log(data);
 this.insert_sql(data);
 return data;
  }).catch((er)=>{
    //console.log( this.getsql() );

      return this.getsql();
  });
this.items = this.initializeData;
    return this.initializeData

  }
  getsql(){
    this.sql = new Storage(SqlStorage,{name: 'smf_hit'});//เลือกฐานข้อมูล
    return this.sql.query("SELECT * FROM SMEMPL").then((data)=>{
//console.log(data.res.rows.item(0).name);
    //console.log(data.res.rows.item(0).price);

    if (data.res.rows.length > 0) {

     var newitems = [];

    //วนลูปจากแถวในตาราง และ push เข้า array

    for (let i = 0; i < data.res.rows.length; i++) {

    newitems.push({

    EMPCODE: data.res.rows.item(i).EMPCODE,

    EMPDESC: data.res.rows.item(i).EMPDESC

    });

    }
    return newitems;

    }

    });


  }
  insert_sql(data){

  this.sql = new Storage(SqlStorage,{name: 'smf_hit'});//เลือกฐานข้อมูล

  data.forEach(data => {
    var data_sql = data;
    this.sql.query("SELECT EMPCODE FROM SMEMPL WHERE EMPCODE = '"+data.EMPCODE+"'").then((data)=>{
          if (data.res.rows.length <= 0) {
              this.sql.query("INSERT INTO SMEMPL (EMPCODE,EMPDESC) VALUES ('"+data_sql.EMPCODE+"','"+data_sql.EMPDESC+"')");
        }

    });


  });
  //  this.sql = new Storage(SqlStorage,{name: 'smf_hit'});//เลือกฐานข้อมูล
  //  this.sql.query("INSERT INTO foods (EMPCODE,EMPDESC) VALUES ('ข้าวผัด',100)");
  //  this.sql.query("INSERT INTO foods (name,price) VALUES ('ข้าวกระเพราหม',300)");
  //  this.sql.query("INSERT INTO foods (name,price) VALUES ('ยํารวมมิตร',200)");

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
        return (item.EMPCODE.toLowerCase().indexOf(val.toLowerCase()) > -1);
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
