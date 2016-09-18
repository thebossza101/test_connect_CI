import { Component } from '@angular/core';
import { NavController , LoadingController} from 'ionic-angular';
import { ListPage } from '../list/list';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
username:string;
 password:string;

  constructor(private navCtrl: NavController,private loadingCtrl: LoadingController) {

  }
  login() {

    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      //alert(this.username)
      //alert(this.password)
      loading.present();
    this.navCtrl.setRoot(ListPage);
      loading.dismiss();

       }

}
