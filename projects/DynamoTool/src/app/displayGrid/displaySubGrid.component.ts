import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import { OrderPipe } from "ngx-order-pipe";
import { toast } from "angular2-materialize";
import { DynamoToolShareService } from "../../app/dynamoToolHome/dynamoToolShare.service";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { environment } from "../../environments/environment";
@Component({
  selector: "app-displaysubgrid",
  templateUrl: "./displaySubGrid.component.html",
  styleUrls: ["./displaySubGrid.component.scss"],
  providers: [OrderPipe, DynamoToolShareService],
})
export class DisplaySubGridComponent {
  p = 1;
  totalPage: number;
  dispPagination = "none";
  tableclass: string;
  cssColor: string;
  itemInquiryHead: any;
  showSearch: boolean = false;
  itemInquiryHead2: any = [];
  itemInquiryBody: any;
  bodyForShow: any;
  datatable: boolean = false;
  statusMessage: string;
  loader: string;
  filterText: string;
  inquiryTitle: string;
  showLoader: boolean = false;
  selectedRow: Number;
  setClickedRow: Function;
  responsedata: any;
  order = "items.name";
  reverse = false;
  navigation: any;
  imageOrder: string;
  sortedCollection: any[];
  checkedList = [];
  rowspan: boolean = false;
  colspan: boolean = false;
  isCheckAll: boolean;
  isTitle: boolean;
  serverName: any;
  pageName: string = "";
  number = 0;
  baseUrl = environment.baseUrl;
  closeOnRowSelect: boolean = false;
  footer: string = "";
  gridWidth: any; // ADDED 12 NOV 2021
  windowsWidth: any;
  fl: boolean = false;
  // dtTrigger: Subject<any> = new Subject<any>();
  constructor(private ElByClassName: ElementRef, private orderPipe: OrderPipe, private _dtShareService: DynamoToolShareService) {
    this.windowsWidth = JSON.parse(sessionStorage.getItem("windowsWidth"));
  }
  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;

  dtOptions: DataTables.Settings = {
    lengthChange: true,
    searching: true,
  };

  gridNavigation: any;
  rowsPerPage: number = 10;
  currentPage: number = 1;
  totalRows: number = 0;
  totalPages: number = 0;

  dtTrigger: Subject<any> = new Subject<any>();
  @Output() sendData: EventEmitter<any> = new EventEmitter();
  @Output() sendMessage: EventEmitter<any> = new EventEmitter();
  @Input()
  set greetSubresponse(response: any) {
    this.itemInquiryBody = null;
    this.itemInquiryHead = null;
    this.responsedata = null;
    this.selectedRow = -1;
    if (response === undefined) {
      return;
    } else if (response !== undefined || response !== null) {
      this.bindResponse(response);
    }
  }

  @Input()
  set setPageName(res) {
    if (res == undefined) {
    } else {
      res = res;
      this.pageName = res;
    }
  }
  @Input()
  set searchData(response: string) {
    if (response === undefined) {
      return;
    } else {
      this.filterText = response;
    }
  }

