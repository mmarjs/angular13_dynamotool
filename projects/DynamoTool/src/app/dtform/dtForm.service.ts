import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@ Injectable()
export class DTFormService {
    private baseUrl;
    staticRes: any;
    // let staticRes: any[]=[];
    constructor(private _http: HttpClient) {
        if (window.location.hostname === 'localhost') {
            this.baseUrl = environment.dybaseUrl;
        } else {
            if (window.location.protocol.includes('s')) {
                this.baseUrl = window.location.origin + environment.httpsPort; //  8443
            } else {
                this.baseUrl = window.location.origin + environment.httpPort; // 8888
            }
        }
    }
    get windowRef() {
        return window;
      }

    // get dtForm API response to genrate the dynamic forms
    getdtForm(): Observable< any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };
        return this._http.get(this.baseUrl + '/dt/form/get?DDName=test&CC=CD', httpOptions);
        // return this._http.get(this.baseUrl + '%2Fdtform%2Fget&cc=CD&companyname=Test%20Company&title=Test%20Title&DDName=EX01&gridID=A')
    }

    getExpainderDetails(api)
      {
         const httpOptions = {
             headers: new HttpHeaders({
                 'accept': 'application/json'
             })
         };

         return this._http.get(this.baseUrl + api, httpOptions);
      }


    onChangeApi(onChangeApi): Observable< any> {
       // alert('oncah');
        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };
        return this._http.get(this.baseUrl + onChangeApi, httpOptions);
    }

    getDataByHexkey(event): Observable< any> {

        let hexkey; let url;
        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };
        if (event.url.includes('?')) {
            hexkey = '&hexkey=';
        } else {
            hexkey = '?hexkey=';
        }
        url = this.baseUrl + event.url + hexkey + encodeURIComponent(event.hexKey);

        return this._http.get(url, httpOptions);


    }

    getDetailsByhexkey(api, hexkey): Observable< any> {
        let api_hex;
        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };
        // 15 Nov
        if (api.includes('?')) {
            api_hex = '&hexkey=';
        } else {
            api_hex = '?hexkey=';
        }
        return this._http.get(this.baseUrl + api + api_hex + hexkey, httpOptions);

    }
    getDetails(api): Observable< any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };
        return this._http.get(this.baseUrl + api, httpOptions);
    }

    saveItemNotepad(ItemVaule: string, hexkey: string, filename: string, saveapi: string): Observable< any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };
        const menuData = {
            'filename': filename,
            'hexkey': hexkey,
            'htmledit': ItemVaule
        };
        return this._http.post(this.baseUrl + saveapi, menuData, httpOptions);
    }
    uploadFile(fileData, api, searchPhrase): Observable< any> {

        const httpOptions = {
            headers: new HttpHeaders({

            })
        };

        const fileDataNew = {
            'fileData': fileData,
            'searchPhrase': searchPhrase
        };

        return this._http.post(this.baseUrl + api, fileDataNew, httpOptions);
    }

    sendData(menuData, formapi): Observable< any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };

        return this._http.post(this.baseUrl + formapi, JSON.stringify(menuData), httpOptions);
    }

    getStaticData() {

    }


}
