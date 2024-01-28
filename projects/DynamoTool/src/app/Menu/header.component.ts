import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { toast } from 'angular2-materialize';
import { environment } from '../../environments/environment';
import { DynamoToolShareService } from '../dynamoToolHome/dynamoToolShare.service';
@Component({
    selector: 'page-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: []
})

export class HeaderComponent {

    clientMenu: any;
    expanded: boolean;
    cc: string;
    userName: string;
    pageName: string;
    customerName: string;
    extraLink: string;
    setmessage: any;
    redirectUrl:any;
    cancelURL: string;
    logoWidth: string;
    logoHeight: number;
    setTopMargin: number;
    setMenuTitle: string;
    appName: string;
    userIcon: string;
    customerIcon: string;
    setMenuIcon: string;
    setMenuIconColor: string;
    logoutApi: string;
    constructor(private _router: Router, private _dynamoService: DynamoToolShareService, private _activeRoute: ActivatedRoute) {

        // alert(this._activeRoute.snapshot.queryParams.cc + "header component");
        this.userName = JSON.parse(sessionStorage.getItem('userName' + this._activeRoute.snapshot.queryParams.cc));
        this.appName = JSON.parse(sessionStorage.getItem('application' + this._activeRoute.snapshot.queryParams.cc));
        this.userIcon = sessionStorage.getItem('userIcon' + this._activeRoute.snapshot.queryParams.cc) !== 'undefined' ? JSON.parse(sessionStorage.getItem('userIcon' + this._activeRoute.snapshot.queryParams.cc)) : undefined;
        this.customerIcon = sessionStorage.getItem('customerIcon' + this._activeRoute.snapshot.queryParams.cc) !== 'undefined' ? JSON.parse(sessionStorage.getItem('customerIcon' + this._activeRoute.snapshot.queryParams.cc)) : undefined;
        //  alert(this.userName); alert(this.appName);
        // MODIFY ON 3 rd feb to use icon, title, icon menu for  in header when redirecting from apiCall to home
        if (this._activeRoute.snapshot.queryParams.fromApi !== undefined && this._activeRoute.snapshot.queryParams.fromApi) {

            this.setMenuTitle = this._activeRoute.snapshot.queryParams.title;

        }
        if (sessionStorage.getItem('customerName' + this._activeRoute.snapshot.queryParams.cc) !== undefined && sessionStorage.getItem('customerName' + this._activeRoute.snapshot.queryParams.cc) !== null && sessionStorage.getItem('customerName' + this._activeRoute.snapshot.queryParams.cc) !== '') {

            this.customerName = JSON.parse(sessionStorage.getItem('customerName' + this._activeRoute.snapshot.queryParams.cc));

        }
        if (sessionStorage.getItem('extraLink' + this._activeRoute.snapshot.queryParams.cc) !== undefined && sessionStorage.getItem('extraLink' + this._activeRoute.snapshot.queryParams.cc) !== null && sessionStorage.getItem('extraLink' + this._activeRoute.snapshot.queryParams.cc) !== '') {


            this.extraLink = JSON.parse(sessionStorage.getItem('extraLink' + this._activeRoute.snapshot.queryParams.cc));
            this.logoWidth = sessionStorage.getItem('logoWidth' + this._activeRoute.snapshot.queryParams.cc);
            this.logoHeight = parseInt(sessionStorage.getItem('logoHeight' + this._activeRoute.snapshot.queryParams.cc));
            this.setTopMargin = (80 - this.logoHeight) * 0.5;


        }
        // alert(this.logoWidth + "hjjhj");
    }
    @Output() logoutProcess: EventEmitter<any> = new EventEmitter();
    @Input()
    set setCustomerName(res) {
        if (res == undefined) {
        }
        else {
            res = res;
            this.customerName = res;
        }
    }
    // customerIcon

    @Input()
    set setcustomerIcon(res) {
        if (res == undefined) {
        }
        else {
            res = res;
            this.customerIcon = res;
        }
    }
    @Input()
    set setmenuTitle(res) {
        if (res == undefined) {
        }
        else {

            this.setMenuTitle = res;
        }
    }
    @Input()
    set setTitleProperty(res) {
        //alert('title pro');

        if (res == undefined) {
        }
        else {

            if (res.setMenuIcon !== undefined) {
                this.setMenuIcon = res.setMenuIcon;
            }

            if (res.setMenuIconColor !== undefined) {
                this.setMenuIconColor = res.setMenuIconColor;
            }
        }
    }

