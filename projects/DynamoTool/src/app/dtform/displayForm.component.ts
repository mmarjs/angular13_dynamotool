import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { toast } from 'angular2-materialize';
import SignaturePad from 'signature_pad';
import { environment } from '../../environments/environment';
import { DynamoToolShareService } from '../dynamoToolHome/dynamoToolShare.service';
import { DTFormService } from './dtForm.service';

declare var Materialize: any;
declare var google: any;
declare var Swal: any;
export class PageModel {
    content = '';
}
@Component({
    selector: 'app-displaydtForm',
    templateUrl: './dtForm.component.html',
    styleUrls: ['./dtForm.component.css'],
    providers: [DTFormService, DynamoToolShareService],
})
export class DisplayFromComponent implements OnInit, AfterViewInit {
    @Output() sendDtForm: EventEmitter<any> = new EventEmitter();
    @Output() message: EventEmitter<any> = new EventEmitter();
    @ViewChild('setFocus', { static: false }) private fucusElementRef: ElementRef;
    private dtForm: ElementRef;
    @Output() sendApiCall: EventEmitter<any> = new EventEmitter();
    addclass = false;
    @Output() hideEntryGridInparent: EventEmitter<any> = new EventEmitter();
    @Output() buttonAPICallSendParent: EventEmitter<any> = new EventEmitter();
    @Output() hideButtonInparent: EventEmitter<any> = new EventEmitter();
    // @Output() submitEntryGrid: EventEmitter<any> = new EventEmitter;
    @Output() handleFormDataInParent: EventEmitter<any> = new EventEmitter();
    @Output() sendFiletoMultipart: EventEmitter<any> = new EventEmitter();
    @Output() sendNofileOnSubmit: EventEmitter<any> = new EventEmitter();
    @Output() setExpanderFromApi: EventEmitter<any> = new EventEmitter();
    @ViewChildren('mySelect', { read: ElementRef }) mySelect: QueryList<ElementRef<HTMLParagraphElement>>;
    @Output() showCustomerName: EventEmitter<any> = new EventEmitter();
    @ViewChild('fullTime') timepicker: any;
    @Input() panelTabIndex: string;

    today: number = Date.now();
    divclass: any;
    loader: string;
    title: string;
    fontSize: string;
    hexkey: string;
    cc: string;
    ddname: string;
    viewid: string;
    dtFormList: any;
    dtDivclass: any;
    inputName: string;
    progressTitle: any;
    inputValue: string;
    submitButtonText: string;
    cancelButtonText: string;
    practiceCode: string;
    displayPoup: string;
    modelOverLay: string;
    zIndex: number;
    displaySubGridresp: any;
    navigatinresponse: any;
    displayViewresponse: any;
    navigationcsspopUp: string;
    dtForm_viewtable: string;
    dtForm_table: string;
    lookupFormField: string;
    displayLookUpForm: any;
    displayFiled: string;
    getdtFormData: any;
    dtfieldsshow = '';
    dtfieldsvalue = '';
    getClickApival = '';
    getOnChangeApi = '';
    getName = '';
    setTabIndexFocus: any = '';
    showDeleteButton: boolean;
    showExtraButton: boolean;
    showSubmitButton: boolean;
    deleteButtonText: string;
    extraButtonText: string;
    extraApi: string;
    submitapi: string;
    deleteApi: string;
    enterKeySubmits: boolean;
    audio: any;
    navigationcss: string;
    private baseUrl: string;
    private soundFilePath: string;
    buttonresponseDialog: any[] = [];
    show_popup: string;
    displayViewresponseDialog: any;
    displaySubGridrespDialog: any;
    navigationcssDialog: string;
    Islogo: boolean = false;
    logoWidth: any;
    logoHeight: any;
    logourl: any;
    desabledTabButton: boolean = false;
    navigatinresponseDialog: string;
    responseDtFormDialog: any;
    showText: string;
    showEnterKey: any;
    buttonresponse: any;
    summaryReceipt: any;
    setmessage: any;
    popUpTitle: any = '';
    popUpCloseApi: any = '';
    buttonresponseForm: any[] = [];
    staticdata: any;
    mainPopuptitle: string;
    showPopUp: string;
    showClose: boolean;
    popup_width: any;
    popup_height: any;
    popup_top: string;
    onCloseApi: string;
    onCloseRedirect: string;
    setparam: string;
    popup_zindex: any;
    displayViewresponseDialogArr: any[] = [];
    displaySubGridrespDialogArr: any[] = [];
    showDialog = false;
    showMenu = false;
    onPush: string;
    response_share: any;
    getDataResponseShare = 'false';
    displaySubGridPage: any = '';
    buttonresponsePage: any[];
    showForm: string = environment.displayBlock;
    displaySubGrid: any;
    displayViewPage: any;
    responseEditGrid: any;
    responseEditNotepad: any = [];
    showFromForm: string;
    showFormButton = false;
    ISFormButton = false;
    alignment: string;
    dialogWidth: any;
    formWidth: any;
    isChecked: boolean = false;
    /** CONFIGURING GOOGLE ADDRESS */
    address: Object;
    establishmentAddress: Object;

    formattedAddress: string;
    formattedEstablishmentAddress: string;

    phone: string;
    street_number: any;
    route = '';
    locality = '';
    administrative_area_level_2 = '';
    administrative_area_level_1 = '';
    country = '';
    postal_code: any;
    postal_code_suffix: any;
    county: string;
    /* For auto complete component */
    setClasses: any;
    setDivsInputs: any;
    dataAutoComplete: any[] = [];
    /** File upload */
    uploadOpen: string;
    buttonsFileUpload: any[] = [];
    fileExtensions: string;
    FileData: any;
    fileName: string;
    filetextinput: string;
    searchPhraseInput: string;
    searchWordsSize: number;
    extensionText: string;
    isMultiple: boolean;
    customerNameInHeader: string;
    streetAddress: string;
    addressFieldName = '';
    addressFieldNameArr: any[] = [];
    addressFieldsValueArr: any[] = [];
    position: number;
    setDivsInputsArr: any[] = [];
    divId: number;
    addressInputId: string;
    /** show dialoghtml on page */
    showDialogHtmlPage = false;
    showTextDialogPage: string;
    dialogPageWidth: string;
    showDialogTitle: string;
    /** show dialoghtml on popup */
    showDialogHtmlPopup = false;
    showTextDialogPopup: string;
    dialogHtmlPopupWidth: string;
    showDialogPopupTitle: string;
    /** show upload file on page  */
    showTextPage: string;
    showTitlePage: string;
    fileExtensionsPage: string;
    isMultiplePage: string;
    extensionTextPage: string;
    manualInput: string;
    setStreetNumber: any;
    setStreetNumberArr: any[] = []; // manual input
    streetNumberArr: any[] = []; // get using google api
    manualAddressFieldNameArr: any[] = [];
    manualAddressFieldValueArr: any[] = [];
    updateAddress: any;
    invalidClass: string;
    isMultipleAddress = false;
    dtFormListArray: any[] = [];
    ckeditorview: string;
    lastrevised: string;
    htmlEditTabindex: any;
    page: PageModel;
    tableclass: any;
    inquiryTitle: string;
    tinyButtion: string;
    /** NOTEPAD */
    htmlEdithexkey: string;
    showNextButton: boolean = false;
    content: string;
    getFileName: string;
    saveApi: string;
    isHtmlEdit = false;
    isHtmlEditPage = false;
    enhanced: boolean;
    htmlEditPageArr: any[] = [];
    pageContent: string;
    tinyReadonly: any;
    serverName: string;
    setCardNumberText: any;
    expansionPanelData: any;
    displayGridRespPage: any;
    navigationcssPage: string;
    navigationresPage: any;
    isMultiPart = false;
    expansionPanelPopup: any;
    formsNavigationCss: string;
    formsNavigation: any;
    updateEntryGrid: any;
    extraButton: any;
    fileFromForm = false;
    fileFieldName = '';
    dataFileArr: any[] = [];
    enableSubmitButton = true; // USE TO ENABLE DISABLE BUTTON IN FORM
    submitApiEntryGrid: any;
    apiEntryGridMultipart: any;
    invalidMessage: string;
    anyInvalidField = false;
    isValidSubmit = false;
    getDataGrid: boolean = false;
    popupMaxHeight: any;
    dialogFileWidth: any;
    ipAddressInvalid: boolean = false;
    macAddressInvalid: boolean = false;
    urlInvalid: boolean = false;
    emailInvalid: boolean = false;
    ustelephoneInvalid: boolean = false;
    hexadecimalInvalid: boolean = false;
    requiredEntryField: any;
    requiredFieldMultiForm: any;
    signaturePad: SignaturePad;
    signatureImg: string;
    signatureData: string;
    isSignature: boolean = false;
    canvasWidth: string;
    canvasHeight: any;
    canvasRequired: boolean = false;
    enableTabIndex: number;
    isCheckBoxFocus: boolean = false;
    showBusyText: string;
    customTime: string;
    isBackward: boolean = false;
    setDateField: any[] = [];
    responseHtmlEdit: any;
    isRemembar: boolean = false;
    qty: any;
    @ViewChild('canvas') canvasEl: ElementRef;
    @ViewChild('fileInput', { static: false }) fileInput;
    @ViewChild('inputFile', { static: false }) myInputVariable: ElementRef;

    constructor(
        private _dtFormServices: DTFormService,
        private _render: Renderer2,
        private _router: Router,
        private _dynamoService: DynamoToolShareService,
        private render: Renderer2,
        private _http: HttpClient,
        public zone: NgZone,
        private _activeRoute: ActivatedRoute
    ) {
        this.baseUrl = window.location.origin;
        this.setClasses = 'abc';
        if (window.location.href.includes('/DY/guitest')) {
            this.soundFilePath = '/DY/guitest';
        } else if (window.location.href.includes('/DY/gui')) {
            this.soundFilePath = '/DY/gui';
        } else if (window.location.href.includes('/CD/guitest')) {
            this.soundFilePath = '/CD/guitest';
        } else if (window.location.href.includes('/CD/gui')) {
            this.soundFilePath = '/CD/gui';
        }

        if (window.location.hostname === environment.localhost) {
            this.serverName = environment.baseUrl;
        }
        sessionStorage.setItem('getFormState', JSON.stringify(false));
    }
    /*   @HostListener('document:keydown', ['$event'])
      handleKeyboardEvent(event: KeyboardEvent) {
            if (event.key == 'Escape') {
              this.show_popup = environment.displayNone;
          }
      } */
    ngOnInit() {
        this.qty = '';
        window.scrollTo(0, 0);
        this.audio = new Audio();
        this.ckeditorview = environment.displayNone;
    }
    ngAfterViewInit() {
        if (this.canvasEl !== undefined) {
            this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
            this.canvasEl.nativeElement.height = this.canvasHeight;
            this._dtFormServices.windowRef.onresize = this.resizeCanvas;
            this.resizeCanvas();
            this.canvasEl.nativeElement.addEventListener('mousemove', this.resizeCanvas);
            this.canvasEl.nativeElement.addEventListener('mousedown', this.resizeCanvas);
            this.canvasEl.nativeElement.addEventListener('mouseenter', this.resizeCanvas);
        }
    }

    clicme() {
        this.addclass = !this.addclass;
    }
    // tslint:disable-next-line: use-lifecycle-interface
    ngAfterViewChecked() {
        if (Materialize.updateTextFields === undefined) {
            return false;
        }
        Materialize.updateTextFields();
    }

