import { Component, Input, ViewEncapsulation } from '@angular/core';
var LoadingComponent = /** @class */ (function () {
    function LoadingComponent() {
    }
    LoadingComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'tree-loading-component',
                    template: "\n    <span *ngIf=\"!template\"></span>\n    <ng-container\n      [ngTemplateOutlet]=\"template\"\n      [ngTemplateOutletContext]=\"{ $implicit: node }\">\n    </ng-container>\n  ",
                },] },
    ];
    /** @nocollapse */
    LoadingComponent.ctorParameters = function () { return []; };
    LoadingComponent.propDecorators = {
        'template': [{ type: Input },],
        'node': [{ type: Input },],
    };
    return LoadingComponent;
}());
export { LoadingComponent };
