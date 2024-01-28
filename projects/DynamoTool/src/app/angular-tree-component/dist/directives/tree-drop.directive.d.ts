import { EventEmitter, Renderer2, ElementRef, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
export declare class TreeDropDirective implements AfterViewInit, OnDestroy {
    private el;
    private Renderer2;
    private treeDraggedElement;
    private ngZone;
    onDropCallback: EventEmitter<{}>;
    onDragOverCallback: EventEmitter<{}>;
    onDragLeaveCallback: EventEmitter<{}>;
    onDragEnterCallback: EventEmitter<{}>;
    private readonly dragOverEventHandler;
    private readonly dragEnterEventHandler;
    private readonly dragLeaveEventHandler;
    private _allowDrop;
    treeAllowDrop: any;
    allowDrop($event: any): boolean;
    constructor(el: ElementRef, Renderer2: Renderer2, treeDraggedElement: TreeDraggedElement, ngZone: NgZone);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onDragOver($event: any): void;
    onDragEnter($event: any): void;
    onDragLeave($event: any): void;
    onDrop($event: any): void;
    private addClass();
    private removeClass();
    private addDisabledClass();
    private removeDisabledClass();
}
