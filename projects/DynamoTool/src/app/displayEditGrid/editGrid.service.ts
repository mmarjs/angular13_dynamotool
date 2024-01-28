import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@ Injectable()
export class EditGridService {
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



    getDataByHexkey(event): Observable< any> {

       let api_hex;
        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };
        if (event.url.includes('?')) {
            api_hex = '&hexkey=';
        } else  {
            api_hex = '?hexkey=';
        }
        return this._http.get(this.baseUrl + event.url + api_hex + encodeURIComponent(event.hexKey), httpOptions);

    }

    getDetailsByhexkey(api, hexkey, id): Observable< any> {
        let api_hex;
        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };
        if (api.includes('?')) {
            api_hex = '&hexkey=';
        } else  {
            api_hex = '?hexkey=';
        }

        return this._http.get(this.baseUrl + api + api_hex + encodeURIComponent(hexkey) + '&tabindex=' + encodeURIComponent(id), httpOptions);
    }
    getDetails(api): Observable< any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };
        return this._http.get(this.baseUrl + api, httpOptions);
    }
    onChangeApi(onChangeApi): Observable< any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };
        return this._http.get(this.baseUrl + onChangeApi, httpOptions);
    }

    sendData(api, data) {
        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };


       return this._http.post(this.baseUrl + api, JSON.stringify(data), httpOptions);
    }

    openFile(apicollink, value) {
    let fileApi: any;
        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };
        if (apicollink.includes('?')) {
            fileApi = '&hexkey=';
        } else  {
            fileApi = '?hexkey=';
        }
        // alert(this.baseUrl + apicollink + fileApi + value);

        return this._http.get(this.baseUrl + apicollink + fileApi + encodeURIComponent(value), httpOptions);

    }


}
