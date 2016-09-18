import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

import { List } from '../../providers/list/list';
import { Googleapi } from '../../providers/googleapi/googleapi';
import {InAppBrowser} from 'ionic-native';

import { ListPage } from '../list/list';
import { AddeditlistPage } from '../addeditlist/addeditlist';


/*
  Generated class for the DetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/details/details.html',
  providers: [List, Googleapi]
})
export class DetailsPage {
  hidden_PDF: boolean
  data: any = null;
  items: any = {
    EMPCODE: 'no results',
    EMPDESC: 'no results',
    CUSTCODE: 'no results',
    VENDCODE: 'no results',
    POSITION: 'no results',
    CTCADR1: 'no results',
    CTCADR2: 'no results',
    EMAIL: 'no results'

  }
  EMPCODE: string
  constructor(private navCtrl: NavController, private navParams: NavParams, private list: List, private googleapi: Googleapi, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.EMPCODE = navParams.get('data').EMPCODE;
    //console.log(navParams.get('data'));
    this.initializeItems(this.EMPCODE)
  }
  initializeItems(EMPCODE) {
    this.list.get_detials(EMPCODE).then(data => {
      if (Object.keys(data).length > 0) {
        //console.log(data[0]);
        //return data[0]
        this.pushitems(data[0]);

      } else {
        //return [{ EMPCODE: 'ไม่พบข้อมูล', EMPDESC: 'ลองใหม่อีกครั้ง' }]
      }
    });
    //console.log(this.items);

  }
  pushitems(items) {
    if (items.EMPCODE) {
      this.items.EMPCODE = items.EMPCODE;
    }
    if (items.EMPDESC) {
      this.items.EMPDESC = items.EMPDESC;
    }
    if (items.CUSTCODE) {
      this.items.CUSTCODE = items.CUSTCODE;
    }
    if (items.VENDCODE) {
      this.items.VENDCODE = items.VENDCODE;
    }
    if (items.POSITION) {
      this.items.POSITION = items.POSITION;
    }
    if (items.CTCADR1) {
      this.items.CTCADR1 = items.CTCADR1;
    }
    if (items.CTCADR2) {
      this.items.CTCADR2 = items.CTCADR2;
    }else{
      this.hidden_PDF = true
    }
    if (items.EMAIL) {
      this.items.EMAIL = items.EMAIL;
    }

  }
  ViewPDF(CTCADR2) {
    //console.log(CTCADR2);
    this.googleapi.handleAuthClick().then(data => {


      //console.log( data[0] + data[1] )
      this.googleapi.exchangeauthorization(data[0], data[1]).then(data => {
        var Filesname = CTCADR2;
        //console.log( data )
        this.googleapi.googledriveSearchforFiles(Filesname, data).then(data => {
          this.data = data;


          var url = this.data.files[0].webViewLink;
          var target = '_blank'
          var options = 'location=no'
          var ref = InAppBrowser.open(url, target, options);
        });

      });//this.googleapi.exchangeauthorization


    });//this.googleapi.handleAuthClick()
    //this.googleapi.exchangeauthorization(this.data.client_id, this.data.requestToken).then(res=>{this.data = res;});


  }


  delete(EMPCODE) {

    let confirm = this.alertCtrl.create({
      title: 'คุณต้องการลบหรือไม่',
      message: 'คุณต้องการลบข้อมูล EMPCODE :' + EMPCODE + "?",
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.list.delete_EMPCODE(EMPCODE).then(res => {

              if (res == true) {
                const toast = this.toastCtrl.create({
                  message: 'ลบสำเร็จ',
                  showCloseButton: true,
                  closeButtonText: 'Ok'
                });
                toast.present();
                this.navCtrl.setRoot(ListPage);
              }

            });
          }
        }
      ]
    });
    confirm.present();
  }

  add() {


this.navCtrl.push(AddeditlistPage,{mode:'A'});
  }
  edit(items){
this.navCtrl.push(AddeditlistPage,{mode:'E',data:items});
  }
}
