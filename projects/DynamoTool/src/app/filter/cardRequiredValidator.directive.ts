import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';

@ Directive({
    selector: '[numberInputValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: CardRequiredValidator,
        multi: true
    }]
})

export class CardRequiredValidator implements Validator {

    validate(control: AbstractControl): { [key: string]: any } | null {

        if (control.value === null || control.value === undefined || control.value === '') {
            return;
        }
     if (control.value.split(' ').join('') !== null || control.value.split(' ').join('') !== undefined) {

        if (control.value.length > 19) {
            return control.value.split(' ').join('').length > 19 ? { 'numberInput': true } : null;
        } else {
            let sum = 0;
            let mul = 1;
            const l = control.value.split(' ').join('').length;
            for (let i = 0; i < l; i++) {
            const  digit = control.value.split(' ').join('').substring(l - i - 1, l - i);
            const tproduct = parseInt(digit, 10) * mul;
            if (tproduct >= 10) { sum += (tproduct % 10) + 1; } else {  sum += tproduct; }
            if (mul === 1) { mul++; } else { mul--; }
            }
            return (sum % 10) !== 0 ? { 'numberInput': true } : null;
        }
    }
    }

}
