import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';



@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    token: string = '';
    companyCode: string = '';
    tokenQueryString: string = '';
    constructor(private _activeRoute: ActivatedRoute) {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with token if available

        this.companyCode = this._activeRoute.snapshot.queryParams.cc;
        this.tokenQueryString = this._activeRoute.snapshot.queryParams.t;
        if (this.companyCode !== undefined && this.companyCode !== '' && this.companyCode !== null) {
            this.token = localStorage.getItem('accessToken' + this.companyCode);
        }

        if (this.token !== '' && this.token !== undefined && this.token !== null && this.tokenQueryString == undefined) {

            request = request.clone({
                setHeaders: {
                    Authorization: this.token
                }
            });

        }
        else if (this.tokenQueryString !== undefined && this.tokenQueryString !== null && this.tokenQueryString !== '') {
            // add bearer token fom query string

            request = request.clone({
                setHeaders: {

                    Authorization: `Bearer ${this.tokenQueryString}`
                }
            });
        }
        return next.handle(request);
    }
}
