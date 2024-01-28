import { Component, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent {

    filterText: string;
    @Output() searchChanged: EventEmitter<string> = new EventEmitter();
    constructor() { }

    searchItem() {
        this.searchChanged.emit(this.filterText);
    }
}
