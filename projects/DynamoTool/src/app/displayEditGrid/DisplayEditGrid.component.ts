import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  AfterViewChecked,
  ViewChildren,
  ElementRef,
  QueryList,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { OrderPipe } from "ngx-order-pipe";
import { toast } from "angular2-materialize";
import { EditGridService } from "./editGrid.service";
import { environment } from "../../environments/environment";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { DynamoToolShareService } from "../dynamoToolHome/dynamoToolShare.service";
import * as _ from "underscore";

declare var Materialize: any;

@Component({
  selector: "display-edit-grid",
  templateUrl: "./displayEditGrid.component.html",
  styleUrls: ["./displayEditGrid.component.scss"],
  providers: [EditGridService, DynamoToolShareService],
})
export class DisplayEditGridComponent implements OnInit, AfterViewChecked, AfterViewInit {
  loader: string;
  tableclass: string;
  cssColor: string;
  itemInquiryHead: any;
  itemInquiryBody: any;
  itemInquiryFilteredBody: any;
  editGridTitle: string;
  pageData: any;
  newRow: any;
  hexKeyarray: any = [];
  apiRowSelect: any;
  responsedata: any;
  p = 1;
  totalPage: number;
  validateFormError: boolean;
  dispPagination = "none";
  editGridButton: any[] = [];
  displayGridButton: any[] = [];
  responseEditGrid: any;
  responseDtForm: any;
  popup_width: any;
  popup_top: any;
  gridPopupTitle: string;
  changeId: any[] = [];
  modifiedProperty = false;
  editGridPopUp: string;
  showClose: string;
  popup_zindex: string;
  showEdit = true;
  buttonEnabled = true;
  submitApi: string;
  NewRow: any;
  displaySubGridresp: any;
  navigationcss: string;
  navigatinresponse: string;
  callAppend = false;
  addRowButton: any;
  undeleteButton: any;
  deleteId = [];
  canReorder: boolean;
  DeletedRows: number;
  DeletedButtonText: string;
  functionCall = false;
  isCenter = false;
  tableMaxWidth: string;
  matselectclass: string;
  entryGrid = false;
  serverName: string;
  entryGridUpdate = false;
  showMaxNumMessage = false;
  footerTitle = "";
  entryGridArr: any[] = [];
  hiddenFieldsData: any[] = [];
  dataIndex: any;
  enableSubmitButton = true;
  numberPipe: string;
  entryGridNavigation: any;
  entryGridNavigationCss: string;
  submitApiGrid: string;
  entryGridArrPrevious: any[] = [];
  gridRefNumber: any[] = [];
  gridRefNumberToUse: any;
  invalidMessage = "";
  viewId: any;
  ddname: string;
  cc: string;
  showSearch: boolean = false;
  detectChangeEntryGrid = false;
  detectChangeEditForm = false;
  getDataGrid: boolean = false;
  popupMaxHeight: any;
  setmessage: any;
  rebindMultipart: boolean = false;
  elementToFocus: number = 0;
  tabIndexClicked: any;
  isTabbed: boolean = false;
  selectTabIndex = [];
  displayGridCheckBoxData: string[] = [];
  editRowNextInd = -1;
  currentGridIndex: any; // USE TO SET CURRENT ENTRYGRID WHEN EDIT BUTTON IS PRESSED
  showBusyText: string;
  clientPagination: boolean = false;
  rowsPerPage: number = 10;
  currentPage: number = 1;
  totalRows: number = 0;
  totalPages: number = 0;
  customTime: string;
  customHour: any[] = [];
  customMinute: any[] = [];
  isShiftTab: boolean = false;
  fontSize: any;
  rowSpan: boolean = false;
  colSpan: boolean = false;
  @ViewChild("fullTime") timepicker: any;

  @Input() setDeletedData: boolean;
  @Output() sendData: EventEmitter<any> = new EventEmitter();
  @Output() sendDtEditGrid: EventEmitter<any> = new EventEmitter();
  @Output() handleSubmitEditGrid: EventEmitter<any> = new EventEmitter();
  // to submit multiple entrygrid
  @Output() sendDataEntryGrid: EventEmitter<any> = new EventEmitter();
  @Output() handleDialog: EventEmitter<any> = new EventEmitter();
  @Output() enabledSubmitButton: EventEmitter<any> = new EventEmitter();
  // @Output()  rebindMultipartSet: EventEmitter<any> = new EventEmitter();
  @ViewChildren("mySelect", { read: ElementRef }) mySelect: QueryList<ElementRef<HTMLParagraphElement>>;
  constructor(private orderPipe: OrderPipe, private editGrid: EditGridService, private _dynamoService: DynamoToolShareService) {
    if (window.location.hostname == environment.localhost) {
      this.serverName = environment.baseUrl;
    }
    this.searchByClient = _.debounce(this.searchByClient, 1000);
  }
  @Input()
  set editGridResponse(response: any) {
    this.itemInquiryBody = null;
    this.itemInquiryHead = null;
    this.responsedata = null;
    if (response !== undefined || response !== null) {
      this.bindResponse(response);
    }
  }

  @Input()
  set updateEntryGrid(response: any) {
    if (response !== undefined && response !== "") {
      this.updateEntryGridBody(response);
    }
  }

