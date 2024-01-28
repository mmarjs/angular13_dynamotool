import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@ Injectable()
export class GenericPageService {
    private baseUrl; // = environment.dybaseUrl;

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

    // get dtForm API response to genrate the dynamic forms
    getdtForm(): Observable< any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };
        return this._http.get(this.baseUrl + '/dt/form/get?DDName=test&CC=CD', httpOptions);
    }
    getUserColor(): Observable< any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'accept': '*/*'
            })
        };
        return this._http.get(this.baseUrl + '/dt/prefs/getcolors', httpOptions);
    }

    getMenuListByhexkey(hexkey: string): Observable< any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };
        const menuData = {
            'ddname': 'IM01',
            'appname': 'IM100',
            'hexkey': hexkey
        };
        const body = JSON.stringify(menuData);
        return this._http.get(this.baseUrl + '/dt/menu/getAppMenu?ddname=IM01&appname=IM100&hexkey=' + hexkey, httpOptions);
    }

   /* NEW REQUIREMENT  getApiresponse(api: string): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };

        return this._http.get(this.baseUrl + '/dt/util/generic/get?api=' + api, httpOptions);
        //return this._http.get(this.baseUrl + '/dt/dtform/get?DDName=EX01&CC=CD&viewID=A&hexkey=313233', httpOptions);
        //  return this._http.get('https://dev.excellware.com:8443/dt/util/generic/get?api=%2Fdtform%2Fget&cc=CD&companyname=Test%20Company&title=Test%20Title&DDName=EX01&gridID=A', httpOptions);
        // return this._http.get('https://dev.excellware.com:8443/dt/dtform/get?DDName=BOSIF&CC=AL&viewID=A&hexkey=414354494E54303031313730313039', httpOptions);
    }*/

     // get printed api throug printAppMenu API
  getPrintedAppMenu(printApi: string, seq: string, title: string): Observable< any> {
    const httpOptions = {
        headers: new HttpHeaders({
            'accept': 'application/json'
        })
    };
    return this._http.get(this.baseUrl + printApi + '&seq=' + encodeURIComponent(seq) + '&title=' + encodeURIComponent(title), httpOptions);
}

    getApiresponse(api: string): Observable< any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };

        return this._http.get(this.baseUrl + '/dt/util/generic/get?' + api, httpOptions);
       // return this._http.get(this.baseUrl + '/dt/util/generic/get?api=' + api, httpOptions);

    }
    getApiresponseValuewithToken(api: string, token): Observable< any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };
        return this._http.get(this.baseUrl + '/dt/util/generic/get?api=' + encodeURIComponent(api) + '&t=' + encodeURIComponent(token), httpOptions);
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

    menuApiCall(api): Observable< any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };
        return this._http.get(this.baseUrl + api, httpOptions);
    }

     menuApiCallbackup(api) {
        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };
        return this._http.get(this.baseUrl + api, httpOptions).toPromise();
    }


    sendData(api, data) {
        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };

       return this._http.post(this.baseUrl + api, JSON.stringify(data), httpOptions);
    }

    getDetailsByhexkey(api, hexkey): Observable< any> {

        let api_hex;
        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };
        if (api.includes('?')) {
            api_hex = '&hexkey=';
        } else {
            api_hex = '?hexkey=';
        }
        return this._http.get(this.baseUrl + api + api_hex + encodeURIComponent(hexkey), httpOptions);
    }

    DeleteByhexkey(api, hexkey): Observable< any> {
        let api_hex;
        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };
        if (api.includes('?')) {
            api_hex = '&hexkeys=';
        } else {
            api_hex = '?hexkeys=';
        }
        return this._http.get(this.baseUrl + api + api_hex + encodeURIComponent(hexkey.join()), httpOptions);
    }


}
