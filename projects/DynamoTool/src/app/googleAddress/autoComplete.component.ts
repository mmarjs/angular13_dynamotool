import { Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input, ElementRef } from '@angular/core';

declare var google: any;

@ Component({
    selector: 'AutocompleteComponent',
    templateUrl: './autoComplete.component.html',
    styleUrls: ['./autoComplete.component.css']
})
export class AutocompleteComponent implements OnInit, AfterViewInit {
    @ Input() adressType: string;
    @ Output() setAddress: EventEmitter< any> = new EventEmitter();
    @ Output() setManualInput: EventEmitter< any> = new EventEmitter();
    @ ViewChild('addresstext') addresstext: any;

    queryWait: boolean;
    setDivId: string;
    setValidation: boolean = false;
    setDivs: any;
    autocompleteInput: any;
    manualInput: any;
    @ ViewChild('autoInput') autoInput: ElementRef;
    @ Input()
    set getDivId(response: any) {

        this.setDivId = response;
    }

    @ Input()

    set getDivsAndInput(response: any) {

        this.setDivs = response;
       // alert(this.setDivs.value);
        if (this.setDivs.value !== undefined && this.setDivs.value !== '' && this.setDivs.value !== null) {
       this.autocompleteInput = this.setDivs.value;
        }

    }

    @ Input()

    set updateAddress(response: any) {

        if (response !== undefined) {

            if (response.name == this.setDivs.name) {
             this.autocompleteInput = response.show !== undefined && response.show !== '' ? response.show : response.value;
             this.setDivs.readonly = response.readonly;

            }

        }


    }

    @ Input()

    set getName(response: any) {

    }
    constructor() {
    }


    ngOnInit() {

    }

    ngAfterViewInit() {

        this.getPlaceAutocomplete();

    }


    private getPlaceAutocomplete() {

        const inputText = document.getElementById(this.autoInput.nativeElement.id) as HTMLInputElement;
        const autocomplete = new google.maps.places.Autocomplete(inputText,
            {
                componentRestrictions: { country: ['US', 'CA'] },
                types: [this.adressType]  // 'establishment' / 'address' / 'geocode'// ['US','CA','IN']
            }, { placeholder: undefined });
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            const place = autocomplete.getPlace();
            this.invokeEvent(place);
        });

    }
    getUserValue() {
     
       // set value this.setDivs.name
this.setManualInput.emit({'name': this.setDivs.name, 'value': this.autocompleteInput});

    }
    invokeEvent(place: Object) {

        const divId = { 'div_id': this.setDivId, 'addressInputId': this.autoInput.nativeElement.id };
        place['divIds'] = divId;

        this.setAddress.emit(place);


    }

    private getPlaceUsingPhone() {
        const autocomplete = new google.maps.places.findPlaceFromPhoneNumber(this.addresstext.nativeElement,
            {
                componentRestrictions: { country: ['US', 'CA'] },
                types: [this.adressType]  // 'establishment' / 'address' / 'geocode'// ['US','CA','IN']
            });
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            const place = autocomplete.getPlace();
            this.invokeEvent(place);
        });
    }
}
