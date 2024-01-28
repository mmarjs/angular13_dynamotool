import { Component, Output, EventEmitter } from '@angular/core';

@ Component({
    selector: 'app-printbutton',
    templateUrl: './print.component.html'
})
export class PrintComponent {
@ Output() PrintOption: EventEmitter< string> = new EventEmitter();

    printData() {
        this.PrintOption.emit();
      }
}
