import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

@ Injectable()

export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(private router: Router, private _activeRoute: ActivatedRoute) {
    }
    setmessage: any;
    intercept(request: HttpRequest< any>, next: HttpHandler): Observable< HttpEvent< any>> {

        return next.handle(request).pipe(
            catchError(err => {
              if (err instanceof HttpErrorResponse) {
                  
                if (err.status === 401) { // 405 method not allowed

                   setTimeout(() => {
                    this.router.navigate(['login'], {
                        queryParams: { cc: sessionStorage.getItem('cc' + this._activeRoute.snapshot.queryParams.cc) }
                    });
                   }, 500);

                    // Invalidate user session and redirect to login/home
                }
                /*  else if (err.status === 503) {
                   alert(err.error.message);
                }  */
                 

                // return the error back to the caller
                return throwError(err);
              }
            }),
            finalize(() => {
              // any cleanup or final activities

            })
          );
      }
}
