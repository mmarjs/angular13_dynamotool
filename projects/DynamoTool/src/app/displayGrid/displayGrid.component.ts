import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
// import 'materialize-css';
import { toast } from 'angular2-materialize';
import { environment } from 'projects/DynamoTool/src/environments/environment.prod';
import { FileType } from 'projects/DynamoTool/src/app/shared/constantFile';

@Component({
  selector: 'app-displaygrid',
  templateUrl: './displayGrid.component.html',
  styleUrls: ['./displaySubGrid.component.scss']
})

export class DisplayGridComponent {

  constructor(private _router: Router) { }
  tableclass = '';
  cssColor: string;
  itemInquiryHead: any;
  itemInquiryBody: any;
  statusMessage: string;
  loader: string;
  filterText: string;
  search: string;
  title: string;
  companyName: string;
  setcolor: string;
  selectedName: string;
  showheading: string;
  inquiryTitle = '';
  nativeWindow: any;
  checkedList = [];
  isCheckAll: boolean;
  responsedata: any;
  number = 0;
  indexnumber: number;
  jIndexNumber: number;
  pageName: string = '';

  @Output() sendData: EventEmitter<any> = new EventEmitter();
  @Output() selectedIndex: EventEmitter<any> = new EventEmitter();
  @Input() staticdata: string;

