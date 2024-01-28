import { Directive, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
var EASE_ACCELERATION = 1.005;
var TreeAnimateOpenDirective = /** @class */ (function () {
    function TreeAnimateOpenDirective(Renderer2, templateRef, viewContainerRef) {
        this.Renderer2 = Renderer2;
        this.templateRef = templateRef;
        this.viewContainerRef = viewContainerRef;
    }
    Object.defineProperty(TreeAnimateOpenDirective.prototype, "isOpen", {
        set: function (value) {
            if (value) {
                this._show();
                if (this.isEnabled && this._isOpen === false) {
                    this._animateOpen();
                }
            }
            else {
                this.isEnabled ? this._animateClose() : this._hide();
            }
            this._isOpen = !!value;
        },
        enumerable: true,
        configurable: true
    });
    ;
    TreeAnimateOpenDirective.prototype._show = function () {
        if (this.innerElement)
            return;
        // create child view
        this.innerElement = this.viewContainerRef.createEmbeddedView(this.templateRef).rootNodes[0];
    };
    TreeAnimateOpenDirective.prototype._hide = function () {
        this.viewContainerRef.clear();
        this.innerElement = null;
    };
    TreeAnimateOpenDirective.prototype._animateOpen = function () {
        var _this = this;
        var delta = this.animateSpeed;
        var ease = this.animateAcceleration;
        var maxHeight = 0;
        // set height to 0
        this.Renderer2.setElementStyle(this.innerElement, 'max-height', "0");
        // increase maxHeight until height doesn't change
        setTimeout(function () {
            var i = setInterval(function () {
                if (!_this._isOpen || !_this.innerElement)
                    return clearInterval(i);
                maxHeight += delta;
                var roundedMaxHeight = Math.round(maxHeight);
                _this.Renderer2.setElementStyle(_this.innerElement, 'max-height', roundedMaxHeight + "px");
                var height = _this.innerElement.getBoundingClientRect ? _this.innerElement.getBoundingClientRect().height : 0; // TBD use Renderer2
                delta *= ease;
                ease *= EASE_ACCELERATION;
                if (height < roundedMaxHeight) {
                    // Make maxHeight auto because animation finished and container might change height later on
                    _this.Renderer2.setElementStyle(_this.innerElement, 'max-height', null);
                    clearInterval(i);
                }
            }, 17);
        });
    };
    TreeAnimateOpenDirective.prototype._animateClose = function () {
        var _this = this;
        if (!this.innerElement)
            return;
        var delta = this.animateSpeed;
        var ease = this.animateAcceleration;
        var height = this.innerElement.getBoundingClientRect().height; // TBD use Renderer2
        // slowly decrease maxHeight to 0, starting from current height
        var i = setInterval(function () {
            if (_this._isOpen || !_this.innerElement)
                return clearInterval(i);
            height -= delta;
            _this.Renderer2.setElementStyle(_this.innerElement, 'max-height', height + "px");
            delta *= ease;
            ease *= EASE_ACCELERATION;
            if (height <= 0) {
                // after animation complete - remove child element
                _this.viewContainerRef.clear();
                _this.innerElement = null;
                clearInterval(i);
            }
        }, 17);
    };
    TreeAnimateOpenDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[treeAnimateOpen]'
                },] },
    ];
    /** @nocollapse */
    TreeAnimateOpenDirective.ctorParameters = function () { return [
        { type: Renderer2, },
        { type: TemplateRef, },
        { type: ViewContainerRef, },
    ]; };
    TreeAnimateOpenDirective.propDecorators = {
        'animateSpeed': [{ type: Input, args: ['treeAnimateOpenSpeed',] },],
        'animateAcceleration': [{ type: Input, args: ['treeAnimateOpenAcceleration',] },],
        'isEnabled': [{ type: Input, args: ['treeAnimateOpenEnabled',] },],
        'isOpen': [{ type: Input, args: ['treeAnimateOpen',] },],
    };
    return TreeAnimateOpenDirective;
}());
export { TreeAnimateOpenDirective };
