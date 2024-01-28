import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';

@ Directive({
    selector: '[expiryInputValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: ExpiryRequiredValidator,
        multi: true
    }]
})

export class ExpiryRequiredValidator implements Validator {
    validate(expiry: AbstractControl): { [key: string]: any } | null {

        if (expiry.value === '' || expiry.value === null) {
            return null;
        } else {

            const mth = + expiry.value.substring(0, 2);
            const year = 2000 + Number(expiry.value.substring(5, 7));
            const today = new Date();
            const thismth = today.getMonth() + 1;
            const thisyear = today.getFullYear();
            const expiryresult = (expiry.value.split(' ').length === 3 && mth >= 1 && mth <= 12 && (year > thisyear || (year === thisyear && mth >= thismth)));
            const result = expiryresult === false ? { 'expiryInput': true } : null;
            return result;
        }

    }

}