  @Input()
  set sendPrm(response: string) {

    if (response === undefined) {
      return;
    } else {
      this.title = response.split('#')[0];
      this.search = response.split('#')[1];
      this.companyName = response.split('#')[2];
      this.showheading = response.split('#')[3];
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

  @Input()
  set greetresponse(response: any) {
    this.itemInquiryBody = null;
    this.itemInquiryHead = null;
    this.tableclass = '';
    this.inquiryTitle = '';
    if (response === undefined || response === null || response.length === 0) {
      return;
    } else if (response.head === undefined) {
      this.itemInquiryBody = response;
    } else {


      this.isCheckAll = false;
      this.checkedList = [];
      this.itemInquiryHead = null;
      this.tableclass = '';
      this.inquiryTitle = '';
      this.itemInquiryHead = response.head;
      this.tableclass = response.tableclass;
      this.inquiryTitle = response.title;

      const mdata = [];

      for (let i = 0; i < response.body.length; i++) {

        const data = [];

        for (let j = 0; j < response.body[i].columns.length; j++) {
          const cols = {
            // name: response.body[i].columns[j].value,
            name: this.bindValue(response.body[i].columns[j], response.head[j], response.body.length, response.body[i].hexkey),
            value: response.body[i].columns[j].value,
            cellclass: response.body[i].columns[j].cellclass,
            head: response.head[j].title,
            readonly: response.head[j].readonly,
            itemNo: response.body[i].columns[0].value,
            align: response.head[j].align,
            hexkey: response.body[i].hexkey,
            apicollink: response.head[j].apicollink,
            cellIndex: i + '' + j,
            checked: j === 0 ? true : false
          };
          data.push(cols);
          if (response.body[i].columns[j].selected) {
            this.setcolor = '#FFFFCC';
            this.selectedName = i.toString() + j.toString();
            this.indexnumber = i;
            this.jIndexNumber = j;
          }
        }

        const mcols = {
          items: data
        };

        mdata.push(mcols);
      }
      //   this.loader = 'none';
      this.responsedata = response;
      this.itemInquiryBody = mdata;
      if (this.indexnumber !== undefined) {
        const cols = {
          color: mdata[this.indexnumber],
          head: mdata[this.indexnumber].items[this.jIndexNumber],
          index: this.indexnumber,
          event: event,
          userColorbody: mdata
        };
        this.selectedIndex.emit(cols);

      }
    }
  }

  @Input()
  set setPageName(res) {

    if (res == undefined) {
    }
    else {
      res = res;
      this.pageName = res;
    }
  }
  bindValue(value, type, count, hexkey) {

    if (value.value === undefined) {

      if (value.checked) {
        this.number++;
        this.checkedList.push(hexkey);
      }
      const cols = {
        checked: value.checked,
        readonly: value.readonly,
        type: value.checked === undefined ? '' : type.type
      };
      if (this.number === count) {
        this.isCheckAll = true;
      }
      return cols;
    } else {
      const cols = {
        value: value.value,
        type: ''
      };
      return cols;
    }
  }
  bindValueChecked(value, type, checked) {
    if (value.value === undefined) {
      const cols = {
        checked: value.readonly ? '' : checked,
        readonly: value.readonly,
        type: value.checked === undefined ? '' : type.type
      };
      return cols;
    } else {
      const cols = {
        value: value.value,
        type: ''
      };
      return cols;
    }
  }
  onCheckboxFilterChange(itemData, event) {

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

  checkAllFilter(event) {

    this.checkedList = [];
    const mdata = [];

    for (let i = 0; i < this.responsedata.body.length; i++) {
      const data = [];
      for (let j = 0; j < this.responsedata.body[i].columns.length; j++) {
        const cols = {
          name: this.bindValueChecked(this.responsedata.body[i].columns[j], this.responsedata.head[j], event.target.checked ? true : false),
          value: this.responsedata.body[i].columns[j].value,
          head: this.responsedata.head[j].title,
          readonly: this.responsedata.head[j].readonly,
          itemNo: this.responsedata.body[i].columns[0].value,
          align: this.responsedata.head[j].align,
          hexkey: this.responsedata.body[i].hexkey,
          apicollink: this.responsedata.head[j].apicollink,
          cellIndex: i + '' + j,
          checked: j === 0 ? true : false
        };
        data.push(cols);
      }
      if (event.target.checked) {
        if (!this.responsedata.body[i].columns[2].readonly) {
          this.checkedList.push(this.itemInquiryBody[i].items[0].hexkey);
        }
      }

      const mcols = {
        items: data
      };
      mdata.push(mcols);
    }

    this.itemInquiryBody = mdata;
    this.sendData.emit(this.checkedList);

  }
  navigatePage(hexkey, apicollink): void {
    this.nativeWindow = window;
    if (this.staticdata === 'itemInquiry') {
      this._router.navigate(['editItemInquiry', hexkey], { queryParams: { title: this.title, companyname: this.companyName, showheading: this.showheading, filterBy: this.search } });
    } else if (this.staticdata === 'editItem') {

      let params = "width=" + encodeURIComponent(sessionStorage.getItem('width')) + ",height=" + encodeURIComponent(sessionStorage.getItem('height')) + ",left=" + encodeURIComponent(sessionStorage.getItem('left')) + ",top=" + encodeURIComponent(sessionStorage.getItem('top')) + "";
      window.open(FileType.path + '?hexkey=' + encodeURIComponent(hexkey) + '&apicollink=' + encodeURIComponent(apicollink.split('?')[0]) +
        '&file=' + encodeURIComponent(apicollink.split('=')[1].split('&')[0]) + '&optpgm=' + encodeURIComponent(apicollink.split('=')[2]), 'test', params);

    } else if (this.staticdata === 'userprfrence') {

    }
  }

  getSelectedColor(color, head, index, event, userColorbody) {

    const cols = {
      color: color,
      head: head,
      index: index,
      event: event,
      userColorbody: userColorbody
    };
    if (head.readonly) {
      return false;
    }
    if (head.head === 'Default Color') {
      this.setcolor = '#FFFFCC';
      this.selectedName = head.cellIndex;
    } else {
      this.setcolor = '#FFFFCC';
      this.selectedName = head.cellIndex;
    }
    this.selectedIndex.emit(cols);
  }
  reportFilterdData(checkBoxApi) {
    if (this.checkedList.length < 1) {
      toast(environment.selectType, Number(sessionStorage.getItem('toastTimeOut')));
      return false;
    }
    const cols = {
      checkedList: this.checkedList,
      checkBoxApi: checkBoxApi
    };

    this.sendData.emit(cols);
  }
}
