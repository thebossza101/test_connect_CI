import { Injectable } from '@angular/core';
import {  Http, Headers, HTTP_PROVIDERS, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the List provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class List {
  data: any;
  constructor(private http: Http) {
    this.data = null;
  }

  get_EMPCODE_EMPDESC(text) {
    //alert(text)
    const endpoint = 'http://www.072serv.com/etracking/index.php/testapp/get_EMPCODE_EMPDESC/';
    let data = { text: text }
    return this.post_data(endpoint, data);

  }
  get_detials(EMPCODE) {
    //alert(text)
    const endpoint = 'http://www.072serv.com/etracking/index.php/testapp/get_EMPCODE_detial/';
    let data = { EMPCODE: EMPCODE }
    return this.post_data(endpoint, data);
  }
  post_data(endpoint, data) {
    //alert(text)
    //  const endpoint = 'http://www.072serv.com/etracking/index.php/testapp/get_EMPCODE_EMPDESC/';
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    //  if (this.data) {
    // already loaded da
    //    return Promise.resolve(this.data);

    //  }
    // don't have the data ye
    return new Promise((resolve,reject) => {

      const body = new URLSearchParams();
      Object.keys(data).forEach(key => {
        body.set(key, data[key]);
      });

      //body.set('text', text);
      //console.log(data);

      // We're using Angular Http provider to request the da,

      // then on the response it'll map the JSON data to a parsed JS ject.

      // Next we process the data and resolve the promise with thnew data.
    //  console.log(body.toString())
      this.http.post(endpoint, body.toString(), { headers: headers })

        .map(res => res.json())

        .subscribe(data => {

          // we've got back the raw data, now generate the core schedu data

          // and save the data for ter reference
            //console.log(data);
          this.data = data;

          resolve(this.data);

        },(er)=>{
          reject(er);});

    });


  }
  delete_EMPCODE(EMPCODE) {

    const endpoint = 'http://www.072serv.com/etracking/index.php/testapp/delete_EMPCODE/';
    let data = { text: EMPCODE }
    return this.post_data(endpoint, data);

  }
  insert(EMPCODE, EMPDESC, CUSTCODE, VENDCODE, POSITION, CTCADR1, CTCADR2, EMAIL, GROUPID) {
    //alert(text)
    const endpoint = 'http://www.072serv.com/etracking/index.php/testapp/insert/';
    let data = {
      EMPCODE: EMPCODE,
      EMPDESC: EMPDESC,
      CUSTCODE: CUSTCODE,
      VENDCODE: VENDCODE,
      POSITION: POSITION,
      CTCADR1: CTCADR1,
      CTCADR2: CTCADR2,
      EMAIL: EMAIL,
      GROUPID: GROUPID
    }
    return this.post_data(endpoint, data);
  }
  edit(EMPCODE, EMPDESC, CUSTCODE, VENDCODE, POSITION, CTCADR1, CTCADR2, EMAIL, GROUPID) {
    //alert(text)
    const endpoint = 'http://www.072serv.com/etracking/index.php/testapp/edit/';
    let data = {
      EMPCODE: EMPCODE,
      EMPDESC: EMPDESC,
      CUSTCODE: CUSTCODE,
      VENDCODE: VENDCODE,
      POSITION: POSITION,
      CTCADR1: CTCADR1,
      CTCADR2: CTCADR2,
      EMAIL: EMAIL,
      GROUPID: GROUPID
    }
    return this.post_data(endpoint, data);
  }





}
