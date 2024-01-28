import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable()
export class UserServicess {
    private baseUrl;

    constructor(private _http: HttpClient, private _activeRoute: ActivatedRoute) {
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

    enableFormBtn() {
        return [{ buttonType: 'submit', isEnabled: true }];
    }

    // get default value like warehouse
    getDefaultValue(): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                accept: 'application/json',
            }),
        };

        return this._http.get(this.baseUrl + '/dt/dyuser/defaults', httpOptions);
    }
    /** ADDED function for setup,emailapi and password api */
    getsetupAPILog(url: any, width?, height?, mode?): Promise<any> {
        let param = url;
        const httpOptions = {
            headers: new HttpHeaders({
                accept: 'application/json',
            }),
            observe: 'response' as 'response',
        };
        mode = mode ? mode : 'guitest';
        localStorage.setItem('accessToken' + this._activeRoute.snapshot.queryParams.cc, '');
        return this._http
            .get(this.baseUrl + '/dt/login/setup?' + param + '&width=' + encodeURIComponent(width) + '&height=' + encodeURIComponent(height) + '&mode=' + encodeURIComponent(mode), httpOptions)
            .toPromise();
    }
}
