import { Renderer2, ElementRef, DoCheck, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
export declare class TreeDragDirective implements AfterViewInit, DoCheck, OnDestroy {
    private el;
    private Renderer2;
    private treeDraggedElement;
    private ngZone;
    draggedElement: any;
    treeDragEnabled: any;
    private readonly dragEventHandler;
    constructor(el: ElementRef, Renderer2: Renderer2, treeDraggedElement: TreeDraggedElement, ngZone: NgZone);
    ngAfterViewInit(): void;
    ngDoCheck(): void;
    ngOnDestroy(): void;
    onDragStart(ev: any): void;
    onDrag(ev: any): void;
    onDragEnd(): void;
}
