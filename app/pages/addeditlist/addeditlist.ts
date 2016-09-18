import { Component } from '@angular/core';
import { NavController, NavParams, Alert, ToastController} from 'ionic-angular';
import { List } from '../../providers/list/list';
import { ListPage } from '../list/list';
/*
  Generated class for the AddeditlistPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/addeditlist/addeditlist.html',
  providers: [List]
})
export class AddeditlistPage {
  mode: string
  title: string
  EMPCODE: string
  EMPDESC: string
  CUSTCODE: string
  VENDCODE: string
  POSITION: string
  CTCADR1: string
  CTCADR2: string
  EMAIL: string
  MSG_EMPCODE: string
  MSG_CTCADR2: string
  icon_EMPCODE: boolean
  icon_CTCADR2: boolean
  data:any
  disabled_EMPCODE: boolean
  constructor(private navCtrl: NavController, private navParams: NavParams, public toastCtrl: ToastController,private list: List) {
    this.mode = navParams.get('mode');
    if (this.mode == 'A') {
      this.title = 'Add Data System';
      this.icon_EMPCODE = true;
      this.icon_CTCADR2 = true;
      this.disabled_EMPCODE = false;
    } else {
      this.icon_EMPCODE = true;
      this.icon_CTCADR2 = true;
      this.title = 'Edit Data System';
      this.data = navParams.get('data');
      this.EMPCODE = this.data.EMPCODE;
      this.EMPDESC = this.data.EMPDESC;
      this.CUSTCODE = this.data.CUSTCODE;
      this.VENDCODE = this.data.VENDCODE;
      this.POSITION = this.data.POSITION;
      this.CTCADR1 = this.data.CTCADR1;
      this.CTCADR2 = this.data.CTCADR2;
      this.EMAIL = this.data.EMAIL;
      this.disabled_EMPCODE = true;
    }

  }
  Saveclick(EMPCODE, EMPDESC, CUSTCODE, VENDCODE, POSITION, CTCADR1, CTCADR2, EMAIL) {
    this.icon_EMPCODE = true;
    this.icon_CTCADR2 = true;
    if (!EMPCODE) {
      this.MSG_EMPCODE = 'โปรดใส่ EMPCODE';
      this.icon_EMPCODE = false
      return
    }
    if (!EMPDESC || EMPDESC == 'no results') {
      EMPDESC = null;
    }
    if (!CUSTCODE || CUSTCODE == 'no results') {
      CUSTCODE = null;
    }
    if (!VENDCODE || VENDCODE == 'no results') {
      VENDCODE = null;
    }
    if (!POSITION || POSITION == 'no results') {
      POSITION = null;
    }
    if (!CTCADR1 || CTCADR1 == 'no results') {
      CTCADR1 = null;
    }
    if (!POSITION || POSITION == 'no results') {
      POSITION = null;
    }
    if (!EMAIL || EMAIL == 'no results') {
      EMAIL = null;
    }
    if (!CTCADR2 || CTCADR2 == 'no results') {
      this.MSG_CTCADR2 = 'โปรดใส่ CTCADR2';
      this.icon_CTCADR2 = false
      return
    }
    if (this.mode == 'A') {
      this.add_data(EMPCODE, EMPDESC, CUSTCODE, VENDCODE, POSITION, CTCADR1, CTCADR2, EMAIL);
    }
    if (this.mode == 'E') {
      this.edit_data(EMPCODE, EMPDESC, CUSTCODE, VENDCODE, POSITION, CTCADR1, CTCADR2, EMAIL);
    }


  }

  add_data(EMPCODE, EMPDESC, CUSTCODE, VENDCODE, POSITION, CTCADR1, CTCADR2, EMAIL) {
        this.list.get_detials(EMPCODE).then(data=>{
        if(Object.keys(data).length > 0){
          this.MSG_EMPCODE = 'EMPCODE ถูกใช้งานแล้ว';
          this.icon_EMPCODE = false
        }else{
          var GROUPID = null;
          this.list.insert(EMPCODE, EMPDESC, CUSTCODE, VENDCODE, POSITION, CTCADR1, CTCADR2, EMAIL, GROUPID).then(data=>{
            var msg = 'Add Successful';
            this.showToastWithCloseButton(msg)
            this.navCtrl.setRoot(ListPage,{push:{EMPCODE:EMPCODE,EMPDESC:EMPDESC}});
          },(er)=>{console.log(er)});
        }
      },(er)=>{console.log(er)})

  }
  edit_data(EMPCODE, EMPDESC, CUSTCODE, VENDCODE, POSITION, CTCADR1, CTCADR2, EMAIL){

      var GROUPID = null;
      this.list.edit(EMPCODE, EMPDESC, CUSTCODE, VENDCODE, POSITION, CTCADR1, CTCADR2, EMAIL, GROUPID).then(data=>{
        var msg = 'Edit Successful';
        this.showToastWithCloseButton(msg)
        this.navCtrl.setRoot(ListPage,{push:{EMPCODE:EMPCODE,EMPDESC:EMPDESC}});
      },(er)=>{console.log(er)});


  }
  showToastWithCloseButton(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }
}
