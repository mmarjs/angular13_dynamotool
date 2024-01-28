import { Component, Input, Output, EventEmitter } from '@angular/core';

@ Component({
    selector: 'app-appmenu',
    templateUrl: './appMenu.component.html',
    styleUrls: ['./appMenu.component.css']
})

export class AppMenuComponent {

    lefappMenu: any[];
    navclass: string;
    selectedIndex: number;
    checkedList: any[] = [];
    @ Output() menuChange: EventEmitter< string> = new EventEmitter();
    @ Output() getCheckBoxValue: EventEmitter< string> = new EventEmitter();

    @ Input()
    set setAppMenu(itemEditData: any) {

        if (itemEditData === undefined) {
            return;
        } else if (itemEditData.menuitems !== undefined) {

            this.navclass = itemEditData.navclass;
            const dataArray = [];
            for (let i = 0; i < itemEditData.menuitems.length; i++) {
                const menudata = {
                    pgm: itemEditData.menuitems[i].pgm,
                    star: itemEditData.menuitems[i].star,
                    // isPrint: itemEditData.menuitems[i].print === 'Y'
                    //    && itemEditData.menuitems[i].star === '*' ? 'print' : '',
                    isPrint: itemEditData.menuitems[i].print,
                    seq: itemEditData.menuitems[i].seq,
                    blank: itemEditData.menuitems[i].blank,
                    title: itemEditData.menuitems[i].title.length >= 40 ?
                        itemEditData.menuitems[i].title.substring(0, 40) + ' ...' : itemEditData.menuitems[i].title,
                    titleTooltip: itemEditData.menuitems[i].title,
                    optpgm: itemEditData.menuitems[i].optpgm,
                    enabledisable: itemEditData.menuitems[i].star === '*'
                        ? '' : itemEditData.menuitems[i].star === 'A' ? '' : 'none',
                  //  opct: itemEditData.menuitems[i].star === '*' ? '' : itemEditData.menuitems[i].star === 'A' ? '' : '0.6',
                    color: itemEditData.menuitems[i].star === 'A' ? '#f1ecc7' : '',
                    optionApi: itemEditData.optionApi
                };
                dataArray.push(menudata);
            }
            this.lefappMenu = dataArray;
           // this.printEdititemInquiry = dataArray;
        }

    }

    getSelectedItemInquiry(index: number, newValue) {

        this.selectedIndex = index;
        this.menuChange.emit(newValue);
    }

    /** SEND VALUE OF CHECKBOX */
    onCheckboxChange(option, event) {

        if (event.target.checked) {
          this.checkedList.push(option.seq);
        } else {
          for (let i = 0; i < this.lefappMenu.length; i++) {
            if (this.checkedList[i] === option.seq) {
              this.checkedList.splice(i, 1);
            }
          }
        }

        this.getCheckBoxValue.emit(this.checkedList.toString());
      }
}
