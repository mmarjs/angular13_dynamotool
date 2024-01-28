import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@ Injectable()
export class UserPrefrenceService {
    private baseUrl;// = environment.dybaseUrl;

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

    // <--- this service using for save the user color --->
    saveUserPreference(value): Observable< any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };
        return this._http.post(this.baseUrl + '/dt/user/putColors', value, httpOptions);
    }
    getUserColorBySeesion(DtsessionID): Observable< any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'accept': '*/*'
            })
        };
        const tokenNo = {
            DTSessionID: DtsessionID
        };

        const body = JSON.stringify(tokenNo);
        return this._http.post(this.baseUrl + '/dt/user/getColors', body, httpOptions);
    }
    getUserColor(): Observable< any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'accept': '*/*'
            })
        };
        return this._http.get(this.baseUrl + '/dt/user/getColors', httpOptions);
    }
    getUserColorWithToken(token): Observable< any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'accept': '*/*'
            })
        };
        return this._http.get(this.baseUrl + '/dt/user/getColors?t=' + token, httpOptions);
    }

    SendNotifiacation(url): Observable< any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };
        const menuData = {
            'url': url
        };
        const body = JSON.stringify(menuData);
        return this._http.post(environment.notifyUrl, body, httpOptions);
    }
}