  //// Bind the api response//////////
  bindResponse(response) {
    this.showLoader = true;
    this.itemInquiryHead2 = [];
    if (response === undefined || response === null || response.head === undefined || response.head === null) {
      return;
    } else {
      this.isCheckAll = false;
      this.checkedList = [];
      this.itemInquiryHead = response.head;
      if (this.itemInquiryHead) {
        for (let i = 0; i < this.itemInquiryHead.length; i++) {
          this.itemInquiryHead2.push(this.itemInquiryHead[i].title);
        }
      }
      this.tableclass = response.tableclass;
      this.inquiryTitle = response.title;
      this.footer = response.footer;
      this.navigation = response.navigation;

      let showNavigation = false;
      let setSortable = false;
      this.showSearch = false;
      this.datatable = false;

      if (response.isSortable == true) {
        // this.datatable = true;
        setSortable = true;
      }
      if (response.clientPagination) {
        // this.datatable = true;
        if (response.isSearchable == true) {
          // this.datatable = true;
          this.showSearch = true;
        }
        showNavigation = true;
        this.rowsPerPage = response.rowsPerPage;
        this.currentPage = 1;
        this.totalRows = response.body.length;
        this.totalPages = Math.ceil(this.totalRows / this.rowsPerPage);

        this.gridNavigation = {
          getFirstPageAPI: undefined,
          getNextPageAPI: this.totalPages > this.currentPage ? "next" : undefined,
          getLastPageAPI: this.totalPages > this.currentPage ? "last" : undefined,
          getPrevPageAPI: undefined,
        };
      }

      this.dtOptions = {
        pagingType: showNavigation && "full_numbers",
        pageLength: showNavigation && response.rowsPerPage,
        paging: showNavigation,
        searching: this.showSearch,
        ordering: setSortable,
        info: true,
        processing: true,
      };

      let number;
      this.gridWidth = response.width;
      for (let p = 0; p < response.head.length; p++) {
        if (response.head[p].type === "hidden") {
          number = p;
        } else if (response.head[p].preSorted === "descending") {
          this.reverse = false;
          this.imageOrder = response.head[p].title;
        } else if (response.head[p].preSorted === "ascending") {
          this.reverse = true;
          this.imageOrder = response.head[p].title;
        }
      }
      const mdata = [];
      let s = 0;
      let col = 0;
      for (let i = 0; i < response.body.length; i++) {
        const data = [];
        for (let j = 0; j < response.body[i].columns.length; j++) {
          if (response.body[i].columns[j].rowspan && s == 0) {
            s++;
            this.rowspan = true;
          }
          if (response.body[i].columns[j].colspan && col == 0) {
            col++;
            this.colspan = true;
          }
          const cols = {
            name: this.bindValue(
              response.body[i].columns[j],
              response.head[j],
              response.body[i].columns[number],
              response.head[number],
              response.body[i].hexkey,
              response.body.length
            ),
            hexkey: response.body[i].hexkey,
            apicollink: response.head[j].apicollink,
            radioButtonApi: response.head[j].radioButtonApi,
            radioButtonValue: response.body[i].columns[j].radioButtonValue === undefined ? "" : response.body[i].columns[j].radioButtonValue,
            value: response.body[i].columns[j].value,
            imageValue: response.body[i].columns[j].value,
            imageType: response.body[i].columns[j].type,
            width: response.body[i].columns[j].width,
            imagePath: response.body[i].columns[j].path,
            rowspan: response.body[i].columns[j].rowspan,
            colspan: response.body[i].columns[j].colspan,
            cellclass: response.body[i].columns[j].cellclass,
            type: response.head[j].type,
            apiRowSelect: response.apiRowSelect,
            selected: response.body[i].selected ? true : false,
            checked: j === 0 ? true : false,
            link: response.body[i].columns[j].link,
          };
          data.push(cols);
        }
        const mcols = {
          items: data,
        };
        mdata.push(mcols);
      }
      // if (response.clientPagination) {
      //     this.totalPage = 20;
      //     this.dispPagination = 'block';
      // } else {
      //     this.totalPage = mdata.length;
      //     this.dispPagination = 'none';
      // }
      this.responsedata = response;
      this.itemInquiryBody = JSON.parse(JSON.stringify(mdata));
      this.bodyForShow = JSON.parse(JSON.stringify(mdata));
      this.sortedCollection = this.orderPipe.transform(this.itemInquiryBody, "info.name");
      this.showLoader = false;
      if (response.clientPagination) {
        this.updateClientPage();
      }
    }
    this._dtShareService.setHexkey(this.checkedList);
  }

  ///// Search by Client//////

  searchByClient(e, coloumn) {
    const filterString = e.target.value.toLowerCase();
    let selectedCount = 0;

    for (let index in this.itemInquiryBody) {
      let chosen = false;
      for (let item of this.itemInquiryBody[index].items) {
        if (item.name.value.toLowerCase().includes(filterString)) {
          chosen = true;
          break;
        }
      }
      if (chosen) {
        this.itemInquiryBody[index].hidden = false;
        selectedCount++;
      } else {
        this.itemInquiryBody[index].hidden = true;
      }
    }

    if (this.dtOptions.paging) {
      this.currentPage = 1;
      this.totalRows = selectedCount;
      this.totalPages = Math.ceil(selectedCount / this.rowsPerPage);
      this.gridNavigation = {
        getFirstPageAPI: this.currentPage > 1 ? "first" : undefined,
        getNextPageAPI: this.totalPages > this.currentPage ? "next" : undefined,
        getLastPageAPI: this.totalPages > this.currentPage ? "last" : undefined,
        getPrevPageAPI: this.currentPage > 1 ? "prev" : undefined,
      };

      this.updateClientPage();
    }
  }

