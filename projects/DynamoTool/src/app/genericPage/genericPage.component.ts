import {
  Component,
  OnInit,
  AfterViewChecked,
  ViewChild,
  ElementRef,
} from "@angular/core";
import "materialize-css";
import { toast } from "angular2-materialize";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { GenericPageService } from "./genericPage.service";
import { DynamoToolShareService } from "../dynamoToolHome/dynamoToolShare.service";
import { InquiryTinyComponent } from "../notepad/tinymce.component";
import { NgForm } from "@angular/forms";
import { environment } from "../../environments/environment";
import { ItemMaintenanceService } from "../itemMaintenance/itemMaintenance.service";
import { interval, Observable, Subscription } from "rxjs";

declare var Materialize: any;
export class PageModel {
  content = "";
}
@Component({
  selector: "app-genericPage",
  templateUrl: "./genericPage.component.html",
  styleUrls: ["./genericPage.component.css"],
  providers: [
    GenericPageService,
    InquiryTinyComponent,
    ItemMaintenanceService,
    DynamoToolShareService,
  ],
})
export class GenericPageComponent implements OnInit, AfterViewChecked {
  constructor(
    private _itemMaintenanceService: ItemMaintenanceService,
    private _gpServices: GenericPageService,
    private _dynamoService: DynamoToolShareService,
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private titleService: Title
  ) {}

  loader: string;
  companyName: string;
  title: string;
  showheading: string;
  childresponse: any;
  responseDtForm: any;
  displayViewresponse: any;
  appMenuresponse: any;
  content: string;
  api: string;
  dialogTitle: string;
  ddName: string;
  gridid: string;
  cc: string;
  viewid: string;
  hexkey: string;
  url: string;
  dtnotepad: string;
  filename: string;
  parentContent = true;
  appname: string;
  dyForm: string = environment.displayNone;
  getFileName: string;
  saveApi: string;
  printEdititemInquiry: any;
  printButton: string;
  checkedList = [];
  isPrintAll: boolean;
  isTitle: string;
  displayPoup: string;
  zIndex: number;
  dashboardUpdate = false;
  inventory_table: string;
  print_table: string;
  inventory_viewtable: string;
  buttonresponse: any[] = [];
  text: string;
  icon: string;
  color: string;
  APICall: string;
  token: string;
  navigatinresponse: any;
  navigationcss: string;
  // NEW REQUIREMENT
  staticData: any;
  setresponse: any;
  // loader: string;
  // displayViewresponse: any;
  displaySubGridresp: any;
  // navigationcss: string;
  // navigatinresponse: string;
  // responseDtForm: any;
  setmessage: any;
  menuTitle: string;
  showEnterKey = false;
  displayViewPopUp: any;
  displaySubGridPopUp: any;
  displayViewPopUpArr: any[] = [];
  displaySubGridPopUpArr: any[] = [];
  displayViewPageArr: any[] = [];
  displaySubGridPageArr: any[] = [];
  mainPopuptitle: string;
  getDashboardData: any;
  showPopUp: string;
  showClose: boolean;
  popup_width: any;
  popup_height: any;
  popup_top: string;
  pageData: any;
  popup_style: any;
  onCloseApi: string;
  onCloseRedirect: string;
  setparam: string;
  // buttonresponse: any[] = [];
  expansionPanelPopup: any;
  responseDtFormPage: any;
  showMenu = true;
  userName: string;
  setHexkey: string;
  showText: string;
  buttonresponseDialog: any[] = [];
  showDialog = false;
  popup_zindex: any;
  response_share: any;
  getDataResponseShare = "false";
  entryGrid = false; // entryGrid
  responseEditGrid: any;
  formWidth: string;
  setButton = false;
  pageName: string;
  colsData: any;
  navigationcssPopup: string;
  navigationresponsePopup: string;

  // showEnterKey: boolean = false;

  buttonresponsePage: any[] = [];

  showMainContent = true;
  // added to handle button inside form
  showFormButton = false;
  entryGridResponse: any;

  emptyGrid = false;
  dialogWidth: any;
  navigationcssArr: any[] = [];
  navigationresponseAr: any[] = [];
  hideOnMobile = true;
  mobileDevice: boolean;
  formNavigation: any;
  formNavigationCss: any;
  isMobile: boolean;
  customerName: string;
  setMargin: any;
  setCustomerName: string;
  staticResponse: any;
  showDialogHtml = false;
  dialogWidthHtml: any;
  showTextHtml: any;
  dynamicScript: string;

  unsetVarArr: any[] = [];
  /** ADDED FOR SECOND POPUP */

  newValue: any;

  ckeditorview: string;
  lastrevised: string;

  tableclass: any;
  inquiryTitle: string;
  tinyButtion: string;
  zindexPopupOrder: any = 1;
  firstPopUpSet = false;
  /** File upload */
  uploadOpen: string;
  buttonsFileUpload: any[] = [];
  fileExtensions: string;
  FileData: any;
  fileName: string;
  filetextinput: string;
  extensionText: string;
  isMultiple: boolean;
  showTextUpload = "";
  showTitleUpload = "";
  showDialogSecond = false;
  setAllData: any[] = [];
  arrIndex = 0;
  seqDataToSend: string;
  /** NOTEPAD */
  htmlEdithexkey: string;

  isHtmlEdit = false;
  isHtmlEditPage = false;
  /** show dialoghtml on page */
  showDialogHtmlPage = false;
  showTextDialogPage: string;
  dialogPageWidth: string;
  showDialogTitle: string;
  /** show multiple displaygrid on page  */
  // displaySubGridPageArr: any[] = [];
  navigationcssPageArr: any[] = [];
  navigationresponsePageAr: any[] = [];
  enhanced: boolean;
  setMenuTitle: string;
  pageContent: string;
  htmlEditPageArr: any[] = [];
  htmlEditPopupArr: any[] = [];
  htmlEditPopupOb: any;
  tinyReadonly: any;
  customerIcon: string;
  setMenuProperty: any = { setMenuIcon: "", setMenuIconColor: "" };
  valueProgress: any;
  progressText: string;
  setBtnProperty: string;
  /** ADDED TO SHOW DIALOGFILE IN POPUP 8 MAY*/
  showTextPopup: string;
  showTitlePopup: string;
  fileExtensionsPopup: string;
  isMultiplePopup: string;
  extensionTextPopup: string;
  showFileUploadPopup = false;
  position = 0;
  setInterval = 0;
  progressTitle: string;
  page: PageModel;
  mySubscription: Subscription;
  expansionPanelData: any;

  sendDataEntryGrid: any;
  sendDataFromChild: any;
  sendDataFromMultiPart: any;
  isValidSubmit = false;
  toastTimeOut: any;
  getDataGrid = false;
  popupMaxHeight: any;
  searchPhraseInput: string;
  searchWordsSize: number;
  enableButton: any;
  enableBtnProperty = [{ buttonType: "submit", isEnabled: true }];
  enableButtonArr: any[] = [];
  validateFormError: boolean;
  validateEntryOnForm: any; // for sending data to form after required validation
  treeControlMenu: any;
  setFocusFromParent: any;
  isProgress: boolean = false;
  showBusyText: string;
  validationFormMessage: any = environment.formRequiredMessage;
  @ViewChild("fileInput", { static: false }) fileInput;
  @ViewChild("inputFile", { static: false }) myInputVariable: ElementRef;
  ngAfterViewChecked() {
    if (Materialize.updateTextFields === undefined) {
      return false;
    }
    Materialize.updateTextFields();
  }

