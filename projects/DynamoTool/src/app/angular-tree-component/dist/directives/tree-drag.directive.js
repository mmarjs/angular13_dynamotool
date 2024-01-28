import { Directive, Input, HostListener, Renderer2, ElementRef, NgZone } from '@angular/core';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
var DRAG_OVER_CLASS = 'is-dragging-over';
var TreeDragDirective = /** @class */ (function () {
    function TreeDragDirective(el, Renderer2, treeDraggedElement, ngZone) {
        this.el = el;
        this.Renderer2 = Renderer2;
        this.treeDraggedElement = treeDraggedElement;
        this.ngZone = ngZone;
        this.dragEventHandler = this.onDrag.bind(this);
    }
    TreeDragDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        var el = this.el.nativeElement;
        this.ngZone.runOutsideAngular(function () {
            el.addEventListener('drag', _this.dragEventHandler);
        });
    };
    TreeDragDirective.prototype.ngDoCheck = function () {
        this.Renderer2.setElementAttribute(this.el.nativeElement, 'draggable', this.treeDragEnabled ? 'true' : 'false');
    };
    TreeDragDirective.prototype.ngOnDestroy = function () {
        var el = this.el.nativeElement;
        el.removeEventListener('drag', this.dragEventHandler);
    };
    TreeDragDirective.prototype.onDragStart = function (ev) {
        // setting the data is required by firefox
        ev.dataTransfer.setData('text', ev.target.id);
        this.treeDraggedElement.set(this.draggedElement);
        if (this.draggedElement.mouseAction) {
            this.draggedElement.mouseAction('dragStart', ev);
        }
    };
    TreeDragDirective.prototype.onDrag = function (ev) {
        if (this.draggedElement.mouseAction) {
            this.draggedElement.mouseAction('drag', ev);
        }
    };
    TreeDragDirective.prototype.onDragEnd = function () {
        if (this.draggedElement.mouseAction) {
            this.draggedElement.mouseAction('dragEnd');
        }
        this.treeDraggedElement.set(null);
    };
    TreeDragDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[treeDrag]'
                },] },
    ];
    /** @nocollapse */
    TreeDragDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
        { type: TreeDraggedElement, },
        { type: NgZone, },
    ]; };
    TreeDragDirective.propDecorators = {
        'draggedElement': [{ type: Input, args: ['treeDrag',] },],
        'treeDragEnabled': [{ type: Input },],
        'onDragStart': [{ type: HostListener, args: ['dragstart', ['$event'],] },],
        'onDragEnd': [{ type: HostListener, args: ['dragend',] },],
    };
    return TreeDragDirective;
}());
export { TreeDragDirective };
