import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { environment } from "../../environments/environment";
import { UserServicess } from "./user.servie";
import { toast } from "angular2-materialize";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "login-page",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [UserServicess],
})
export class LoginPageComponent implements OnInit {
  name: string;
  setmessage: any;
  loader: string;
  responseDtFormPage: any;
  response: any;
  loginText: string;
  cancelUrl: string;
  logoURL: string;
  serverName: string;
  backgroundImage: string;
  formWidth: string;
  setresponse: any;
  showMenu: boolean = false;
  userEmail: any = [];
  selectdisplayPoup: any;
  popupwidth: any;
  apiMsg: any;
  dialogText: any;
  dialogTitle: any;
  dialogWidth: any;
  enableButton: any;
  validateFormError: boolean;
  showDialogHtmlPage = false;
  showDialog: string;
  buttonresponse = [];
  isRemember: any;
  setUsername: any;
  setPassword: any;
  @Output() sendLoginResponse: EventEmitter<string> = new EventEmitter();

  constructor(private _userService: UserServicess, private _activeRoute: ActivatedRoute) {
    if (window.location.hostname === "localhost") {
      this.serverName = environment.baseUrl;
    } else {
      this.serverName = window.location.origin;
    }
  }
  // getResponse
  @Input()
  set setDataResponse(response: any) {
    this.loader = environment.displayBlock;
    if (response !== undefined && response.data !== undefined && response.data !== null) {
      const data = response.data.length;
      for (let i = 0; i < data; i++) {
        const resVar = response.data[i];
        this.loader = environment.displayNone;
        if (resVar.type == "pageInit") {
        } else if (resVar.type == "notify") {
          this.setmessage = resVar;
        } else if (resVar.type == "dialogHtml") {
          this.responseDtFormPage = response;
          this.showDialogHtmlPage = true;
          this.apiMsg = resVar.text;
          this.dialogText = resVar.text;
          this.dialogTitle = resVar.title;
          this.dialogWidth = resVar.dialogWidth !== undefined ? resVar.dialogWidth : "";
        } else if (resVar.type == "setup") {
          this.loginText = resVar.loginText;
          this.cancelUrl = resVar.cancelURL;
          // this.logoURL = resVar.logoURL;
          /** SET TIMEOUT FOR TOAST MESSAGE */
          sessionStorage.setItem("toastTimeOut", resVar.toastTimeOut);
        } else if (resVar.type == "form") {
          this.loginText = resVar.loginText;
          this.cancelUrl = resVar.cancelURL;
          this.logoURL = resVar.image.url;
          this.responseDtFormPage = response;
          if (resVar.backgroundImage !== undefined) {
            this.backgroundImage = resVar.backgroundImage;
            const body = document.getElementsByTagName("body")[0];
            const bgImage = this.serverName + this.backgroundImage;
            body.style.background = "url(" + bgImage + ")  center center/cover no-repeat fixed";
          }
          this.formWidth = resVar.width !== undefined ? resVar.width : "100%";
        } else if (resVar.type == "formUpdate") {
          this.responseDtFormPage = response;
          this.formWidth = resVar.width !== undefined ? resVar.width : "100%";
        }
        // else  if ( resVar.type == 'buttons') {
        //     this.responseDtFormPage = response;
        //    }
      }
    }
  }
  ngOnInit() {
    this.selectdisplayPoup = "none";
    sessionStorage.removeItem("getDataResponseShare");
  }

