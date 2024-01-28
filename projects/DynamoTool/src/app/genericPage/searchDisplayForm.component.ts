import { Component, OnInit, Renderer2 } from '@angular/core';
import { GenericPageService } from './genericPage.service';
import { environment } from '../../environments/environment';
import { DTFormService } from '../dtform/dtForm.service';
import 'materialize-css';
import { toast } from 'angular2-materialize';

@ Component({
    selector: 'app-searchDisplay',
    templateUrl: './searchDisplayForm.component.html',
    styleUrls: ['./searchDisplayForm.component.css'],
    providers: [GenericPageService, DTFormService]
})

export class SearchDisplayComonent implements OnInit {

    loader: string;
    dtForm_table: string;
    dtForm_viewtable: string;
    getdisplayrecord: any;
    navigationcsspopUp: string;
    navigationcss: string;
    navigatinresponse: string;
    displaySubGridresp: any;
    displayViewresponse: any;
    displayPoup: string;
    modelOverLay: string;
    zIndex: number;
    lookupFormField: string;
    displayLookUpForm: any;
    setmessage: any;
    constructor(private _gpServices: GenericPageService, private _dtFormServices: DTFormService, private _render: Renderer2) { }
    ngOnInit() {

        if (sessionStorage.getItem('getdisplayrecord') !== null) {
            this.getdisplayrecord = JSON.parse(sessionStorage.getItem('getdisplayrecord'));
            const viewdata = [];
            for (let k = 0; k < this.getdisplayrecord.data.length; k++) {
                if (this.getdisplayrecord.data[k].rows !== undefined) {
                    this.dtForm_viewtable = environment.displayBlock;
                    this.displayViewresponse = this.getdisplayrecord;

                } else {
                    this.displaySubGridresp = this.getdisplayrecord.data[k];
                    if (this.getdisplayrecord.data[k].navigation !== undefined) {
                        this.navigationcsspopUp = environment.displayBlock;
                        this.navigatinresponse = this.getdisplayrecord.data[k].navigation;
                    } else {
                        this.navigationcsspopUp = environment.displayNone;
                    }
                    this.dtForm_table = environment.displayBlock;
                }
                this.loader = environment.displayNone;
            }
        }
    }
    getDataByHexkey(event) {
        if (event.url === '') {
            return false;
        } else {
            this.loader = environment.displayBlock;
            this._dtFormServices.getDataByHexkey(event)
                .subscribe(
                    response => {
                        this.loader = environment.displayNone;
                        if (response == undefined) {

                            return false;
                        } else {
                            this._render.addClass(document.body, 'custom-body');
                            this.dtForm_viewtable = environment.displayNone;
                            this.dtForm_table = environment.displayNone;
                            for(let i=0;i< response.data.length;i++) { // niharika
                                if (response.data[i].type == 'notify') {
                                    if (response.data[i].msg !== undefined || response.data[i].alert !== undefined) {
                                      if (response.data[i].alert !== null || response.data[i].msg !== null) {
                                        this.setmessage = response.data[i];
                                      }
                                    }
                                  }
                             else if (response.data[i].type === 'lookupFormField') {
                                this.displayPoup = environment.displayBlock;
                                this.lookupFormField = environment.displayBlock;
                                this.displayLookUpForm = response.data[i];
                                this.modelOverLay = 'modal-overlay';
                                this.zIndex = 11;

                            }
                            else {
                                this.lookupFormField = environment.displayNone;
                                for (let k = 0; k < response.data.length; k++) {
                                    if (response.data[k].rows !== undefined) {
                                        this.dtForm_viewtable = environment.displayBlock;
                                        this.displayViewresponse = response;

                                    } else {
                                        this.displaySubGridresp = response.data[k];
                                        if (response.data[k].navigation !== undefined) {
                                            this.navigationcsspopUp = environment.displayBlock;
                                            this.navigatinresponse = response.data[k].navigation;
                                        } else {
                                            this.navigationcsspopUp = environment.displayNone;
                                        }
                                        this.dtForm_table = environment.displayBlock;
                                    }
                                    this.displayPoup = environment.displayBlock;
                                    this.modelOverLay = 'modal-overlay';
                                    this.zIndex = 11;
                                }
                            }
                        }
                        }

                    }, error => {
                        this.loader = environment.displayNone;
                        toast(error.error.msg, 4000);
                    }
                );
        }
    }
    navChangedHandler(url: string) {
        this.loader = environment.displayBlock;
        this._dtFormServices.onChangeApi(url)
            .subscribe((response) => {

                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].type == 'notify') {
                        if (response.data[i].msg !== undefined || response.data[i].alert !== undefined) {
                            if (response.data[i].alert !== null || response.data[i].msg !== null) {
                                this.setmessage = response.data[i];
                                }
                        }
                    }
                    this.displaySubGridresp = response.data[i];
                     if (response.data[i].navigation !== undefined) {
                      this.navigatinresponse = response.data[i].navigation;
                    }
                }
                this.loader = environment.displayNone;
            }, (error) => {
                toast(error.error.msg, 4000);
            });
    }

    closePopUp() {
        this.displayPoup = environment.displayNone;
        this.modelOverLay = '';
        this._render.removeClass(document.body, 'custom-body');
    }
}
