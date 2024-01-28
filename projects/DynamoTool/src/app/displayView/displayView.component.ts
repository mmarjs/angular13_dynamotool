import { Component, Input } from '@angular/core';

@ Component({
    selector: 'app-displayview',
    templateUrl: './displayView.component.html',
    styleUrls: ['./displayView.component.css']
})

export class DisplayViewComponent {

    displayView: any;
    tableclass: string;
    inquiryTitle: string;
    displayViewRow2: any;
    bgColor: any;
    @ Input()
    set setDisplayView(response: any) {
        this.tableclass = '';
        this.inquiryTitle = '';
        this.displayView = null;
        this.displayViewRow2 = null;
        this.bgColor = '';
       
        if (response === undefined || response === null && response !== undefined && response.data.length === 0) {
            return;
        } else if (response !== undefined) {
            // can be tested in General Ledger Information in item inquiry
            
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].hasOwnProperty('tableclass')) {
                this.tableclass = response.data[i].tableclass;
              }
              if (response.data[i].hasOwnProperty('title')) {
                this.inquiryTitle = response.data[i].title;
              }
              if (response.data[i].hasOwnProperty('bgColor')) {
                this.bgColor = response.data[i].bgColor;
              }

            }
            const viewdata = [];
            const viewrow2data = []; // added 19 april
            for (let k = 0; k < response.data.length; k++) {
                if (response.data[k].rows !== undefined) {
                    const vdata = [];
                    for (let j = 0; j < response.data[k].rows.length; j++) {
                        const cols = {
                            description: response.data[k].rows[j].description,
                            value: response.data[k].rows[j].value,
                            texalign: response.data[k].rows[j].textalign,
                            type: response.data[k].rows[j].type,
                            readonly: response.data[k].rows[j].readonly
                        };
                        vdata.push(cols);
                    }
                    const mcols = {
                        items: vdata,
                        title: response.data[k].title,
                        tableclass: response.data[k].tableclass,
                        position: response.data[k].position,
                        width: response.data[k].width
                    };
                    viewdata.push(mcols);
                    this.displayView = viewdata;
                }

                /** FOR rows2 */

                if (response.data[k].rows2 !== undefined) {
                    const vrow2data = [];
                    for (let j = 0; j < response.data[k].rows2.length; j++) {
                        const cols = {
                            description: response.data[k].rows2[j].description,
                            value: response.data[k].rows2[j].value,
                            texalign: response.data[k].rows2[j].textalign,
                            type: response.data[k].rows2[j].type,
                            readonly: response.data[k].rows2[j].readonly
                        };
                        vrow2data.push(cols);
                    }
                    const mcols = {
                        items: vrow2data,
                        title: response.data[k].title,
                        tableclass: response.data[k].tableclass,
                        position: response.data[k].position,
                        width: response.data[k].width
                    };
                    viewrow2data.push(mcols);
                    this.displayViewRow2 = viewrow2data;
                } 
            }
        }
    }


}