  /* @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
         if (event.key == 'Escape') {
            this.showPopUp = environment.displayNone;
        }
    }
 */
  ngOnInit() {
    sessionStorage.setItem("entryGridDataArr", "");
    sessionStorage.setItem("setEntryGrid", "");
    sessionStorage.setItem("gridRefNumber", "");
    sessionStorage.setItem("detectChangeEntryGrid", "");
    this.page = new PageModel();
    this.navigationcss = environment.displayNone;
    this.dtnotepad = environment.displayNone;
    this.content = "";
    // this.api = this._activeRoute.snapshot.queryParams['api'];
    this.ddName = this._activeRoute.snapshot.queryParams["DDName"];
    this.gridid = this._activeRoute.snapshot.queryParams["gridID"];
    this.cc = this._activeRoute.snapshot.queryParams["cc"];
    this.viewid = this._activeRoute.snapshot.queryParams["viewID"];
    this.hexkey = this._activeRoute.snapshot.queryParams["hexkey"];
    this.titleService.setTitle(this._activeRoute.snapshot.queryParams["title"]);
    this.companyName = this._activeRoute.snapshot.queryParams["companyname"];
    this.title = this._activeRoute.snapshot.queryParams["title"];
    this.filename = this._activeRoute.snapshot.queryParams["filename"];
    this.appname = this._activeRoute.snapshot.queryParams["appname"];
    this.text = this._activeRoute.snapshot.queryParams["text"];
    this.icon = this._activeRoute.snapshot.queryParams["icon"];
    this.color = this._activeRoute.snapshot.queryParams["color"];
    this.APICall = this._activeRoute.snapshot.queryParams["APICall"];
    this.token = this._activeRoute.snapshot.queryParams["t"];
    this.toastTimeOut =
      this._activeRoute.snapshot.queryParams["toastTimeOut"] !== undefined &&
      this._activeRoute.snapshot.queryParams["toastTimeOut"] !== ""
        ? this._activeRoute.snapshot.queryParams["toastTimeOut"]
        : 4000;

    this.showheading = this._activeRoute.snapshot.queryParams["showheading"];
    sessionStorage.setItem("toastTimeOut", this.toastTimeOut);
    if (this.showheading === "true") {
      this.companyName = this._activeRoute.snapshot.queryParams["companyname"];
      this.title = this._activeRoute.snapshot.queryParams["title"];
      this.titleService.setTitle(
        this._activeRoute.snapshot.queryParams["title"]
      );
    } else {
      this.title = "";
      this.companyName = "";
      // this.titleService.setTitle('');
    }

    this.titleService.setTitle(this._activeRoute.snapshot.queryParams["title"]);

    const url = window.location.href.split("?")[1];
    this._gpServices.getApiresponse(url).subscribe(
      (response) => {
        // window.location.href = window.location.origin + '/dynamoToolHome';
        this.loader = environment.displayNone;

        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].type == "notify") {
            if (
              response.data[i].redirectUrl != undefined &&
              response.data[i].redirectUrl
            ) {
              window.location.href = response.data[i].redirectUrl;
              return;
            }
            this.handleNotify(response.data[i]);
          } else {
            //////  22 may
            // this.resposncall(response);
            this.showContent(response);
          }
        }
      },
      (error) => this.handleError(error)
    );
  }
  // HANDLE DATA IN POPUP OR MAIN PAGE
  showContent(formResponse, setDeletedData?) {
    let clearPage = false;
    let showForm: Boolean = false;
    this.getDataGrid = false;
    this.displaySubGridPopUp = [];
    this.parentContent = true;
    let NotNotify = false;
    for (let i = 0; i < formResponse.data.length; i++) {
      if (
        formResponse.data[i].clearPage !== undefined &&
        formResponse.data[i].clearPage
      ) {
        clearPage = formResponse.data[i].clearPage;
        this.dashboardUpdate =
          formResponse.data[i].dashboardUpdate !== undefined
            ? formResponse.data[i].dashboardUpdate
            : false;
      }
    }
    this.searchPhraseInput = "";
    this.searchWordsSize = 0;

    if (clearPage) {
      this.treeControlMenu = "";
      this.showDialog = false;
      this.setMargin = "";
      this.buttonresponse = [];
      this.buttonresponsePage = [];
      this.dialogWidth = "";

      this.navigationcssArr = [];
      this.navigationresponseAr = [];

      this.entryGrid = false;

      this.showDialogHtml = false;
      this.formWidth = "";
      this.unsetVarArr = [];
      this.expansionPanelData = "";
      this.setAllData = [];
      this.isHtmlEdit = false;
      this.showTextUpload = "";
      this.isHtmlEditPage = false;
      this.formNavigationCss = environment.displayNone;
      this.formNavigation = "";
      this.responseDtForm = "";
      this.sendDataEntryGrid = undefined;
      this.sendDataFromChild = "";
      this.sendDataFromMultiPart = "";
      this.searchPhraseInput = "";
      this.searchWordsSize = 0;
      sessionStorage.setItem("entryGridDataArr", "");
      sessionStorage.setItem("setEntryGrid", "");
      sessionStorage.setItem("gridRefNumber", "");
      sessionStorage.setItem("detectChangeEntryGrid", "");
    }
    try {
      showForm = false;

      for (let kk = 0; kk < formResponse.data.length; kk++) {
        if (formResponse.data[kk].type === "form") {
          showForm = true;
        }
      }
      for (let k = 0; k < formResponse.data.length; k++) {
        if (formResponse.data[k].type === "pageInit") {
        }
        if (formResponse.data[k].type === "popup") {
          this.showPopUpData(formResponse, setDeletedData);
          return;
        } else {
          // ADDED TO SHOW MENU
          this.showMenu = false;
          let gridPositionTop = false;

          if (this.dashboardUpdate) {
            this.showMenu = true;
          }
          // this.showPopUp = environment.displayNone;
          this.setBtnProperty = "";

          if (clearPage) {
            this.buttonresponse = [];
          }
          const htmlEditPageOb = {
            tableclass: "",
            inquiryTitle: "",
            pageContent: "",
            lastrevised: "",
            tinyButtion: "",
            saveApi: "",
            htmlEdithexkey: "",
            getFileName: "",
            enhanced: "",
            tinyReadonly: "",
          };
          if (
            formResponse.data[k].width !== undefined &&
            formResponse.data[k].type === "form"
          ) {
            this.formWidth = formResponse.data[k].width;
          }

          if (
            formResponse.data[k].type === "displayGrid" &&
            formResponse.data[k].topPosition !== undefined &&
            formResponse.data[k].topPosition
          ) {
            this.displaySubGridresp = formResponse.data[k];
            this.unsetVarArr.push("displayGrid");
            if (formResponse.data[k].navigation !== undefined) {
              this.navigationcss = environment.displayBlock;
              this.navigatinresponse = formResponse.data[k].navigation;
            } else {
              this.navigationcss = environment.displayNone;
            }
            // CODE TO HANDLE MULTIPLE DISPLAY GRID ON PAGE
            this.displaySubGridPageArr.push({
              grid: this.displaySubGridresp,
              navigationcss: this.navigationcss,
              navigatinresponse: this.navigatinresponse,
              topPosition:
                formResponse.data[k].topPosition === undefined ||
                formResponse.data[k].topPosition === false
                  ? false
                  : formResponse.data[k].topPosition,
            });
            // ADDED TO SET GRID POSITION ON TOP (FOR PO) 26 DEC
            gridPositionTop =
              formResponse.data[k].topPosition === undefined ||
              formResponse.data[k].topPosition === false
                ? false
                : formResponse.data[k].topPosition;
          } else if (formResponse.data[k].type == "progress") {
            this.progressTitle = formResponse.data[k].title
              ? formResponse.data[k].title
              : "";
            this.progressText = formResponse.data[k].text;
            this.valueProgress = formResponse.data[k].percent;
            for (let j = 0; j < formResponse.data.length; j++) {
              if (formResponse.data[j].type == "pageInit") {
                clearPage = formResponse.data[j].clearPage;
                if (formResponse.data[j].clearPage) {
                  //  this.showContent(formResponse);
                }
              }
            }
            this.setInterval = formResponse.data[k].interval * 1000;
            this.mySubscription = interval(this.setInterval).subscribe((x) => {
              if (this.mySubscription.closed) return;
              this._dynamoService
                .getDetailsScan(formResponse.data[k].api_call)
                .subscribe((response) => {
                  this.loader = environment.displayNone;

                  if (response === null) {
                    return false;
                  }
                  for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].type == "notify") {
                      if (
                        response.data[i].redirectUrl != undefined &&
                        response.data[i].redirectUrl
                      ) {
                        window.location.href = response.data[i].redirectUrl;
                        return;
                      }
                      NotNotify = false;
                      this.handleNotify(response.data[i]);
                    } else if (response.data[i].type == "pageInit") {
                      clearPage = response.data[i].clearPage;
                      //  this.showContent(response);
                    } else if (response.data[i].type == "progressResponse") {
                      if (response.data[i].percent !== -1) {
                        this.progressText = response.data[i].text;
                        this.valueProgress = response.data[i].percent;
                      } else {
                        this.mySubscription.unsubscribe();
                        this.valueProgress = "100";
                        if (response.data[i].text !== undefined) {
                          this.progressText = response.data[i].text;
                        }

                        if (response.data[i].api_call) {
                          this.buttonAPICall(
                            response.data[i].api_call,
                            "",
                            "api_call"
                          );
                        }
                      }

                      NotNotify = false;
                    } else {
                      NotNotify = true;
                    }
                  }
                  // TO HANDLE OTHER TYPE 11 OCT 2021
                  if (NotNotify) {
                    this.showContent(response);
                  }
                });
            });
          } else if (formResponse.data[k].type === "form") {
            showForm = true;
            this.unsetVarArr.push("form");
            this.showContentForm(formResponse, k);
            /** HANDLE navigation */
            if (formResponse.data[k].navigation !== undefined) {
              this.formNavigation = formResponse.data[k].navigation;
              this.formNavigationCss = environment.displayBlock;
            }
          } else if (formResponse.data[k].type === "displayGrid" && !showForm) {
            this.displaySubGridresp = formResponse.data[k];
            this.unsetVarArr.push("displayGrid");
            if (formResponse.data[k].navigation !== undefined) {
              this.navigationcss = environment.displayBlock;
              this.navigatinresponse = formResponse.data[k].navigation;
            } else {
              this.navigationcss = environment.displayNone;
            }
            // CODE TO HANDLE MULTIPLE DISPLAY GRID ON PAGE
            this.displaySubGridPageArr.push({
              grid: this.displaySubGridresp,
              navigationcss: this.navigationcss,
              navigatinresponse: this.navigatinresponse,
            });
          } else if (formResponse.data[k].type === "displayView" && !showForm) {
            this.displayViewresponse = formResponse;
            this.unsetVarArr.push("displayView");
          } else if (formResponse.data[k].type === "entryGrid" && !showForm) {
            // FOR handling only entry grid without form
            this.entryGrid = true;
            this.responseEditGrid = formResponse.data[k];
          } else if (formResponse.data[k].type === "dialog") {
            this.showText = formResponse.data[k].text;
            this.dialogWidth =
              formResponse.data[k].dialogWidth !== undefined
                ? formResponse.data[k].dialogWidth
                : "40%";
            this.showDialog = true;
            this.dialogTitle = formResponse.data[k].title;
            this.formWidth = formResponse.data[k].dialogWidth; // added 26 july
            this.displayViewPopUpArr = [];
            this.displaySubGridPopUp = [];
            this.buttonresponse = [];
            // this.setAllData[this.arrIndex].showText = this.showText; // comment 26 july
          } else if (formResponse.data[k].type === "dialogHtml") {
            /** ADDED TO HANDLE DIALOGHTML  */
            this.showDialogHtmlPage = true;
            this.showTextDialogPage = formResponse.data[k].text;
            //  this.dialogPageWidth = formResponse.data[k].width !== undefined ? formResponse.data[k].width : '40%';
            this.dialogPageWidth =
              formResponse.data[k].dialogWidth !== undefined
                ? formResponse.data[k].dialogWidth
                : "40%";
            this.formWidth = this.dialogPageWidth;
            this.showDialogTitle = formResponse.data[k].title;
            this.unsetVarArr.push("dialogHtml");
          } else if (formResponse.data[k].type === "dialogFile") {
            /** CODE TO HANDLE UPLOAD FILE*/
            this.showTextUpload = formResponse.data[k].text;
            this.showTitleUpload = formResponse.data[k].title;
            this.fileExtensions = formResponse.data[k].extensions;
            this.isMultiple = formResponse.data[k].multiple;
            this.formWidth = formResponse.data[k].width; // added 16 april
            this.extensionText = this.fileExtensions.replace(/[.]/g, " ");
            if (formResponse.data[k].searchWordsSize !== undefined) {
              this.searchWordsSize = formResponse.data[k].searchWordsSize;
            } else {
              this.searchWordsSize = 0;
            }
          } else if (formResponse.data[k].type === "htmlEdit") {
            /** CODE TO HANDLE HTMLEDIT ON PAGE */
            this.isHtmlEditPage = true;
            this.ckeditorview = environment.displayBlock;
            this.lastrevised = formResponse.data[k].lastrevised;
            this.tableclass = formResponse.data[k].tableclass;
            this.inquiryTitle = formResponse.data[k].title;
            this.htmlEdithexkey = formResponse.data[k].hexkey;
            this.content = formResponse.data[k].htmledit;
            this.getFileName = formResponse.data[k].filename;
            this.saveApi = formResponse.data[k].saveapi;
            this.enhanced = formResponse.data[k].enhanced;
            this.formWidth =
              formResponse.data[k].width !== undefined
                ? formResponse.data[k].width
                : "98%";
            if (formResponse.data[k].readonly == 1) {
              this.tinyButtion = environment.displayNone;
              this.tinyReadonly = 1;
              sessionStorage.setItem("tinyReadonly", "1");
            } else {
              this.tinyButtion = environment.displayBlock;
              this.tinyReadonly = 0;
              sessionStorage.setItem("tinyReadonly", "0");
            }

            this.page.content = formResponse.data[k].htmledit;

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
            htmlEditPageOb.tinyReadonly = this.tinyReadonly;
            htmlEditPageOb.enhanced = this.enhanced.toString();
            this.htmlEditPageArr.push(htmlEditPageOb);
          } else if (formResponse.data[k].type == "multiPartForm") {
            this.showFormButton = true; // to show button from tree control component
            this.showExpansionPanel(formResponse);
          } else if (formResponse.data[k].type == "treeControl") {
            this.treeControlMenu = formResponse;
          } else if (formResponse.data[k].hasOwnProperty("buttons")) {
            /** CODE TO HANDLE BUTTON ARRAY*/
            if (this.showFormButton) {
              this.buttonresponsePage = [];
              return;
            } else {
              for (let i = 0; i < formResponse.data[k].buttons.length; i++) {
                // CHANGE BUTTON STATE

                if (
                  formResponse.data[k].buttons[i].changeState !== undefined &&
                  formResponse.data[k].buttons[i].changeState
                ) {
                  // SET INPUT PROPERTY OF BUTTONS IN DISPLAY FORM COMPONENT
                  this.setBtnProperty =
                    formResponse.data[k].buttons[i].text +
                    "*" +
                    formResponse.data[k].buttons[i].isEnabled;

                  if (this.responseDtFormPage !== "") {
                    this.enableButtonArr.push({
                      buttonType: formResponse.data[k].buttons[i].buttonType,
                      buttonstext: formResponse.data[k].buttons[i].text,
                      isEnabled: formResponse.data[k].buttons[i].isEnabled,
                    });
                    this.enableButtonArr = [
                      ...new Map(
                        this.enableButtonArr.map((item) => [
                          item["buttonstext"],
                          item,
                        ])
                      ).values(),
                    ];
                    this.enableButton = this.enableButtonArr;
                  }

                  /** IDENTIFY WHICH BUTTON IS DISABLE AND ENABLE IT */
                  const btnInd = this.buttonresponsePage.findIndex(
                    (x) =>
                      x.disableOnClick == true &&
                      x.isEnabled == false &&
                      x.text == formResponse.data[k].buttons[i].text
                  );
                  if (btnInd >= 0) {
                    this.buttonresponsePage[btnInd].isEnabled =
                      formResponse.data[k].buttons[i].isEnabled;
                  }
                  // for popup
                  const btnIndPopup = this.buttonresponse.findIndex(
                    (x) =>
                      x.disableOnClick == true &&
                      x.isEnabled == false &&
                      x.text == formResponse.data[k].buttons[i].text
                  );
                  if (btnIndPopup >= 0) {
                    this.buttonresponse[btnIndPopup].isEnabled =
                      formResponse.data[k].buttons[i].isEnabled;
                  }

                  // 11 OCT 2021
                  if (btnInd == -1 && btnIndPopup == -1) {
                    if (this.expansionPanelData !== "") {
                      this.enableButton = [
                        {
                          buttonType:
                            formResponse.data[k].buttons[i].buttonType,
                          buttonstext: formResponse.data[k].buttons[i].text,
                          isEnabled: formResponse.data[k].buttons[i].isEnabled,
                        },
                      ];
                    }
                  }
                }

                this.buttonresponsePage.push(formResponse.data[k].buttons[i]);

                this.buttonresponse.push(formResponse.data[k].buttons[i]);
              }
              //  this.showPopUp = (this.showDialog) ? environment.displayBlock : environment.displayNone;
            }
          } else if (formResponse.data[k].type === "formUpdate") {
            showForm = true;
            this.showMainContent = false;
            this.formUpdateMain(formResponse, k);
          }

          this.unsetVariable();
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  handleCancelTreeControl(event) {
    sessionStorage.setItem("detectChangeEntryGrid", "");
    this.cancel(event.action, event.onPush, event.showMenu);
  }

  handleSubmitTreeControl(event) {
    this.showFormButton = false;
    this.showContent(event);
  }

  setWidthMultiPart(event: any) {
    if (this.formWidth == undefined || this.formWidth == "") {
      this.formWidth = event;
    }
  }
  showExpansionPanel(response) {
    this.expansionPanelData = response;
  }
  // UNSET VARIABLE ON PAGE CONTENT NOT POPUP
  unsetVariable() {
    // Check for form
    if (this.unsetVarArr.indexOf("form") == -1 && !this.showDialog) {
      this.responseDtFormPage = "";
    }
    if (this.unsetVarArr.indexOf("displayGrid") == -1 && !this.showDialog) {
      this.displaySubGridresp = "";
      this.displaySubGridPageArr = [];
      this.navigationcssPageArr = [];
      this.navigationresponsePageAr = [];
    }
    if (this.unsetVarArr.indexOf("displayView") == -1 && !this.showDialog) {
      this.displayViewresponse = "";
    }
    if (this.unsetVarArr.indexOf("dialogHtml") == -1 && !this.showDialog) {
      this.showDialogHtmlPage = false;
    }
  }

  // To show formUpdate data in main page
  formUpdateMain(formResponse, k) {
    this.getDataResponseShare = "true";
    if (this.getDataResponseShare) {
      sessionStorage.setItem("getDataResponseShare", this.getDataResponseShare);
    }
    sessionStorage.setItem("response_share", JSON.stringify(formResponse));
    this.response_share = JSON.parse(sessionStorage.getItem("response_share"));
    sessionStorage.setItem("showFromForm", "false");
    this.responseDtFormPage = formResponse;
    this.showFormButton = !formResponse.data[k].formSubmit
      ? formResponse.data[k].formSubmit
      : true;

    sessionStorage.setItem("showFromForm", JSON.stringify(this.showFormButton));
  }
  // To show form data in main page
  showContentForm(formResponse, k) {
    this.setMargin = formResponse.data[k].width;
    this.responseDtFormPage = formResponse;
    // this.showEnterKey = formResponse.data[k].enterKeySubmits;
    // 19 Feb
    // this.showEnterKey = true;
    this.setHexkey = formResponse.data[k].hexkey;
    this.formWidth = formResponse.data[k].width;
    // added to hold data
    sessionStorage.setItem("response_share", JSON.stringify(formResponse));
    this.showFormButton = !formResponse.data[k].formSubmit
      ? formResponse.data[k].formSubmit
      : true;

    sessionStorage.setItem("showFromForm", JSON.stringify(this.showFormButton));
  }

  handleProgressPopup(api, timeInterval) {
    if (this.mySubscription.closed) return;
    let NotNotify: boolean = false;
    let clearPage: boolean = false;
    // timeInterval = 20;
    this.setInterval = timeInterval;
    let a = 0;
    this.handleShowBusy(api);
    const promise = this._gpServices.menuApiCall(api).toPromise();
    promise
      .then((response) => {
        this.loader = environment.displayNone;
        this.showBusyText = "";
        if (a < 1) {
          this.loader = environment.displayNone;

          if (response === null || response == undefined) {
            return false;
          } else {
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].type == "notify") {
                if (
                  response.data[i].redirectUrl != undefined &&
                  response.data[i].redirectUrl
                ) {
                  window.location.href = response.data[i].redirectUrl;
                  return;
                }
                NotNotify = false;
                this.handleNotify(response.data[i]);
              } else if (response.data[i].type == "pageInit") {
                clearPage = response.data[i].clearPage;
                //  this.showContent(response);
              } else if (response.data[i].type == "progressResponse") {
                if (response.data[i].percent !== -1) {
                  this.progressText = response.data[i].text;
                  this.valueProgress = response.data[i].percent;
                } else {
                  if (response.data[i].text !== undefined) {
                    this.progressText = response.data[i].text;
                  }
                  this.valueProgress = "100";
                  this.mySubscription.unsubscribe();
                  a = a + 1;
                  if (response.data[i].api_call) {
                    this.buttonAPICall(
                      response.data[i].api_call,
                      "",
                      "api_call"
                    );
                  }
                }
                this.setAllData[this.arrIndex].progressTitle =
                  this.progressTitle;
                this.setAllData[this.arrIndex].progressText = this.progressText;
                this.setAllData[this.arrIndex].valueProgress =
                  this.valueProgress;
                NotNotify = true;
              } else {
                NotNotify = true;
              }
            }

            if (NotNotify) {
              this.showContent(response);
            }
          }
        }
      })
      .catch((error) => {});
  }

  handleProgressPopupbackup(api, timeInterval) {
    let NotNotify: boolean = false;
    let clearPage: boolean = false;
    this.setInterval = timeInterval;
    let a = 0;
    this.handleShowBusy(api);
    this.mySubscription = interval(this.setInterval).subscribe((x) => {
      if (this.mySubscription.closed) return;
      this._gpServices.menuApiCall(api).subscribe((response) => {
        this.loader = environment.displayNone;
        this.showBusyText = "";
        if (a < 1) {
          this.loader = environment.displayNone;

          if (response === null || response == undefined) {
            return false;
          } else {
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].type == "notify") {
                if (
                  response.data[i].redirectUrl != undefined &&
                  response.data[i].redirectUrl
                ) {
                  window.location.href = response.data[i].redirectUrl;
                  return;
                }
                NotNotify = false;
                this.handleNotify(response.data[i]);
              } else if (response.data[i].type == "pageInit") {
                clearPage = response.data[i].clearPage;
                //  this.showContent(response);
              } else if (response.data[i].type == "progressResponse") {
                if (response.data[i].percent !== -1) {
                  this.progressText = response.data[i].text;
                  this.valueProgress = response.data[i].percent;
                } else {
                  if (response.data[i].text !== undefined) {
                    this.progressText = response.data[i].text;
                  }
                  this.valueProgress = "100";
                  this.mySubscription.unsubscribe();
                  a = a + 1;
                  if (response.data[i].api_call) {
                    this.buttonAPICall(
                      response.data[i].api_call,
                      "",
                      "api_call"
                    );
                  }
                }
                this.setAllData[this.arrIndex].progressTitle =
                  this.progressTitle;
                this.setAllData[this.arrIndex].progressText = this.progressText;
                this.setAllData[this.arrIndex].valueProgress =
                  this.valueProgress;
                NotNotify = true;
              } else {
                NotNotify = true;
              }
            }

            if (NotNotify) {
              this.showContent(response);
            }
          }
        }
      });
    });
  }

  callTimeout(api) {
    if (this.mySubscription.closed) return;
    let NotNotify: boolean = false;
    let clearPage: boolean = false;
    let a = 0;
    this._gpServices.menuApiCall(api).subscribe((response) => {
      this.loader = environment.displayNone;
      this.showBusyText = "";
      if (a < 1) {
        this.loader = environment.displayNone;

        if (response === null || response == undefined) {
          return false;
        } else {
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].type == "notify") {
              if (
                response.data[i].redirectUrl != undefined &&
                response.data[i].redirectUrl
              ) {
                window.location.href = response.data[i].redirectUrl;
                return;
              }
              NotNotify = false;
              this.handleNotify(response.data[i]);
            } else if (response.data[i].type == "pageInit") {
              clearPage = response.data[i].clearPage;
              //  this.showContent(response);
            } else if (response.data[i].type == "progressResponse") {
              if (response.data[i].percent !== -1) {
                this.progressText = response.data[i].text;
                this.valueProgress = response.data[i].percent;
              } else {
                if (response.data[i].text !== undefined) {
                  this.progressText = response.data[i].text;
                }
                this.valueProgress = "100";
                this.mySubscription.unsubscribe();
                a = a + 1;
                if (response.data[i].api_call) {
                  this.buttonAPICall(response.data[i].api_call, "", "api_call");
                }
              }
              this.setAllData[this.arrIndex].progressTitle = this.progressTitle;
              this.setAllData[this.arrIndex].progressText = this.progressText;
              this.setAllData[this.arrIndex].valueProgress = this.valueProgress;
              NotNotify = true;
            } else {
              NotNotify = true;
            }
          }

          if (NotNotify) {
            this.showContent(response);
          }
        }
      }
    });
  }

  ///////// Bind Entry Grid Response /////////
  submitEditGrid(event) {
    ////// Added if conditions 25April2022/////
    if (event.setDeletedData) {
      this.showContent(event.response, event.setDeletedData);
    } else {
      this.showContent(event.response);
    }
    return;
  }

  showPopUpData(response, setDeletedData?) {
    ///// To handle Functionality of trash icon in entry grid 25April/////
    if (setDeletedData) {
      this.setAllData = [];
      this.zindexPopupOrder = 1;
    }
    this.displayViewPopUpArr = [];
    this.displaySubGridPopUpArr = [];
    this.buttonresponse = [];
    this.appMenuresponse = undefined;
    this.ckeditorview = environment.displayNone;
    this.responseDtForm = false;
    this.showDialog = false;
    const formResponse = response;
    this.printButton = environment.displayNone;
    this.htmlEditPopupArr = [];
    this.showFileUploadPopup = false;
    this.showDialogHtml = false;
    let formSubmit: boolean = false;
    let sendapi = "";
    let inter = 0;
    for (let k = 0; k < formResponse.data.length; k++) {
      if (formResponse.data[k].type == "popup") {
        this.mainPopuptitle = formResponse.data[k].title;
        this.showClose = formResponse.data[k].showClose;
        this.popup_width = formResponse.data[k].width;
        this.popup_top =
          this.position !== 0
            ? this.position - 350 + "px"
            : formResponse.data[k].top;
        this.popupMaxHeight = formResponse.data[k].maxHeight;
        this.popup_zindex = this.zindexPopupOrder;
        this.showPopUp = environment.displayBlock;
        /* COMMENTED BECAUSE WE HAVE TWO POPUP ONE FROM PREVIOUS CODE AND THE LATER FOR USING THE
                RESPONSE SAME AS DYNAMOHOMNE AND DYNAMOTOOLHOME COMPONENT*/
        // this.displayPoup = environment.displayBlock;
        // this.popup_top = formResponse.data[k].top;
        this.onCloseRedirect = formResponse.data[k].onCloseRedirect;
        this.onCloseApi = formResponse.data[k].onCloseApi;
        this.setparam = formResponse.data[k].action;
        this.arrIndex = this.zindexPopupOrder - 1;
        this.setAllData[this.arrIndex] = {
          popup_zindex: "",
          popup_top: "",
          mainPopuptitle: "",
          popupMaxHeight: "",
          onCloseRedirect: "",
          showPopUp: "",
          onCloseApi: "",
          setparam: "",
          showClose: "",
          popup_width: "",
          popup_height: "",
          displayView: "",
          setHexkey: "",
          responseDtForm: "",
          expansionPanelDataPopup: "",
          displayGrid: "",
          navigationcssArr: "",
          navigationresponseAr: "",
          appMenuresponse: "",
          dialogWidth: "",
          showText: "",
          showTextHtml: "",
          showDialog: "",
          showDialogHtml: "",
          tableclass: "",
          inquiryTitle: "",
          showTextPopup: "",
          showTitlePopup: "",
          fileExtensionsPopup: "",
          isMultiplePopup: "",
          extensionTextPopup: "",
          isHtmlEdit: "",
          pageContent: "",
          lastrevised: "",
          progressTitle: "",
          valueProgress: "",
          progressText: "",
          buttonresponse: "",
          htmlEditPopupArr: "",
        };
      } else if (formResponse.data[k].type === "pageInit") {
      } else if (formResponse.data[k].type === "displayView") {
        this.displayViewPopUp = formResponse;
        this.displayViewPopUpArr.push(this.displayViewPopUp);
        this.showFormButton = false;
      } else if (formResponse.data[k].type === "displayGrid") {
        this.displaySubGridPopUp = formResponse.data[k];

        if (formResponse.data[k].navigation !== undefined) {
          this.navigationcssPopup = environment.displayBlock;
          this.navigationresponsePopup = formResponse.data[k].navigation;
        } else {
          this.navigationcssPopup = environment.displayNone;
        }

        this.displaySubGridPopUpArr.push({
          grid: this.displaySubGridPopUp,
          navigationcss: this.navigationcssPopup,
          navigatinresponse: this.navigationresponsePopup,
        });
        this.showFormButton = false;
      } else if (formResponse.data[k].type === "dialog") {
        this.showText = formResponse.data[k].text;
        this.dialogWidth =
          formResponse.data[k].dialogWidth !== undefined
            ? formResponse.data[k].dialogWidth
            : "40%";
        this.showDialog = true;
        this.displayViewPopUpArr = [];
        this.displaySubGridPopUp = [];
        this.buttonresponse = [];
        this.setAllData[this.arrIndex].showText = this.showText;
      } else if (formResponse.data[k].type === "dialogHtml") {
        // MODIFY TO HANDLE DIALOG HTML
        this.showTextHtml = formResponse.data[k].text;
        this.dialogWidth =
          formResponse.data[k].dialogWidth !== undefined
            ? formResponse.data[k].dialogWidth
            : "100%";
        this.showDialogHtml = true;
      } else if (response.data[k].type === "dialogFile") {
        this.showTextPopup = response.data[k].text;
        this.showTitlePopup = response.data[k].title;
        this.fileExtensionsPopup = response.data[k].extensions;
        this.formWidth = response.data[k].width;
        this.isMultiplePopup = response.data[k].multiple;
        this.extensionTextPopup = this.fileExtensionsPopup.replace(/[.]/g, " ");
        this.showFileUploadPopup = true;
        this.uploadOpen = environment.displayBlock;
      } else if (formResponse.data[k].type === "form") {
        /** SET FORM IN setAllData */
        formSubmit = formResponse.data[k].formSubmit;
        this.responseDtForm = formResponse;
        // this.formInPopup(formResponse, k);
      } else if (formResponse.data[k].type == "multiPartForm") {
        formSubmit = true;
        this.showFormButton = false; // to show button from tree control component
        //  this.showFormButton = true;

        this.expansionPanelPopup = formResponse;
        this.setAllData[this.arrIndex].expansionPanelDataPopup =
          this.expansionPanelPopup;
      } else if (formResponse.data[k].type === "appMenu") {
        this.appMenuresponse = formResponse.data[k];
        if (formResponse.data[k].printApi) {
          this.printButton = environment.displayBlock;
        } else {
          this.printButton = environment.displayNone;
        }
      } else if (formResponse.data[k].type === "htmlEdit") {
        this.htmlEditPopupOb = {
          tableclass: "",
          inquiryTitle: "",
          pageContent: "",
          lastrevised: "",
          tinyButtion: "",
          saveApi: "",
          htmlEdithexkey: "",
          getFileName: "",
          enhanced: "",
          tinyReadonly: "",
        };
        this.ckeditorview = environment.displayBlock;
        this.lastrevised = formResponse.data[k].lastrevised;
        this.tableclass = formResponse.data[k].tableclass;
        this.inquiryTitle = formResponse.data[k].title;
        this.htmlEdithexkey = formResponse.data[k].hexkey;
        this.content = formResponse.data[k].htmledit;
        // this.content = "<ul>\n<li>w3schools</li>\n<li>angular</li>\n<li>chetu</li>\n</ul>";
        this.isHtmlEdit = true;
        this.getFileName = formResponse.data[k].filename;
        this.saveApi = formResponse.data[k].saveapi;
        // this.enhanced = true;
        this.enhanced = formResponse.data[k].enhanced;
        if (formResponse.data[k].readonly == 1) {
          this.tinyButtion = environment.displayNone;
          this.tinyReadonly = 1;
          sessionStorage.setItem("tinyReadonly", "1");
        } else {
          this.tinyButtion = environment.displayBlock;
          this.tinyReadonly = 0;
          sessionStorage.setItem("tinyReadonly", "0");
        }

        this.page.content = formResponse.data[k].htmledit;
        // SET CONTENT IN ARRAY
        this.htmlEditPopupOb.tableclass = this.tableclass;
        this.htmlEditPopupOb.inquiryTitle = this.inquiryTitle;
        this.htmlEditPopupOb.pageContent = this.page.content;
        this.htmlEditPopupOb.lastrevised = this.lastrevised;
        this.htmlEditPopupOb.tinyButtion = this.tinyButtion;
        this.htmlEditPopupOb.htmlEdithexkey = this.htmlEdithexkey;
        this.htmlEditPopupOb.getFileName = this.getFileName;
        this.htmlEditPopupOb.saveApi = this.saveApi;
        this.htmlEditPopupOb.tinyReadonly = this.tinyReadonly;
        this.htmlEditPopupOb.enhanced = this.enhanced.toString();
        this.htmlEditPopupArr.push(this.htmlEditPopupOb);
        this.setAllData[this.arrIndex].htmlEditPopupArr = this.htmlEditPopupArr;
      } else if (formResponse.data[k].type == "progress") {
        this.progressTitle = formResponse.data[k].title;
        this.progressText = formResponse.data[k].text;
        this.valueProgress = formResponse.data[k].percent;
        this.setAllData[this.arrIndex].progressTitle = this.progressTitle;
        this.setAllData[this.arrIndex].progressText = this.progressText;
        this.setAllData[this.arrIndex].valueProgress = this.valueProgress;
        if (response.data[k].hasOwnProperty("buttons")) {
          for (let j = 0; j < response.data[k].buttons.length; j++) {
            this.buttonresponse.push(response.data[k].buttons[j]);
          }
          this.setAllData[this.arrIndex].buttonresponse = this.buttonresponse;
        }
        sendapi = formResponse.data[k].api_call;
        inter = formResponse.data[k].interval * 1000;

        //return false;
      } else if (formResponse.data[k].hasOwnProperty("buttons")) {
        /** to handle button array */
        if (this.showFormButton && !this.showDialogHtml) {
          return;
        } else {
          if (formSubmit) {
          } else {
            for (let i = 0; i < formResponse.data[k].buttons.length; i++) {
              this.buttonresponse.push(formResponse.data[k].buttons[i]);
            }
          }
        }
      } else if (formResponse.data[k].type === "formUpdate") {
        this.formUpdatePopUp(formResponse);
      }
    }

    this.firstPopUpSet = true;

    /** code to scroll to top */
    if (this.position == 0) {
      window.scrollTo(0, 0);
    }

    /** CODE TO STORE DATA */

    this.setAllData[this.arrIndex].popup_zindex = this.popup_zindex;
    this.setAllData[this.arrIndex].popup_top = this.popup_top;

    this.setAllData[this.arrIndex].mainPopuptitle =
      this.mainPopuptitle == "" ? "Default" : this.mainPopuptitle;
    this.setAllData[this.arrIndex].popupMaxHeight = this.popupMaxHeight;
    this.setAllData[this.arrIndex].onCloseRedirect = this.onCloseRedirect;
    this.setAllData[this.arrIndex].showPopUp = this.showPopUp;
    this.setAllData[this.arrIndex].onCloseApi = this.onCloseApi;
    this.setAllData[this.arrIndex].setparam = this.setparam;
    this.setAllData[this.arrIndex].showClose = this.showClose;
    this.setAllData[this.arrIndex].popup_width = this.popup_width;
    this.setAllData[this.arrIndex].dialogWidth = this.dialogWidth;
    this.setAllData[this.arrIndex].displayView = this.displayViewPopUpArr;
    this.setAllData[this.arrIndex].displayGrid = this.displaySubGridPopUpArr;
    this.setAllData[this.arrIndex].navigationcssArr = this.navigationcssArr;
    this.setAllData[this.arrIndex].navigationresponseAr =
      this.navigationresponseAr;
    this.setAllData[this.arrIndex].appMenuresponse = this.appMenuresponse;
    this.setAllData[this.arrIndex].showDialog = this.showDialog;
    this.setAllData[this.arrIndex].showText = this.showText;
    this.setAllData[this.arrIndex].showDialogHtml = this.showDialogHtml;
    this.setAllData[this.arrIndex].showTextHtml = this.showTextHtml;
    this.setAllData[this.arrIndex].tableclass = this.tableclass;
    this.setAllData[this.arrIndex].inquiryTitle = this.inquiryTitle;
    // FOR DIALOG FILE IN POPUP
    this.setAllData[this.arrIndex].showTextPopup = this.showTextPopup;
    this.setAllData[this.arrIndex].showTitlePopup = this.showTitlePopup;
    this.setAllData[this.arrIndex].fileExtensionsPopup =
      this.fileExtensionsPopup;
    this.setAllData[this.arrIndex].isMultiplePopup = this.isMultiplePopup;
    this.setAllData[this.arrIndex].extensionTextPopup = this.extensionTextPopup;
    // added for multipart

    this.setAllData[this.arrIndex].pageContent = this.page.content;
    this.setAllData[this.arrIndex].isHtmlEdit = this.isHtmlEdit;
    this.setAllData[this.arrIndex].lastrevised = this.lastrevised;
    this.setAllData[this.arrIndex].buttonresponse = this.buttonresponse;
    this.setAllData[this.arrIndex].htmlEditPopupArr = this.htmlEditPopupArr;
    // FOR FORM IN POPUP

    this.setAllData[this.arrIndex].responseDtForm = this.responseDtForm;

    if (setDeletedData) {
      this.arrIndex--;
    } else {
      this.zindexPopupOrder++; // Increment for second, third popup
    } // Increment for second, third popup

    if (sendapi != "" || (sendapi != undefined && inter != 0)) {
      this.mySubscription = interval(inter).subscribe(async (x) => {
        this.handleProgressPopup(sendapi, inter);
      });
    }
  }

  formInPopup(formResponse, k) {
    this.responseDtForm = formResponse;
    //  this.showEnterKey = formResponse.data[k].enterKeySubmits;
    this.setHexkey = formResponse.data[k].hexkey;
    sessionStorage.setItem("response_share", JSON.stringify(formResponse));
    // CODE TO HANDLE BUTTON INSIDE FORM

    this.showFormButton = !formResponse.data[k].formSubmit
      ? formResponse.data[k].formSubmit
      : true;

    sessionStorage.setItem("showFromForm", JSON.stringify(this.showFormButton));

    this.setAllData[this.arrIndex].responseDtForm = this.responseDtForm;
    this.setAllData[this.arrIndex].setHexkey = this.setHexkey;
  }

  // To show formUpadte in Popup
  formUpdatePopUp(formResponse) {
    if (this.getDataResponseShare) {
      sessionStorage.setItem("getDataResponseShare", this.getDataResponseShare);
    }
    this.response_share = JSON.parse(sessionStorage.getItem("response_share"));
    this.responseDtForm = formResponse;
    sessionStorage.setItem("showFromForm", "false");
    this.setAllData[this.arrIndex].responseDtForm = this.responseDtForm;
  }
  cancelInParent(event) {
    if (!event.isEnabled) {
      return false;
    } else {
      this.showFormButton = false;

      // this.buttonAPICall(event.onPush, '', event.action); commented 27 april
      this.buttonAPICall(
        event.onPush,
        "",
        event.action,
        event.formChange,
        "",
        "",
        "",
        event
      );
    }
  }

  handleButtonInParent(event) {
    this.buttonAPICall(
      event.api,
      event.showMenu,
      event.action,
      event.formChanges,
      event.buttonType,
      event.isMultiPart,
      event.popup_zindex
    );
  }

  handleResTree(event) {
    this.showContent(event);
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  async onSelectFile(event) {
    if (event.target.files.length > 0) {
      const arrdata = [];
      for (let i = 0; i < event.target.files.length; i++) {
        const fileType =
          event.target.files[i].name.split(".")[
            event.target.files[i].name.split(".").length - 1
          ];

        await this.getBase64(event.target.files[i]).then((data) => {
          if (data !== null) {
            const fileName = data.toString().split("base64,")[1];
            const cols = {
              "File-Name": event.target.files[i].name,
              "Content-Type": event.target.files[i].type,
              "File-Size": event.target.files[i].size,
              Content: fileName,
            };
            arrdata.push(cols);
            const btnInd = this.buttonresponsePage.findIndex(
              (x) => x.action == "uploadSave"
            );
            if (btnInd >= 0) {
              this.buttonresponsePage[btnInd].isEnabled = true;
            }
            // for popup
            const btnIndPopup = this.buttonresponse.findIndex(
              (x) => x.action == "uploadSave"
            );
            if (btnIndPopup >= 0) {
              this.buttonresponse[btnIndPopup].isEnabled = true;
            }
          } else {
            return false;
          }
        });
      }
      this.FileData = arrdata;

      this.loader = environment.displayNone;
    } else {
      this.loader = environment.displayNone;
      toast(
        "please select any file",
        Number(sessionStorage.getItem("toastTimeOut"))
      );
    }
  }

  buttonAPICall(
    api,
    showMenu?,
    action?,
    formChange?,
    buttonType?,
    isMultiPart?,
    popup_zindex?,
    btnObj?
  ) {
    let buttonFound: boolean = false;

    ////// 27 April 2022 sessionset////

    this.parentContent = true;
    this.handleShowBusy(api);
    if (btnObj && btnObj.disableOnClick) {
      const btnInd = this.buttonresponsePage.findIndex(
        (x) =>
          x.disableOnClick == true && x.text == btnObj.text && !btnObj.popup
      );
      if (btnInd >= 0) {
        this.buttonresponsePage[btnInd].isEnabled = false;
      }
      // for popup
      const btnIndPopup = this.buttonresponse.findIndex(
        (x) => x.disableOnClick == true && x.text == btnObj.text && btnObj.popup
      );
      if (btnIndPopup >= 0) {
        this.buttonresponse[btnIndPopup].isEnabled = false;
      }
    }
    this.firstPopUpSet = false;
    let NotNotify = false;
    let clearPage = true;
    this.position = 0;
    this.valueProgress = "";
    this.progressTitle = "";
    this.showDialogHtml = false;
    this.displaySubGridPopUpArr = [];
    this.showDialog = false;
    this.sendDataEntryGrid = undefined;
    this.sendDataFromChild = "";
    this.sendDataFromMultiPart = "";
    this.enableButtonArr = [];
    if (showMenu) {
      this.setMargin = "";
      this.responseEditGrid = "";
      this.displaySubGridPageArr = [];
    }
    // TO HANDLE UPLOAD FUNCTIONALITY
    if (action == "uploadSave") {
      this.uploadFile(api);
      ///////25April2022///

      //return false;
    }
    if (action == "uploadHtml") {
      this.responseDtForm = "";
      this.showDialogHtmlPage = false;

      const elementToRemove = this.setAllData.length - 1;
      this.setAllData.splice(elementToRemove, 1);
      this.getPosition(action);
    } else if (
      popup_zindex !== undefined &&
      popup_zindex > 1 &&
      action !== "api_call" &&
      action !== "api_callprint"
    ) {
      // enable submit button after make changes
      if (this.responseDtFormPage !== "") {
        this.enableButton = this._dynamoService.enableFormBtn();
      }
      // HIDE PARENT POPUP DATA AND SHOW CHILD DATA

      const elementToRemove = popup_zindex - 1;
      this.setAllData.splice(elementToRemove, 1);
      this.zindexPopupOrder--;
      this.arrIndex--;
    }
    if (
      action == "routing" &&
      !showMenu &&
      popup_zindex <= 1 &&
      api == "retainState"
    ) {
      this.zindexPopupOrder--;
      this.arrIndex--;
      this.setAllData = [];
      this.showBusyText = "";
      this.showPopUp = environment.displayNone;
      this.loader = environment.displayNone;
      this.showBusyText = "";
      // enable submit button on form component
      if (this.responseDtFormPage !== "") {
        this.enableButton = this._dynamoService.enableFormBtn();
      }
      return false;
    }

    if (action == "api_callprint") {
      if (this.seqDataToSend == undefined) {
        // enable print button
        const findInd = this.buttonresponse.findIndex(
          (x) => x.action == "api_callprint"
        );
        if (findInd >= 0) {
          this.buttonresponse[findInd].isEnabled = true;
        }
        toast(
          "Please check one or more checkboxes to Print",
          Number(sessionStorage.getItem("toastTimeOut"))
        );
        this.loader = environment.displayNone;

        return false;
      }
      api = api + "&seq=" + encodeURIComponent(this.seqDataToSend);
    }

    /** ADDED FOR SUBMITTING DATA FROM FORM COMPONENT WHEN TYPE IS FORM */
    if (
      action == "api_call" &&
      buttonType == "submit" &&
      (isMultiPart == undefined || !isMultiPart)
    ) {
      const ob = { sendDataFromChild: true, onPush: api };

      this.sendDataFromChild = ob;
      this.loader = environment.displayNone;
      this.showBusyText = "";
      return false;
    }

    /** FOR SUBMITTING DATA FROM MULTIPART FORM COMPONENT WHEN TYPE IS MULTIPART FORM */
    if (action == "api_call" && buttonType == "submit" && isMultiPart) {
      const ob = { sendDataFromMultiPart: true, onPush: api };

      this.sendDataFromMultiPart = ob;
      this.loader = environment.displayNone;
      this.showBusyText = "";
      return false;
    }

    if (formChange == undefined) {
      formChange = false;
    }
    // TO DISAPLY BUTTONS IN POPUP WHEN USER CLICK ON CANCEL BUTTON IN MULTIPARTFORM DATA
    if (isMultiPart) {
      this.showFormButton = false;
    }

    // // 24 jan 2022
    if (btnObj == undefined || btnObj.newTab) {
      if (api.includes("?")) {
        api = api + "&formChanges=" + encodeURIComponent(formChange);
      } else {
        api = api + "?formChanges=" + encodeURIComponent(formChange);
      }
    }

    if (action == "openLink" && action !== undefined) {
      let res = {
        newPage: btnObj.newtab,
        url: api,
      };
      NotNotify = false;
      this.handleAction(res);
    } else if (action == "uploadCancel") {
      this.showPopUp = environment.displayNone;
      this.fileInput.nativeElement.value = null;
      this.myInputVariable.nativeElement.value = null;
      this.FileData = null;
      this.uploadOpen = environment.displayNone;
      this.showBusyText = "";
      this.searchPhraseInput = "";
      this.searchWordsSize = 0;
      return false;
    }
    if (
      action !== "api_call" &&
      action !== "uploadHtml" &&
      action !== "api_callprint"
    ) {
      /** ADDED TO MAKE API CALL FOR uploadHtml */
      return;
    }
    this._dynamoService.getDetails(api, "", "").subscribe(
      (response) => {
        this.loader = environment.displayNone;
        this.showBusyText = "";
        if (response === null) {
          return false;
        } else {
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].type === "pageInit") {
              clearPage = response.data[i].clearPage;
            } else if (response.data[i].type == "notify") {
              if (
                response.data[i].redirectUrl != undefined &&
                response.data[i].redirectUrl
              ) {
                window.location.href = response.data[i].redirectUrl;
                return;
              }
              NotNotify = false;
              this.handleNotify(response.data[i]);
            } else if (response.data[i].type === "action") {
              NotNotify = false;
              this.handleAction(response.data[i]);
            } else if (
              response.data[i].type === "buttons" ||
              action == "api_callprint"
            ) {
              // &&

              if (response.data[i].buttons !== undefined) {
                for (let k = 0; k < response.data[i].buttons.length; k++) {
                  // CHECK FOR TABINDEX IN BUTTON SO BUTTON CAN BE DISPLAYED RATHER THAN CHANGING isEnabled state
                  if (
                    !buttonFound &&
                    response.data[i].buttons[k].hasOwnProperty("tabindex")
                  ) {
                    buttonFound = true;
                  }
                  const btnInd = this.buttonresponse.findIndex(
                    (x) => x.text == response.data[i].buttons[k].text
                  );

                  if (btnInd >= 0) {
                    this.buttonresponse[btnInd].isEnabled =
                      response.data[i].buttons[k].isEnabled;
                  }
                }
              }
              if (
                (this.responseDtFormPage !== "" &&
                  response.data[i].type === "buttons") ||
                this.expansionPanelData !== ""
              ) {
                for (let k = 0; k < response.data[i].buttons.length; k++) {
                  /* this.enableButton = [{
                                           'buttonType': response.data[i].buttons[k].buttonType, 'buttonstext': response.data[i].buttons[k].text, 'isEnabled': response.data[i].buttons[k].isEnabled
                                       }]; */
                  if (this.expansionPanelData !== "") {
                    this.enableButton = [
                      {
                        buttonType: response.data[i].buttons[k].buttonType,
                        buttonstext: response.data[i].buttons[k].text,
                        isEnabled: response.data[i].buttons[k].isEnabled,
                      },
                    ];
                  } else {
                    this.enableButtonArr.push({
                      buttonType: response.data[i].buttons[k].buttonType,
                      buttonstext: response.data[i].buttons[k].text,
                      isEnabled: response.data[i].buttons[k].isEnabled,
                    });
                  }
                }
              }
            } else if (response.data[i].type === "setup") {
              NotNotify = false;
              const action = response.data[i].action;
              const onPush = response.data[i].onPush;
              const showMenu = response.data[i].showMenu;
              this.setCustomerName = response.data[i].customerName;

              sessionStorage.setItem(
                "customerName" + this._activeRoute.snapshot.queryParams.cc,
                JSON.stringify(this.setCustomerName)
              ); // 09032020

              this.cancel(action, onPush, showMenu);
            } else {
              NotNotify = true;
            }
          }
          if (this.enableButtonArr.length > 0) {
            this.enableButton = this.enableButtonArr;
          }
          if (NotNotify && clearPage) {
            this.responseEditGrid = "";
            this.displaySubGridPageArr = [];
            this.showContent(response);
          } else if ((NotNotify && !clearPage) || buttonFound) {
            this.showContent(response);
            return;
          }
        }
      },
      (error) => this.handleError(error)
    );
  }

  getPosition(id: string | any) {
    const obj = document.getElementById(id);
    this.position = obj.offsetTop;
  }
  handleShowBusy(url) {
    const property = this._dynamoService.getValue(url, "showBusy");
    if (property) {
      this.loader = environment.displayBlock;
    }
    const showBusyText = this._dynamoService.getValueShowBusyText(
      url,
      "showBusyText"
    );
    if (showBusyText !== undefined && showBusyText.length > 0) {
      this.showBusyText = showBusyText.replaceAll("+", " ");
    }
  }

  /* get page according to navigation in Popup */
  navChangedHandlerPopUp(url: string, index?) {
    this.getDataGrid = false;
    this.handleShowBusy(url);
    this.navigationresponseAr = [];

    this._dynamoService.getDetailsScan(url).subscribe(
      (response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].type === "notify") {
            this.handleNotify(response.data[i]);
          } else if (response.data[i].type === "pageInit") {
          } else {
            this.setAllData[this.arrIndex].displayGrid[index].grid =
              response.data[i];

            if (response.data[i].navigation !== undefined) {
              this.setAllData[this.arrIndex].displayGrid[
                index
              ].navigatinresponse = response.data[i].navigation;
            }
          }
        }
        this.loader = environment.displayNone;
        this.showBusyText = "";
      },
      (error) => this.handleError(error)
    );
  }

  uploadFile(api) {
    let clearPage = true;
    let NotNotify = false;
    if (this.FileData === undefined || this.FileData === null) {
      this.loader = environment.displayNone;
      return false;
    }

    this.handleShowBusy(api);

    this._dynamoService
      .uploadFile(this.FileData, api, this.searchPhraseInput)
      .subscribe(
        (response) => {
          this.loader = environment.displayNone;
          this.showBusyText = "";
          this.FileData = null;
          for (let k = 0; k < response.data.length; k++) {
            if (response.data[k].type == "notify") {
              if (
                response.data[k].alert !== undefined &&
                response.data[k].alert !== null
              ) {
                this.setmessage = response.data[k];
              } else if (
                response.data[k].msg !== undefined &&
                response.data[k].msg !== null
              ) {
                for (let jmsg = 0; jmsg < response.data[k].msg.length; jmsg++) {
                  toast(
                    response.data[k].msg[jmsg],
                    Number(sessionStorage.getItem("toastTimeOut"))
                  );
                }
                this.fileInput.nativeElement.value = null;
                this.myInputVariable.nativeElement.value = null;
                this.FileData = null;

                if (response.data[k].closePopup) {
                  this.uploadOpen = environment.displayNone;
                  this.showPopUp = environment.displayNone;
                  this.popup_top = "";
                  /// 29 April blank set all Data///
                  this.setAllData = [];
                  this.zindexPopupOrder = 1;
                }
              }
              // CHECK FOR NOTIFY SUCCESS TRUE OR FALSE

              if (response.data[k].success && response.data[k].showMenu) {
                this.cancel("routing", "home", true);
              }
            } else if (response.data[k].type == "pageInit") {
              clearPage = response.data[k].clearPage;
            } else {
              NotNotify = true;
            }
          }
          if (NotNotify && clearPage) {
            this.displaySubGridPageArr = [];
            this.navigationcssPageArr = [];
            this.showContent(response);
          }

          if (NotNotify && !clearPage) {
            this.showContent(response);
          }
        },
        (error) => this.handleError(error)
      );
  }
  redirectTo(event, popup_zindex?) {
    this.getDataGrid = false;
    if (event === "") {
      return;
    } else {
      this.cancel("routing", event.push_redirect, event.showMenu, popup_zindex);
    }
  }
  // cancel(param, api_route, showMenu, popup_zindex?) {

  //     this.setMargin = '';
  //     this.hideOnMobile = false;
  //     this.showTextUpload = '';
  //     this.valueProgress = '';
  //     this.progressTitle = '';
  //     this.getDataGrid = false;
  //     // enable submit button on form component
  //     if (this.responseDtFormPage !== '') {

  //         this.enableButton = this._dynamoService.enableFormBtn();
  //     }
  //     /** IDENTIFY WHICH BUTTON IS DISABLE AND ENABLE IT */

  //     const btnInd = this.buttonresponsePage.findIndex(x => x.disableOnClick == true && x.isEnabled == false);
  //     if (btnInd >= 0) {
  //         this.buttonresponsePage[btnInd].isEnabled = true;
  //     }
  //     // for popup
  //     const btnIndPopup = this.buttonresponse.findIndex(x => x.disableOnClick == true && x.isEnabled == false);
  //     if (btnIndPopup >= 0) {
  //         this.buttonresponse[btnIndPopup].isEnabled = true;
  //     }
  //     if (param == undefined || param == null) {
  //         //  this.displayPoup = environment.displayNone
  //         this.showPopUp = environment.displayNone;
  //     } else if (popup_zindex == undefined && showMenu) {
  //         this.callRouting(api_route, showMenu);
  //     } else if (api_route == 'closePopUp') {
  //         //  this.displayPoup = environment.displayNone
  //         this.showPopUp = environment.displayNone;
  //     } else if (popup_zindex > 1) {
  //         // HIDE PARENT POPUP DATA AND SHOW CHILD DATA

  //         const elementToRemove = popup_zindex - 1;
  //         this.setAllData.splice(elementToRemove, 1);

  //     } else if (param == 'routing' || param == 'uploadCancel') {

  //         this.callRouting(api_route, showMenu, param);

  //     } else if (param == 'api_call') {

  //         this.callApi(api_route);
  //     }
  //     this.firstPopUpSet = false;
  //     if (this.zindexPopupOrder > 0) {

  //         this.zindexPopupOrder--;

  //     }

  // }
  cancel(param, api_route, showMenu, popup_zindex?) {
    ///Add desableTab 27 april//
    if (this.setAllData.length == 1) {
      this.setAllData = [];
    }
    sessionStorage.setItem("desableTab", "false");
    this.setMargin = "";
    this.hideOnMobile = false;
    this.showTextUpload = "";
    this.valueProgress = "";
    this.progressTitle = "";
    this.getDataGrid = false;
    this.parentContent = true;
    // enable submit button on form component
    if (this.responseDtFormPage !== "") {
      this.enableButton = this._dynamoService.enableFormBtn();
    }
    /** IDENTIFY WHICH BUTTON IS DISABLE AND ENABLE IT */

    const btnInd = this.buttonresponsePage.findIndex(
      (x) => x.disableOnClick == true && x.isEnabled == false
    );
    if (btnInd >= 0) {
      this.buttonresponsePage[btnInd].isEnabled = true;
    }
    // for popup
    const btnIndPopup = this.buttonresponse.findIndex(
      (x) => x.disableOnClick == true && x.isEnabled == false
    );
    if (btnIndPopup >= 0) {
      this.buttonresponse[btnIndPopup].isEnabled = true;
    }

    if (param === undefined || param == null) {
      this.showPopUp = environment.displayNone;
    } else if (popup_zindex === undefined && showMenu) {
      this.callRouting(api_route, showMenu);
    } else if (api_route === "closePopUp") {
      this.showPopUp = environment.displayNone;
    } else if (param === "uploadCancel") {
      this.showPopUp = environment.displayNone;
      this.fileInput.nativeElement.value = null;
      this.myInputVariable.nativeElement.value = null;
      this.FileData = null;
      this.uploadOpen = environment.displayNone;
      this.searchPhraseInput = "";
      this.searchWordsSize = 0;
      /// 29 April blank set all Data///
      this.zindexPopupOrder = 1;
      this.setAllData = [];
      return false;
    } else if (popup_zindex > 1) {
      // HIDE PARENT POPUP DATA AND SHOW CHILD DATA
      if (param == "routing" && showMenu !== undefined && showMenu) {
        /** ADDED to handle po receiving */
        this.callRouting(api_route, showMenu);
      }
      const elementToRemove = popup_zindex - 1;
      this.setAllData.splice(elementToRemove, 1);
      /** enable popup button when parent popup is closed start*/
      // this.setAllData[popup_zindex].receiveDtForm='';
      this.firstPopUpSet = false;
      this.zindexPopupOrder--;
      this.arrIndex--;
    } else if (popup_zindex == 1) {
      this.setAllData = [];
      this.zindexPopupOrder = 1;
      this.arrIndex = 0;
      //this.zindexPopupOrder = 1;
      if (param == "routing") {
        this.callRouting(api_route, showMenu, popup_zindex);
      }
    } else if (param === "routing") {
      this.callRouting(api_route, showMenu);
    } else if (param === "api_call") {
      this.callApi(api_route);
    }
  }
  callRouting(api_route, showMenu, popup_zindex?) {
    const api_routee = "/" + api_route;
    this.hideOnMobile = true;
    if (window.location.hostname === environment.localhost) {
      if (
        window.location.pathname === api_routee ||
        window.location.pathname.toLowerCase().includes("home")
      ) {
        this.showPopUp = environment.displayNone;

        this.showMenu = showMenu;
      }
      if (showMenu === true) {
        this.responseDtFormPage = "";

        this.buttonresponse = [];
        this.responseEditGrid = "";
        this.displaySubGridresp = "";
        this.displayViewresponse = "";
        this.navigationcss = environment.displayNone;
        this.navigatinresponse = "";
        this.responseEditGrid = "";
        this.showDialogHtmlPage = false;
        this.displaySubGridPageArr = [];
        this.navigationcssPageArr = [];
        this.navigationresponsePageAr = [];
        this.isHtmlEditPage = false;
        this.htmlEditPageArr = [];
        this.expansionPanelData = "";
      }
      if (api_route === "retainState" || api_route === "showMenu") {
        this.showPopUp = environment.displayNone;
        if (api_route === "showMenu") {
          this.showMenu = true;
        }

        //////////Added ////////

        if (popup_zindex > 1) {
          const elementToRemove = popup_zindex - 1;
          this.setAllData.splice(elementToRemove, 1);
          /** enable popup button when parent popup is closed start*/
          this.enableButton = [
            {
              buttonType: "submit",
              buttonstext: "Print",
              isEnabled: true,
            },
          ];

          this.showPopUp = "block";
          return;
        }
      }
    } else if (window.location.hostname !== environment.localhost) {
      const a = window.location.pathname.split("/");
      if ("/" + a[3] === api_routee || a[3].toLowerCase().includes("home")) {
        this.showPopUp = environment.displayNone;

        this.showMenu = showMenu;
      }
      if (showMenu === true) {
        this.responseDtFormPage = "";
        this.buttonresponse = [];
        this.responseEditGrid = "";
        this.displaySubGridresp = "";
        this.displayViewresponse = "";
        this.navigationcss = environment.displayNone;
        this.navigatinresponse = "";
        this.responseEditGrid = "";
        this.showDialogHtmlPage = false;
        this.displaySubGridPageArr = [];
        this.navigationcssPageArr = [];
        this.navigationresponsePageAr = [];
        this.htmlEditPageArr = [];
        this.expansionPanelData = "";
      }
      if (api_route === "retainState" || api_route === "showMenu") {
        this.showPopUp = environment.displayNone;
        if (api_route === "showMenu") {
          this.showMenu = true;
        }

        if (api_route === "retainState") {
          // enable button for file upload

          if (this.responseDtFormPage !== "") {
            this.enableButton = this._dynamoService.enableFormBtn();
          }
        }
      }
    } else {
      this._router.navigate([api_routee]);
    }
  }

  /* When parameter is api_call call this function to call api */
  callApi(api_route) {
    let NotNotify = false;
    let clearPage = true;
    this.responseDtForm = "";
    this.handleShowBusy(api_route);
    this._gpServices.menuApiCall(api_route).subscribe(
      (response) => {
        if (response === null) {
          // this.loader = environment.displayNone;
          return false;
        } else {
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].type == "notify") {
              NotNotify = false;
              if (
                response.data[i].redirectUrl != undefined &&
                response.data[i].redirectUrl
              ) {
                window.location.href = response.data[i].redirectUrl;
                return;
              }
              this.handleNotify(response.data[i]);
            } else if (response.data[i].type == "action") {
              NotNotify = false;
              this.handleAction(response.data[i]);
            } else if (response.data[i].type == "pageInit") {
              clearPage = response.data[i].clearPage;
            } else {
              NotNotify = true;
              // this.showContent(response);
            }
          }
          if (NotNotify && clearPage) {
            this.displaySubGridPageArr = [];
            //  this.responseEditGrid = '';
            this.showContent(response);
          }
          if (NotNotify && !clearPage) {
            this.showContent(response);
          }
        }
        this.loader = environment.displayNone;
        this.showBusyText = "";
      },
      (error) => this.handleError(error)
    );
  }
  saveItemNotepad(ItemVaule: NgForm) {
    // this.loader = environment.displayBlock;
    this.handleShowBusy(this.saveApi);
    this._gpServices
      .saveItemNotepad(
        ItemVaule.value.content,
        this.hexkey,
        this.getFileName,
        this.saveApi
      )
      .subscribe(
        (response) => {
          this.loader = environment.displayNone;
          this.showBusyText = "";
          // toast(res.msg, 4000);
          if (response.data !== undefined && response.data !== null) {
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].type == "notify") {
                if (
                  response.data[i].redirectUrl != undefined &&
                  response.data[i].redirectUrl
                ) {
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

  /** When row is selected in displaygrid */
  getData(event) {
    this.parentContent = true;
    if (this.getDataGrid) {
      return false;
    }
    this.getDataGrid = true;
    let NotNotify = false;
    let clearPage = true;
    this.position = 0;
    if (event.url == undefined) {
      this.getDataGrid = false;
      this.loader = environment.displayNone;
      return;
    }

    if (
      event.closeOnRowSelect !== undefined &&
      JSON.parse(event.closeOnRowSelect)
    ) {
      this.showPopUp = environment.displayNone;
    }

    this.handleShowBusy(event.url);

    if (event.IsHDelete) {
      this.getDataGrid = false;
      this._dynamoService.DeleteByhexkey(event.url, event.hexKey).subscribe(
        (response) => {
          this.loader = environment.displayNone;
          this.showBusyText = "";
          //this.setAllData = [];
          this.zindexPopupOrder = 1;
          if (response === null) {
            return false;
          } else {
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].type == "notify") {
                if (
                  response.data[i].redirectUrl != undefined &&
                  response.data[i].redirectUrl
                ) {
                  window.location.href = response.data[i].redirectUrl;
                  return;
                }
                NotNotify = false;
                this.handleNotify(response.data[i]);
              } else if (response.data[i].type == "action") {
                NotNotify = false;
                this.handleAction(response.data[i]);
              } else if (response.data[i].type == "pageInit") {
                clearPage = response.data[i].clearPage;
              } else {
                NotNotify = true;
              }
            }
            if (NotNotify && clearPage) {
              this.displaySubGridPageArr = [];
              this.showContent(response);
            }

            if (NotNotify && !clearPage) {
              this.showContent(response);
            }
          }
        },
        (error) => this.handleError(error)
      );
    } else {
      this._dynamoService.getDetailsByhexkey(event.url, event.hexKey).subscribe(
        (response) => {
          // return;
          this.loader = environment.displayNone;
          this.showBusyText = "";
          if (response === null) {
            return false;
          } else {
            this.getDataGrid = false;

            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].type == "notify") {
                if (
                  response.data[i].redirectUrl != undefined &&
                  response.data[i].redirectUrl
                ) {
                  window.location.href = response.data[i].redirectUrl;
                  return;
                }
                NotNotify = false;
                this.getDataGrid = false;
                this.handleNotify(response.data[i]);
              } else if (response.data[i].type == "action") {
                NotNotify = false;
                this.handleAction(response.data[i]);
              } else if (response.data[i].type == "pageInit") {
                clearPage = response.data[i].clearPage;
              } else {
                NotNotify = true;
              }
            }
            if (NotNotify && clearPage) {
              this.displaySubGridPageArr = [];
              this.showContent(response);
            }
            if (NotNotify && !clearPage) {
              this.showContent(response);
            }
          }
        },
        (error) => this.handleError(error)
      );
    }
  }

  handleNotify(response) {
    if (response.msg !== undefined || response.alert !== undefined) {
      if (response.alert !== null || response.msg !== null) {
        this.setmessage = response;
      }
    }

    if (response.success) {
      //  && response.showMenu
      this.showPopUp = environment.displayNone;
      if (response.showMenu) {
        setTimeout(() => {
          //  this.showPopUp = environment.displayNone;
          this.cancel("routing", "dynamoToolHome", true);
        }, 500);
      } else if (this.setAllData.length) {
        this.cancel("routing", "retainState", false, 1);
      }
    }
  }
  resposncall(res) {
    this.formWidth = "";
    this.setButton = false;
    // this.buttonresponse = [];
    for (let k = 0; k < res.data.length; k++) {
      if (
        res.data[k].type == "displayView" ||
        res.data[k].type == "displayGrid"
      ) {
        this.dtnotepad = environment.displayNone;
        if (res.data[k].type == "displayView") {
          this.displayViewresponse = res;
        } else {
          this.childresponse = res.data[k];
          this.pageName = "generic";
        }
      }
    }

    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].type == "form") {
        this.dtnotepad = environment.displayNone;
        this.responseDtForm = res;
        this.formWidth = res.data[i].width;
        this.setButton = true;
        this.buttonresponse = [];
      } else if (res.data[i].hasOwnProperty("buttons") && !this.setButton) {
        this.buttonresponse = [];
        for (let k = 0; k < res.data[i].buttons.length; k++) {
          this.buttonresponse.push(res.data[i].buttons[k]);
        }
      } else if (res.data[i].type == "dtnotepad") {
        if (res.data[i].type === "htmlEdit") {
          this.dtnotepad = environment.displayBlock;
          this.content = res.data[i].htmledit;
          this.getFileName = res.data[i].filename;
          this.saveApi = res.data[i].saveapi;
        }
        if (res.data[i].readonly === 1) {
          sessionStorage.setItem("tinyReadonly", "1");
          sessionStorage.setItem("tinyToolbar", "insertfile undo redo");
        } else {
          sessionStorage.setItem("tinyReadonly", "0");
          sessionStorage.setItem(
            "tinyToolbar",
            "insertfile undo redo | bold italic underline | bullist numlist"
          );
        }
      } else if (res.data[i].type == "dtWebMenu") {
        // dtWebMenu previous dtmenu
        this.dtnotepad = environment.displayNone;
        this.appMenuresponse = res;
        if (res.data[i].printapi !== "") {
          this.printButton = environment.displayBlock;
        } else {
          this.printButton = environment.displayNone;
        }
      } else if (res.data[i].type == "notify") {
        this.handleNotify(res.data[i]);
      }
      if (res.data[i].navigation !== undefined) {
        this.navigationcss = environment.displayBlock;
        this.navigatinresponse = res.data[i].navigation;

        sessionStorage.setItem(
          "navigation",
          JSON.stringify(res.data[i].navigation)
        );
      } else {
        this.printButton = environment.displayNone;
        sessionStorage.removeItem("navigation");
      }
    }
  }
  printData() {
    const dataArray = [];
    for (let j = 0; j < this.appMenuresponse.data.length; j++) {
      for (let i = 0; i < this.appMenuresponse.data[j].menuitems.length; i++) {
        const menudata = {
          pgm: this.appMenuresponse.data[j].menuitems[i].pgm,
          star: this.appMenuresponse.data[j].menuitems[i].star,
          isPrint:
            this.appMenuresponse.data[j].menuitems[i].print === "Y" &&
            this.appMenuresponse.data[j].menuitems[i].star === "*"
              ? "print"
              : "",
          seq: this.appMenuresponse.data[j].menuitems[i].seq,
          blank: this.appMenuresponse.data[j].menuitems[i].blank,
          title:
            this.appMenuresponse.data[j].menuitems[i].title.length >= 40
              ? this.appMenuresponse.data[j].menuitems[i].title.substring(
                  0,
                  40
                ) + " ..."
              : this.appMenuresponse.data[j].menuitems[i].title,
          titleTooltip: this.appMenuresponse.data[j].menuitems[i].title,
          optpgm: this.appMenuresponse.data[j].menuitems[i].optpgm,
          enabledisable:
            this.appMenuresponse.data[j].menuitems[i].star === "*"
              ? ""
              : this.appMenuresponse.data[j].menuitems[i].star === "A"
              ? ""
              : environment.displayNone,
          opct:
            this.appMenuresponse.data[j].menuitems[i].star === "*"
              ? ""
              : this.appMenuresponse.data[j].menuitems[i].star === "A"
              ? ""
              : "0.6",
          color:
            this.appMenuresponse.data[j].menuitems[i].star === "A"
              ? "#f1ecc7"
              : "",
        };
        dataArray.push(menudata);
      }
    }

    this.printEdititemInquiry = dataArray;
    this.displayPoup = environment.displayBlock;
    this.zIndex = 11;
    this.isPrintAll = false;
  }
  onCheckboxChange(option, event) {
    if (event.target.checked) {
      this.checkedList.push(option.seq);
    } else {
      for (let i = 0; i < this.printEdititemInquiry.length; i++) {
        if (this.checkedList[i] === option.seq) {
          this.checkedList.splice(i, 1);
          if (this.checkedList.length === 0) {
            this.isPrintAll = false;
          }
        }
      }
    }
  }
  onPrintAll(event) {
    if (event.target.checked) {
      this.isTitle = "all";
      this.checkedList = [];
      for (let j = 0; j < this.printEdititemInquiry.length; j++) {
        if (this.printEdititemInquiry[j].isPrint === "print") {
          this.checkedList.push(this.printEdititemInquiry[j].seq);
        }
      }
    } else {
      this.isTitle = "";
      this.checkedList = [];
    }
  }

  printPopUp() {
    if (this.checkedList.toString() === "") {
      return false;
    }
    this.loader = environment.displayBlock;
    this._gpServices
      .getPrintedAppMenu(this.hexkey, this.checkedList.toString(), this.title)
      .subscribe(
        (response) => {
          if (response !== null && resizeTo !== undefined) {
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].type == "notify") {
                if (
                  response.data[i].redirectUrl != undefined &&
                  response.data[i].redirectUrl
                ) {
                  window.location.href = response.data[i].redirectUrl;
                  return;
                }
                this.handleNotify(response.data[i]);
              } else if (response.data[i].type === "url") {
                this.closePopUp();
                if (response.data[i].launch) {
                  window.open(response.data[i].url);
                }
              }
            }
            this.loader = environment.displayNone;
          }
        },
        (error) => this.handleError(error)
      );
  }
  // gpServices

  getButtonReceipt(response) {
    let NotNotify = false;
    // CHECK IF NO OPERATION ON DISPLAYGRID
    if (this.colsData == undefined) {
      this.colsData = this._dynamoService.getGridHexKey(true);
    }
    const cols = {
      hexkeys: this.colsData,
    };

    this._itemMaintenanceService.menuNext(cols, response.onPush).subscribe(
      (formResponse) => {
        this.loader = environment.displayNone;
        if (formResponse === null) {
          return false;
        } else if (
          formResponse.data !== undefined ||
          formResponse.data !== null
        ) {
          for (let i = 0; i < formResponse.data.length; i++) {
            if (formResponse.data[i].type == "pageInit") {
            } else if (formResponse.data[i].type == "notify") {
              if (
                response.data[i].redirectUrl != undefined &&
                response.data[i].redirectUrl
              ) {
                window.location.href = response.data[i].redirectUrl;
                return;
              }
              NotNotify = false;
              this.handleNotify(formResponse.data[i]);
            } else {
              NotNotify = true;
            }
          }
          if (NotNotify) {
            this.showContent(formResponse);
          }
        }
      },
      (error) => this.handleError(error)
    );
  }
  closePopUp() {
    this.displayPoup = environment.displayNone;
    this.zIndex = 0;
    this.printEdititemInquiry = [];
    this.checkedList = [];
    this.isPrintAll = false;
    this.isTitle = "";
  }

  receiveDtForm(event) {
    this.validationFormMessage = environment.formRequiredMessage;
    this.buttonresponse = [];
    this.loader = environment.displayNone;
    const data = [];
    this.firstPopUpSet = false;
    //this.zindexPopupOrder = 1;
    this.position = 0;
    this.showFormButton = false;
    //  this.setAllData = [];
    let entryGridDataArr: any[] = [];
    const allEntryGridData = [];
    const allData = [];
    let data_grid: any;
    this.getDataGrid = false;
    this.validateFormError = false;
    ////////////6 Jan 2022///////
    this.popup_zindex = "";
    this.expansionPanelPopup = "";
    // code to hide entrygrid in parent
    sessionStorage.setItem("entry_grid_show", "false");

    if (event.data !== undefined && event.data !== null) {
      for (let i = 0; i < event.data._directives.length; i++) {
        if (
          event.data._directives[i].errors !== undefined &&
          event.data._directives[i].errors !== null &&
          event.data._directives[i].errors !== "" &&
          event.data._directives[i].errors.required !== undefined &&
          event.data._directives[i].errors.required &&
          event.data._directives[i].hidden &&
          (event.data._directives[i].value == undefined ||
            event.data._directives[i].value == "")
        ) {
          //   this.validateFormError = true;
        }
        /*  if (i > 0) {
                      if (event.data._directives[i].name.toLowerCase() === event.data._directives[i - 1].name.toLowerCase()) {
                          continue;
                      } else {
                          if (event.data._directives[i].errors !== undefined && event.data._directives[i].errors !== null && event.data._directives[i].errors !== '' && event.data._directives[i].errors.required !== undefined && event.data._directives[i].errors.required && (event.data._directives[i].value == undefined || event.data._directives[i].value == '')) {
                              this.validateFormError = true;
                          }

                          const cols = {
                              name: event.data._directives[i].name.toLowerCase(),
                              value: event.data._directives[i].viewModel === undefined ? '' : event.data._directives[i].viewModel
                          };
                          data.push(cols);
                      }
                  } else {

                      // CHECK FOR REQUIRED
                      if (event.data._directives[i].errors !== undefined && event.data._directives[i].errors !== null && event.data._directives[i].errors !== '' && event.data._directives[i].errors.required !== undefined && event.data._directives[i].errors.required && (event.data._directives[i].value == undefined || event.data._directives[i].value == '')) {
                          this.validateFormError = true;
                      }
                      const cols = {
                          name: event.data._directives[i].name.toLowerCase(),
                          value: event.data._directives[i].viewModel === undefined ? '' : event.data._directives[i].viewModel
                      };
                      data.push(cols);

                  } */
      }
    }

    // TO GET THE TYPE AND VALUE
    if (event !== undefined && event.dtFormList !== undefined) {
      for (let i = 0; i < event.dtFormList.length; i++) {
        if (event.dtFormList[i].fields !== undefined) {
          for (let j = 0; j < event.dtFormList[i].fields.length; j++) {
            // CHECK FOR VALIDATION
            if (
              event.dtFormList[i].fields[j].isAddress == undefined &&
              !event.dtFormList[i].fields[j].hidden &&
              event.dtFormList[i].fields[j].required &&
              event.dtFormList[i].fields[j].value == ""
            ) {
              this.validateFormError = true;
              break;
            } else if (event.dtFormList[i].fields[j].isAddress == undefined) {
              const cols = {
                name: event.dtFormList[i].fields[j].name,
                value: event.dtFormList[i].fields[j].value,
                type: event.dtFormList[i].fields[j].type,
                readonly: event.dtFormList[i].fields[j].readonly
                  ? event.dtFormList[i].fields[j].readonly
                  : false,
              };
              if (
                event.dtFormList[i].fields[j].type == "select" ||
                event.dtFormList[i].fields[j].type == "radio"
              ) {
                cols["show"] = this._dynamoService.getShowForm(
                  event.dtFormList[i]
                );
              }
              data.push(cols);
            }
          }
        }
      }
    }

    // HANDLE VALUE OF ADDRESS COMPONENT
    if (event.addressFieldName.length > 0) {
      event.addressFieldName.splice(
        0,
        event.addressFieldName.length,
        ...new Set(event.addressFieldName)
      );

      for (let m = 0; m < event.addressFieldName.length; m++) {
        const fieldValue = <HTMLInputElement>(
          document.getElementById(event.addressFieldName[m])
        );

        data.push({ name: event.addressFieldName[m], value: fieldValue.value });
      }
    }
    // TO UPLOAD FILE DATA
    if (event.fileData.length > 0) {
      data.push({ name: event.fileFieldName, value: event.fileData });
    }

    const pcols = {
      type: "formData",
      cc: event.cc,
      ddname: event.ddName,
      hexkey: event.hexkey,
      viewid: event.viewId,
      fields: data,
    };

    /** FOR VIEW ID AND DDNAME */
    if (
      (sessionStorage.getItem("entryGridDataArr") !== undefined &&
        sessionStorage.getItem("entryGridDataArr") !== null &&
        sessionStorage.getItem("entryGridDataArr").length > 0 &&
        event.entryGrid !== undefined &&
        event.entryGrid !== "") ||
      (this.responseEditGrid !== "" && this.responseEditGrid !== undefined)
    ) {
      entryGridDataArr = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
    }
    for (let i = 0; i < entryGridDataArr.length; i++) {
      if (entryGridDataArr[i].length > 0) {
        for (let j = 0; j < entryGridDataArr[i].length; j++) {
          if (entryGridDataArr[i][j].dataIndex !== undefined) {
            allData.push({
              dataIndex: entryGridDataArr[i][j].dataIndex,
              cc: entryGridDataArr[i][j].cc,
              ddname: entryGridDataArr[i][j].ddname,
            });

            break;
          }
        }
      } else {
        allData.push({ dataIndex: null, cc: null, ddname: null });
      }
    }

    for (let i = 0; i < entryGridDataArr.length; i++) {
      if (entryGridDataArr[i].length > 0) {
        const fieldRowArrEn = [];
        for (let j = 0; j < entryGridDataArr[i].length; j++) {
          let invalidField = false;
          let requiredField = false;
          const hexkey = entryGridDataArr[i][j].hexkey;
          const isDeleted = entryGridDataArr[i][j].isDeleted;
          const editForm = entryGridDataArr[i][j].editForm;
          const field_Columns = [];
          if (entryGridDataArr[i][j].items !== undefined) {
            for (let m = 0; m < entryGridDataArr[i][j].items.length; m++) {
              for (
                let n = 0;
                n < entryGridDataArr[i][j].items[m].degColumns.length;
                n++
              ) {
                if (
                  entryGridDataArr[i][j].items[m].degColumns[n].hasOwnProperty(
                    "name"
                  ) &&
                  entryGridDataArr[i][j].items[m].degColumns[n].name.length !==
                    0
                ) {
                  const field_Column = {
                    name: entryGridDataArr[i][j].items[m].degColumns[n].name,
                    // 'value': entryGridDataArr[i][j].items[m].degColumns[n].type !== 'radio' && entryGridDataArr[i][j].items[m].degColumns[n].type !== 'search' ? (entryGridDataArr[i][j].items[m].degColumns[n].type == 'switch' && entryGridDataArr[i][j].items[m].degColumns[n].value == '')  ? false : entryGridDataArr[i][j].items[m].degColumns[n].value : entryGridDataArr[i][j].items[m].degColumns[n].value1,
                    value:
                      entryGridDataArr[i][j].items[m].degColumns[n].type !==
                        "radio" &&
                      entryGridDataArr[i][j].items[m].degColumns[n].type !==
                        "search"
                        ? entryGridDataArr[i][j].items[m].degColumns[n].type ==
                            "switch" &&
                          entryGridDataArr[i][j].items[m].degColumns[n].value ==
                            ""
                          ? false
                          : this._dynamoService.parseValue(
                              entryGridDataArr[i][j].items[m].degColumns[n]
                                .type,
                              entryGridDataArr[i][j].items[m].degColumns[n]
                                .value
                            )
                        : this._dynamoService.parseValue(
                            entryGridDataArr[i][j].items[m].degColumns[n].type,
                            entryGridDataArr[i][j].items[m].degColumns[n].value1
                          ),
                    isValid:
                      entryGridDataArr[i][j].items[m].degColumns[n].isValid,
                    required:
                      entryGridDataArr[i][j].items[m].degColumns[n].required,
                    type: entryGridDataArr[i][j].items[m].degColumns[n].type,
                    tabindex:
                      entryGridDataArr[i][j].items[m].degColumns[n].tabindex,
                  };
                  field_Columns.push(field_Column);
                  if (!entryGridDataArr[i][j].items[m].degColumns[n].isValid) {
                    // invalidField = true;
                  }
                  // ADDED FOR REQUIRED 29 may
                  if (
                    entryGridDataArr[i][j].items[m].degColumns[n].required &&
                    entryGridDataArr[i][j].items[m].degColumns[n].value !== 0 &&
                    entryGridDataArr[i][j].items[m].degColumns[n].value
                      .length >= 1
                  ) {
                    requiredField = true;
                  }
                }
              }
            }
          }

          const field_row_value = {
            fields: field_Columns, // field_row
            hexkey: hexkey,
            isDeleted: isDeleted,
            editForm: editForm,
            invalidField: invalidField,
            requiredField: requiredField,
          };

          if (field_row_value.isDeleted !== undefined) {
            fieldRowArrEn.push(field_row_value);
          }
        }
        if (allData[i] !== undefined && allData[i].dataIndex !== null) {
          allEntryGridData.push({
            gridRefNo: allData[i].dataIndex,
            cc: allData[i].cc,
            ddname: allData[i].ddname,
            rows: fieldRowArrEn,
            type: "entryGridData",
          });
        }
      }
    }

    // FORMAT REQUIRED
    data_grid = {
      data: [],
    };

    const data_to_insert = data_grid.data.length;
    data_grid.data[data_to_insert] = pcols;
    let fieldsValid = true;
    let requiredFieldsValid = true;
    const isInvalid = [];
    const requiredField = [];
    if (allEntryGridData.length > 0) {
      for (let i = 0; i < allEntryGridData.length; i++) {
        // FIND INDEX OF INVALID FIELD
        if (
          allEntryGridData[i].rows.findIndex((x) => x.invalidField === true) >=
          0
        ) {
          fieldsValid = false;
          isInvalid.push(fieldsValid);
        }
        data_grid.data[data_grid.data.length] = allEntryGridData[i];
      }

      // REQUIRED ENTRYGRID 29 MAY

      for (let i = 0; i < allEntryGridData.length; i++) {
        for (let j = 0; j < allEntryGridData[i].rows.length; j++) {
          if (!allEntryGridData[i].rows[j].isDeleted) {
            for (
              let k = 0;
              k < allEntryGridData[i].rows[j].fields.length;
              k++
            ) {
              if (
                allEntryGridData[i].rows[j].fields[k].required &&
                allEntryGridData[i].rows[j].fields[k].type == "number" &&
                allEntryGridData[i].rows[j].fields[k].value !== 0
              ) {
                allEntryGridData[i].rows[j].fields[k].requiredValid = true;
              } else if (
                allEntryGridData[i].rows[j].fields[k].required &&
                allEntryGridData[i].rows[j].fields[k].type == "number" &&
                allEntryGridData[i].rows[j].fields[k].value == 0
              ) {
                requiredFieldsValid = false;
                allEntryGridData[i].rows[j].fields[k].requiredValid = false;
                requiredField.push(requiredFieldsValid);
              } else if (
                allEntryGridData[i].rows[j].fields[k].required &&
                allEntryGridData[i].rows[j].fields[k].type !== "number" &&
                allEntryGridData[i].rows[j].fields[k].value.length == 0
              ) {
                requiredFieldsValid = false;
                allEntryGridData[i].rows[j].fields[k].requiredValid = false;
                requiredField.push(requiredFieldsValid);
              } else if (
                allEntryGridData[i].rows[j].fields[k].required &&
                allEntryGridData[i].rows[j].fields[k].type !== "number" &&
                allEntryGridData[i].rows[j].fields[k].value.length >= 1
              ) {
                allEntryGridData[i].rows[j].fields[k].requiredValid = true;
              }
            }
          }
        }
        // send data from here to child component
        this.validateEntryOnForm = allEntryGridData;
      }
    }

    if (isInvalid.indexOf(false) >= 0 || event.anyInvalidField) {
      toast(
        event.invalidMessage,
        Number(sessionStorage.getItem("toastTimeOut"))
      );
      // ENABLE SUBMIT BUTTON
      if (this.responseDtFormPage !== "") {
        this.enableButton = this._dynamoService.enableFormBtn();
      }
    } else if (requiredField.indexOf(false) >= 0) {
      // FOR REQUIRED ON ENTRYGRID VALIDATION
      toast(
        environment.singleEntryGrid,
        Number(sessionStorage.getItem("toastTimeOut"))
      );
      // ENABLE SUBMIT BUTTON
      if (this.responseDtFormPage !== "") {
        this.enableButton = this._dynamoService.enableFormBtn();
      }
      // ENABLE SUBMIT BUTTON ON POPUP
      if (this.setAllData[this.arrIndex].responseDtForm !== "") {
        this.enableButton = this._dynamoService.enableFormBtn();
      }
    } else if (this.validateFormError) {
      toast(
        this.validationFormMessage,
        Number(sessionStorage.getItem("toastTimeOut"))
      );
      // ENABLE SUBMIT BUTTON
      if (this.responseDtFormPage !== "") {
        this.enableButton = this._dynamoService.enableFormBtn();
      }
      // ENABLE SUBMIT BUTTON ON POPUP
      if (this.setAllData[this.arrIndex].responseDtForm !== "") {
        this.enableButton = this._dynamoService.enableFormBtn();
      }
    } else {
      this.sendData(data_grid, event.submitapi);
    }
  }

  // POST DATA TO SUBMIT API
  sendData(data_grid, submitapi) {
    let NotNotify = false;
    let clearPage = true;
    this.sendDataEntryGrid = undefined;
    this.handleShowBusy(submitapi);
    this._gpServices.sendData(submitapi, data_grid).subscribe(
      (formResponser) => {
        this.responseDtForm = "";
        this.loader = environment.displayNone;
        this.showBusyText = "";
        if (formResponser === null || formResponser === undefined) {
          return false;
        } else {
          const formResponse = JSON.parse(JSON.stringify(formResponser));
          for (let i = 0; i < formResponse.data.length; i++) {
            if (formResponse.data[i].type === "notify") {
              this.isValidSubmit = formResponse.data[i].isValid;
              if (
                formResponse.data[i].msg !== undefined ||
                formResponse.data[i].alert !== undefined
              ) {
                if (
                  formResponse.data[i].alert !== null ||
                  formResponse.data[i].msg !== null
                ) {
                  this.setmessage = formResponse.data[i];
                  if (this.setAllData.length > 0) {
                    if (
                      this.setAllData[this.setAllData.length - 1].popup_zindex >
                      0
                    ) {
                      this.enableButton = this._dynamoService.enableFormBtn();
                      this.cancel("routing", "home", true);
                    }
                  }
                }
              }

              if (this.dashboardUpdate) {
                NotNotify = true;
              } else {
                NotNotify = false;
              }
              // CHECK FOR NOTIFY SUCCESS TRUE OR FALSE
              if (
                formResponse.data[i].success &&
                formResponse.data[i].showMenu
              ) {
                this.showPopUp = environment.displayNone;
                this.cancel("routing", "home", true);
              }
            } else if (formResponse.data[i].type === "action") {
              NotNotify = false;

              this.handleAction(formResponse.data[i]);
              if (this.setAllData.length > 0) {
                this.cancel(
                  "routing",
                  "",
                  "",
                  this.setAllData[this.setAllData.length - 1].popup_zindex
                );
              }
              this.enableButton = this._dynamoService.enableFormBtn();
              return;
            } else if (formResponse.data[i].type == "pageInit") {
              clearPage = formResponse.data[i].clearPage;
              if (formResponse.data[i].dashboardUpdate) {
                this.dashboardUpdate = formResponse.data[i].dashboardUpdate;

                sessionStorage.setItem(
                  "dashboard",
                  JSON.stringify(formResponse)
                );
                const setDashboardData = formResponse;
                this.getDashboardData = JSON.stringify(setDashboardData);
              }
            } else if (formResponse.data[i].type === "entryGridRows") {
              NotNotify = false;
              this.sendDataEntryGrid = formResponse;
              this.showPopUp = environment.displayNone;
            } else {
              NotNotify = true;
            }
          }
          if (NotNotify && clearPage) {
            this.displaySubGridPageArr = [];
            this.displayViewresponse = "";
            this.displaySubGridPageArr = [];

            this.showContent(formResponse);
          }
          if (NotNotify && !clearPage) {
            this.showContent(formResponse);
          }
        }
      },
      (error) => this.handleError(error)
    );
  }
  hideEntryGrid(event) {
    if (event == "hideEntryGrid") {
      this.responseEditGrid = "";
      this.displaySubGridPageArr = [];
      this.navigationcssPageArr = [];
    }
  }
  hideButton(event) {
    if (event == "button") {
      this.buttonresponsePage = [];
    }
  }

  handleMultiPartForm(event) {
    this.showContent(event);
  }
  handleAction(response) {
    this.getDataGrid = false;
    if (response.newPage) {
      window.open(response.url, "_blank");
    } else {
      window.open(response.url, "_self");
    }

    if (response.newPage && response.success && response.showMenu) {
      this.showPopUp = environment.displayNone;
      this.cancel("routing", "dynamoToolHome", true);
    }
  }
  /* get page according to navigation */
  navChangedHandler(url: string, index?) {
    // TO HANDLE NAVIGATION FOR MULTIPLE DISPLAYGRID
    this.handleShowBusy(url);
    this._gpServices.menuApiCall(url).subscribe(
      (response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].type == "notify") {
            if (
              response.data[i].redirectUrl != undefined &&
              response.data[i].redirectUrl
            ) {
              window.location.href = response.data[i].redirectUrl;
              return;
            }
            this.handleNotify(response.data[i]);
          } else if (response.data[i].type == "pageInit") {
          } else {
            this.displaySubGridPageArr[index].grid = response.data[i];
            if (response.data[i].navigation !== undefined) {
              this.displaySubGridPageArr[index].navigatinresponse =
                response.data[i].navigation;
            }
          }
        }
        this.loader = environment.displayNone;
        this.showBusyText = "";
      },
      (error) => this.handleError(error)
    );
  }
  deleteCheckedData(event) {
    this.colsData = event;
  }

  handleError(error) {
    this.loader = environment.displayNone;
    this.getDataGrid = false;
    if (error.error.data !== undefined) {
      for (let i = 0; i < error.error.data.length; i++) {
        if (error.error.data[i].type == "notify") {
          this.handleNotify(error.error.data[i]);
        }
      }
    } else if (
      error.name !== undefined &&
      error.name === "HttpErrorResponse" &&
      error.status === 0 &&
      error.statusText === "Unknown Error"
    ) {
      this.handleNotify({
        alert: "alert",
        URL: error.url,
        title: error.title !== undefined ? error.title : "",
      });
    } else if (
      error.name !== undefined &&
      error.name === "HttpErrorResponse" &&
      error.status === 503 &&
      error.statusText === "Service Unavailable"
    ) {
      this.handleNotify({
        alert: "alert",
        URL: error.url,
        title: environment.serviceNotAvailable,
        statusCode: 503,
        message: error.error.message ? error.error.message : "Server Error 503",
      });
    } else if (error.message !== undefined) {
      alert(error.message);
    } else {
      if (error.error.alert !== undefined) {
        this.handleNotify(error.error);
      } else {
        toast(error.statusText, this.toastTimeOut);
      }
    }
  }
  print() {
    window.print();
  }
}
