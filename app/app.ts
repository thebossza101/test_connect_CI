import { Component } from '@angular/core';
import { ionicBootstrap, Platform } from 'ionic-angular';
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
  }
}

ionicBootstrap(MyApp,[provideCloud(cloudSettings)]);
