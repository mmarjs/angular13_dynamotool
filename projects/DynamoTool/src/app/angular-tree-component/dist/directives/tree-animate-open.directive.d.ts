import { Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
export declare class TreeAnimateOpenDirective {
    private Renderer2;
    private templateRef;
    private viewContainerRef;
    private _isOpen;
    animateSpeed: number;
    animateAcceleration: number;
    isEnabled: boolean;
    isOpen: boolean;
    private innerElement;
    constructor(Renderer2: Renderer2, templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef);
    private _show();
    private _hide();
    private _animateOpen();
    private _animateClose();
}
