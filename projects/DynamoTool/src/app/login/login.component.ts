import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserServicess } from './user.servie';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { toast } from 'angular2-materialize';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-dynamotoollogin',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],

    providers: [UserServicess],
})
export class LoginComponent implements OnInit {
    dynUsername: string;
    dynPassword: string;
    showUserName: string;
    username: string;
    password: string;
    showPopup: string;
    cc: string;
    logoimg: string = null;
    cancelURL: string;
    loginText: string;
    loginType = 'email';
    uploadOpen: string;
    submit: string;
    accountId: string;
    setmessage: any;
    loader: string;
    acountList: any;
    getAccountId: string;
    frPassword: string;
    reneterData: string;
    currentyear: number = Date.now();
    width: any;
    height: any;
    containerWidth: any;
    googleAPI: any;
    logoWidth: any;
    logoHeight: any;
    accessToken: string;
    dialogText: string;
    responseForgetPass: any;
    showResetForm: string;
    dialogTitle: string;
    dialogWidth: any;
    showDialog: string;
    buttonresponse = [];
    toastTimeOut: any;
    funCall = false;
    rUsername: any;
    rmCheck: any;
    appName: string = '';
    setData: any;
    formWidth: any;
    enableButton: any;
    selectdisplayPoup: string = 'none';
    responseDtFormPage: any;
    getDataResponseShare = 'false';
    response_share: any;
    dialogPageWidth: any;
    showDialogHtmlPage: boolean = false;
    @ViewChild('userName') userName: ElementRef;
    @ViewChild('password1') password1: ElementRef;
    constructor(private _userService: UserServicess, private _activeRoute: ActivatedRoute, private titleService: Title, private _router: Router) {}
    ngOnInit() {
        let mode;
        const urlString = window.location.href;
        if (urlString.split('/')[4]) {
            mode = urlString.split('/')[4];
            console.log("mode", mode)
        }
        this.loader = environment.displayNone;
        this.dynUsername = environment.displayBlock;
        this.dynPassword = environment.displayNone;
        this.frPassword = environment.displayNone;
        this.cc = this._activeRoute.snapshot.queryParams.cc;
        this.loginType = 'email';
        this.reneterData = '';
        this.width = this._userService.windowRef.innerWidth;
        this.height = this._userService.windowRef.innerHeight;
        const elems = document.getElementsByTagName('input');
        sessionStorage.setItem('windowsWidth', this.width);

        const ele_len = elems.length;

        for (var i = 0; i < ele_len; i++) {
            elems[0].focus();
        }

        if (this._activeRoute.snapshot.queryParams.cc !== undefined || this._activeRoute.snapshot.queryParams.cc !== null || this._activeRoute.snapshot.queryParams.cc !== '') {
            const url = window.location.href.split('?')[1];
            this._userService.getsetupAPILog(url, this.width, this.height, mode).then(
                (getResponse) => {
                    if (getResponse === null) {
                        return false;
                    } else {
                        this.appName = 'DS';
                        if (getResponse.body.data && getResponse.body.data !== null) {
                            localStorage.removeItem('accessToken' + this._activeRoute.snapshot.queryParams.cc);

                            // Iterate over response body data
                            for (let i = 0; i < getResponse.body.data.length; i++) {
                                // Check if type is form
                                if (getResponse.body.data[i].type == 'form') {
                                    // Set form width and set data
                                    this.formWidth = getResponse.body.data[i].width;
                                    this.setData = getResponse.body;
                                }
                                if (getResponse.body.data[i].type == 'authorization') {
                                    this.accessToken = getResponse.headers.get('Authorization');
                                    if (this.accessToken) localStorage.setItem('accessToken' + this._activeRoute.snapshot.queryParams.cc, this.accessToken);
                                }
                                // Check if type is notify
                                if (getResponse.body.data[i].type == 'notify' || getResponse.body.data[i].type == 'popup') {
                                    // Call handleNotify method
                                    this.setData = getResponse.body;
                                }
                                // Check if type is setup
                                else if (getResponse.body.data[i].type == 'setup') {
                                    // Set cancelURL and googleAPI
                                    this.cancelURL = getResponse.body.data[i].cancelURL;
                                    sessionStorage.setItem('cancelURL' + this._activeRoute.snapshot.queryParams.cc, this.cancelURL);
                                    this.googleAPI = getResponse.body.data[i].googleApi;
                                    //ADDED FOR GOOGLE API
                                    const dynamicScript = 'https://maps.googleapis.com/maps/api/js?libraries=places&key=' + this.googleAPI;
                                    this.setDynamicScript(dynamicScript);
                                    /** CODE TO HANDLE UNSETTING OF API KEY */
                                    sessionStorage.setItem('dynamicScript' + this._activeRoute.snapshot.queryParams.cc, dynamicScript);
                                }
                            }
                        }
                    }
                },
                (error) => this.handleError(error)
            );
        }
    }

    setDynamicScript(dynamicScript) {
        if (document.querySelector('script[async]') == null || document.querySelector('script[async]') == undefined) {
            // EXECUTE BELOW CODE TO ADD SCRIPT
            const fileref = document.createElement('script');
            fileref.setAttribute('async', '');
            fileref.setAttribute('defer', '');
            fileref.setAttribute('src', dynamicScript);
            document.getElementsByTagName('body')[0].appendChild(fileref);
        } else {
            return;
        }
    }

    setDialogPopup(resVar: any) {
        this.funCall = false;
        this.dialogText = resVar.text;
        this.dialogTitle = resVar.title;
        this.dialogWidth = resVar.dialogWidth !== undefined ? resVar.dialogWidth : '';
    }

