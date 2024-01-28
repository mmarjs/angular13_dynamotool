import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@ Directive({
    selector: '[customMax][formControlName],[customMax][formControl],[customMax][ngModel]',
    providers: [{ provide: NG_VALIDATORS, useExisting: CustomMaxDirective, multi: true }]
})
export class CustomMaxDirective implements Validator {

    @ Input()
    customMax: string;

    validate(c: FormControl): { [key: string]: any } {
        if (this.customMax === '') {
            return null;
        }
        const v = parseInt(c.value);
        const result = (v > parseInt(this.customMax)) ? { 'customMax': true } : null;
        return result;
    }
}