  @Input()
  set submitApiEntryGrid(response: any) {
    if (response !== undefined && response !== "") {
      this.submitApiGrid = response.onPush;
      this.invalidMessage = response.invalidMessage;
    }
  }
  @Input()
  set submitApiEntryGridMultipart(response: any) {
    if (response !== undefined && response !== "") {
      this.submitApiGrid = response;
    }
  }
  @Input()
  set requiredField(response: any) {
    if (response !== undefined && response !== "") {
      // update value on entryGrid by comparing itemInquirybody and response
      for (let i = 0; i < response.length; i++) {
        for (let j = 0; j < this.itemInquiryBody.length; j++) {
          if (this.itemInquiryBody[j].dataIndex == response[i].gridRefNo) {
            // BOTH GRID MATCHNG
            for (let k = 0; k < response[i].rows.length; k++) {
              if (response[i].rows[k] !== undefined) {
                for (let l = 0; l < response[i].rows[k].fields.length; l++) {
                  if (this.itemInquiryBody[j].items !== undefined) {
                    for (let m = 0; m < this.itemInquiryBody[j].items.length; m++) {
                      // modified 4 march 2022
                      if (
                        this.itemInquiryBody[j].items[m].degColumns[0].name == response[i].rows[k].fields[l].name &&
                        this.itemInquiryBody[j].items[m].degColumns[0].tabindex == response[i].rows[k].fields[l].tabindex &&
                        response[i].rows[k].fields[l].required
                      ) {
                        this.itemInquiryBody[j].items[m].degColumns[0].requiredValid = response[i].rows[k].fields[l].requiredValid;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      // console.log(this.itemInquiryBody);
    }
  }

  ngOnInit() {
    this.loader = environment.displayNone;
    this.rebindMultipart = false;
  }

  ngAfterViewInit() {
    const elems = document.getElementsByClassName("ngx-material-timepicker-toggle");
    if (elems !== undefined && elems !== null) {
      for (let x = 0; x < elems.length; x++) {
        const elem = elems[x] as HTMLElement;
        elem.tabIndex = -1;
      }
    }
  }

  ngAfterViewChecked() {
    if (Materialize.updateTextFields == undefined) {
      return false;
    }
    Materialize.updateTextFields();
  }

  navClientPaginationHandler(event) {
    if (event == "prev") {
      this.currentPage--;
    } else if (event == "next") {
      this.currentPage++;
    } else if (event == "first") {
      this.currentPage = 1;
    } else if (event == "last") {
      this.currentPage = this.totalPages;
    }

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    } else if (this.currentPage < 1) {
      this.currentPage = 1;
    }

    this.updateClientPage();

    this.entryGridNavigation = {
      getFirstPageAPI: this.currentPage > 1 ? "first" : undefined,
      getNextPageAPI: this.totalPages > this.currentPage ? "next" : undefined,
      getLastPageAPI: this.totalPages > this.currentPage ? "last" : undefined,
      getPrevPageAPI: this.currentPage > 1 ? "prev" : undefined,
    };
  }

  updateClientPage() {
    let rows = this.itemInquiryBody;
    let count = -1;
    let startRow = (this.currentPage - 1) * this.rowsPerPage;
    let endRow = this.currentPage * this.rowsPerPage - 1;

    if (this.itemInquiryFilteredBody) {
      rows = this.itemInquiryFilteredBody;
      for (let index = 0; index < rows.length; index++) {
        if (rows[index].hidden != true) {
          count++;
          if (count < startRow || count > endRow) {
            this.itemInquiryBody[index].hidden = true;
          } else {
            this.itemInquiryBody[index].hidden = false;
          }
        } else {
          this.itemInquiryBody[index].hidden = true;
        }
      }
    } else {
      for (let index = 0; index < rows.length; index++) {
        if (index < startRow || index > endRow) {
          this.itemInquiryBody[index].hidden = true;
        } else {
          this.itemInquiryBody[index].hidden = false;
        }
      }
    }
  }

  bindResponse(response: any) {
    this.DeletedRows = 0;
    this.hiddenFieldsData = [];
    let dataIndexs = "";
    this.entryGridNavigationCss = environment.displayNone;
    if (response == undefined || response == null) {
      return;
    } else {
      this.itemInquiryHead = response.head;
      this.entryGridNavigation = response.navigation;

      if (response.isSearchable != true && this.entryGridNavigation !== undefined && this.entryGridNavigation !== "") {
        this.entryGridNavigationCss = environment.displayBlock;
      }
      if (response.clientPagination) {
        this.clientPagination = true;
        this.showSearch = response.isSearchable == true;
        this.rowsPerPage = response.rowsPerPage;
        this.currentPage = 1;
        this.totalRows = response.body.length;
        this.totalPages = Math.ceil(this.totalRows / this.rowsPerPage);

        this.entryGridNavigation = {
          getFirstPageAPI: undefined,
          getNextPageAPI: this.totalPages > this.currentPage ? "next" : undefined,
          getLastPageAPI: this.totalPages > this.currentPage ? "last" : undefined,
          getPrevPageAPI: undefined,
        };
      }
      this.tableclass = response.tableclass;
      this.matselectclass = "DT-red";
      this.tableMaxWidth = response.width;
      this.fontSize = response.fontSize ? response.fontSize : "";
      this.canReorder = response.canReorder;
      this.editGridTitle = response.title;
      this.footerTitle = response.footer;
      this.undeleteButton = response.undeleteButton;
      this.isCenter = response.isCenter;
      const num = response.controlNumber.toString();
      this.viewId = num.split("");

      dataIndexs = response.gridRefNo;
      this.dataIndex = dataIndexs; // TO USE FOR DRAG DROP

      if (response.addRowButton !== undefined) {
        response.addRowButton.dataIndex = dataIndexs;
        /** VIEW ID */
        response.addRowButton.viewId = response.viewId;
        response.addRowButton.viewIdSingle = this.viewId[1];
        response.addRowButton.cc = response.cc;
        response.addRowButton.ddname = response.ddname;
        response.addRowButton.checkDragDrop = false;
        this.addRowButton = response.addRowButton;
      }

      // Modify code to set button only for permitted user
      if (this.undeleteButton !== undefined) {
        this.undeleteButton.isDisabled = true;
      }
      sessionStorage.setItem("header_name", JSON.stringify(this.itemInquiryHead));
      if (response.newrowcols !== undefined) {
        response.newrowcols.dataIndex = dataIndexs;
        /** BIND CC AND DDNAME AND VIEW ID */
        response.newrowcols.cc = response.cc;
        response.newrowcols.ddname = response.ddname;
        response.newrowcols.viewId = response.viewId;
        response.newrowcols.viewIdSingle = this.viewId[1];
        // response.newrowcols =
        this.NewRow = response.newrowcols;
        const NewRow12 = [
          [
            {
              showBusyIndicator: true,
              maxwidth: "521px",
              includeAllFields: false,
              maxlength: 40,
              icon: "fas fa-search",
              type: "text",
              onChangeApi: "/dy/Item/search?showBusy=true&rowselectapi=/dy/Assortment/addrow&noinvco=true&gridRefNo=DTGrid-05.11.22-165",
              size: 40,
              isSearch: true,
              inputclass: "Validate",
              name: "compitemno",
              textalign: "left",
              placeholder: "Enter Item# or Search Word(s)",
              value: "",
            },
          ],
          [{ readonly: true }],
          [
            {
              maxwidth: "92px",
              min: 0,
              max: 9999999,
              inputclass: "Validate",
              name: "qty",
              textalign: "center",
              show: "",
              isDecimal: true,
              numberPipe: ".0-4",
              step: "any",
              type: "number",
              value: 0,
            },
          ],
        ];
      }
      let IsDecimal = true;
      let rowSpan = 0;
      let colSpan = 0;

      const mdata = [];
      if (response.body.length > 0) {
        for (let i = 0; i < response.body.length; i++) {
          const data = [];
          for (let j = 0; j < response.body[i].columns.length; j++) {
            const cols1 = [];

            for (let m = 0; m < response.body[i].columns[j].length; m++) {
              IsDecimal =
                response.body[i].columns[j][m].isDecimal !== undefined && response.body[i].columns[j][m].isDecimal !== ""
                  ? response.body[i].columns[j][m].isDecimal
                  : false;
              // ADDED FOR ROWSPAN
              if (response.body[i].columns[j][m].rowspan && rowSpan == 0) {
                rowSpan++;
                this.rowSpan = true;
              }
              // ADDED FOR ROWSPAN
              if (response.body[i].columns[j][m].colspan && colSpan == 0) {
                colSpan++;
                this.colSpan = true;
              }

              const cols = {
                name: response.body[i].columns[j][m].name ? response.body[i].columns[j][m].name : "",
                path: response.body[i].columns[j][m].path ? response.body[i].columns[j][m].path : "",
                image: response.body[i].columns[j][m].image ? response.body[i].columns[j][m].image : "",
                colspan: response.body[i].columns[j][m].colspan ? response.body[i].columns[j][m].colspan : "",
                rowspan: response.body[i].columns[j][m].rowspan ? response.body[i].columns[j][m].rowspan : "",
                value:
                  response.body[i].columns[j][m].type == "number"
                    ? this.convertToDecimalAppendRow(response.body[i].columns[j][m].numberPipe, response.body[i].columns[j][m].value, IsDecimal)
                    : response.body[i].columns[j][m].show !== "" &&
                      response.body[i].columns[j][m].show !== undefined &&
                      response.body[i].columns[j][m].isSearch
                    ? response.body[i].columns[j][m].show
                    : response.body[i].columns[j][m].value,

                value1:
                  response.body[i].columns[j][m].type == "number"
                    ? this.convertToDecimalAppendRow(response.body[i].columns[j][m].numberPipe, response.body[i].columns[j][m].value, IsDecimal)
                    : response.body[i].columns[j][m].value,

                cellclass: response.body[i].columns[j][m].cellclass,
                type: response.body[i].columns[j][m].isSearch
                  ? "search"
                  : response.body[i].columns[j][m].type
                  ? response.body[i].columns[j][m].type
                  : "",
                options: response.body[i].columns[j][m].options,
                inputclass: response.body[i].columns[j][m].inputclass,
                textalign: response.body[i].columns[j][m].textalign,
                maxwidth: response.body[i].columns[j][m].maxwidth,
                width: response.body[i].columns[j][m].width ? response.body[i].columns[j][m].width : "",
                max: response.body[i].columns[j][m].max,
                tabindex: response.body[i].columns[j][m].tabindex,
                step: response.body[i].columns[j][m].step,
                divclass: response.body[i].columns[j][m].divclass,
                readonly: response.body[i].columns[j][m].readonly,
                maxlength: response.body[i].columns[j][m].maxlength,
                size: response.body[i].columns[j][m].size,
                rows: response.body[i].columns[j][m].rows,
                cols: response.body[i].columns[j][m].cols,
                min: response.body[i].columns[j][m].min,
                placeholder: response.body[i].columns[j][m].placeholder,
                pattern: response.body[i].columns[j][m].pattern,
                required: response.body[i].columns[j][m].required !== undefined ? response.body[i].columns[j][m].required : false,
                id: response.body[i].columns[j][m].tabindex,
                onChangeApi: response.body[i].columns[j][m].onChangeApi,
                label: response.body[i].columns[j][m].label ? response.body[i].columns[j][m].label : "",
                mControl: response.body[i].columns[j][m].mControl ? response.body[i].columns[j][m].mControl : false,
                show: response.body[i].columns[j][m].show,
                isDecimal: IsDecimal,
                dataIndex: response.gridRefNo,
                hexkey: response.body[i].hexkey,
                checkMaxValue: false,
                isValid: true,
                requiredValid:
                  response.body[i].columns[j][m].requiredValid !== undefined
                    ? response.body[i].columns[j][m].requiredValid
                    : true /** use to make entryGrid columns red color */,
                numberPipe: response.body[i].columns[j][m].numberPipe,
                alignment: response.body[i].columns[j][m].alignment !== undefined ? response.body[i].columns[j][m].alignment : "",
                focus: response.body[i].columns[j][m].focus !== undefined ? response.body[i].columns[j][m].focus : false,
                format: response.body[i].columns[j][m].format !== undefined ? response.body[i].columns[j][m].format : 12,
                apicollink: response.head[j] !== undefined && response.head[j].apicollink !== undefined ? response.head[j].apicollink : "",
              };
              cols1.push(cols);
            }

            const degColumn = {
              degColumns: cols1,
            };

            data.push(degColumn);
          }
          const buttons = [];
          if (response.body[i].buttons !== undefined && response.body[i].buttons.length > 0) {
            for (let m = 0; m < response.body[i].buttons.length; m++) {
              const btns = {
                canEdit: response.body[i].canEdit,
                isEnabled: response.body[i].buttons[m].isEnabled,
                tabindex: response.body[i].buttons[m].tabindex,
                action: response.body[i].buttons[m].action,
                buttonType: response.body[i].buttons[m].buttonType,
                class: response.body[i].buttons[m].class,
                icon: response.body[i].buttons[m].icon,
                onPush: response.body[i].buttons[m].onPush,
                text: response.body[i].buttons[m].text,
                type: response.body[i].buttons[m].type,
                // hexkey: response.body[i].buttons[m].hexkey,
                hexkey: response.body[i].hexkey,
                dataIndex: dataIndexs,
                ddname: response.ddname,
                cc: response.cc,
                id: i + 1,
              };

              buttons.push(btns);
            }
            // To use buttons in append function call
            const buttons_len = buttons.length;
            sessionStorage.setItem("button_response", JSON.stringify(buttons));
            sessionStorage.setItem("buttonUpdateGrid", JSON.stringify(buttons));
          }
          const mcols = {
            items: data,
            isModified: false,
            checkMaxValue: false,
            hexkey: response.body[i].hexkey,
            id: i + 1,
            rank: response.body[i].rank,
            apiRowSelect: response.apiRowSelect,
            isDeleted: false,
            displayGridButton: buttons,
            dataIndex: dataIndexs,
            ddname: response.ddname,
            cc: response.cc,
          };

          mdata.push(mcols);
        }
      } else {
        // if body is empty
        const buttons = [];
        mdata.push({
          dataIndex: dataIndexs,
          ddname: response.ddname,
          cc: response.cc,
        });
        if (response.hasOwnProperty("buttons") && response.buttons.length > 0) {
          for (let m = 0; m < response.buttons.length; m++) {
            const btns = {
              canEdit: false,
              isEnabled: response.buttons[m].isEnabled,
              action: response.buttons[m].action,
              buttonType: response.buttons[m].buttonType,
              class: response.buttons[m].class,
              icon: response.buttons[m].icon,
              onPush: response.buttons[m].onPush,
              text: response.buttons[m].text,
              type: response.buttons[m].type,
              hexkey: "",
              dataIndex: dataIndexs,
              ddname: response.ddname,
              cc: response.cc,
            };

            buttons.push(btns);
          }
          // To use buttons in append function call
          const buttons_len = buttons.length;
          sessionStorage.setItem("button_response", JSON.stringify(buttons));
          sessionStorage.setItem("buttonUpdateGrid", JSON.stringify(buttons));
        }
      }
      // ADDED TO CHECK FOR DRAG DROP BUTTON
      if (this.addRowButton !== undefined) {
        const dragDropButton = JSON.parse(sessionStorage.getItem("button_response"));
        if (dragDropButton !== null) {
          const checkDragDrop = dragDropButton.findIndex((x) => x.onPush == "dragdrop");
          if (checkDragDrop >= 0) {
            this.addRowButton.checkDragDrop = true;
          }
        }
      }
      this.responsedata = response;
      this.itemInquiryBody = mdata;
      if (this.undeleteButton !== undefined) {
        this.DeletedButtonText = this.undeleteButton.text;
      }
    }

    /** TO SAVE MULTIPLE ENTRYGRID DATA */
    if (sessionStorage.getItem("entryGridDataArr") == "") {
      this.entryGridArr = [];
    }
    if (sessionStorage.getItem("setEntryGrid") == "") {
      this.entryGridArrPrevious = [];
    }
    if (sessionStorage.getItem("gridRefNumber") == "") {
      this.gridRefNumber = [];
    }

    if (
      sessionStorage.getItem("entryGridDataArr") !== undefined &&
      sessionStorage.getItem("entryGridDataArr") !== "" &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== undefined &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== null &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== ""
    ) {
      this.entryGridArr = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
    }

    this.entryGridArr.push(this.itemInquiryBody);
    sessionStorage.setItem("entryGridDataArr", JSON.stringify(this.entryGridArr));
    /** CHECK IF dataIndexs already exist replace content of entryGRid */
    if (sessionStorage.getItem("gridRefNumber") !== undefined && sessionStorage.getItem("gridRefNumber") !== "") {
      const findgridRef = JSON.parse(sessionStorage.getItem("gridRefNumber"));
      const gridIndex = findgridRef.indexOf(dataIndexs);
      if (gridIndex >= 0) {
        this.entryGridArr.splice(gridIndex, 1);

        sessionStorage.setItem("entryGridDataArr", JSON.stringify(this.entryGridArr));
      }
    }

    this.getPreviousState(this.entryGridArr, dataIndexs, response.viewId);
    if (this.clientPagination) {
      this.updateClientPage();
    }
  }

  /** USE TO MAKE REQUIRED FIELDS IN RED COLOR BY USING INPUT PROPERTY FROM PARENT COMPONENT */
  getPreviousState(entryGrid: any, dataIndexs?: any, viewId?: any) {
    if (
      sessionStorage.getItem("setEntryGrid") !== undefined &&
      sessionStorage.getItem("setEntryGrid") !== "" &&
      sessionStorage.getItem("setEntryGrid") !== null
    ) {
      this.entryGridArrPrevious = JSON.parse(sessionStorage.getItem("setEntryGrid"));
    }
    this.entryGridArrPrevious.push(entryGrid);

    sessionStorage.setItem("setEntryGrid", JSON.stringify(this.entryGridArrPrevious));

    if (
      sessionStorage.getItem("gridRefNumber") !== undefined &&
      sessionStorage.getItem("gridRefNumber") !== "" &&
      sessionStorage.getItem("gridRefNumber") !== null
    ) {
      this.gridRefNumber = JSON.parse(sessionStorage.getItem("gridRefNumber"));
    }
    const gridIndex = this.gridRefNumber.indexOf(dataIndexs);
    if (gridIndex >= 0) {
    } else {
      this.gridRefNumber.push(dataIndexs);
    }

    sessionStorage.setItem("gridRefNumber", JSON.stringify(this.gridRefNumber));
  }

  /////// Save Edit Grid Data ////////////////
  saveEditGrid(data: any, submitapi: string, dtFormList: any, event: any) {
    const cols = {
      data: data,
      submitapi: submitapi,
      dtFormList: dtFormList,
    };
    this.sendDtEditGrid.emit(cols);
  }

  /////////// Update Entry grid Data ///////////
  updateEntryGridBody(response: any) {
    let gridRefNo = 0;
    let gridIndex = 0;
    for (let p = 0; p < response.data.length; p++) {
      if (response.data[p].type == "entryGridRows") {
        gridRefNo = response.data[p].gridRefNo;
      }
    }
    if (sessionStorage.getItem("entryGridDataArr") !== undefined && sessionStorage.getItem("entryGridDataArr") !== "") {
      this.entryGridArr = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
    }
    /** FIND DATA INDEX OF GRID WHERE UPDATE ROW NEED TO BE PERFORMED */
    const findgridRef = JSON.parse(sessionStorage.getItem("gridRefNumber"));
    gridIndex = findgridRef.indexOf(gridRefNo);
    const mdata = [];
    let IsDecimal: boolean;
    for (let p = 0; p < response.data.length; p++) {
      if (response.data[p].type == "entryGridRows" && response.data[p].body.length > 0) {
        for (let i = 0; i < response.data[p].body.length; i++) {
          const data = [];
          for (let j = 0; j < response.data[p].body[i].columns.length; j++) {
            const cols1 = [];
            for (let m = 0; m < response.data[p].body[i].columns[j].length; m++) {
              IsDecimal =
                response.data[p].body[i].columns[j][m].isDecimal !== undefined && response.data[p].body[i].columns[j][m].isDecimal !== ""
                  ? response.data[p].body[i].columns[j][m].isDecimal
                  : false;
              const cols = {
                name: response.data[p].body[i].columns[j][m].name ? response.data[p].body[i].columns[j][m].name : "",
                value:
                  response.data[p].body[i].columns[j][m].type == "number"
                    ? this.convertToDecimalAppendRow(
                        response.data[p].body[i].columns[j][m].numberPipe,
                        response.data[p].body[i].columns[j][m].value,
                        IsDecimal
                      )
                    : response.data[p].body[i].columns[j][m].value,
                cellclass: response.data[p].body[i].columns[j][m].cellclass,
                type: response.data[p].body[i].columns[j][m].isSearch
                  ? "search"
                  : response.data[p].body[i].columns[j][m].type
                  ? response.data[p].body[i].columns[j][m].type
                  : "",
                options: response.data[p].body[i].columns[j][m].options !== undefined ? response.data[p].body[i].columns[j][m].options : "",
                inputclass: response.data[p].body[i].columns[j][m].inputclass !== undefined ? response.data[p].body[i].columns[j][m].inputclass : "",
                textalign: response.data[p].body[i].columns[j][m].textalign !== undefined ? response.data[p].body[i].columns[j][m].textalign : "",
                maxwidth: response.data[p].body[i].columns[j][m].maxwidth !== undefined ? response.data[p].body[i].columns[j][m].maxwidth : "",
                max: response.data[p].body[i].columns[j][m].max !== undefined ? response.data[p].body[i].columns[j][m].max : "",
                tabindex: response.data[p].body[i].columns[j][m].tabindex,
                step: response.data[p].body[i].columns[j][m].step,
                divclass: response.data[p].body[i].columns[j][m].divclass,
                readonly: response.data[p].body[i].columns[j][m].readonly,
                maxlength: response.data[p].body[i].columns[j][m].maxlength,
                size: response.data[p].body[i].columns[j][m].size,
                rows: response.data[p].body[i].columns[j][m].rows,
                cols: response.data[p].body[i].columns[j][m].cols,
                min: response.data[p].body[i].columns[j][m].min,
                placeholder: response.data[p].body[i].columns[j][m].placeholder,
                pattern: response.data[p].body[i].columns[j][m].pattern !== undefined ? response.data[p].body[i].columns[j][m].pattern : "",
                id: response.data[p].body[i].columns[j][m].tabindex,
                onChangeApi: response.data[p].body[i].columns[j][m].onChangeApi,
                label: response.data[p].body[i].columns[j][m].label ? response.data[p].body[i].columns[j][m].label : "",
                mControl: response.data[p].body[i].columns[j][m].mControl ? response.data[p].body[i].columns[j][m].mControl : false,
                dataIndex: gridRefNo,
                show: response.data[p].body[i].columns[j][m].value ? response.data[p].body[i].columns[j][m].value : "",
                isValid: true,
                hexkey: response.data[p].body[i].hexkey,
              };
              cols1.push(cols);
            }
            const degColumn = {
              degColumns: cols1,
            };
            data.push(degColumn);
          }

          /** BIND BUTTONS IN UPDATED ENTRYGRID  */
          const buttons = [];
          const showButton = JSON.parse(sessionStorage.getItem("buttonUpdateGrid"));
          for (let m = 0; m < showButton.length; m++) {
            const btns = {
              canEdit: response.data[p].body[i].canEdit,
              isEnabled: showButton[m].isEnabled,
              action: showButton[m].action,
              buttonType: showButton[m].buttonType,
              class: showButton[m].class,
              icon: showButton[m].icon,
              onPush: showButton[m].onPush,
              text: showButton[m].text,
              type: showButton[m].type,
              dataIndex: gridRefNo,
              hexkey: response.data[p].body[i].hexkey,
              id: i + 1,
            };
            buttons.push(btns);
          }

          const mcols = {
            items: data,
            isModified: false,
            hexkey: response.data[p].body[i].hexkey,
            id: i + 1,
            rank: response.data[p].body[i].rank,
            isDeleted: false,
            dataIndex: gridRefNo,
            displayGridButton: buttons,
          };
          mdata.push(mcols);
          /** APPEND ROW */
          if (this.entryGridArr[gridIndex].length > 0) {
            this.entryGridArr[gridIndex].push(mcols);
          }
        }
      }
    }

    if (this.entryGridArr[gridIndex].length == 0) {
      this.entryGridArr[gridIndex] = mdata;
    }

    this.itemInquiryBody = this.entryGridArr[gridIndex];
    // TO SAVE ENTRY GRID DATA
    sessionStorage.setItem("entryGridDataArr", JSON.stringify(this.entryGridArr));
  }

  //////////// Find Tab Index Column //////////////////
  findTabIndexCustom(gridIndex: any, viewId: any) {
    let tabLastRowCol: any;
    let rowNum;
    let rowNum1;

    if (this.entryGridArr[gridIndex] !== undefined && this.entryGridArr[gridIndex].length > 0) {
      tabLastRowCol = JSON.stringify(this.findTabIndex(this.entryGridArr[gridIndex]));
      rowNum = Number(tabLastRowCol.substr(2, 3));
      rowNum = rowNum + 3;
      if (rowNum < 10) {
        rowNum1 = "00" + (rowNum + 1).toString();
      } else if (rowNum > 9 && rowNum < 100) {
        rowNum1 = "0" + (rowNum + 1).toString();
      } else {
        rowNum1 = (Number(rowNum) + 1).toString();
      }

      return rowNum1;
    }
  }

  //////////// Add New Row ////////////
  addRow(dataIndex?: any, head?: any, newRow?: any, dragDrop?: any, editapi?: any) {
    const viewId = newRow.viewId !== undefined ? newRow.viewId.split("#")[1] : newRow.viewIdSingle;
    const viewIdToUse = viewId;
    let gridIndex = 0;
    if (
      sessionStorage.getItem("entryGridDataArr") !== undefined &&
      sessionStorage.getItem("entryGridDataArr") !== "" &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== undefined &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== null &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== ""
    ) {
      this.entryGridArr = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
    }

    /** FIND DATA INDEX OF GRID WHERE UPDATE ROW NEED TO BE PERFORMED */
    const findgridRef = JSON.parse(sessionStorage.getItem("gridRefNumber"));
    gridIndex = findgridRef.indexOf(dataIndex);
    const tabIndexCustom = this.findTabIndexCustom(gridIndex, viewIdToUse);
    let response: any;
    if (editapi == undefined) {
      response = {
        buttons: [
          {
            buttonType: "button",
            onPush: "dragdrop",
            isEnabled: true,
            icon: "fas fa-arrows-alt-v", // fas fa-arrows-alt
            action: "function",
            class: "DTButton-black",
            dataIndex: dataIndex,
          },
          {
            buttonType: "button",
            icon: "fas fa-trash",
            action: "function",
            onPush: "delete",
            isEnabled: true,
            type: "button",
            class: "DTButton-red",
            dataIndex: dataIndex,
          },
          // ADD drag drop button
        ],
      };
    } else {
      response = {
        buttons: [
          {
            buttonType: "submit",
            invalidMessage: "Correct red fields before saving",
            onPush: editapi,
            isEnabled: true,
            tabindex: 11007,
            icon: "fas fa-pencil-alt",
            action: "api_call",
            class: "DTButton-green",
            disableOnClick: true,
          },
          {
            buttonType: "button",
            onPush: "dragdrop",
            isEnabled: true,
            icon: "fas fa-arrows-alt-v", // fas fa-arrows-alt
            action: "function",
            class: "DTButton-black",
            dataIndex: dataIndex,
          },
          {
            buttonType: "button",
            icon: "fas fa-trash",
            action: "function",
            onPush: "delete",
            isEnabled: true,
            type: "button",
            class: "DTButton-red",
            dataIndex: dataIndex,
          },
          // ADD drag drop button
        ],
      };
    }

    if (!dragDrop) {
      response.buttons.splice(0, 1);
      // REMOVE ELEMENT FOR DRAG DROP AND GIVE ELEMENT DELETE
    }
    // ADDED TO SHOW DRAG DROP BUTTON WHEN USER CLICK ON ANY ROW IN GRID
    sessionStorage.setItem("button_grid", JSON.stringify(response));
    this.showEdit = false;
    const data1 = [];
    const r = 0;
    let rcoount = 0;

    let lastRowColTab: number = 0;
    if (head.length == newRow.length) {
      rcoount = newRow.length - 1;
    } else {
      rcoount = newRow.length;
    }
    let IsInputcout = 0;
    let IsDecimal = true;
    let Value: any;
    if (newRow.length > 0) {
      for (let j = 0; j < newRow.length; j++) {
        if (
          newRow[j][r].isSearch ||
          newRow[j][r].type == "text" ||
          newRow[j][r].type == "number" ||
          newRow[j][r].type == "date" ||
          newRow[j][r].type == "switch" ||
          newRow[j][r].type == "select" ||
          newRow[j][r].type == "email" ||
          newRow[j][r].type == "radio" ||
          newRow[j][r].type == "ipAddress" ||
          newRow[j][r].type == "url" ||
          newRow[j][r].type == "time" ||
          newRow[j][r].type == "checkbox" ||
          newRow[j][r].type == "macAddress" ||
          newRow[j][r].type == "usTelephoneNumber"
        ) {
          break;
        }
        IsInputcout++;
      }
    }

    for (let i = 0; i < rcoount; i++) {
      let customTabIndex = 0;
      if (newRow[i].length > 0) {
        if (this.entryGridArr[gridIndex] !== undefined && this.entryGridArr[gridIndex].length > 0) {
          if (Number(tabIndexCustom) + i < 10) {
            customTabIndex = Number("1" + viewIdToUse + "00" + (Number(tabIndexCustom) + i));
          } else if (Number(tabIndexCustom) + i >= 10 && Number(tabIndexCustom) + i < 100) {
            customTabIndex = Number("1" + viewIdToUse + "0" + (Number(tabIndexCustom) + i));
          } else {
            customTabIndex = Number("1" + viewIdToUse + (Number(tabIndexCustom) + i));
          }
        } else {
          customTabIndex = Number("1" + viewIdToUse + "00" + (i + 1));
        }

        const cols1 = [];
        IsDecimal = newRow[i][r].isDecimal !== undefined && newRow[i][r].isDecimal !== "" ? newRow[i][r].isDecimal : false;
        Value = newRow[i][r].value ? newRow[i][r].value : "";
        // ADDED FOR LAST COL IN NEW ROW
        if (i == rcoount - 1) {
          lastRowColTab = customTabIndex;
        }

        const cols12 = {
          name: newRow[i][r].name == "undefined" ? "" : newRow[i][r].name,
          value:
            newRow[i][r].type == "number"
              ? newRow[i][r].value !== 0
                ? this.convertToDecimalAppendRow(newRow[i][r].numberPipe, newRow[i][r].value, IsDecimal)
                : newRow[i][r].value
              : newRow[i][r].show !== undefined && newRow[i][r].show !== "" && newRow[i][r].isSearch
              ? newRow[i][r].show
              : newRow[i][r].value,
          cellclass: newRow[i][r].cellclass,
          type: newRow[i][r].isSearch ? "search" : newRow[i][r].type,
          colspan: newRow[i][r].colspan ? newRow[i][r].colspan : "",
          rowspan: newRow[i][r].rowspan ? newRow[i][r].rowspan : "",
          options: newRow[i][r].options,
          inputclass: newRow[i][r].inputclass,
          textalign: newRow[i][r].textalign,
          maxwidth: newRow[i][r].maxwidth,
          tabindex: customTabIndex,
          focus: false,
          step: newRow[i][r].step,
          divclass: newRow[i][r].divclass,
          readonly: newRow[i][r].readonly,
          max: newRow[i][r].max,
          maxlength: newRow[i][r].maxlength,
          size: newRow[i][r].size,
          min: newRow[i][r].min,
          placeholder: newRow[i][r].placeholder,
          pattern: newRow[i][r].pattern,
          label: newRow[i][r].label ? newRow[i][r].label : "",
          mControl: newRow[i][r].mControl ? newRow[i][r].mControl : false,
          onChangeApi: newRow[i][r].onChangeApi,
          numberPipe: newRow[i][r].numberPipe !== undefined && newRow[i][r].numberPipe !== "" ? newRow[i][r].numberPipe : environment.numberPipe,
          checkMaxValue: false,
          id: customTabIndex,
          ids: this.entryGridArr[gridIndex].length + 1,
          rank: this.entryGridArr[gridIndex].length,
          isModified: false,
          dataIndex: dataIndex,
          show: newRow[i][r].show,
          required: newRow[i][r].required !== undefined ? newRow[i][r].required : false,
          requiredValid: true /** use to make entryGrid columns red color */,
          value1: newRow[i][r].value,
          isValid: true,
          isDecimal: IsDecimal,
          alignment: newRow[i][r].alignment !== undefined ? newRow[i][r].alignment : "",
        };

        cols1.push(cols12);
        const degColumn = {
          degColumns: cols1,
        };
        data1.push(degColumn);
      }
    }
    const buttons = [];
    for (let m = 0; m < response.buttons.length; m++) {
      const btns = {
        action: response.buttons[m].action,
        buttonType: response.buttons[m].buttonType,
        isEnabled: response.buttons[m].isEnabled,
        class: response.buttons[m].class,
        icon: response.buttons[m].icon,
        onPush: response.buttons[m].onPush,
        type: response.buttons[m].type,
        hexkey: "",
        dataIndex: dataIndex,
        id: this.entryGridArr[gridIndex].length + 1,
        rank: this.entryGridArr[gridIndex].length,
        tabindex: lastRowColTab + (m + 1),
      };

      buttons.push(btns);
    }
    const mcols1 = {
      items: data1,
      isModified: false,
      hexkey: "",
      dataIndex: dataIndex,
      ddname: newRow.ddname,
      cc: newRow.cc,
      id: this.entryGridArr[gridIndex].length + 1,
      rank: this.entryGridArr[gridIndex].length,
      isDeleted: false,
      checkMaxValue: false,
      displayGridButton: buttons,
    };

    this.itemInquiryBody.push(mcols1);
    this.editGridPopUp = environment.displayNone;
    setTimeout(() => {
      // console.log('name',this.entryGridArr[gridIndex][this.entryGridArr[gridIndex].length - 1].items[IsInputcout].degColumns[0].name + this.entryGridArr[gridIndex][this.entryGridArr[gridIndex].length - 1].items[IsInputcout].degColumns[0].tabindex);
      const elems = document.getElementById(
        this.entryGridArr[gridIndex][this.entryGridArr[gridIndex].length - 1].items[IsInputcout].degColumns[0].id
      );
      if (elems !== null && this.entryGridArr[gridIndex][this.entryGridArr[gridIndex].length - 1].items[IsInputcout].degColumns[0].type !== "radio") {
        elems.focus();
      } else if (
        elems == null &&
        this.entryGridArr[gridIndex][this.entryGridArr[gridIndex].length - 1].items[IsInputcout].degColumns[0].type == "radio"
      ) {
        const myRadio = document.getElementsByName(
          this.entryGridArr[gridIndex][this.entryGridArr[gridIndex].length - 1].items[IsInputcout].degColumns[0].name +
            this.entryGridArr[gridIndex][this.entryGridArr[gridIndex].length - 1].items[IsInputcout].degColumns[0].tabindex
        );
        // console.log('radio elemns');
        // console.log(myRadio);
        if (myRadio.length > 0) {
          myRadio[0].focus();
          myRadio[0].classList.remove("untabbed");
          myRadio[0].classList.add("tabbed");
        }
      }
    }, 50); //50

    // FOR ADDING ROW IN MULTIPLE ENTRYGRID
    this.entryGridArr[gridIndex] = this.itemInquiryBody;
    sessionStorage.setItem("entryGridDataArr", JSON.stringify(this.entryGridArr));
    // ID to be used when popup is closed without clicking display grid
    const popUp_id = this.entryGridArr[gridIndex].length;
    sessionStorage.setItem("id_popup", JSON.stringify({ popUp_id: popUp_id, delete: true }));
  }

  ///////////// Find Tab Index Of Grid ///////////////
  findTabIndex(grid) {
    let tabindex = 0;
    for (let i = 0; i < grid.length; i++) {
      if (grid[i].items !== undefined) {
        for (let j = 0; j < grid[i].items.length; j++) {
          for (let k = 0; k < grid[i].items[j].degColumns.length; k++) {
            if (grid[i].items[j].degColumns[k].tabindex !== undefined && grid[i].items[j].degColumns[k].tabindex !== "") {
              tabindex = grid[i].items[j].degColumns[k].tabindex;
            }
          }
        }
      }
    }
    return tabindex;
  }

  /////////// Bind Entry Grid Data ///////////
  bindEntryGrid(response, gridIndex) {
    if (sessionStorage.getItem("entryGridDataArr") !== undefined && sessionStorage.getItem("entryGridDataArr") !== "") {
      this.entryGridArr = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
    }
    for (let i = 0; i < response.length; i++) {
      if (this.entryGridArr[gridIndex][0].dataIndex == response[i].gridRefNo) {
        for (let j = 0; j < this.entryGridArr[gridIndex].length; j++) {
          if (response[i].rows !== undefined) {
            for (let k = 0; k < response[i].rows.length; k++) {
              for (let l = 0; l < response[i].rows[k].fields.length; l++) {
                if (this.entryGridArr[gridIndex][j].items !== undefined) {
                  for (let m = 0; m < this.entryGridArr[gridIndex][j].items.length; m++) {
                    for (let n = 0; n < this.entryGridArr[gridIndex][j].items[m].degColumns.length; n++) {
                      if (
                        this.entryGridArr[gridIndex][j].items[m].degColumns[0].name == response[i].rows[k].fields[l].name &&
                        response[i].rows[k].fields[l].required
                      ) {
                        this.entryGridArr[gridIndex][j].items[m].degColumns[0].requiredValid = response[i].rows[k].fields[l].requiredValid;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    this.rebindMultipart = true;
  }

  ////////// Change Date Time ///////////////
  getChangeTime(
    id: number,
    degColumn: any,
    tableclass?: string,
    value?: any,
    maxValue?: number,
    name?: string,
    degColumns?: any,
    event?: any,
    fromIcon: boolean = false
  ) {
    this.detectChangeEntryGrid = true;
    let gIndex = 0;
    let ind = 0;
    sessionStorage.setItem("detectChangeEntryGrid", JSON.stringify(this.detectChangeEntryGrid));
    if (degColumns != null && degColumns !== undefined && degColumns.dataIndex !== undefined) {
      for (let i = 0; i < this.entryGridArr.length; i++) {
        if (this.entryGridArr[i].length > 0 && this.entryGridArr[i][0].dataIndex == degColumns.dataIndex) {
          gIndex = i;
          break;
        }
      }
    }
    const checkForValid = this.setCustomTime(event, degColumns.id, degColumns, gIndex, fromIcon);
    if (
      checkForValid !== undefined &&
      checkForValid.formatValid &&
      degColumns.onChangeApi !== undefined &&
      degColumns.onChangeApi.length > 1 &&
      checkForValid.value !== ""
    ) {
      this.OnChangeAPiData(degColumns.onChangeApi, checkForValid.value, degColumns.name, degColumns);
    }
    if (
      sessionStorage.getItem("entryGridDataArr") !== undefined &&
      sessionStorage.getItem("entryGridDataArr") !== "" &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== undefined &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== null &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== ""
    ) {
      this.entryGridArr = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
    }
    this.callAppend = false;
    this.showMaxNumMessage = false;
    if (
      checkForValid !== undefined &&
      checkForValid.formatValid &&
      degColumns != null &&
      degColumns !== undefined &&
      degColumns.dataIndex !== undefined
    ) {
      for (let i = 0; i < this.entryGridArr.length; i++) {
        if (this.entryGridArr[i].length > 0 && this.entryGridArr[i][0].dataIndex == degColumns.dataIndex) {
          gIndex = i;
          break;
        }
      }
      // UNSET ELEMENT FOCUS
      const grid = this.entryGridArr[gIndex];
      for (let i = 0; i < grid.length; i++) {
        if (grid[i].items !== undefined) {
          for (let j = 0; j < grid[i].items.length; j++) {
            for (let k = 0; k < grid[i].items[j].degColumns.length; k++) {
              if (
                grid[i].items[j].degColumns !== undefined &&
                grid[i].items[j].degColumns[k].tabindex !== undefined &&
                grid[i].items[j].degColumns[k].tabindex !== ""
              ) {
                grid[i].items[j].degColumns[k].focus = false;
              }
            }
          }
        }
      }
      this.entryGridArr[gIndex] = grid;
      if (degColumn !== null && degColumn !== undefined && degColumn.hexkey !== "") {
        ind = this.entryGridArr[gIndex].findIndex((x) => x.hexkey == degColumn.hexkey && x.id == id && x.dataIndex == degColumns.dataIndex);
      } else {
        ind = this.entryGridArr[gIndex].findIndex((x) => x.id == id && x.dataIndex == degColumns.dataIndex);
      }
      this.entryGridArr[gIndex][ind].isModified = true;
      for (let i = 0; i < this.entryGridArr[gIndex][ind].items.length; i++) {
        for (let j = 0; j < this.entryGridArr[gIndex][ind].items[i].degColumns.length; j++) {
          if (
            this.entryGridArr[gIndex][ind].items[i].degColumns !== undefined &&
            this.entryGridArr[gIndex][ind].items[i].degColumns[j].name == degColumns.name &&
            this.entryGridArr[gIndex][ind].items[i].degColumns[j].tabindex == degColumns.tabindex
          ) {
            if (this.entryGridArr[gIndex][ind].items[i].degColumns[j].type == "time") {
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].value1 = checkForValid.value;
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].value = checkForValid.value;
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].show = checkForValid.value;
            }
          }
        }
      }
    }
    this.buttonEnabled = false;
    sessionStorage.setItem("entryGridDataArr", JSON.stringify(this.entryGridArr));
  }

  /////////////////// Set Custom Time /////////////
  setCustomTime(event, id, degColumn, gIndex, fromIcon) {
    const customTime = this._dynamoService.setCustomHourMinute(fromIcon, degColumn, event);
    if (customTime.formatValid) {
      return { formatValid: customTime.formatValid, value: customTime.value };
    } else {
      toast(customTime.validationMessage, Number(sessionStorage.getItem("toastTimeOut")));
      degColumn.value = customTime.value;
      degColumn.value1 = customTime.value;
      degColumn.show = customTime.value;
      this.setFocusOnElement(degColumn, id, gIndex, !customTime.formatValid);
    }
  }

  //////// Handle Show Busy ////////
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

  ///////////// Handel Entry Grid Nav //////////
  navHandlerEntryGrid(event) {
    const url = event;
    let entryGridDataArr: any;
    this.handleShowBusy(url);
    let checkChange: any;
    /** CHECK FIELDS IN ENTRYGRID IF CHANGED */
    const gridRefNo = this._dynamoService.getValue(url, "gridRefNo");
    checkChange = this.checkEntryGridChange(gridRefNo);
    checkChange = JSON.parse(JSON.stringify(checkChange));
    if (checkChange.checkChange) {
      // DATA TO BE SUBMITTED USING API submitApiGrid
      if (
        sessionStorage.getItem("entryGridDataArr") !== undefined &&
        sessionStorage.getItem("entryGridDataArr") !== null &&
        sessionStorage.getItem("entryGridDataArr").length > 0
      ) {
        //
        entryGridDataArr = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
      }
      const allEntryGridData = [];
      const allData = [];
      const fieldRowArrEn = [];
      for (let i = 0; i < entryGridDataArr[checkChange.gridIndex].length; i++) {
        if (entryGridDataArr[checkChange.gridIndex][i].dataIndex !== undefined) {
          allData.push({
            dataIndex: entryGridDataArr[checkChange.gridIndex][i].dataIndex,
            cc: entryGridDataArr[checkChange.gridIndex][i].cc,
            ddname: entryGridDataArr[checkChange.gridIndex][i].ddname,
          });
          break;
        }
      }
      /** FOR VIEW ID AND DDNAME */
      const ind = checkChange.gridIndex;
      for (let i = 0; i < entryGridDataArr[ind].length; i++) {
        let invalidField = false;
        const hexkey = entryGridDataArr[ind][i].hexkey;
        const isDeleted = entryGridDataArr[ind][i].isDeleted;
        const editForm = entryGridDataArr[ind][i].editForm;
        const field_Columns = [];
        if (entryGridDataArr[ind][i].items !== undefined) {
          for (let m = 0; m < entryGridDataArr[ind][i].items.length; m++) {
            for (let n = 0; n < entryGridDataArr[ind][i].items[m].degColumns.length; n++) {
              if (
                entryGridDataArr[ind][i].items[m].degColumns[n].hasOwnProperty("name") &&
                entryGridDataArr[ind][i].items[m].degColumns[n].name.length !== 0
              ) {
                const field_Column = {
                  name: entryGridDataArr[ind][i].items[m].degColumns[n].name,
                  value: entryGridDataArr[ind][i].items[m].degColumns[n].value,
                  isValid: entryGridDataArr[ind][i].items[m].degColumns[n].isValid,
                };
                field_Columns.push(field_Column);
                if (!entryGridDataArr[ind][i].items[m].degColumns[n].isValid) {
                  invalidField = true;
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
        };
        fieldRowArrEn.push(field_row_value);
      }
      const indArr = allData.length - 1;
      if (allData[indArr] !== undefined && allData[indArr].dataIndex !== null) {
        allEntryGridData.push({
          isNavigate: true,
          gridRefNo: allData[indArr].dataIndex,
          cc: allData[indArr].cc,
          ddname: allData[indArr].ddname,
          rows: fieldRowArrEn,
          type: "entryGridData",
        });
      }
      // FORMAT REQUIRED
      const data_grid = {
        data: [],
      };
      let fieldsValid = true;
      const isInvalid = [];
      if (allEntryGridData.length > 0) {
        for (let i = 0; i < allEntryGridData.length; i++) {
          // FIND INDEX OF INVALID FIELD
          if (allEntryGridData[i].rows.findIndex((x) => x.invalidField == true) >= 0) {
            fieldsValid = false;
            isInvalid.push(fieldsValid);
          }
          data_grid.data[data_grid.data.length] = allEntryGridData[i];
        }
      }
      if (isInvalid.indexOf(false) >= 0) {
        toast(this.invalidMessage, Number(sessionStorage.getItem("toastTimeOut")));
      } else {
        this.editGrid.sendData(this.submitApiGrid, data_grid).subscribe(
          (response: any) => {
            if (response == undefined) {
              return false;
            } else {
              // send data to parent component using entryGrid and call url after submit
              this.handleSubmitEditGrid.emit({
                response: response,
                gridRefNo: "",
                url: url,
              });
            }
          },
          (error) => {
            this.handleError(error);
          }
        );
      }
    } else {
      // let notify: boolean = false;
      this.editGrid.getDetails(url).subscribe(
        (response) => {
          if (response == undefined) {
            return false;
          } else {
            this.handleSubmitEditGrid.emit({
              response: response,
              gridRefNo: gridRefNo,
              url: "",
            });
          }
          this.loader = environment.displayNone;
        },
        (error) => this.handleError(error)
      );
    }
  }

  /////////////////// Change Entry Grid ////////////
  checkEntryGridChange(gridRefNo: any | string) {
    let checkChange = false;
    let gridIndexMainContent = 0;
    let gridIndexChangeContent = 0;
    let mainContent: any;
    let changeContent: any;
    if (sessionStorage.getItem("setEntryGrid") !== undefined && sessionStorage.getItem("setEntryGrid") !== "") {
      mainContent = JSON.parse(sessionStorage.getItem("setEntryGrid"));
    }
    if (sessionStorage.getItem("entryGridDataArr") !== undefined && sessionStorage.getItem("entryGridDataArr") !== "") {
      changeContent = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
    }
    mainContent = mainContent[mainContent.length - 1];
    /** FIND DATA INDEX OF GRID WHERE UPDATE ROW NEED TO BE PERFORMED */
    if (mainContent !== undefined && mainContent.length > 0) {
      for (let i = 0; i < mainContent.length; i++) {
        if (mainContent[i].length > 0) {
          for (let j = 0; j < mainContent[i].length; j++) {
            if (mainContent[i][j].dataIndex == gridRefNo) {
              gridIndexMainContent = i;
              break;
            }
          }
        }
      }
      for (let i = 0; i < changeContent.length; i++) {
        if (changeContent[i].length > 0) {
          for (let j = 0; j < changeContent[i].length; j++) {
            if (changeContent[i][j].dataIndex == gridRefNo) {
              gridIndexChangeContent = i;
              break;
            }
          }
        }
      }
    }
    if (gridIndexMainContent == gridIndexChangeContent) {
      // CHECK IF ANY ELEMENTS IS CHANGED
      const ind = gridIndexChangeContent;
      for (let i = 0; i < mainContent[ind].length; i++) {
        for (let j = 0; j < mainContent[ind][i].items.length; j++) {
          if (
            mainContent[ind][i].items[j].degColumns[0].name !== undefined &&
            mainContent[ind][i].items[j].degColumns[0].name == changeContent[ind][i].items[j].degColumns[0].name
          ) {
            if (mainContent[ind][i].items[j].degColumns[0].value !== changeContent[ind][i].items[j].degColumns[0].value) {
              // CHECK FOR VALUE CHANGE
              checkChange = true;
              break;
            }
          }
        }
      }
    }
    return { checkChange: checkChange, gridIndex: gridIndexChangeContent };
  }

  //////////// Click FUnction /////////////
  onClick(btn: any, dataIndex?: string, head?: any, newRow?: any, dragDrop?: any, editApi?: any) {
    this.getDataGrid = false;
    if (!btn.isEnabled) {
      return;
    }
    if ((btn.action == "Function" || btn.action == "function" || btn.action == "FUNCTION") && btn.onPush == "delete") {
      this.getDelete(btn.hexkey, btn.id, "", btn.dataIndex);
    } else if ((btn.action == "Function" || btn.action == "function" || btn.action == "FUNCTION") && btn.onPush == "addrow") {
      this.addRow(dataIndex, head, newRow, dragDrop, editApi);
    } else if ((btn.action == "Function" || btn.action == "function" || btn.action == "FUNCTION") && btn.onPush == "undelete") {
      this.unDeleteRow(btn.dataIndex);
    } else if (btn.action == "api_call" || btn.action == "upload_save") {
      this.getData(btn.onPush, btn.hexkey, btn.action, btn);
    }
  }

  /////////////// Exit Tab Index Check //////////
  checkIfTabIndexExist(tab) {
    return this.selectTabIndex.indexOf(tab);
  }

  //////////// Custom Focus /////////////////
  customFocus(event) {
    const findIndex = this.selectTabIndex.indexOf(event.target.tabIndex);
    if (findIndex == -1) {
      this.selectTabIndex.push(event.target.tabIndex);
    }
  }

  /////////////// Set Focus //////////////
  setFocus(focus, event?: any, tabindex?) {
    let findIndex: any;
    if (event == "" && tabindex == this.elementToFocus && focus && this.checkIfTabIndexExist(this.elementToFocus) == -1) {
      setTimeout(() => {
        const element = <HTMLInputElement>document.getElementById(JSON.stringify(this.elementToFocus));
        if (element !== null) {
          element.select();
          findIndex = this.selectTabIndex.indexOf(this.elementToFocus);
          if (findIndex == -1) {
            this.selectTabIndex.push(this.elementToFocus);
          }
        }
        return;
      }, 50);
    } else if (
      event !== "" &&
      event !== undefined &&
      event &&
      this.checkIfTabIndexExist(event.target.tabIndex) == -1 &&
      event.target.tabIndex !== this.tabIndexClicked
    ) {
      const currTab = event.target.tabIndex;
      setTimeout(() => {
        const element = <HTMLInputElement>document.getElementById(JSON.stringify(currTab));
        element.select();
        findIndex = this.selectTabIndex.indexOf(currTab);
        if (findIndex == -1) {
          this.selectTabIndex.push(currTab);
        }
        this.tabIndexClicked = currTab;
        return;
      }, 50);
    } else {
      return;
    }
  }

  ///////////////// Appned New Row On CLick Button //////////////
  appendRow(NewRow: any, id: number, idWhennewRowIdisEmpty?: any, gridIndex?: any, dataIndexGrid?: any) {
    let indReplaceRow = 0;
    let hexkey = "";
    let tabindex = 0;
    let Uitem: any[] = [];
    const gridButton = JSON.parse(sessionStorage.getItem("button_grid"));
    const buttonsAction = [];
    for (let i = 0; i < gridButton.buttons.length; i++) {
      if (gridButton.buttons[i].dataIndex == dataIndexGrid) {
        buttonsAction.push(gridButton.buttons[i]);
      }
    }

    const response = {
      buttons: buttonsAction,
    };
    if (
      sessionStorage.getItem("entryGridDataArr") !== undefined &&
      sessionStorage.getItem("entryGridDataArr") !== "" &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== undefined &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== null &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== ""
    ) {
      this.entryGridArr = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
    }
    if (id == undefined) {
      indReplaceRow = this.entryGridArr[gridIndex].findIndex((x) => x.hexkey == idWhennewRowIdisEmpty && x.dataIndex == dataIndexGrid);
    } else if (id !== undefined) {
      indReplaceRow = this.entryGridArr[gridIndex].findIndex((x) => x.id == id && x.dataIndex == dataIndexGrid);
    }
    tabindex = this.entryGridArr[gridIndex][indReplaceRow].items[0].degColumns[0].tabindex;
    const dataIndex = this.entryGridArr[gridIndex][indReplaceRow].items[0].degColumns[0].dataIndex;
    Uitem = this.entryGridArr[gridIndex][indReplaceRow].items;
    this.entryGridArr[gridIndex][indReplaceRow].items = [];
    this.entryGridArr[gridIndex][indReplaceRow].displayGridButton = [];
    for (let j = 0; j < NewRow.data.length; j++) {
      if (NewRow.data[j].type == "pageInit") {
      } else {
        hexkey = NewRow.data[j].hexkey;
        let counterInput = 0;
        let IsDecimal = true;
        if (NewRow.data[j].columns !== undefined) {
          for (let i = 0; i < NewRow.data[j].columns.length; i++) {
            const cols1 = [];
            for (let m = 0; m < NewRow.data[j].columns[i].length; m++) {
              if (NewRow.data[j].columns[i][m].type ? true : false) {
                counterInput++;
              }
              IsDecimal =
                NewRow.data[j].columns[i][m].isDecimal !== undefined && NewRow.data[j].columns[i][m].isDecimal !== ""
                  ? NewRow.data[j].columns[i][m].isDecimal
                  : false;
              const cols12 = {
                name: NewRow.data[j].columns[i][m].name ? NewRow.data[j].columns[i][m].name : "",
                value:
                  NewRow.data[j].columns[i][m].type == "number"
                    ? this.convertToDecimalAppendRow(NewRow.data[j].columns[i][m].numberPipe, NewRow.data[j].columns[i][m].value, IsDecimal)
                    : NewRow.data[j].columns[i][m].value,
                cellclass: NewRow.data[j].columns[i][m].cellclass,
                colspan: NewRow.data[j].columns[i][m].colspan ? NewRow.data[j].columns[i][m].colspan : "",
                rowspan: NewRow.data[j].columns[i][m].rowspan ? NewRow.data[j].columns[i][m].rowspan : "",
                type: NewRow.data[j].columns[i][m].type ? NewRow.data[j].columns[i][m].type : "",
                options: NewRow.data[j].columns[i][m].options,
                inputclass: NewRow.data[j].columns[i][m].inputclass,
                textalign: NewRow.data[j].columns[i][m].textalign,
                maxwidth: NewRow.data[j].columns[i][m].maxwidth,
                max: NewRow.data[j].columns[i][m].max,
                tabindex: Uitem[i].degColumns[0].tabindex,
                id: Uitem[i].degColumns[0].id,
                focus: NewRow.data[j].columns[i][m].type && counterInput == 1 ? true : false,
                numberPipe:
                  NewRow.data[j].columns[i][m].numberPipe !== undefined && NewRow.data[j].columns[i][m].numberPipe !== ""
                    ? NewRow.data[j].columns[i][m].numberPipe
                    : environment.numberPipe,
                step: NewRow.data[j].columns[i][m].step,
                divclass: NewRow.data[j].columns[i][m].divclass,
                readonly: NewRow.data[j].columns[i][m].readonly,
                maxlength: NewRow.data[j].columns[i][m].maxlength,
                size: NewRow.data[j].columns[i][m].size,
                min: NewRow.data[j].columns[i][m].min,
                placeholder: NewRow.data[j].columns[i][m].placeholder,
                pattern: NewRow.data[j].columns[i][m].pattern,
                label: NewRow.data[j].columns[i][m].label ? NewRow.data[j].columns[i][m].label : "",
                hexkey: NewRow.data[j].hexkey,
                required: NewRow.data[j].required !== undefined ? NewRow.data[j].required : false,
                requiredValid: true /** use to make entryGrid columns red color */,
                mControl: NewRow.data[j].columns[i][m].mControl ? NewRow.data[j].columns[i][m].mControl : false,
                dataIndex: dataIndex,
                isValid: true,
                isDecimal: IsDecimal,
                show: NewRow.data[j].columns[i][m].show,
                value1: NewRow.data[j].columns[i][m].value,
              };
              if (NewRow.data[j].columns[i][m].tabindex > 0) {
                tabindex++;
              }
              cols1.push(cols12);
            }
            const degColumn = {
              degColumns: cols1,
            };
            this.entryGridArr[gridIndex][indReplaceRow].items.push(degColumn);
            this.entryGridArr[gridIndex][indReplaceRow].hexkey = hexkey;
          }
        }
      }
    }
    if (response.buttons.length > 0) {
      for (let m = 0; m < response.buttons.length; m++) {
        const btns = {
          canEdit: response.buttons[m].canEdit,
          isEnabled: response.buttons[m].isEnabled,
          action: response.buttons[m].action,
          buttonType: response.buttons[m].buttonType,
          class: response.buttons[m].class,
          icon: response.buttons[m].icon,
          onPush: response.buttons[m].onPush,
          type: response.buttons[m].type,
          hexkey: hexkey,
          id: id,
          dataIndex: dataIndexGrid,
        };
        this.entryGridArr[gridIndex][indReplaceRow].displayGridButton.push(btns);
      }
    }

    //this.itemInquiryBody = this.entryGridArr[gridIndex]; //
    ///  Create function for rebind row 26 April/////
    this.rebindRow(indReplaceRow, gridIndex);
    // niharika

    sessionStorage.setItem("entryGridDataArr", JSON.stringify(this.entryGridArr));
    this.functionCall = false;
    this.elementToFocus = tabindex + 1;
    this.setFocus(true, "", this.elementToFocus);
  }

  ///////// 26 April 2022 create function ///////

  rebindRow(indReplaceRow, gridIndex) {
    for (let i = 0; i < this.itemInquiryBody[indReplaceRow].items.length; i++) {
      for (let j = 0; j < this.entryGridArr[gridIndex][indReplaceRow].items.length; j++) {
        debugger;
        if (this.itemInquiryBody[indReplaceRow].items[i].degColumns[0].id == this.entryGridArr[gridIndex][indReplaceRow].items[j].degColumns[0].id) {
          this.itemInquiryBody[indReplaceRow].items[i].degColumns[0].value = this.entryGridArr[gridIndex][indReplaceRow].items[j].degColumns[0].value;
          this.itemInquiryBody[indReplaceRow].items[i].degColumns[0].value1 =
            this.entryGridArr[gridIndex][indReplaceRow].items[j].degColumns[0].value1;
          this.itemInquiryBody[indReplaceRow].items[i].degColumns[0].show = this.entryGridArr[gridIndex][indReplaceRow].items[j].degColumns[0].show;
        }
      }
    }
  }

  /** TO UPDATE GRID IN CASE OF rowGridUpdate TYPE */
  updateRow(NewRow: any, id: number, idWhennewRowIdisEmpty?: any, gridRefNumberToUse?: any, getData?: any, tabIndex?: number) {
    // tabIndex is used to bind response of radio group

    let indReplaceRow = 0;
    const buttons: any[] = [];
    let IsDecimal: boolean;
    let tabindexfocus: number = 0;
    let isValid: any;
    const response_button = JSON.parse(sessionStorage.getItem("button_response"));
    buttons.push(response_button);
    let gridIndex = 0;
    if (
      sessionStorage.getItem("entryGridDataArr") !== undefined &&
      sessionStorage.getItem("entryGridDataArr") !== "" &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== undefined &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== null &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== ""
    ) {
      this.entryGridArr = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
    }
    /** FIND DATA INDEX OF GRID WHERE UPDATE ROW NEED TO BE PERFORMED */
    const findgridRef = JSON.parse(sessionStorage.getItem("gridRefNumber"));
    gridIndex = findgridRef.indexOf(gridRefNumberToUse);
    if (id == undefined) {
      indReplaceRow = this.entryGridArr[gridIndex].findIndex((x) => x.hexkey == idWhennewRowIdisEmpty);
    } else {
      indReplaceRow = this.entryGridArr[gridIndex].findIndex((x) => x.id == id);
    }
    for (let m = 0; m < NewRow.data.length; m++) {
      if (NewRow.data[m].type == "pageInit") {
      } else if (NewRow.data[m].type == "rowGridUpdate") {
        tabindexfocus = NewRow.data[m].tabindexfocus;
        isValid = NewRow.data[m].isValid;
        for (let j = 0; j < this.entryGridArr[gridIndex][indReplaceRow].items.length; j++) {
          for (let n = 0; n < NewRow.data[m].columns.length; n++) {
            IsDecimal =
              NewRow.data[m].columns[n].isDecimal !== undefined && NewRow.data[m].columns[n].isDecimal !== ""
                ? NewRow.data[m].columns[n].isDecimal
                : false;
            if (this.entryGridArr[gridIndex][indReplaceRow].items[j].degColumns[0].name == NewRow.data[m].columns[n].name) {
              this.entryGridArr[gridIndex][indReplaceRow].items[j].degColumns[0].value =
                NewRow.data[m].columns[n].type == "number"
                  ? this.convertToDecimalAppendRow(NewRow.data[m].columns[n].numberPipe, NewRow.data[m].columns[n].value, IsDecimal)
                  : NewRow.data[m].columns[n].show !== undefined &&
                    NewRow.data[m].columns[n].show !== "" &&
                    this.entryGridArr[gridIndex][indReplaceRow].items[j].degColumns[0].type == "search"
                  ? NewRow.data[m].columns[n].show
                  : NewRow.data[m].columns[n].show;
              this.entryGridArr[gridIndex][indReplaceRow].items[j].degColumns[0].value1 = NewRow.data[m].columns[n].value;
              this.entryGridArr[gridIndex][indReplaceRow].items[j].degColumns[0].show = NewRow.data[m].columns[n].show;
              if (NewRow.data[m].columns[n].readonly !== undefined) {
                this.entryGridArr[gridIndex][indReplaceRow].items[j].degColumns[0].readonly = NewRow.data[m].columns[n].readonly;
              }
            }
          }
        }
      }
    }

    // this.itemInquiryBody = this.entryGridArr[gridIndex];
    for (let i = 0; i < this.itemInquiryBody[indReplaceRow].items.length; i++) {
      for (let j = 0; j < this.entryGridArr[gridIndex][indReplaceRow].items.length; j++) {
        if (
          this.itemInquiryBody[indReplaceRow].hexkey == this.entryGridArr[gridIndex][indReplaceRow].hexkey &&
          this.itemInquiryBody[indReplaceRow].id == this.entryGridArr[gridIndex][indReplaceRow].id &&
          this.itemInquiryBody[indReplaceRow].items[i].degColumns[0].name == this.entryGridArr[gridIndex][indReplaceRow].items[j].degColumns[0].name
        ) {
          this.itemInquiryBody[indReplaceRow].items[i].degColumns[0].value = this.entryGridArr[gridIndex][indReplaceRow].items[j].degColumns[0].value;
          this.itemInquiryBody[indReplaceRow].items[i].degColumns[0].value1 =
            this.entryGridArr[gridIndex][indReplaceRow].items[j].degColumns[0].value1;
          this.itemInquiryBody[indReplaceRow].items[i].degColumns[0].show = this.entryGridArr[gridIndex][indReplaceRow].items[j].degColumns[0].show;
        }
      }
    }
    // TO SAVE DATA BY CLICKING SAVE BUTTON
    sessionStorage.setItem("entryGridDataArr", JSON.stringify(this.entryGridArr));
    this.setFocusOnElement({ hexkey: idWhennewRowIdisEmpty, ids: id }, tabindexfocus, gridIndex, !isValid, true);
  }

  /* When row is clicked in displayGrid */
  getData(api, hexkey, action?, btn?, dataIndex?) {
    if (this.getDataGrid) {
      return false;
    }
    this.getDataGrid = true;
    let apiEdit = "";
    let hexkeyData = "";
    this.entryGrid = false;
    this.entryGridUpdate = false;
    let gridIndex = 0;

    if (api.url !== undefined) {
      apiEdit = api.url;
    } else {
      apiEdit = api;
    }
    if (api.hexKey !== undefined) {
      hexkeyData = api.hexKey;
    } else {
      hexkeyData = hexkey;
    }
    let EDTGData: any;
    if (action == "upload_save") {
      const obj = document.getElementById(action);
      this.editGridPopUp = environment.displayNone;
      this.handleDialog.emit({
        api: apiEdit,
        position: obj.offsetTop,
        viewId: btn.viewId,
        ddname: btn.ddname,
        cc: btn.cc,
      });
      return false;
    }
    /** FIND DATA INDEX OF GRID WHERE UPDATE ROW NEED TO BE PERFORMED */
    if (btn !== undefined && btn.length > 0) {
      const findgridRef = JSON.parse(sessionStorage.getItem("gridRefNumber"));
      gridIndex = findgridRef.indexOf(btn.dataIndex);
    } else if (dataIndex !== undefined && dataIndex !== null && dataIndex !== "" && dataIndex.length > 0) {
      const findgridRef = JSON.parse(sessionStorage.getItem("gridRefNumber"));
      gridIndex = findgridRef.indexOf(dataIndex);
    } else if (btn == "" && dataIndex == null) {
    }
    if (btn.buttonType == "submit") {
      // MAKING A POST REQUEST
      if (
        sessionStorage.getItem("entryGridDataArr") !== undefined &&
        sessionStorage.getItem("entryGridDataArr") !== "" &&
        JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== undefined &&
        JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== null &&
        JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== ""
      ) {
        this.entryGridArr = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
      }

      const findgridRef = JSON.parse(sessionStorage.getItem("gridRefNumber"));
      gridIndex = findgridRef.indexOf(btn.dataIndex);

      // use hexkey and row id
      sessionStorage.setItem("btnHexId", JSON.stringify(btn));

      sessionStorage.setItem("id_popup", JSON.stringify({ popUp_id: "close" }));
      ///////25jan/////

      this.sendPostData(this.entryGridArr[gridIndex], apiEdit, hexkey, gridIndex, btn.id);
      return false;
    }
    if (action == "api_call") {
      EDTGData = btn;
      // use hexkey and row id
      sessionStorage.setItem("btnHexId", JSON.stringify(btn));

      sessionStorage.setItem("id_popup", JSON.stringify({ popUp_id: "close" }));
    } else {
      EDTGData = JSON.parse(sessionStorage.getItem("EDTGData"));
    }

    if (api.closeOnRowSelect !== undefined && JSON.parse(api.closeOnRowSelect)) {
      this.editGridPopUp = environment.displayNone;
    }

    this.handleShowBusy(apiEdit);

    this.editGrid.getDetailsByhexkey(apiEdit, hexkeyData, EDTGData.id).subscribe(
      (response) => {
        this.loader = environment.displayNone;
        this.showBusyText = "";
        if (response == null) {
          this.getDelete("", EDTGData.ids);
          return false;
        } else {
          /** DATA TO  SHOW IN POPUP */

          this.editGridButton = [];
          let formResponse = response;
          this.getDataGrid = false;
          for (let k = 0; k < formResponse.data.length; k++) {
            if (formResponse.data[k].type == "pageInit") {
            } else if (formResponse.data[k].type == "popup") {
              this.gridPopupTitle = formResponse.data[k].title;
              this.showClose = formResponse.data[k].showClose;
              this.popup_width = formResponse.data[k].width;
              this.popup_zindex = formResponse.data[k].zindex;
              this.popupMaxHeight = formResponse.data[k].maxHeight;
              this.popup_top = formResponse.data[k].top;
              this.editGridPopUp = environment.displayBlock;
            } else if (formResponse.data[k].type == "form") {
              const btnHex = JSON.parse(sessionStorage.getItem("btnHexId"));

              const rowInd = this.itemInquiryBody.findIndex((x) => x.hexkey == btnHex.hexkey);
              if (this.itemInquiryBody[rowInd].editForm !== undefined) {
                for (let q = 0; q < this.itemInquiryBody[rowInd].editForm.length; q++) {
                  for (let m = 0; m < formResponse.data[k].divs.length; m++) {
                    if (formResponse.data[k].divs[m].fields !== undefined) {
                      for (let n = 0; n < formResponse.data[k].divs[m].fields.length; n++) {
                        if (formResponse.data[k].divs[m].fields[n].name == this.itemInquiryBody[rowInd].editForm[q].name) {
                          formResponse.data[k].divs[m].fields[n].value = this.itemInquiryBody[rowInd].editForm[q].value;
                        }
                      }
                    }
                  }
                }
                this.responseDtForm = formResponse;
              } else {
                this.responseDtForm = formResponse;
              }
            } else if (formResponse.data[k].type == "entryGrid") {
              this.entryGrid = true;
            } else if (formResponse.data[k].type == "button") {
              this.editGridButton.push(formResponse.data[k]);
            } else if (formResponse.data[k].type == "rowGridUpdate") {
              this.editGridPopUp = environment.displayNone;

              this.updateRow(formResponse, EDTGData.ids, EDTGData.hexkey, this.gridRefNumberToUse, true);
            } else if (formResponse.data[k].type == "newGridRow") {
              this.editGridPopUp = environment.displayNone;
              this.appendRow(formResponse, EDTGData.ids, EDTGData.hexkey, gridIndex, dataIndex);
            } else if (formResponse.data[k].type == "notify") {
              if (formResponse.data[k].redirectUrl != undefined && formResponse.data[k].redirectUrl) {
                window.location.href = formResponse.data[k].redirectUrl;
                return;
              }
              this.handleNotify(formResponse.data[k]);
            }
            this.getDataGrid = false;
          }
        }
      },
      (error) => this.handleError(error)
    );

    sessionStorage.setItem("hexkey", hexkeyData);
  }

  /* handle blank row edit form */
  /*
  showEditFormData(api, action?, btn?, dataIndex?)
  {
   let response = {"data": [
      {
          "clearPage": false,
          "type": "pageInit"
      },
      {
          "top": "20px",
          "showClose": true,
          "maxHeight": "fit-content",
          "width": "98%",
          "action": "routing",
          "type": "popup",
          "title": "Contact Properties",
          "onCloseRedirect": "retainState"
      },
      {
          "isExpanded": false,
          "cc": "DS",
          "formSubmit": true,
          "tabindex": 32000,
          "type": "form",
          "title": "Customer Contact",
          "divs": [
              {
                  "divclass": "row",
                  "fields": [
                      {
                          "divclass": "input-field col s4",
                          "size": 30,
                          "inputclass": "Validate",
                          "tabindex": 32001,
                          "labelclass": "active",
                          "name": "name",
                          "focus": true,
                          "label": "Name",
                          "type": "text",
                          "value": ""
                      },
                      {
                          "divclass": "input-field col s3",
                          "size": 25,
                          "inputclass": "Validate",
                          "tabindex": 32002,
                          "labelclass": "active",
                          "name": "dept",
                          "label": "Department/Title",
                          "type": "text",
                          "value": ""
                      }
                  ]
              },
              {
                  "divclass": "row",
                  "fields": [{
                      "showBusyIndicator": false,
                      "divclass": "input-field col s5",
                      "includeAllFields": false,
                      "size": 45,
                      "inputclass": "Validate",
                      "tabindex": 32003,
                      "labelclass": "active",
                      "name": "email",
                      "label": "Email Address",
                      "type": "text",
                      "onChangeApi": "/dt/emailAddress/validate",
                      "value": ""
                  }]
              },
              {
                  "divclass": "row",
                  "fields": [
                      {
                          "divclass": "input-field col s3",
                          "size": 21,
                          "inputclass": "Validate",
                          "tabindex": 32004,
                          "labelclass": "active",
                          "name": "phone__1",
                          "index": 1,
                          "label": "Telephone# [1]",
                          "type": "text",
                          "value": ""
                      },
                      {
                          "divclass": "input-field col s2",
                          "inputclass": "Validate",
                          "tabindex": 32005,
                          "labelclass": "active",
                          "name": "type__1",
                          "show": "Night",
                          "options": [
                              {
                                  "show": "",
                                  "value": ""
                              },
                              {
                                  "show": "Work",
                                  "value": "W"
                              },
                              {
                                  "show": "Direct",
                                  "value": "D"
                              },
                              {
                                  "show": "Mobile",
                                  "value": "M"
                              },
                              {
                                  "show": "Home",
                                  "value": "H"
                              },
                              {
                                  "show": "Night",
                                  "value": "N",
                                  "selected": true
                              },
                              {
                                  "show": "Fax",
                                  "value": "F"
                              }
                          ],
                          "index": 1,
                          "label": "Type [1]",
                          "type": "select",
                          "value": "N"
                      },
                      {
                          "divclass": "input-field col s1",
                          "size": 5,
                          "inputclass": "Validate",
                          "tabindex": 32006,
                          "labelclass": "active",
                          "name": "ext",
                          "label": "Extension",
                          "type": "text",
                          "value": ""
                      }
                  ]
              },
              {
                  "divclass": "row",
                  "fields": [
                      {
                          "divclass": "input-field col s3",
                          "size": 21,
                          "inputclass": "Validate",
                          "tabindex": 32007,
                          "name": "phone__2",
                          "index": 2,
                          "label": "Telephone# [2]",
                          "type": "text",
                          "value": ""
                      },
                      {
                          "divclass": "input-field col s2",
                          "inputclass": "Validate",
                          "tabindex": 32008,
                          "labelclass": "active",
                          "name": "type__2",
                          "options": [
                              {
                                  "show": "",
                                  "value": "",
                                  "selected": true
                              },
                              {
                                  "show": "Work",
                                  "value": "W"
                              },
                              {
                                  "show": "Direct",
                                  "value": "D"
                              },
                              {
                                  "show": "Mobile",
                                  "value": "M"
                              },
                              {
                                  "show": "Home",
                                  "value": "H"
                              },
                              {
                                  "show": "Night",
                                  "value": "N"
                              },
                              {
                                  "show": "Fax",
                                  "value": "F"
                              }
                          ],
                          "show": "",
                          "index": 2,
                          "label": "Type [2]",
                          "type": "select",
                          "value": " "
                      }
                  ]
              },
              {
                  "divclass": "row",
                  "fields": [
                      {
                          "divclass": "input-field col s3",
                          "size": 21,
                          "inputclass": "Validate",
                          "tabindex": 32009,
                          "name": "phone__3",
                          "index": 3,
                          "label": "Telephone# [3]",
                          "type": "text",
                          "value": ""
                      },
                      {
                          "divclass": "input-field col s2",
                          "inputclass": "Validate",
                          "tabindex": 32010,
                          "labelclass": "active",
                          "name": "type__3",
                          "options": [
                              {
                                  "show": "",
                                  "value": "",
                                  "selected": true
                              },
                              {
                                  "show": "Work",
                                  "value": "W"
                              },
                              {
                                  "show": "Direct",
                                  "value": "D"
                              },
                              {
                                  "show": "Mobile",
                                  "value": "M"
                              },
                              {
                                  "show": "Home",
                                  "value": "H"
                              },
                              {
                                  "show": "Night",
                                  "value": "N"
                              },
                              {
                                  "show": "Fax",
                                  "value": "F"
                              }
                          ],
                          "show": "",
                          "index": 3,
                          "label": "Type [3]",
                          "type": "select",
                          "value": " "
                      }
                  ]
              },
              {
                  "divclass": "row",
                  "fields": [
                      {
                          "divclass": "input-field col s3",
                          "size": 21,
                          "inputclass": "Validate",
                          "tabindex": 32011,
                          "name": "phone__4",
                          "index": 4,
                          "label": "Telephone# [4]",
                          "type": "text",
                          "value": ""
                      },
                      {
                          "divclass": "input-field col s2",
                          "inputclass": "Validate",
                          "tabindex": 32012,
                          "labelclass": "active",
                          "name": "type__4",
                          "options": [
                              {
                                  "show": "",
                                  "value": "",
                                  "selected": true
                              },
                              {
                                  "show": "Work",
                                  "value": "W"
                              },
                              {
                                  "show": "Direct",
                                  "value": "D"
                              },
                              {
                                  "show": "Mobile",
                                  "value": "M"
                              },
                              {
                                  "show": "Home",
                                  "value": "H"
                              },
                              {
                                  "show": "Night",
                                  "value": "N"
                              },
                              {
                                  "show": "Fax",
                                  "value": "F"
                              }
                          ],
                          "show": "",
                          "index": 4,
                          "label": "Type [4]",
                          "type": "select",
                          "value": " "
                      },
                      {
                          "divclass": "input-field col s4",
                          "size": 30,
                          "inputclass": "Validate",
                          "tabindex": 32013,
                          "labelclass": "active",
                          "name": "othname",
                          "label": "Dear Name",
                          "type": "text",
                          "value": "Chetu"
                      },
                      {
                          "divclass": "input-field col s2",
                          "size": 1,
                          "inputclass": "Validate",
                          "tabindex": 32014,
                          "name": "selcode",
                          "label": "Selection Code",
                          "type": "text",
                          "value": ""
                      }
                  ]
              }
          ],
          "ddname": "CM03",
          "viewid": "B",
          "enterKeySubmits": false,
          "width": "100%",
          "hexkey": "20202020204A0E",
          "controlNumber": 32
      },
      {
          "buttons": [
              {
                  "buttonType": "cancel",
                  "showMenu": false,
                  "onPush": "retainState",
                  "isEnabled": true,
                  "tabindex": 32750,
                  "icon": "far fa-times-circle",
                  "action": "routing",
                  "text": "Cancel",
                  "class": "DTButton-red",
                  "disableOnClick": true,
                  "closePopup": true
              },
              {
                  "buttonType": "submit",
                  "invalidMessage": "Correct red fields before saving",
                  "onPush": "",
                  "isEnabled": true,
                  "tabindex": 32749,
                  "icon": "far fa-arrow-alt-circle-right",
                  "text": "Save",
                  "class": "DTButton-green",
                  "disableOnClick": true
              }
          ],
          "type": "buttons"
      }
  ]}
    this.editGridButton = [];
    const formResponse = response;
    this.getDataGrid = false;
    for (let k = 0; k < formResponse.data.length; k++) {

      if (formResponse.data[k].type == 'pageInit') {

      } else if (formResponse.data[k].type == 'popup') {
        this.gridPopupTitle = formResponse.data[k].title;
       // this.showClose = formResponse.data[k].showClose;
        this.popup_width = formResponse.data[k].width;
      //  this.popup_zindex = formResponse.data[k].zindex;
        this.popupMaxHeight = formResponse.data[k].maxHeight;
        this.popup_top = formResponse.data[k].top;
        this.editGridPopUp = environment.displayBlock;
      } else if (formResponse.data[k].type == 'form') {

        const btnHex = JSON.parse(sessionStorage.getItem('btnHexId'));

        const rowInd = this.itemInquiryBody.findIndex(x => x.hexkey == btnHex.hexkey);
        if (this.itemInquiryBody[rowInd].editForm !== undefined) {

          for (let q = 0; q < this.itemInquiryBody[rowInd].editForm.length; q++) {

            for (let m = 0; m < formResponse.data[k].divs.length; m++) {

              if (formResponse.data[k].divs[m].fields !== undefined) {
                for (let n = 0; n < formResponse.data[k].divs[m].fields.length; n++) {

                  if (formResponse.data[k].divs[m].fields[n].name == this.itemInquiryBody[rowInd].editForm[q].name) {

                    formResponse.data[k].divs[m].fields[n].value = this.itemInquiryBody[rowInd].editForm[q].value;
                  }


                }
              }


            }
          }
          this.responseDtForm = formResponse;
        } else {

          this.responseDtForm = formResponse;
        }

      } else if (formResponse.data[k].type == 'entryGrid') {
        this.entryGrid = true;
      } else if (formResponse.data[k].type == 'button') {
        this.editGridButton.push(formResponse.data[k]);

      } else if (formResponse.data[k].type == 'rowGridUpdate') {
        this.editGridPopUp = environment.displayNone;

     //   this.updateRow(formResponse, EDTGData.ids, EDTGData.hexkey, this.gridRefNumberToUse, true);

      } else if (formResponse.data[k].type == 'newGridRow') {

        this.editGridPopUp = environment.displayNone;
    //    this.appendRow(formResponse, EDTGData.ids, EDTGData.hexkey, gridIndex, dataIndex);

      } else if (formResponse.data[k].type == 'notify') {

        this.handleNotify(formResponse.data[k]);
      }
      this.getDataGrid = false;
    }
  }
  8*/

  sendPostData(entryGridDataArr: any, submitApi: string, hexkeyRow?: string, gridIndex?: string | any, Id?) {
    this.currentGridIndex = gridIndex;
    const fieldRowArrEn = [];
    let hexkey: any;
    let isDeleted: boolean;
    const field_Columns = [];
    let gridRefNo: any;
    let cc: string;
    let ddname: string;
    const allEntryGridData = [];

    /** FIND INDEX OF PARTICULAR ROW */
    const indexRow = entryGridDataArr.findIndex((x) => x.id == Id);
    this.editRowNextInd = indexRow + 1;

    hexkey = entryGridDataArr[indexRow].hexkey;
    isDeleted = entryGridDataArr[indexRow].isDeleted;
    gridRefNo = entryGridDataArr[indexRow].dataIndex;
    cc = entryGridDataArr[indexRow].cc;
    ddname = entryGridDataArr[indexRow].ddname;
    for (let m = 0; m < entryGridDataArr[indexRow].items.length; m++) {
      for (let n = 0; n < entryGridDataArr[indexRow].items[m].degColumns.length; n++) {
        if (
          entryGridDataArr[indexRow].items[m].degColumns[n].hasOwnProperty("name") &&
          entryGridDataArr[indexRow].items[m].degColumns[n].name.length !== 0
        ) {
          const field_Column = {
            name: entryGridDataArr[indexRow].items[m].degColumns[n].name,
            value: entryGridDataArr[indexRow].items[m].degColumns[n].value,
            value1: entryGridDataArr[indexRow].items[m].degColumns[n].value,
          };
          field_Columns.push(field_Column);
        }
      }
    }

    const field_row_value = {
      fields: field_Columns, // field_row
      hexkey: hexkey,
      isDeleted: isDeleted,
    };

    fieldRowArrEn.push(field_row_value);

    allEntryGridData.push({
      gridRefNo: gridRefNo,
      cc: cc,
      ddname: ddname,
      rows: fieldRowArrEn,
      type: "entryGridData",
    });

    // FORMAT REQUIRED
    const data_grid = {
      data: [],
    };

    if (allEntryGridData.length > 0) {
      for (let i = 0; i < allEntryGridData.length; i++) {
        data_grid.data[data_grid.data.length] = allEntryGridData[i];
      }
    }

    this.editGrid.sendData(submitApi, data_grid).subscribe(
      (formResponse: any) => {
        this.loader = environment.displayNone;
        if (formResponse == null) {
          return false;
        } else {
          for (let k = 0; k < formResponse.data.length; k++) {
            if (formResponse.data[k].type == "pageInit") {
            } else if (formResponse.data[k].type == "popup") {
              this.gridPopupTitle = formResponse.data[k].title;
              this.showClose = formResponse.data[k].showClose;
              this.popup_width = formResponse.data[k].width;
              this.popup_zindex = formResponse.data[k].zindex;
              this.popupMaxHeight = formResponse.data[k].maxHeight;
              this.popup_top = formResponse.data[k].top;
              this.editGridPopUp = environment.displayBlock;
            } else if (formResponse.data[k].type == "form") {
              const rowInd = this.itemInquiryBody.findIndex((x) => x.id == Id);

              if (this.itemInquiryBody[rowInd].editForm !== undefined) {
                for (let q = 0; q < this.itemInquiryBody[rowInd].editForm.length; q++) {
                  for (let m = 0; m < formResponse.data[k].divs.length; m++) {
                    if (formResponse.data[k].divs[m].fields !== undefined) {
                      for (let n = 0; n < formResponse.data[k].divs[m].fields.length; n++) {
                        if (formResponse.data[k].divs[m].fields[n].name == this.itemInquiryBody[rowInd].editForm[q].name) {
                          formResponse.data[k].divs[m].fields[n].value = this.itemInquiryBody[rowInd].editForm[q].value;
                        }
                      }
                    }
                  }
                }
                this.responseDtForm = formResponse;
              } else {
                this.responseDtForm = formResponse;
              }
              sessionStorage.setItem("formStateOld", JSON.stringify(this.responseDtForm));
            } else if (formResponse.data[k].type == "button") {
              this.editGridButton.push(formResponse.data[k]);
            } else if (formResponse.data[k].type == "notify") {
              this.handleNotify(formResponse.data[k]);
            } else if (formResponse.data[k].type == "entryGrid") {
              this.responseEditGrid = formResponse.data[k];
            }
          }
        }
      },
      (error) => this.handleError(error)
    );
  }

  OnChangeAPiData(onChangeApi: string, value: any, name: string, degColumn: any) {
    let api;
    let name_param;
    this.callAppend = false;
    let valueToSend: any;
    this.navigatinresponse = "";
    let setFocusByTabindex: any;
    let rowGridUpdate = false;
    this.getDataGrid = false;
    /** WHEN CLICK ON IMPORT ITEMS AND CLICK ON ANY ROW AND SEARCH FOR 1 WE GET DISPLAYGRID */
    this.gridRefNumberToUse = degColumn.dataIndex;

    if (degColumn.type == "search" && degColumn.value == degColumn.show) {
      // SET FOCUS ON NEXT ELEMENT
      this.setFocusOnElement(degColumn, 0);
    }
    if (degColumn.type == "search") {
      valueToSend = degColumn.value == degColumn.show ? degColumn.value1 : degColumn.value;
    } else if (degColumn.type == "radio") {
      valueToSend = degColumn.value1;
    } else if (degColumn.type == "checkbox") {
      valueToSend = value;
    } else if (degColumn.type == "time") {
      valueToSend = value;
      // degColumn.show = value;
      degColumn.value = value;
    } else {
      valueToSend = degColumn.value;
    }

    if (this.functionCall) {
      return false;
    }

    this.handleShowBusy(onChangeApi);

    if (onChangeApi.trim() == "") {
      api = onChangeApi;
    } else {
      if (onChangeApi.includes("?")) {
        name_param = "&name=";
      } else {
        name_param = "?name=";
      }

      api =
        onChangeApi +
        name_param +
        encodeURIComponent(name) +
        "&value=" +
        encodeURIComponent(valueToSend) +
        "&tabindex=" +
        encodeURIComponent(degColumn.id) +
        "&hexkey=" +
        encodeURIComponent(degColumn.hexkey) +
        "&isBackward=" +
        encodeURIComponent(this.isShiftTab);
    }
    let gIndex = 0;
    if (degColumn.dataIndex !== undefined) {
      for (let i = 0; i < this.entryGridArr.length; i++) {
        if (this.entryGridArr[i][0].dataIndex !== undefined && this.entryGridArr[i][0].dataIndex == degColumn.dataIndex) {
          gIndex = i;
          break;
        }
      }
    }
    /** CODE TO SEPERATE GETDATA METHOD FOR HANDLING DISPLAYGRID CLICK EVENT AND REPLACING SEARCH ROW WITH NEW ROW */
    sessionStorage.setItem("EDTGData", JSON.stringify(degColumn));

    if (degColumn.type !== "radio" || (degColumn.type == "radio" && degColumn.value1 !== "")) {
      this.editGrid.onChangeApi(api).subscribe(
        (response) => {
          this.loader = environment.displayNone;
          this.showBusyText = "";

          if (response == null) {
            return false;
          } else {
            /** DATA TO SHOW IN POPUP */

            this.editGridButton = [];
            const formResponse = response;
            let newRowId: any;
            let newRow: any;
            for (let k = 0; k < formResponse.data.length; k++) {
              if (formResponse.data[k].type == "popup") {
                this.gridPopupTitle = formResponse.data[k].title;
                this.showClose = formResponse.data[k].showClose;
                this.popup_width = formResponse.data[k].width;
                this.popup_zindex = formResponse.data[k].zindex;
                this.popup_top = formResponse.data[k].top;
                this.popupMaxHeight = formResponse.data[k].maxHeight;
                this.editGridPopUp = environment.displayBlock;
              } else if (formResponse.data[k].type == "displayGrid") {
                this.displaySubGridresp = formResponse.data[k];
                this.callAppend = true;
                if (formResponse.data[k].navigation !== undefined) {
                  this.navigationcss = environment.displayBlock;
                  this.navigatinresponse = formResponse.data[k].navigation;
                } else {
                  this.navigationcss = environment.displayNone;
                }
              } else if (formResponse.data[k].type == "form") {
                this.responseDtForm = formResponse;
              } else if (formResponse.data[k].type == "newGridRow") {
                const newRowId = JSON.parse(sessionStorage.getItem("EDTGData"));

                this.appendRow(formResponse, newRowId.ids, degColumn.hexkey, gIndex, degColumn.dataIndex);

                this.editGridPopUp = environment.displayNone;
              } else if (formResponse.data[k].type == "rowGridUpdate") {
                rowGridUpdate = true;
                // SET FOCUS ACCORDING TO TABINDEXFOCUS PROPERTY

                if (
                  formResponse.data[k].tabindexfocus !== undefined &&
                  formResponse.data[k].tabindexfocus > 0 &&
                  (degColumn.id == formResponse.data[k].tabindexfocus || formResponse.data[k].tabindexfocus == Number(degColumn.id) + 1)
                ) {
                  setFocusByTabindex = {
                    setFocus: true,
                    tabindexfocus: formResponse.data[k].tabindexfocus,
                    isValid: formResponse.data[k].isValid,
                    setisValidForOtherElement: false,
                  };
                  if (formResponse.data[k].tabindexfocus == Number(degColumn.id) + 1) {
                    setFocusByTabindex.setisValidForOtherElement = true;
                  }
                }
                newRowId = JSON.parse(sessionStorage.getItem("EDTGData"));
                this.editGridPopUp = environment.displayNone;
                newRow = newRowId !== undefined ? newRowId.ids : undefined;
                this.elementToFocus = formResponse.data[k].tabindexfocus;
              } else if (formResponse.data[k].type == "button") {
                this.editGridButton.push(formResponse.data[k]);
              } else if (formResponse.data[k].type == "notify") {
                // SET FOCUS ACCORDING TO TABINDEXFOCUS PROPERTY

                this.handleNotify(formResponse.data[k]);
              }
            }
            // removed 10 feb
            // rowGridUpdate && setFocusByTabindex !== undefined && setFocusByTabindex.setFocus
            if (rowGridUpdate) {
              if (
                sessionStorage.getItem("entryGridDataArr") !== undefined &&
                sessionStorage.getItem("entryGridDataArr") !== "" &&
                JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== undefined &&
                JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== null &&
                JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== ""
              ) {
                this.entryGridArr = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
              }

              let ind = 0;
              // FIND ROW OF RESPECTIVE ENTRYGRID
              if (setFocusByTabindex !== undefined && setFocusByTabindex.tabindexfocus !== undefined && setFocusByTabindex.setFocus) {
                for (let i = 0; i < this.entryGridArr[gIndex].length; i++) {
                  if (
                    this.entryGridArr[gIndex][i].hexkey !== undefined &&
                    this.entryGridArr[gIndex][i].hexkey !== "" &&
                    this.entryGridArr[gIndex][i].hexkey == degColumn.hexkey
                  ) {
                    ind = i;
                  } else if (
                    (this.entryGridArr[gIndex][i].hexkey == undefined || this.entryGridArr[gIndex][i].hexkey == "") &&
                    this.entryGridArr[gIndex][i].id == degColumn.ids
                  ) {
                    ind = i;
                  }
                }
              }
              if (setFocusByTabindex !== undefined && setFocusByTabindex.tabindexfocus !== undefined && setFocusByTabindex.setFocus) {
                for (let i = 0; i < this.entryGridArr[gIndex][ind].items.length; i++) {
                  for (let j = 0; j < this.entryGridArr[gIndex][ind].items[i].degColumns.length; j++) {
                    // setisValidForOtherElement
                    if (
                      this.entryGridArr[gIndex][ind].items[i].degColumns[j].id == setFocusByTabindex.tabindexfocus &&
                      !setFocusByTabindex.setisValidForOtherElement
                    ) {
                      this.entryGridArr[gIndex][ind].items[i].degColumns[j].isValid = setFocusByTabindex.isValid;
                      break;
                    } else if (
                      setFocusByTabindex.setisValidForOtherElement &&
                      this.entryGridArr[gIndex][ind].items[i].degColumns[j].id == Number(setFocusByTabindex.tabindexfocus) - 1
                    ) {
                      this.entryGridArr[gIndex][ind].items[i].degColumns[j].isValid = setFocusByTabindex.isValid;
                      break;
                    }
                  }
                }

                // this.itemInquiryBody = this.entryGridArr[gIndex];
                sessionStorage.setItem("entryGridDataArr", JSON.stringify(this.entryGridArr));
                this.updateRow(formResponse, newRow, degColumn.hexkey, this.gridRefNumberToUse);
              } else {
                this.updateRow(formResponse, newRow, degColumn.hexkey, this.gridRefNumberToUse);
              }
            }
          }
        },
        (error) => this.handleError(error)
      );
    } else {
      this.loader = environment.displayNone;
    }
  }

  ////////// Set Focus a Element //////////
  setFocusOnElement(degColumn?: any, tabindexfocus: number = 0, gIndex?: string | any, dateInvalid?: any, updateRow: any = false) {
    let ind = 0;
    let selectFocus: boolean = false;
    // let elementFocusToset: number = 0;
    if (tabindexfocus == 0 && gIndex !== undefined) {
      if (degColumn.type !== undefined && degColumn.type == "date") {
        return;
      }
      const tabindex = degColumn.tabindex;
      for (let i = 0; i < this.entryGridArr[gIndex].length; i++) {
        if (
          this.entryGridArr[gIndex][i].hexkey !== undefined &&
          this.entryGridArr[gIndex][i].hexkey !== "" &&
          this.entryGridArr[gIndex][i].hexkey == degColumn.hexkey
        ) {
          ind = i;
        } else if (
          (this.entryGridArr[gIndex][i].hexkey == undefined || this.entryGridArr[gIndex][i].hexkey == "") &&
          this.entryGridArr[gIndex][i].id == degColumn.ids
        ) {
          ind = i;
        }
      }
      for (let i = 0; i < this.entryGridArr[gIndex][ind].items.length; i++) {
        for (let j = 0; j < this.entryGridArr[gIndex][ind].items[i].degColumns.length; j++) {
          if (
            this.entryGridArr[gIndex][ind].items[i].degColumns !== undefined &&
            this.entryGridArr[gIndex][ind].items[i].degColumns[j] !== undefined
          ) {
            this.entryGridArr[gIndex][ind].items[i].degColumns[j].focus = false;
          }
        }
      }

      for (let i = 0; i < this.entryGridArr[gIndex][ind].items.length; i++) {
        for (let j = 0; j < this.entryGridArr[gIndex][ind].items[i].degColumns.length; j++) {
          // setisValidForOtherElement
          if (!selectFocus && this.entryGridArr[gIndex][ind].items[i].degColumns[j].id == tabindex + 1) {
            this.entryGridArr[gIndex][ind].items[i].degColumns[j].focus = true;
            // this.entryGridArr[gIndex][ind].items[i].degColumns[j].select();
            selectFocus = true;
            break;
          }
        }
      }
      this.itemInquiryBody = this.entryGridArr[gIndex];
      sessionStorage.setItem("entryGridDataArr", JSON.stringify(this.entryGridArr));
      sessionStorage.setItem("getChangeAddRow", "true");
    } else if (tabindexfocus > 0) {
      //  alert(tabindexfocus + 'gg');
      let ind = 0;
      let isElementFound: boolean = false;
      if (
        sessionStorage.getItem("entryGridDataArr") !== undefined &&
        sessionStorage.getItem("entryGridDataArr") !== "" &&
        JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== undefined &&
        JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== null &&
        JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== ""
      ) {
        this.entryGridArr = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
      }

      // FIND ROW OF RESPECTIVE ENTRYGRID
      for (let i = 0; i < this.entryGridArr[gIndex].length; i++) {
        if (
          this.entryGridArr[gIndex][i].hexkey !== undefined &&
          this.entryGridArr[gIndex][i].hexkey !== "" &&
          this.entryGridArr[gIndex][i].hexkey == degColumn.hexkey
        ) {
          ind = i;
        } else if (
          (this.entryGridArr[gIndex][i].hexkey == undefined || this.entryGridArr[gIndex][i].hexkey == "") &&
          this.entryGridArr[gIndex][i].id == degColumn.ids
        ) {
          ind = i;
        }
      }

      for (let i = 0; i < this.entryGridArr[gIndex][ind].items.length; i++) {
        for (let j = 0; j < this.entryGridArr[gIndex][ind].items[i].degColumns.length; j++) {
          this.entryGridArr[gIndex][ind].items[i].degColumns[j].focus = false;
        }
      }
      for (let i = 0; i < this.entryGridArr[gIndex][ind].items.length; i++) {
        for (let j = 0; j < this.entryGridArr[gIndex][ind].items[i].degColumns.length; j++) {
          if (!updateRow && this.entryGridArr[gIndex][ind].items[i].degColumns[j].id == tabindexfocus) {
            if (
              dateInvalid !== undefined &&
              !updateRow &&
              (this.entryGridArr[gIndex][ind].items[i].degColumns[j].type == "date" ||
                this.entryGridArr[gIndex][ind].items[i].degColumns[j].type == "ipAddress" ||
                this.entryGridArr[gIndex][ind].items[i].degColumns[j].type == "url" ||
                this.entryGridArr[gIndex][ind].items[i].degColumns[j].type == "macAddress" ||
                this.entryGridArr[gIndex][ind].items[i].degColumns[j].type == "usTelephoneNumber" ||
                this.entryGridArr[gIndex][ind].items[i].degColumns[j].type == "time" ||
                this.entryGridArr[gIndex][ind].items[i].degColumns[j].type == "hexadecimal")
            ) {
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].isValid = dateInvalid !== undefined && dateInvalid ? false : true;
            }

            if (dateInvalid && !updateRow) {
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].focus = true;
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].isValid = dateInvalid !== undefined && dateInvalid ? false : true;
            }
            isElementFound = true;
            break;
          } else if (!dateInvalid && !updateRow && this.entryGridArr[gIndex][ind].items[i].degColumns[j].id == tabindexfocus + 1) {
            this.entryGridArr[gIndex][ind].items[i].degColumns[j].focus = true;
            this.elementToFocus = tabindexfocus + 1;
            isElementFound = true;
            break;
          } else if (dateInvalid && updateRow && this.entryGridArr[gIndex][ind].items[i].degColumns[j].id == tabindexfocus) {
            this.entryGridArr[gIndex][ind].items[i].degColumns[j].focus = true;
            this.entryGridArr[gIndex][ind].items[i].degColumns[j].isValid = dateInvalid !== undefined && dateInvalid ? false : true;
            isElementFound = true;
            break;
          } else if (!dateInvalid && updateRow && this.entryGridArr[gIndex][ind].items[i].degColumns[j].id == tabindexfocus) {
            this.entryGridArr[gIndex][ind].items[i].degColumns[j].focus = true;
            this.elementToFocus = tabindexfocus;
            isElementFound = true;
            break;
          }
        }
      }

      for (let i = 0; i < this.itemInquiryBody[ind].items.length; i++) {
        for (let j = 0; j < this.entryGridArr[gIndex][ind].items.length; j++) {
          if (
            this.itemInquiryBody[ind].hexkey == this.entryGridArr[gIndex][ind].hexkey &&
            this.itemInquiryBody[ind].id == this.entryGridArr[gIndex][ind].id &&
            this.itemInquiryBody[ind].items[i].degColumns[0].name == this.entryGridArr[gIndex][ind].items[j].degColumns[0].name
          ) {
            this.itemInquiryBody[ind].items[i].degColumns[0].isValid = this.entryGridArr[gIndex][ind].items[j].degColumns[0].isValid;
            this.itemInquiryBody[ind].items[i].degColumns[0].focus = this.entryGridArr[gIndex][ind].items[j].degColumns[0].focus;
          }
        }
      }
      ind = isElementFound == true ? ind : this.isShiftTab ? ind - 1 : ind + 1;
      // SET FOCUS SELECT
      if (this.itemInquiryBody[ind] !== undefined && this.itemInquiryBody[ind].items !== undefined) {
        for (let i = 0; i < this.itemInquiryBody[ind].items.length; i++) {
          for (let j = 0; j < this.entryGridArr[gIndex][ind].items.length; j++) {
            if (
              this.itemInquiryBody[ind].hexkey == this.entryGridArr[gIndex][ind].hexkey &&
              this.itemInquiryBody[ind].id == this.entryGridArr[gIndex][ind].id &&
              this.itemInquiryBody[ind].items[i].degColumns[0].name == this.entryGridArr[gIndex][ind].items[j].degColumns[0].name &&
              this.itemInquiryBody[ind].items[i].degColumns[0].tabindex == tabindexfocus
            ) {
              //  comment 29 dec 2021
              this.itemInquiryBody[ind].items[i].degColumns[0].isValid = this.entryGridArr[gIndex][ind].items[j].degColumns[0].isValid;
              this.itemInquiryBody[ind].items[i].degColumns[0].focus = this.entryGridArr[gIndex][ind].items[j].degColumns[0].focus;
              // SET FOCUS USING ELEMENT
              if (this.itemInquiryBody[ind].items[i].degColumns[0].type !== "select") {
                const elem = <HTMLInputElement>(
                  document.getElementById(
                    this.itemInquiryBody[ind].items[i].degColumns[0].type == "radio"
                      ? this.itemInquiryBody[ind].items[i].degColumns[0].show.toUpperCase() +
                          this.itemInquiryBody[ind].items[i].degColumns[0].value +
                          this.itemInquiryBody[ind].items[i].degColumns[0].id
                      : JSON.stringify(this.itemInquiryBody[ind].items[i].degColumns[0].id)
                  )
                );
                if (elem !== undefined && elem !== null) {
                  elem.focus();
                }
              } else {
                // SET FOCUS SELECT
                for (let r = 0; r < this.mySelect.toArray().length; r++) {
                  if (this.mySelect.toArray()[r].nativeElement.tabIndex == tabindexfocus) {
                    this.mySelect.toArray()[r].nativeElement.click();
                  }
                }
              }
            }
          }
        }
      }
      sessionStorage.setItem("entryGridDataArr", JSON.stringify(this.entryGridArr));
      if (degColumn !== undefined && degColumn.type == "number") {
        this.setFocus(true, "", this.elementToFocus);
      }
    }
  }

  checkDate(degColumns) {
    const dateInvalidVal = this.dateValidation(degColumns);
    return dateInvalidVal.dateInvalid;
  }

  // get page according to navigation
  navChangedHandler(url: string) {
    this.handleShowBusy(url);
    this.editGrid.onChangeApi(url).subscribe(
      (res) => {
        for (let k = 0; k < res.data.length; k++) {
          if (res.data[k].type == "notify") {
            this.handleNotify(res.data[k]);
          } else if (res.data[k].type == "pageInit") {
          } else {
            this.displaySubGridresp = res.data[k];
            if (res.data[k].navigation !== undefined) {
              this.navigatinresponse = res.data[k].navigation;
            }
          }
        }
        this.loader = environment.displayNone;
        this.showBusyText = "";
      },
      (error) => this.handleError(error)
    );
  }

  /////////////////// Recieve Dt Form//////////////
  receiveDtForm(event: any) {
    this.loader = environment.displayNone;
    const data = [];
    let entryGridData: any;
    let elementFound: boolean = false;

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

    /**  UPDATE ROW OF ENTRY GRID */

    if (event.submitapi == "") {
      // COMPARE FORM ON EDIT
      this.detectChangeEditForm = this.checkEditFormChange();
      sessionStorage.setItem("detectChangeEntryGrid", JSON.stringify(this.detectChangeEditForm));
      if (event.anyInvalidField !== undefined && event.anyInvalidField) {
        toast(event.invalidMessage, Number(sessionStorage.getItem("toastTimeOut")));
      } else if (event.anyInvalidField !== undefined && !event.anyInvalidField) {
        this.editGridPopUp = environment.displayNone;
        const btnForm = JSON.parse(sessionStorage.getItem("btnHexId"));

        if (
          sessionStorage.getItem("entryGridDataArr") !== undefined &&
          sessionStorage.getItem("entryGridDataArr") !== "" &&
          JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== undefined &&
          JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== null &&
          JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== ""
        ) {
          this.entryGridArr = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
        }

        let gridIndex = 0;
        const findgridRef = JSON.parse(sessionStorage.getItem("gridRefNumber"));
        gridIndex = findgridRef.indexOf(btnForm.dataIndex);
        const rowInd = this.entryGridArr[gridIndex].findIndex((x) => x.id == btnForm.id);
        const length = this.entryGridArr[gridIndex][rowInd].items.length;
        const formLength = data.length;
        for (let i = 0; i < length; i++) {
          const colLength = this.entryGridArr[gridIndex][rowInd].items[i].degColumns.length;
          for (let j = 0; j < colLength; j++) {
            for (let k = 0; k < formLength; k++) {
              if (this.entryGridArr[gridIndex][rowInd].items[i].degColumns[j].name == data[k].name) {
                if (this.entryGridArr[gridIndex][rowInd].items[i].degColumns[j].value !== data[k].value && data[k].value !== "") {
                  this.entryGridArr[gridIndex][rowInd].items[i].degColumns[j].value = data[k].value;
                }
              }
            }
          }
        }
        // ADD OBJECT EDIT FORM

        this.entryGridArr[gridIndex][rowInd].editForm = data;
        this.itemInquiryBody = this.entryGridArr[gridIndex];
        sessionStorage.setItem("entryGridDataArr", JSON.stringify(this.entryGridArr));
        // SET FOCUS
        const nextRow = this.editRowNextInd;
        //  const gridIndex = this.currentGridIndex;
        if (this.entryGridArr[gridIndex][nextRow] !== undefined) {
          for (let i = 0; i < this.entryGridArr[gridIndex][nextRow].items.length; i++) {
            if (elementFound) {
              break;
            } else {
              for (let j = 0; j < this.entryGridArr[gridIndex][nextRow].items[i].degColumns.length; j++) {
                if (
                  this.entryGridArr[gridIndex][nextRow].items[i].degColumns !== undefined &&
                  this.entryGridArr[gridIndex][nextRow].items[i].degColumns[j] !== undefined &&
                  this.entryGridArr[gridIndex][nextRow].items[i].degColumns[j].type !== undefined &&
                  this.entryGridArr[gridIndex][nextRow].items[i].degColumns[j].type !== "hidden"
                ) {
                  this.entryGridArr[gridIndex][nextRow].items[i].degColumns[j].focus = true;
                  elementFound = true;
                  this.itemInquiryBody = this.entryGridArr[gridIndex];
                  break;
                }
              }
            }
          }
        }
        return;
      }
    } else {
      // TO GET MULTIPLE ADDRESSES FIELD
      // USING INPUT BOX VALUE
      if (event.addressFieldName.length > 0) {
        event.addressFieldName.splice(0, event.addressFieldName.length, ...new Set(event.addressFieldName));

        for (let m = 0; m < event.addressFieldName.length; m++) {
          const fieldValue = <HTMLInputElement>document.getElementById(event.addressFieldName[m]);

          data.push({
            name: event.addressFieldName[m],
            value: fieldValue.value,
          });
        }
      }

      const pcols = {
        type: "formData",
        cc: event.cc,
        ddname: event.ddName,
        hexkey: event.hexkey,
        viewid: event.viewId,
        fields: data,
      };
      /* DATA TO GIVE IN API CALL*/
      const fieldRowArr = [];
      let data_grid: any;
      if (
        sessionStorage.getItem("entryGridData") !== undefined &&
        sessionStorage.getItem("entryGridData") !== null &&
        sessionStorage.getItem("entryGridData").length > 0 &&
        event.entryGrid !== undefined &&
        event.entryGrid !== "" &&
        this.entryGrid
      ) {
        entryGridData = JSON.parse(sessionStorage.getItem("entryGridData"));
      }
      if (entryGridData !== undefined && entryGridData !== null) {
        for (let i = 0; i < entryGridData.length; i++) {
          const hexkey = entryGridData[i].hexkey;
          const isDeleted = entryGridData[i].isDeleted;
          const field_Columns = [];

          for (let j = 0; j < entryGridData[i].items.length; j++) {
            for (let k = 0; k < entryGridData[i].items[j].degColumns.length; k++) {
              if (entryGridData[i].items[j].degColumns[k].hasOwnProperty("name") && entryGridData[i].items[j].degColumns[k].name.length !== 0) {
                const field_Column = {
                  name: entryGridData[i].items[j].degColumns[k].name,
                  value: entryGridData[i].items[j].degColumns[k].value,
                };
                field_Columns.push(field_Column);
              }
            }
          }

          const field_row_value = {
            hexkey: hexkey,
            isDeleted: isDeleted,
            fields: field_Columns, // field_row
          };
          fieldRowArr.push(field_row_value);
        }
      }

      // FORMAT REQUIRED
      data_grid = {
        data: [],
      };
      // CHECK entryGridData is not blank

      if (fieldRowArr.length > 0 || event.entryGrid !== undefined || this.entryGrid) {
        data_grid.data[data_grid.data.length] = {
          type: "entryGridData",
          rows: fieldRowArr,
        };
      }

      const data_to_insert = data_grid.data.length;
      data_grid.data[data_to_insert] = pcols;

      this.submitData(data_grid, event.submitapi);
    }
  }

  // POST DATA TO SUBMIT API
  submitData(data_grid: any, submitapi: string) {
    let clearPage = true;
    let NotNotify = false;
    this.handleShowBusy(submitapi);
    this.editGrid.sendData(submitapi, data_grid).subscribe(
      (response) => {
        if (response == null) {
          return false;
        } else {
          const formResponse = JSON.parse(JSON.stringify(response));
          for (let i = 0; i < formResponse.data.length; i++) {
            if (formResponse.data[i].type == "notify") {
              NotNotify = false;
              this.handleNotify(formResponse.data[i]);
            } else if (formResponse.data[i].type == "action") {
              NotNotify = false;
              if (formResponse.data[i].newPage) {
                window.open(formResponse.data[i].url, "_blank");
              } else {
                window.open(formResponse.data[i].url, "_self");
              }
            } else if (formResponse.data[i].type == "pageInit") {
              clearPage = formResponse.data[i].clearPage;
            } else {
              /** send data to parent component using entryGrid */

              this.handleSubmitEditGrid.emit({
                response: response,
                gridRefNo: "",
                url: "",
              });
            }
          }
        }
        this.loader = environment.displayNone;
        this.showBusyText = "";
      },
      (error) => this.handleError(error)
    );
  }

  ///////////// Check Edit Form Change //////////
  checkEditFormChange() {
    let formDivs;
    let checkChange = false;
    const mainContent = JSON.parse(sessionStorage.getItem("formStateOld"));
    const newForm = this.responseDtForm;

    for (let k = 0; k < mainContent.data.length; k++) {
      if (mainContent.data[k].type == "form" && mainContent.data[k].formSubmit) {
        formDivs = mainContent.data[k].divs;
      }
    }

    for (let j = 0; j < formDivs.length; j++) {
      for (let k = 0; k < formDivs[j].fields.length; k++) {
        for (let m = 0; m < newForm.data.length; m++) {
          if (newForm.data[m].type == "form" && newForm.data[m].formSubmit) {
            for (let r = 0; r < newForm.data[m].divs.length; r++) {
              for (let i = 0; i < newForm.data[m].divs[r].fields.length; i++) {
                if (newForm.data[m].divs[r].fields[i].name == formDivs[j].fields[k].name) {
                  if (newForm.data[m].divs[r].fields[i].value !== formDivs[j].fields[k].value) {
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

  ///////// Calcle Popupup ////////////////
  cancel() {
    this.editGridPopUp = environment.displayNone;
    const id = JSON.parse(sessionStorage.getItem("id_popup"));
    /** ADDED WHEN USER CLOSES FORM IN POPUP */
    if (id !== null && id !== undefined && id.popUp_id !== "close") {
      this.getDelete("", id.popUp_id, id.delete);
    }
  }

  redirectTo(event: any) {
    if (event == "") {
      return;
    } else {
      this.handleCancel("routing", event.push_redirect, event.showMenu);
    }
  }

  ///////////// Handle Cancle ////////////
  handleCancel(routing: any, push_redirect: string, showMenu: boolean) {
    let elementFound: boolean = false;
    const nextRow = this.editRowNextInd;
    const gridIndex = this.currentGridIndex;
    if (sessionStorage.getItem("entryGridDataArr") !== undefined && sessionStorage.getItem("entryGridDataArr") !== "") {
      this.entryGridArr = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
    }
    if (push_redirect == "retainState") {
      this.editGridPopUp = environment.displayNone;
    }
    if (this.entryGridArr[gridIndex][nextRow] !== undefined) {
      for (let i = 0; i < this.entryGridArr[gridIndex][nextRow].items.length; i++) {
        if (elementFound) {
          break;
        } else {
          for (let j = 0; j < this.entryGridArr[gridIndex][nextRow].items[i].degColumns.length; j++) {
            if (
              this.entryGridArr[gridIndex][nextRow].items[i].degColumns !== undefined &&
              this.entryGridArr[gridIndex][nextRow].items[i].degColumns[j] !== undefined &&
              this.entryGridArr[gridIndex][nextRow].items[i].degColumns[j].type !== undefined &&
              this.entryGridArr[gridIndex][nextRow].items[i].degColumns[j].type !== "hidden"
            ) {
              this.entryGridArr[gridIndex][nextRow].items[i].degColumns[j].focus = true;
              elementFound = true;
              this.itemInquiryBody = this.entryGridArr[gridIndex];
              break;
            }
          }
        }
      }
    }
  }

  ////////////// Convert TO Desimal Entry grid ///////////////
  convertToDecimalEntryGrid(event?: any, degColumn?: any, id?: any) {
    let gridIndex = 0;
    let indReplaceRow = 0;
    let npipeStart: any;
    let npipeEnd: any;
    if (degColumn.numberPipe !== undefined) {
      npipeStart = Number(degColumn.numberPipe.split(".")[1].split("-")[0]);
      npipeEnd = Number(degColumn.numberPipe.split(".")[1].split("-")[1]);
    }

    if (degColumn.isDecimal) {
      if (npipeStart == npipeEnd && npipeStart !== undefined) {
        degColumn.value = parseFloat(event.target.value).toFixed(npipeEnd);
      }
      if (npipeStart == 0 && event.target.value.toString().includes(".")) {
        degColumn.value = event.target.value.split(".")[0] + "." + event.target.value.split(".")[1].substr(0, npipeEnd);
      }
      degColumn.value = this._dynamoService.removeZeroBeforeDecimal(degColumn.value, degColumn.numberPipe);
    }
    // USE SESSION TO TAKE DATA
    /** FIND DATA INDEX OF GRID WHERE UPDATE ROW NEED TO BE PERFORMED */

    const findgridRef = JSON.parse(sessionStorage.getItem("gridRefNumber"));
    gridIndex = findgridRef.indexOf(degColumn.dataIndex);
    if (
      sessionStorage.getItem("entryGridDataArr") !== undefined &&
      sessionStorage.getItem("entryGridDataArr") !== "" &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== undefined &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== null &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== ""
    ) {
      this.entryGridArr = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
    }

    if (degColumn.id == undefined) {
      indReplaceRow = this.entryGridArr[gridIndex].findIndex((x) => x.hexkey == degColumn.hexkey && x.dataIndex == degColumn.dataIndex);
    } else if (degColumn.id !== undefined) {
      indReplaceRow = this.entryGridArr[gridIndex].findIndex((x) => x.id == id && x.dataIndex == degColumn.dataIndex);
    }

    for (let i = 0; i < this.entryGridArr[gridIndex][indReplaceRow].items.length; i++) {
      if (this.entryGridArr[gridIndex][indReplaceRow].items[i].degColumns[0].name == degColumn.name) {
        this.entryGridArr[gridIndex][indReplaceRow].items[i].degColumns[0].value = degColumn.value;
        // SHOW VALIDATION MESSAGE
        // CHECK VALUE IS CHANGED
        if (degColumn.value !== "" && degColumn.value !== degColumn.value1) {
          if (Number(degColumn.value) > Number(degColumn.max)) {
            this.entryGridArr[gridIndex][indReplaceRow].items[i].degColumns[0].checkMaxValue = true;
          } else if (Number(degColumn.value) <= Number(degColumn.max)) {
            this.entryGridArr[gridIndex][indReplaceRow].items[i].degColumns[0].checkMaxValue = false;
          }

          this.itemInquiryBody = this.entryGridArr[gridIndex];
        }
      }
    }

    /** SHOW VALIDATION MESSAGE END */
    sessionStorage.setItem("entryGridDataArr", JSON.stringify(this.entryGridArr));
  }

  /////////// Check Decimal Entry Grid ////////////
  checkDecimalEntryGrid(event?, degColumn?) {
    if (!degColumn.isDecimal && event.charCode >= 48 && event.charCode <= 57) {
      return true;
    } else if (degColumn.isDecimal) {
      return true;
    }
    return false;
  }

  ////////////////// Append Decimal Row//////////
  convertToDecimalAppendRow(numberPipe: any, value: any, isDecimal: boolean) {
    if (numberPipe !== undefined) {
      const npipeStart = Number(numberPipe.split(".")[1].split("-")[0]);
      const npipeEnd = Number(numberPipe.split(".")[1].split("-")[1]);
      if (isDecimal) {
        // tslint:disable-next-line:curly
        if (npipeStart == npipeEnd) {
          value = parseFloat(value).toFixed(npipeEnd);
        }
        if (npipeStart == 0 && value.toString().includes(".")) {
          // value = value.split('.')[0] + '.' + value.split('.')[1].substr(0, npipeEnd);
          value = value.toString().split(".")[0] + "." + value.toString().split(".")[1].substr(0, npipeEnd);
        }

        if (value.toString().includes(".") && value.split(".")[0].includes(0)) {
          value = this._dynamoService.removeZeroBeforeDecimal(value, numberPipe);
        }
      }
    }
    return value;
  }

  getChangeAddRow(id: number, degColumn: any, event: any, head?: any, newRow?: any, addRowButton?: any) {
    this.isShiftTab = false;
    let dateVal;
    if (event.shiftKey && event.key == "Tab" && degColumn.type == "date") {
      if (event.currentTarget.value == "") {
        let d = degColumn.value1.split("-")[0].replace(degColumn.value1.split("-")[0], 2000);
        event.currentTarget.value = d + "-" + degColumn.value1.split("-")[1] + "-" + degColumn.value1.split("-")[2];
      }
      this.isShiftTab = true;
      if (
        degColumn.type == "date" &&
        event.currentTarget.value.includes("-") &&
        event.currentTarget.value.split("-")[0].length == 4 &&
        event.currentTarget.value.split("-")[0].slice(0, 2) == "00"
      ) {
        if (
          sessionStorage.getItem("entryGridDataArr") !== undefined &&
          sessionStorage.getItem("entryGridDataArr") !== "" &&
          JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== undefined &&
          JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== null &&
          JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== ""
        ) {
          this.entryGridArr = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
        }
        if (event.currentTarget.value !== undefined && event.currentTarget.value !== 0 && event.currentTarget.value.split("-")[0] == "0001") {
          dateVal = 2000 + "-" + event.currentTarget.value.split("-")[1] + "-" + event.currentTarget.value.split("-")[2];
        }

        if (event.currentTarget.value.slice(0, 2) == "00") {
          dateVal = event.currentTarget.value.replace("00", 20);
        }
        dateVal = dateVal.split("-")[0] + "-" + dateVal.split("-")[1] + "-" + dateVal.split("-")[2];
        degColumn.value = dateVal;
        degColumn.value1 = dateVal;
        degColumn.show = dateVal;
        this.customDate(degColumn, id);
      }
    } else if (!event.shiftKey && event.key == "Tab") {
      this.isShiftTab = false;
      this.getDataGrid = false;
      if (
        sessionStorage.getItem("entryGridDataArr") !== undefined &&
        sessionStorage.getItem("entryGridDataArr") !== "" &&
        JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== undefined &&
        JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== null &&
        JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== ""
      ) {
        this.entryGridArr = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
      }
      if (
        addRowButton !== undefined &&
        addRowButton.action !== undefined &&
        (addRowButton.action == "upload_save" || addRowButton.action == "api_call")
      ) {
        return;
      } else {
        let gridIndex = 0;

        /** FIND DATA INDEX OF GRID WHERE UPDATE ROW NEED TO BE PERFORMED */

        const findgridRef = JSON.parse(sessionStorage.getItem("gridRefNumber"));
        gridIndex = findgridRef.indexOf(degColumn.dataIndex);

        const lastRowId = this.entryGridArr[gridIndex].length;

        let ind = 0;
        if (degColumn !== null && degColumn !== undefined && degColumn.hexkey !== undefined && degColumn.hexkey !== "") {
          // use hexkey and id
          ind = this.entryGridArr[gridIndex].findIndex((x) => x.hexkey == degColumn.hexkey && x.id == id);
        } else {
          ind = this.entryGridArr[gridIndex].findIndex((x) => x.id == id);
        }
        // CHECK IF LAST COLUMN OF LAST ROW
        let cc: any[] = [];
        for (let j = 0; j < this.entryGridArr[gridIndex][ind].items.length; j++) {
          if (
            this.entryGridArr[gridIndex][ind].items[j].degColumns[0].type !== undefined &&
            this.entryGridArr[gridIndex][ind].items[j].degColumns[0].type !== "" &&
            this.entryGridArr[gridIndex][ind].items[j].degColumns[0].type !== "hidden"
          ) {
            cc.push(this.entryGridArr[gridIndex][ind].items[j]);
            //   break;
          }
        }

        if (lastRowId == id && cc[cc.length - 1].degColumns[0].tabindex == degColumn.tabindex) {
          this.callAppend = false;

          let lastText = 0;
          const AllText = [];

          for (let i = 0; i < this.entryGridArr[gridIndex][ind].items.length; i++) {
            // tslint:disable-next-line: max-line-length
            if (
              this.entryGridArr[gridIndex][ind].items[i].degColumns[0].type == "text" ||
              this.entryGridArr[gridIndex][ind].items[i].degColumns[0].type == "number" ||
              this.entryGridArr[gridIndex][ind].items[i].degColumns[0].type == "date" ||
              this.entryGridArr[gridIndex][ind].items[i].degColumns[0].type == "search" ||
              this.entryGridArr[gridIndex][ind].items[i].degColumns[0].type == "switch" ||
              this.entryGridArr[gridIndex][ind].items[i].degColumns[0].type == "textarea" ||
              this.entryGridArr[gridIndex][ind].items[i].degColumns[0].type == "select" ||
              this.entryGridArr[gridIndex][ind].items[i].degColumns[0].type == "email" ||
              this.entryGridArr[gridIndex][ind].items[i].degColumns[0].type == "radio" ||
              this.entryGridArr[gridIndex][ind].items[i].degColumns[0].type == "checkbox" ||
              this.entryGridArr[gridIndex][ind].items[i].degColumns[0].type == "ipAddress" ||
              this.entryGridArr[gridIndex][ind].items[i].degColumns[0].type == "url" ||
              this.entryGridArr[gridIndex][ind].items[i].degColumns[0].type == "usTelephoneNumber" ||
              this.entryGridArr[gridIndex][ind].items[i].degColumns[0].type == "macAddress" ||
              this.entryGridArr[gridIndex][ind].items[i].degColumns[0].type == "time" ||
              this.entryGridArr[gridIndex][ind].items[i].degColumns[0].type == "checkbox" ||
              this.entryGridArr[gridIndex][ind].items[i].degColumns[0].type == "hexadecimal"
            ) {
              AllText.push(this.entryGridArr[gridIndex][ind].items[i]);
            }
          }

          lastText = this.entryGridArr[gridIndex][ind].items.findIndex((x) => x.degColumns[0].name == AllText[AllText.length - 1].degColumns[0].name);
          if (this.entryGridArr[gridIndex][ind].items[lastText].degColumns[0].name == degColumn.name) {
            if (addRowButton !== undefined && addRowButton.checkDragDrop !== undefined) {
              this.addRow(degColumn.dataIndex, head, newRow, addRowButton.checkDragDrop, addRowButton.editApi);
            }
          }
        } else {
          // SET FOCUS
          if (degColumn.type !== "number") {
            sessionStorage.setItem("getChangeAddRow", "true");
          }
        }
      }
    }
  }

  setFocusGrid(tabindex, gIndex) {
    if (
      sessionStorage.getItem("entryGridDataArr") !== undefined &&
      sessionStorage.getItem("entryGridDataArr") !== "" &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== undefined &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== null &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== ""
    ) {
      this.entryGridArr = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
    }

    const grid = this.entryGridArr[gIndex];
    let setFocus = false;
    for (let i = 0; i < grid.length; i++) {
      if (grid[i].items !== undefined) {
        for (let j = 0; j < grid[i].items.length; j++) {
          for (let k = 0; k < grid[i].items[j].degColumns.length; k++) {
            if (
              !setFocus &&
              grid[i].items[j].degColumns !== undefined &&
              grid[i].items[j].degColumns[k].type !== undefined &&
              grid[i].items[j].degColumns[k].type !== "" &&
              grid[i].items[j].degColumns[k].tabindex !== undefined &&
              grid[i].items[j].degColumns[k].tabindex > tabindex
            ) {
              // grid[i].items[j].degColumns[k].tabindex == tabindex + 1

              this.elementToFocus = grid[i].items[j].degColumns[k].id;
              grid[i].items[j].degColumns[k].focus = true;
              setFocus = true;
              break;
            }
          }
        }
      }
    }
    sessionStorage.setItem("entryGridDataArr", JSON.stringify(this.entryGridArr));
    this.setFocus(true, "", this.elementToFocus);
  }

  getChange(id: number, degColumn: any, tableclass?: string, value?: any, maxValue?: number, name?: string, degColumns?: any, event?) {
    this.detectChangeEntryGrid = true;
    let inValid: boolean = false;
    sessionStorage.setItem("detectChangeEntryGrid", JSON.stringify(this.detectChangeEntryGrid));
    /** CHECK FOR VALID AND INVALID FIELD  */
    if (
      degColumns.type == "hexadecimal" ||
      degColumns.type == "ipAddress" ||
      degColumns.type == "url" ||
      degColumns.type == "macAddress" ||
      degColumns.type == "usTelephoneNumber"
    ) {
      inValid = this.fieldValidation(degColumns);
    }
    // CALL ONCHANGEAPI FUNCTION
    if (!inValid && degColumns.onChangeApi !== undefined && degColumns.onChangeApi.length > 1) {
      this.OnChangeAPiData(degColumns.onChangeApi, degColumns.value, degColumns.name, degColumns);
    }
    if (
      sessionStorage.getItem("entryGridDataArr") !== undefined &&
      sessionStorage.getItem("entryGridDataArr") !== "" &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== undefined &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== null &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== ""
    ) {
      this.entryGridArr = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
    }

    this.callAppend = false;
    let ind = 0;
    this.showMaxNumMessage = false;
    let gIndex = 0;
    if (degColumns != null && degColumns !== undefined && degColumns.dataIndex !== undefined) {
      for (let i = 0; i < this.entryGridArr.length; i++) {
        if (this.entryGridArr[i].length > 0 && this.entryGridArr[i][0].dataIndex == degColumns.dataIndex) {
          gIndex = i;
          break;
        }
      }
      // UNSET ELEMENT FOCUS
      const grid = this.entryGridArr[gIndex];

      for (let i = 0; i < grid.length; i++) {
        if (grid[i].items !== undefined) {
          for (let j = 0; j < grid[i].items.length; j++) {
            for (let k = 0; k < grid[i].items[j].degColumns.length; k++) {
              if (
                grid[i].items[j].degColumns !== undefined &&
                grid[i].items[j].degColumns[k].tabindex !== undefined &&
                grid[i].items[j].degColumns[k].tabindex !== ""
              ) {
                grid[i].items[j].degColumns[k].focus = false;
              }
            }
          }
        }
      }

      this.entryGridArr[gIndex] = grid;
      if (degColumn !== null && degColumn !== undefined && degColumn.hexkey !== "") {
        ind = this.entryGridArr[gIndex].findIndex((x) => x.hexkey == degColumn.hexkey && x.id == id && x.dataIndex == degColumns.dataIndex);
      } else {
        ind = this.entryGridArr[gIndex].findIndex((x) => x.id == id && x.dataIndex == degColumns.dataIndex);
      }

      this.entryGridArr[gIndex][ind].isModified = true;
      for (let i = 0; i < this.entryGridArr[gIndex][ind].items.length; i++) {
        for (let j = 0; j < this.entryGridArr[gIndex][ind].items[i].degColumns.length; j++) {
          if (
            this.entryGridArr[gIndex][ind].items[i].degColumns !== undefined &&
            this.entryGridArr[gIndex][ind].items[i].degColumns[j].name == degColumns.name &&
            this.entryGridArr[gIndex][ind].items[i].degColumns[j].tabindex == degColumns.tabindex
          ) {
            if (
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].type == "text" ||
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].type == "date" ||
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].type == "email" ||
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].type == "textarea" ||
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].type == "url" ||
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].type == "time" ||
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].type == "hexadecimal" ||
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].type == "ipAddress" ||
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].type == "macAddress" ||
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].type == "usTelephoneNumber" ||
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].type == "search"
            ) {
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].value1 = degColumns.value;
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].value =
                this.entryGridArr[gIndex][ind].items[i].degColumns[j].type == "search" ? degColumns.show : degColumns.value;
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].show = degColumns.show;
            } else if (this.entryGridArr[gIndex][ind].items[i].degColumns[j].type == "number") {
              const convertToDecimal = this.convertToDecimalAppendRow(
                this.entryGridArr[gIndex][ind].items[i].degColumns[j].numberPipe,
                degColumns.value,
                this.entryGridArr[gIndex][ind].items[i].degColumns[j].isDecimal
              );

              this.entryGridArr[gIndex][ind].items[i].degColumns[j].value1 = convertToDecimal;
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].value = convertToDecimal;
              // added 3march2022
              degColumns.value = this.entryGridArr[gIndex][ind].items[i].degColumns[j].value;
              // this.itemInquiryBody = this.entryGridArr[gIndex];

              for (let i = 0; i < this.itemInquiryBody[ind].items.length; i++) {
                for (let j = 0; j < this.entryGridArr[gIndex][ind].items.length; j++) {
                  // (this.itemInquiryBody[ind].hexkey == this.entryGridArr[gIndex][ind].hexkey  removed 3 march 2022
                  if (
                    this.itemInquiryBody[ind].id == this.entryGridArr[gIndex][ind].id &&
                    this.itemInquiryBody[ind].items[i].degColumns[0].name == this.entryGridArr[gIndex][ind].items[j].degColumns[0].name
                  ) {
                    this.itemInquiryBody[ind].items[i].degColumns[0].value = this.entryGridArr[gIndex][ind].items[j].degColumns[0].value;
                    this.itemInquiryBody[ind].items[i].degColumns[0].value1 = this.entryGridArr[gIndex][ind].items[j].degColumns[0].value1;
                    // CHECK FOR INVALID INPUT 3 MARCH 2022
                    if (
                      this.itemInquiryBody[ind].items[i].degColumns[0].tabindex == degColumns.tabindex &&
                      (degColumns.value < degColumns.min || degColumns.value > degColumns.max)
                    ) {
                      // console.log('min max error');
                      this.itemInquiryBody[ind].items[i].degColumns[0].isValid = false;
                      this.entryGridArr[gIndex][ind].items[j].degColumns[0].isValid = false;
                      this.itemInquiryBody[ind].items[i].degColumns[0].focus = true;

                      toast(
                        `Number value must be from ${this.itemInquiryBody[ind].items[i].degColumns[0].min} to ${this.itemInquiryBody[ind].items[i].degColumns[0].max}`,
                        Number(sessionStorage.getItem("toastTimeOut"))
                      );
                      sessionStorage.setItem("entryGridDataArr", JSON.stringify(this.entryGridArr));
                      this.setFocusOnElement(degColumns, degColumns.tabindex, gIndex, true);
                      return;
                    } else if (this.itemInquiryBody[ind].items[i].degColumns[0].tabindex == degColumns.tabindex) {
                      this.itemInquiryBody[ind].items[i].degColumns[0].isValid = true;
                      this.entryGridArr[gIndex][ind].items[j].degColumns[0].isValid = true;
                    }
                  }
                }
              }

              sessionStorage.setItem("entryGridDataArr", JSON.stringify(this.entryGridArr));
              this.setFocusGrid(this.entryGridArr[gIndex][ind].items[i].degColumns[j].tabindex, gIndex);
              break;
            }
            if (
              sessionStorage.getItem("getChangeAddRow") !== undefined &&
              sessionStorage.getItem("getChangeAddRow") !== "" &&
              JSON.parse(sessionStorage.getItem("getChangeAddRow")) !== undefined &&
              JSON.parse(sessionStorage.getItem("getChangeAddRow")) !== null &&
              JSON.parse(sessionStorage.getItem("getChangeAddRow")) !== "" &&
              JSON.parse(sessionStorage.getItem("getChangeAddRow")) == true
            ) {
              if (this.entryGridArr[gIndex][ind].items[i].degColumns !== undefined) {
                this.entryGridArr[gIndex][ind].items[i].degColumns[j].focus = false;
              }
              if (
                this.entryGridArr[gIndex][ind].items.length > i + 1 &&
                this.entryGridArr[gIndex][ind].items[i + 1].degColumns !== undefined &&
                this.entryGridArr[gIndex][ind].items[i + 1].degColumns[j] !== undefined &&
                this.entryGridArr[gIndex][ind].items[i + 1].degColumns[j] !== ""
              ) {
                this.entryGridArr[gIndex][ind].items[i + 1].degColumns[j].focus = true;
              }
              sessionStorage.setItem("getChangeAddRow", "");
            }

            break;
          }
        }
      }
    }
    sessionStorage.setItem("entryGridDataArr", JSON.stringify(this.entryGridArr));
  }

  getChangeRadio(id: number, degColumn: any, tableclass?: string, value?: any, maxValue?: number, name?: string, degColumns?: any) {
    this.detectChangeEntryGrid = true;
    sessionStorage.setItem("detectChangeEntryGrid", JSON.stringify(this.detectChangeEntryGrid));
    /** CALL ONCHANGEAPI FUNCTION  */
    if (degColumns.onChangeApi !== undefined && degColumns.onChangeApi.length > 1 && degColumns.value1 !== "") {
      this.OnChangeAPiData(degColumns.onChangeApi, degColumns.value1, degColumns.name, degColumns);
    }
    if (
      sessionStorage.getItem("entryGridDataArr") !== undefined &&
      sessionStorage.getItem("entryGridDataArr") !== "" &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== undefined &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== null &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== ""
    ) {
      this.entryGridArr = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
    }

    this.callAppend = false;
    let ind = 0;
    this.showMaxNumMessage = false;
    let gIndex = 0;
    if (degColumns != null && degColumns !== undefined && degColumns.dataIndex !== undefined) {
      for (let i = 0; i < this.entryGridArr.length; i++) {
        if (this.entryGridArr[i].length > 0 && this.entryGridArr[i][0].dataIndex == degColumns.dataIndex) {
          gIndex = i;
          break;
        }
      }
      // UNSET ELEMENT FOCUS
      const grid = this.entryGridArr[gIndex];
      for (let i = 0; i < grid.length; i++) {
        if (grid[i].items !== undefined) {
          for (let j = 0; j < grid[i].items.length; j++) {
            for (let k = 0; k < grid[i].items[j].degColumns.length; k++) {
              if (
                grid[i].items[j].degColumns !== undefined &&
                grid[i].items[j].degColumns[k].tabindex !== undefined &&
                grid[i].items[j].degColumns[k].tabindex !== ""
              ) {
                grid[i].items[j].degColumns[k].focus = false;
              }
            }
          }
        }
      }
      this.entryGridArr[gIndex] = grid;
      if (degColumn !== null && degColumn !== undefined && degColumn.hexkey !== "") {
        ind = this.entryGridArr[gIndex].findIndex((x) => x.hexkey == degColumn.hexkey && x.id == id && x.dataIndex == degColumns.dataIndex);
      } else {
        ind = this.entryGridArr[gIndex].findIndex((x) => x.id == id && x.dataIndex == degColumns.dataIndex);
      }

      if (this.entryGridArr[gIndex][ind] !== undefined) {
        this.entryGridArr[gIndex][ind].isModified = true;
      }

      for (let i = 0; i < this.entryGridArr[gIndex][ind].items.length; i++) {
        for (let j = 0; j < this.entryGridArr[gIndex][ind].items[i].degColumns.length; j++) {
          if (
            this.entryGridArr[gIndex][ind].items[i].degColumns !== undefined &&
            this.entryGridArr[gIndex][ind].items[i].degColumns[j].name == degColumns.name &&
            this.entryGridArr[gIndex][ind].items[i].degColumns[j].tabindex == degColumns.tabindex
          ) {
            if (this.entryGridArr[gIndex][ind].items[i].degColumns[j].type == "radio") {
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].value1 = value;
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].value = value;
            }

            if (
              sessionStorage.getItem("getChangeAddRow") !== undefined &&
              sessionStorage.getItem("getChangeAddRow") !== "" &&
              JSON.parse(sessionStorage.getItem("getChangeAddRow")) !== undefined &&
              JSON.parse(sessionStorage.getItem("getChangeAddRow")) !== null &&
              JSON.parse(sessionStorage.getItem("getChangeAddRow")) !== "" &&
              JSON.parse(sessionStorage.getItem("getChangeAddRow")) == true
            ) {
              if (this.entryGridArr[gIndex][ind].items[i].degColumns !== undefined) {
                this.entryGridArr[gIndex][ind].items[i].degColumns[j].focus = false;
              }
              if (
                this.entryGridArr[gIndex][ind].items.length > i + 1 &&
                this.entryGridArr[gIndex][ind].items[i + 1].degColumns !== undefined &&
                this.entryGridArr[gIndex][ind].items[i + 1].degColumns[j] !== undefined &&
                this.entryGridArr[gIndex][ind].items[i + 1].degColumns[j] !== ""
              ) {
                this.entryGridArr[gIndex][ind].items[i + 1].degColumns[j].focus = true;
              }
              sessionStorage.setItem("getChangeAddRow", "");
            }
          }
        }
      }
      // TO MAKE
    }

    this.buttonEnabled = false;
    sessionStorage.setItem("entryGridDataArr", JSON.stringify(this.entryGridArr));
  }
  getChangeSelect(id: number, degColumn: any, tableclass?: string, value?: any, maxValue?: number, name?: string, degColumns?: any) {
    this.detectChangeEntryGrid = true;
    sessionStorage.setItem("detectChangeEntryGrid", JSON.stringify(this.detectChangeEntryGrid));
    /** CALL ONCHANGEAPI FUNCTION  */
    if (degColumns.onChangeApi !== undefined && degColumns.onChangeApi.length > 1 && degColumns.value !== "") {
      this.OnChangeAPiData(degColumns.onChangeApi, degColumns.value, degColumns.name, degColumns);
    }
    if (
      sessionStorage.getItem("entryGridDataArr") !== undefined &&
      sessionStorage.getItem("entryGridDataArr") !== "" &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== undefined &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== null &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== ""
    ) {
      this.entryGridArr = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
    }

    this.callAppend = false;
    let ind = 0;
    this.showMaxNumMessage = false;
    let gIndex = 0;
    if (degColumns != null && degColumns !== undefined && degColumns.dataIndex !== undefined) {
      for (let i = 0; i < this.entryGridArr.length; i++) {
        if (this.entryGridArr[i].length > 0 && this.entryGridArr[i][0].dataIndex == degColumns.dataIndex) {
          gIndex = i;
          break;
        }
      }
      // UNSET ELEMENT FOCUS
      const grid = this.entryGridArr[gIndex];
      for (let i = 0; i < grid.length; i++) {
        if (grid[i].items !== undefined) {
          for (let j = 0; j < grid[i].items.length; j++) {
            for (let k = 0; k < grid[i].items[j].degColumns.length; k++) {
              if (
                grid[i].items[j].degColumns !== undefined &&
                grid[i].items[j].degColumns[k].tabindex !== undefined &&
                grid[i].items[j].degColumns[k].tabindex !== ""
              ) {
                grid[i].items[j].degColumns[k].focus = false;
              }
            }
          }
        }
      }
      this.entryGridArr[gIndex] = grid;
      if (degColumn !== null && degColumn !== undefined && degColumn.hexkey !== "") {
        ind = this.entryGridArr[gIndex].findIndex((x) => x.hexkey == degColumn.hexkey && x.id == id && x.dataIndex == degColumns.dataIndex);
      } else {
        ind = this.entryGridArr[gIndex].findIndex((x) => x.id == id && x.dataIndex == degColumns.dataIndex);
      }

      this.entryGridArr[gIndex][ind].isModified = true;
      for (let i = 0; i < this.entryGridArr[gIndex][ind].items.length; i++) {
        for (let j = 0; j < this.entryGridArr[gIndex][ind].items[i].degColumns.length; j++) {
          if (
            this.entryGridArr[gIndex][ind].items[i].degColumns !== undefined &&
            this.entryGridArr[gIndex][ind].items[i].degColumns[j].name == degColumns.name &&
            this.entryGridArr[gIndex][ind].items[i].degColumns[j].tabindex == degColumns.tabindex
          ) {
            if (this.entryGridArr[gIndex][ind].items[i].degColumns[j].type == "select") {
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].value1 = degColumns.value;
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].value =
                this.entryGridArr[gIndex][ind].items[i].degColumns[j].type == "search" ? degColumns.show : degColumns.value;
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].show = degColumns.show;
            }
          }
        }
      }
    }

    this.buttonEnabled = false;

    sessionStorage.setItem("entryGridDataArr", JSON.stringify(this.entryGridArr));
  }

  formatDate(value: any) {
    let convertDate = value.split("-");
    convertDate = convertDate[1] + "-" + convertDate[2] + "-" + convertDate[0];
    return convertDate;
  }

  dateValidation(degColumns?: any) {
    let dateInvalid: boolean = false;
    let gIndex = 0;
    if (degColumns != null && degColumns !== undefined && degColumns.dataIndex !== undefined) {
      for (let i = 0; i < this.entryGridArr.length; i++) {
        if (this.entryGridArr[i].length > 0 && this.entryGridArr[i][0].dataIndex == degColumns.dataIndex) {
          gIndex = i;
          break;
        }
      }
    }
    if (!degColumns.required && degColumns.value == "") {
      return { dateInvalid: false, gIndex: gIndex };
    } else if (degColumns.value !== degColumns.value1 || (degColumns.required && degColumns.value == "" && degColumns.value.length !== undefined)) {
      const checkYear = degColumns.value.split("-");
      // CHECK DIGIT IN YEAR
      if (checkYear[0].length > 4) {
        toast("Only four digit is allowed in year", Number(sessionStorage.getItem("toastTimeOut")));
        dateInvalid = true;
      } else if (!dateInvalid && degColumns.value < degColumns.min) {
        // CHECK MIN DATE
        const minDate = this.formatDate(degColumns.min);
        toast("Date must be after " + minDate, Number(sessionStorage.getItem("toastTimeOut")));
        dateInvalid = true;
      } else if (!dateInvalid && degColumns.value > degColumns.max) {
        // CHECK MAX DATE
        const maxDate = this.formatDate(degColumns.max);
        toast("Date must be before " + maxDate, Number(sessionStorage.getItem("toastTimeOut")));
        dateInvalid = true;
      } else if (!dateInvalid && !this._dynamoService.dateValidate(degColumns)) {
        // CHECK INVALID DATE

        toast("Invalid Date", Number(sessionStorage.getItem("toastTimeOut")));
        dateInvalid = true;
      }
      return { dateInvalid: dateInvalid, gIndex: gIndex };
    } else if (degColumns.required && degColumns.value == 0 && degColumns.value1 == 0) {
      toast("Invalid Date", Number(sessionStorage.getItem("toastTimeOut")));
      dateInvalid = true;
      return { dateInvalid: dateInvalid, gIndex: gIndex };
    } else {
      // RETURN THE VALID DATA
      return { dateInvalid: dateInvalid, gIndex: gIndex };
    }
  }
  /** VALIDATE NEW TYPES */
  fieldValidation(degColumns?: any) {
    let inValid: boolean = false;
    // let inValid: boolean = false;
    let gIndex = 0;
    if (
      degColumns.value !== degColumns.value1 &&
      (degColumns.type == "ipAddress" ||
        degColumns.type == "url" ||
        degColumns.type == "macAddress" ||
        degColumns.type == "usTelephoneNumber" ||
        degColumns.type == "hexadecimal")
    ) {
      if (degColumns.type == "ipAddress" && !this._dynamoService.validateIPaddress(degColumns.value)) {
        inValid = true;
        toast("Invalid IP Address", Number(sessionStorage.getItem("toastTimeOut")));
      } else if (degColumns.type == "url" && !this._dynamoService.validateURL(degColumns.value)) {
        inValid = true;
        toast("Invalid URL", Number(sessionStorage.getItem("toastTimeOut")));
      } else if (degColumns.type == "macAddress" && !this._dynamoService.validateMacAddress(degColumns.value)) {
        inValid = true;
        toast("Invalid Mac Address", Number(sessionStorage.getItem("toastTimeOut")));
      } else if (degColumns.type == "usTelephoneNumber" && !this._dynamoService.validatePhoneNumber(degColumns.value)) {
        inValid = true;
        toast("Invalid Phone Number", Number(sessionStorage.getItem("toastTimeOut")));
      } else if (degColumns.type == "hexadecimal" && !this._dynamoService.validatehexaDecimal(degColumns.value)) {
        inValid = true;
        toast("Invalid Hexadecimal Field", Number(sessionStorage.getItem("toastTimeOut")));
      }

      if (degColumns != null && degColumns !== undefined && degColumns.dataIndex !== undefined) {
        for (let i = 0; i < this.entryGridArr.length; i++) {
          if (this.entryGridArr[i].length > 0 && this.entryGridArr[i][0].dataIndex == degColumns.dataIndex) {
            gIndex = i;
            break;
          }
        }
      }
      if (inValid) {
        this.setFocusOnElement(degColumns, degColumns.tabindex, gIndex, inValid);
      } else {
        return inValid;
      }
    }
  }

  preventKeyboard(e) {
    if (e.keyCode !== 9) {
      e.preventDefault();
    }
  }
  customDate(degColumns, id, dateInvalid?, degColumn?) {
    let gIndex = 0;
    let ind = 0;
    if (degColumns != null && degColumns !== undefined && degColumns.dataIndex !== undefined) {
      for (let i = 0; i < this.entryGridArr.length; i++) {
        if (this.entryGridArr[i].length > 0 && this.entryGridArr[i][0].dataIndex == degColumns.dataIndex) {
          gIndex = i;
          break;
        }
      }
      // UNSET ELEMENT FOCUS
      const grid = this.entryGridArr[gIndex];

      for (let i = 0; i < grid.length; i++) {
        if (grid[i].items !== undefined) {
          for (let j = 0; j < grid[i].items.length; j++) {
            for (let k = 0; k < grid[i].items[j].degColumns.length; k++) {
              if (
                grid[i].items[j].degColumns !== undefined &&
                grid[i].items[j].degColumns[k].tabindex !== undefined &&
                grid[i].items[j].degColumns[k].tabindex !== ""
              ) {
                grid[i].items[j].degColumns[k].focus = false;
              }
            }
          }
        }
      }
      this.entryGridArr[gIndex] = grid;
      if (degColumn !== null && degColumn !== undefined && degColumn.hexkey !== "") {
        ind = this.entryGridArr[gIndex].findIndex((x) => x.hexkey == degColumn.hexkey && x.id == id && x.dataIndex == degColumns.dataIndex);
      } else {
        ind = this.entryGridArr[gIndex].findIndex((x) => x.id == id && x.dataIndex == degColumns.dataIndex);
      }

      if (this.entryGridArr[gIndex][ind] !== undefined) {
        this.entryGridArr[gIndex][ind].isModified = true;
      }
      if (this.entryGridArr[gIndex][ind] !== undefined && this.entryGridArr[gIndex][ind].items !== undefined) {
        for (let i = 0; i < this.entryGridArr[gIndex][ind].items.length; i++) {
          for (let j = 0; j < this.entryGridArr[gIndex][ind].items[i].degColumns.length; j++) {
            if (
              this.entryGridArr[gIndex][ind].items[i].degColumns !== undefined &&
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].name == degColumns.name &&
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].tabindex == degColumns.tabindex
            ) {
              if (this.entryGridArr[gIndex][ind].items[i].degColumns[j].type == "date") {
                this.entryGridArr[gIndex][ind].items[i].degColumns[j].value1 = degColumns.value;
                this.entryGridArr[gIndex][ind].items[i].degColumns[j].value = degColumns.value;
                this.entryGridArr[gIndex][ind].items[i].degColumns[j].show = degColumns.show;
                this.entryGridArr[gIndex][ind].items[i].degColumns[j].isValid = dateInvalid ? false : true;
                if (this.entryGridArr[gIndex][ind].items[i].degColumns[j].isValid) {
                  if (this.entryGridArr[gIndex][ind].items[i + 1] !== undefined) {
                    this.entryGridArr[gIndex][ind].items[i + 1].degColumns[0].focus = true;
                  }
                }
                // this.dateValidation(degColumns)
              }
            }
          }
        }
      }
    }
    this.setValueItemInquiry(gIndex);
  }

  getChangeDate(id: number, degColumn: any, tableclass?: string, value?: any, maxValue?: number, name?: string, degColumns?: any, event?) {
    let checkDateInvalid: any;
    this.detectChangeEntryGrid = true;
    sessionStorage.setItem("detectChangeEntryGrid", JSON.stringify(this.detectChangeEntryGrid));
    if (
      sessionStorage.getItem("entryGridDataArr") !== undefined &&
      sessionStorage.getItem("entryGridDataArr") !== "" &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== undefined &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== null &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== ""
    ) {
      this.entryGridArr = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
    }
    if (degColumns !== undefined && degColumns.value !== 0 && degColumns.value.split("-")[0] == "0001") {
      degColumns.value = 2000 + "-" + degColumns.value.split("-")[1] + "-" + degColumns.value.split("-")[2];
    }
    if (degColumns !== undefined && degColumns.value !== 0 && degColumns.value.slice(0, 2) == "00") {
      degColumns.value = degColumns.value.replace("00", 20);
    } // && degColumns.value !== 0 28 dec 2021
    if (degColumns.value !== degColumns.value1 || (degColumns.required && (degColumns.value == "" || degColumns.value == 0))) {
      checkDateInvalid = this.dateValidation(degColumns);
      if (checkDateInvalid.dateInvalid) {
        this.setFocusOnElement(degColumns, degColumns.tabindex, checkDateInvalid.gIndex, checkDateInvalid.dateInvalid);
        return;
      }
    } else {
      return;
    }
    /** CALL ONCHANGEAPI FUNCTION  */
    if (!checkDateInvalid.dateInvalid && degColumns.onChangeApi !== undefined && degColumns.onChangeApi.length > 1 && degColumns.value !== "") {
      this.OnChangeAPiData(degColumns.onChangeApi, degColumns.value, degColumns.name, degColumns);
    }
    this.callAppend = false;
    let ind = 0;
    this.showMaxNumMessage = false;
    let gIndex = 0;

    this.buttonEnabled = false;
    this.customDate(degColumns, id, checkDateInvalid.dateInvalid);
  }
  getChangeSwitch(id: number, degColumn: any, tableclass?: string, value?: any, maxValue?: number, name?: string, degColumns?: any) {
    this.detectChangeEntryGrid = true;
    sessionStorage.setItem("detectChangeEntryGrid", JSON.stringify(this.detectChangeEntryGrid));
    /** CALL ONCHANGEAPI FUNCTION  */
    if (degColumns.onChangeApi !== undefined && degColumns.onChangeApi.length > 1 && degColumns.value !== "") {
      this.OnChangeAPiData(degColumns.onChangeApi, degColumns.value, degColumns.name, degColumns);
    }
    if (
      sessionStorage.getItem("entryGridDataArr") !== undefined &&
      sessionStorage.getItem("entryGridDataArr") !== "" &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== undefined &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== null &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== ""
    ) {
      this.entryGridArr = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
    }

    this.callAppend = false;
    let ind = 0;
    this.showMaxNumMessage = false;
    let gIndex = 0;
    if (degColumns != null && degColumns !== undefined && degColumns.dataIndex !== undefined) {
      for (let i = 0; i < this.entryGridArr.length; i++) {
        if (this.entryGridArr[i].length > 0 && this.entryGridArr[i][0].dataIndex == degColumns.dataIndex) {
          gIndex = i;
          break;
        }
      }
      // UNSET ELEMENT FOCUS
      const grid = this.entryGridArr[gIndex];
      for (let i = 0; i < grid.length; i++) {
        if (grid[i].items !== undefined) {
          for (let j = 0; j < grid[i].items.length; j++) {
            for (let k = 0; k < grid[i].items[j].degColumns.length; k++) {
              if (
                grid[i].items[j].degColumns !== undefined &&
                grid[i].items[j].degColumns[k].tabindex !== undefined &&
                grid[i].items[j].degColumns[k].tabindex !== ""
              ) {
                grid[i].items[j].degColumns[k].focus = false;
              }
            }
          }
        }
      }
      this.entryGridArr[gIndex] = grid;
      if (degColumn !== null && degColumn !== undefined && degColumn.hexkey !== "") {
        ind = this.entryGridArr[gIndex].findIndex((x) => x.hexkey == degColumn.hexkey && x.id == id && x.dataIndex == degColumns.dataIndex);
      } else {
        ind = this.entryGridArr[gIndex].findIndex((x) => x.id == id && x.dataIndex == degColumns.dataIndex);
      }

      this.entryGridArr[gIndex][ind].isModified = true;
      for (let i = 0; i < this.entryGridArr[gIndex][ind].items.length; i++) {
        for (let j = 0; j < this.entryGridArr[gIndex][ind].items[i].degColumns.length; j++) {
          if (
            this.entryGridArr[gIndex][ind].items[i].degColumns !== undefined &&
            this.entryGridArr[gIndex][ind].items[i].degColumns[j].name == degColumns.name &&
            this.entryGridArr[gIndex][ind].items[i].degColumns[j].tabindex == degColumns.tabindex
          ) {
            if (this.entryGridArr[gIndex][ind].items[i].degColumns[j].type == "switch") {
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].value1 = degColumns.value;
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].value =
                this.entryGridArr[gIndex][ind].items[i].degColumns[j].type == "search" ? degColumns.show : degColumns.value;
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].show = degColumns.show;
            }
          }
        }
      }
    }

    this.buttonEnabled = false;

    sessionStorage.setItem("entryGridDataArr", JSON.stringify(this.entryGridArr));
  }

