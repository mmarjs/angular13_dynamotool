import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { toast } from "angular2-materialize";

import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription, interval } from "rxjs";
import { environment } from "../../environments/environment";
import { DynamoToolShareService } from "../dynamoToolHome/dynamoToolShare.service";
declare var Materialize: any;
export class PageModel {
  content = "";
}
@Component({
  selector: "api-call",
  templateUrl: "./apiCall.component.html",
  styleUrls: ["./apiCall.component.css"],
  providers: [DynamoToolShareService],
})
export class ApiCallComponent implements OnInit, AfterViewChecked {
  constructor(
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
  ddName: string;
  gridid: string;
  cc: string;
  viewid: string;
  hexkey: string;
  url: string;
  dtnotepad: string;
  filename: string;
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
  inventory_table: string;
  print_table: string;
  inventory_viewtable: string;
  buttonresponse: any;
  text: string;
  icon: string;
  color: string;
  APICall: string;
  token: string;
  navigatinresponse: any;
  getDataGrid = false;
  navigationcss: string;
  // NEW REQUIREMENT
  staticData: any;
  setresponse: any;
  displaySubGridresp: any;
  setmessage: any;
  menuTitle: string;
  showEnterKey = false;
  displayViewPopUp: any; // added from here
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
  popup_top: string;
  pageData: any;
  popup_style: any;
  onCloseApi: string;
  onCloseRedirect: string;
  setparam: string;
  sendDataFromChild: any;
  sendDataFromMultiPart: any;
  // buttonresponse: any[] = [];
  responseDtFormPage: any;
  showMenu = true;
  pageContent: string;
  userName: string;
  setHexkey: string;
  showText: string;
  buttonresponseDialog: any[] = [];
  showDialog = false;
  response_share: any;
  getDataResponseShare = "false";
  entryGrid = false;
  responseEditGrid: any;
  googleAPI: string;
  formWidth: string;
  navigationcssPopup: string;
  navigationresponsePopup: string;

  buttonresponsePage: any[] = [];

  popup_zindex: any = 1;

  showMainContent = true;

  showFormButton = false;
  entryGridResponse: any;
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
  dynamicScript: string;

  unsetVarArr: any[] = [];

  newValue: any;

  ckeditorview: string;
  lastrevised: string;
  enhanced: boolean;
  tableclass: any;
  inquiryTitle: string;
  tinyButtion: string;
  zindexPopupOrder: any = 1;
  firstPopUpSet = false;
  position = 0;
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
  popupMaxHeight: any;
  searchPhraseInput: string;
  isHtmlEdit = false;
  isHtmlEditPage = false;
  /** show dialoghtml on page */
  showDialogHtmlPage = false;
  showTextDialogPage: string;
  dialogPageWidth: string;
  showDialogTitle: string;
  dialogTitle: string;
  /** NOTEPAD */
  valueProgress: any;
  progressText: string;
  toastTimeOut: any;
  enableButton: any;
  enableButtonArr: any[] = [];
  enableBtnProperty = [{ buttonType: "submit", isEnabled: true }];
  setBtnProperty: string;
  showTextPopup: string;
  showTitlePopup: string;
  fileExtensionsPopup: string;
  isMultiplePopup: string;
  extensionTextPopup: string;
  showFileUploadPopup = false;
  setInterval = 0;
  progressTitle: string;
  page: PageModel;
  htmlEditPageArr: any[] = [];
  htmlEditPopupArr: any[] = [];
  htmlEditPopupOb: any;
  tinyReadonly: any;
  mySubscription: Subscription;
  expansionPanelData: any;
  validateFormError: boolean;
  sendDataEntryGrid: any;
  treeControlMenu: any;
  validateEntryOnForm: any; // for sending data to form after required validation
  showBusyText: string;
  @ViewChild("fileInput") fileInput;
  @ViewChild("inputFile") myInputVariable: ElementRef;
  ngAfterViewChecked() {
    if (Materialize.updateTextFields === undefined) {
      return false;
    }
    Materialize.updateTextFields();
  }

  ngOnInit() {
    sessionStorage.setItem("entryGridDataArr", "");
    sessionStorage.setItem("setEntryGrid", "");
    sessionStorage.setItem("gridRefNumber", "");
    sessionStorage.setItem("detectChangeEntryGrid", "");
    this.page = new PageModel();
    this.navigationcss = environment.displayNone;
    this.dtnotepad = environment.displayNone;
    this.content = "";

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
      this._activeRoute.snapshot.queryParams["toastTimeOut"] !== undefined && this._activeRoute.snapshot.queryParams["toastTimeOut"] !== ""
        ? this._activeRoute.snapshot.queryParams["toastTimeOut"]
        : 4000;
    this.showheading = this._activeRoute.snapshot.queryParams["showheading"];
    sessionStorage.setItem("toastTimeOut", this.toastTimeOut);
    this.formWidth = "";
    if (this.showheading === "true") {
      this.companyName = this._activeRoute.snapshot.queryParams["companyname"];
      this.title = this._activeRoute.snapshot.queryParams["title"];
      this.titleService.setTitle(this._activeRoute.snapshot.queryParams["title"]);
    } else {
      this.title = "";
      this.companyName = "";
      // this.titleService.setTitle('');
    }

    this.titleService.setTitle(this._activeRoute.snapshot.queryParams["title"]);
    // const a =  "localhost:4300/apiCall?api=/dyn%2Fdtlogin%2FpasswordForm%3Fcc%3DCD%26t%3DeyJ6aXAiOiJERUYiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eNo0j8FqwzAQRH-l7NkO1mq1wjnVTaRzKT36IssyURvHxXJIIeTfqwjK3N7M8tg7pOsAexgaPbUeRe1abGvyvq0H1q4WjN5RM2kaESoIv9vq8vzeg_c97Hs4HHuoepiWdf6M2zkU-O5Sui3r-PIRUtjKII6lMX7cXVIhYXbxXOAlntwav1169aewXXd-mXt4ZF1MKctIyg6tbjSy5Y4VS01akiFFlgxaIt2yYcFHtoryxvJBS7QsdMPts1dU-Fu-NWgYc7ryzQ_sBUuFJAhVBV-3mH0CJamn3W3_daMwhx9_AAAA__8.eSffmkrBXodUiydixtvuAGx8z9vFv-2jfPYxZhcrRAl1yA5DBN3phjibA6zXR5L-PXOEfM8dQ1sa2TgVfgaM_g"
    const url = decodeURIComponent(window.location.href.split("api=")[1]);
    //const url = decodeURIComponent(a.split('api=')[1]);
    this.loader = environment.displayBlock;
    let NotNotify = false;
    let loginSuccess = false;
    let redirectUrl = "";
    // response: HttpResponse<any>
    this._dynamoService.getDetailsScan(url).subscribe(
      (response) => {
        if (response == undefined || response == null) {
          return false;
        } else {
          /* if (response.body.data !== undefined && response.body.data !== null) {
                        let accessToken = response.headers.get('Authorization');
                    } */

          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].type == "pageInit") {
            } else if (response.data[i].type == "setup") {
              setTimeout(() => {
                NotNotify = false;
                this.googleAPI = response.data[i].googleApi;

                const dynamicScript = "https://maps.googleapis.com/maps/api/js?libraries=places&key=" + this.googleAPI;
                this.setDynamicScript(dynamicScript);
              }, 500);
            } else if (response.data[i].type == "notify") {
              NotNotify = false;
              redirectUrl = response.data[i].redirectUrl !== undefined ? response.data[i].redirectUrl : "";
              loginSuccess = response.data[i].loginSuccess !== undefined ? response.data[i].loginSuccess : false;

              this.handleNotify(response.data[i]);
              if (loginSuccess && !NotNotify) {
                setTimeout(() => {
                  this.loader = environment.displayNone;
                  window.location.href = redirectUrl;
                }, 1800);
              }
            } else {
              this.loader = environment.displayBlock;
              NotNotify = true;
            }
          }

          if (NotNotify) {
            setTimeout(() => {
              this.loader = environment.displayNone;
              this.showContent(response);
            }, 5000);
          }
        }
      },
      (error) => {
        this.loader = environment.displayNone;
        toast(error.message, this.toastTimeOut);
      }
    );
  }
  showExpansionPanel(response) {
    this.expansionPanelData = response;
  }
  receiveDtForm(event) {
    this.buttonresponse = [];
    this.loader = environment.displayNone;
    const data = [];
    this.firstPopUpSet = false;
    this.zindexPopupOrder = 1;
    this.position = 0;
    this.showFormButton = false;
    //  this.setAllData = []; commented 13 july 2021
    let entryGridDataArr: any[] = [];
    const allEntryGridData = [];
    const allData = [];
    let data_grid: any;
    this.getDataGrid = false;
    this.validateFormError = false;
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
          (event.data._directives[i].value == undefined || event.data._directives[i].value == "")
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

    // TO GET THE TYPE AND VALUE 5 OCT 2021
    if (event !== undefined && event.dtFormList !== undefined) {
      for (let i = 0; i < event.dtFormList.length; i++) {
        if (event.dtFormList[i].fields !== undefined) {
          for (let j = 0; j < event.dtFormList[i].fields.length; j++) {
            // CHECK FOR VALIDATION 6 OCT 2021
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
              };
              if (event.dtFormList[i].fields[j].type == "select" || event.dtFormList[i].fields[j].type == "radio") {
                cols["show"] = this._dynamoService.getShowForm(event.dtFormList[i]);
              }
              data.push(cols);
            }
          }
        }
      }
    }

    // HANDLE VALUE OF ADDRESS COMPONENT
    if (event.addressFieldName.length > 0) {
      event.addressFieldName.splice(0, event.addressFieldName.length, ...new Set(event.addressFieldName));

      for (let m = 0; m < event.addressFieldName.length; m++) {
        const fieldValue = <HTMLInputElement>document.getElementById(event.addressFieldName[m]);

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
              for (let n = 0; n < entryGridDataArr[i][j].items[m].degColumns.length; n++) {
                if (
                  entryGridDataArr[i][j].items[m].degColumns[n].hasOwnProperty("name") &&
                  entryGridDataArr[i][j].items[m].degColumns[n].name.length !== 0
                ) {
                  const field_Column = {
                    name: entryGridDataArr[i][j].items[m].degColumns[n].name,
                    // 'value': entryGridDataArr[i][j].items[m].degColumns[n].type !== 'radio' && entryGridDataArr[i][j].items[m].degColumns[n].type !== 'search' ? (entryGridDataArr[i][j].items[m].degColumns[n].type == 'switch' && entryGridDataArr[i][j].items[m].degColumns[n].value == '')  ? false : entryGridDataArr[i][j].items[m].degColumns[n].value : entryGridDataArr[i][j].items[m].degColumns[n].value1,
                    value:
                      entryGridDataArr[i][j].items[m].degColumns[n].type !== "radio" &&
                      entryGridDataArr[i][j].items[m].degColumns[n].type !== "search"
                        ? entryGridDataArr[i][j].items[m].degColumns[n].type == "switch" && entryGridDataArr[i][j].items[m].degColumns[n].value == ""
                          ? false
                          : this._dynamoService.parseValue(
                              entryGridDataArr[i][j].items[m].degColumns[n].type,
                              entryGridDataArr[i][j].items[m].degColumns[n].value
                            )
                        : this._dynamoService.parseValue(
                            entryGridDataArr[i][j].items[m].degColumns[n].type,
                            entryGridDataArr[i][j].items[m].degColumns[n].value1
                          ),
                    isValid: entryGridDataArr[i][j].items[m].degColumns[n].isValid,
                    required: entryGridDataArr[i][j].items[m].degColumns[n].required,
                    type: entryGridDataArr[i][j].items[m].degColumns[n].type,
                  };
                  field_Columns.push(field_Column);
                  if (!entryGridDataArr[i][j].items[m].degColumns[n].isValid) {
                    // invalidField = true;
                  }
                  // ADDED FOR REQUIRED 29 may
                  if (
                    entryGridDataArr[i][j].items[m].degColumns[n].required &&
                    entryGridDataArr[i][j].items[m].degColumns[n].value !== 0 &&
                    entryGridDataArr[i][j].items[m].degColumns[n].value.length >= 1
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
        if (allEntryGridData[i].rows.findIndex((x) => x.invalidField === true) >= 0) {
          fieldsValid = false;
          isInvalid.push(fieldsValid);
        }
        data_grid.data[data_grid.data.length] = allEntryGridData[i];
      }

      // REQUIRED ENTRYGRID 29 MAY

      for (let i = 0; i < allEntryGridData.length; i++) {
        for (let j = 0; j < allEntryGridData[i].rows.length; j++) {
          if (!allEntryGridData[i].rows[j].isDeleted) {
            for (let k = 0; k < allEntryGridData[i].rows[j].fields.length; k++) {
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
        //  console.log(allEntryGridData[i]);
        // send data from here to child component
        this.validateEntryOnForm = allEntryGridData;
      }
    }

    if (isInvalid.indexOf(false) >= 0 || event.anyInvalidField) {
      toast(event.invalidMessage, Number(sessionStorage.getItem("toastTimeOut")));
      // ENABLE SUBMIT BUTTON
      if (this.responseDtFormPage !== "") {
        this.enableButton = this._dynamoService.enableFormBtn();
      }
    } else if (requiredField.indexOf(false) >= 0) {
      // FOR REQUIRED ON ENTRYGRID VALIDATION
      toast(environment.singleEntryGrid, Number(sessionStorage.getItem("toastTimeOut")));
      // ENABLE SUBMIT BUTTON
      if (this.responseDtFormPage !== "") {
        this.enableButton = this._dynamoService.enableFormBtn();
      }
      // ENABLE SUBMIT BUTTON ON POPUP
      if (this.setAllData[this.arrIndex].responseDtForm !== "") {
        this.enableButton = this._dynamoService.enableFormBtn();
      }
    } else if (this.validateFormError) {
      toast("Please fill all required fields", Number(sessionStorage.getItem("toastTimeOut")));
      // ENABLE SUBMIT BUTTON
      if (this.responseDtFormPage !== "" && this.responseDtFormPage !== undefined) {
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
  handleShowBusy(url) {
    const property = this._dynamoService.getValue(url, "showBusy");
    if (property) {
      this.loader = environment.displayBlock;
    }
    const showBusyText = this._dynamoService.getValueShowBusyText(url, "showBusyText");
    if (showBusyText !== undefined && showBusyText.length > 0) {
      this.showBusyText = showBusyText.replaceAll("+", " ");
    }
  }
  // POST DATA TO SUBMIT API
  sendData(data_grid, submitapi) {
    //  console.log(data_grid);
    //   return;
    //   this.loader = environment.displayBlock;
    this.handleShowBusy(submitapi);
    /* const data = [];
        const EntryGridData = [];
        let entryGridData: any; */
    let application: any;
    let NotNotify = false;
    let loginSuccess = false;
    let redirectUrl = "";
    let dtWebMenu = false;
    let customerName: string;
    let menu: any; // to be used when redirecting from api Call to home component
    let username: string;
    let logoutApi: string;
    let cc: string;
    let baseURL: string;
    let iconColor: string;
    let title: string;
    let icon: string;
    let menuCode: any;
    let token: any;
    this.validateFormError = false;

    this.handleShowBusy(submitapi);
    this._dynamoService.menuNext(data_grid, submitapi).subscribe(
      (formResponser) => {
        if (formResponser === null || formResponser === undefined) {
          this.loader = environment.displayNone;
          this.showBusyText = "";
          return false;
        } else {
          this.loader = environment.displayNone;
          this.showBusyText = "";
          const formResponse = JSON.parse(JSON.stringify(formResponser));

          for (let i = 0; i < formResponse.data.length; i++) {
            if (formResponse.data[i].type == "pageInit") {
            } else if (formResponse.data[i].type == "notify") {
              this.handleNotify(formResponse.data[i]);
              loginSuccess = formResponse.data[i].loginSuccess !== undefined ? formResponse.data[i].loginSuccess : false;
              redirectUrl = formResponse.data[i].redirectUrl !== undefined ? formResponse.data[i].redirectUrl : "";
              NotNotify = false;
            } else if (formResponse.logoutApi !== undefined && formResponse.logoutApi !== "") {
              NotNotify = false;
              sessionStorage.setItem("clientmenu", JSON.stringify(formResponse));
              sessionStorage.setItem("userName", JSON.stringify(formResponse.username));
              sessionStorage.setItem("logoutApi", JSON.stringify(formResponse.logoutApi));

              sessionStorage.setItem("customerName", JSON.stringify(formResponse.customerName));
              sessionStorage.setItem("cc", formResponse.cc);
              menu = window.btoa(unescape(encodeURIComponent(JSON.stringify(formResponse))));
              username = btoa(formResponse.username);
              logoutApi = btoa(formResponse.logoutApi);
              customerName = btoa(formResponse.customerName);
              // formResponse.cc = "DS";
              // window.location.href = "http://localhost:4200/dynamoHome" + "?menu=" + menu + '&username=' + username + '&logoutApi=' + logoutApi + '&cc=' + formResponse.cc + '&customerName=' + customerName;
              window.location.href =
                formResponse.baseurl +
                "?menu=" +
                encodeURIComponent(menu) +
                "&username=" +
                encodeURIComponent(username) +
                "&logoutApi=" +
                encodeURIComponent(logoutApi) +
                "&cc=" +
                encodeURIComponent(formResponse.cc) +
                "&customerName=" +
                encodeURIComponent(customerName);
            } else if (formResponse.data[i].type == "setup") {
              NotNotify = false;
              sessionStorage.setItem("clientmenu", JSON.stringify(formResponse));
              sessionStorage.setItem("userName", JSON.stringify(formResponse.data[i].username));
              sessionStorage.setItem("logoutApi", JSON.stringify(formResponse.data[i].logoutApi));

              sessionStorage.setItem("customerName", JSON.stringify(formResponse.data[i].customerName));
              sessionStorage.setItem("cc", formResponse.data[i].cc);
              menu = window.btoa(unescape(encodeURIComponent(JSON.stringify(formResponse))));
              baseURL = formResponse.data[i].baseurl;
              username = btoa(formResponse.data[i].username);
              logoutApi = btoa(formResponse.data[i].logoutApi);
              token = btoa(formResponse.data[i].token);
              customerName = formResponse.data[i].customerName;

              // formResponse.cc = "DS";
              //  window.location.href = "http://localhost:4200/dynamoHome" + "?menu=" + menu + '&username=' + username + '&logoutApi=' + logoutApi + '&cc=' + formResponse.data[i].cc + '&customerName=' + customerName;
              // window.location.href = formResponse.baseurl + '?=cc' + formResponse.data[i].cc + "&menu=" + menu + '&username=' + username + '&logoutApi=' + logoutApi + '&cc=' + formResponse.data[i].cc + '&customerName=' + customerName;
            } else if (formResponse.data[i].type == "dtWebMenu") {
              dtWebMenu = true;
              application = formResponse.data[i].application;
              cc = formResponse.data[i].cc;
              iconColor = formResponse.data[i].iconcolor;
              title = formResponse.data[i].title;
              icon = formResponse.data[i].icon;
              menuCode = formResponse.data[i].menucode;
              sessionStorage.setItem("application" + this._activeRoute.snapshot.queryParams.cc, application);
              sessionStorage.setItem("menuTitle" + this._activeRoute.snapshot.queryParams.cc, JSON.stringify(formResponse.data[i].title));
              sessionStorage.setItem("menuIcon" + this._activeRoute.snapshot.queryParams.cc, JSON.stringify(formResponse.data[i].icon));
              sessionStorage.setItem("menuIconColor" + this._activeRoute.snapshot.queryParams.cc, JSON.stringify(formResponse.data[i].iconcolor));
              // menucode
              sessionStorage.setItem("menucode" + this._activeRoute.snapshot.queryParams.cc, JSON.stringify(formResponse.data[i].menucode));
            } else if (formResponse.data[i].type === "buttons") {
              // enable submit button on form component
              if (this.responseDtFormPage !== "") {
                this.enableButton = this._dynamoService.enableFormBtn();
              }
            } else {
              NotNotify = true;
            }
          }
          // REDIRECT TO HOME PAGE
          if (dtWebMenu) {
            // baseURL = 'http://localhost:4200/home';
            // alert(baseURL + '?cc=' + cc + '&menu=' + menu + '&username=' + username + '&logoutApi=' + logoutApi + '&customerName=' + customerName + '&application=' + application + '&iconColor=' + iconColor + '&title=' + title + '&icon=' + icon + '&menuCode=' + menuCode + '&customerName=' + customerName + '&fromApi=' + true);
            window.location.href =
              baseURL +
              "?cc=" +
              encodeURIComponent(cc) +
              "&menu=" +
              encodeURIComponent(menu) +
              "&username=" +
              encodeURIComponent(username) +
              "&logoutApi=" +
              encodeURIComponent(logoutApi) +
              "&customerName=" +
              encodeURIComponent(customerName) +
              "&application=" +
              encodeURIComponent(application) +
              "&iconColor=" +
              encodeURIComponent(iconColor) +
              "&title=" +
              encodeURIComponent(title) +
              "&icon=" +
              encodeURIComponent(icon) +
              "&menuCode=" +
              encodeURIComponent(menuCode) +
              "&fromApi=" +
              true +
              "&token=" +
              encodeURIComponent(token);
          }
          if (loginSuccess && !NotNotify) {
            setTimeout(() => {
              window.location.href = redirectUrl;
            }, 500);
          }
          if (NotNotify) {
            this.showContent(formResponse);
          }
        }
      },
      (error) => this.handleError(error)
    );
  }

  showContent(formResponse) {
    let clearPage = false;
    let showForm: Boolean = false;
    this.getDataGrid = false;
    let NotNotify = false;
    for (let i = 0; i < formResponse.data.length; i++) {
      if (formResponse.data[i].clearPage !== undefined && formResponse.data[i].clearPage) {
        clearPage = formResponse.data[i].clearPage;
      }
    }
    if (clearPage) {
      // this.treeControlMenu = '';
      this.showDialog = false;
      this.setMargin = "";
      this.buttonresponse = [];
      this.buttonresponsePage = [];
      this.formWidth = "";
      this.dialogWidth = "";
      this.expansionPanelData = "";
      this.navigationcssArr = [];
      this.navigationresponseAr = [];
      this.validateEntryOnForm = "";
      this.entryGrid = false;
      this.showPopUp = environment.displayNone;
      this.showDialogHtml = false;
      this.responseEditGrid = "";
      this.unsetVarArr = [];
      this.expansionPanelData = "";
      // this.valueProgress = '';
      this.isHtmlEdit = false;
      this.showTextUpload = "";
      this.isHtmlEditPage = false;
      this.responseDtForm = "";
      this.sendDataEntryGrid = undefined;
      this.sendDataFromChild = "";
      this.sendDataFromMultiPart = "";
      sessionStorage.setItem("entryGridDataArr", "");
      sessionStorage.setItem("setEntryGrid", "");
      sessionStorage.setItem("gridRefNumber", "");
      sessionStorage.setItem("detectChangeEntryGrid", "");
    }

    for (let k = 0; k < formResponse.data.length; k++) {
      if (formResponse.data[k].type === "popup") {
        this.showPopUpData(formResponse);
        break;
      } else {
        this.showMenu = false;
        let gridPositionTop = false;
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
        if (formResponse.data[k].width !== undefined) {
          this.formWidth = formResponse.data[k].width;
        }

        if (formResponse.data[k].type === "displayGrid" && formResponse.data[k].topPosition !== undefined && formResponse.data[k].topPosition) {
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
              formResponse.data[k].topPosition === undefined || formResponse.data[k].topPosition === false ? false : formResponse.data[k].topPosition,
          });
          this.dtnotepad = environment.displayNone;

          // ADDED TO SET GRID POSITION ON TOP (FOR PO) 26 DEC
          gridPositionTop =
            formResponse.data[k].topPosition === undefined || formResponse.data[k].topPosition === false ? false : formResponse.data[k].topPosition;
        } else if (formResponse.data[k].type == "progressResponse") {
          // progress type
          this.progressText = formResponse.data[k].text;
        } else if (formResponse.data[k].type === "form") {
          showForm = true;
          this.unsetVarArr.push("form");
          this.showContentForm(formResponse, k);
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
          this.dtnotepad = environment.displayNone;
        } else if (formResponse.data[k].type == "progress") {
          this.progressTitle = formResponse.data[k].title;
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
          let a = 0;

          this.handleShowBusy(formResponse.data[k].api_call);
          this.mySubscription = interval(this.setInterval).subscribe((x) => {
            if (this.mySubscription.closed) return;
            this._dynamoService.getDetailsScan(formResponse.data[k].api_call).subscribe((response) => {
              this.loader = environment.displayNone;
              this.showBusyText = "";
              if (a < 0) {
                if (response === null) {
                  return false;
                }
                for (let i = 0; i < response.data.length; i++) {
                  if (response.data[i].type == "notify") {
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
                      a = a + 1;

                      if (response.data[i].api_call) {
                        this.buttonAPICall(response.data[i].api_call, "", "api_call");
                      }
                    }

                    NotNotify = false;
                  } else {
                    NotNotify = true;
                  }
                }
                // TO HANDLE OTHER TYPE
                if (NotNotify) {
                  this.showContent(response);
                }
              }
            });
          });
        } else if (formResponse.data[k].type === "displayView" && !showForm) {
          this.displayViewresponse = formResponse;
          this.unsetVarArr.push("displayView");
          this.dtnotepad = environment.displayNone;
        } else if (formResponse.data[k].type === "entryGrid" && !showForm) {
          // edited for static response

          this.entryGrid = true;
          this.responseEditGrid = formResponse.data[k];
        } else if (formResponse.data[k].type === "dialog") {
          this.showText = formResponse.data[k].text;
          this.dialogWidth = formResponse.data[k].dialogWidth !== undefined ? formResponse.data[k].dialogWidth : "40%";
          this.showDialog = true;
          this.dialogTitle = formResponse.data[k].title;
          this.formWidth = formResponse.data[k].dialogWidth;
          this.displayViewPopUpArr = [];
          this.displaySubGridPopUp = [];
          // this.setAllData[this.arrIndex].showText = this.showText;
        } else if (formResponse.data[k].type === "dialogHtml") {
          /** ADDED TO HANDLE DIALOGHTML  */
          this.showDialogHtmlPage = true;
          this.showTextDialogPage = formResponse.data[k].text;
          //  this.dialogPageWidth = formResponse.data[k].width !== undefined ? formResponse.data[k].width : '40%';
          this.dialogPageWidth = formResponse.data[k].dialogWidth !== undefined ? formResponse.data[k].dialogWidth : "40%";
          this.formWidth = this.dialogPageWidth;
          this.showDialogTitle = formResponse.data[k].title;
          this.unsetVarArr.push("dialogHtml");
        } else if (formResponse.data[k].type === "dialogFile") {
          this.showTextUpload = formResponse.data[k].text;
          this.showTitleUpload = formResponse.data[k].title;
          this.formWidth = formResponse.data[k].width;
          this.fileExtensions = formResponse.data[k].extensions;
          this.isMultiple = formResponse.data[k].multiple;
          this.extensionText = this.fileExtensions.replace(/[.]/g, " ");
          // this.uploadOpen = environment.displayBlock;
        } else if (formResponse.data[k].type === "htmlEdit") {
          this.dtnotepad = environment.displayBlock;
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

              if (formResponse.data[k].buttons[i].changeState !== undefined && formResponse.data[k].buttons[i].changeState) {
                // SET INPUT PROPERTY OF BUTTONS IN DISPLAY FORM COMPONENT
                this.setBtnProperty = formResponse.data[k].buttons[i].text + "*" + formResponse.data[k].buttons[i].isEnabled;

                if (this.responseDtFormPage !== "") {
                  /*  this.enableButton = {
                                         'buttonType': formResponse.data[k].buttons[i].buttonType, 'buttonstext': formResponse.data[k].buttons[i].text, 'isEnabled': formResponse.data[k].buttons[i].isEnabled
                                     }; */
                  this.enableButtonArr.push({
                    buttonType: formResponse.data[k].buttons[i].buttonType,
                    buttonstext: formResponse.data[k].buttons[i].text,
                    isEnabled: formResponse.data[k].buttons[i].isEnabled,
                  });
                  this.enableButton = this.enableButtonArr;
                }

                /** IDENTIFY WHICH BUTTON IS DISABLE AND ENABLE IT */

                const btnInd = this.buttonresponsePage.findIndex(
                  (x) => x.disableOnClick == true && x.isEnabled == false && x.text == formResponse.data[k].buttons[i].text
                );
                if (btnInd >= 0) {
                  this.buttonresponsePage[btnInd].isEnabled = formResponse.data[k].buttons[i].isEnabled;
                }
                // for popup
                const btnIndPopup = this.buttonresponse.findIndex(
                  (x) => x.disableOnClick == true && x.isEnabled == false && x.text == formResponse.data[k].buttons[i].text
                );
                if (btnIndPopup >= 0) {
                  this.buttonresponse[btnIndPopup].isEnabled = formResponse.data[k].buttons[i].isEnabled;
                }
                // 11 OCT 2021
                if (btnInd == -1 && btnIndPopup == -1) {
                  if (this.expansionPanelData !== "") {
                    this.enableButton = {
                      buttonType: formResponse.data[k].buttons[i].buttonType,
                      buttonstext: formResponse.data[k].buttons[i].text,
                      isEnabled: formResponse.data[k].buttons[i].isEnabled,
                    };
                  }
                }
              }
              // BIND BUTTON  ON PAGE

              this.buttonresponsePage.push(formResponse.data[k].buttons[i]);
              this.buttonresponse.push(formResponse.data[k].buttons[i]);
            }
            // this.showPopUp = (this.showDialog) ? environment.displayBlock : environment.displayNone;
          }
        } else if (formResponse.data[k].type === "formUpdate") {
          this.formUpdateMain(formResponse);
        }

        this.unsetVariable();
      }

      if (this.enableButtonArr.length > 0) {
        this.enableButton = this.enableButtonArr;
      }
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
    this.showFormButton = !formResponse.data[k].formSubmit ? formResponse.data[k].formSubmit : true;

    sessionStorage.setItem("showFromForm", JSON.stringify(this.showFormButton));
  }

  // To show formUpdate data in main page
  formUpdateMain(formResponse) {
    this.getDataResponseShare = "true";
    if (this.getDataResponseShare) {
      sessionStorage.setItem("getDataResponseShare", this.getDataResponseShare);
    }
    this.response_share = JSON.parse(sessionStorage.getItem("response_share"));
    sessionStorage.setItem("showFromForm", "false");
    this.responseDtFormPage = formResponse;
  }

  // UNSET VARIABLE ON PAGE CONTENT NOT POPUP
  unsetVariable() {
    // Check for form
    if (this.unsetVarArr.indexOf("form") == -1 && !this.showDialog) {
      this.responseDtFormPage = "";
    }
    if (this.unsetVarArr.indexOf("displayGrid") == -1 && !this.showDialog) {
      this.displaySubGridresp = "";
    }
    if (this.unsetVarArr.indexOf("displayView") == -1 && !this.showDialog) {
      this.displayViewresponse = "";
    }
  }
  handleProgressPopup(api, timeInterval) {
    let NotNotify: boolean = false;
    let clearPage: boolean = false;
    // timeInterval = 20;
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

          if (response === null || response == undefined) {
            return false;
          } else {
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].type == "notify") {
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
            // ADDED 13 OCT
            if (NotNotify) {
              this.showContent(response);
            }
          }
        }
      });
    });
    // settimeout
  }

  showPopUpData(response) {
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

    for (let k = 0; k < formResponse.data.length; k++) {
      if (formResponse.data[k].type == "popup") {
        this.mainPopuptitle = formResponse.data[k].title;
        this.showClose = formResponse.data[k].showClose;
        this.popup_width = formResponse.data[k].width;

        this.popup_top = this.position !== 0 ? this.position - 350 + "px" : formResponse.data[k].top;

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
        // added this.showFormButton = false 21 Feb
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
        this.dialogWidth = formResponse.data[k].dialogWidth !== undefined ? formResponse.data[k].dialogWidth : "40%";
        this.showDialog = true;
        this.displayViewPopUpArr = [];
        this.displaySubGridPopUp = [];
        this.buttonresponse = [];
        this.setAllData[this.arrIndex].showText = this.showText;
      } else if (formResponse.data[k].type === "dialogHtml") {
        // MODIFY TO HANDLE DIALOG HTML
        this.showTextHtml = formResponse.data[k].text;
        this.dialogWidth = formResponse.data[k].dialogWidth !== undefined ? formResponse.data[k].dialogWidth : "100%";
        this.showDialogHtml = true;
      } else if (response.data[k].type === "dialogFile") {
        // added 8 May
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
        this.handleProgressPopup(formResponse.data[k].api_call, formResponse.data[k].interval * 1000);
        break;
        // return false;
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

    this.setAllData[this.arrIndex].mainPopuptitle = this.mainPopuptitle == "" ? "Default" : this.mainPopuptitle;
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
    this.setAllData[this.arrIndex].navigationresponseAr = this.navigationresponseAr;
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
    this.setAllData[this.arrIndex].fileExtensionsPopup = this.fileExtensionsPopup;
    this.setAllData[this.arrIndex].isMultiplePopup = this.isMultiplePopup;
    this.setAllData[this.arrIndex].extensionTextPopup = this.extensionTextPopup;

    this.setAllData[this.arrIndex].pageContent = this.page.content;
    this.setAllData[this.arrIndex].isHtmlEdit = this.isHtmlEdit;
    this.setAllData[this.arrIndex].lastrevised = this.lastrevised;
    this.setAllData[this.arrIndex].buttonresponse = this.buttonresponse;
    this.setAllData[this.arrIndex].htmlEditPopupArr = this.htmlEditPopupArr;
    // FOR FORM IN POPUP
    this.setAllData[this.arrIndex].responseDtForm = this.responseDtForm;

    this.zindexPopupOrder++; // Increment for second, third popup
  }

  // To show form in popup
  formInPopup(formResponse: any, k: any) {
    this.responseDtForm = formResponse;

    this.setHexkey = formResponse.data[k].hexkey;
    sessionStorage.setItem("response_share", JSON.stringify(formResponse));
    // CODE TO HANDLE BUTTON INSIDE FORM

    this.showFormButton = !formResponse.data[k].formSubmit ? formResponse.data[k].formSubmit : true;

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

  /** When enter key is pressed */
  receiveDtFormEnter(event): void {
    this.receiveDtForm(event);
  }

  getNewOutputApi(event) {
    this.buttonAPICall(event);
  }

  setDynamicScript(dynamicScript) {
    if (document.querySelector("script[async]") == null || document.querySelector("script[async]") == undefined) {
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
  cancel(param, api_route, showMenu, popup_zindex?) {
    this.loader = environment.displayBlock;
    this.setMargin = "";
    this.hideOnMobile = false;
    this.showTextUpload = "";
    // enable submit button on form component
    if (this.responseDtFormPage !== "") {
      this.enableButton = this._dynamoService.enableFormBtn();
    }

    if (param == undefined || param == null) {
      this.showPopUp = environment.displayNone;
    } else if (popup_zindex > 1) {
      // HIDE PARENT POPUP DATA AND SHOW CHILD DATA

      const elementToRemove = popup_zindex - 1;
      this.setAllData.splice(elementToRemove, 1);
    } else if (popup_zindex == 1) {
      this.setAllData = [];
      this.zindexPopupOrder = 1;
      this.arrIndex = 0;
      //this.zindexPopupOrder = 1;

      if (param == "routing") {
        this.callRouting(api_route, showMenu);
      }
    } else if (param == "routing") {
      this.callRouting(api_route, showMenu);
      this.loader = environment.displayNone;
    } else if (param == "api_call") {
      this.callApi(api_route);
      this.loader = environment.displayNone;
    }
    this.firstPopUpSet = false;
    if (this.zindexPopupOrder > 0) {
      this.zindexPopupOrder--;
      this.loader = environment.displayNone;
    }
  }

  /* When parameter is routing call this function */
  callRouting(api_route, showMenu) {
    const api_routee = "/" + api_route;
    this.hideOnMobile = true;
    if (window.location.hostname == "localhost") {
      if (window.location.pathname == api_routee) {
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
      }
      if (api_route == "retainState") {
        this.showPopUp = environment.displayNone;
      }

      if (api_route == "dynamoHome" || api_route == "dynamoToolHome") {
        // window.location.href = window.location.origin + api_routee;
        this._router.navigate([api_routee]);
      }
    } else if (window.location.hostname !== "localhost") {
      const a = window.location.pathname.split("/");
      if ("/" + a[3] === api_routee) {
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
      }
      if (api_route == "retainState") {
        this.showPopUp = environment.displayNone;
        if (this.responseDtFormPage !== "") {
          this.enableButton = [{ buttonType: "button" }];
        }
      }

      if (api_route == "dynamoHome" || api_route == "dynamoToolHome") {
        this._router.navigate([api_routee]);
      }
    }
  }

  /* When parameter is api_call call this function to call api */
  callApi(api_route) {
    let NotNotify = false;
    this.responseDtForm = "";
    this.handleShowBusy(api_route);
    this._dynamoService.getDetailsScan(api_route).subscribe(
      (response) => {
        this.loader = environment.displayNone;
        this.showBusyText = "";
        if (response === null) {
          return false;
        } else {
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].type == "notify") {
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
      (error) => {
        this.handleError(error);
      }
    );
  }

  /* get page according to navigation */
  navChangedHandler(url: string) {
    this.handleShowBusy(url);
    this._dynamoService.getDetailsScan(url).subscribe(
      (response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].type == "notify") {
            this.handleNotify(response.data[i]);
          }
          this.displaySubGridresp = response.data[i];
          if (response.data[i].navigation !== undefined) {
            this.navigatinresponse = response.data[i].navigation;
          }
        }
        this.loader = environment.displayNone;
        this.showBusyText = "";
      },
      (error) => this.handleError(error)
    );
  }

  /* get page according to navigation in Popup */
  navChangedHandlerPopUp(url: string) {
    this.displaySubGridPopUpArr = [];
    this.navigationresponseAr = [];
    this.handleShowBusy(url);

    this._dynamoService.getDetailsScan(url).subscribe(
      (response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].type == "notify") {
            this.handleNotify(response.data[i]);
          }
          this.displaySubGridPopUpArr.push(response.data[i]);
          this.setAllData[this.arrIndex].displayGrid = this.displaySubGridPopUpArr;

          if (response.data[i].navigation !== undefined) {
            this.navigationresponseAr.push(response.data[i].navigation);
            this.setAllData[this.arrIndex].navigationresponseAr = this.navigationresponseAr;
          }
        }
        this.loader = environment.displayNone;
        this.showBusyText = "";
      },
      (error) => {
        this.loader = environment.displayNone;
        this.showBusyText = "";

        if (error.message !== undefined) {
          alert(error.message);
        } else {
          if (error.error.alert !== undefined) {
            alert(error.error.alert);
          } else {
            toast(error.statusText, this.toastTimeOut);
          }
        }
      }
    );
  }

  redirectTo(event) {
    if (event === "") {
      return;
    } else {
      this.cancel("routing", event.push_redirect, event.showMenu);
    }
  }

  hideEntryGrid(event) {
    if (event == "hideEntryGrid") {
      this.responseEditGrid = "";
    }
  }

  setCustomerInHeader(event) {
    if (event == undefined) {
      return;
    } else {
      this.setCustomerName = event.customerName;
      this.cancel(event.action, event.onPush, event.showMenu);
    }
  }

  /** When row is selected in displaygrid */
  getData(event) {
    let NotNotify = false;
    this.handleShowBusy(event.url);
    this.showDialogHtml = false;
    if (event.url == undefined) {
      this.loader = environment.displayNone;
    } else {
      this._dynamoService.getDetailsByhexkey(event.url, event.hexKey).subscribe(
        (response) => {
          this.loader = environment.displayNone;
          this.showBusyText = "";
          if (response === null) {
            return false;
          } else {
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].type == "notify") {
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
        (error) => {
          this.handleError(error);
        }
      );
    }
  }

  buttonAPICall(api, showMenu?, action?, btnObj?) {
    let buttonFound: boolean = false;
    this.enableButtonArr = [];
    this.loader = environment.displayBlock;
    this.popup_zindex = 1; // 4 March
    this.zindexPopupOrder = 1;
    this.firstPopUpSet = false;
    let NotNotify = false;
    let clearPage = true;
    if (showMenu) {
      this.setMargin = "";
      this.responseEditGrid = "";
    }
    // TO HANDLE UPLOAD FUNCTIONALITY
    if (action == "uploadSave") {
      this.uploadFile(api);
      return false;
    }
    if (action == "api_callprint") {
      api = api + "&seq=" + encodeURIComponent(this.seqDataToSend);
    }
    // if (action == 'openLink' && action !== undefined) {
    //     const res = {
    //         'newPage': btnObj.newtab,
    //         'url': api
    //       };
    //    NotNotify = false;
    //    this.handleAction(res);
    // }
    this.handleShowBusy(api);

    this._dynamoService.getDetailsScan(api).subscribe(
      (response) => {
        this.loader = environment.displayNone;
        this.showBusyText = "";

        if (response === null) {
          return false;
        } else {
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].type == "notify") {
              NotNotify = false;
              if (response.data[i].msg !== undefined || response.data[i].alert !== undefined) {
                if (response.data[i].alert !== null || response.data[i].msg !== null) {
                  this.setmessage = response.data[i];
                }
                if (response.redirectToMenu) {
                  this.hideOnMobile = true;

                  this.cancel("routing", "dynamoToolHome", true);
                }
              }
              // CHECK FOR NOTIFY SUCCESS TRUE OR FALSE

              if (response.data[i].success) {
                // &&  response.data[i].showMenu
                this.showPopUp = environment.displayNone;
                if (response.data[i].showMenu) {
                  this.cancel("routing", "dynamoToolHome", true);
                } else {
                  this.cancel("routing", "retainState", false, 1);
                }
              }
            } else if (response.data[i].type === "buttons" || action == "api_callprint") {
              if (response.data[i].buttons !== undefined) {
                for (let k = 0; k < response.data[i].buttons.length; k++) {
                  // CHECK FOR TABINDEX IN BUTTON
                  if (!buttonFound && response.data[i].buttons[k].hasOwnProperty("tabindex")) {
                    buttonFound = true;
                  }
                  const btnInd = this.buttonresponse.findIndex((x) => x.text == response.data[i].buttons[k].text);

                  if (btnInd >= 0) {
                    this.buttonresponse[btnInd].isEnabled = response.data[i].buttons[k].isEnabled;
                  }
                }
              }
              if ((this.responseDtFormPage !== "" && response.data[i].type === "buttons") || this.expansionPanelData !== "") {
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
            } else if (response.data[i].type == "action") {
              NotNotify = false;
              this.handleAction(response.data[i]);
            } else if (response.data[i].type == "setup") {
              NotNotify = false;
              const action = response.data[i].action;
              const onPush = response.data[i].onPush;
              const showMenu = response.data[i].showMenu;
              this.setCustomerName = response.data[i].customerName;

              sessionStorage.setItem("customerName", JSON.stringify(this.setCustomerName)); // 09032020

              this.cancel(action, onPush, showMenu);
            } else if (response.data[i].type == "pageInit") {
              clearPage = response.data[i].clearPage;
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
          }
          if (buttonFound) {
            // this.showContent(response);
          }
        }
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  uploadFile(api) {
    let NotNotify = false;
    if (this.FileData === undefined || this.FileData === null) {
      alert(environment.selectFile);
      this.loader = environment.displayNone;
      return false;
    }

    this.handleShowBusy(api);
    this._dynamoService.uploadFile(this.FileData, api, "").subscribe(
      (response) => {
        this.loader = environment.displayNone;
        this.showBusyText = "";

        for (let k = 0; k < response.data.length; k++) {
          if (response.data[k].type == "notify") {
            NotNotify = false;

            if (response.data[k].alert !== undefined && response.data[k].alert !== null) {
              this.setmessage = response.data[k];
            } else if (response.data[k].msg !== undefined && response.data[k].msg !== null) {
              this.setmessage = response.data[k];

              this.fileInput.nativeElement.value = null;
              this.myInputVariable.nativeElement.value = null;
              this.FileData = null;
            }
            // CHECK FOR NOTIFY SUCCESS TRUE OR FALSE
          } else {
            NotNotify = true;
          }
        }
        if (NotNotify) {
          this.showContent(response);
        }
      },
      (error) => {
        this.handleError(error);
      }
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
        const fileType = event.target.files[i].name.split(".")[event.target.files[i].name.split(".").length - 1];

        if (
          fileType.toLowerCase() === "pdf" ||
          fileType.toLowerCase() === "hl7" ||
          fileType.toLowerCase() === "csv" ||
          fileType.toLowerCase() === "xls" ||
          fileType.toLowerCase() === "xlsx" ||
          fileType.toLowerCase() === "txt"
        ) {
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
            } else {
              return false;
            }
          });
        } else {
          toast("file type " + fileType + " is not allowed", this.toastTimeOut);
          this.fileName = "";
          this.loader = environment.displayNone;

          return false;
        }
      }
      this.FileData = arrdata;

      this.loader = environment.displayNone;
    } else {
      this.loader = environment.displayNone;
      toast("please select any file", this.toastTimeOut);
    }
  }
  handleNotify(response) {
    if (response.alert !== undefined || response.msg !== undefined) {
      this.setmessage = response;
    }
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

  handleError(error: any) {
    this.loader = environment.displayNone;
    if (error.error !== undefined && error.error.data !== undefined) {
      for (let i = 0; i < error.error.data.length; i++) {
        if (error.error.data[i].type === "notify") {
          this.handleNotify(error.error.data[i]);
        }
      }
    } else if (error.name !== undefined && error.name === "HttpErrorResponse" && error.status === 0 && error.statusText === "Unknown Error") {
      this.handleNotify({
        alert: "alert",
        URL: error.url,
        title: error.title !== undefined ? error.title : "",
      });
    } else if (error.name !== undefined && error.name === "HttpErrorResponse" && error.status === 503 && error.statusText === "Service Unavailable") {
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
