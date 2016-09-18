import { Component } from '@angular/core';
import { NavController , LoadingController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController) {

  }
}
