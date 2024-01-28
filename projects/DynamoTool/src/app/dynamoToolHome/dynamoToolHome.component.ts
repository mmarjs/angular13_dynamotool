import { Component, OnInit, ViewChild, ElementRef, Pipe } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DynamoToolShareService } from "./dynamoToolShare.service";
import { toast } from "angular2-materialize";
import { environment } from "../../environments/environment";
import { DeviceDetectorService } from "ngx-device-detector";
import { NgForm } from "@angular/forms";
import { interval, Subscription } from "rxjs";
import { Location } from "@angular/common";
export class PageModel {
  content = "";
}

@Component({
  selector: "app-home",
  templateUrl: "./dynamoToolHome.component.html",
  styleUrls: ["./dynamoToolHome.component.css"],
  providers: [DynamoToolShareService],
})
export class DynamoToolHomeComponent implements OnInit {
  setresponse: any;
  loader: string;
  displayViewresponse: any;
  displaySubGridresp: any;
  navigationcss: boolean;
  navigatinresponse: string;
  navigationcssPopup: string;
  navigationresponsePopup: string;
  responseDtForm: any;
  setmessage: any;
  menuTitle: string;
  displayViewPopUp: any;
  displaySubGridPopUp: any;
  displayViewPopUpArr: any[] = [];
  displaySubGridPopUpArr: any[] = [];
  displayViewPageArr: any[] = [];
  displaySubGridPageArr: any[] = [];
  mainPopuptitle: string;
  showPopUp: string;
  showClose: boolean;
  popup_width: any;
  popup_height: any;
  popupMaxHeight: any;
  popup_top: string;
  pageData: any;
  popup_style: any;
  onCloseApi: string;
  desableTab: boolean;
  onCloseRedirect: string;
  setparam: string;
  buttonresponse: any[] = [];
  buttonresponsePage: any[] = [];
  responseDtFormPage: any;
  showMenu = true;
  userName: string;
  setHexkey: string;
  showText: string;
  buttonresponseDialog: any[] = [];
  showDialog = false;
  popup_zindex: any = 1;
  response_share: any;
  getDataResponseShare = "false";
  showMainContent = true;
  // added to handle button inside form
  showFormButton = false;
  entryGridResponse: any;
  responseEditGrid: any;
  entryGrid = false;
  emptyGrid = false;
  dialogWidth: any;
  navigationcssArr: any[] = [];
  navigationresponseAr: any[] = [];
  hideOnMobile = true;
  mobileDevice: boolean;
  isMobile: boolean;
  customerName: string;
  setMargin: any;
  setCustomerName: string;
  staticResponse: any;
  showDialogHtml = false;
  dialogWidthHtml: any;
  showTextHtml: any;
  zIndex: any;
  dynamicScript: string;
  formWidth: any;
  unsetVarArr: any[] = [];
  /** ADDED FOR SECOND POPUP */
  appMenuresponse: any;
  newValue: any;
  printButton: string;
  ckeditorview: string;
  lastrevised: string;
  page: PageModel;
  tableclass: any;
  inquiryTitle: string;
  tinyButtion: string;
  zindexPopupOrder: any = 1;
  firstPopUpSet = false;
  /** File upload */
  uploadOpen: string;
  buttonsFileUpload: any[] = [];
  fileExtensions: string;
  searchPhraseInput: string;
  searchWordsSize: number;
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
  content: string;
  getFileName: string;
  saveApi: string;
  isHtmlEdit = false;
  isHtmlEditPage = false;
  /** show dialoghtml on page */
  showDialogHtmlPage = false;
  showTextDialogPage: string;
  dialogPageWidth: string;
  showDialogTitle: string;
  /** show multiple displaygrid on page  */
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
  responseEditGridPopup: any;
  progressText: string;
  setBtnProperty: string;
  /** ADDED TO SHOW DIALOGFILE IN POPUP */
  showTextPopup: string;
  showTitlePopup: string;
  fileExtensionsPopup: string;
  isMultiplePopup: string;
  extensionTextPopup: string;
  showFileUploadPopup = false;
  position = 0;
  setInterval = 0;
  progressTitle: string;
  mySubscription: Subscription;
  expansionPanelData: any;
  expansionPanelPopup: any;
  getDashboardData: any;
  cc: string;
  serverName: string;
  dashboardUpdate = false;
  formNavigation: any;
  formNavigationCss: any;
  showFormButtonPopup = false;
  sendDataEntryGrid: any;
  sendDataFromChild: any;
  htmlEditTabindex: any[] = [];
  sendDataFromMultiPart: any;
  formSubmit = false;
  isValidSubmit = false;
  getDataGrid = false;
  isPopupInForm = "none";
  isPopupInEntryGrid = "none";
  parentContent = true;
  sideSection = 0;
  sendFormData = false;
  enableButton: any;
  enableButtonArr: any[] = [];
  enableBtnProperty = [{ buttonType: "submit", isEnabled: true }];
  validateFormError: boolean;
  validationFormMessage: any = environment.formRequiredMessage;
  validateEntryOnForm: any; // for sending data to form after required validation
  treeControlMenu: any;
  dialogTitle: string;
  showBusyText: string;
  deleteResponse: boolean = false; ///// For deleted response rendar 25 April
  setImage: string;
  setImagePath: string;
  @ViewChild("fileInput", { static: false }) fileInput;
  @ViewChild("inputFile", { static: false }) myInputVariable: ElementRef;
  constructor(
    private _router: Router,
    private _dynamoService: DynamoToolShareService,
    private deviceService: DeviceDetectorService,
    private _activeRoute: ActivatedRoute,
    private location: Location
  ) {
    /* if (window.location.href.includes('/DY/guitest')) {
            this.setImagePath = '/DY/guitest';
        } else if (window.location.href.includes('/DY/gui')) {
            this.setImagePath = '/DY/gui';
        } else if (window.location.href.includes('/CD/guitest')) {
            this.setImagePath = '/CD/guitest';
        } else if (window.location.href.includes('/CD/gui')) {
            this.setImagePath = '/CD/gui';
        } */
    if (window.location.hostname === environment.localhost) {
      this.serverName = environment.baseUrl;
    } else {
      this.serverName = window.location.origin;
    }
  }