  sortByClient(e, index) {
    if (this.imageOrder == e) {
      this.reverse = !this.reverse;
    } else {
      this.reverse = false;
    }

    this.imageOrder = e;

    this.itemInquiryBody.sort((row1, row2) => {
      if (row1.items[index].name.value > row2.items[index].name.value) return !this.reverse ? 1 : -1;
      else if (row1.items[index].name.value < row2.items[index].name.value) return !this.reverse ? -1 : 1;
      else return 0;
    });

    if (this.dtOptions.paging) {
      this.currentPage = 1;
      this.gridNavigation = {
        getFirstPageAPI: this.currentPage > 1 ? "first" : undefined,
        getNextPageAPI: this.totalPages > this.currentPage ? "next" : undefined,
        getLastPageAPI: this.totalPages > this.currentPage ? "last" : undefined,
        getPrevPageAPI: this.currentPage > 1 ? "prev" : undefined,
      };

      this.updateClientPage();
    }
  }

  clientPageChange(event) {
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

    this.gridNavigation = {
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

    this.bodyForShow = JSON.parse(JSON.stringify(this.itemInquiryBody));

    rows = this.itemInquiryBody;
    for (let index = 0; index < rows.length; index++) {
      if (rows[index].hidden != true) {
        count++;
        if (count < startRow || count > endRow) {
          this.bodyForShow[index].hidden = true;
        } else {
          this.bodyForShow[index].hidden = false;
        }
      } else {
        this.bodyForShow[index].hidden = true;
      }
    }
  }

  ///// Search by server//////

  searchByServer(): void {
    alert("Under Processing");
  }

  //////////// Bind Value////////////

  bindValue(value, type, url, openPage, hexkey?, count?) {
    if (value.value !== undefined) {
      if (type.type === "hidden") {
        const cols = {
          url: value.value,
          type: "hidden",
          openPage: openPage === undefined ? null : openPage.openPage,
        };
        return cols;
      } else {
        const cols = {
          value: value.value,
          url: url,
          openPage: openPage === undefined ? null : openPage.openPage,
        };
        return cols;
      }
    } else if (value.value === undefined) {
      if (value.checked) {
        // added
        this.number++;
        this.checkedList.push(hexkey);
      }
      const cols = {
        checked: value.checked,
        readonly: value.readonly,
        valued: value.checked === undefined ? "" : type.type,
      };
      if (this.number === count) {
        // added
        this.isCheckAll = true;
      }
      return cols;
    }
  }

  //////// Get Innventry receipt/////

  getIventoryReceipt(url: string, hexKey: string, index) {
    // ADDED
    const cols = {
      url: url,
      hexKey: hexKey,
      closeOnRowSelect: "",
    };
    // this.itemInquiryBody = null;
    this.selectedRow = index;
    this.itemInquiryHead = this.responsedata.head;
    this.tableclass = this.responsedata.tableclass;
    this.inquiryTitle = this.responsedata.title;
    this.footer = this.responsedata.footer;
    this.closeOnRowSelect = this.responsedata.closeOnRowSelect !== undefined ? this.responsedata.closeOnRowSelect : false;
    let number;
    for (let p = 0; p < this.responsedata.head.length; p++) {
      if (this.responsedata.head[p].type === "hidden") {
        number = p;
      }
    }
    const mdata = [];
    for (let i = 0; i < this.responsedata.body.length; i++) {
      const data = [];
      for (let j = 0; j < this.responsedata.body[i].columns.length; j++) {
        const cols1 = {
          name: this.bindValue(
            this.responsedata.body[i].columns[j],
            this.responsedata.head[j],
            this.responsedata.body[i].columns[number],
            this.responsedata.head[number],
            this.responsedata.body[i].hexkey,
            this.responsedata.body.length
          ),
          hexkey: this.responsedata.body[i].hexkey,
          apicollink: this.responsedata.head[j].apicollink,
          apiRowSelect: this.responsedata.apiRowSelect,
          selected: false,
        };
        data.push(cols1);
      }
      const mcols = {
        items: data,
      };
      mdata.push(mcols);
    }

    // this.itemInquiryBody = "";
    cols.closeOnRowSelect = JSON.stringify(this.closeOnRowSelect);
    this.sendData.emit(cols);
  }

  ///////////// Set order descending and ascending/////

  setOrder(hederevent) {
    this.isCheckAll = false;
    this.checkedList = [];
    if (hederevent.preSorted === "descending") {
      this.reverse = false;
    } else if (hederevent.preSorted === "ascending") {
      this.reverse = true;
    } else if (hederevent.preSorted === undefined) {
      this.reverse = false;
    }
    if (hederevent.sortable) {
      this.imageOrder = hederevent.title;
      this.reverse = !this.reverse;
      const cols = {
        sortUp: hederevent.sortUp,
        sortDown: hederevent.sortDown,
        reverse: this.reverse,
      };
      this.sendMessage.emit(cols);
    } else {
      return false;
    }
  }

  //////////// Check all when click checkbox//////

  checkAll(event) {
    this.isTitle = true;
    this.checkedList = [];

    let number;
    for (let p = 0; p < this.responsedata.head.length; p++) {
      if (this.responsedata.head[p].type === "hidden") {
        number = p;
      }
    }
    const mdata = [];
    for (let i = 0; i < this.responsedata.body.length; i++) {
      const data = [];
      for (let j = 0; j < this.responsedata.body[i].columns.length; j++) {
        const cols = {
          name: this.bindValueChecked(
            this.responsedata.body[i].columns[j],
            this.responsedata.head[j],
            event.target.checked ? true : false,
            this.responsedata.body[i].columns[number],
            this.responsedata.head[number]
          ),
          hexkey: this.responsedata.body[i].hexkey,
          apicollink: this.responsedata.head[j].apicollink,
          apiRowSelect: this.responsedata.apiRowSelect,
          selected: false,
          link: this.responsedata.body[i].columns[j].link,
        };
        data.push(cols);
      }
      if (event.target.checked) {
        if (!this.responsedata.body[i].columns[this.responsedata.body[i].columns.length - 1].readonly) {
          // 13032020
          // if (!this.responsedata.body[i].columns[3].readonly) {
          this.checkedList.push(this.itemInquiryBody[i].items[0].hexkey);
        }
      }
      const mcols = {
        items: data,
      };
      mdata.push(mcols);
    }
    this.itemInquiryBody = mdata;

    this.sendData.emit(this.checkedList); // added 24 june
  }

  ////////// Bind Checked value////////////
  bindValueChecked(value, type, checked, url, openPage) {
    if (value.value !== undefined) {
      if (type.type === "hidden") {
        const cols = {
          url: value.value,
          type: "hidden",
          openPage: openPage === undefined ? null : openPage.openPage,
        };
        return cols;
      } else {
        const cols = {
          value: value.value,
          url: url,
          openPage: openPage === undefined ? null : openPage.openPage,
        };
        return cols;
      }
    } else if (value.value === undefined) {
      const cols = {
        checked: value.readonly ? "" : checked,
        readonly: value.readonly,
        valued: value.checked === undefined ? "" : type.type,
      };
      return cols;
    }
  }
  ///////// Change the checkbox////////

  onCheckboxChange(itemData, event) {
    if (event.target.checked) {
      this.checkedList.push(itemData.hexkey);
    } else {
      for (let i = 0; i < this.itemInquiryBody.length; i++) {
        if (this.checkedList[i] === itemData.hexkey) {
          this.checkedList.splice(i, 1);
          if (this.checkedList.length === 0) {
            this.isCheckAll = false;
          } else {
            this.isCheckAll = true;
          }
        }
      }
    }
    if (this.itemInquiryBody.length === this.checkedList.length) {
      this.isCheckAll = true;
    } else {
      this.isCheckAll = false;
    }

    this.sendData.emit(this.checkedList);
  }

  ////// Print report when click print button//////////////////
  printReport(url, hexkey) {
    if (url.url !== undefined && url.openPage) {
      if (url.url.value.includes("http")) {
        window.open(url.url.value);
      } else {
        if (window.location.hostname === "localhost") {
          this.serverName = "https://info.ncdsinc.com";
        } else {
          this.serverName = window.location.origin;
        }
        window.open(this.serverName + url.url.value);
      }
    } else {
      this.sendData.emit(hexkey);
    }
  }

  ///// Open choose file dialog box/////////
  openUploadedFile(fileurl) {
    window.open(fileurl);
  }

  /////// Delete selected checkbox data/////////
  deleteCheckedData(checkBoxApi) {
    if (this.checkedList.length < 1) {
      toast("please select any one from list", Number(sessionStorage.getItem("toastTimeOut")));
      return false;
    }
    const cols = {
      checkedList: this.checkedList,
      checkBoxApi: checkBoxApi,
      hexKey: this.checkedList, // 12032020,
      url: checkBoxApi,
      IsHDelete: true, // 12032020
    };
    this.sendData.emit(cols);
  }

  //////////// Change the redio button value///////////
  onRadioChange(value) {
    const cols = {
      api: value.radioButtonApi + value.radioButtonValue,
      deposilLog: true,
    };
    this.sendData.emit(cols);
  }
}
