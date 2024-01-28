import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@ Component({
    selector: 'app-displayButton',
    templateUrl: './displayButton.component.html',
    styleUrls: ['./displayButton.component.css']
})

export class DisplayButtonComponent implements OnInit {
    constructor() { }
    @ Input()
    set getButtonResponse(response) {
           
        if (response === undefined || response === null) {
            return;
        } else {
           this.buttonresponse = response;
        }

    }

    buttonresponse: any;
    @Input() buttonLength: any;
   
@ Output() sendData: EventEmitter< any> = new EventEmitter();

    ngOnInit() {
    
    }

    buttonAPICall(APICall) {
    
        const cols = {
            APICall: APICall
        };
        this.sendData.emit(cols);
    }

  
}
