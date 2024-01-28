import { Directive, Output, Input, EventEmitter, HostListener, Renderer2, ElementRef, NgZone } from '@angular/core';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
var DRAG_OVER_CLASS = 'is-dragging-over';
var DRAG_DISABLED_CLASS = 'is-dragging-over-disabled';
var TreeDropDirective = /** @class */ (function () {
    function TreeDropDirective(el, Renderer2, treeDraggedElement, ngZone) {
        this.el = el;
        this.Renderer2 = Renderer2;
        this.treeDraggedElement = treeDraggedElement;
        this.ngZone = ngZone;
        this.onDropCallback = new EventEmitter();
        this.onDragOverCallback = new EventEmitter();
        this.onDragLeaveCallback = new EventEmitter();
        this.onDragEnterCallback = new EventEmitter();
        this._allowDrop = function (element, $event) { return true; };
        this.dragOverEventHandler = this.onDragOver.bind(this);
        this.dragEnterEventHandler = this.onDragEnter.bind(this);
        this.dragLeaveEventHandler = this.onDragLeave.bind(this);
    }
    Object.defineProperty(TreeDropDirective.prototype, "treeAllowDrop", {
        set: function (allowDrop) {
            if (allowDrop instanceof Function) {
                this._allowDrop = allowDrop;
            }
            else
                this._allowDrop = function (element, $event) { return allowDrop; };
        },
        enumerable: true,
        configurable: true
    });
    TreeDropDirective.prototype.allowDrop = function ($event) {
        return this._allowDrop(this.treeDraggedElement.get(), $event);
    };
    TreeDropDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        var el = this.el.nativeElement;
        this.ngZone.runOutsideAngular(function () {
            el.addEventListener('dragover', _this.dragOverEventHandler);
            el.addEventListener('dragenter', _this.dragEnterEventHandler);
            el.addEventListener('dragleave', _this.dragLeaveEventHandler);
        });
    };
    TreeDropDirective.prototype.ngOnDestroy = function () {
        var el = this.el.nativeElement;
        el.removeEventListener('dragover', this.dragOverEventHandler);
        el.removeEventListener('dragenter', this.dragEnterEventHandler);
        el.removeEventListener('dragleave', this.dragLeaveEventHandler);
    };
    TreeDropDirective.prototype.onDragOver = function ($event) {
        if (!this.allowDrop($event))
            return this.addDisabledClass();
        this.onDragOverCallback.emit({ event: $event, element: this.treeDraggedElement.get() });
        $event.preventDefault();
        this.addClass();
    };
    TreeDropDirective.prototype.onDragEnter = function ($event) {
        if (!this.allowDrop($event))
            return;
        this.onDragEnterCallback.emit({ event: $event, element: this.treeDraggedElement.get() });
    };
    TreeDropDirective.prototype.onDragLeave = function ($event) {
        if (!this.allowDrop($event))
            return this.removeDisabledClass();
        this.onDragLeaveCallback.emit({ event: $event, element: this.treeDraggedElement.get() });
        this.removeClass();
        
    };
    TreeDropDirective.prototype.onDrop = function ($event) {
        if (!this.allowDrop($event))
            return;
        $event.preventDefault();
        this.onDropCallback.emit({ event: $event, element: this.treeDraggedElement.get() });
        this.removeClass();
        this.treeDraggedElement.set(null);
       
    };
    TreeDropDirective.prototype.addClass = function () {
        this.Renderer2.setElementClass(this.el.nativeElement, DRAG_OVER_CLASS, true);
    };
    TreeDropDirective.prototype.removeClass = function () {
        this.Renderer2.setElementClass(this.el.nativeElement, DRAG_OVER_CLASS, false);
    };
    TreeDropDirective.prototype.addDisabledClass = function () {
        this.Renderer2.setElementClass(this.el.nativeElement, DRAG_DISABLED_CLASS, true);
    };
    TreeDropDirective.prototype.removeDisabledClass = function () {
        this.Renderer2.setElementClass(this.el.nativeElement, DRAG_DISABLED_CLASS, false);
    };
    TreeDropDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[treeDrop]'
                },] },
    ];
    /** @nocollapse */
    TreeDropDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
        { type: TreeDraggedElement, },
        { type: NgZone, },
    ]; };
    TreeDropDirective.propDecorators = {
        'onDropCallback': [{ type: Output, args: ['treeDrop',] },],
        'onDragOverCallback': [{ type: Output, args: ['treeDropDragOver',] },],
        'onDragLeaveCallback': [{ type: Output, args: ['treeDropDragLeave',] },],
        'onDragEnterCallback': [{ type: Output, args: ['treeDropDragEnter',] },],
        'treeAllowDrop': [{ type: Input },],
        'onDrop': [{ type: HostListener, args: ['drop', ['$event'],] },],
    };
    return TreeDropDirective;
}());
export { TreeDropDirective };