  receiveDtForm(event: any) {
    this.validateFormError = false;
    this.loader = environment.displayBlock;
    const data = [];
    if (event.data !== undefined && event.data !== null) {
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
            }
            if (
              event.dtFormList[i].fields[j].value == undefined &&
              !event.dtFormList[i].fields[j].hidden &&
              event.dtFormList[i].fields[j].required &&
              event.dtFormList[i].fields[j].value == ""
            ) {
              this.validateFormError = true;
            } else if (event.dtFormList[i].fields[j].isAddress == undefined) {
              if (event.dtFormList[i].fields[j].name == "loginid") {
                this.setUsername = event.dtFormList[i].fields[j].value;
              }
              if (event.dtFormList[i].fields[j].name == "password") {
                this.setPassword = event.dtFormList[i].fields[j].value;
              }
              const cols = {
                name: event.dtFormList[i].fields[j].name,
                value: event.dtFormList[i].fields[j].value,
                type: event.dtFormList[i].fields[j].type,
                readonly: event.dtFormList[i].fields[j].readonly ? event.dtFormList[i].fields[j].readonly : false,
              };
              data.push(cols);
            }
          }
        } else {
          const cols = {
            name: event.dtFormList[i].name.toLowerCase(),
            value: event.dtFormList[i].viewModel === undefined ? "" : event.dtFormList[i].viewModel,
          };
          data.push(cols);
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
    const pcols = {
      type: "formData",
      cc: event.cc,
      ddname: event.ddName,
      hexkey: event.hexkey,
      viewid: event.viewId,
      newform: true,
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
    this.userEmail = data;
    if (this.validateFormError) {
      toast("Please fill all required fields", Number(sessionStorage.getItem("toastTimeOut")));
      this.loader = environment.displayNone;
      this.enableButton = this._userService.enableFormBtn2();
    } else {
      this._userService.getDetails(data_grid, event.submitapi).subscribe(
        (userIdData) => {
          this.loader = environment.displayNone;
          const resLength = userIdData.body.data.length;
          for (let i = 0; i < resLength; i++) {
            const resVar = userIdData.body.data[i];
            if (resVar.type == "dtWebMenu") {
              this.isRemember = localStorage.getItem(`${location.href}_isRemember`);
              if (this.isRemember == "true") {
                localStorage.setItem(`${location.href}_isRemember`, "true");
                localStorage.setItem(`${location.href}_username`, this.setUsername);
                localStorage.setItem(`${location.href}_password`, this.setPassword);
              } else {
                localStorage.setItem(`${location.href}_isRemember`, "false");
                localStorage.setItem(`${location.href}_username`, "");
                localStorage.setItem(`${location.href}_password`, "");
              }
            }
            if (resVar.type == "dialogHtml") {
              this.enableButton = this._userService.enableFormBtn2();
            }
            if (resVar.type == "notify") {
              this.enableButton = this._userService.enableFormBtn2();
              if (resVar.msg !== undefined || resVar.alert !== undefined) {
                if (resVar.alert !== null || resVar.msg !== null) {
                  this.setmessage = resVar;
                }
              }
            }
          }
          this.sendLoginResponse.emit(userIdData);
        },
        (error) => {
          this.loader = environment.displayNone;
          this.handleError(error);
        }
      );
    }
  }

  cancelInParent(event: any) {
    if (!event.isEnabled) {
      return false;
    } else {
      this.buttonAPICall(event.onPush, event.action);
    }
  }

  buttonAPICall(onPush: string, action: any) {
    let NotNotify = false;
    const cc = this._activeRoute.snapshot.queryParams.cc;
    if (action == "openLink") {
      window.location.href = onPush;
    }
    if (action == "api_call") {
      this._userService.forgotpassword(onPush).subscribe(
        (response) => {
          this.loader = environment.displayNone;
          if (response === null) {
            return false;
          } else {
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].type == "notify") {
                NotNotify = false;
                this.handleNotify(response.data[i]);
                this.enableButton = this._userService.enableFormBtn();
              } else if (response.data[i].type == "dialogHtml") {
                this.showDialogHtmlPage = true;
                this.apiMsg = response.data[i].text;
                this.dialogText = response.data[i].text;
                this.dialogTitle = response.data[i].title;
                this.dialogWidth = response.data[i].dialogWidth !== undefined ? response.data[i].dialogWidth : "";
              } else if (response.data[i].type == "buttons") {
                for (let k = 0; k < response.data[i].buttons.length; k++) {
                  this.buttonresponse.push(response.data[i].buttons[k]);
                }
                this.showDialog = environment.displayBlock;
              } else if (response.data[i].type == "action") {
                this.handleAction(response.data[i]);
              } else {
                NotNotify = true;
              }
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
  }

  handleAction(response: any) {
    if (response.url.includes("http")) {
      if (response.newPage) {
        window.open(response.url, "_blank");
      } else {
        window.open(response.url, "_self");
      }
    } else if (window.location.hostname === "localhost" && !response.url.includes("http")) {
      if (response.newPage) {
        window.open(this.serverName + response.url, "_blank");
      } else {
        window.open(this.serverName + response.url, "_self");
      }
    } else if (window.location.hostname !== "localhost" && !response.url.includes("http")) {
      if (response.newPage) {
        window.open(this.serverName + response.url, "_blank");
      } else {
        window.open(this.serverName + response.url, "_self");
      }
    }
  }

  handleError(error) {
    this.loader = environment.displayNone;
    if (error.error.data !== undefined) {
      for (let i = 0; i < error.error.data.length; i++) {
        if (error.error.data[i].type == "notify") {
          if (error.error.data[i].msg !== undefined || error.error.data[i].alert !== undefined) {
            if (error.error.data[i].alert !== null || error.error.data[i].msg !== null) {
              this.setmessage = error.error.data[i];
            }
          }
        }
      }
    } else if (error.name !== undefined && error.name === "HttpErrorResponse" && error.status === 0 && error.statusText === "Unknown Error") {
      this.setmessage = { alert: "alert", URL: error.url, title: error.title !== undefined ? error.title : "" };
    } else if (error.name !== undefined && error.name === "HttpErrorResponse" && error.status === 503 && error.statusText === "Service Unavailable") {
      this.setmessage = {
        alert: "alert",
        URL: error.url,
        title: environment.serviceNotAvailable,
        statusCode: 503,
        message: error.error.message ? error.error.message : "Server Error 503",
      };
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
