import { TreeModel } from './tree.model';
import { TreeOptions } from './tree-options.model';
import { ITreeNode } from '../defs/api';
export declare class TreeNode implements ITreeNode {
    data: any;
    parent: TreeNode;
    treeModel: TreeModel;
    private handler;
    readonly isHidden: any;
    readonly isExpanded: any;
    readonly isActive: any;
    readonly isFocused: boolean;
    readonly isSelected: any;
    readonly isAllSelected: any;
    readonly isPartiallySelected: boolean;
    children: TreeNode[];
    index: number;
    position: number;
    height: number;
    readonly level: number;
    readonly path: string[];
    readonly elementRef: any;
    private _originalNode;
    readonly originalNode: any;
    constructor(data: any, parent: TreeNode, treeModel: TreeModel, index: number);
    readonly hasChildren: boolean;
    readonly isCollapsed: boolean;
    readonly isLeaf: boolean;
    readonly isRoot: boolean;
    readonly realParent: TreeNode;
    readonly options: TreeOptions;
    fireEvent(event: any): void;
    readonly displayField: any;
    id: any;
    getField(key: any): any;
    setField(key: any, value: any): void;
    _findAdjacentSibling(steps: any, skipHidden?: boolean): any;
    findNextSibling(skipHidden?: boolean): any;
    findPreviousSibling(skipHidden?: boolean): any;
    getVisibleChildren(): TreeNode[];
    readonly visibleChildren: TreeNode[];
    getFirstChild(skipHidden?: boolean): TreeNode;
    getLastChild(skipHidden?: boolean): TreeNode;
    findNextNode(goInside?: boolean, skipHidden?: boolean): any;
    findPreviousNode(skipHidden?: boolean): any;
    _getLastOpenDescendant(skipHidden?: boolean): any;
    private _getParentsChildren(skipHidden?);
    private getIndexInParent(skipHidden?);
    isDescendantOf(node: TreeNode): any;
    getNodePadding(): string;
    getClass(): string;
    onDrop($event: any): void;
    allowDrop: (element: any, $event?: any) => boolean;
    allowDrag(): boolean;
    loadNodeChildren(): Promise<void>;
    expand(): this;
    collapse(): this;
    doForAll(fn: (node: ITreeNode) => any): void;
    expandAll(): void;
    collapseAll(): void;
    ensureVisible(): this;
    toggleExpanded(): this;
    setIsExpanded(value: any): this;
    autoLoadChildren(): void;
    dispose(): void;
    setIsActive(value: any, multi?: boolean): this;
    setIsSelected(value: any): this;
    toggleSelected(): this;
    toggleActivated(multi?: boolean): this;
    setActiveAndVisible(multi?: boolean): this;
    scrollIntoView(force?: boolean): void;
    focus(scroll?: boolean): this;
    blur(): this;
    setIsHidden(value: any): void;
    hide(): void;
    show(): void;
    mouseAction(actionName: string, $event: any, data?: any): void;
    getSelfHeight(): number;
    _initChildren(): void;
}