    /** FOR HANDLING RESPONSE FROM LOGIN COMPONENT IN CASE OF NCDS */
    getLoginResponse(userIdData) {
        if (userIdData.status === 200) {
            if (userIdData.body.data !== undefined && userIdData.body.data !== null) {
                const resLength = userIdData.body.data.length;
                for (let i = 0; i < resLength; i++) {
                    const resVar = userIdData.body.data[i];
                    if (resVar.type == 'pageInit') {
                    }
                    if (resVar.type == 'dialogHtml') {
                        this.setDialogPopup(resVar);
                    } else if (resVar.type == 'formUpdate') {
                        this.formUpdateMain(userIdData.body);
                    } else if (resVar.type == 'notify') {
                        this.handleNotify(resVar);
                    } else if (resVar.type == 'setup') {
                        this.accessToken = userIdData.headers.get('Authorization');
                        localStorage.setItem('accessToken' + this._activeRoute.snapshot.queryParams.cc, this.accessToken);
                        this.toastTimeOut = resVar.toastTimeOut !== undefined && resVar.toastTimeOut !== '' ? resVar.toastTimeOut : 4000;
                        sessionStorage.setItem('toastTimeOut', resVar.toastTimeOut);
                        this.loginText = resVar.loginText;
                        this.logoimg = resVar.logoURL;
                        this.cancelURL = resVar.cancelURL;
                        this.googleAPI = resVar.googleApi;
                        this.logoWidth = resVar.logoWidth + 'px';
                        this.logoHeight = resVar.logoHeight + 'px';
                        const dynamicScript = 'https://maps.googleapis.com/maps/api/js?libraries=places&key=' + this.googleAPI;
                        this.setDynamicScript(dynamicScript);
                        /** CODE TO HANDLE UNSETTING OF API KEY */
                        sessionStorage.setItem('dynamicScript' + this._activeRoute.snapshot.queryParams.cc, dynamicScript);
                        sessionStorage.setItem('toastTimeOut', resVar.toastTimeOut);
                        sessionStorage.setItem('customerName' + this._activeRoute.snapshot.queryParams.cc, '');
                        if (resVar.customerName !== null && resVar.customerName !== undefined) {
                            sessionStorage.setItem('customerName' + this._activeRoute.snapshot.queryParams.cc, JSON.stringify(resVar.customerName));
                        }
                        sessionStorage.setItem('cc' + this._activeRoute.snapshot.queryParams.cc, this.cc);
                        sessionStorage.setItem('clientmenu' + this._activeRoute.snapshot.queryParams.cc, JSON.stringify(userIdData.body));
                        sessionStorage.setItem('userName' + this._activeRoute.snapshot.queryParams.cc, JSON.stringify(resVar.username));
                        sessionStorage.setItem('logoutApi' + this._activeRoute.snapshot.queryParams.cc, JSON.stringify(resVar.logoutApi));
                        if (resVar.logoURL !== null && resVar.logoURL !== undefined) {
                            sessionStorage.setItem('extraLink' + this._activeRoute.snapshot.queryParams.cc, JSON.stringify(resVar.logoURL));
                            sessionStorage.setItem('logoWidth' + this._activeRoute.snapshot.queryParams.cc, this.logoWidth);
                            sessionStorage.setItem('logoHeight' + this._activeRoute.snapshot.queryParams.cc, resVar.logoHeight);
                        } else {
                            sessionStorage.setItem('application' + this._activeRoute.snapshot.queryParams.cc, JSON.stringify(resVar.application));
                            sessionStorage.setItem('menuTitle' + this._activeRoute.snapshot.queryParams.cc, JSON.stringify(resVar.title));
                            sessionStorage.setItem('menuIcon' + this._activeRoute.snapshot.queryParams.cc, JSON.stringify(resVar.icon));
                            sessionStorage.setItem('menuIconColor' + this._activeRoute.snapshot.queryParams.cc, JSON.stringify(resVar.iconcolor));
                        }
                        this._router.navigate(['./dynamoToolHome'], { queryParams: { cc: this.cc } });
                    } else if (resVar.type == 'dtWebMenu') {
                        sessionStorage.setItem('application' + this._activeRoute.snapshot.queryParams.cc, JSON.stringify(resVar.application));
                        sessionStorage.setItem('menuTitle' + this._activeRoute.snapshot.queryParams.cc, JSON.stringify(resVar.title));
                        sessionStorage.setItem('menuIcon' + this._activeRoute.snapshot.queryParams.cc, JSON.stringify(resVar.icon));
                        sessionStorage.setItem('menuIconColor' + this._activeRoute.snapshot.queryParams.cc, JSON.stringify(resVar.iconcolor));
                    }
                }
            }
        } else {
            alert('status not 200');
        }
    }

    formUpdateMain(formResponse) {
        this.setData = formResponse;
    }

    handleNotify(response) {
        this.funCall = false;
        if (response.msg !== undefined || response.alert !== undefined) {
            if (response.alert !== null || response.msg !== null) {
                this.setmessage = response;
            }
        }
    }

    handleError(error) {
        //   this.loader = environment.displayNone;
        this.loader = environment.displayNone;
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
            this.handleNotify({ alert: 'alert', URL: error.url, title: error.title !== undefined ? error.title : '' });
        } else if (error.name !== undefined && error.name === 'HttpErrorResponse' && error.status === 503 && error.statusText === 'Service Unavailable') {
            this.handleNotify({
                alert: 'alert',
                URL: error.url,
                title: environment.serviceNotAvailable,
                statusCode: 503,
                message: error.error.message ? error.error.message : 'Server Error 503',
            });
        } else if (error.message !== undefined) {
            alert(error.message);
        } else {
            if (error.error.alert !== undefined) {
                this.setmessage = error.error;
            } else {
                toast(error.statusText, 4000);
            }
        }
    }
}
