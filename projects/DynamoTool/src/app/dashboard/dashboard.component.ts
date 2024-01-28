import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
    patientName: string;
    laststatementdate: string;
    selectdisplayPoup: string;
    email: string;
    selectPatientInfo: string;
    Identifies: string;
    patientgetInfo: any;
    patientsecInfo: any;
    statementPopUp: string;
    statment: string;
    current: string;
    submitapi: string;
    title: string;
    hexkey: string;
    cc: string;
    ddname: string;
    viewid: string;
    patientform: string;
    options: any;
    public filterKey = '';
    public filtervalue = '';
    filtername = 'filtername';
    public filteredItems = [];
    divider = '';
    section = '';
    patientClass = 'modal';
    lastzip: boolean;
    cityState: any;
    changecity: string;
    changestate: string;
    practiceimage: string;
    modalPop: string;
    UserType: string;
    patientType: string;
    patientMenu: any;
    loader: string;
    submitButtonText: string;
    cancelButtonText: string;
    practiceCode: string;
    userType: string;
    displaySubGridresp: any;
    navigatinresponse: any;
    displayViewresponse: any;
    buttonresponse: any;
    navigationcss: string;
    dtnotepad: string;
    content: string;
    getFileName: string;
    saveApi: string;
    responseDtForm: any;
    setZindex: number;
    copay: string;
    setmessage: any;
    serverName: any;
    showFormButton: boolean = false;
    responseDtFormPage: any;
    showMenu: boolean = true;
    buttonresponsePage: any[] = [];
    showDialog: boolean = false;
    setBtnProperty: string;
    formWidth: string;
    setresponse: any;
    navigationcssPopup: string;
    navigationresponsePopup: string;
    menuTitle: string;
    data: any;
    headingSection: any;
    sideSection: any;
    args: any;
    image: string;
    dashboardUpdate: boolean = false;

    @Output() handleMenuEvent: EventEmitter<string> = new EventEmitter();

    constructor() {
        if (window.location.hostname === 'localhost') {
            this.serverName = environment.baseUrl;
        } else {
            this.serverName = window.location.origin;
        }
    }

    ngOnInit() {
        // UNSET BACKGROUND IMAGE SETTED ON LOGIN COMPONENT FOR NCDS
        const body = document.getElementsByTagName('body')[0];

        body.style.background = '';
        this.dashboardUpdate = false;
    }
    @Input()
    set getDashboardData(response: any) {
        this.args = { application: '', menucode: '' };
        if (response === undefined || response === null) {
            return;
        } else {
            response = JSON.parse(response);
            for (let i = 0; i < response.data.length; i++) {
                const res = response.data[i];
                if (res.type == 'pageInit') {
                    if (res.dashboardUpdate !== undefined && res.dashboardUpdate !== '') {
                        this.dashboardUpdate = res.dashboardUpdate;
                    }
                } else if (res.type == 'notify' && !this.dashboardUpdate) {
                    this.setmessage = res;
                } else if (res.type == 'dtWebMenu') {
                    this.patientMenu = res.menu;
                    if (res.headingSection !== undefined) {
                        this.headingSection = res.headingSection;
                        this.image = res.headingSection !== null && res.headingSection != '' && res.headingSection.image !== null ? res.headingSection.image : undefined;
                        if (res.sideSection !== undefined) {
                            this.sideSection = res.sideSection.sideRows;
                            this.title = res.sideSection.title;
                        }
                    }
                    // GET EXTRA ATTRIBUTE
                    this.args.cc = res.cc;
                    this.args.application = res.application;
                    this.args.menucode = res.menucode;
                }
                /** headingSection optional, sideRows optional,image optional */
            }
        }
    }

    @Input()
    set getUserType(response: any) {
        if (response === undefined) {
            this.userType = undefined;
            return;
        } else {
            this.userType = response;
        }
    }
    // @ Output() handleMenuEvent: EventEmitter< string> = new EventEmitter();

    getSelected(clientDetails: any) {
        const menuDetail = { menuDetails: clientDetails, args: this.args };

        this.handleMenuEvent.emit(JSON.stringify(menuDetail));
    }
}
