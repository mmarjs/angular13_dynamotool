import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menushare',
    templateUrl: './menuShare.component.html',
    styleUrls: ['./menuShare.component.css'],
    providers: [],
})
export class MenuShareComponent implements OnInit {
    clientMenu: any;
    expanded: boolean;
    cc: string;
    userName: string;
    pageName: string;
    menuTitle: string;
    args: any;
    @Output() sendmessage: EventEmitter<string> = new EventEmitter();
    @Input()
    set getResponse(response) {
        /** IN CASE OF NCDS THIS MENU IS REQUIRED WHEN NO HEADING AND SIDE SECTION APPEAR */
        if (typeof response == 'string') {
            response = JSON.parse(response);
        }
        this.args = { application: '', menucode: '' };
        if (response === undefined || response === null) {
            return;
        } else {
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].type === 'dtWebMenu') {
                    this.clientMenu = response.data[i].menu;
                    this.menuTitle = response.data[i].title;
                    this.args.cc = response.data[i].cc;
                    this.args.application = response.data[i].application;
                    this.args.menucode = response.data[i].menucode;
                } else if (response.data[i].type === 'setup') {
                    this.userName = response.data[i].username;
                }
            }
        }
    }
    constructor(private _router: Router) {}

    ngOnInit() {
        // UNSET BACKGROUND IMAGE SETTED ON LOGIN COMPONENT FOR NCDS WHEN NO HEADING AND SIDESECTION APPEAR
        const body = document.getElementsByTagName('body')[0];

        body.style.background = '';
    }

    toggle() {
        this.expanded = !this.expanded;
    }

    getSelected(clientDetails) {
        let menuDetail = { menuDetails: clientDetails, args: this.args };
        this.sendmessage.emit(JSON.stringify(menuDetail));
    }
}