  getChangeCheckbox(id: number, degColumn: any, tableclass?: string, value?: any, maxValue?: number, name?: string, degColumns?: any, event?) {
    if (event.target.checked) {
      this.hexKeyarray.push(degColumns.hexkey);
    } else {
      for (let i = 0; i < this.hexKeyarray.length; i++) {
        const index = this.hexKeyarray.indexOf(degColumns.hexkey);
        if (index > -1) {
          this.hexKeyarray.splice(index, 1);
        }
      }
    }

    this.detectChangeEntryGrid = true;
    sessionStorage.setItem("detectChangeEntryGrid", JSON.stringify(this.detectChangeEntryGrid));
    /** CALL ONCHANGEAPI FUNCTION  */
    if (degColumns.onChangeApi !== undefined && degColumns.onChangeApi.length > 1 && event.target.checked !== "") {
      this.OnChangeAPiData(degColumns.onChangeApi, event.target.checked, degColumns.name, degColumns);
    }
    if (
      sessionStorage.getItem("entryGridDataArr") !== undefined &&
      sessionStorage.getItem("entryGridDataArr") !== "" &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== undefined &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== null &&
      JSON.parse(sessionStorage.getItem("entryGridDataArr")) !== ""
    ) {
      this.entryGridArr = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
    }

    this.callAppend = false;
    let ind = 0;
    this.showMaxNumMessage = false;
    let gIndex = 0;
    if (degColumns != null && degColumns !== undefined && degColumns.dataIndex !== undefined) {
      for (let i = 0; i < this.entryGridArr.length; i++) {
        if (this.entryGridArr[i].length > 0 && this.entryGridArr[i][0].dataIndex == degColumns.dataIndex) {
          gIndex = i;
          break;
        }
      }
      // UNSET ELEMENT FOCUS
      const grid = this.entryGridArr[gIndex];
      for (let i = 0; i < grid.length; i++) {
        if (grid[i].items !== undefined) {
          for (let j = 0; j < grid[i].items.length; j++) {
            for (let k = 0; k < grid[i].items[j].degColumns.length; k++) {
              if (
                grid[i].items[j].degColumns !== undefined &&
                grid[i].items[j].degColumns[k].tabindex !== undefined &&
                grid[i].items[j].degColumns[k].tabindex !== ""
              ) {
                grid[i].items[j].degColumns[k].focus = false;
              }
            }
          }
        }
      }
      this.entryGridArr[gIndex] = grid;
      if (degColumn !== null && degColumn !== undefined && degColumn.hexkey !== "") {
        ind = this.entryGridArr[gIndex].findIndex((x) => x.hexkey == degColumn.hexkey && x.id == id && x.dataIndex == degColumns.dataIndex);
      } else {
        ind = this.entryGridArr[gIndex].findIndex((x) => x.id == id && x.dataIndex == degColumns.dataIndex);
      }

      this.entryGridArr[gIndex][ind].isModified = true;
      for (let i = 0; i < this.entryGridArr[gIndex][ind].items.length; i++) {
        for (let j = 0; j < this.entryGridArr[gIndex][ind].items[i].degColumns.length; j++) {
          if (
            this.entryGridArr[gIndex][ind].items[i].degColumns !== undefined &&
            this.entryGridArr[gIndex][ind].items[i].degColumns[j].name == degColumns.name &&
            this.entryGridArr[gIndex][ind].items[i].degColumns[j].tabindex == degColumns.tabindex
          ) {
            if (this.entryGridArr[gIndex][ind].items[i].degColumns[j].type == "checkbox") {
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].value1 = event.target.checked;
              this.entryGridArr[gIndex][ind].items[i].degColumns[j].value = event.target.checked;
            }
          }
        }
      }
    }

