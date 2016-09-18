import { Injectable } from '@angular/core';
import { Http, Headers, HTTP_PROVIDERS, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import {InAppBrowser} from 'ionic-native';


/*
  Generated class for the Googleapi provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Googleapi {
data: any;
  constructor(private http: Http) {this.data = null; }

  handleAuthClick() {
    var googleurl = 'https://accounts.google.com/o/oauth2/auth'
    var response_type = 'code'
    var client_id = '503034341738-0ds10qkh99c8kmvm5n56rtfbka4953ub.apps.googleusercontent.com'
    //var nonce = ''
    var redirect_uri = 'http://localhost/callback'
    var scope = 'https://www.googleapis.com/auth/drive+https://www.googleapis.com/auth/drive.appdata+https://www.googleapis.com/auth/drive.file+https://www.googleapis.com/auth/drive.metadata+https://www.googleapis.com/auth/drive.metadata.readonly+https://www.googleapis.com/auth/drive.photos.readonly+https://www.googleapis.com/auth/drive.readonly+https://www.googleapis.com/auth/drive.scripts+https://www.googleapis.com/auth/drive+https://www.googleapis.com/auth/drive+https://www.googleapis.com/auth/drive'
    //var state = '679796850%7C0.1887974148'
    var prompt = 'consent'
    //var login_hint = ''
    //var include_granted_scopes = 'true'
    //var immediate = 'false'
    var access_type = 'offline'

    var url = googleurl + '?'
    url += 'response_type=' + response_type + '&'
    url += 'client_id=' + client_id + '&'
    url += 'redirect_uri=' + redirect_uri + '&'
    url += 'scope=' + scope + '&'
    url += 'prompt=' + prompt + '&'
    url += 'access_type=' + access_type
    var target = '_blank'
    var options = 'location=no'
    var ref = InAppBrowser.open(url, target, options);

    return new Promise(resolve => {
      ref.addEventListener('loadstart', (event) => {
        //console.log((event.url).indexOf("http://localhost/callback"));
        if ((event.url).indexOf("http://localhost/callback") === 0) {
          ref.removeEventListener("exit", (event) => { });
          var requestToken = (event.url).split("code=")[1]
          requestToken = requestToken.substring(0, requestToken.length - 1);
          ref.close();
          //this.Exchangeauthorization(client_id, requestToken);
          this.data = [client_id,requestToken];
          //console.log(client_id + '/' + requestToken)
          resolve(this.data);

        }
      })
    });//return new Promise(resolve
  }
  exchangeauthorization(client_id, requestToken){
    var link = "https://www.googleapis.com/oauth2/v4/token";
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    var code = requestToken;
    var redirect_uri = 'http://localhost/callback'
    //var client_id = client_id
    var client_secret = '5_4YGEhLx4AB98O3YC04hbJi'
    //var scope = ''
    var grant_type = 'authorization_code'
    var data = "code=" + code + "&redirect_uri=" + redirect_uri + "&client_id=" + client_id + "&client_secret=" + client_secret + "&scope=&grant_type=authorization_code"
      return new Promise(resolve => {
    this.http.post(link, data, {
      headers: headers
    }).map(res => res.json())
      .subscribe(
      data => {
        this.data = data.access_token;
      // console.log(data.access_token);
        resolve(this.data);
      },
      err => { console.log(err + 'er'); }
      );

});//return new Promise(resolve =>
  }
  googledriveSearchforFiles(Filesname,access_token){
    const endpoint = "https://www.googleapis.com/drive/v3/files?q=name%3D'"+Filesname+"'&fields=files(iconLink%2Cid%2Cname%2CthumbnailLink%2CwebViewLink)";
    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' + access_token);
      return new Promise(resolve => {

        this.http
          .get(endpoint, {
            headers: headers
          })
          .map(res => res.json())
          .subscribe(data => {
            console.log(data);
            this.data = data;
              resolve(this.data);
          });

      });//  return new Promise(resolve => {


  }
}
