import { Component, Input, ViewEncapsulation } from '@angular/core';
var TreeNodeWrapperComponent = /** @class */ (function () {
    function TreeNodeWrapperComponent() {
    }
    TreeNodeWrapperComponent.decorators = [
        {
            type: Component, args: [{
                selector: 'tree-node-wrapper',
                encapsulation: ViewEncapsulation.None,
                styles: [],
                template: `
                \n<div *ngIf=\"!templates.treeNodeWrapperTemplate\" class=\"node-wrapper\" [style.padding-left]=\"node.getNodePadding()\">\n        
                  <tree-node-checkbox *ngIf=\"node.options.useCheckbox\" [node]=\"node\"></tree-node-checkbox>\n        
                  <tree-node-expander [node]=\"node\"></tree-node-expander>\n        
                  <div class=\"node-content-wrapper\"\n [class.node-content-wrapper-active]=\"node.isActive\"\n [class.node-content-wrapper-focused]=\"node.isFocused\"\n (click)=\"node.mouseAction('click', $event)\"\n (dblclick)=\"node.mouseAction('dblClick', $event)\"\n (contextmenu)=\"node.mouseAction('contextMenu', $event)\"\n (treeDrop)=\"node.onDrop($event)\"\n          (treeDropDragOver)=\"node.mouseAction('dragOver', $event)\"\n          (treeDropDragLeave)=\"node.mouseAction('dragLeave', $event)\"\n          (treeDropDragEnter)=\"node.mouseAction('dragEnter', $event)\"\n          [treeAllowDrop]=\"node.allowDrop\"\n          [treeDrag]=\"node\"\n          [treeDragEnabled]=\"node.allowDrag()\">\n\n          
                  <tree-node-content [node]=\"node\" [index]=\"index\" [template]=\"templates.treeNodeTemplate\">\n 
                
                  </tree-node-content>\n       
                 </div>\n      
                </div>\n      
                  <ng-container \n  [ngTemplateOutlet]=\"templates.treeNodeWrapperTemplate\" \n [ngTemplateOutletContext]=\"{ $implicit: node, node: node, index: index, templates: templates }\">\n      
                  </ng-container>\n`
            },]
        },
    ];
    /** @nocollapse */
    TreeNodeWrapperComponent.ctorParameters = function () { return []; };
    TreeNodeWrapperComponent.propDecorators = {
        'node': [{ type: Input },],
        'index': [{ type: Input },],
        'templates': [{ type: Input },],
    };
    return TreeNodeWrapperComponent;
}());
export { TreeNodeWrapperComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3RyZWUtbm9kZS13cmFwcGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFXLEtBQUEsRUFBTyxpQkFBQSxFQUErQixNQUFPLGVBQUEsQ0FBZ0I7QUFLakY7SUFNRTtJQUFnQixDQUFDO0lBRVosbUNBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsTUFBTSxFQUFFLEVBQUU7b0JBQ1YsUUFBUSxFQUFFLDY2Q0EwQlA7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLHVDQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0ssdUNBQWMsR0FBMkM7UUFDaEUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDMUIsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDM0IsV0FBVyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7S0FDOUIsQ0FBQztJQUNGLCtCQUFDO0NBbERELEFBa0RDLElBQUE7U0FsRFksd0JBQXdCIiwiZmlsZSI6InRyZWUtbm9kZS13cmFwcGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtbm9kZS5tb2RlbCc7XG5cblxuXG5leHBvcnQgY2xhc3MgVHJlZU5vZGVXcmFwcGVyQ29tcG9uZW50IHtcblxuICAgbm9kZTogVHJlZU5vZGU7XG4gICBpbmRleDogbnVtYmVyO1xuICAgdGVtcGxhdGVzOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuc3RhdGljIGRlY29yYXRvcnM6IERlY29yYXRvckludm9jYXRpb25bXSA9IFtcbnsgdHlwZTogQ29tcG9uZW50LCBhcmdzOiBbe1xuICBzZWxlY3RvcjogJ3RyZWUtbm9kZS13cmFwcGVyJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc3R5bGVzOiBbXSxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxkaXYgKm5nSWY9XCIhdGVtcGxhdGVzLnRyZWVOb2RlV3JhcHBlclRlbXBsYXRlXCIgY2xhc3M9XCJub2RlLXdyYXBwZXJcIiBbc3R5bGUucGFkZGluZy1sZWZ0XT1cIm5vZGUuZ2V0Tm9kZVBhZGRpbmcoKVwiPlxuICAgICAgICA8dHJlZS1ub2RlLWNoZWNrYm94ICpuZ0lmPVwibm9kZS5vcHRpb25zLnVzZUNoZWNrYm94XCIgW25vZGVdPVwibm9kZVwiPjwvdHJlZS1ub2RlLWNoZWNrYm94PlxuICAgICAgICA8dHJlZS1ub2RlLWV4cGFuZGVyIFtub2RlXT1cIm5vZGVcIj48L3RyZWUtbm9kZS1leHBhbmRlcj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm5vZGUtY29udGVudC13cmFwcGVyXCJcbiAgICAgICAgICBbY2xhc3Mubm9kZS1jb250ZW50LXdyYXBwZXItYWN0aXZlXT1cIm5vZGUuaXNBY3RpdmVcIlxuICAgICAgICAgIFtjbGFzcy5ub2RlLWNvbnRlbnQtd3JhcHBlci1mb2N1c2VkXT1cIm5vZGUuaXNGb2N1c2VkXCJcbiAgICAgICAgICAoY2xpY2spPVwibm9kZS5tb3VzZUFjdGlvbignY2xpY2snLCAkZXZlbnQpXCJcbiAgICAgICAgICAoZGJsY2xpY2spPVwibm9kZS5tb3VzZUFjdGlvbignZGJsQ2xpY2snLCAkZXZlbnQpXCJcbiAgICAgICAgICAoY29udGV4dG1lbnUpPVwibm9kZS5tb3VzZUFjdGlvbignY29udGV4dE1lbnUnLCAkZXZlbnQpXCJcbiAgICAgICAgICAodHJlZURyb3ApPVwibm9kZS5vbkRyb3AoJGV2ZW50KVwiXG4gICAgICAgICAgKHRyZWVEcm9wRHJhZ092ZXIpPVwibm9kZS5tb3VzZUFjdGlvbignZHJhZ092ZXInLCAkZXZlbnQpXCJcbiAgICAgICAgICAodHJlZURyb3BEcmFnTGVhdmUpPVwibm9kZS5tb3VzZUFjdGlvbignZHJhZ0xlYXZlJywgJGV2ZW50KVwiXG4gICAgICAgICAgKHRyZWVEcm9wRHJhZ0VudGVyKT1cIm5vZGUubW91c2VBY3Rpb24oJ2RyYWdFbnRlcicsICRldmVudClcIlxuICAgICAgICAgIFt0cmVlQWxsb3dEcm9wXT1cIm5vZGUuYWxsb3dEcm9wXCJcbiAgICAgICAgICBbdHJlZURyYWddPVwibm9kZVwiXG4gICAgICAgICAgW3RyZWVEcmFnRW5hYmxlZF09XCJub2RlLmFsbG93RHJhZygpXCI+XG5cbiAgICAgICAgICA8dHJlZS1ub2RlLWNvbnRlbnQgW25vZGVdPVwibm9kZVwiIFtpbmRleF09XCJpbmRleFwiIFt0ZW1wbGF0ZV09XCJ0ZW1wbGF0ZXMudHJlZU5vZGVUZW1wbGF0ZVwiPlxuICAgICAgICAgIDwvdHJlZS1ub2RlLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8bmctY29udGFpbmVyIFxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZXMudHJlZU5vZGVXcmFwcGVyVGVtcGxhdGVcIiBcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiBub2RlLCBub2RlOiBub2RlLCBpbmRleDogaW5kZXgsIHRlbXBsYXRlczogdGVtcGxhdGVzIH1cIj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIGBcbn0sIF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbnN0YXRpYyBjdG9yUGFyYW1ldGVyczogKCkgPT4gKHt0eXBlOiBhbnksIGRlY29yYXRvcnM/OiBEZWNvcmF0b3JJbnZvY2F0aW9uW119fG51bGwpW10gPSAoKSA9PiBbXG5dO1xuc3RhdGljIHByb3BEZWNvcmF0b3JzOiB7W2tleTogc3RyaW5nXTogRGVjb3JhdG9ySW52b2NhdGlvbltdfSA9IHtcbidub2RlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ2luZGV4JzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ3RlbXBsYXRlcyc6IFt7IHR5cGU6IElucHV0IH0sXSxcbn07XG59XG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==