    @Input()
    set getdtForm(response: any) {
        let s = 1;
        for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].type == 'formUpdate') {
                s++;
            }
        }
        if (s == 1) {
            this.buttonresponseForm = [];
        }
        this.getDataResponseShare = sessionStorage.getItem('getDataResponseShare');
        if (this.getDataResponseShare) {
            this.response_share = JSON.parse(sessionStorage.getItem('response_share'));
            this.displayForm(this.response_share);
        } else {
            this.displayForm(response);
        }

        sessionStorage.setItem('getFormState', JSON.stringify(false));
    }

    @Input()
    set sendDataEntryGrid(response: any) {
        if (response !== undefined && response !== '') {
            this.rebindEntryGrid(response);
        }
    }

    @Input()
    set validateEntryOnForm(response: any) {
        if (response !== undefined && response !== '') {
            this.requiredEntryField = response;
        }
    }

    resizeCanvas() {
        // When zoomed out to less than 100%, for some very strange reason,
        // some browsers report devicePixelRatio as less than 1
        // and only part of the canvas is cleared then.
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        if (this.canvasEl !== undefined && this.canvasEl.nativeElement !== undefined) {
            this.canvasEl.nativeElement.width = this.canvasEl.nativeElement.offsetWidth * ratio;
            this.canvasEl.nativeElement.height = this.canvasEl.nativeElement.offsetHeight * ratio;
            this.canvasEl.nativeElement.getContext('2d').scale(ratio, ratio);
        }
    }

    displayForm(response: any, type?: string, onChangeFieldValue?: any, onChangeFieldName?: string) {
        this.isCheckBoxFocus = false;
        this.extraButton = '';
        this.uploadOpen = environment.displayNone;
        this.dialogWidth = '';
        this.updateAddress = undefined;
        this.anyInvalidField = false;
        this.getDataGrid = false;
        const emptyFields: any[] = [];
        let tabindexfocus: any;
        if (type !== 'formUpdate' && type !== undefined) {
            this.responseEditGrid = '';
            this.showNextButton = false;
            this.buttonresponseForm = [];
        }
        this.loader = 'none';
        this.showForm = environment.displayBlock;

        if (response === undefined || response === null) {
            return;
        } else {
            this.dtfieldsshow = '';
            this.dtfieldsvalue = '';
            const elems = document.getElementsByTagName('input');

            const mfieldivData = [];
            let formSubmit = true;
            // response = this._dtFormServices.getStaticData();
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].image) {
                    this.Islogo = true;
                    this.logoWidth = response.data[i].image ? response.data[i].image.width : '';
                    this.logoHeight = response.data[i].image ? response.data[i].image.height : '';
                    this.logourl = response.data[i].image ? response.data[i].image.url : '';
                }
                const subdivData = [];
                const fieldivData = [];

                if (response.data[i].type === 'form') {
                    this.title = response.data[i].title;
                    //// Add fontSize varible 26 April///
                    this.fontSize = response.data[i].fontSize;
                    this.hexkey = response.data[i].hexkey;
                    this.cc = response.data[i].cc;
                    this.ddname = response.data[i].ddname;
                    this.viewid = response.data[i].viewid;
                    this.isMultipleAddress = response.data[i].isMultipleAddress !== undefined ? response.data[i].isMultipleAddress : false;

                    this.enterKeySubmits = response.data[i].enterKeySubmits;

                    if (response.data[i].hasOwnProperty('formSubmit') && response.data[i].formSubmit !== undefined && response.data[i].formSubmit !== '') {
                        formSubmit = response.data[i].formSubmit;
                    }
                    if (response.data[i].divs !== undefined) {
                        for (let j = 0; j < response.data[i].divs.length; j++) {
                            if (response.data[i].divs[j].fields === undefined) {
                                const divCols = {
                                    divclass: response.data[i].divs[j].divclass,
                                };
                                subdivData.push(divCols);
                                this.divclass = subdivData;
                            } else {
                                let fieldsCols: any = {};
                                fieldsCols = {
                                    divclass: response.data[i].divs[j].divclass === undefined ? 'divider' : response.data[i].divs[j].divclass,
                                    section: response.data[i].divs[j].section === undefined ? '' : response.data[i].divs[j].section,
                                    fields: this.setOption(response.data[i].divs[j].fields),
                                };

                                fieldivData.push(fieldsCols);
                            }
                        }
                    }
                    const mainfieldsCols = {
                        divclass: subdivData,
                        mfields: fieldivData,
                    };

                    mfieldivData.push(mainfieldsCols);
                    this.dtFormList = mfieldivData[0].mfields;
                    this.dtDivclass = mfieldivData[0].divclass;
                    this.dtFormListArray.push(this.dtFormList);
                    /** TO HANDLE DISPLAY GRID AND ENTRYGRID INSIDE FORM OBJECT WITH RELATEDGRID DATA */
                    if (response.data[i].relatedGrid !== undefined && response.data[i].relatedGrid.type === 'displayGrid') {
                        this.displayGridRespPage = response.data[i].relatedGrid;
                        this.isMultiPart = true;
                        if (response.data[i].navigation !== undefined) {
                            this.navigationcssPage = environment.displayBlock;
                            this.navigationresPage = response.data[i].navigation;
                        } else {
                            this.navigationcssPage = environment.displayNone;
                        }

                        if (response.data[i].submitButton !== undefined) {
                            this.extraButton = response.data[i].submitButton;
                        }
                    }

                    /** HANDLE RELATED GRID OBJECT  */
                    if (response.data[i].relatedGrid !== undefined && response.data[i].relatedGrid.type === 'entryGrid') {
                        this.isMultiPart = true;
                        this.responseEditGrid = response.data[i].relatedGrid;
                        if (response.data[i].submitButton !== undefined) {
                            this.extraButton = response.data[i].submitButton;
                        }
                    }
                } else if (response.data[i].type === 'pageInit') {
                    if (response.data[i].clearPage) {
                        this.responseEditGrid = '';
                        this.displayGridRespPage = '';
                        this.displayViewPage = '';
                        sessionStorage.setItem('desableTab', 'false');
                    }
                } else if (response.data[i].type === 'popup') {
                    this.mainPopuptitle = response.data[i].title;
                    this.showClose = response.data[i].showClose;
                    this.popup_width = response.data[i].width;
                    this.popup_zindex = response.data[i].zindex;
                    this.popupMaxHeight = response.data[i].maxHeight;
                    this.show_popup = environment.displayBlock;
                    this.popup_top = response.data[i].top;
                    this.onCloseRedirect = response.data[i].onCloseRedirect;
                    this.onCloseApi = response.data[i].onCloseApi;
                    this.setparam = response.data[i].action;
                } else if (response.data[i].type === 'dialogHtml') {
                    this.showDialogHtmlPopup = true;
                    this.showTextDialogPopup = response.data[i].text;
                    this.dialogHtmlPopupWidth = response.data[i].dialogWidth !== undefined ? response.data[i].dialogWidth : '40%';
                    this.showDialogPopupTitle = response.data[i].title;
                    this.displaySubGridrespDialog = false;
                    this.displayViewresponseDialog = false;
                } else if (response.data[i].hasOwnProperty('buttons') && response.data[i].type !== 'entryGrid') {
                    if (response.data[i].navigation !== undefined) {
                        this.formsNavigation = response.data[i].navigation;
                        this.formsNavigationCss = environment.displayBlock;
                    }
                    if (sessionStorage.getItem('showFromForm') !== '' && sessionStorage.getItem('showFromForm') === 'false' && !formSubmit) {
                        this.buttonresponseForm = [];
                        return;
                    } else {
                        if (this.showNextButton) {
                        }
                        for (let k = 0; k < response.data[i].buttons.length; k++) {
                            if (response.data[i].buttons[k].changeState !== undefined) {
                                const btnInd = this.buttonresponseForm.findIndex((x) => x.text == response.data[i].buttons[k].text);
                                if (btnInd >= 0) {
                                    if (response.data[i].buttons[k].isEnabled !== undefined) {
                                        this.buttonresponseForm[btnInd].isEnabled = response.data[i].buttons[k].isEnabled;
                                    }
                                    if (response.data[i].buttons[k].isHidden !== undefined) {
                                        this.buttonresponseForm[btnInd].isHidden = response.data[i].buttons[k].isHidden;
                                    }
                                    if (response.data[i].buttons[k].onPush !== undefined) {
                                        this.buttonresponseForm[btnInd].onPush = response.data[i].buttons[k].onPush;
                                    }
                                }
                            } else if (!this.showNextButton) {
                                this.buttonresponseForm.push(response.data[i].buttons[k]);
                            }
                            if (response.data[i].buttons[k].hasOwnProperty('onPush') && response.data[i].buttons[k].buttonType === 'submit') {
                                this.onPush = response.data[i].buttons[k].onPush;
                                this.hideButtonInParent();
                            }
                            // USE TO SEND DATA FROM ENTRYGRID COMPONENT ON NAVIGATION CLICK WITHOUT CLICKING ON SAVE BUTTON
                            if (response.data[i].buttons[k].buttonType !== undefined && response.data[i].buttons[k].buttonType === 'submit') {
                                // TO SHOW MESSAGE IN PARENT COMPONENT HOME AND GENERIC PAGE
                                this.invalidMessage = response.data[i].buttons[k].invalidMessage !== undefined ? response.data[i].buttons[k].invalidMessage : 'Correct red fields before saving';

                                this.submitApiEntryGrid = {
                                    onPush: response.data[i].buttons[k].onPush,
                                    invalidMessage: this.invalidMessage,
                                };
                            }
                        }
                    }
                } else if (response.data[i].type === 'entryGrid') {
                    // to handle ordering
                    this.responseEditGrid = response.data[i];
                } else if (response.data[i].type === 'displayGrid' && (response.data[i].topPosition === undefined || response.data[i].topPosition === false)) {
                    this.displayGridRespPage = response.data[i];
                    if (response.data[i].isMultiPart !== undefined && response.data[i].isMultiPart) {
                        this.isMultiPart = true;
                    }
                    if (response.data[i].navigation !== undefined) {
                        this.navigationcssPage = environment.displayBlock;
                        this.navigationresPage = response.data[i].navigation;
                    } else {
                        this.navigationcssPage = environment.displayNone;
                    }

                    if (response.data[i].extraButton !== undefined) {
                        this.extraButton = response.data[i].extraButton;
                    }
                } else if (response.data[i].relatedGrid !== undefined && response.data[i].relatedGrid.type === 'displayGrid') {
                    this.displayGridRespPage = response.data[i].relatedGrid;
                    this.isMultiPart = true;
                    if (response.data[i].navigation !== undefined) {
                        this.navigationcssPage = environment.displayBlock;
                        this.navigationresPage = response.data[i].navigation;
                    } else {
                        this.navigationcssPage = environment.displayNone;
                    }
                } else if (response.data[i].relatedGrid !== undefined && response.data[i].relatedGrid.type === 'entryGrid') {
                    this.responseEditGrid = response.data[i].relatedGrid;
                } else if (response.data[i].type === 'htmlEdit') {
                    /////// 15feb End sessionstorageline no 629 //////
                    const customObj = {
                        hexkey: '',
                        filename: '',
                        type: '',
                        name: '',
                        value: '',
                    };
                    customObj.hexkey = response.data[i].hexkey;
                    customObj.filename = response.data[i].filename;
                    customObj.type = 'htmledit';
                    customObj.name = response.data[i].name;
                    customObj.value = response.data[i].htmledit;
                    this.responseEditNotepad.push(customObj);
                    sessionStorage.setItem(`FormNotepad`, JSON.stringify(this.responseEditNotepad));
                    this.page = new PageModel();

                    const htmlEditPageOb = {
                        tableclass: '',
                        inquiryTitle: '',
                        pageContent: '',
                        lastrevised: '',
                        tinyButtion: '',
                        saveApi: '',
                        htmlEdithexkey: '',
                        getFileName: '',
                        enhanced: '',
                        tinyReadonly: '',
                        htmlEditTabindex: '',
                    };
                    this.isHtmlEditPage = true;
                    this.ckeditorview = environment.displayBlock;
                    this.lastrevised = response.data[i].lastrevised;
                    this.tableclass = response.data[i].tableclass;
                    this.inquiryTitle = response.data[i].title;
                    this.htmlEdithexkey = response.data[i].hexkey;
                    this.content = response.data[i].htmledit;
                    this.getFileName = response.data[i].filename;
                    this.saveApi = response.data[i].saveapi;
                    this.enhanced = response.data[i].enhanced;
                    this.htmlEditTabindex = response.data[i].tabindex;
                    if (response.data[i].readonly === 1) {
                        this.tinyButtion = environment.displayNone;
                        this.tinyReadonly = 1;
                        sessionStorage.setItem('tinyReadonly', '1');
                    } else {
                        this.tinyButtion = environment.displayBlock;
                        this.tinyReadonly = 0;
                        sessionStorage.setItem('tinyReadonly', '0');
                    }

                    this.page.content = response.data[i].htmledit;

                    this.pageContent = this.page.content;

                    // SET CONTENT IN ARRAY
                    htmlEditPageOb.tableclass = this.tableclass;
                    htmlEditPageOb.inquiryTitle = this.inquiryTitle;
                    htmlEditPageOb.pageContent = this.pageContent;
                    htmlEditPageOb.lastrevised = this.lastrevised;
                    htmlEditPageOb.tinyButtion = this.tinyButtion;
                    htmlEditPageOb.htmlEdithexkey = this.htmlEdithexkey;
                    htmlEditPageOb.getFileName = this.getFileName;
                    htmlEditPageOb.saveApi = this.saveApi;
                    htmlEditPageOb.htmlEditTabindex = this.htmlEditTabindex;
                    htmlEditPageOb.tinyReadonly = this.tinyReadonly;
                    htmlEditPageOb.enhanced = this.enhanced.toString();
                    this.htmlEditPageArr.push(htmlEditPageOb);
                } else if (response.data[i].type === 'displayView') {
                    this.displayViewPage = response;
                } else if (response.data[i].type === 'formUpdate') {
                    this.showNextButton = true;
                    tabindexfocus = response.data[i].tabindexfocus;

                    let validFieldValue = true;
                    let elems: any;
                    let ele_len = 0;
                    for (let l = 0; l < this.dtFormList.length; l++) {
                        for (let j = 0; j < this.dtFormList[l].fields.length; j++) {
                            if (
                                this.dtFormList[l].fields[j].type !== 'select' &&
                                (this.dtFormList[l].fields[j].tabindex == tabindexfocus ||
                                    this.dtFormList[l].fields[j].readonly == true ||
                                    (this.dtFormList[l].fields[j].type == 'hidden' && tabindexfocus == this.dtFormList[l].fields[j].tabindex + 1)) &&
                                response.data[i].isValid !== undefined
                            ) {
                                this.dtFormList[l].fields[j].isValid = response.data[i].isValid !== undefined && !response.data[i].isValid ? false : true;
                                this.anyInvalidField = !response.data[i].isValid;

                                validFieldValue = response.data[i].isValid;
                                if (this.dtFormList[l].fields[j].type == response.data[i].controlType && this.dtFormList[l].fields[j].name == response.data[i].name) {
                                    tabindexfocus = validFieldValue ? undefined : tabindexfocus;
                                }
                                /** USING THIS PROPERTY ON MULTIPART FORM */
                                sessionStorage.setItem('isValidonMultipart', JSON.stringify(this.anyInvalidField));
                            }
                            if (
                                this.dtFormList[l].fields[j].type === 'select' &&
                                (this.dtFormList[l].fields[j].tabIndex == tabindexfocus || tabindexfocus == this.dtFormList[l].fields[j].tabIndex + 1) &&
                                response.data[i].isValid !== undefined
                            ) {
                                this.dtFormList[l].fields[j].isValid = response.data[i].isValid !== undefined && !response.data[i].isValid ? false : true;

                                this.anyInvalidField = !response.data[i].isValid;
                                validFieldValue = response.data[i].isValid;
                                sessionStorage.setItem('isValidonMultipart', JSON.stringify(this.anyInvalidField));
                            }

                            //////// 22 April add a if conditions///
                            if (
                                this.dtFormList[l].fields[j].type === 'radio' &&
                                (this.dtFormList[l].fields[j].tabindex == tabindexfocus || tabindexfocus == this.dtFormList[l].fields[j].tabindex + 1) &&
                                response.data[i].isValid !== undefined
                            ) {
                                this.setTabIndexFocus = tabindexfocus;
                            }

                            ///////// 18 May 2022 ///
                            if (
                                this.dtFormList[l].fields[j].type === 'email' &&
                                (this.dtFormList[l].fields[j].tabindex == tabindexfocus || tabindexfocus == this.dtFormList[l].fields[j].tabindex + 1) &&
                                response.data[i].isValid !== undefined
                            ) {
                                this.dtFormList[l].fields[j].isValid = response.data[i].isValid !== undefined && !response.data[i].isValid ? false : true;
                            }

                            for (let k = 0; k < response.data[i].fields.length; k++) {
                                if (this.dtFormList[l].fields[j].name === response.data[i].fields[k].name) {
                                    if (response.data[i].fields[k].type !== undefined && this.dtFormList[l].fields[j].type !== response.data[i].fields[k].type) {
                                        this.dtFormList[l].fields[j].type = response.data[i].fields[k].type;
                                    }

                                    if (response.data[i].fields[k].value === '' && !response.data[i].fields[k].hasOwnProperty('readonly')) {
                                        emptyFields.push(this.dtFormList[l].fields[j].name);
                                        if (response.data[i].fields[k].label !== undefined) {
                                            this.dtFormList[l].fields[j].label = response.data[i].fields[k].label;
                                        }
                                        if (response.data[i].fields[k].onChangeApi !== undefined) {
                                            this.dtFormList[l].fields[j].onChangeApi = response.data[i].fields[k].onChangeApi;
                                        }
                                        if (response.data[i].fields[k].icon !== undefined) {
                                            this.dtFormList[l].fields[j].icon = response.data[i].fields[k].icon;
                                        }
                                        if (response.data[i].fields[k].hidden !== undefined) {
                                            this.dtFormList[l].fields[j].hidden = response.data[i].fields[k].hidden;
                                        }
                                        if (
                                            response.data[i].fields[k].show !== null &&
                                            response.data[i].fields[k].show !== undefined &&
                                            response.data[i].fields[k].show !== '' &&
                                            !response.data[i].fields[k].hasOwnProperty('options')
                                        ) {
                                            this.dtFormList[l].fields[j].show = response.data[i].fields[k].show;
                                        }
                                    } else {
                                        if (response.data[i].fields[k].name == 'password') {
                                            const password = localStorage.getItem(`${location.href}_password`);
                                            this.dtFormList[l].fields[j].value = password;
                                        }
                                        if (response.data[i].fields[k].value !== undefined) {
                                            this.dtFormList[l].fields[j].value = response.data[i].fields[k].value;
                                        }
                                        if (response.data[i].fields[k].label !== undefined) {
                                            this.dtFormList[l].fields[j].label = response.data[i].fields[k].label;
                                        }
                                        if (response.data[i].fields[k].onChangeApi !== undefined) {
                                            this.dtFormList[l].fields[j].onChangeApi = response.data[i].fields[k].onChangeApi;
                                        }
                                        if (response.data[i].fields[k].icon !== undefined) {
                                            this.dtFormList[l].fields[j].icon = response.data[i].fields[k].icon;
                                        }
                                        if (response.data[i].fields[k].hidden !== undefined) {
                                            this.dtFormList[l].fields[j].hidden = response.data[i].fields[k].hidden;
                                        }

                                        if (
                                            response.data[i].fields[k].show !== null &&
                                            response.data[i].fields[k].show !== undefined &&
                                            response.data[i].fields[k].show !== '' &&
                                            !response.data[i].fields[k].hasOwnProperty('options')
                                        ) {
                                            this.dtFormList[l].fields[j].show = response.data[i].fields[k].show;
                                        }

                                        if (response.data[i].fields[k].hasOwnProperty('options')) {
                                            this.dtFormList[l].fields[j].options = response.data[i].fields[k].options;
                                        }
                                        if (response.data[i].fields[k].hasOwnProperty('onFocus') && response.data[i].fields[k].onFocus === 'geolocate()') {
                                            this.updateAddress = response.data[i].fields[k];
                                        }
                                        if (response.data[i].fields[k].hasOwnProperty('readonly')) {
                                            /** set address */
                                            this.dtFormList[l].fields[j].readonly = response.data[i].fields[k].readonly;
                                        }
                                        if (response.data[i].fields[k].hasOwnProperty('options')) {
                                            if (response.data[i].fields[k].options.length === 1) {
                                                elems = document.getElementsByTagName('input');
                                                ele_len = elems.length;
                                                for (let m = 0; m < ele_len; m++) {
                                                    const tidx2 = elems[m].tabIndex;
                                                    if (tidx2 === tabindexfocus) {
                                                        elems[m].focus();
                                                        break;
                                                    }
                                                }
                                            } else if (response.data[i].fields[k].options.length > 1) {
                                                elems = document.getElementsByTagName('mat-select');

                                                ele_len = elems.length;
                                                let tidx2: number;
                                                for (let m = 0; m < ele_len; m++) {
                                                    for (let k = 1; k < elems[m].attributes.length; k++) {
                                                        setTimeout(() => {
                                                            if (elems[m].attributes[k].nodeName === 'tabindex') {
                                                                if (Number(elems[m].attributes[k].nodeValue) > 0) {
                                                                    tidx2 = Number(elems[m].attributes[k].nodeValue);
                                                                    if (tabindexfocus === tidx2) {
                                                                        for (let r = 0; r < this.mySelect.toArray().length; r++) {
                                                                            if (this.mySelect.toArray()[r].nativeElement.tabIndex === tabindexfocus) {
                                                                                this.mySelect.toArray()[r].nativeElement.click();
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }, 50);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                } else if (this.dtFormList[l].fields[j].name === onChangeFieldName) {
                                    this.dtFormList[l].fields[j].value = onChangeFieldValue;
                                    /** USE TO SET CLASS setInValid AND setValid */

                                    this.dtFormList[l].fields[j].isValid = validFieldValue;
                                }
                            }
                        }
                    }

                    if (emptyFields.length > 0) {
                        for (let s = 0; s < emptyFields.length; s++) {
                            const inputElement = <HTMLInputElement>document.getElementById(emptyFields[s]);
                            if (inputElement !== null) {
                                inputElement.value = '';
                            }
                            elems = document.getElementsByTagName('input');
                            ele_len = elems.length;
                            for (let m = 0; m < ele_len; m++) {
                                const tidx2 = elems[m].tabIndex;
                                if (tidx2 === tabindexfocus) {
                                    elems[m].focus();
                                }
                            }
                        }
                    }
                } // form update
            } // response data loop
            setTimeout(() => {
                if (tabindexfocus !== undefined && (tabindexfocus > 0 || tabindexfocus == -1)) {
                    this.setFieldFocus('', tabindexfocus);
                }
            }, 10);
        }
    }

    @Input()
    set recevemsg(response: any) {
        if (response === undefined || response === null) {
            return;
        } else {
            alert(response);
        }
    }
    @Input()
    set setBtnProperty(response: any) {
        if (response === undefined || response === null || response == '') {
            return;
        } else {
            const a = response.split('*');

            for (let i = 0; i < this.buttonresponseForm.length; i++) {
                if (this.buttonresponseForm[i].text === a[0]) {
                    this.buttonresponseForm[i].isEnabled = a[1];
                }
            }
        }
    }
    /** USE FOR SENDING DATA WHEN POPUP BUTTON TYPE IS SUBMIT IN PARENT COMPONENT  */
    @Input()
    set sendDataFromChild(response: any) {
        if (response === undefined || response === null || response === '') {
            return;
        } else if (response.sendDataFromChild) {
            this.submitAll(response.onPush);
        }
    }

    /** enable submit button  */
    @Input()
    set enableButton(response: any) {
        if (response == undefined || response == null || response == '') {
            return;
        } else if (response.length > 0) {
            for (let k = 0; k < response.length; k++) {
                //     const btnInd = this.buttonresponseForm.findIndex(x => (x.text == response[k].buttonstext || x.buttonType == response[k].buttonType));
                // if (btnInd >= 0) {

                //     this.buttonresponseForm[btnInd].isEnabled = response[k].isEnabled;
                // }

                const btnInd = this.buttonresponseForm.map((x, index) => {
                    if (x.buttonType == response[k].buttonType || x.text == response[k].buttonstext) {
                        return index;
                    }
                });

                for (let s = 0; s < btnInd.length; s++) {
                    if (btnInd[s] !== undefined) {
                        this.buttonresponseForm[btnInd[s]].isEnabled = response[k].isEnabled;
                    }
                }
            }
        }
    }

    @Input()
    set submitApiEntryGridMultipart(response: any) {
        if (response === undefined || response === null || response === '') {
            return;
        } else if (response) {
            this.apiEntryGridMultipart = response;
        }
    }

    @Input()
    set clearSignatureMultiPart(response: any) {
        if (response === undefined || response === null || response === '') {
            return;
        } else if (response) {
            this.clearPad();
        }
    }

    setOption(response: any) {
        for (let i = 0; i < response.length; i++) {
            if (response[i].type === 'text' && response[i].name == 'loginid') {
                if (response[i].rememberMe) {
                    this.isRemembar = true;
                }
                const username = localStorage.getItem(`${location.href}_username`);
                response[i].value = username;
                if (username != undefined && username != null && username != '') {
                    this.isChecked = true;
                    localStorage.setItem(`${location.href}_isRemember`, 'true');
                } else {
                    this.isChecked = false;
                    localStorage.setItem(`${location.href}_isRemember`, 'false');
                }
            }
            // HOLD DATA ON INITIAL LOAD 27 dec 2021
            if (response[i].type === 'radio') {
                for (let j = 0; j < response[i].options.length; j++) {
                    if (response[i].options[j].checked || response[i].options[j].selected) {
                        this.practiceCode = response[i].options[j].value;
                    }
                }
                this.alignment = response[i].alignment === undefined ? '' : response[i].alignment;
            }
            // SET isValid property for all form controls
            response[i].isValid = true;

            if (response[i].type !== undefined && response[i].type == 'signature') {
                this.canvasHeight = response[i].height;

                this.isSignature = true;
            }
            if (response[i].type == 'date') {
                this.setDateField.push({
                    name: response[i].name,
                    value: response[i].value,
                });
            }
        }
        return response;
    }

    setSelectOption(response: any) {
        for (let i = 0; i < response.length; i++) {
            if (response[i].type === 'select') {
                for (let j = 0; j < response[i].options.length; j++) {
                    if (response[i].options[j].selected) {
                        return response[i].options[j].value;
                    }
                }
                return response[i].options[0].value;
            }
        }
    }

    setFieldFocus(tabindex: any, tabindexfocus: Number = 0, addressFocus?: boolean) {
        let foundElement = false;
        const elemsInput = document.getElementsByTagName('input');
        const ele_len = elemsInput.length;
        const elemsSel = document.getElementsByTagName('mat-select');
        const selectLen = elemsSel.length;
        // tslint:disable-next-line: prefer-const
        let tidxSelect: any;
        let currentSelIndex: any;
        let currentTabInd;
        let focusSet = false;
        /** FOCUS TO BE SET ON NEXT ENABLE CONTROL */

        if (tabindexfocus === 0) {
            for (let m = 0; m < ele_len; m++) {
                const tidx2 = elemsInput[m].tabIndex;
                if (addressFocus !== undefined && addressFocus && tidx2 == tabindex) {
                    setTimeout(
                        (index) => {
                            elemsInput[index].focus();
                        },
                        500,
                        m
                    );
                }
                if (addressFocus == undefined && tidx2 === tabindex + 1 && elemsInput[m].disabled) {
                    tabindex++;
                }
                if (addressFocus == undefined && tidx2 === tabindex + 1) {
                    if (!elemsInput[m].disabled) {
                        setTimeout(
                            (index) => {
                                elemsInput[index].focus();
                                focusSet = true;
                            },
                            500,
                            m
                        );

                        break;
                    }
                }
            }

            setTimeout(() => {
                if (!focusSet && addressFocus == undefined) {
                    let kk = 0;

                    for (let mm = 0; mm < selectLen; mm++) {
                        if (elemsSel[mm].getAttribute('tabindex') === tabindex) {
                            kk = mm;
                        }
                    }
                    for (let m = 0; m < selectLen; m++) {
                        if (m >= kk && elemsSel[m].getAttribute('aria-disabled') == 'true') {
                            tabindex++;
                        }

                        if (elemsSel[m].getAttribute('tabindex') == tabindex + 1) {
                            foundElement = true; // indexTouse
                            currentSelIndex = m;
                            currentTabInd = tidxSelect;
                        }
                    }
                }
            }, 700);

            setTimeout(() => {
                if (foundElement && addressFocus == undefined) {
                    for (let k = 1; k < elemsSel[currentSelIndex].attributes.length; k++) {
                        if (elemsSel[currentSelIndex].attributes[k].nodeName === 'aria-disabled') {
                            if (JSON.parse(elemsSel[currentSelIndex].attributes[k].nodeValue) === false) {
                                for (let r = 0; r < this.mySelect.toArray().length; r++) {
                                    if (this.mySelect.toArray()[r].nativeElement.id === 'mat-select-' + currentSelIndex) {
                                        this.mySelect.toArray()[r].nativeElement.click();
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }, 800);
        } else if (tabindexfocus == -1) {
            let setFocus = false;
            const enableTabIndex = this.enableTabIndex;
            for (let m = 0; m < ele_len; m++) {
                if (!elemsInput[m].disabled && elemsInput[m].type !== 'radio' && elemsInput[m].type !== 'select' && elemsInput[m].tabIndex > enableTabIndex) {
                    elemsInput[m].focus();
                    setFocus = true;
                    // ADDED TO ADD TABBED CLASS ON TYPE SWITCH
                    if (elemsInput[m].type == 'checkbox') {
                        this.isCheckBoxFocus = true;
                    }
                    break;
                } else if (!elemsInput[m].disabled && elemsInput[m].type == 'radio' && elemsInput[m].checked && elemsInput[m].tabIndex > enableTabIndex) {
                    elemsInput[m].focus();
                    setFocus = true;
                    break;
                }
            }
            if (!setFocus) {
                const elemsInput = elemsSel;
                for (let m = 0; m < selectLen; m++) {
                    for (let k = 1; k < elemsInput[m].attributes.length; k++) {
                        setTimeout(() => {
                            if (elemsInput[m].attributes[k].nodeName === 'tabindex') {
                                if (Number(elemsInput[m].attributes[k].nodeValue) > 0) {
                                    const tidx2 = Number(elemsInput[m].attributes[k].nodeValue);
                                    if (tidx2 > enableTabIndex) {
                                        for (let r = 0; r < this.mySelect.toArray().length; r++) {
                                            if (this.mySelect.toArray()[r].nativeElement.tabIndex > enableTabIndex) {
                                                this.mySelect.toArray()[r].nativeElement.click();
                                            }
                                        }
                                    }
                                }
                            }
                        }, 50);
                    }
                }
            }
        } else {
            let setFocus = false;
            for (let m = 0; m < ele_len; m++) {
                if (elemsInput[m].type !== 'radio' && elemsInput[m].type !== 'select' && elemsInput[m].tabIndex === tabindexfocus) {
                    elemsInput[m].disabled = false;
                    elemsInput[m].focus();
                    setFocus = true;
                    // ADDED TO ADD TABBED CLASS ON TYPE SWITCH
                    if (elemsInput[m].type == 'checkbox') {
                        this.isCheckBoxFocus = true;
                    }
                    break;
                } else if (elemsInput[m].type == 'radio' && elemsInput[m].checked && elemsInput[m].tabIndex === tabindexfocus) {
                    elemsInput[m].disabled = false;
                    elemsInput[m].focus();
                    setFocus = true;
                    break;
                }
            }
            if (!setFocus) {
                // for (let m = 0; m < selectLen; m++) {
                const elemsInput = elemsSel;
                for (let m = 0; m < selectLen; m++) {
                    for (let k = 1; k < elemsInput[m].attributes.length; k++) {
                        setTimeout(() => {
                            if (elemsInput[m].attributes[k].nodeName === 'tabindex') {
                                if (Number(elemsInput[m].attributes[k].nodeValue) > 0) {
                                    const tidx2 = Number(elemsInput[m].attributes[k].nodeValue);
                                    if (tabindexfocus === tidx2) {
                                        for (let r = 0; r < this.mySelect.toArray().length; r++) {
                                            if (this.mySelect.toArray()[r].nativeElement.tabIndex === tabindexfocus) {
                                                this.mySelect.toArray()[r].nativeElement.click();
                                            }
                                        }
                                    }
                                }
                            }
                        }, 50);
                    }
                }
            }
        }
    }

    onTabPress(e) {
        // BACK TAB arrow up and arrow down ON ADDRESS FIELD
        // 38 up arrow key
        // 40 down array key
        if ((e.shiftKey && e.key == 'Tab') || e.keyCode == 38 || e.keyCode == 40) {
            const streetAddressinputElement = <HTMLInputElement>document.getElementById(this.addressInputId);
            if (streetAddressinputElement !== null) {
                streetAddressinputElement.value = this.streetAddress;
            }
        }
    }

    getAddress(place: object) {
        this.address = place['formatted_address'];
        this.formattedAddress = place['formatted_address'];
        this.customAddress(place);
        this.zone.run(() => (this.formattedAddress = place['formatted_address']));
    }
    getManualAddress(event: any) {
        //  get manual address
        this.setStreetNumberArr = [];

        this.manualAddressFieldNameArr.push(event.name);
        this.addressFieldNameArr.push(event.name);

        this.setStreetNumber = event.value;
        this.setStreetNumberArr.push(this.setStreetNumber);
    }
    customAddress(place: any) {
        // google autocom

        const addressLen = place.address_components.length;

        this.streetAddress = '';
        this.street_number = undefined;
        this.divId = place.divIds.div_id;
        this.addressInputId = place.divIds.addressInputId;

        // To unset locality when city is not coming

        this.locality = '';
        this.route = '';
        this.street_number = '';
        this.administrative_area_level_1 = '';
        this.postal_code = '';
        this.postal_code_suffix = '';
        this.county = '';
        this.country = '';

        for (let i = 0; i < addressLen; i++) {
            if (place.address_components[i].types[0] === environment.street_number) {
                this.street_number = place.address_components[i].long_name;
            } else if (place.address_components[i].types[0] === environment.route) {
                this.route = place.address_components[i].long_name;
            } else if (place.address_components[i].types[0] === environment.locality || place.address_components[i].types.indexOf('sublocality') >= 0) {
                // City field
                this.locality = place.address_components[i].long_name;
            } else if (place.address_components[i].types[0] === environment.administrative_area_level_2) {
                this.county = place.address_components[i].short_name;
            } else if (place.address_components[i].types[0] === environment.administrative_area_level_1) {
                this.administrative_area_level_1 = place.address_components[i].short_name;
            } else if (place.address_components[i].types[0] === environment.country) {
                this.country = place.address_components[i].short_name;
            } else if (place.address_components[i].types[0] === environment.postal_code) {
                this.postal_code = place.address_components[i].long_name;
            } else if (place.address_components[i].types[0] === environment.postal_code_suffix) {
                this.postal_code_suffix = place.address_components[i].long_name;
                if (this.country === environment.countryUS) {
                    this.postal_code = this.postal_code + '-' + place.address_components[i].long_name;
                } else {
                    this.postal_code = this.postal_code + ' ' + place.address_components[i].long_name;
                }
            }
        }
        // SET STREET ADDRESS IN ARRAY provided by google
        this.streetNumberArr.push(this.street_number);
        // CHECK STREET NUMBER IS SET BY USER

        const checkStreetNumber = this.setStreetNumber;
        let setStreetByUser;
        if (checkStreetNumber !== undefined) {
            setStreetByUser = checkStreetNumber.split(' ');
        }
        let sendToApi;
        if (setStreetByUser !== undefined && setStreetByUser.length !== 0) {
            sendToApi = setStreetByUser[0];
        }
        // CHECK FOR DUBLICACY
        const manualStreetNum = this.route.split(' ');
        if (
            this.street_number === undefined &&
            manualStreetNum !== undefined &&
            manualStreetNum.length !== 0 &&
            setStreetByUser !== undefined &&
            manualStreetNum[0].toLowerCase() !== setStreetByUser[0].toLowerCase()
        ) {
            this.street_number = sendToApi;
        } else {
            this.street_number = this.street_number;
        }
        this.streetAddress = (this.street_number !== '' && this.street_number !== undefined ? this.street_number + ' ' : '') + this.route;

        const streetAddressinputElement = <HTMLInputElement>document.getElementById(this.addressInputId);
        streetAddressinputElement.value = this.streetAddress;
        this.addressFieldsValueArr.push(this.streetAddress);
        const cityOptions = [{ show: this.locality, value: this.locality, selected: true }];
        let checkaddress = false;

        let dataElem: any;
        const addressProp = {
            city_name: '',
            address_name: '',
            state_name: '',
            zip_name: '',
            country_name: '',
            county_name: '',
        };

        const addressArr = [];
        for (let j = 0; j < this.dtFormList[this.divId].fields.length; j++) {
            if (this.dtFormList[this.divId].fields[j].isCity) {
                addressProp.city_name = this.dtFormList[this.divId].fields[j].name;
            } else if (this.dtFormList[this.divId].fields[j].isAddress) {
                addressProp.address_name = this.dtFormList[this.divId].fields[j].name;
                this.addressFieldName = this.dtFormList[this.divId].fields[j].name;
                this.addressFieldNameArr.push(this.addressFieldName);
            } else if (this.dtFormList[this.divId].fields[j].isState) {
                addressProp.state_name = this.dtFormList[this.divId].fields[j].name;
            } else if (this.dtFormList[this.divId].fields[j].isZip) {
                checkaddress = true;
                addressProp.zip_name = this.dtFormList[this.divId].fields[j].name;
            } else if (this.dtFormList[this.divId].fields[j].isCountry) {
                addressProp.country_name = this.dtFormList[this.divId].fields[j].name;
            } else if (this.dtFormList[this.divId].fields[j].isCounty) {
                addressProp.county_name = this.dtFormList[this.divId].fields[j].name;
            }
        }
        addressArr.push(addressProp);
        dataElem = {
            data: addressArr,
        };

        this.bindAddressElements(dataElem, cityOptions, streetAddressinputElement.tabIndex);
    }

    bindAddressElements(dataElem: any, cityOptions: any, tabindex?) {
        /* tabindex to used for setting focus to address element */
        const missedTabIndex = [];
        for (let j = 0; j < this.dtFormList[this.divId].fields.length; j++) {
            let missedFlag = true;
            for (let k = 0; k < dataElem.data.length; k++) {
                if (dataElem.data[k].city_name === this.dtFormList[this.divId].fields[j].name) {
                    this.dtFormList[this.divId].fields[j].value = this.locality;
                    this.dtFormList[this.divId].fields[j].options = cityOptions;

                    missedFlag = this.locality == '';
                } else if (dataElem.data[k].address_name === this.dtFormList[this.divId].fields[j].name) {
                    this.dtFormList[this.divId].fields[j].value = this.streetAddress;

                    missedFlag = this.streetAddress == '';
                } else if (dataElem.data[k].state_name === this.dtFormList[this.divId].fields[j].name) {
                    this.dtFormList[this.divId].fields[j].value = this.administrative_area_level_1;

                    missedFlag = this.administrative_area_level_1 == '';
                } else if (dataElem.data[k].zip_name === this.dtFormList[this.divId].fields[j].name) {
                    this.dtFormList[this.divId].fields[j].value = this.postal_code;

                    missedFlag = this.postal_code == '';
                } else if (dataElem.data[k].country_name === this.dtFormList[this.divId].fields[j].name) {
                    this.dtFormList[this.divId].fields[j].value = this.country;

                    missedFlag = this.country == '';
                } else if (dataElem.data[k].county_name === this.dtFormList[this.divId].fields[j].name) {
                    this.dtFormList[this.divId].fields[j].value = this.county;

                    missedFlag = this.county == '';
                }
            }

            if (missedFlag && this.dtFormList[this.divId].fields[j].tabindex) {
                missedTabIndex.push(this.dtFormList[this.divId].fields[j].tabindex);
            }
        }

        if (missedTabIndex.length) {
            this.setFieldFocus(missedTabIndex[missedTabIndex.length - 1], 0, true);
        } else {
            this.setFieldFocus(tabindex, 0, true);
        }
    }

    getNameValue(name: string, value: any, focus: any) {
        if (focus === 'geolocate()' && value !== '' && value !== undefined && value !== null) {
            this.addressFieldNameArr.push(name);
        } else {
            return;
        }
    }
    playAudio() {
        if (window.location.href.includes('localhost')) {
            this.audio.src = '../../assets/audio/tone.wav';
        } else {
            this.audio.src = this.baseUrl + this.soundFilePath + '/assets/audio/tone.wav';
        }

        this.audio.load();
        const playPromise = this.audio.play();
        this.handleAudioError(playPromise);
    }

    stopAudio() {
        this.audio.src = '';
        this.audio.load();
        const playPromise = this.audio.play();
        this.handleAudioError(playPromise);
    }

    handleAudioError(playPromise: any) {
        if (playPromise !== undefined) {
            playPromise
                .then(function () {
                    // Automatic playback started!
                })
                .catch(function (error) {
                    // Automatic playback failed.
                    // Show a UI element to let the user manually start playback.
                });
        }
    }
    handleShowBusy(url) {
        const property = this._dynamoService.getValue(url, 'showBusy');
        if (property) {
            this.loader = environment.displayBlock;
        }
        const showBusyText = this._dynamoService.getValueShowBusyText(url, 'showBusyText');
        if (showBusyText !== undefined && showBusyText.length > 0) {
            this.showBusyText = showBusyText.replaceAll('+', ' ');
        }
    }
    navChangedHandlerForm(url: string) {
        sessionStorage.setItem('entryGridDataArr', '');
        sessionStorage.setItem('setEntryGrid', '');
        sessionStorage.setItem('gridRefNumber', '');
        sessionStorage.setItem('detectChangeEntryGrid', '');
        this.handleShowBusy(url);

        let NotNotify = false;

        let checkChange = false;
        let showPopupData = false;
        let isMultiPart = false;
        /** CHECK FIELDS IN FORM IF CHANGED ADD formChange Parameter In Query String */
        checkChange = !this.isValidSubmit ? this.checkFormChange() : false;

        if (url.includes('?')) {
            url = url + '&formChanges=' + encodeURIComponent(checkChange);
        } else {
            url = url + '?formChanges=' + encodeURIComponent(checkChange);
        }
        this._dtFormServices.getDetails(url).subscribe(
            (response) => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].type === 'notify') {
                        if (response.data[i].redirectUrl != undefined && response.data[i].redirectUrl) {
                            window.location.href = response.data[i].redirectUrl;
                            return;
                        }
                        this.handleNotify(response.data[i]);
                    } else if (response.data[i].type === 'pageInit') {
                        if (response.data[i].clearPage) {
                            this.buttonresponseForm = [];
                            this.formsNavigation = '';
                            this.formsNavigationCss = environment.displayNone;
                            sessionStorage.setItem('desableTab', 'false');
                        }
                    } else if (response.data[i].type === 'popup') {
                        showPopupData = true;
                        NotNotify = true;
                    } else if (response.data[i].type === 'form') {
                        if (response.data[i].formSubmit) {
                            sessionStorage.setItem('formState', JSON.stringify(response));
                            sessionStorage.setItem('getFormState', JSON.stringify(true));
                        }
                        NotNotify = true;
                    } else if (response.data[i].type === 'multiPartForm') {
                        sessionStorage.setItem('entryGridDataArr', '');
                        sessionStorage.setItem('setEntryGrid', '');
                        sessionStorage.setItem('gridRefNumber', '');
                        NotNotify = true;
                        isMultiPart = true;
                    }
                }
                if (NotNotify && !showPopupData && !isMultiPart) {
                    this.displayForm(response);
                }
                if (showPopupData && NotNotify) {
                    this.handleFormDataInParent.emit(response);
                }

                if (isMultiPart && NotNotify) {
                    setTimeout(() => {
                        this.handleFormDataInParent.emit(response);
                    }, 500);
                }

                this.loader = environment.displayNone;
                this.showBusyText = '';
            },
            (error) => this.handleError(error)
        );
    }

    onChangeApi(event: any, changedValue: any, onChangeApi: string, dtForm: any, name: any, showBusyIndicator?: boolean, includeAllFields?: boolean) {
        // TO BE USED FOR -1 CASE
        if (event.target !== undefined && event.target.tabIndex !== undefined) {
            this.enableTabIndex = event.target.tabIndex;
        }
        this.responseDtFormDialog = '';
        this.showText = '';
        this.dialogWidth = '';
        this.navigatinresponseDialog = '';
        this.navigatinresponse = '';
        this.getDataGrid = false;
        sessionStorage.setItem('getFormState', JSON.stringify(false));
        if (!showBusyIndicator) {
            this.loader = environment.displayNone;
        } else {
            this.loader = environment.displayBlock;
        }

        if (onChangeApi === '') {
            return false;
        } else {
            this.getName = name;
            this.getdtFormData = dtForm;
            /**  CHECK FOR includeAllFields IF TRUE SUBMIT ALL DATA WITH FORM BY MAKING POST REQUEST */
            if (includeAllFields !== undefined && includeAllFields !== null && includeAllFields) {
                // MAKING POST REQUEST
                this.submitData(onChangeApi);
            } else {
                this._dtFormServices.onChangeApi(onChangeApi).subscribe(
                    (res) => {
                        this.loader = environment.displayNone;
                        if (res === undefined || res == null) {
                            return false;
                        } else {
                            for (let i = 0; i < res.data.length; i++) {
                                if (res.data[i].type === 'notify') {
                                    if (res.data[i].alert !== undefined && res.data[i].alert !== null) {
                                        if (res.data[i].soundNotification) {
                                            this.playAudio();
                                            this.setmessage = res.data[i];
                                            setTimeout(() => {
                                                this.stopAudio();
                                            }, res.data[i].soundTime);
                                        } else {
                                            this.setmessage = res.data[i];
                                        }
                                    } else if (res.data[i].msg !== undefined || res.data[i].alert !== undefined) {
                                        this.getClickApival = '';
                                        this.getOnChangeApi = '';
                                        this.setmessage = res.data[i];
                                    }
                                    if (res.data[i].success && res.data[i].showMenu) {
                                        const eventMenu = {
                                            push_redirect: '',
                                            showMenu: res.data[i].showMenu,
                                        };
                                        this.message.emit(eventMenu);
                                    }
                                }
                                if (res.data[i].type === 'pageInit') {
                                    if (res.data[i].clearPage) {
                                        this.buttonresponseForm = [];
                                        this.formsNavigation = '';
                                        this.formsNavigationCss = environment.displayNone;
                                        sessionStorage.setItem('desableTab', 'false');
                                    }
                                }
                                if (res.data[i].type === 'expander') {
                                    // send from display form to multipart
                                    this.setExpanderFromApi.emit(res);
                                }
                                if (res.data[i].type === 'popup') {
                                    this.buttonresponseDialog = [];
                                    for (let k = 0; k < res.data.length; k++) {
                                        if (res.data[k].type === 'displayView') {
                                            this.displayViewresponseDialog = res;
                                        } else if (res.data[k].type === 'displayGrid') {
                                            this.displaySubGridrespDialog = res.data[k];

                                            if (res.data[k].navigation !== undefined) {
                                                this.navigationcssDialog = environment.displayBlock;
                                                this.navigatinresponseDialog = res.data[k].navigation;
                                            } else {
                                                this.navigationcssDialog = environment.displayNone;
                                            }
                                        } else if (res.data[k].type === 'form') {
                                            this.responseDtFormDialog = res;
                                            this.showEnterKey = res.data[k].enterKeySubmits;
                                        } else if (res.data[k].type === 'popup') {
                                            this.mainPopuptitle = res.data[i].title;
                                            this.showClose = res.data[i].showClose;
                                            this.popup_width = res.data[i].width;
                                            this.popup_zindex = res.data[i].zindex;
                                            this.popupMaxHeight = res.data[k].maxHeight;
                                            this.show_popup = environment.displayBlock;
                                            this.popup_top = res.data[i].top;
                                            this.onCloseRedirect = res.data[i].onCloseRedirect;
                                            this.onCloseApi = res.data[i].onCloseApi;
                                            this.setparam = res.data[i].action;
                                        } else if (res.data[k].type === 'button') {
                                            this.buttonresponse = res.data[k];
                                        } else if (res.data[i].type === 'notify') {
                                            if (res.data[i].alert !== undefined || res.data[i].msg !== undefined) {
                                                this.getClickApival = '';
                                                this.getOnChangeApi = '';
                                                this.setmessage = res.data[i];
                                            }
                                            if (res.data[i].success && res.data[i].showMenu) {
                                                const eventPush = {
                                                    push_redirect: '',
                                                    showMenu: res.data[i].showMenu,
                                                };
                                                this.message.emit(eventPush);
                                            }
                                        }
                                    }
                                    this.show_popup = environment.displayBlock;
                                    this.popUpCloseApi = res.closePopupAPI;

                                    return false;
                                }

                                if (res === null) {
                                    return false;
                                } else {
                                    if (res.data[i].type === 'form' || res.data[i].type === 'formUpdate') {
                                        if (res.data[i].formSubmit) {
                                            sessionStorage.setItem('formState', JSON.stringify(res));
                                            sessionStorage.setItem('getFormState', JSON.stringify(true));
                                        }

                                        if (res.data[i].fields && res.data[i].fields.some((field) => !field.hidden) == true) {
                                            res.data[i].isValid = true;
                                        }

                                        this.displayForm(res, res.data[i].type, changedValue, name);
                                    } else if (res.data[i].type === 'pageInit') {
                                        if (res.data[i].clearPage) {
                                            this.buttonresponseForm = [];
                                            sessionStorage.setItem('desableTab', 'false');
                                        }
                                    } else if (res.data[i].type === 'setup') {
                                        this.customerNameInHeader = res.data[i].customerName;
                                        const action = res.data[i].action;
                                        const onPush = res.data[i].onPush;
                                        const customerIcon = res.data[i].customerIcon !== undefined ? res.data[i].customerIcon : '';
                                        const showMenu = res.data[i].showMenu;
                                        this.setCustomerName(action, onPush, showMenu, customerIcon);
                                    } else if (res.data[i].type === 'multiPartForm') {
                                        sessionStorage.setItem('entryGridDataArr', '');
                                        sessionStorage.setItem('setEntryGrid', '');
                                        sessionStorage.setItem('gridRefNumber', '');

                                        this.handleFormDataInParent.emit(res);
                                    } else if (res.data[i].type === 'displayGrid' || res.data[i].type === 'displayView') {
                                        this.handleFormDataInParent.emit(res);
                                    }
                                }
                            }
                        }
                    },
                    (error) => {
                        this.getClickApival = '';
                        this.getOnChangeApi = '';

                        this.loader = environment.displayNone;
                        if (error.error.data !== undefined) {
                            for (let i = 0; i < error.error.data.length; i++) {
                                if (error.error.data[i].type === 'notify') {
                                    this.handleNotify(error.error.data[i]);
                                }
                            }
                        } else if (error.message !== undefined) {
                            alert(error.message);
                        } else {
                            if (error.error.alert !== undefined) {
                                this.setmessage = error.error;
                            } else {
                                toast(error.statusText, Number(sessionStorage.getItem('toastTimeOut')));
                            }
                        }
                    }
                );
            }
        }
    }

    submitData(submitApi: string) {
        const data = [];
        const NotNotify = false;
        for (let m = 0; m < this.dtFormList.length; m++) {
            for (let n = 0; n < this.dtFormList[m].fields.length; n++) {
                data.push({
                    name: this.dtFormList[m].fields[n].name,
                    value:
                        this.dtFormList[m].fields[n].value == 'true' || this.dtFormList[m].fields[n].value == 'false'
                            ? JSON.parse(this.dtFormList[m].fields[n].value)
                            : this.dtFormList[m].fields[n].value,
                    readonly: this.dtFormList[m].fields[n].readonly ? this.dtFormList[m].fields[n].readonly : false,
                });
            }
        }
        // HANDLE VALUE OF ADDRESS COMPONENT
        if (this.addressFieldNameArr.length > 0) {
            this.addressFieldNameArr.splice(0, this.addressFieldNameArr.length, ...new Set(this.addressFieldNameArr));

            for (let m = 0; m < this.addressFieldNameArr.length; m++) {
                const fieldValue = <HTMLInputElement>document.getElementById(this.addressFieldNameArr[m]);

                data.push({
                    name: this.addressFieldNameArr[m],
                    value: fieldValue.value,
                });
            }
        }

        const pcols = {
            type: 'formData',
            cc: this.cc,
            ddname: this.ddname,
            hexkey: this.hexkey,
            viewid: this.viewid,
            fields: data,
        };
        // FORMAT REQUIRED
        const data_grid = {
            data: [],
        };

        const data_to_insert = data_grid.data.length;
        data_grid.data[data_to_insert] = pcols;
        this.handleShowBusy(submitApi);
        this._dtFormServices.sendData(data_grid, submitApi).subscribe(
            (response) => {
                this.loader = environment.displayNone;
                if (response === null || response === undefined) {
                    return false;
                } else {
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].type === 'pageInit') {
                            if (response.data[i].clearPage) {
                                /** UNSET VARIABLE IN PARENT COMPONENT */
                                this.hideButtonInParent();
                                sessionStorage.setItem('desableTab', 'false');
                            }
                        } else if (response.data[i].type === 'displayGrid') {
                            this.displayGridRespPage = response.data[i];

                            if (response.data[i].navigation !== undefined) {
                                this.navigationcssPage = environment.displayBlock;
                                this.navigationresPage = response.data[i].navigation;
                            } else {
                                this.navigationcssPage = environment.displayNone;
                            }

                            if (response.data[i].extraButton !== undefined) {
                                this.extraButton = response.data[i].extraButton;
                            }
                        } else if (response.data[i].type === 'formUpdate' || response.data[i].type === 'form') {
                            if (response.data[i].formSubmit) {
                                sessionStorage.setItem('formState', JSON.stringify(response));
                                sessionStorage.setItem('getFormState', JSON.stringify(true));
                            }
                            this.displayForm(response, response.data[i].type);
                        } else if (response.data[i].type === 'entryGrid') {
                            this.responseEditGrid = response.data[i];
                        } else if (response.data[i].type === 'setup') {
                            this.customerNameInHeader = response.data[i].customerName;
                            this.show_popup = environment.displayNone;
                            const action = response.data[i].action;
                            const onPush = response.data[i].onPush;
                            const showMenu = response.data[i].showMenu;
                            this.setCustomerName(action, onPush, showMenu);
                        } else if (response.data[i].type === 'action') {
                            this.handleAction(response.data[i]);
                        } else if (response.data[i].type === 'notify') {
                            this.showTextPage = '';
                            this.showTitlePage = '';
                            this.fileExtensionsPage = '';

                            this.isMultiplePage = '';
                            this.extensionTextPage = '';
                            this.buttonresponseForm = [];
                            if (response.data[i].redirectUrl != undefined && response.data[i].redirectUrl) {
                                window.location.href = response.data[i].redirectUrl;
                                return;
                            }
                            this.handleNotify(response.data[i]);
                        } else if (response.data[i].type === 'multiPartForm') {
                            this.handleFormDataInParent.emit(response);
                        } else if (response.data[i].type !== 'popup') {
                            this.show_popup = environment.displayNone;
                        } else if (response.data[i].type === 'popup') {
                            this.buttonresponseDialog = [];

                            for (let k = 0; k < response.data.length; k++) {
                                if (response.data[k].type === 'displayView') {
                                    this.displayViewresponseDialog = response;
                                } else if (response.data[k].type === 'displayGrid') {
                                    this.displaySubGridrespDialog = response.data[k];
                                    if (response.data[k].navigation !== undefined) {
                                        this.navigationcssDialog = environment.displayBlock;
                                        this.navigatinresponseDialog = response.data[k].navigation;
                                    } else {
                                        this.navigationcssDialog = environment.displayNone;
                                    }
                                } else if (response.data[k].type === 'form') {
                                    this.responseDtFormDialog = response;
                                    this.showEnterKey = response.data[k].enterKeySubmits;
                                } else if (response.data[k].type === 'multiPartForm') {
                                    this.show_popup = environment.displayNone;
                                    this.isMultiPart = true;
                                    this.handleFormDataInParent.emit(response);
                                } else if (response.data[k].type === 'popup') {
                                    this.mainPopuptitle = response.data[k].title;
                                    this.showClose = response.data[k].showClose;
                                    this.popup_width = response.data[k].width;
                                    this.popup_height = response.data[k].height;
                                    this.popup_zindex = response.data[k].zindex;
                                    this.popupMaxHeight = response.data[k].maxHeight;
                                    this.show_popup = environment.displayBlock;
                                    this.popup_top = response.data[k].top;
                                    this.onCloseRedirect = response.data[k].onCloseRedirect;
                                    this.onCloseApi = response.data[k].onCloseApi;
                                    this.setparam = response.data[k].action;
                                } else if (response.data[k].type === 'dialog') {
                                    this.showText = response.data[k].text;
                                    this.dialogWidth = response.data[k].dialogWidth !== undefined ? response.data[k].dialogWidth : '40%';
                                    this.showDialog = true;
                                    this.displaySubGridrespDialog = false;
                                    this.displayViewresponseDialog = false;
                                } else if (response.data[k].type === 'button') {
                                    this.buttonresponseDialog.push(response.data[k]);
                                    this.show_popup = environment.displayBlock;
                                } else if (response.data[k].hasOwnProperty('buttons') && !this.isMultiPart) {
                                    for (let i = 0; i < response.data[k].buttons.length; i++) {
                                        this.buttonresponseDialog.push(response.data[k].buttons[i]);
                                    }
                                    this.show_popup = environment.displayBlock;
                                }
                            }

                            this.popUpCloseApi = response.closePopupAPI;
                            return false;
                        } else if (response.data[i].type === 'notify') {
                            if (response.data[i].redirectUrl != undefined && response.data[i].redirectUrl) {
                                window.location.href = response.data[i].redirectUrl;
                                return;
                            }
                            this.handleNotify(response.data[i]);
                        }
                    }
                }
            },
            (error) => this.handleError(error)
        );
    }
    showExpansionPanel(response: any) {
        this.expansionPanelData = response;
    }
    getChangeFormData(response: any, name: string) {
        const mdata = [];
        for (let j = 0; j < this.dtFormList.length; j++) {
            const data = [];
            for (let i = 0; i < this.dtFormList[j].fields.length; i++) {
                const setForm = {
                    fields: this.setFiledsData(this.dtFormList[j].fields[i], response, name),
                };
                data.push(setForm.fields);
            }
            const setAllForm = {
                divclass: this.dtFormList[j].divclass,
                fields: data,
                section: this.dtFormList[j].section,
            };
            mdata.push(setAllForm);
        }

        this.dtFormList = mdata;
    }

    setFiledsData(value: any, response: any, name: string) {
        const show_data = response.data[0].show;
        const show_value = response.data[0].value;

        const cols = {
            divclass: value.divclass,
            icon: value.icon,
            focus: value.name.toLocaleLowerCase() === name.toLocaleLowerCase() ? true : false,
            inputclass: value.inputclass,
            label: value.label,
            labelclass: value.labelclass,
            maxlength: value.maxlength,
            name: value.name,
            size: value.size,
            onChangeApi: value.onChangeApi,
            options: value.options,
            readonly: value.readonly,
            tabindex: value.tabindex,
            required: value.required,
            show: value.name.toLocaleLowerCase() === name.toLocaleLowerCase() ? show_data : value.show,
            type: value.type,
            value: value.name.toLocaleLowerCase() === name.toLocaleLowerCase() ? show_value : value.value,
        };
        return cols;
    }

    getVlaue(event: any, onChangeApi: string) {
        this.isBackward = false;
        this.getClickApival = event.currentTarget.value;
        this.getOnChangeApi = onChangeApi;
        if (event.shiftKey && event.key == 'Tab') {
            this.isBackward = true;
        } else if (!event.shiftKey && event.key == 'Tab') {
            this.isBackward = false;
        }
    }

    rebindEntryGrid(response: any) {
        for (let p = 0; p < response.data.length; p++) {
            if (response.data[p].type === 'pageInit') {
                if (response.data[p].clearPage) {
                    sessionStorage.setItem('desableTab', 'false');
                }
            } else if (response.data[p].type === 'entryGridRows' && response.data[p].body.length > 0) {
                this.updateEntryGrid = response;
            }
        }
    }
    setHeight(rows: any) {
        const setHeight = 1.75 * rows;
        return setHeight + 'rem';
    }

    getClickApi(event: any, getClickApival: any, changedValue: any, onChangeApi: string, dtForm: any, name: any, showBusyIndicator: boolean) {
        let api: string;
        let name_param: string;
        if (this.getClickApival.trim() === '') {
            api = onChangeApi;
        } else {
            if (onChangeApi.includes('?')) {
                name_param = '&name=';
            } else {
                name_param = '?name=';
            }
            api = onChangeApi + name_param + encodeURIComponent(name) + '&value=' + encodeURIComponent(this.getClickApival.trim());
        }

        this.onChangeApi(getClickApival, changedValue, api, dtForm, name, showBusyIndicator);
    }

    addClassOnDate(name) {
        /* let dateEle: any;
        dateEle = document.getElementById(name + 'label');
        dateEle.classList.add('active'); */
    }
    getChangeDate(e, dtfields) {
        let value;
        let d;
        if (e.shiftKey && e.key == 'Tab') {
            if (e.currentTarget.value == '') {
                d = dtfields.show.split('/')[2].replace(dtfields.show.split('/')[2], 2000);
                e.currentTarget.value = d + '-' + dtfields.show.split('/')[0] + '-' + dtfields.show.split('/')[1];
            }
            if (
                e.currentTarget.value !== undefined &&
                e.currentTarget.value.includes('-') &&
                e.currentTarget.value.split('-')[0].length == 4 &&
                e.currentTarget.value.split('-')[0].slice(0, 2) == '00'
            ) {
                if (e.currentTarget.value !== undefined && e.currentTarget.value !== 0 && e.currentTarget.value.split('-')[0] == '0001') {
                    value = 2000 + '-' + e.currentTarget.value.split('-')[1] + '-' + e.currentTarget.value.split('-')[2];
                }
                if (e.currentTarget.value.slice(0, 2) == '00') {
                    value = e.currentTarget.value.replace('00', 20);
                }

                const newValue = value.split('-')[0] + '-' + value.split('-')[1] + '-' + value.split('-')[2];
                const response = {
                    data: [
                        {
                            clearPage: false,
                            type: 'pageInit',
                        },
                        {
                            isValid: true,
                            type: 'formUpdate',
                            fields: [
                                {
                                    name: dtfields.name,
                                    value: newValue,
                                    show: newValue,
                                },
                            ],
                        },
                    ],
                };
                this.displayForm(response, 'formUpdate');
                return;
            }
        }
    }

    setCustomTime(event, degColumn, fromIcon: boolean = false) {
        const customTime = this._dynamoService.setCustomHourMinute(fromIcon, degColumn, event);
        if (customTime.formatValid) {
            const response = {
                data: [
                    {
                        clearPage: false,
                        type: 'pageInit',
                    },
                    {
                        isValid: true,
                        type: 'formUpdate',
                        tabindexfocus: degColumn.tabindex,
                        controlType: 'time',
                        name: degColumn.name,
                        fields: [
                            {
                                name: degColumn.name,
                                show: customTime.value,
                                value: customTime.value,
                                isValid: true,
                                type: 'time',
                            },
                        ],
                    },
                ],
            };

            // CHANGE VALUE OF fullTime.timepickerInput?._value 17 DEC 2021
            //  this.timepicker.timepickerInput._value = customTime.value;
            // this.timepicker = this.timepicker;
            //  this.customTime =  customTime.value;
            this.displayForm(response, 'formUpdate');
        } else {
            // SET FOCUS ON INVALID ELEMENT
            toast(customTime.validationMessage, Number(sessionStorage.getItem('toastTimeOut')));
            if (customTime.value == '0a:00 am') {
                customTime.value = 'am';
            } else if (customTime.value == '0p:00 pm') {
                customTime.value = 'pm';
            }
            const response = {
                data: [
                    {
                        clearPage: false,
                        type: 'pageInit',
                    },
                    {
                        isValid: false,
                        type: 'formUpdate',
                        tabindexfocus: degColumn.tabindex,
                        fields: [
                            {
                                name: degColumn.name,
                                show: customTime.value,
                                value: customTime.value,
                                focus: true,
                                isValid: false,
                            },
                        ],
                    },
                ],
            };

            this.displayForm(response, 'formUpdate');
            this.setFieldFocus(event.tabindex, 0, true);
        }
    }

    /** getFocusOut will call when we click tab in barcode */
    getFocusOut(
        event: any,
        value: string | boolean,
        onChangeApi: string,
        form: any,
        name: any,
        tabIndex: number,
        showBusyIndicator: boolean,
        type?: string,
        includeAllFields?: boolean,
        blur?: string,
        dtFields?,
        fromIcon?: boolean,
        errors?: any
    ) {
        let dataValidate: boolean = true;

        this.getDataGrid = false;
        let api: string;
        let name_param: string;

        if (type == 'number') {
            const response = {
                data: [
                    {
                        clearPage: false,
                        type: 'pageInit',
                    },
                    {
                        isValid: true,
                        type: 'formUpdate',
                        fields: [
                            {
                                name: name,
                                value: event.currentTarget.value,
                                show: event.currentTarget.value,
                            },
                        ],
                    },
                ],
            };
            this.displayForm(response, 'formUpdate');
        }

        // USED TO APPEND 00 TO YEAR 23 DEC 2021
        if (type == 'date') {
            if (event.currentTarget.value !== undefined && event.currentTarget.value !== 0 && event.currentTarget.value.split('-')[0] == '0001') {
                event.currentTarget.value = 2000 + '-' + event.currentTarget.value.split('-')[1] + '-' + event.currentTarget.value.split('-')[2];
            }
            if (event.currentTarget.value.slice(0, 2) == '00') {
                value = event.currentTarget.value.replace('00', 20);
            } else {
                value = event.currentTarget.value;
            }
            const response = {
                data: [
                    {
                        clearPage: false,
                        type: 'pageInit',
                    },
                    {
                        isValid: true,
                        type: 'formUpdate',
                        fields: [
                            {
                                name: name,
                                value: value,
                                show: value,
                            },
                        ],
                    },
                ],
            };
            if (event.currentTarget.value.slice(0, 2) == '00') {
                this.displayForm(response, 'formUpdate');
            }

            dataValidate = this.dateValidate(value, dtFields);
            // CALL DISPLAY FORM FUNCTION  // ADDED 22 DEC 2021
            const ind = this.setDateField.findIndex((x) => x.name == name);
            if (ind == -1) {
                this.setDateField.push({ name: name, value: value });
            } else {
                if (ind >= 0 && this.setDateField[ind].value !== value) {
                    this.setDateField[ind].value = value;
                } else if (ind >= 0 && this.setDateField[ind].value == value) {
                    return false;
                }
            }
            if (!dataValidate) {
                return false;
            }
        }

        if (onChangeApi === '' || onChangeApi === undefined) {
            // CALL FUNCTION TO SET NUMBER ACC TO NUMBER PIPE

            if (dtFields !== undefined && dtFields.type == 'number' && event.currentTarget.value !== '') {
                this.convertToDecimal(undefined, {
                    numberPipe: dtFields.numberPipe,
                    value: event.currentTarget.value,
                    isDecimal: dtFields.isDecimal,
                    name: dtFields.name,
                });
            } else if (dtFields !== undefined && dtFields.type == 'time') {
                this.setCustomTime(event, dtFields, fromIcon);
            }
            return;
        } else {
            this.loader = environment.displayNone;
            if (this.getClickApival === undefined) {
                api = onChangeApi;
            } else {
                if (onChangeApi.includes('?')) {
                    name_param = '&name=';
                } else {
                    name_param = '?name=';
                }
                if (type === 'radio' || type === 'switch' || type === 'select') {
                    api =
                        onChangeApi +
                        name_param +
                        encodeURIComponent(name) +
                        '&value=' +
                        encodeURIComponent(value) +
                        '&tabindex=' +
                        encodeURIComponent(tabIndex) +
                        '&isBackward=' +
                        encodeURIComponent(this.isBackward);
                } else {
                    value = type == 'date' && event.currentTarget.value.slice(0, 2) == '00' ? event.currentTarget.value.replace('00', 20) : event.currentTarget.value; // commented 22 dec 2021
                    // ADDED 22 DEC 2021
                    //  api = onChangeApi + name_param + name + '&value=' + event.currentTarget.value + '&tabindex=' + tabIndex + '&isBackward=' + this.isBackward;
                    api =
                        onChangeApi +
                        name_param +
                        encodeURIComponent(name) +
                        '&value=' +
                        encodeURIComponent(value) +
                        '&tabindex=' +
                        encodeURIComponent(tabIndex) +
                        '&isBackward=' +
                        encodeURIComponent(this.isBackward);
                }
            }

            this.onChangeApi(event, value, api, form, name, showBusyIndicator, includeAllFields);
        }
    }

    checkValueChange(dtFields, value) {
        for (let l = 0; l < this.dtFormList.length; l++) {
            for (let j = 0; j < this.dtFormList[l].fields.length; j++) {
                if (dtFields.type == 'date' && this.dtFormList[l].fields[j].type == 'date' && dtFields.name == this.dtFormList[l].fields[j].name && value !== this.dtFormList[l].fields[j].value) {
                    return true;
                }
            }
        }
        return false;
    }
    transformValue(value: any) {
        let newVal = value.split(':')[1];
        newVal = newVal.replace(';', '');

        return newVal;
    }

    validateField(degColumns) {
        this.hexadecimalInvalid = false;
        if (degColumns.type == 'ipAddress') {
            this.ipAddressInvalid = !this._dynamoService.validateIPaddress(degColumns.value) ? true : false;
        } else if (degColumns.type == 'macAddress') {
            this.macAddressInvalid = !this._dynamoService.validateMacAddress(degColumns.value) ? true : false;
        } else if (degColumns.type == 'url') {
            this.urlInvalid = !this._dynamoService.validateURL(degColumns.value) ? true : false;
        } else if (degColumns.type == 'usTelephoneNumber') {
            this.ustelephoneInvalid = !this._dynamoService.validatePhoneNumber(degColumns.value) ? true : false;
        } else if (degColumns.type == 'hexadecimal') {
            this.hexadecimalInvalid = !this._dynamoService.validatehexaDecimal(degColumns.value) ? true : false;
        }
    }

    getCityState(event: any, changedValue: any, onChangeApi: string) {
        if (onChangeApi === '') {
            return false;
        }
        let changeAPI = '';
        if (changedValue.length > 4) {
            changeAPI = onChangeApi.replace(onChangeApi.substring(onChangeApi.indexOf('{{'), onChangeApi.indexOf('}}') + 2), changedValue);
            this.inputName = onChangeApi.substring(onChangeApi.indexOf('{{') + 2, onChangeApi.indexOf('}}'));
            this.inputValue = changedValue;
        }
        this._dtFormServices.onChangeApi(changeAPI).subscribe(
            (response) => {
                if (response.msg !== undefined) {
                    toast(response.msg, Number(sessionStorage.getItem('toastTimeOut')));
                } else {
                    const data = [];
                    for (let i = 0; i < this.dtFormList.length; i++) {
                        const cols = {
                            divclass: this.dtFormList[i].divclass,
                            section: this.dtFormList[i].section,
                            fields:
                                this.getFilterData(this.dtFormList[i].fields, this.inputName, this.inputValue, response) === null
                                    ? this.dtFormList[i].fields
                                    : this.getFilterData(this.dtFormList[i].fields, this.inputName, this.inputValue, response),
                        };
                        data.push(cols);
                    }
                    this.dtFormList = data;
                }
            },
            (error) => this.handleError(error)
        );
    }

    // get page according to navigation
    navChangedHandler(url: string) {
        this.getDataGrid = false;
        this.handleShowBusy(url);
        this._dtFormServices.onChangeApi(url).subscribe(
            (response) => {
                if (response === undefined) {
                    return false;
                } else {
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].type === 'notify') {
                            if (response.data[i].redirectUrl != undefined && response.data[i].redirectUrl) {
                                window.location.href = response.data[i].redirectUrl;
                                return;
                            }
                            this.handleNotify(response.data[i]);
                            this.loader = environment.displayNone;
                            return false;
                        } else if (response.data[i].type === 'pageInit') {
                        } else {
                            this.displaySubGridresp = response.data[i];
                            if (response.data[i].navigation !== undefined) {
                                this.navigatinresponse = response.data[i].navigation;
                            }
                        }
                    }
                }
                this.loader = environment.displayNone;
                this.showBusyText = '';
            },
            (error) => this.handleError(error)
        );
    }

    // get page according to navigation
    navChangedHandlerDialog(url: string) {
        this.getDataGrid = false;
        this.handleShowBusy(url);
        this._dtFormServices.onChangeApi(url).subscribe(
            (response) => {
                if (response === undefined) {
                    return false;
                } else {
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].type === 'notify') {
                            if (response.data[i].redirectUrl != undefined && response.data[i].redirectUrl) {
                                window.location.href = response.data[i].redirectUrl;
                                return;
                            }
                            this.handleNotify(response.data[i]);
                            this.loader = environment.displayNone;
                            return false;
                        } else if (response.data[i].type === 'pageInit') {
                        } else {
                            this.displaySubGridrespDialog = response.data[i];
                            if (response.data[i].navigation !== undefined) {
                                this.navigatinresponseDialog = response.data[i].navigation;
                            }
                        }
                    }
                }
                this.loader = environment.displayNone;
                this.showBusyText = '';
            },
            (error) => this.handleError(error)
        );
    }

    // get page according to navigation inside multipartform
    navChangedHandlerPage(url: string) {
        this.getDataGrid = false;
        this.handleShowBusy(url);

        this._dtFormServices.onChangeApi(url).subscribe(
            (response) => {
                if (response === undefined) {
                    return false;
                } else {
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].type === 'notify') {
                            if (response.data[i].redirectUrl != undefined && response.data[i].redirectUrl) {
                                window.location.href = response.data[i].redirectUrl;
                                return;
                            }
                            this.handleNotify(response.data[i]);
                            this.loader = environment.displayNone;
                            return false;
                        } else if (response.data[i].type === 'pageInit') {
                        } else {
                            this.displayGridRespPage = response.data[i];
                            if (response.data[i].navigation !== undefined) {
                                this.navigationresPage = response.data[i].navigation;
                            }
                        }
                    }
                }
                this.loader = environment.displayNone;
                this.showBusyText = '';
            },
            (error) => this.handleError(error)
        );
    }

    saveItemNotepad(ItemVaule: NgForm, htmlEdithexkey: any, getFileName: string, saveApi: string) {
        this.getDataGrid = false;
        this.handleShowBusy(saveApi);

        this._dtFormServices.saveItemNotepad(ItemVaule.value.content, htmlEdithexkey, getFileName, saveApi).subscribe(
            (response) => {
                this.loader = environment.displayNone;
                this.showBusyText = '';
                if (response.data !== undefined && response.data !== null) {
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].type === 'notify') {
                            if (response.data[i].redirectUrl != undefined && response.data[i].redirectUrl) {
                                window.location.href = response.data[i].redirectUrl;
                                return;
                            }
                            this.handleNotify(response.data[i]);
                        }
                    }
                }
            },
            (error) => this.handleError(error)
        );
    }
    getFilterData(fields: any, inpuname: any, inputValue: any, response: any) {
        let ismatch: Boolean = false;
        const data = [];
        for (let j = 0; j < fields.length; j++) {
            if (fields[j].name === inpuname) {
                ismatch = true;
                break;
            } else {
                ismatch = false;
            }
        }

        for (let i = 0; i < fields.length; i++) {
            if (ismatch) {
                const cols = {
                    divclass: fields[i].divclass,
                    inputclass: fields[i].inputclass,
                    label: fields[i].label,
                    maxlength: fields[i].maxlength,
                    name: fields[i].name,
                    readonly: fields[i].readonly,
                    required: fields[i].required,
                    size: fields[i].size,
                    style: fields[i].style,
                    options: fields[i].name.toLowerCase() === response.fields[0].fieldname.toLocaleLowerCase() ? response.fields[0].options : undefined,
                    type: fields[i].type,
                    value: fields[i].name.toLowerCase() === response.fields[1].fieldname.toLocaleLowerCase() ? response.fields[1].value : fields[i].value,
                    onChangeApi: fields[i].onChangeApi,
                    pattern: fields[i].pattern,
                };
                data.push(cols);
            }
        }
        return data.length === 0 ? null : data;
    }

    getDataByHexkey(event: any) {
        if (this.getDataGrid) {
            return false;
        }
        this.getDataGrid = true;
        let clearPage = false;
        sessionStorage.setItem('getFormState', JSON.stringify(false));
        if (event.url === '' || event.url === undefined) {
            this.loader = environment.displayNone;
            return false;
        } else {
            this.handleShowBusy(event.url);
            this._dtFormServices.getDataByHexkey(event).subscribe(
                (response) => {
                    this.loader = environment.displayNone;
                    this.showBusyText = '';
                    if (response === undefined || response == null) {
                        return false;
                    } else {
                        if (event.closeOnRowSelect !== undefined && JSON.parse(event.closeOnRowSelect)) {
                            this.show_popup = environment.displayNone;
                        }
                        for (let i = 0; i < response.data.length; i++) {
                            if (response.data[i].type === 'notify') {
                                if (response.data[i].redirectUrl != undefined && response.data[i].redirectUrl) {
                                    window.location.href = response.data[i].redirectUrl;
                                    return;
                                }
                                this.getDataGrid = false;
                                this.handleNotify(response.data[i]);
                            } else if (response.data[i].type === 'pageInit') {
                                clearPage = response.data[i].clearPage;
                                if (clearPage) {
                                    this.dialogWidth = '';
                                    this.buttonresponseForm = [];
                                    this.loader = environment.displayBlock;
                                    this.showForm = environment.displayNone;
                                    this.displaySubGridPage = '';
                                    this.showTitlePage = '';
                                    sessionStorage.setItem('desableTab', 'false');
                                }
                            } else if (response.data[i].type === 'multiPartForm') {
                                this.handleFormDataInParent.emit(response);
                            } else if (response.data[i].type === 'lookupFormField') {
                                this.getChangeFormData(response, this.getName);
                                this.displayLookUpForm = response.data[i];
                                this.dtfieldsshow = response.data[i].show;
                                this.dtfieldsvalue = response.data[i].value;
                                this.getClickApival = '';
                                this.getOnChangeApi = '';
                                sessionStorage.removeItem('getdisplayrecord');
                                this.closePopUp();
                            } else if (response.data[i].type === 'form') {
                                this.displayPoup = environment.displayNone;
                                this.showFormButton = true;
                                if (response.data[i].formSubmit) {
                                    sessionStorage.setItem('formState', JSON.stringify(response));
                                    sessionStorage.setItem('getFormState', JSON.stringify(true));
                                }
                                this.displayForm(response, response.data[i].type);
                            } else if (response.data[i].type === 'displayGrid') {
                                this.displaySubGridPage = response.data[i];
                            } else if (response.data[i].type === 'entryGrid') {
                                this.responseEditGrid = response.data[i];
                            } else if (response.data[i].type === 'displayView') {
                                this.displayViewPage = response.data[i];
                            } else if (response.data[i].type === 'pageInit') {
                                // HANDLE ONLY TYPE
                            } else if (response.data[i].type === 'action') {
                                this.handleAction(response.data[i]);
                            } else if (response.data[i].hasOwnProperty('buttons')) {
                                if (this.showFormButton) {
                                    return;
                                } else {
                                    for (let k = 0; k < response.data[i].buttons.length; k++) {
                                        if (response.data[i].buttons[k].hasOwnProperty('onPush')) {
                                            this.onPush = response.data[i].buttons[k].onPush;
                                        }
                                    }
                                }
                            } else if (response.data[i].type === 'formUpdate') {
                                this.displayForm(response, response.data[i].type);
                                this.closePopUp();
                            } else {
                                sessionStorage.setItem('getdisplayrecord', JSON.stringify(response));
                                window.open('/searchDisplay');
                            }
                            this.getDataGrid = false;
                        }
                    }
                },
                (error) => this.handleError(error)
            );
        }
    }

    saveSignature(name?: string) {
        const base64Data = this.signaturePad.toDataURL();
        if (!this.signaturePad.isEmpty()) {
            this.signatureData = base64Data.split(';')[1].split('base64,')[1];
            // TO SET VALUE ON MULTIPART FORM
            sessionStorage.setItem('signature', name);
        } else {
            this.signatureData = '';
        }
        // SET VALUE OF TYPE SIGNATURE

        const response = {
            data: [
                {
                    clearPage: false,
                    type: 'pageInit',
                },
                {
                    isValid: true,
                    type: 'formUpdate',
                    fields: [
                        {
                            name: name,
                            value: this.signatureData,
                        },
                    ],
                },
            ],
        };

        this.displayForm(response, 'formUpdate');
    }

    setValidateCanvas() {
        // USER MOUSE OVER THIS ELEMENT BUT DOESN'T DO ANYTHING
        this.canvasRequired = true;
    }

    savedtForm(data: any, submitapi: string, dtFormList: any, event: any, btnOb) {
        this.desabledTabButton = false;
        let checkChange = false;
        checkChange = this.checkFormChange();
        let fileData = [];
        this.getDataGrid = false;
        // TO SEND THE FILE UPLOADED FROM FORM COMPONENT
        if (this.fileFromForm) {
            fileData = this.FileData;
        }
        /**  CHECK FIELDS VALIDATION BEFORE SENDING IT TO PARENT SCREEN 13 May 2022 niharika */
        const dtFormListLength = dtFormList.length;
        for (let i = 0; i < dtFormListLength; i++) {
            if (dtFormList[i].fields !== undefined) {
                for (let j = 0; j < dtFormList[i].fields.length; j++) {
                    if ((dtFormList[i].fields[j].required != undefined && dtFormList[i].fields[j].required) || dtFormList[i].fields[j].value != '') {
                        // type text
                        if (
                            dtFormList[i].fields[j].type !== undefined &&
                            dtFormList[i].fields[j].type == 'text' &&
                            (dtFormList[i].fields[j].minlength !== undefined || dtFormList[i].fields[j].maxlength !== undefined) &&
                            (dtFormList[i].fields[j].hidden == false || dtFormList[i].fields[j].hidden == undefined)
                        ) {
                            if (dtFormList[i].fields[j].value.length < dtFormList[i].fields[j].minlength) {
                                toast(`Please enter at least ${dtFormList[i].fields[j].minlength} characters for ${dtFormList[i].fields[j].label}`, Number(sessionStorage.getItem('toastTimeOut')));
                                return;
                            } else if (dtFormList[i].fields[j].value.length > dtFormList[i].fields[j].maxlength) {
                                toast(`Please enter maximum  ${dtFormList[i].fields[j].maxlength} characters  for ${dtFormList[i].fields[j].label}`, Number(sessionStorage.getItem('toastTimeOut')));
                                return;
                            }
                        } /* type number*/ else if (
                            dtFormList[i].fields[j].type !== undefined &&
                            dtFormList[i].fields[j].type == 'number' &&
                            (dtFormList[i].fields[j].min !== undefined || dtFormList[i].fields[j].max !== undefined) &&
                            (dtFormList[i].fields[j].hidden == false || dtFormList[i].fields[j].hidden == undefined)
                        ) {
                            if (dtFormList[i].fields[j].value < dtFormList[i].fields[j].min) {
                                toast(`Please enter  number greater than ${dtFormList[i].fields[j].min} for ${dtFormList[i].fields[j].label}`, Number(sessionStorage.getItem('toastTimeOut')));
                                return;
                            } else if (dtFormList[i].fields[j].value > dtFormList[i].fields[j].max) {
                                toast(`Please enter number less than  ${dtFormList[i].fields[j].max} for ${dtFormList[i].fields[j].label}`, Number(sessionStorage.getItem('toastTimeOut')));
                                return;
                            }
                        } /* type date */ else if (
                            dtFormList[i].fields[j].type !== undefined &&
                            dtFormList[i].fields[j].type == 'date' &&
                            (dtFormList[i].fields[j].min !== undefined || dtFormList[i].fields[j].max !== undefined) &&
                            (dtFormList[i].fields[j].hidden == false || dtFormList[i].fields[j].hidden == undefined)
                        ) {
                            if (dtFormList[i].fields[j].value < dtFormList[i].fields[j].min) {
                                toast(`Please enter  date must be after ${dtFormList[i].fields[j].min} for ${dtFormList[i].fields[j].label}`, Number(sessionStorage.getItem('toastTimeOut')));
                                return;
                            } else if (dtFormList[i].fields[j].value > dtFormList[i].fields[j].max) {
                                toast(`Please enter date must be after  ${dtFormList[i].fields[j].max} for ${dtFormList[i].fields[j].label}`, Number(sessionStorage.getItem('toastTimeOut')));
                                return;
                            }
                        } /* type IP Address */ else if (
                            dtFormList[i].fields[j].type !== undefined &&
                            dtFormList[i].fields[j].type == 'ipAddress' &&
                            (dtFormList[i].fields[j].min !== undefined || dtFormList[i].fields[j].max !== undefined) &&
                            (dtFormList[i].fields[j].hidden == false || dtFormList[i].fields[j].hidden == undefined)
                        ) {
                            if (dtFormList[i].fields[j].value.length < dtFormList[i].fields[j].min) {
                                toast(`Please enter at least ${dtFormList[i].fields[j].min} characters for ${dtFormList[i].fields[j].label}`, Number(sessionStorage.getItem('toastTimeOut')));
                                return;
                            } else if (dtFormList[i].fields[j].value.length > dtFormList[i].fields[j].max) {
                                toast(`Please enter at least  ${dtFormList[i].fields[j].max} characters for ${dtFormList[i].fields[j].label}`, Number(sessionStorage.getItem('toastTimeOut')));
                                return;
                            }
                            this.ipAddressInvalid = !this._dynamoService.validateIPaddress(dtFormList[i].fields[j].value) ? true : false;
                            if (this.ipAddressInvalid) {
                                toast(`Please enter valid ip address for ${dtFormList[i].fields[j].label}`, Number(sessionStorage.getItem('toastTimeOut')));
                                return;
                            }
                        } /* type IP Mac Address */ else if (
                            dtFormList[i].fields[j].type !== undefined &&
                            dtFormList[i].fields[j].type == 'macAddress' &&
                            (dtFormList[i].fields[j].min !== undefined || dtFormList[i].fields[j].max !== undefined) &&
                            (dtFormList[i].fields[j].hidden == false || dtFormList[i].fields[j].hidden == undefined)
                        ) {
                            if (dtFormList[i].fields[j].value.length < dtFormList[i].fields[j].min) {
                                toast(`Please enter at least ${dtFormList[i].fields[j].min} characters for ${dtFormList[i].fields[j].label}`, Number(sessionStorage.getItem('toastTimeOut')));
                                return;
                            } else if (dtFormList[i].fields[j].value.length > dtFormList[i].fields[j].max) {
                                toast(`Please enter at least  ${dtFormList[i].fields[j].max} characters for ${dtFormList[i].fields[j].label}`, Number(sessionStorage.getItem('toastTimeOut')));
                                return;
                            }
                            this.macAddressInvalid = !this._dynamoService.validateMacAddress(dtFormList[i].fields[j].value) ? true : false;
                            if (this.macAddressInvalid) {
                                toast(`Please enter valid mac address for ${dtFormList[i].fields[j].label}`, Number(sessionStorage.getItem('toastTimeOut')));
                                return;
                            }
                        } /* type IP USA Telephone Number */ else if (
                            dtFormList[i].fields[j].type !== undefined &&
                            dtFormList[i].fields[j].type == 'usTelephoneNumber' &&
                            (dtFormList[i].fields[j].hidden == false || dtFormList[i].fields[j].hidden == undefined)
                        ) {
                            if (dtFormList[i].fields[j].value.length < dtFormList[i].fields[j].min) {
                                toast(`Please enter at least ${dtFormList[i].fields[j].min} characters for ${dtFormList[i].fields[j].label}`, Number(sessionStorage.getItem('toastTimeOut')));
                                return;
                            } else if (dtFormList[i].fields[j].value.length > dtFormList[i].fields[j].max) {
                                toast(`Please enter at least  ${dtFormList[i].fields[j].max} characters for ${dtFormList[i].fields[j].label}`, Number(sessionStorage.getItem('toastTimeOut')));
                                return;
                            }
                            this.ustelephoneInvalid = !this._dynamoService.validatePhoneNumber(dtFormList[i].fields[j].value) ? true : false;
                            if (this.ustelephoneInvalid) {
                                toast(`Please enter valid Phone Number for ${dtFormList[i].fields[j].label}`, Number(sessionStorage.getItem('toastTimeOut')));
                                return;
                            }
                        } /* type IP Mac URL */ else if (
                            dtFormList[i].fields[j].type !== undefined &&
                            dtFormList[i].fields[j].type == 'url' &&
                            (dtFormList[i].fields[j].hidden == false || dtFormList[i].fields[j].hidden == undefined)
                        ) {
                            if (dtFormList[i].fields[j].value.length < dtFormList[i].fields[j].min) {
                                toast(`Please enter at least ${dtFormList[i].fields[j].min} characters for ${dtFormList[i].fields[j].label}`, Number(sessionStorage.getItem('toastTimeOut')));
                                return;
                            } else if (dtFormList[i].fields[j].value.length > dtFormList[i].fields[j].max) {
                                toast(`Please enter at least  ${dtFormList[i].fields[j].max} characters for ${dtFormList[i].fields[j].label}`, Number(sessionStorage.getItem('toastTimeOut')));
                                return;
                            }
                            this.urlInvalid = !this._dynamoService.validateURL(dtFormList[i].fields[j].value) ? true : false;
                            if (this.urlInvalid) {
                                toast(`Please enter valid url for ${dtFormList[i].fields[j].label}`, Number(sessionStorage.getItem('toastTimeOut')));
                                return;
                            }
                        } /* type Email */ else if (
                            dtFormList[i].fields[j].type !== undefined &&
                            dtFormList[i].fields[j].type == 'email' &&
                            (dtFormList[i].fields[j].hidden == false || dtFormList[i].fields[j].hidden == undefined)
                        ) {
                            this.emailInvalid = !this._dynamoService.validateEmail(dtFormList[i].fields[j].value) ? true : false;
                            if (this.emailInvalid) {
                                toast(`Please enter valid email for ${dtFormList[i].fields[j].label}`, Number(sessionStorage.getItem('toastTimeOut')));
                                return;
                            }
                        }
                    }
                }
            }
        }
        const cols = {
            data: data,
            submitapi: submitapi,
            dtFormList: dtFormList,
            fileFieldName: this.fileFieldName,
            fileData: fileData,
            cc: this.cc,
            ddName: this.ddname,
            hexkey: this.hexkey,
            viewId: this.viewid,
            formChanges: checkChange,
            buttonresponse: this.buttonresponseForm,
            entryGrid: this.responseEditGrid,
            invalidMessage: this.invalidMessage,
            anyInvalidField: this.anyInvalidField,
            addressFieldName: this.addressFieldNameArr,
            addressFieldValue: this.addressFieldsValueArr,
            street_number: this.streetNumberArr,
            manualInputSet: this.setStreetNumberArr,
            manualAddressFieldNameArr: this.manualAddressFieldNameArr,
            manualAddressFieldValueArr: this.manualAddressFieldValueArr,
        };

        this.setStreetNumberArr = [];
        this.streetNumberArr = [];
        /** DISABLE SUBMIT BUTTON  */
        ///// 21 April ////

        if (btnOb !== undefined && btnOb.disableOnClick) {
            const btnInd = this.buttonresponseForm.findIndex((x) => x.disableOnClick == true && x.text == btnOb.text);
            if (btnInd >= 0) {
                this.buttonresponseForm[btnInd].isEnabled = false;
            }
            // for popup
            const btnIndPopup = this.buttonsFileUpload.findIndex((x) => x.disableOnClick == true && x.text == btnOb.text);
            if (btnIndPopup >= 0) {
                this.buttonsFileUpload[btnIndPopup].isEnabled = false;
            }
        }

        this.sendDtForm.emit(cols);
        return;
    }
    buttonAPICallSend(btnOb: any) {
        this.getDataGrid = false;
        let checkChange = false;
        ////// 28 april button enable call service  /////
        this.enableButton = this._dynamoService.enableFormBtn();
        if (btnOb.action == 'uploadSave') {
            this.buttonAPICall(btnOb.onPush, btnOb.action);
        }

        if (btnOb.action == 'clear_signature') {
            if (btnOb && btnOb.disableOnClick) {
                const btnInd = this.buttonresponseForm.findIndex((x) => x.disableOnClick == true && x.text == btnOb.text);
                if (btnInd >= 0) {
                    this.buttonresponseForm[btnInd].isEnabled = false;
                }
                // for popup
                const btnIndPopup = this.buttonsFileUpload.findIndex((x) => x.disableOnClick == true && x.text == btnOb.text);
                if (btnIndPopup >= 0) {
                    this.buttonsFileUpload[btnIndPopup].isEnabled = false;
                }
            }
            this.clearPad();
            const btnInd = this.buttonresponseForm.findIndex((x) => x.disableOnClick == true && x.text == btnOb.text);
            if (btnInd >= 0) {
                this.buttonresponseForm[btnInd].isEnabled = true;
            }
            // for popup
            const btnIndPopup = this.buttonsFileUpload.findIndex((x) => x.disableOnClick == true && x.text == btnOb.text);
            if (btnIndPopup >= 0) {
                this.buttonsFileUpload[btnIndPopup].isEnabled = true;
            }
        } else {
            /** CHECK IF FORM FIELDS IS CHANGED */
            checkChange = !this.isValidSubmit ? this.checkFormChange() : false;
            btnOb.formChange = checkChange;
            /** Add disabled tab button 27 april 2022 */

            sessionStorage.setItem('desableTab', 'true');
            this.buttonAPICallSendParent.emit(btnOb);
            // ADDED TO DISABLE BUTTON CLICK
            if (btnOb && btnOb.disableOnClick) {
                const btnInd = this.buttonresponseForm.findIndex((x) => x.disableOnClick == true && x.text == btnOb.text);
                if (btnInd >= 0) {
                    this.buttonresponseForm[btnInd].isEnabled = false;
                }
                // for popup
                const btnIndPopup = this.buttonsFileUpload.findIndex((x) => x.disableOnClick == true && x.text == btnOb.text);
                if (btnIndPopup >= 0) {
                    this.buttonsFileUpload[btnIndPopup].isEnabled = false;
                }
            }
        }
    }

    checkFormChange() {
        /** GET VALUE FROM SESSION  */
        this.getDataGrid = false;
        const mainContent = JSON.parse(sessionStorage.getItem('formState'));
        let formDivs;
        let checkChange = false;
        const getFormState = JSON.parse(sessionStorage.getItem('getFormState'));

        if (getFormState) {
            for (let k = 0; k < mainContent.data.length; k++) {
                if (mainContent.data[k].type === 'form' && mainContent.data[k].formSubmit) {
                    formDivs = mainContent.data[k].divs;
                } else if (mainContent.data[k].type === 'buttons') {
                    for (let m = 0; m < mainContent.data[k].buttons.length; m++) {
                        if (mainContent.data[k].buttons[m].hasOwnProperty('onPush') && mainContent.data[k].buttons[m].buttonType == 'submit') {
                            this.onPush = mainContent.data[k].buttons[m].onPush;
                        }
                    }
                }
            }
            for (let j = 0; j < formDivs.length; j++) {
                if (formDivs[j].fields !== undefined) {
                    for (let k = 0; k < formDivs[j].fields.length; k++) {
                        for (let m = 0; m < this.dtFormList.length; m++) {
                            for (let i = 0; i < this.dtFormList[m].fields.length; i++) {
                                if (
                                    this.dtFormList[m].fields[i].type !== undefined &&
                                    this.dtFormList[m].fields[i].type !== 'hidden' &&
                                    this.dtFormList[m].fields[i].name === formDivs[j].fields[k].name
                                ) {
                                    if (
                                        this.dtFormList[m].fields[i].type !== 'number' &&
                                        typeof this.dtFormList[m].fields[i].value !== 'boolean' &&
                                        this.dtFormList[m].fields[i].value.trim() !== formDivs[j].fields[k].value.trim()
                                    ) {
                                        /**CHECK IF ANY FIELD VALUE IS CHANGED */
                                        checkChange = true;
                                        break;
                                    } else if (typeof this.dtFormList[m].fields[i].value === 'boolean' && this.dtFormList[m].fields[i].value !== formDivs[j].fields[k].value) {
                                        /**CHECK IF ANY FIELD VALUE IS CHANGED */
                                        checkChange = true;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return checkChange;
    }
    submitAll(onPush: string) {
        const data = [];
        let checkChange = false;
        let NotNotify = false;
        checkChange = this.checkFormChange();
        this.getDataGrid = false;
        let ddname: string | any;
        let viewid: string | any;
        let cc: string;
        let hexkey: string | any;
        const mainContent = JSON.parse(sessionStorage.getItem('formState'));
        if (mainContent !== null && mainContent !== undefined) {
            for (let k = 0; k < mainContent.data.length; k++) {
                if (mainContent.data[k].type === 'form') {
                    ddname = mainContent.data[k].ddname;
                    viewid = mainContent.data[k].viewid;
                    cc = mainContent.data[k].cc;
                    hexkey = mainContent.data[k].hexkey !== undefined ? mainContent.data[k].hexkey : '';
                }
            }
        }
        for (let m = 0; m < this.dtFormList.length; m++) {
            for (let n = 0; n < this.dtFormList[m].fields.length; n++) {
                const cols = {
                    name: this.dtFormList[m].fields[n].name,
                    value:
                        this.dtFormList[m].fields[n].value == 'true' || this.dtFormList[m].fields[n].value == 'false'
                            ? JSON.parse(this.dtFormList[m].fields[n].value)
                            : this.dtFormList[m].fields[n].value,
                    type: this.dtFormList[m].fields[n].type,
                };
                if (this.dtFormList[m].fields[n].type == 'radio' || this.dtFormList[m].fields[n].type == 'select') {
                    cols['show'] = this._dynamoService.getShowForm(this.dtFormList[m]);
                }
                data.push(cols);
            }
        }

        const pcols = {
            type: 'formData',
            cc: cc,
            ddname: ddname,
            formChanges: checkChange,
            hexkey: hexkey,
            viewid: viewid,
            fields: data,
        };
        /* DATA TO GIVE IN API CALL*/
        const fieldRowArr = [];
        let data_grid: any;

        // FORMAT REQUIRED
        data_grid = {
            data: [],
        };

        const data_to_insert = data_grid.data.length;

        data_grid.data[data_to_insert] = pcols;

        if (onPush.includes('?')) {
            onPush = onPush + '&formChanges=' + encodeURIComponent(checkChange);
        } else {
            onPush = onPush + '?formChanges=' + encodeURIComponent(checkChange);
        }
        this.handleShowBusy(onPush);
        this._dtFormServices.sendData(data_grid, onPush).subscribe(
            (response) => {
                this.loader = environment.displayNone;
                this.showBusyText = '';
                if (response === null || response === undefined) {
                    return false;
                } else {
                    const formResponse = JSON.parse(JSON.stringify(response));
                    for (let i = 0; i < formResponse.data.length; i++) {
                        if (formResponse.data[i].type === 'pageInit') {
                        } else if (formResponse.data[i].type === 'notify') {
                            this.handleNotify(response.data[i]);
                            this.isValidSubmit = formResponse.data[i].isValid;
                        } else {
                            NotNotify = true;
                        }
                    }
                    if (NotNotify) {
                        this.handleFormDataInParent.emit(response);
                    }
                }
            },
            (error) => this.handleError(error)
        );
    }
    hideEntryGrid() {
        this.hideEntryGridInparent.emit('hideEntryGrid');
    }

    hideButtonInParent() {
        this.hideButtonInparent.emit('button');
    }

    setCustomerName(action: string, onPush: string, showMenu: boolean, customerIcon?: string) {
        const obj = {
            customerName: this.customerNameInHeader,
            action: action,
            onPush: onPush,
            showMenu: showMenu,
            customerIcon: customerIcon,
        };

        sessionStorage.setItem('customerName' + this._activeRoute.snapshot.queryParams.cc, JSON.stringify(this.customerNameInHeader)); // 09032020
        this.showCustomerName.emit(obj);
        // this.showCustomerName.emit(this.customerNameInHeader);
    }
    apiCallOutput(api_call: any) {
        this.sendApiCall.emit(api_call);
    }

    cancel() {
        this.getDataGrid = false;
        this.message.emit('cancel');
    }

    /** FOR HANDLING CANCEL BUTTON WHEN CONTENT IS NOT POPUP */

    cancelNew(push_redirect: any, showMenu: boolean, action?: string) {
        if (action === 'uploadCancel') {
            this.showTextPage = '';
            this.showTitlePage = '';
            this.fileExtensionsPage = '';

            this.isMultiplePage = '';
            this.extensionTextPage = '';
            this.buttonresponseForm = [];
            this.searchPhraseInput = '';
            this.searchWordsSize = 0;
        } else {
            const eventCancel = { push_redirect: push_redirect, showMenu: showMenu };
            this.message.emit(eventCancel);
        }
    }

    /** FOR STOPPING AUDIO AND MANAGE BUTTON CLICKS ON POPUP */
    cancelPopup(param: string, api_route: string, setHexkey: string) {
        const api_routee = '/' + api_route;
        if (param === undefined || param == null) {
            this.show_popup = environment.displayNone;
        } else if (param === 'routing') {
            if (window.location.hostname === environment.localhost) {
                if (window.location.pathname === api_routee || window.location.pathname.toLowerCase().includes('home')) {
                    this.show_popup = environment.displayNone;
                    this.showMenu = true;
                }
                if (api_route === 'retainState') {
                    this.show_popup = environment.displayNone;
                }
            } else if (window.location.hostname !== environment.localhost) {
                const a = window.location.pathname.split('/');
                if ('/' + a[3] === api_routee || a[3].toLowerCase().includes('home')) {
                    this.show_popup = environment.displayNone;
                    this.showMenu = true;
                }
                if (api_route === 'retainState') {
                    this.show_popup = environment.displayNone;
                }
            } else {
                this._router.navigate([api_routee]);
            }
        } else if (param === 'api_call') {
            this._dtFormServices.getDetails(api_route).subscribe(
                (response) => {
                    this.loader = environment.displayNone;
                    this.show_popup = environment.displayNone;
                    if (response === null) {
                        return false;
                    } else {
                        for (let i = 0; i < response.data.length; i++) {
                            if (response.data[i].type === 'notify') {
                                if (response.data[i].redirectUrl != undefined && response.data[i].redirectUrl) {
                                    window.location.href = response.data[i].redirectUrl;
                                    return;
                                }
                                this.handleNotify(response.data[i]);
                            } else if (response.data[i].type === 'action') {
                                this.handleAction(response.data[i]);
                            } else if (response.data[i].type === 'form' || response.data[i].type === 'formUpdate') {
                                this.displayForm(response, response.data[i].type);
                            }
                        }
                    }
                },
                (error) => this.handleError(error)
            );

            // }
        }
    }

    closePopUp() {
        this.displayPoup = environment.displayNone;
        this.modelOverLay = '';
        this._render.removeClass(document.body, 'custom-body');
        this.message.emit('');
    }

    closefileLookPopUp() {
        this.lookupFormField = environment.displayNone;
        this.displayFiled = environment.displayBlock;
        this.navigationcsspopUp = environment.displayBlock;
    }

    renderUploadHtml(api: any, viewId?: any, ddname?: any, cc?: any) {
        this.fileInput.nativeElement.value = null;
        this.myInputVariable.nativeElement.value = null;
        this.FileData = null;
        this.uploadOpen = environment.displayNone;
        this.handleShowBusy(api);

        if (viewId !== undefined && viewId !== '') {
            viewId = viewId.split('#');
        }

        this._dtFormServices.getDetails(api).subscribe(
            (response) => {
                this.loader = environment.displayNone;
                this.showBusyText = '';
                if (response === null) {
                    return false;
                } else {
                    for (let k = 0; k < response.data.length; k++) {
                        if (response.data[k].type === 'pageInit') {
                        } else if (response.data[k].type === 'popup') {
                            this.mainPopuptitle = response.data[k].title;
                            this.showClose = response.data[k].showClose;
                            this.popup_width = response.data[k].width;
                            this.popup_zindex = response.data[k].zindex;
                            this.show_popup = environment.displayBlock;
                            this.popup_top = 2 + '%';
                            this.popupMaxHeight = response.data[k].maxHeight;
                            this.onCloseRedirect = response.data[k].onCloseRedirect;
                            this.onCloseApi = response.data[k].onCloseApi;
                            this.setparam = response.data[k].action;
                        } else if (response.data[k].type === 'dialogFile') {
                            this.showText = response.data[k].text;
                            this.fileExtensions = response.data[k].extensions;
                            this.showDialog = true;
                            this.isMultiple = response.data[k].multiple;
                            this.dialogFileWidth = response.data[k].width;
                            this.extensionText = this.fileExtensions.replace(/[.]/g, ' ');

                            if (response.data[k].searchWordsSize !== undefined) {
                                this.searchWordsSize = response.data[k].searchWordsSize;
                            } else {
                                this.searchWordsSize = 0;
                            }
                            this.uploadOpen = environment.displayBlock;
                        } else if (response.data[k].hasOwnProperty('buttons')) {
                            this.buttonsFileUpload = [];
                            for (let i = 0; i < response.data[k].buttons.length; i++) {
                                /** TO PASS VIEW ID WHEN FILE IS UPLOADED ON ENTRYGRID */
                                if (response.data[k].buttons[i].action === 'uploadSave') {
                                    response.data[k].buttons[i].ddname = ddname;
                                    response.data[k].buttons[i].cc = cc;
                                }
                                this.buttonsFileUpload.push(response.data[k].buttons[i]);
                            }
                        }
                    }
                }
                this.loader = environment.displayNone;
            },
            (error) => this.handleError(error)
        );
    }

    uploadFile(api: string, viewId?: string, ddname?: any, cc?: string) {
        let NotNotify = false;
        if (this.FileData === undefined || this.FileData === null) {
            this.loader = environment.displayNone;
            return false;
        }

        this.handleShowBusy(api);
        this._dtFormServices.uploadFile(this.FileData, api, this.searchPhraseInput).subscribe(
            (response) => {
                this.loader = environment.displayNone;
                this.showBusyText = '';
                this.FileData = null;
                let IsDisplayGrid = false;

                for (let k = 0; k < response.data.length; k++) {
                    if (response.data[k].type === 'displayGrid') {
                        IsDisplayGrid = true;
                    }
                }
                for (let k = 0; k < response.data.length; k++) {
                    if (response.data[k].type === 'pageInit') {
                    } else if (response.data[k].type === 'notify') {
                        this.showTextPage = '';
                        this.showTitlePage = '';
                        this.fileExtensionsPage = '';

                        this.isMultiplePage = '';
                        this.extensionTextPage = '';
                        this.buttonresponseForm = [];
                        this.searchPhraseInput = '';
                        if (this.displayGridRespPage !== '' && IsDisplayGrid) {
                            this.displayGridRespPage = '';
                        }
                        if (response.data[k].alert !== undefined && response.data[k].alert !== null) {
                            if (response.data[k].title == undefined) {
                                this.setmessage = response.data[k];
                            }
                        } else if (response.data[k].msg !== undefined && response.data[k].msg !== null) {
                            this.setmessage = response.data[k];
                            this.fileInput.nativeElement.value = null;
                            this.myInputVariable.nativeElement.value = null;
                            this.FileData = null;
                            if (response.data[k].closePopup) {
                                this.uploadOpen = environment.displayNone;
                                this.show_popup = environment.displayNone;
                                this.popup_top = '';
                            }
                        }
                        if (response.data[k].success && response.data[k].showMenu) {
                            const event = {
                                push_redirect: '',
                                showMenu: response.data[k].showMenu,
                            };
                            this.message.emit(event);
                        }
                        NotNotify = false;
                    } else {
                        NotNotify = true;
                    }
                }
                // CODE TO CHECK IF FILE IS UPLOADED USING SUBMIT BUTTON IN CASE OF MULTIPART FORM
                if (this.isMultiPart) {
                    this.sendNofileOnSubmit.emit(false);
                }

                this.buttonApiCallFunction(response, viewId, ddname, cc);
            },
            (error) => this.handleError(error)
        );
    }

    convertToDecimal(event?: any, degColumn?: any) {
        if (degColumn.numberPipe !== undefined) {
            const npipeStart = Number(degColumn.numberPipe.split('.')[1].split('-')[0]);
            const npipeEnd = Number(degColumn.numberPipe.split('.')[1].split('-')[1]);
            if (degColumn.isDecimal) {
                if (npipeStart == npipeEnd) {
                    degColumn.value = parseFloat(degColumn.value).toFixed(npipeEnd);
                }
                if (npipeStart == 0 && degColumn.value.toString().includes('.')) {
                    degColumn.value = degColumn.value.split('.')[0] + '.' + degColumn.value.split('.')[1].substr(0, npipeEnd);
                }
                if (degColumn.value.toString().includes('.') && degColumn.value.split('.')[0].includes(0)) {
                    degColumn.value = this._dynamoService.removeZeroBeforeDecimal(degColumn.value, degColumn.numberPipe);
                }
            }
        }

        const response = {
            data: [
                {
                    clearPage: false,
                    type: 'pageInit',
                },
                {
                    isValid: true,
                    type: 'formUpdate',
                    fields: [
                        {
                            name: degColumn.name,
                            show: degColumn.value,
                            value: degColumn.value,
                            focus: true,
                        },
                    ],
                },
            ],
        };

        this.displayForm(response, 'formUpdate');
    }
    checkDecimal(event?: any, degColumn?: any) {
        if (!degColumn.isDecimal && event.charCode >= 48 && event.charCode <= 57) {
            return true;
        } else if (degColumn.isDecimal) {
            return true;
        }
        return false;
    }
    myMethod(event: any) {
        event.target.select();
    }

    checkDecimalTest(event?: any, degColumn?: any) {
        const npipeStart = Number(degColumn.numberPipe.split('.')[1].split('-')[0]);
        const npipeEnd = Number(degColumn.numberPipe.split('.')[1].split('-')[1]);

        if (!degColumn.isDecimal && event.charCode >= 48 && event.charCode <= 57) {
            return true;
        } else if (degColumn.isDecimal) {
            if (npipeStart === npipeEnd) {
                if (event.target.value.indexOf('.') > -1 && event.target.value.split('.')[1].length > npipeEnd) {
                    degColumn.value = parseFloat(event.target.value).toFixed(npipeEnd);

                    for (let l = 0; l < this.dtFormList.length; l++) {
                        for (let j = 0; j < this.dtFormList[l].fields.length; j++) {
                            if (this.dtFormList[l].fields[j].type === 'number' && this.dtFormList[l].fields[j].name === degColumn.name) {
                                this.dtFormList[l].fields[j].value = parseFloat(event.target.value).toFixed(npipeEnd);
                            }
                        }
                    }
                }
            } else if (npipeStart === 0 && degColumn.value.toString().includes('.')) {
                degColumn.value = event.target.value.split('.')[0] + '.' + event.target.value.split('.')[1].substr(0, npipeEnd);
            }
            return true;
        }
        return false;
    }
    getBase64(file: any) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    async onSelectFile(event: any, fromForm?: any, fileFieldName?: string) {
        this.fileFromForm = fromForm === true ? true : false;
        this.fileFieldName = fileFieldName;
        let dataFile: any;
        if (event.target.files.length > 0) {
            const arrdata = [];
            for (let i = 0; i < event.target.files.length; i++) {
                const fileType = event.target.files[i].name.split('.')[event.target.files[i].name.split('.').length - 1];

                await this.getBase64(event.target.files[i]).then((data) => {
                    if (data !== null) {
                        const fileName = data.toString().split('base64,')[1];
                        const cols = {
                            'File-Name': event.target.files[i].name,
                            'Content-Type': event.target.files[i].type,
                            'File-Size': event.target.files[i].size,
                            Content: fileName,
                        };
                        arrdata.push(cols);
                        const btnInd = this.buttonresponseForm.findIndex((x) => x.action == 'uploadSave');
                        if (btnInd >= 0) {
                            this.buttonresponseForm[btnInd].isEnabled = true;
                        }
                        // for popup
                        const btnIndPopup = this.buttonsFileUpload.findIndex((x) => x.action == 'uploadSave');
                        if (btnIndPopup >= 0) {
                            this.buttonsFileUpload[btnIndPopup].isEnabled = true;
                        }
                    } else {
                        return false;
                    }
                });
            }
            this.FileData = arrdata;

            this.loader = environment.displayNone;
            /** ADDED TO SEND DATA FOR MULTIPART FORM */
            dataFile = { fileFieldName: fileFieldName, fileData: arrdata };
            this.dataFileArr.push(dataFile);
            this.sendFiletoMultipart.emit(dataFile);
        } else {
            this.loader = environment.displayNone;
            toast('please select any file', Number(sessionStorage.getItem('toastTimeOut')));
        }
    }
    // added for button click

    buttonAPICall(api: string, action?: string, viewId?: any, ddname?: string, cc?: string) {
        this.showTitlePage = '';
        if (action === 'uploadHtml') {
            this.getPosition(action);
            this.renderUploadHtml(api);
        } else if (action === 'uploadSave') {
            this.uploadFile(api, viewId, ddname, cc);
            return false;
        } else if (action === 'uploadCancel' || action === 'routing') {
            this.show_popup = environment.displayNone;
            this.fileInput.nativeElement.value = null;
            this.myInputVariable.nativeElement.value = null;
            this.FileData = null;
            this.uploadOpen = environment.displayNone;
            this.buttonresponseForm = [];
            this.searchPhraseInput = '';
            this.searchWordsSize = 0;
            this.cancelPopup(action, api, '');
        } else {
            this.dialogWidth = '';
            this.displaySubGridPage = '';
            this.handleShowBusy(api);
            this.responseEditGrid = '';

            this.buttonresponseForm = [];
            this.showFormButton = false;
            this.ISFormButton = false;
            this.showForm = environment.displayNone;
            this.uploadOpen = environment.displayNone;

            this._dtFormServices.getDetails(api).subscribe(
                (response) => {
                    this.loader = environment.displayNone;
                    this.showBusyText = '';
                    if (response === null) {
                        return false;
                    } else if (response.data !== undefined || response.data !== null) {
                        if (response.clearPopup) {
                            this.show_popup = environment.displayNone;
                            this.displayPoup = environment.displayNone;
                        }
                        this.buttonApiCallFunction(response, viewId, ddname, cc);
                    }
                },
                (error) => this.handleError(error)
            );
        }
    }

    getPosition(id: any) {
        const obj = document.getElementById(id);

        this.position = obj.offsetTop;
    }

    handleDialog(event: any) {
        /** HANDLE FILE UPLOAD FROM ENTRYGRID COMPONENT */
        this.position = event.position;
        /** HERE VIEWID REPRESNT CONTROL NUMBER OF MULTIPART FORM CONTROL */
        this.renderUploadHtml(event.api, event.viewId, event.ddname, event.cc);
    }

    submitEditGrid(res: any) {
        const response = res.response;
        const url = res.url;
        for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].type === 'pageInit') {
            } else if (response.data[i].type === 'notify') {
                if (response.data[i].redirectUrl != undefined && response.data[i].redirectUrl) {
                    window.location.href = response.data[i].redirectUrl;
                    return;
                }
                this.handleNotify(response.data[i]);
            } else if (response.data[i].type === 'entryGrid') {
                this.responseEditGrid = response.data[i];
            }
        }
        // CALL API AFTER SUBMIT DATA
        if (url !== undefined && url !== '') {
            this._dtFormServices.getDetails(url).subscribe(
                (response) => {
                    if (response === undefined) {
                        return false;
                    } else {
                        this.displayForm(response);
                    }

                    this.loader = environment.displayNone;
                },
                (error) => this.handleError(error)
            );
        }
    }
    buttonApiCallFunction(response: any, viewId?: any, ddname?: string, cc?: string) {
        this.showTitlePage = '';
        /** CODE TO HIDE POPUP WHEN FILE UPLOAD OF ENTRYGRID HANDLED IN FORM COMPONENT */
        this.uploadOpen = environment.displayNone;
        // this.show_popup = environment.displayNone;
        this.popup_top = '';

        for (let k = 0; k < response.data.length; k++) {
            if (response.data[k].type === 'pageInit') {
                if (response.data[k].clearPage) {
                    this.buttonresponseForm = [];
                    sessionStorage.setItem('desableTab', 'false');
                }
            } else if (response.data[k].type === 'form' || response.data[k].type === 'formUpdate') {
                this.displayForm(response, response.data[k].type);
                this.hideEntryGrid();
            } else if (response.data[k].type === 'displayGrid' && !this.isMultiPart) {
                this.displaySubGridPage = response.data[k];
                this.hideEntryGrid();
            } else if (response.data[k].type === 'displayGrid' && this.isMultiPart) {
                this.displayGridRespPage = response.data[k];
                if (response.data[k].navigation !== undefined) {
                    this.navigationcssPage = environment.displayBlock;
                    this.navigationresPage = response.data[k].navigation;
                } else {
                    this.navigationcssPage = environment.displayNone;
                }
            }

            if (response.data[k].type == 'notify') {
                this.handleNotify(response.data[k]);
            }

            /** UPDATE ENTRYGRID  NOW WE ARE RECEIVING ONLY COLUMNS OF ENTRYGRID NOT COMPLETE ENTRYGRID */
            if (response.data[k].type === 'entryGrid') {
                this.responseEditGrid = response.data[k];
            } else if (response.data[k].type === 'displayView') {
                this.displayViewPage = response.data[k];
            } else if (response.data[k].type === 'dialogHtml') {
                this.showDialogHtmlPage = true;
                this.showTextDialogPage = response.data[k].text;
                this.dialogPageWidth = response.data[k].dialogWidth !== undefined ? response.data[k].dialogWidth : '40%';
                this.showDialogTitle = response.data[k].title;
            } else if (response.data[k].type === 'dialogFile') {
                this.showTextPage = response.data[k].text;
                this.showTitlePage = response.data[k].title;
                this.fileExtensionsPage = response.data[k].extensions;
                this.dialogFileWidth = response.data[k].width;
                this.isMultiplePage = response.data[k].multiple;
                this.extensionTextPage = this.fileExtensionsPage.replace(/[.]/g, ' ');
                if (response.data[k].searchWordsSize !== undefined) {
                    this.searchWordsSize = response.data[k].searchWordsSize;
                } else {
                    this.searchWordsSize = 0;
                }
            } else if (response.data[k].type === 'action') {
                this.handleAction(response.data[k]);
            } else if (response.data[k].hasOwnProperty('buttons') && this.ISFormButton === false) {
                this.buttonresponseForm = [];
                if (this.showFormButton) {
                    return;
                } else {
                    for (let i = 0; i < response.data[k].buttons.length; i++) {
                        this.buttonresponseForm.push(response.data[k].buttons[i]);

                        if (response.data[k].buttons[i].hasOwnProperty('onPush')) {
                            this.onPush = response.data[k].buttons[i].onPush;
                        }
                    }
                    this.hideButtonInParent();
                }
            }
        }
    }

    handleAction(response: any) {
        this.getDataGrid = false;
        if (response.url.includes('http')) {
            if (response.newPage) {
                window.open(response.url, '_blank');
            } else {
                window.open(response.url, '_self');
            }
        } else if (window.location.hostname === 'localhost' && !response.url.includes('http')) {
            if (response.newPage) {
                window.open(this.serverName + response.url, '_blank');
            } else {
                window.open(this.serverName + response.url, '_self');
            }
        } else if (window.location.hostname !== 'localhost' && !response.url.includes('http')) {
            if (response.newPage) {
                window.open(this.serverName + response.url, '_blank');
            } else {
                window.open(this.serverName + response.url, '_self');
            }
        }
        if (response.newPage && response.success && response.showMenu) {
            const event = { push_redirect: '', showMenu: response.showMenu };
            this.message.emit(event);
        }
    }

    formatDate(value: any) {
        /** CONVERT YYYY-MM-DD TO MM-DD-YYYY */

        let convertDate = value.split('-');
        convertDate = convertDate[1] + '-' + convertDate[2] + '-' + convertDate[0];
        return convertDate;
    }

    checkYear(value: any) {
        const checkYear = value.split('-');
        if (checkYear[0].length > 4) {
            return false;
        }
        return true;
    }

    dateValidate(value, field) {
        if (value == '') {
            return !field.required;
        } else {
            const checkValue = this._dynamoService.dateValidate({
                value: value,
                min: field.min,
                max: field.max,
            });

            return checkValue;
        }
    }
    handleNotify(response: any) {
        this.getDataGrid = false;

        if (response.alert !== undefined || response.msg !== undefined) {
            this.setmessage = response;
        }
        // to go back to home page
        if (response.success && response.showMenu) {
            const eventShowMenu = { push_redirect: '', showMenu: response.showMenu };
            this.message.emit(eventShowMenu);
        }
    }
    /** FOR assigning barcode to items */
    getDataResponse(event: any) {
        // Check if data grid has already been retrieved
        if (this.getDataGrid) {
            return false;
        }
        // Set data grid to true and reset dialog width and show text
        this.getDataGrid = true;
        this.dialogWidth = '';
        this.showText = '';
        this.showTitlePage = '';
        // Set form state to false
        sessionStorage.setItem('getFormState', JSON.stringify(false));
        // Stop audio if it is playing
        if (this.audio.src !== undefined && this.audio.src !== '') {
            this.stopAudio();
        }
        // Reset response dialog form
        this.responseDtFormDialog = '';
        // Check if URL is defined and not empty
        if (event.url === undefined || event.url === '') {
            this.getDataGrid = false;
            return false;
        } else {
            // Show busy indicator
            this.handleShowBusy(event.url);
            // Make API call to get details by hex key
            this._dtFormServices.getDetailsByhexkey(event.url, event.hexKey).subscribe(
                (response) => {
                    // Hide busy indicator
                    this.loader = environment.displayNone;
                    this.showBusyText = '';
                    this.getDataGrid = false;
                    // Check if response is null
                    if (response === null) {
                        return false;
                    } else {
                        // Check if close on row select is defined and set to true
                        if (event.closeOnRowSelect !== undefined && JSON.parse(event.closeOnRowSelect)) {
                            this.show_popup = environment.displayNone;
                        }
                        // Iterate through response data
                        for (let i = 0; i < response.data.length; i++) {
                            // Check if type is page init
                            if (response.data[i].type === 'pageInit') {
                                this.getDataGrid = false;
                                // Check if clear page is set to true
                                if (response.data[i].clearPage) {
                                    this.hideButtonInParent();
                                    sessionStorage.setItem('desableTab', 'false');
                                }
                                // Check if type is display grid
                            } else if (response.data[i].type === 'displayGrid') {
                                this.getDataGrid = false;
                                this.displayGridRespPage = response.data[i];
                                // Check if navigation is defined
                                if (response.data[i].navigation !== undefined) {
                                    this.navigationcssPage = environment.displayBlock;
                                    this.navigationresPage = response.data[i].navigation;
                                } else {
                                    this.navigationcssPage = environment.displayNone;
                                }
                                // Check if extra button is defined
                                if (response.data[i].extraButton !== undefined) {
                                    this.extraButton = response.data[i].extraButton;
                                }
                                // Check if type is form update or form
                            } else if (response.data[i].type === 'formUpdate' || response.data[i].type === 'form') {
                                // Check if form submit is set to true
                                if (response.data[i].formSubmit) {
                                    sessionStorage.setItem('formState', JSON.stringify(response));
                                    sessionStorage.setItem('getFormState', JSON.stringify(true));
                                }
                                // Call display form function
                                this.displayForm(response, response.data[i].type);
                                // Check if type is entry grid
                            } else if (response.data[i].type === 'entryGrid') {
                                this.responseEditGrid = response.data[i];
                                // Check if type is setup
                            } else if (response.data[i].type === 'setup') {
                                this.customerNameInHeader = response.data[i].customerName;
                                this.show_popup = environment.displayNone;
                                // Get action, on push and show menu
                                const action = response.data[i].action;
                                const onPush = response.data[i].onPush;
                                const showMenu = response.data[i].showMenu;
                                // Call set customer name function
                                this.setCustomerName(action, onPush, showMenu);
                                // Check if type is action
                            } else if (response.data[i].type === 'action') {
                                // Call handle action function
                                this.handleAction(response.data[i]);
                                // Check if type is notify
                            } else if (response.data[i].type === 'notify') {
                                this.showTextPage = '';
                                this.showTitlePage = '';
                                this.fileExtensionsPage = '';
                                this.isMultiplePage = '';
                                this.extensionTextPage = '';
                                this.getDataGrid = false;
                                // Check if redirect URL is defined
                                if (response.data[i].redirectUrl != undefined && response.data[i].redirectUrl) {
                                    window.location.href = response.data[i].redirectUrl;
                                    return;
                                }
                                // Call handle notify function
                                this.handleNotify(response.data[i]);
                                // Check if type is multi part form
                            } else if (response.data[i].type === 'multiPartForm') {
                                // Reset entry grid data array, set entry grid and grid reference number
                                sessionStorage.setItem('entryGridDataArr', '');
                                sessionStorage.setItem('setEntryGrid', '');
                                sessionStorage.setItem('gridRefNumber', '');
                                // Emit handle form data in parent
                                this.handleFormDataInParent.emit(response);
                                // Check if type is popup
                            } else if (response.data[i].type === 'popup') {
                                // Reset button response dialog
                                this.buttonresponseDialog = [];
                                // Iterate through response data
                                for (let k = 0; k < response.data.length; k++) {
                                    // Check if type is display view
                                    if (response.data[k].type === 'displayView') {
                                        this.displayViewresponseDialog = response;
                                        // Check if type is display grid
                                    } else if (response.data[k].type === 'displayGrid') {
                                        this.displaySubGridrespDialog = response.data[k];
                                        // Check if navigation is defined
                                        if (response.data[k].navigation !== undefined) {
                                            this.navigationcssDialog = environment.displayBlock;
                                            this.navigatinresponseDialog = response.data[k].navigation;
                                        } else {
                                            this.navigationcssDialog = environment.displayNone;
                                        }
                                        // Check if type is dialog HTML
                                    } else if (response.data[k].type === 'dialogHtml') {
                                        this.showDialogHtmlPopup = true;
                                        this.showTextDialogPopup = response.data[k].text;
                                        this.dialogHtmlPopupWidth = response.data[k].dialogWidth !== undefined ? response.data[k].dialogWidth : '40%';
                                        this.showDialogPopupTitle = response.data[k].title;
                                        this.displaySubGridrespDialog = false;
                                        this.displayViewresponseDialog = false;
                                        // Check if type is form
                                    } else if (response.data[k].type === 'form') {
                                        this.responseDtFormDialog = response;
                                        this.showEnterKey = response.data[k].enterKeySubmits;
                                        // Check if type is multi part form
                                    } else if (response.data[k].type === 'multiPartForm') {
                                        this.show_popup = environment.displayNone;
                                        this.isMultiPart = true;
                                        // Emit handle form data in parent
                                        this.handleFormDataInParent.emit(response);
                                    } else if (response.data[k].type === 'popup') {
                                        this.mainPopuptitle = response.data[k].title;
                                        this.showClose = response.data[k].showClose;
                                        this.popup_width = response.data[k].width;
                                        this.popup_height = response.data[k].height;
                                        this.popup_zindex = response.data[k].zindex;
                                        this.popupMaxHeight = response.data[k].maxHeight;
                                        this.show_popup = environment.displayBlock;
                                        this.popup_top = response.data[k].top;
                                        this.onCloseRedirect = response.data[k].onCloseRedirect;
                                        this.onCloseApi = response.data[k].onCloseApi;
                                        this.setparam = response.data[k].action;
                                    } else if (response.data[k].type === 'dialog') {
                                        this.showText = response.data[k].text;
                                        this.dialogWidth = response.data[k].dialogWidth !== undefined ? response.data[k].dialogWidth : '40%';
                                        this.showDialog = true;
                                        this.displaySubGridrespDialog = false;
                                        this.displayViewresponseDialog = false;
                                    } else if (response.data[k].type === 'button') {
                                        this.buttonresponseDialog.push(response.data[k]);
                                        this.show_popup = environment.displayBlock;
                                    } else if (response.data[k].hasOwnProperty('buttons') && !this.isMultiPart) {
                                        for (let i = 0; i < response.data[k].buttons.length; i++) {
                                            this.buttonresponseDialog.push(response.data[k].buttons[i]);
                                        }
                                        this.show_popup = environment.displayBlock;
                                    }
                                }

                                this.popUpCloseApi = response.closePopupAPI;
                                return false;
                            } else if (response.data[i].type === 'notify') {
                                if (response.data[i].redirectUrl != undefined && response.data[i].redirectUrl) {
                                    window.location.href = response.data[i].redirectUrl;
                                    return;
                                }
                                this.handleNotify(response.data[i]);
                            }
                            this.getDataGrid = false;
                        }
                    }
                },
                (error) => this.handleError(error)
            );
        }
    }

    showPassword(eleId: string) {
        // Get the input element from the DOM
        const inputElement = <HTMLInputElement>document.getElementById(eleId);
        // Check if the input element is a text type
        if (inputElement.type === 'text') {
            // Set the type to password
            inputElement.type = 'password';
        } else {
            // Set the type to text
            inputElement.type = 'text';
        }
    }
    startDrawing(event: Event) {
        // No implementation required
    }
    moved(event: Event) {
        // No implementation required
    }
    clearPad() {
        // Clear the signature pad
        this.signaturePad.clear();
        // Reset the signature data
        this.signatureData = '';
    }
    openFromIcon(timepicker: { open: () => void }) {
        // Open the timepicker
        timepicker.open();
    }
    notepadUpdate(data, hexkey) {
        // Get the notepad data from session storage
        const notepadData = JSON.parse(sessionStorage.getItem(`Notepad`));
        // Iterate through the notepad data
        for (let i = 0; i < notepadData.length; i++) {
            // Check if the hexkey matches
            if (notepadData[i].hexkey == hexkey) {
                // Update the value
                notepadData[i].value = data;
            }
        }
        // Set the notepad data in session storage
        sessionStorage.setItem(`Notepad`, JSON.stringify(notepadData));
    }

    handleError(error: any) {
        // Hide the loader
        this.loader = environment.displayNone;
        // Set the getDataGrid to false
        this.getDataGrid = false;
        // Check if the error has data
        if (error.error !== undefined && error.error.data !== undefined) {
            // Iterate through the error data
            for (let i = 0; i < error.error.data.length; i++) {
                // Check if the type is notify
                if (error.error.data[i].type === 'notify') {
                    // Handle the notify
                    this.handleNotify(error.error.data[i]);
                }
            }
        } else if (error.name !== undefined && error.name === 'HttpErrorResponse' && error.status === 0 && error.statusText === 'Unknown Error') {
            // Handle the notify
            this.handleNotify({
                alert: 'alert',
                URL: error.url,
                title: error.title !== undefined ? error.title : '',
            });
        } else if (error.name !== undefined && error.name === 'HttpErrorResponse' && error.status === 503 && error.statusText === 'Service Unavailable') {
            // Handle the notify
            this.handleNotify({
                alert: 'alert',
                URL: error.url,
                title: environment.serviceNotAvailable,
                statusCode: 503,
                message: error.error.message ? error.error.message : 'Server Error 503',
            });
        } else if (error.message !== undefined) {
            // Show an alert with the error message
            alert(error.message);
        } else {
            // Check if the error has an alert
            if (error.error.alert !== undefined) {
                // Handle the notify
                this.handleNotify(error.error);
            } else {
                // Show a toast with the status text
                toast(error.statusText, Number(sessionStorage.getItem('toastTimeOut')));
            }
        }
    }
    converTocomma(number) {
        // Check if the key pressed is between 37 and 40
        if (number.which >= 37 && number.which <= 40) {
            // Return without doing anything
            return;
        }
        // Replace all non-digits with nothing and add commas after every 3 digits
        $(this).val(function (index, value) {
            return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        });
    }

    desabledTab(event) {
        // Get the desableTab value from session storage
        const ss = sessionStorage.getItem('desableTab');
        // Check if the key pressed is Tab and the desableTab value is true
        if (event.key == 'Tab' && ss == 'true') {
            // Return false
            return false;
        }
    }
    setRembereme(event) {
        // Check if the checkbox is checked
        if (event.target.checked == true) {
            // Set the isRemember value to true
            localStorage.setItem(`${location.href}_isRemember`, 'true');
        } else {
            // Set the isRemember value to false
            localStorage.setItem(`${location.href}_isRemember`, 'false');
        }
    }
    print() {
        // Print the current page
        window.print();
    }
}