  /*  @HostListener('document:keydown', ['$event'])
     handleKeyboardEvent(event: KeyboardEvent) {
          if (event.key == 'Escape') {
             this.showPopUp = environment.displayNone;
         }
     } */
  ngOnInit() {
    sessionStorage.setItem("entryGridDataArr", "");
    sessionStorage.setItem("setEntryGrid", "");
    sessionStorage.setItem("detectChangeEntryGrid", "");

    this.page = new PageModel();
    this.ckeditorview = environment.displayNone;
    this.firstPopUpSet = false;
    this.isMobile = this.deviceService.isMobile();
    if (this.isMobile) {
      this.mobileDevice = true;
    }

    this.loader = environment.displayNone;
    const body = document.getElementsByTagName("body")[0];
    body.classList.remove("login-bg");
    body.classList.remove("resp-main");
    this.dynamicScript = sessionStorage.getItem(
      "dynamicScript" + this._activeRoute.snapshot.queryParams.cc
    );

    this.customerIcon =
      sessionStorage.getItem(
        "customerIcon" + this._activeRoute.snapshot.queryParams.cc
      ) !== "undefined"
        ? JSON.parse(
          sessionStorage.getItem(
            "customerIcon" + this._activeRoute.snapshot.queryParams.cc
          )
        )
        : undefined;

    if (
      this._activeRoute.snapshot.queryParams["username"] !== undefined &&
      this._activeRoute.snapshot.queryParams["username"] !== null
    ) {
      const menu = decodeURIComponent(
        escape(window.atob(this._activeRoute.snapshot.queryParams["menu"]))
      );

      const username = atob(this._activeRoute.snapshot.queryParams["username"]);
      const logoutApi = atob(
        this._activeRoute.snapshot.queryParams["logoutApi"]
      );
      const customerName =
        this._activeRoute.snapshot.queryParams["customerName"];
      const cc = this._activeRoute.snapshot.queryParams["cc"];
      const application = this._activeRoute.snapshot.queryParams["application"];
      const token = atob(this._activeRoute.snapshot.queryParams["token"]);
      sessionStorage.setItem(
        "cc" + this._activeRoute.snapshot.queryParams.cc,
        cc
      );
      sessionStorage.setItem(
        "userName" + this._activeRoute.snapshot.queryParams.cc,
        JSON.stringify(username)
      );
      sessionStorage.setItem(
        "application" + this._activeRoute.snapshot.queryParams.cc,
        JSON.stringify(application)
      );
      sessionStorage.setItem(
        "customerName" + this._activeRoute.snapshot.queryParams.cc,
        JSON.stringify(customerName)
      );
      sessionStorage.setItem(
        "logoutApi" + this._activeRoute.snapshot.queryParams.cc,
        JSON.stringify(logoutApi)
      );
      this.userName = username;
      localStorage.setItem(
        "accessToken" + this._activeRoute.snapshot.queryParams.cc,
        "Bearer" + " " + token
      );
      this.setMenuProperty = { setMenuIcon: "", setMenuIconColor: "" };
      if (this._activeRoute.snapshot.queryParams["title"] !== undefined) {
        this.setMenuTitle = this._activeRoute.snapshot.queryParams["title"];
      }
      if (this._activeRoute.snapshot.queryParams["icon"] !== undefined) {
        this.setMenuProperty.setMenuIcon =
          this._activeRoute.snapshot.queryParams["icon"];
      }
      if (this._activeRoute.snapshot.queryParams["iconColor"] !== undefined) {
        this.setMenuProperty.setMenuIconColor =
          this._activeRoute.snapshot.queryParams["iconColor"];
      }
      if (
        this._activeRoute.snapshot.queryParams["customerName"] !== undefined
      ) {
        this.setCustomerName =
          this._activeRoute.snapshot.queryParams["customerName"];
      }

      const menuItem = JSON.parse(menu);
      this.setresponse = menuItem;
      const url: string = this._router.url.substring(
        0,
        this._router.url.indexOf("&")
      );
      this._router.navigateByUrl(url);
    } else if (
      sessionStorage.getItem(
        "clientmenu" + this._activeRoute.snapshot.queryParams.cc
      ) === null &&
      sessionStorage.getItem(
        "cc" + this._activeRoute.snapshot.queryParams.cc
      ) !== null
    ) {
      this._router.navigate(["dynamoToolLogin"], {
        queryParams: {
          cc: sessionStorage.getItem(
            "cc" + this._activeRoute.snapshot.queryParams.cc
          ),
        },
      });
    } else if (this._activeRoute.snapshot.queryParams["cc"] === undefined) {
      this.location.back();
    } else {
      this.cc = this._activeRoute.snapshot.queryParams.cc;
      this.setresponse = JSON.parse(
        sessionStorage.getItem(
          "clientmenu" + this._activeRoute.snapshot.queryParams.cc
        )
      );
      if (sessionStorage.getItem("dashboard") === null && this.cc === "NC") {
        this._router.navigate(["login"], {
          queryParams: { cc: this.cc },
        });
      }
      /** CODE TO GET DASHBOARD DATA FOR NCDS */

      this.getDashboardData = sessionStorage.getItem("dashboard");
      /** CODE TO CHECK SIDE SECTION IS AVILABLE OR NOT, IF NOT USE DEFAULT MENU */
      if (
        this.getDashboardData !== undefined &&
        this.getDashboardData !== null &&
        this.getDashboardData.length > 0
      ) {
        const sideHeadingSection = JSON.parse(this.getDashboardData);
        this.sideSection = sideHeadingSection.data.findIndex(
          (x) => x.sideSection !== undefined || x.headingSection !== undefined
        );
      }

      if (
        sessionStorage.getItem(
          "userName" + this._activeRoute.snapshot.queryParams.cc
        ) !== undefined &&
        sessionStorage.getItem(
          "userName" + this._activeRoute.snapshot.queryParams.cc
        ) !== null &&
        sessionStorage.getItem(
          "userName" + this._activeRoute.snapshot.queryParams.cc
        ) !== ""
      ) {
        this.userName = JSON.parse(
          sessionStorage.getItem(
            "userName" + this._activeRoute.snapshot.queryParams.cc
          )
        );
      }
      if (
        sessionStorage.getItem(
          "customerName" + this._activeRoute.snapshot.queryParams.cc
        ) !== undefined &&
        sessionStorage.getItem(
          "customerName" + this._activeRoute.snapshot.queryParams.cc
        ) !== null &&
        sessionStorage.getItem(
          "customerName" + this._activeRoute.snapshot.queryParams.cc
        ) !== ""
      ) {
        this.customerName = JSON.parse(
          sessionStorage.getItem(
            "customerName" + this._activeRoute.snapshot.queryParams.cc
          )
        );
      }

      if (
        sessionStorage.getItem(
          "menuTitle" + this._activeRoute.snapshot.queryParams.cc
        ) !== undefined &&
        sessionStorage.getItem(
          "menuTitle" + this._activeRoute.snapshot.queryParams.cc
        ) !== "undefined" &&
        sessionStorage.getItem(
          "menuTitle" + this._activeRoute.snapshot.queryParams.cc
        ) !== null &&
        sessionStorage.getItem(
          "menuTitle" + this._activeRoute.snapshot.queryParams.cc
        ) !== ""
      ) {
        this.setMenuTitle = JSON.parse(
          sessionStorage.getItem(
            "menuTitle" + this._activeRoute.snapshot.queryParams.cc
          )
        );
      }
      if (
        sessionStorage.getItem(
          "menuIcon" + this._activeRoute.snapshot.queryParams.cc
        ) !== undefined &&
        sessionStorage.getItem(
          "menuIcon" + this._activeRoute.snapshot.queryParams.cc
        ) !== null &&
        sessionStorage.getItem(
          "menuIcon" + this._activeRoute.snapshot.queryParams.cc
        ) !== ""
      ) {
        this.setMenuProperty.setMenuIcon = JSON.parse(
          sessionStorage.getItem(
            "menuIcon" + this._activeRoute.snapshot.queryParams.cc
          )
        );
      }
      if (
        sessionStorage.getItem(
          "menuIconColor" + this._activeRoute.snapshot.queryParams.cc
        ) !== undefined &&
        sessionStorage.getItem(
          "menuIconColor" + this._activeRoute.snapshot.queryParams.cc
        ) !== null &&
        sessionStorage.getItem(
          "menuIconColor" + this._activeRoute.snapshot.queryParams.cc
        ) !== ""
      ) {
        this.setMenuProperty.setMenuIconColor = JSON.parse(
          sessionStorage.getItem(
            "menuIconColor" + this._activeRoute.snapshot.queryParams.cc
          )
        );
      }
    }

    this.setDynamicScript(this.dynamicScript);
  }

