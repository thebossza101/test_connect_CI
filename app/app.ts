import { Component } from '@angular/core';
import { ionicBootstrap, Platform,Storage, SqlStorage} from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { LoginPage } from './pages/login/login';

import {provideCloud, CloudSettings,  Push, PushToken} from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '0b3a88f5',
  },
  'push': {
    'sender_id': '493836334159',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = LoginPage;
  sql: Storage;
  constructor(public platform: Platform,public push: Push) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
     this.push.register().then((t: PushToken) => {
    return this.push.saveToken(t);
  }).then((t: PushToken) => {
    console.log('Token saved:', t.token);
  });

  this.push.rx.notification()
  .subscribe((msg) => {
    alert(msg.title + ': ' + msg.text);

  });


      StatusBar.styleDefault();
    });

    this.createDB();
  }
  createDB(){


    //สร้างฐานข้อมูลใหม่ ชือว่า mydb

this.sql = new Storage(SqlStorage,{name: 'smf_hit'});

//สร้างตาราง ชือว่า foods ประกอบด้วย id (auto) , name, price

this.sql.query('CREATE TABLE IF NOT EXISTS SMEMPL (id INTEGER PRIMARY KEY AUTOINCREMENT, EMPCODE TEXT, EMPDESC TEXT)');
  }
}

ionicBootstrap(MyApp,[provideCloud(cloudSettings)]);