    @Input()
    set getHeaderData(response) {

        let appName = this._activeRoute.snapshot.queryParams.cc;
        // appName=="NC" before 3rd feb 2021 only
        if (response !== undefined && response !== null) {
            response = JSON.parse(response);
            for (let i = 0; i < response.data.length; i++) {
                let res = response.data[i];

                if (res.type == 'setup') {
                    this.logoutApi = res.logoutApi;
                    this.userName = res.username;
                }
                else if (res.type == 'dtWebMenu') {
                    // this.userName = res.sideSection.title;
                    this.appName = res.application;
                    this.setMenuTitle = res.title;
                    this.setMenuIcon = res.icon;
                    this.setMenuIconColor = res.iconcolor;
                    if (appName == 'NC') {
                        this.appName = 'NC';
                    }

                }

            }
        }

    }

 logoutPatient(): void {
        let NotNotify = false;
        if (this._activeRoute.snapshot.queryParams.cc !== 'NC') {
            this.logoutApi = JSON.parse(sessionStorage.getItem('logoutApi' + this._activeRoute.snapshot.queryParams.cc));
        }
        this._dynamoService.LogOut(this.logoutApi)
            .subscribe((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].type == 'notify') {
                        NotNotify=false;
                        if (response.data[i].msg !== undefined || response.data[i].alert !== undefined) {
                            if (response.data[i].alert !== null || response.data[i].msg !== null) {
                                this.setmessage = response.data[i];
                            }
                            if (response.data[i].redirectUrl !== null || response.data[i].redirectUrl !== '')
                            {
                                this.redirectUrl = response.data[i].redirectUrl;
                            }
                        }

                        sessionStorage.removeItem('clientmenu' + this._activeRoute.snapshot.queryParams.cc);
                      // 'dtlogin' 17 jan
                      if (this._activeRoute.snapshot.queryParams.cc !== 'NC' && sessionStorage.getItem('logoutApi' + this._activeRoute.snapshot.queryParams.cc).includes('/dt/login')) {

                        localStorage.removeItem('accessToken' + this._activeRoute.snapshot.queryParams.cc);
                        if(this.redirectUrl==''||this.redirectUrl==undefined||this.redirectUrl==null)
                            {
                                setTimeout(() => {

                                    this._router.navigate(['./login'],
                                        {
                                            queryParams: { cc: sessionStorage.getItem('cc' + this._activeRoute.snapshot.queryParams.cc) }
                                        });
                                }, 500);
                            }
                            else
                            {
                                window.location.href = this.redirectUrl;
                            }

                        }

                    } else if (response.data[i].type == 'pageInit') {

                    } else if (response.data[i].type == 'dialogHtml') {
                    } else if (response.data[i].type == 'popup') {
                        NotNotify = true;
                    } else {
                        localStorage.removeItem('accessToken' + this._activeRoute.snapshot.queryParams.cc);
                        this.cancelURL = sessionStorage.getItem('cancelURL' + this._activeRoute.snapshot.queryParams.cc);
                        window.location.href = this.cancelURL;

                    }

                }
                if(NotNotify)
                {
                    this.logoutProcess.emit(response);
                }
            }, error => this.handleError(error));

    }

    handleError(error) {

        //  this.loader = environment.displaynone;
        if (error.error.data !== undefined) {
            for (let i = 0; i < error.error.data.length; i++) {
                if (error.error.data[i].type == 'notify') {
                    if (error.error.data[i].msg !== undefined || error.error.data[i].alert !== undefined) {
                        if (error.error.data[i].alert !== null || error.error.data[i].msg !== null) {
                            this.setmessage = error.error.data[i];
                        }
                    }

                }
            }

        } else if (error.name !== undefined && error.name === 'HttpErrorResponse' && error.status === 0 && error.statusText === 'Unknown Error') {

            this.setmessage = { 'alert': 'alert', 'URL': error.url, 'title': error.title !== undefined ? error.title : '' };

        }  else if (error.name !== undefined && error.name === 'HttpErrorResponse' && error.status === 503 && error.statusText === 'Service Unavailable') {
            this.setmessage = {'alert': 'alert', 'URL': error.url, 'title': environment.serviceNotAvailable, 'statusCode': 503, 'message': error.error.message ? error.error.message : "Server Error 503"
             };

        }
        else if (error.message !== undefined) {
            alert(error.message);
        }

        else {
            if (error.error.alert !== undefined) {

                this.setmessage = error.error;
            }
            else {
                toast(error.statusText, 4000);
            }
        }

    }
    toggle() {
        this.expanded = !this.expanded;
    }

}