  setDynamicScript(dynamicScript) {
    if (
      document.querySelector("script[async]") == null ||
      document.querySelector("script[async]") == undefined
    ) {
      // EXECUTE BELOW CODE TO ADD SCRIPT
      const fileref = document.createElement("script");
      fileref.setAttribute("async", "");
      fileref.setAttribute("defer", "");
      fileref.setAttribute("src", dynamicScript);
      document.getElementsByTagName("body")[0].appendChild(fileref);
    } else {
      return;
    }
  }
  /** When menu click on home page */
  recivemessage(event) {
    sessionStorage.setItem("entryGridDataArr", "");
    sessionStorage.setItem("setEntryGrid", "");
    sessionStorage.setItem("gridRefNumber", "");
    sessionStorage.setItem("detectChangeEntryGrid", "");
    sessionStorage.setItem("buttonsGrid", "");
    let NotNotify = false;
    this.getDataGrid = false;
    this.valueProgress = "";
    sessionStorage.setItem("entry_grid_show", "");
    this.showFormButton = false;
    event = JSON.parse(event);
    this.loader =
      event.menuDetails.menucode === undefined
        ? environment.displayBlock
        : environment.displayNone;
    this.menuTitle = event.menuDetails.title;
    this.buttonresponse = [];
    this.setAllData = [];
    this.buttonresponsePage = [];
    this.firstPopUpSet = false;
    this.zindexPopupOrder = 1;
    this.showTextUpload = "";
    this.displaySubGridPageArr = [];
    this.navigationcssPageArr = [];
    this.navigationresponsePageAr = [];
    this.expansionPanelData = "";
    this.expansionPanelPopup = "";
    this.dashboardUpdate = false;
    this.sendDataEntryGrid = undefined;
    this.sendDataFromChild = "";
    this.sendDataFromMultiPart = "";
    this.searchPhraseInput = "";
    this.searchWordsSize = 0;
    this.formWidth = undefined;
    this.isPopupInForm = "none";
    this.parentContent = true;
    this.enableButton = ""; // added 21 dec 2021
    if (
      event.menuDetails.url !== undefined &&
      event.menuDetails.url !== null &&
      event.menuDetails.url !== ""
    ) {
      if (event.menuDetails.newtab == true) {
        window.open(event.menuDetails.url, "_blank");
        this.loader = environment.displayNone;
        return;
      } else if (event.menuDetails.newtab == false) {
        window.location.href = event.menuDetails.url;
      }
      this.loader = environment.displayNone;
    }
    if (event.menuDetails.menucode !== undefined) {
      this._dynamoService
        .getSecondMenu(
          "/dt/webMenu/get?",
          event.menuDetails.menucode,
          event.menuDetails.title,
          event.menuDetails.icon,
          event.menuDetails.iconcolor,
          event.args.menucode,
          event.args.cc
        )
        .subscribe(
          (response) => {
            if (response == null) {
              return false;
            } else {
              this.setresponse = response;
              const res = JSON.parse(JSON.stringify(response));
              if (res.data !== undefined) {
                for (let i = 0; i < res.data.length; i++) {
                  if (res.data[i].type == "notify") {
                    if (
                      res.data[i].redirectUrl != undefined &&
                      res.data[i].redirectUrl
                    ) {
                      window.location.href = res.data[i].redirectUrl;
                      return;
                    }
                    this.handleNotify(res.data[i]);
                  } else {
                    this.setMenuProperty = {
                      setMenuIcon: "",
                      setMenuIconColor: "",
                    };
                    this.setMenuTitle = res.data[i].title;
                    this.setMenuProperty.setMenuIcon = res.data[i].icon;
                    this.setMenuProperty.setMenuIconColor =
                      res.data[i].iconcolor;
                  }
                }
              }
            }
          },
          (error) => this.handleError(error)
        );
      return false;
    } else {
      /** To unset all variables of second popup */

      this._dynamoService
        .getDetails(
          event.menuDetails.api,
          event.menuDetails.title,
          event.menuDetails.url,
          event.menuDetails.newtab
        )
        .subscribe(
          (response) => {
            this.loader = environment.displayNone;
            if (response === null) {
              return false;
            } else {
              /* if(event.menuDetails.api == '/dt/examples/entryGrid') {
                    alert('my entrygrid');
                    response = entryGrid;
                } else if(event.menuDetails.api == '/dy/PurchaseOrder/linkedPOSetup') {
                    alert('my displaygrid');
                    response = displayGrid;
                } */
              for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].type === "pageInit") {
                }
                if (response.data[i].type === "notify") {
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
                } else {
                  this.hideOnMobile = false;
                  NotNotify = true;
                }
              }
              if (NotNotify) {
                this.showContent(response);
              }
            }
          },
          (error) => this.handleError(error)
        );
    }
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
              this.navigationcss = true;
              this.navigatinresponse = formResponse.data[k].navigation;
            } else {
              this.navigationcss = false;
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
            let clientFilter = false;

            if (formResponse.data[k].clientFilter === true) {
              this.navigationcss = false;
              this.navigatinresponse = '';
              clientFilter = true;
            }
            else if (formResponse.data[k].navigation !== undefined) {
              this.navigationcss = true;
              this.navigatinresponse = formResponse.data[k].navigation;
            } else {
              this.navigationcss = false;
            }
            // CODE TO HANDLE MULTIPLE DISPLAY GRID ON PAGE
            this.displaySubGridPageArr.push({
              grid: this.displaySubGridresp,
              navigationcss: this.navigationcss,
              navigatinresponse: this.navigatinresponse,
              clientFilter
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

  // To show form data in main page
  showContentForm(formResponse, k) {
    this.setMargin = formResponse.data[k].width;
    this.responseDtFormPage = formResponse;
    this.setHexkey = formResponse.data[k].hexkey;
    this.formWidth = formResponse.data[k].width;
    // added to hold data
    sessionStorage.setItem("response_share", JSON.stringify(formResponse));
    this.showFormButton = !formResponse.data[k].formSubmit
      ? formResponse.data[k].formSubmit
      : true;

    sessionStorage.setItem("showFromForm", JSON.stringify(this.showFormButton));
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
  showExpansionPanel(response) {
    this.expansionPanelData = response;
  }

  handleMultiPartForm(event) {
    this.showContent(event);
  }
  getPosition(id: string | any) {
    const obj = document.getElementById(id);
    this.position = obj.offsetTop;
  }

  handleResTree(event) {
    this.showContent(event);
  }

  handleProgressPopup(api, timeInterval) {
    let NotNotify: boolean = false;
    let clearPage: boolean = false;
    this.setInterval = timeInterval;
    let a = 0;
    this.handleShowBusy(api);
    this.mySubscription = interval(this.setInterval).subscribe((x) => {
      if (this.mySubscription.closed) return;
      this._dynamoService.getDetailsScan(api).subscribe((response) => {
        this.loader = environment.displayNone;
        this.showBusyText = "";
        if (a < 1) {
          this.loader = environment.displayNone;

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
                this.setAllData[this.arrIndex].progressTitle = this
                  .progressTitle
                  ? this.progressTitle
                  : "";
                this.setAllData[this.arrIndex].progressText = this.progressText
                  ? this.progressText
                  : "";
                this.setAllData[this.arrIndex].valueProgress = this
                  .valueProgress
                  ? this.valueProgress
                  : "";
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

  showPopUpData(response, setDeletedData?) {
    ///// To handle Functionality of trash icon in entry grid 25April/////
    if (setDeletedData) {
      this.setAllData = [];
      this.zindexPopupOrder = 1;
    }
    const btnInd = this.buttonresponsePage.findIndex(
      (x) => x.disableOnClick == false && x.text == "New Level"
    );
    if (btnInd >= 0) {
      this.buttonresponsePage[btnInd].isEnabled = false;
    }
    this.displayViewPopUpArr = [];
    this.displaySubGridPopUpArr = [];
    this.buttonresponse = [];
    this.appMenuresponse = undefined;
    this.ckeditorview = environment.displayNone;
    this.showDialog = false;
    const formResponse = response;
    this.printButton = environment.displayNone;
    this.htmlEditPopupArr = [];
    this.showFileUploadPopup = false;
    this.showDialogHtml = false;
    let formSubmit = false;
    this.getDataGrid = false;
    try {
      for (let k = 0; k < formResponse.data.length; k++) {
        if (formResponse.data[k].type == "pageInit") {
        } else if (formResponse.data[k].type == "popup") {
          sessionStorage.setItem("desableTab", "true");
          this.mainPopuptitle = formResponse.data[k].title;
          this.showClose = formResponse.data[k].showClose;
          this.popup_width = formResponse.data[k].width;
          this.parentContent = formResponse.data[k].parentContent;
          // this.popup_height = formResponse.data[k].height;
          this.popupMaxHeight = formResponse.data[k].maxHeight;
          // this.popup_top = this.position !== 0 ? (this.position - 350) + 'px' : formResponse.data[k].top;
          // this.position + 300
          this.popup_top =
            this.position !== 0
              ? this.position - 350 + "px"
              : formResponse.data[k].top;
          this.popup_zindex = this.zindexPopupOrder;
          this.showPopUp = environment.displayBlock;
          this.onCloseRedirect = formResponse.data[k].onCloseRedirect;
          this.onCloseApi = formResponse.data[k].onCloseApi;
          this.setparam = formResponse.data[k].action;
          this.arrIndex = this.zindexPopupOrder - 1;
          /// 29 April splice use ////
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
            entryGridPopup: "",
            setHexkey: "",
            responseDtForm: "",
            expansionPanelData: "",
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
            progressTitle: "",
            progressText: "",
            valueProgress: "",
            pageContent: "",
            lastrevised: "",
            buttonresponse: "",
            htmlEditPopupArr: "",
            searchWordsSize: 0,
          };
        } else if (
          response.data[k].type === "entryGrid" &&
          !this.responseDtForm
        ) {
          this.responseEditGridPopup = response.data[k];
          this.setAllData[this.arrIndex].entryGridPopup =
            this.responseEditGridPopup;
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

          this.isMultiplePopup = response.data[k].multiple;
          this.extensionTextPopup = this.fileExtensionsPopup.replace(
            /[.]/g,
            " "
          );
          this.showFileUploadPopup = true;
          if (response.data[k].searchWordsSize !== undefined) {
            this.searchWordsSize = response.data[k].searchWordsSize;
          } else {
            this.searchWordsSize = 0;
          }
          /** UNSET VARIABLE IN POPUP */
          this.uploadOpen = environment.displayBlock;
        } else if (formResponse.data[k].type === "progress") {
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
          this.handleProgressPopup(
            formResponse.data[k].api_call,
            formResponse.data[k].interval * 1000
          );
          //// Comment breat on 2 may 2022////
          // break;
          // return false;
        } else if (formResponse.data[k].type === "form") {
          this.responseDtForm = "";
          formSubmit = formResponse.data[k].formSubmit;
          /** SET FORM IN setAllData */

          // CODE TO HANDLE BUTTON INSIDE FORM

          sessionStorage.setItem(
            "response_share_popup",
            JSON.stringify(formResponse)
          );

          this.responseDtForm = formResponse;

          // this.formInPopup(formResponse, k);
        } else if (formResponse.data[k].type == "multiPartForm") {
          // this.showFormButton = false; // to show button from tree control component
          this.showFormButton = true;
          this.responseDtForm = "";
          this.expansionPanelPopup = formResponse;
          this.setAllData[this.arrIndex].expansionPanelData =
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
          this.isHtmlEdit = true;
          this.getFileName = formResponse.data[k].filename;
          this.saveApi = formResponse.data[k].saveapi;
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
          this.setAllData[this.arrIndex].htmlEditPopupArr =
            this.htmlEditPopupArr;
        } else if (formResponse.data[k].hasOwnProperty("buttons")) {
          /** to handle button array */

          if (this.showFormButton && !this.showDialogHtml) {
            // return;
          } else {
            if (formSubmit) {
            } else {
              for (let i = 0; i < formResponse.data[k].buttons.length; i++) {
                // set popup property 21 april

                formResponse.data[k].buttons[i].popup = true;
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
    } catch (ex) { }
    /** CODE TO STORE DATA */

    this.setAllData[this.arrIndex].popup_zindex = this.popup_zindex;
    this.setAllData[this.arrIndex].popup_top = this.popup_top;
    this.setAllData[this.arrIndex].popupMaxHeight = this.popupMaxHeight;
    this.setAllData[this.arrIndex].mainPopuptitle = this.mainPopuptitle;
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
    /** FOR DIALOG FILE IN POPUP */
    // this.setAllData[this.arrIndex].expansionPanelData = this.expansionPanelPopup; // added for multipart
    this.setAllData[this.arrIndex].showTextPopup = this.showTextPopup;
    this.setAllData[this.arrIndex].showTitlePopup = this.showTitlePopup;
    this.setAllData[this.arrIndex].fileExtensionsPopup =
      this.fileExtensionsPopup;
    this.setAllData[this.arrIndex].isMultiplePopup = this.isMultiplePopup;
    this.setAllData[this.arrIndex].searchWordsSize = this.searchWordsSize;
    this.setAllData[this.arrIndex].extensionTextPopup = this.extensionTextPopup;
    this.setAllData[this.arrIndex].pageContent = this.page.content;
    this.setAllData[this.arrIndex].isHtmlEdit = this.isHtmlEdit;
    this.setAllData[this.arrIndex].lastrevised = this.lastrevised;
    this.setAllData[this.arrIndex].buttonresponse = this.buttonresponse;
    this.setAllData[this.arrIndex].htmlEditPopupArr = this.htmlEditPopupArr;
    /** FOR FORM IN POPUP  */
    this.setAllData[this.arrIndex].responseDtForm = this.responseDtForm;
    if (setDeletedData) {
      this.arrIndex--;
    } else {
      this.zindexPopupOrder++; // Increment for second, third popup
    }
  }

  // To show formUpadte in Popup
  formUpdatePopUp(formResponse) {
    if (this.getDataResponseShare) {
      sessionStorage.setItem("getDataResponseShare", this.getDataResponseShare);
    }
    this.response_share = JSON.parse(
      sessionStorage.getItem("response_share_popup")
    );
    this.responseDtForm = formResponse;
    sessionStorage.setItem("showFromForm", "false");
    this.setAllData[this.arrIndex].responseDtForm = this.responseDtForm;
  }

  /** When enter key is pressed */
  receiveDtFormEnter(event): void {
    this.receiveDtForm(event);
  }
  handleCancelTreeControl(event) {
    sessionStorage.setItem("detectChangeEntryGrid", "");
    this.cancel(event.action, event.onPush, event.showMenu);
  }

  handleSubmitTreeControl(event) {
    this.showFormButton = false;
    this.showContent(event);
  }
  getNewOutputApi(event) {
    this.buttonAPICall(event);
  }
  cancelInParent(event) {
    if (!event.isEnabled) {
      return false;
    } else {
      this.showFormButton = false;
      // event.onPush,'',event.action,event.formChange
      // this.buttonAPICall(event.onPush, '', event.action, event.formChange); //commented 21 april
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

  receiveDtForm(event) {
    this.validationFormMessage = environment.formRequiredMessage;
    this.buttonresponse = [];
    this.loader = environment.displayNone;
    const data = [];
    this.firstPopUpSet = false;
    //// 8Feb commented//////
    this.zindexPopupOrder = 1;
    this.position = 0;
    this.showFormButton = false;
    // 7 feb 2022////
    // this.setAllData = [];
    let entryGridDataArr: any[] = [];
    const allEntryGridData = [];
    const allData = [];
    let data_grid: any;
    this.getDataGrid = false;
    this.parentContent = true;
    this.validateFormError = false;
    /////////// 6 Jan 2022///////
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
          (event.data._directives[i].value == undefined ||
            event.data._directives[i].value == "")
        ) {
          this.validateFormError = true;
        }
      }
    }
    // event.dtFormList
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
            }
            ///// For Min Max of number 20April////
            // else if (event.dtFormList[i].fields[j].isAddress == undefined && !event.dtFormList[i].fields[j].hidden && event.dtFormList[i].fields[j].value !== '' && event.dtFormList[i].fields[j].max!==undefined && event.dtFormList[i].fields[j].value > event.dtFormList[i].fields[j].max || event.dtFormList[i].fields[j].min!==undefined && event.dtFormList[i].fields[j].value < event.dtFormList[i].fields[j].min) {
            //    this.validateFormError = true;
            //     this.validationFormMessage = '';
            //     break;
            // }
            else if (event.dtFormList[i].fields[j].isAddress == undefined) {
              let cols: any = {};
              cols = {
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
        data.push({
          name: event.addressFieldName[m],
          value: fieldValue.value,
          type: fieldValue.type,
          readonly: fieldValue.readOnly ? fieldValue.readOnly : false,
        });
      }
    }
    // TO UPLOAD FILE DATA
    if (event.fileData.length > 0) {
      data.push({
        name: event.fileFieldName,
        value: event.fileData,
        type: "file",
      });
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
                    readonly: entryGridDataArr[i][j].items[m].degColumns[n]
                      .readonly
                      ? entryGridDataArr[i][j].items[m].degColumns[n].readonly
                      : false,
                    tabindex:
                      entryGridDataArr[i][j].items[m].degColumns[n].tabindex,
                    //  ADDED TABINDEX 4 MARCH 2022
                  };
                  field_Columns.push(field_Column);

                  if (!entryGridDataArr[i][j].items[m].degColumns[n].isValid) {
                    // commented 29 dec 2021
                    invalidField = true;
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

    const notepadData = JSON.parse(sessionStorage.getItem(`FormNotepad`));
    this.htmlEditTabindex = [];
    for (let i = 0; i < notepadData ? notepadData.length : 0; i++) {
      if (notepadData[i].hexkey == "") {
        data.push({
          name: notepadData[i].name,
          value: notepadData[i].value,
          type: notepadData[i].type,
        });
      } else {
        this.isHtmlEdit = true;
        this.htmlEditTabindex.push(notepadData[i]);
      }
    }

    const data_to_insert = data_grid.data.length;
    data_grid.data[data_to_insert] = pcols;
    if (this.isHtmlEdit == true) {
      data_grid.data[data_grid.data.length] = {
        type: "notepad",
        content: this.htmlEditTabindex,
      };
    }
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

      // REQUIRED ENTRYGRID

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
        // this.enableButton = this.enableBtnProperty;
        this.enableButton = this._dynamoService.enableFormBtn();
      }
      // ENABLE SUBMIT BUTTON ON POPUP
      // alert(this.setAllData[this.arrIndex]);
      if (
        this.setAllData[this.arrIndex] !== undefined &&
        this.setAllData[this.arrIndex].responseDtForm !== ""
      ) {
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
      if (
        this.setAllData[this.arrIndex] !== undefined &&
        this.setAllData[this.arrIndex].responseDtForm !== ""
      ) {
        this.enableButton = this._dynamoService.enableFormBtn();
      }
    } else {
      this.sendData(data_grid, event.submitapi);
    }
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

  // POST DATA TO SUBMIT API
  sendData(data_grid, submitapi) {
    let NotNotify = false;
    let clearPage = true;
    this.sendDataEntryGrid = undefined;
    this.handleShowBusy(submitapi);
    this.responseDtForm = "";
    this._dynamoService.menuNext(data_grid, submitapi).subscribe(
      (formResponse) => {
        this.loader = environment.displayNone;
        this.showBusyText = "";
        if (formResponse === null) {
          return false;
        } else {
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
                      this.setAllData.length != 0 &&
                      this.setAllData[this.setAllData.length - 1].popup_zindex >
                      0
                    ) {
                      this.enableButton = this._dynamoService.enableFormBtn();
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
              this.cancel(
                "routing",
                "",
                "",
                this.setAllData[this.setAllData.length - 1].popup_zindex
              );
              return;
            } else if (formResponse.data[i].type === "dtWebMenu") {
              this.showContent(formResponse);
              clearPage = formResponse.data[i].clearPage;
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
            this.responseDtForm = "";
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

  /* When parameter is routing call this function */
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
        this.navigationcss = false;
        this.navigatinresponse = "";
        this.responseEditGrid = "";
        this.showDialogHtmlPage = false;
        this.displaySubGridPageArr = [];
        this.navigationcssPageArr = [];
        this.navigationresponsePageAr = [];
        this.isHtmlEditPage = false;
        this.htmlEditPageArr = [];
        this.expansionPanelData = "";
        this.formNavigation = "";
        this.formNavigationCss = environment.displayNone;
      }
      if (api_route === "retainState" || api_route === "showMenu") {
        this.showPopUp = environment.displayNone;
        if (api_route === "showMenu") {
          this.showMenu = true;
        }

        //////////Added by 7feb if cndition ////////////

        if (popup_zindex > 1) {
          const elementToRemove = popup_zindex - 1;
          this.setAllData.splice(elementToRemove, 1);
          /** enable popup button when parent popup is closed start*/
          // this.enableButton = [{
          //     'buttonType': 'submit', 'buttonstext': 'Print', 'isEnabled': true
          // }];
          this.showPopUp = "block";
          return;
        }
        // ////21 Feb/////////
        // if (popup_zindex == 1) {
        //     this.enableButton = this._dynamoService.enableFormBtn();
        //     this.showPopUp = 'block';
        //  }
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
        this.navigationcss = false;
        this.navigatinresponse = "";
        this.responseEditGrid = "";
        this.showDialogHtmlPage = false;
        this.displaySubGridPageArr = [];
        this.navigationcssPageArr = [];
        this.navigationresponsePageAr = [];
        this.htmlEditPageArr = [];
        this.expansionPanelData = "";
        this.formNavigation = "";
        this.formNavigationCss = environment.displayNone;
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

    this._dynamoService
      .getDetails(api_route, "", "")

      .subscribe(
        (response) => {
          this.loader = environment.displayNone;
          this.showBusyText = "";
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
  }

  /* get page according to navigation */
  navChangedHandler(url: string, index?) {
    // TO HANDLE NAVIGATION FOR MULTIPLE DISPLAYGRID

    this.handleShowBusy(url);

    this._dynamoService.getDetailsScan(url).subscribe(
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

  redirectTo(event, popup_zindex?) {
    this.getDataGrid = false;
    if (event === "") {
      return;
    } else {
      this.cancel("routing", event.push_redirect, event.showMenu, popup_zindex);
    }
  }

  hideEntryGrid(event) {
    if (event === "hideEntryGrid") {
      this.responseEditGrid = "";
      this.displaySubGridPageArr = [];
      this.navigationcssPageArr = [];
    }
  }
  hideButton(event) {
    if (event === "button") {
      this.buttonresponsePage = [];
    }
  }
  setCustomerInHeader(event) {
    this.getDataGrid = false;
    if (event === undefined) {
      return;
    } else {
      this.setCustomerName = event.customerName;
      this.customerIcon = event.customerIcon; // to use as icon class
      this.cancel(event.action, event.onPush, event.showMenu);
    }
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
          //////4jan comment setalldata[] variable/////
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
    if (btnObj !== undefined && btnObj.isEnabled == false) {
      return;
    }
    let buttonFound: boolean = false;
    sessionStorage.setItem("desableTab", "true");
    ////// 27 April 2022 sessionset////
    this.parentContent = true;
    this.handleShowBusy(api);
    const btnInd = this.buttonresponsePage.findIndex(
      (x) => x.disableOnClick == false && x.text == "New Level"
    );
    if (btnInd >= 0) {
      this.buttonresponsePage[btnInd].isEnabled = false;
    }

    if (action == "routing" && popup_zindex == 1) {
      this.buttonresponsePage[btnInd].isEnabled = true;
    }

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
      sessionStorage.setItem("desableTab", "false");
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
      sessionStorage.setItem("desableTab", "false");
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
    // const btnInds = this.buttonresponsePage.findIndex(x => x.disableOnClick == false && x.text == 'New Level');
    // if(this.zindexPopupOrder==1)
    // {
    //     this.buttonresponsePage[btnInds].isEnabled = true;
    // }
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

  desabledTab(event) {
    const ss = sessionStorage.getItem("desableTab");
    if (event.key == "Tab" && ss == "true") {
      return false;
    }
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
          this.FileData = null;
          this.loader = environment.displayNone;
          this.showBusyText = "";
          sessionStorage.setItem("desableTab", "false");
          for (let k = 0; k < response.data.length; k++) {
            if (response.data[k].type == "notify") {
              this.fileInput.nativeElement.value = null;
              this.myInputVariable.nativeElement.value = null;
              this.FileData = null;
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
            const btnIndFile = this.buttonsFileUpload.findIndex(
              (x) => x.action == "uploadSave"
            );
            if (btnIndFile >= 0) {
              this.buttonsFileUpload[btnIndFile].isEnabled = true;
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

  getSelectedAppMenu(newValue) {
    let NotNotify = false;
    this.newValue = newValue;
    this.loader = "block";
    this._dynamoService
      .getSelectedItemInquiry(newValue.optionApi, newValue.optpgm)
      .subscribe(
        (response) => {
          this.loader = environment.displayNone;
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
              } else {
                NotNotify = true;
              }
            }
            if (NotNotify) {
              this.showContent(response);
            }
          }
        },
        (error) => this.handleError(error)
      );
  }

  sendDataToPrint(event) {
    this.seqDataToSend = event;
  }
  submitEntryGrid(formResponse) {
    let NotNotify = false;
    let clearPage = true;
    for (let i = 0; i < formResponse.data.length; i++) {
      if (formResponse.data[i].type == "notify") {
        if (
          formResponse.data[i].redirectUrl != undefined &&
          formResponse.data[i].redirectUrl
        ) {
          window.location.href = formResponse.data[i].redirectUrl;
          return;
        }
        NotNotify = false;
        this.handleNotify(formResponse.data[i]);
      } else if (formResponse.data[i].type == "action") {
        NotNotify = false;

        this.handleAction(formResponse.data[i]);
      } else if (formResponse.data[i].type == "pageInit") {
        clearPage = formResponse.data[i].clearPage;
        if (formResponse.data[i].dashboardUpdate) {
          this.dashboardUpdate = formResponse.data[i].dashboardUpdate;

          sessionStorage.setItem("dashboard", JSON.stringify(formResponse));
          const setDashboardData = formResponse;
          this.getDashboardData = JSON.stringify(setDashboardData);
        }
      } else if (formResponse.data[i].type == "entryGridRows") {
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
      this.responseDtForm = "";
      this.showContent(formResponse);
    }
    if (NotNotify && !clearPage) {
      this.showContent(formResponse);
    }
  }
  handleAction(response) {
    this.getDataGrid = false;
    if (response.url.includes("http")) {
      if (response.newPage) {
        window.open(response.url, "_blank");
        /////// 4jan add cancle function///
        // this.cancel("routing","","",this.setAllData[this.setAllData.length-1].popup_zindex);
      } else {
        window.open(response.url, "_self");
      }
    } else if (
      window.location.hostname == environment.localhost &&
      !response.url.includes("http")
    ) {
      // CHECK FOR LOCALHOST
      if (response.newPage) {
        window.open(this.serverName + response.url, "_blank");
      } else {
        window.open(this.serverName + response.url, "_self");
      }
    } else if (
      window.location.hostname !== environment.localhost &&
      !response.url.includes("http")
    ) {
      // CHECK IF NOT LOCALHOST
      if (response.newPage) {
        window.open(this.serverName + response.url, "_blank");
      } else {
        window.open(this.serverName + response.url, "_self");
      }
    }

    if (response.newPage && response.success && response.showMenu) {
      this.showPopUp = environment.displayNone;

      this.cancel("routing", "home", true);
    }
  }
  saveItemNotepad(ItemVaule: NgForm, htmlEdithexkey, getFileName, saveApi) {
    this.handleShowBusy(saveApi);
    this._dynamoService
      .saveItemNotepad(
        ItemVaule.value.content,
        htmlEdithexkey,
        getFileName,
        saveApi
      )
      .subscribe(
        (response) => {
          this.loader = environment.displayNone;
          this.showBusyText = "";

          if (response.data !== undefined && response.data !== null) {
            for (let i = 0; i < response.data.length; i++) {
              this.handleNotify(response.data[i]);
            }
          }
        },
        (error) => this.handleError(error)
      );
  }

  setWidthMultiPart(event) {
    if (this.formWidth == undefined || this.formWidth == "") {
      this.formWidth = event;
    }
  }
  handleNotify(response) {
    if (response.msg !== undefined || response.alert !== undefined) {
      if (response.alert !== null || response.msg !== null) {
        this.setmessage = response;
      }
    }
    if (response.success) {
      // && response.showMenu 13 oct 2021
      this.showPopUp = environment.displayNone;
      if (response.showMenu) {
        this.cancel("routing", "home", true);
      } else if (this.setAllData.length) {
        this.cancel("routing", "retainState", false, 1);
      }
    }
  }

  handleError(error) {
    this.getDataGrid = false;
    this.loader = environment.displayNone;
    if (error.error !== undefined && error.error.data !== undefined) {
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
        toast(error.statusText, Number(sessionStorage.getItem("toastTimeOut")));
      }
    }
  }
  print() {
    window.print();
  }
}
