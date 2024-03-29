import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@ Directive({
    selector: '[customMin][formControlName],[customMin][formControl],[customMin][ngModel]',
    providers: [{ provide: NG_VALIDATORS, useExisting: CustomMinDirective, multi: true }]
})
export class CustomMinDirective implements Validator {
    @ Input()
    customMin: number;

    validate(c: FormControl): { [key: string]: any } {
        const v = parseInt(c.value);
        const result = (v < this.customMin) ? { 'customMin': true } : null;
        return result;
    }
}
