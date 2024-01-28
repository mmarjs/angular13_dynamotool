import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@ Injectable()
export class UserServicess {

    private baseUrl;


    constructor(private _http: HttpClient, private _activeRoute: ActivatedRoute) {
        if (window.location.hostname === 'localhost') {
      this.baseUrl = environment.baseUrl + environment.httpsPort;

        } else {
            if (window.location.protocol.includes('s')) {
                this.baseUrl = window.location.origin + environment.httpsPort; //  8443
            } else {
                this.baseUrl = window.location.origin + environment.httpPort; // 8888
            }
        }
    }
    getDetails(userdata, api): Observable< any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            observe: 'response' as 'response',
        };

        return this._http.post(this.baseUrl + api, JSON.stringify(userdata), httpOptions);
    }

    forgotpassword(url): Observable< any> {
        const httoptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            }), withCredentials: true,
        };
      
        return this._http.get(this.baseUrl + url, httoptions);
    }
    // forgotpassword(cc, email, url,id): Observable< any> {
    //     const httoptions = {
    //         headers: new HttpHeaders({
    //             'accept': 'application/json'
    //         }), withCredentials: true,
    //     };
      
    //     return this._http.get(this.baseUrl + url + 	'?cc=' + cc + '&email=' + email + '&id=Echetu' +id , httoptions);
    // }


    enableFormBtn() {
        return [{ 'buttonType': 'button', 'isEnabled': true }];
      }
      enableFormBtn2() {
        return [{ 'buttonType': 'submit', 'isEnabled': true }];
      }

}