    this.buttonEnabled = false;

    sessionStorage.setItem("entryGridDataArr", JSON.stringify(this.entryGridArr));
  }
  getDelete(hexKey: any, id: any, isDelete?: any, dataIndex?: any) {
    this.callAppend = false;
    this.functionCall = false;
    let ind = 0;

    let gridIndex = 0;

    if (sessionStorage.getItem("entryGridDataArr") !== undefined && sessionStorage.getItem("entryGridDataArr") !== "") {
      this.entryGridArr = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
    }

    const findgridRef = JSON.parse(sessionStorage.getItem("gridRefNumber"));
    gridIndex = findgridRef.indexOf(dataIndex);
    if (hexKey !== "" && id !== undefined) {
      ind = this.entryGridArr[gridIndex].findIndex((x) => x.id == id && x.dataIndex == dataIndex);
      this.DeletedRows = this.DeletedRows + 1;
      this.entryGridArr[gridIndex][ind].isDeleted = true;
      if (this.undeleteButton !== undefined) {
        this.undeleteButton.text = this.DeletedButtonText + " (" + this.DeletedRows + ") ";
        this.undeleteButton.dataIndex = dataIndex;
        this.undeleteButton.isDisabled = false;
      }
      this.itemInquiryBody = this.entryGridArr[gridIndex];
    } else if (hexKey !== "" && id == undefined) {
      ind = this.entryGridArr[gridIndex].findIndex((x) => x.hexkey == hexKey && x.dataIndex == dataIndex);
      this.DeletedRows = this.DeletedRows + 1;
      this.entryGridArr[gridIndex][ind].isDeleted = true;
      if (this.undeleteButton !== undefined) {
        this.undeleteButton.text = this.DeletedButtonText + " (" + this.DeletedRows + ") ";
        this.undeleteButton.dataIndex = dataIndex;
        this.undeleteButton.isDisabled = false;
      }
      this.itemInquiryBody = this.entryGridArr[gridIndex];
    } else if (
      hexKey == "" &&
      id !== "" &&
      id !== undefined &&
      this.entryGridArr[gridIndex] !== undefined &&
      this.entryGridArr[gridIndex].length > 0
    ) {
      ind = this.entryGridArr[gridIndex].findIndex((x) => x.id == id && x.dataIndex == dataIndex);

      if (isDelete) {
        this.entryGridArr[gridIndex].splice(ind, 1);
      } else {
        this.DeletedRows = this.DeletedRows + 1;
        this.entryGridArr[gridIndex][ind].isDeleted = true;
        if (this.undeleteButton !== undefined) {
          this.undeleteButton.text = this.DeletedButtonText + " (" + this.DeletedRows + ") ";
          this.undeleteButton.dataIndex = dataIndex;
          this.undeleteButton.isDisabled = false;
        }
      }
      this.itemInquiryBody = this.entryGridArr[gridIndex];
    }

    // TO SAVE DATA BY CLICKING SAVE BUTTON

    sessionStorage.setItem("entryGridDataArr", JSON.stringify(this.entryGridArr));
    // FOR UNDELETE FUNCTIONALITY

    this.deleteId.push({ id: id, gridIndex: gridIndex });
    const nextRow = ind + 1;
    let elementFound: boolean = false;
    if (this.entryGridArr[gridIndex][nextRow] !== undefined) {
      for (let i = 0; i < this.entryGridArr[gridIndex][nextRow].items.length; i++) {
        if (elementFound) {
          break;
        } else {
          for (let j = 0; j < this.entryGridArr[gridIndex][nextRow].items[i].degColumns.length; j++) {
            if (
              this.entryGridArr[gridIndex][nextRow].items[i].degColumns !== undefined &&
              this.entryGridArr[gridIndex][nextRow].items[i].degColumns[j] !== undefined &&
              this.entryGridArr[gridIndex][nextRow].items[i].degColumns[j].type !== undefined &&
              this.entryGridArr[gridIndex][nextRow].items[i].degColumns[j].type !== "hidden"
            ) {
              this.entryGridArr[gridIndex][nextRow].items[i].degColumns[j].focus = true;
              elementFound = true;
              break;
            }
          }
        }
      }
    }
  }

  unDeleteRow(dataIndex?: string) {
    let gridIndex = 0;
    if (sessionStorage.getItem("entryGridDataArr") !== undefined && sessionStorage.getItem("entryGridDataArr") !== "") {
      this.entryGridArr = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
    }
    const findgridRef = JSON.parse(sessionStorage.getItem("gridRefNumber"));
    gridIndex = findgridRef.indexOf(dataIndex);

    for (let i = 0; i < this.entryGridArr[gridIndex].length; i++) {
      for (let j = 0; j < this.deleteId.length; j++) {
        if (this.entryGridArr[gridIndex][i].id == this.deleteId[j].id && this.deleteId[j].gridIndex == gridIndex) {
          this.entryGridArr[gridIndex][i].isDeleted = false;
        }
      }
    }

    this.itemInquiryBody = this.entryGridArr[gridIndex];
    this.DeletedRows = 0;

    if (this.undeleteButton !== undefined) {
      this.undeleteButton.text = this.DeletedButtonText;
      this.undeleteButton.isDisabled = true;
    }
    sessionStorage.setItem("entryGridDataArr", JSON.stringify(this.entryGridArr));
  }

  drop(event: CdkDragDrop<string[]>, dataIndex?: string) {
    let gridIndex = 0;
    this.getDataGrid = false;
    const findgridRef = JSON.parse(sessionStorage.getItem("gridRefNumber"));
    gridIndex = findgridRef.indexOf(dataIndex);
    if (sessionStorage.getItem("entryGridDataArr") !== undefined && sessionStorage.getItem("entryGridDataArr") !== "") {
      this.entryGridArr = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
    }

    // check if items is not defined remove that element
    const indexRemove = this.entryGridArr[0].findIndex((x) => x.items == undefined);
    if (indexRemove >= 0) {
      this.entryGridArr[gridIndex].splice(indexRemove, 1);
    }
    moveItemInArray(this.entryGridArr[gridIndex], event.previousIndex, event.currentIndex);

    const controlNum = this.calculateTabindex(this.entryGridArr[gridIndex]);

    this.reassignTabindex(controlNum, gridIndex, this.entryGridArr[gridIndex]);
  }

  calculateTabindex(itemInquiryBody: any) {
    let tabIndex = 0;
    for (let i = 0; i < itemInquiryBody.length; i++) {
      if (itemInquiryBody[i].items !== undefined) {
        for (let j = 0; j < itemInquiryBody[i].items.length; j++) {
          if (
            itemInquiryBody[i].items[j].degColumns[0].type !== undefined &&
            itemInquiryBody[i].items[j].degColumns[0].type !== "hidden" &&
            itemInquiryBody[i].items[j].degColumns[0].tabindex !== undefined &&
            itemInquiryBody[i].items[j].degColumns[0].tabindex > 0
          ) {
            tabIndex = itemInquiryBody[i].items[j].degColumns[0].tabindex;
            return tabIndex;
          }
        }
      }
    }
  }

  reassignTabindex(controlNum: any, gridIndex: number, itemInquiryBody: any) {
    let customTabIndex = 0;
    const viewIdToUse = controlNum.toString().substr(0, 1);
    let k = 0;
    for (let i = 0; i < itemInquiryBody.length; i++) {
      if (itemInquiryBody[i].items !== undefined) {
        for (let j = 0; j < itemInquiryBody[i].items.length; j++) {
          if (itemInquiryBody[i].items[j].degColumns[0].type !== undefined && itemInquiryBody[i].items[j].degColumns[0].type !== "hidden") {
            k++;
            if (k + 1 <= 10) {
              customTabIndex = Number("1" + viewIdToUse + "00" + k);
            } else if (k + 1 > 10 && k + 1 <= 100) {
              customTabIndex = Number("1" + viewIdToUse + "0" + k);
            } else {
              customTabIndex = Number("1" + viewIdToUse + k);
            }

            itemInquiryBody[i].items[j].degColumns[0].tabindex = customTabIndex;
            itemInquiryBody[i].items[j].degColumns[0].id = customTabIndex;
          }
        }
      }
    }

    this.itemInquiryBody = this.entryGridArr[gridIndex];
    this.detectChangeEntryGrid = true;
    sessionStorage.setItem("detectChangeEntryGrid", JSON.stringify(this.detectChangeEntryGrid));
    sessionStorage.setItem("entryGridDataArr", JSON.stringify(this.entryGridArr));
  }

  openFile(apicollink, value) {
    this.editGrid.openFile(apicollink, value).subscribe(
      (response: any) => {
        this.loader = environment.displayNone;
        if (response == null) {
          return false;
        } else {
          for (let k = 0; k < response.data.length; k++) {
            if (response.data[k].type == "pageInit") {
            } else if (response.data[k].type == "action") {
              this.handleAction(response.data[k]);
            } else if (response.data[k].type == "notify") {
              if (response.data[k].redirectUrl != undefined && response.data[k].redirectUrl) {
                window.location.href = response.data[k].redirectUrl;
                return;
              }
              this.handleNotify(response.data[k]);
            }
          }
        }
      },
      (error) => this.handleError(error)
    );
  }
  // ADDED TO HANDLE TRASH ICON
  displayGridData(dataIndex: string) {
    this.displayGridCheckBoxData = [];

    let gridIndex = 0;

    if (sessionStorage.getItem("entryGridDataArr") !== undefined && sessionStorage.getItem("entryGridDataArr") !== "") {
      this.entryGridArr = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
    }

    const findgridRef = JSON.parse(sessionStorage.getItem("gridRefNumber"));
    gridIndex = findgridRef.indexOf(dataIndex);

    for (let i = 0; i < this.entryGridArr[gridIndex].length; i++) {
      for (let j = 0; j < this.entryGridArr[gridIndex][i].items.length; j++) {
        if (
          this.entryGridArr[gridIndex][i].items[j].degColumns[0].type == "checkbox" &&
          this.entryGridArr[gridIndex][i].items[j].degColumns[0].value == true &&
          this.entryGridArr[gridIndex][i].items[j].degColumns[0].value1 == true
        ) {
          this.displayGridCheckBoxData.push(this.entryGridArr[gridIndex][i].hexkey);
        }
      }
    }
  }

  checkAllCheckBox(event: any, dataIndex: string) {
    //  event.target.checked
    let gridIndex = 0;

    if (sessionStorage.getItem("entryGridDataArr") !== undefined && sessionStorage.getItem("entryGridDataArr") !== "") {
      this.entryGridArr = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
    }

    const findgridRef = JSON.parse(sessionStorage.getItem("gridRefNumber"));
    gridIndex = findgridRef.indexOf(dataIndex);
    for (let i = 0; i < this.entryGridArr[gridIndex].length; i++) {
      for (let j = 0; j < this.entryGridArr[gridIndex][i].items.length; j++) {
        if (this.entryGridArr[gridIndex][i].items[j].degColumns[0].type == "checkbox") {
          this.entryGridArr[gridIndex][i].items[j].degColumns[0].value = event.target.checked;
          this.entryGridArr[gridIndex][i].items[j].degColumns[0].value1 = event.target.checked;
          if (event.target.checked == false) {
            this.hexKeyarray = [];
          } else {
            this.hexKeyarray.push(this.entryGridArr[gridIndex][i].items[j].degColumns[0].hexkey);
          }
        }
      }
    }
    this.setValueItemInquiry(gridIndex);
  }

  setValueItemInquiry(gridIndex: number) {
    for (let i = 0; i < this.itemInquiryBody.length; i++) {
      for (let j = 0; j < this.itemInquiryBody[i].items.length; j++) {
        for (let k = 0; k < this.entryGridArr[gridIndex].length; k++) {
          for (let l = 0; l < this.entryGridArr[gridIndex][k].items.length; l++) {
            if (
              this.itemInquiryBody[i].items[j].degColumns[0].name == this.entryGridArr[gridIndex][k].items[l].degColumns[0].name &&
              this.itemInquiryBody[i].items[j].degColumns[0].id == this.entryGridArr[gridIndex][k].items[l].degColumns[0].id &&
              (this.itemInquiryBody[i].items[j].degColumns[0].type == "checkbox" || this.itemInquiryBody[i].items[j].degColumns[0].type == "date")
            ) {
              this.itemInquiryBody[i].items[j].degColumns[0].value = this.entryGridArr[gridIndex][k].items[l].degColumns[0].value;
              this.itemInquiryBody[i].items[j].degColumns[0].value1 = this.entryGridArr[gridIndex][k].items[l].degColumns[0].value1;
              this.itemInquiryBody[i].items[j].degColumns[0].isValid =
                this.entryGridArr[gridIndex][k].items[l].degColumns[0].isValid !== undefined
                  ? this.entryGridArr[gridIndex][k].items[l].degColumns[0].isValid
                  : true;
              // SET FOCUS on next CONTROL
              if (
                this.itemInquiryBody[i].items[j].degColumns[0].isValid &&
                this.itemInquiryBody[i].items[j + 1] !== undefined &&
                this.itemInquiryBody[i].items[j + 1].degColumns[0] !== undefined
              ) {
                this.itemInquiryBody[i].items[j + 1].degColumns[0].focus = true;
              }
            }
          }
        }
      }
    }
    sessionStorage.setItem("entryGridDataArr", JSON.stringify(this.entryGridArr));
  }

  handleAction(response: any) {
    this.getDataGrid = false;
    if (response.url.includes("http")) {
      if (response.newPage) {
        window.open(response.url, "_blank");
      } else {
        window.open(response.url, "_self");
      }
    } else if (window.location.hostname == "localhost" && !response.url.includes("http")) {
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
  handleNotify(response) {
    if (response.alert !== undefined || response.msg !== undefined) {
      this.setmessage = response;
    }
  }

  openFromIcon(timepicker: { open: () => void }) {
    timepicker.open();
  }

  handleError(error: any) {
    this.getDataGrid = false;
    this.loader = environment.displayNone;
    if (error.error !== undefined && error.error.data !== undefined) {
      for (let i = 0; i < error.error.data.length; i++) {
        if (error.error.data[i].type == "notify") {
          this.handleNotify(error.error.data[i]);
        }
      }
    } else if (error.name !== undefined && error.name == "HttpErrorResponse" && error.status == 0 && error.statusText == "Unknown Error") {
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

  ////// Delect checked file//////
  deleteSelectedFile(api: any) {
    this._dynamoService.DeleteByhexkey(api, this.hexKeyarray).subscribe(
      (response) => {
        this.setDeletedData = true;
        this.loader = environment.displayNone;
        this.showBusyText = "";
        if (response == null) {
          return false;
        } else {
          this.handleSubmitEditGrid.emit({
            response: response,
            gridRefNo: "",
            url: true,
            setDeletedData: this.setDeletedData,
          });
        }
      },
      (error) => this.handleError(error)
    );
  }
  searchByClient(e) {
    const filterString = e.target.value.toLowerCase();

    // UNSET ELEMENT FOCUS
    const grid = this.itemInquiryBody;
    let selectedCount = 0;

    for (const rowIndex in grid) {
      const row = grid[rowIndex];
      let chosen = false;
      if (row.items) {
        for (const item of row.items) {
          for (const col of item.degColumns) {
            if (
              ((col.type == "text" || col.type == "") && col.value.toLowerCase().includes(filterString)) ||
              (col.type == "number" && col.value.toString().toLowerCase().includes(filterString)) ||
              (col.type == "date" && new Date(col.value).toLocaleDateString().includes(filterString)) ||
              (col.type == "switch" && col.value == true && col.name.toLowerCase().includes(filterString))
            ) {
              chosen = true;
              break;
            } else if ((col.type == "select" || col.type == "radio") && col.value != "") {
              const ind = (col.options as Array<any>).findIndex((option) => option.value == col.value);
              if (col.options[ind].show.toLowerCase().includes(filterString)) {
                chosen = true;
                break;
              }
            }
          }
          if (chosen == true) {
            break;
          }
        }
      }

      if (chosen == true) {
        this.itemInquiryBody[rowIndex].hidden = false;
        selectedCount++;
      } else {
        this.itemInquiryBody[rowIndex].hidden = true;
      }
    }
    this.itemInquiryFilteredBody = JSON.parse(JSON.stringify(this.itemInquiryBody));

    if (this.clientPagination) {
      this.currentPage = 1;
      this.totalRows = selectedCount;
      this.totalPages = Math.ceil(selectedCount / this.rowsPerPage);
      this.entryGridNavigation = {
        getFirstPageAPI: this.currentPage > 1 ? "first" : undefined,
        getNextPageAPI: this.totalPages > this.currentPage ? "next" : undefined,
        getLastPageAPI: this.totalPages > this.currentPage ? "last" : undefined,
        getPrevPageAPI: this.currentPage > 1 ? "prev" : undefined,
      };
      this.updateClientPage();
    }
  }
}
