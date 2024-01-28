import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@ Component({
    selector: 'app-subnaviagtion',
    templateUrl: './subNavigation.component.html',
    styleUrls: ['./navigation.component.css']
})

export class SubNavigationComponent implements OnInit {

    getFirstPageAPI: string;
    getNextPageAPI: string;
    getLastPageAPI: string;
    getPrevPageAPI: string;
    itemPrev: string;
    itemLast: string;
    itemNext: string;
    itemFirst: string;
    firstOpecity: string;
    prevOpecity: string;
    nextOpecity: string;
    lastOpecity: string;
    loader: string;
    sendNavigationPrm: string;
    @ Output() subNavChanged: EventEmitter< string> = new EventEmitter();

    constructor() { }
    ngOnInit() { }

    @ Input()
    set naviresponse(response: any) {

        if (response === undefined) {
            return;
        } else {
            if (response.getFirstPageAPI !== undefined) {
                this.getFirstPageAPI = response.getFirstPageAPI;
                this.itemFirst = '';
                this.firstOpecity = '';
            } else {
                this.itemFirst = 'none';
                this.firstOpecity = '0.6';
            }

            if (response.getNextPageAPI !== undefined) {
                this.getNextPageAPI = response.getNextPageAPI;
                this.itemNext = '';
                this.nextOpecity = '';
            } else {
                this.itemNext = 'none';
                this.nextOpecity = '0.6';
            }

            if (response.getLastPageAPI !== undefined) {
                this.getLastPageAPI = response.getLastPageAPI;
                this.itemLast = '';
                this.lastOpecity = '';
            } else {
                this.itemLast = 'none';
                this.lastOpecity = '0.6';
            }

            if (response.getPrevPageAPI !== undefined) {
                this.getPrevPageAPI = response.getPrevPageAPI;
                this.itemPrev = '';
                this.prevOpecity = '';
            } else {
                this.itemPrev = 'none';
                this.prevOpecity = '0.6';
            }
        }
    }

    getPage(url: string) {

        this.sendNavigationPrm = url;
        this.subNavChanged.emit(url);
        this.loader = 'block';
    }
}
