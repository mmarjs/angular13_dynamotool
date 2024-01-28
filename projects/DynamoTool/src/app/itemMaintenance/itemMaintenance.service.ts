import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ItemMaintenanceService {
    private baseUrl;// = environment.dybaseUrl;

    constructor(private _http: HttpClient) {
        if (window.location.hostname === 'localhost') {
            this.baseUrl = environment.dybaseUrl;
        } else {
            if (window.location.protocol.includes('s')) {
                this.baseUrl = window.location.origin + environment.httpsPort; //  8443
            } else {
                this.baseUrl = window.location.origin + environment.httpPort; //8888
            }
        }
    }

    getItemGridListBySeesion(DtsessionID): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            }), withCredentials: true,
        };
        const tokenNo = {
            DTSessionID: DtsessionID
        };
        const body = JSON.stringify(tokenNo);
        return this._http.post(this.baseUrl + '/dt/menu/guiMenu/maintenance', body, httpOptions);
    }

    // get item list throug get API by search code
    getItemGridList(): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            }), withCredentials: true,
        };
        return this._http.get(this.baseUrl + '/dt/menu/guiMenu/maintenance', httpOptions);
    }

    // get item list throug get API by search code
    getItemGridListUsingToken(token): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            }), withCredentials: true,
        };
        return this._http.get(this.baseUrl + '/dt/menu/guiMenu/maintenance?t=' + token, httpOptions);
    }

    // get selected item menu list throug getAppMenu API by search code
    getMenuListByhexkey(hexkey: string): Observable<any> {
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
        return this._http.post(this.baseUrl + '/CD/dtmenu/getAppMenu', body, httpOptions);
    }
    menuNext(menuData, checkBoxApi): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };

        return this._http.post(this.baseUrl + checkBoxApi, JSON.stringify(menuData), httpOptions);
    }
    reportDelete(checkList, checkBoxApi): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };

        return this._http.post(this.baseUrl + checkBoxApi, JSON.stringify(checkList), httpOptions);
    }

    dataPost(dataListList, DataApi): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };

        return this._http.post(this.baseUrl + DataApi, JSON.stringify(dataListList), httpOptions);
    }

    getNodeEdit(nodeApi, id): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };
        return this._http.get(this.baseUrl + nodeApi + '?id=' + id, httpOptions);
    }
    getMenuEdit(nodeApi, id): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            })
        };
        return this._http.get(this.baseUrl + nodeApi + '&hexkey=' + encodeURIComponent(id), httpOptions);
    }
    getMenuTree(): Observable<any> {
        return this._http.get('http://localhost:53040/api/employees/GetMenuTree');
    }
    nodeMoved(body): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this._http.post('http://localhost:53040/api/employees/NodeMoved', body, httpOptions);
    }
    nodeCreated(body): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this._http.post('http://localhost:53040/api/employees/NodeCreated', body, httpOptions);
    }
    nodeRenamed(body): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this._http.post('http://localhost:53040/api/employees/NodeRenamed', body, httpOptions);
    }
    nodeRemoved(body): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this._http.post('http://localhost:53040/api/employees/NodeRemoved', body, httpOptions);
    }


    // get item list throug get API by search code
    getItemInquiryPerpage(url: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'accept': 'application/json'
            }), withCredentials: true,
        };
        return this._http.get(this.baseUrl + url, httpOptions);
    }
}
