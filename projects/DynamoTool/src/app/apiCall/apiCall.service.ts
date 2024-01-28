import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@ Injectable()
export class ApiCallService {
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


    getApiresponse(api: string): Observable< any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };

        // alert(api);
        return this._http.get(api, httpOptions);


    }
    /** added 7 march */
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
    menuApiCall(api): Observable< any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };
        return this._http.get(this.baseUrl + api, httpOptions);
    }

    // added 6 march

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

    uploadFile(fileData, api): Observable< any> {

        const httpOptions = {
            headers: new HttpHeaders({

            })
        };

        return this._http.post(this.baseUrl + api, fileData, httpOptions);
    }

}
