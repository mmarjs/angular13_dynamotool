import { Pipe, PipeTransform } from '@angular/core';
@ Pipe({
    name: 'filter'
})
export class FilterArrayPipe implements PipeTransform {
    transform(value, args) {

        if (!args) {
            return value;
        } else if (value) {
            return value.filter(item => {

                for (let i = 0; i < item.items.length; i++) {
                    if ((typeof item.items[i].name.value === 'string' || item.items[i].name.value instanceof String) &&
                        ((item.items[i].name.value).toLowerCase().indexOf(args.toLowerCase()) !== -1)) {
                        return true;
                    }
                }
            });
        }
    }
}
