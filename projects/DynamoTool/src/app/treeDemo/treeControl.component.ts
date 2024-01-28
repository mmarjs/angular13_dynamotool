import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, EventEmitter, Input, Output } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Router, ActivatedRoute } from '@angular/router';
import { DynamoToolShareService } from '../dynamoToolHome/dynamoToolShare.service';


import { toast } from 'angular2-materialize';
import { environment } from '../../environments/environment';
/**
 * File node data with nested structure.
 * Each node has a filename, and a type or a list of children.
 */

/** FOR ACCORDION */

import { ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

import { TreeComponent } from '../angular-tree-component/dist/angular-tree-component';

export class FileNode {
  id: string;
  children: FileNode[];
  filename: string;
  type: any;
  ids: any;
  api: string;
  parentMenuId: any;
  parent: any; // added
  index: any;  // added
  nodeId: any;
}

/** Flat node with expandable and level information */
export class FileFlatNode {
  constructor(
    public expandable: boolean,
    public filename: string,
    public level: number,
    public type: any,
    public id: string,
    public ids: any,
    public api: string,
    public parentMenuId: any,
  ) { }
}

/**
 * The file structure tree data in string. The data could be parsed into a Json object
 */
/* interface Array<T> {
  flat(): Array<T>;
  splice(x: T,x1: T,x2?:T): Array<T>;
  flatMap(func: (x: T) => T): Array<T>;
} */

/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */

@Injectable()
export class FileDatabase {

  dataChange = new BehaviorSubject<FileNode[]>([]);
  menuDetail: any[] = [];
  currentNodeId: Number;
  get data(): FileNode[] { return this.dataChange.value; }

  constructor() {
    // this.initialize();
  }

  initialize(treeMenu, api) {

    const dataObject = treeMenu;
    //
    // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
    //     file node as children.

    const data = this.buildFileTree(dataObject, 0, '', api);
    // Notify the change.
    this.dataChange.next(data);

  }




  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `FileNode`.
   */
  buildFileTree(obj: { [key: string]: any }, level: number, parentId: string = '0', api): FileNode[] {

    return Object.keys(obj).reduce<FileNode[]>((accumulator, key, idx) => {
      const value = obj[key];
      const node = new FileNode();
      node.filename = key;
      // node.filename = obj['text'];
      /**
       * Make sure your node has an id so we can properly rearrange the tree during drag'n'drop.
       * By passing parentId to buildFileTree, it constructs a path of indexes which make
       * it possible find the exact sub-array that the node was grabbed from when dropped.
       */
      node.id = `${parentId}/${idx}`;
      //  node.ids = key;
      node.ids = node.filename.split('_')[1];
      node.api = api;
      node.parent = node.filename.split('_')[3];

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1, node.id, api);
        } else {
          node.type = value;
          //  node.parentMenuId = 143;
          node.parentMenuId = node.filename.split('_')[3];
        }
      }
      // this.menuDetail.push(node);


      this.menuDetail.push(node);
      return accumulator.concat(node);
    }, []);
  }
}


/**
 * @title Tree with flat nodes
 */
@Component({
  selector: 'tree-control',
  templateUrl: 'treeControl.component.html',
  styleUrls: ['treeControl.component.css'],
  providers: [FileDatabase]
  // [FileDatabase, TreeControlService, DynamoToolShareService]
})
export class TreeControlComponent {

  treeControl: FlatTreeControl<FileFlatNode>;
  treeFlattener: MatTreeFlattener<FileNode, FileFlatNode>;
  dataSource: MatTreeFlatDataSource<FileNode, FileFlatNode>;
  expandedNodeSet = new Set<string>();
  dragging = false;
  expandTimeout: any;
  expandDelay = 1000;
  nodeSelected = false;
  /**FOR ACCORDION */
  // treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  //  dataSource = new MatTreeNestedDataSource<FoodNode>();

  // Accordion Data
  panelOpenState = false;
  accordionList: any;
  currentId: Number;
  mainContent = { 'showMainContent': '', 'formWidth': '', 'data': '' }; // it will hold main form data
  showExpansion: any[] = []; // It will hold data of expansion panel
  formFields: any[] = []; // to hold form fields
  fieldsName: any[] = [];
  staticData: any;
  responseData: any;
  buttonresponsePage: any[] = [];
  loader: string;
  setmessage: any;
  showDialogHtmlPage: boolean = false;
  showTextDialogPage: string;
  dialogPageWidth: string;
  showDialogTitle: string;
  response: any;
  formsNavigationCss: string;
  formsNavigation: any;
  fileName: string;
  fileData: any;
  fileDataArray: any[] = [];
  sendNoFile: boolean = false;
  submitApiEntryGridMultipart: string;
  columnWidth: string = '100%';
  buttonsMenuSubMenu: any[] = [];
  menuDetail: any[] = [];
  parentId: Number = 0;
  selectedIndex: number = -1; // Number
  idParentIndex: any;
  dragDropApi: string;
  searchTerm: string;
  initialData: any;
  newModesWithParent = [];
  arrPoc: any;
  expandedNode = [];
  showBusyText: string;
  @Input()
  set treeControlMenu(response: any) {

    this.bindResponsenew(response, 'addMenu');

  }

  @Output() handleCancelInParent: EventEmitter<any> = new EventEmitter();
  @Output() handleResInParent: EventEmitter<any> = new EventEmitter(); // handleSubmitInParent

  @Output() handleButtonInParent: EventEmitter<any> = new EventEmitter();
  @ViewChild('accordion', { static: true }) Accordion: MatAccordion;
  constructor(public database: FileDatabase, private _dynamoService: DynamoToolShareService, private _activeRoute: ActivatedRoute, private _router: Router) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
      this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<FileFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    database.dataChange.subscribe(data => this.rebuildTreeForData(data));

  }
  ngOnInit() {

    this.loader = environment.displayNone;
    localStorage.setItem('api', JSON.stringify({}));
  }

  transformer = (node: FileNode, level: number) => {
    return new FileFlatNode(!!node.children, node.filename, level, node.type, node.id, node.ids, node.api, node.parentMenuId);
  }
  private _getLevel = (node: FileFlatNode) => node.level;
  private _isExpandable = (node: FileFlatNode) => node.expandable;
  private _getChildren = (node: FileNode): Observable<FileNode[]> => observableOf(node.children);
  hasChild = (_: number, _nodeData: FileFlatNode) => _nodeData.expandable;

  /**
   * This constructs an array of nodes that matches the DOM,
   * and calls rememberExpandedTreeNodes to persist expand state
   */
  visibleNodes(): FileNode[] {
    this.rememberExpandedTreeNodes(this.treeControl, this.expandedNodeSet);
    const result = [];

    function addExpandedChildren(node: FileNode, expanded: Set<string>) {
      result.push(node);
      if (expanded.has(node.id)) {
        //  node.children.map(child => addExpandedChildren(child, expanded));
        if (node.children !== undefined) { // ADDED
          node.children.map(child => addExpandedChildren(child, expanded));
        }
      }
    }
    this.dataSource.data.forEach(node => {
      addExpandedChildren(node, this.expandedNodeSet);
    });
    return result;
  }

  /**
   * Handle the drop - here we rearrange the data based on the drop event,
   * then rebuild the tree.
   * */
  drop(event: CdkDragDrop<string[]>, dragDropApi: string) {
    // console.log('origin/destination', event.previousIndex, event.currentIndex);
    let dragNode = event.item.data.filename;
    // ignore drops outside of the tree
    if (!event.isPointerOverContainer) return;

    // construct a list of visible nodes, this will match the DOM.
    // the cdkDragDrop event.currentIndex jives with visible nodes.
    // it calls rememberExpandedTreeNodes to persist expand state
    const visibleNodes = this.visibleNodes();
    // console.log(event);
    // deep clone the data source so we can mutate it
    const changedData = JSON.parse(JSON.stringify(this.dataSource.data));
    // console.log(changedData);
    // recursive find function to find siblings of node
    function findNodeSiblings(arr: Array<any>, id: string): Array<any> {
      let result, subResult;
      arr.forEach(item => {
        if (item.id === id) {
          result = arr;
        } else if (item.children) {
          subResult = findNodeSiblings(item.children, id);
          if (subResult) { result = subResult; }
        }
      });
      return result;
    }

    // remove the node from its old place
    const node = event.item.data;
    const siblings = findNodeSiblings(changedData, node.id);
    const siblingIndex = siblings.findIndex(n => n.id === node.id);
    const nodeToInsert: FileNode = siblings.splice(siblingIndex, 1)[0];

    // determine where to insert the node
    const nodeAtDest = visibleNodes[event.currentIndex];
    if (nodeAtDest.id === nodeToInsert.id) { return; }

    // determine drop index relative to destination array
    let relativeIndex = event.currentIndex; // default if no parent
    const nodeAtDestFlatNode = this.treeControl.dataNodes.find(n => nodeAtDest.id === n.id);
    const parent = this.getParentNode(nodeAtDestFlatNode);
    if (parent) {
      const parentIndex = visibleNodes.findIndex(n => n.id === parent.id) + 1;
      relativeIndex = event.currentIndex - parentIndex;
    }
    // insert node
    const newSiblings = findNodeSiblings(changedData, nodeAtDest.id);
    if (!newSiblings) { return; }
    newSiblings.splice(relativeIndex, 0, nodeToInsert);

    // console.log('changed data');
    // console.log(changedData);
    let menuIndex = this.menuDetail.findIndex(x => x.id == nodeAtDest.id.substr(0, nodeAtDest.id.length - 2));

    // rebuild tree with mutated data
    this.rebuildTreeForData(changedData, dragNode, dragDropApi);
  }

  /**
   * Experimental - opening tree nodes as you drag over them
   */
  dragStart() {
    this.dragging = true;
  }
  dragEnd() {
    this.dragging = false;
  }

  /**
   * The following methods are for persisting the tree expand state
   * after being rebuilt
   */
  splitValue(value, indexSplit) {
    if (value !== undefined) {
      return (value.split('_')[indexSplit]);
    }
    else {
      return '';
    }
  }
  rebuildTreeForData(data: any, dragNode?, dragDropApi?) {

    let dragNodeParent: any;
    let childNode: any;
    let parentNode: any;
    let nodeAboveDrag: any;
    let nodeBelowDrag: any;
    let node = [];
    let isUpdate = true;
    let NotNotify = false;
    this.rememberExpandedTreeNodes(this.treeControl, this.expandedNodeSet);
    this.dataSource.data = data;
    this.forgetMissingExpandedNodes(this.treeControl, this.expandedNodeSet);
    this.expandNodesById(this.treeControl.dataNodes, Array.from(this.expandedNodeSet));
    // CALL API TO SEND DATA WITH TREE MENU NODE

    // POST DATA AFTER DROPPING
    // GET CHANGED DATA AS IN data variable
    if (dragNode !== undefined) {

      dragNodeParent = dragNode.split('_')[3];
    }

    // FIND PARENT OF DROPPED NODE IN data array
    for (let i = 0; i < data.length; i++) {
      if (data[i].filename == dragNode) {
        childNode = data[i].filename;
        nodeBelowDrag = data[i + 1].filename;
        break;
      }
      else if (data[i].children !== undefined) {
        for (let j = 0; j < data[i].children.length; j++) {
          if (data[i].children[j].filename == dragNode) {

            childNode = data[i].children[j].filename;
            parentNode = data[i].filename;
            if (data[i].children[j - 1] !== undefined) {
              nodeAboveDrag = data[i].children[j - 1].filename;
            }
            if (data[i].children[j + 1]) {
              nodeBelowDrag = data[i].children[j + 1].filename;
            }

            break;
          }
          else { // CHECK IF NODE NOT EXIST
            if (data[i].children[j].children !== undefined) {
              for (let k = 0; k < data[i].children[j].children.length; k++) {
                if (data[i].children[j].children[k].filename == dragNode) {
                  childNode = data[i].children[j].children[k].filename;
                  parentNode = data[i].children[j].filename;
                  if (data[i].children[j].children[k - 1] !== undefined) {
                    nodeAboveDrag = data[i].children[j].children[k - 1].filename;
                  }
                  if (data[i].children[j].children[k + 1] !== undefined) {
                    nodeBelowDrag = data[i].children[j].children[k + 1].filename;
                  }
                  break;
                }

                else {
                  // 2nd level
                  if (data[i].children[j].children[k].children !== undefined) {
                    for (let l = 0; l < data[i].children[j].children[k].children.length; l++) {

                      if (data[i].children[j].children[k].children[l].filename == dragNode) {
                        childNode = data[i].children[j].children[k].children[l].filename;
                        parentNode = data[i].children[j].children[k].filename;
                        if (data[i].children[j].children[k].children[l - 1] !== undefined) {
                          nodeAboveDrag = data[i].children[j].children[k].children[l - 1].filename;

                        }
                        if (data[i].children[j].children[k].children[l + 1] !== undefined) {
                          nodeBelowDrag = data[i].children[j].children[k].children[l + 1].filename;
                        }
                        break;
                      }
                      else {
                        // 3rd level
                        if (data[i].children[j].children[k].children[l].children !== undefined) {
                          for (let m = 0; m < data[i].children[j].children[k].children[l].children.length; m++) {

                            if (data[i].children[j].children[k].children[l].children[m].filename == dragNode) {


                              childNode = data[i].children[j].children[k].children[l].children[m].filename;
                              parentNode = data[i].children[j].children[k].children[l].filename;
                              if (data[i].children[j].children[k].children[l].children[m - 1] !== undefined) {
                                nodeAboveDrag = data[i].children[j].children[k].children[l].children[m - 1].filename;


                              }
                              if (data[i].children[j].children[k].children[l].children[m + 1] !== undefined) {
                                nodeBelowDrag = data[i].children[j].children[k].children[l].children[m + 1].filename;
                              }
                              break;
                            }
                            else {
                              // 4th level
                              if (data[i].children[j].children[k].children[l].children[m].children !== undefined) {

                                for (let n = 0; n < data[i].children[j].children[k].children[l].children[m].children.length; n++) {

                                  if (data[i].children[j].children[k].children[l].children[m].children[n].filename == dragNode) {


                                    childNode = data[i].children[j].children[k].children[l].children[m].children[n].filename;
                                    parentNode = data[i].children[j].children[k].children[l].children[m].filename;
                                    if (data[i].children[j].children[k].children[l].children[m].children[n - 1] !== undefined) {
                                      nodeAboveDrag = data[i].children[j].children[k].children[l].children[m].children[n - 1].filename;


                                    }
                                    if (data[i].children[j].children[k].children[l].children[m].children[n + 1] !== undefined) {
                                      nodeBelowDrag = data[i].children[j].children[k].children[l].children[m].children[n + 1].filename;
                                    }
                                    break;
                                  }
                                  else {
                                    //5th level
                                    if (data[i].children[j].children[k].children[l].children[m].children[n].children !== undefined) {
                                      for (let o = 0; o < data[i].children[j].children[k].children[l].children[m].children[n].children.length; o++) {

                                        if (data[i].children[j].children[k].children[l].children[m].children[n].children[o].filename == dragNode) {


                                          childNode = data[i].children[j].children[k].children[l].children[m].children[n].children[o].filename;
                                          parentNode = data[i].children[j].children[k].children[l].children[m].children[n].filename;
                                          if (data[i].children[j].children[k].children[l].children[m].children[n].children[o - 1] !== undefined) {
                                            nodeAboveDrag = data[i].children[j].children[k].children[l].children[m].children[n].children[o - 1].filename;


                                          }
                                          if (data[i].children[j].children[k].children[l].children[m].children[n].children[o + 1] !== undefined) {
                                            nodeBelowDrag = data[i].children[j].children[k].children[l].children[m].children[n].children[o + 1].filename;
                                          }
                                          break;
                                        }
                                        else {
                                          // 6th level
                                          if (data[i].children[j].children[k].children[l].children[m].children[n].children[o].children !== undefined) {
                                            for (let p = 0; p < data[i].children[j].children[k].children[l].children[m].children[n].children[o].children.length; p++) {

                                              if (data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].filename == dragNode) {


                                                childNode = data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].filename;
                                                parentNode = data[i].children[j].children[k].children[l].children[m].children[n].children[o].filename;
                                                if (data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p - 1] !== undefined) {
                                                  nodeAboveDrag = data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p - 1].filename;


                                                }
                                                if (data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p + 1] !== undefined) {
                                                  nodeBelowDrag = data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p + 1].filename;
                                                }
                                                break;
                                              }
                                              else {
                                                // 7th level
                                                if (data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children !== undefined) {
                                                  for (let q = 0; q < data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children.length; q++) {

                                                    if (data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q].filename == dragNode) {


                                                      childNode = data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q].filename;
                                                      parentNode = data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].filename;
                                                      if (data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q - 1] !== undefined) {
                                                        nodeAboveDrag = data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q - 1].filename;


                                                      }
                                                      if (data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q + 1] !== undefined) {
                                                        nodeBelowDrag = data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q + 1].filename;
                                                      }
                                                      break;
                                                    }
                                                    else {
                                                      // 8th level start
                                                      if (data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q].children !== undefined) {
                                                        for (let r = 0; r < data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q].children.length; r++) {

                                                          if (data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q].children[r].filename == dragNode) {


                                                            childNode = data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q].children[r].filename;
                                                            parentNode = data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q].filename;
                                                            if (data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q].children[r - 1] !== undefined) {
                                                              nodeAboveDrag = data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q].children[r - 1].filename;


                                                            }
                                                            if (data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q].children[r + 1] !== undefined) {
                                                              nodeBelowDrag = data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q].children[r + 1].filename;
                                                            }
                                                            break;
                                                          } else {
                                                            // 9th level
                                                            if (data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q].children[r].children !== undefined) {
                                                              for (let s = 0; s < data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q].children[r].children.length; s++) {

                                                                if (data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q].children[r].children[s].filename == dragNode) {


                                                                  childNode = data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q].children[r].children[s].filename;
                                                                  parentNode = data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q].children[r].filename;
                                                                  if (data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q].children[r].children[s - 1] !== undefined) {
                                                                    nodeAboveDrag = data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q].children[r].children[s - 1].filename;


                                                                  }
                                                                  if (data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q].children[r].children[s + 1] !== undefined) {
                                                                    nodeBelowDrag = data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q].children[r].children[s + 1].filename;
                                                                  }
                                                                  break;
                                                                }
                                                                else {
                                                                  // 10th level
                                                                  if (data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q].children[r].children[s].children !== undefined) {
                                                                    for (let t = 0; t < data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q].children[r].children[s].children.length; t++) {

                                                                      if (data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q].children[r].children[s].children[t].filename == dragNode) {


                                                                        childNode = data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q].children[r].children[s].children[t].filename;
                                                                        parentNode = data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q].children[r].children[s].filename;
                                                                        if (data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q].children[r].children[s].children[t - 1] !== undefined) {
                                                                          nodeAboveDrag = data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q].children[r].children[s].children[t - 1].filename;


                                                                        }
                                                                        if (data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q].children[r].children[s].children[t + 1] !== undefined) {
                                                                          nodeBelowDrag = data[i].children[j].children[k].children[l].children[m].children[n].children[o].children[p].children[q].children[r].children[s].children[t + 1].filename;
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }

                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }


                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }

                      }
                    }
                  }
                }
              }

            }

          }

        }

      }
    }
    // SEND DATA
    if (childNode !== undefined && childNode.length > 0) {

      node.push({ 'currentParentId': this.splitValue(parentNode, 1), 'oldParentId': this.splitValue(childNode, 3), 'index': this.splitValue(childNode, 1), 'id': this.splitValue(childNode, 2), 'aboveNodeId': this.splitValue(nodeAboveDrag, 2) !== '' ? this.splitValue(nodeAboveDrag, 2) : this.splitValue(parentNode, 2), nodeAboveDrag, 'belowNodeId': this.splitValue(nodeBelowDrag, 2) });

      // SEND request
      let data_grid = {
        'data': [{
          'type': 'treeControl',
          'node': node
        }]
      };
      this._dynamoService.menuNext(data_grid, dragDropApi).subscribe((formResponse) => {

        // SEND DATA FROM HERE TO PARENT COMPONENT

        for (let i = 0; i < formResponse.data.length; i++) {

          if (formResponse.data[i].type == 'pageInit') {

          }
          else if (formResponse.data[i].type == 'notify') {
            NotNotify = false;
            if (formResponse.data[i].msg !== undefined || formResponse.data[i].alert !== undefined) {
              if (formResponse.data[i].alert !== null || formResponse.data[i].msg !== null) {
                this.setmessage = formResponse.data[i];
              }
            }
            isUpdate = formResponse.data[i].isUpdate !== undefined ? formResponse.data[i].isUpdate : true;
          }
          else if (formResponse.data[i].type == 'action') {
            NotNotify = false;
            this.handleAction(formResponse.data[i]);

          }
          else {
            NotNotify = true;
          }

        }
        if (!isUpdate) {
          let treeControl = JSON.parse(sessionStorage.getItem('treeState'));
          this.bindResponsenew(treeControl, 'addMenu');
        }
        if (NotNotify) {
          this.handleResInParent.emit(formResponse);
        }


      }, error => this.handleError(error));

    }

  }

  private rememberExpandedTreeNodes(
    treeControl: FlatTreeControl<FileFlatNode>,
    expandedNodeSet: Set<string>
  ) {
    if (treeControl.dataNodes) {
      treeControl.dataNodes.forEach((node) => {
        if (treeControl.isExpandable(node) && treeControl.isExpanded(node)) {
          // capture latest expanded state
          expandedNodeSet.add(node.id);
        }
      });
    }
  }

  private forgetMissingExpandedNodes(
    treeControl: FlatTreeControl<FileFlatNode>,
    expandedNodeSet: Set<string>
  ) {
    if (treeControl.dataNodes) {
      expandedNodeSet.forEach((nodeId) => {
        // maintain expanded node state
        if (!treeControl.dataNodes.find((n) => n.id === nodeId)) {
          // if the tree doesn't have the previous node, remove it from the expanded list
          expandedNodeSet.delete(nodeId);
        }
      });
    }
  }

  private expandNodesById(flatNodes: FileFlatNode[], ids: string[]) {
    //
    if (!flatNodes || flatNodes.length === 0) return;
    const idSet = new Set(ids);
    return flatNodes.forEach((node) => {
      if (idSet.has(node.id)) {
        this.treeControl.expand(node);
        let parent = this.getParentNode(node);
        while (parent) {
          this.treeControl.expand(parent);
          parent = this.getParentNode(parent);
        }
      }
    });
  }

  private getParentNode(node: FileFlatNode): FileFlatNode | null {
    const currentLevel = node.level;
    if (currentLevel < 1) {
      return null;
    }
    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];
      if (currentNode.level < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }


  public handleClick(event: MouseEvent, hasChild?, node?): void {
    localStorage.setItem('api', JSON.stringify({}));
    this.idParentIndex = undefined;
    this.selectedIndex = this.parseIndex(node.filename);
    this.showExpansion = [];
    this.mainContent = { 'showMainContent': '', 'formWidth': '', 'data': '' };
    if (this.dragging) {
      this.dragging = false;
      return;
    }

    // CALL API
    // call api appending with node id and parent id if exist
    let currentNodeId = node.ids;
    let menuIndex = this.menuDetail.findIndex(x => x.id == node.id.substr(0, node.id.length - 2));
    let parentId = menuIndex >= 0 ? this.menuDetail[menuIndex].ids : '';
    /** CALL API  */
    // THIS IS USED FOR SUBMITTING SUB MENU ITEM
    this.database.currentNodeId = currentNodeId;
    this.apiCall(node.api, node.filename);
  }

  apiCall(api,node) {

    api = { 'parent': node.split('_')[3], 'index': node.split('_')[1], 'id': node.split('_')[2] };

    localStorage.setItem('api', JSON.stringify(api));

  }

  getInputValue() {
    this.treeControl.collapseAll();
    this.nodeSelected = false;
    let value = <HTMLInputElement>document.getElementById('searchnode');
    this.searchTerm = value.value;
    let parentId = [];
    // FIND CHILD HAVING THAT STRING
    // let data = this.initialData;
    let data = JSON.parse(JSON.stringify(this.dataSource.data));


    for (let i = 0; i < this.treeControl.dataNodes.length; i++) {

      if ((this.treeControl.dataNodes[i].filename.split('_')[0]).toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1) {

        // parentId.push(this.getArrElement(this.treeControl.dataNodes[i].filename));
        if (!this.nodeSelected) {
          this.selectedIndex = parseInt(this.treeControl.dataNodes[i].filename.split('_')[1]);
          let elementIndex = this.newModesWithParent.findIndex(x => x.index == this.selectedIndex);
          this.idParentIndex = this.newModesWithParent[elementIndex];
          this.nodeSelected = true;
        }
        parentId.push(this.treeControl.dataNodes[i].filename.split('_')[4].split('*'));
      }


    }
    parentId.forEach((element, index) => {
      this.expandNode(element);
    });

  }


  expandNode(parentId) {
    for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
      for (let j = 0; j < parentId.length; j++) {
        if (this.treeControl.dataNodes[i].filename.split('_')[1] == parentId[j]) {
          this.treeControl.expand(this.treeControl.dataNodes[i]);

        }

      }

    }

  }
  parseValue(value) {
    return value.split('_')[0];
  }
  parseIndex(value) {
    return value.split('_')[1];
  }
  parseParent(value, node) {
    // console.log('node',node);
    return value.split('_')[3];
  }

  bindResponsenew(result, addMenu, fromMainMenu?, hidemenu?) {
    this.loader = environment.displayBlock;

    this.formFields = [];
    this.expandedNode = [];
    this.showExpansion = [];
    let widthDynamic: string;
    let pageInIt: any;
    let dataObject = [];

    if (result !== undefined && result.data !== undefined) {

      this.loader = environment.displayNone;
      for (let i = 0; i < result.data.length; i++) {
        if (result.data[i].type == 'pageInit') {

          //  result.data[i].clearPage = hidemenu == 'hidemenu' ? true : false;
          if (result.data[i].clearPage) {
            this.buttonresponsePage = [];
            this.newModesWithParent = [];
            this.buttonsMenuSubMenu = [];
          }
          pageInIt = result.data[i];
          if (result.data[i].showBusy !== undefined && result.data[i].showBusy) {
            this.loader = environment.displayBlock;
          }
        } else if (result.data[i].type == 'treeControl') {

          /* STORE TREE CONTROL IN A VARIABLE SO IT CAN BE USED FOR SHOWING TREE CONTROL WHEN USER
          MOVE ANY NODE ABOVE MAIN NODE */
          sessionStorage.setItem('treeState', JSON.stringify(result));
          /** CALL initialize method of filedatabase */
          //  let newModesWithParent = [];
          this.columnWidth = '80%';
          for (let j = 0; j < result.data[i].nodes.length; j++) {
            this.newModesWithParent.push({ 'text': result.data[i].nodes[j].text, 'id': result.data[i].nodes[j].id, 'index': result.data[i].nodes[j].index, 'parent': result.data[i].nodes[j].parents[0] == undefined ? 0 : result.data[i].nodes[j].parents[0], 'parents': result.data[i].nodes[j].parents });

            /** EXPAND ARRAY ADDED  */
            if (result.data[i].nodes[j].expand !== undefined && result.data[i].nodes[j].expand) {
              this.expandedNode.push({ 'id': result.data[i].nodes[j], 'index': result.data[i].nodes[j].index, 'parents': result.data[i].nodes[j].parents });
            }
          }
          // console.log(newArr2);

          result.data[i].nodes = this.newModesWithParent;
          // set root id,parent,index
          let rootElementIndex = result.data[i].nodes.findIndex(x => x.parent == 0);
          //  alert(rootElementIndex);
          this.idParentIndex = result.data[i].nodes[rootElementIndex];
          // console.log('ind',result.data[i].nodes[this.idParentIndex]);
          this.selectedIndex = result.data[i].selectedIndex;
          let elementIndex = result.data[i].nodes.findIndex(x => x.index == this.selectedIndex);
          this.idParentIndex = result.data[i].nodes[elementIndex];
          this.dragDropApi = result.data[i].dragDropApi;

          for (let k = 0; k < result.data[i].buttons.length; k++) {
            this.buttonsMenuSubMenu.push(result.data[i].buttons[k]);
          }
          this.buttonsMenuSubMenu = this.buttonsMenuSubMenu.reverse();
          this.nodesResponse(this.newModesWithParent);

        }

        if (result.data[i].type == 'buttons') {

          for (let j = 0; j < result.data[i].buttons.length; j++) {

            this.buttonresponsePage.push(result.data[i].buttons[j]);

          }


        }

      }
    }

   this.loader = environment.displayNone;

  }


  callGetInput(event) {
    if (event.key == ' ') {
  this.getInputValue();
   }
  }


  callGetInputEnter
  (event) {
    if (event.key == 'Enter') {
  this.getInputValue();
   }
  }

  nodesResponse(response) {
    let nodes: any[] = [];

    nodes = response;
    let parentNodes: any[] = [];

    parentNodes = nodes.filter(x => x.parent == 0);

    this.columnWidth = '80%';
    /** set text with id, index */
    let MainNodes = [];
    this.a = nodes;
    const singleObj = this.findFor(0);

    this.database.initialize(singleObj, 'api');

    this.expandParentIfExist(this.idParentIndex);
    /** CHECK FOR EXPANDED NODE */
    if (this.expandedNode.length > 0)
      // EXPAND ALL PARENT NODE
      this.expandedParentIfExist(this.expandedNode);
  }
  childNodesNew: any[] = [];
  a = [
  ];
  nodeArr = [];
  nodeObj: any;
  findFor(parentId) {
    // create a new object to store the result
    //
    let z = {};
    // let z: any;

    // for each item in a
    for (let i = 0; i < this.a.length; i++) {

      // find all children of parentId
      if (this.a[i].parent === parentId) {


        // recursively find children for each children of parentId
        let ch = this.findFor(this.a[i].index);

        // if it has no children, skip adding the children prop
        var o = Object.keys(ch).length === 0 ? 'aaa' : { ch };

        if (Object.keys(ch).length === 0 && !this.a[i].isParent) {
          z[this.a[i].text + '_' + this.a[i].index + '_' + this.a[i].id + '_' + this.a[i].parent + '_' + this.getAllParentOfNode(this.a[i].parents)] = ''; //Object.assign({ [this.a[i].text + '_' + this.a[i].index]: ch }, [this.a[i].text + '_' + this.a[i].index]);
          this.nodeObj = this.nodeObj + '_' + this.a[i].parent;
          this.nodeArr.push(this.nodeObj);
          this.nodeObj = '';
        }  //console.log('child===>z',z);
        // }
        else {
          z[this.a[i].text + '_' + this.a[i].index + '_' + this.a[i].id + '_' + this.a[i].parent + '_' + this.getAllParentOfNode(this.a[i].parents)] = ch;
          this.nodeObj = this.nodeObj + '_' + this.a[i].parent;
        }

      }
    }

    return z;
  }
  isForm = null; // addSelection

  getAllParentOfNode(elements) {
    return elements.length == 0 ? 0 : elements.join('*');

  }
  addMenuItemRes(api, showMneu, action) {
    let apiLocal: any = {};
    let id: any;
    let index: any;
    let parent: any;

    if (this.idParentIndex == undefined) {
      apiLocal = JSON.parse(localStorage.getItem('api'));
    }
    // CHECK IF ANY NODE IS CLICKED ELSE PARENT IS 0

    else {
      id = this.idParentIndex.id;
      index = this.idParentIndex.index;
      parent = this.idParentIndex.parent;
    }
    // console.log(id,index);
    if (apiLocal.parent == undefined) {
      if (api.includes('?')) {
        api = api + '&id=' + id + '&parent=' + parent + '&index=' + index; // api + '?parent=' + 0;
      }
      else {
        api = api + '?id=' + id + '&parent=' + parent + '&index=' + index;
      }
    }
    else if (apiLocal.parent !== undefined) {
      if (api.includes('?')) {
        api = api + '&id=' + apiLocal.id + '&parent=' + apiLocal.parent + '&index=' + apiLocal.index; // api + '?parent=' + 0;
      }
      else {
        api = api + '?id=' + apiLocal.id + '&parent=' + apiLocal.parent + '&index=' + apiLocal.index;
      }

    }

    let NotNotify = false;

    const property = this._dynamoService.getValue(api, 'showBusy');
    if (property) {
      this.loader = environment.displayBlock;
    }
    const showBusyText = this._dynamoService.getValueShowBusyText(api, 'showBusyText');
      if (showBusyText !== undefined && showBusyText.length > 0) {
        this.showBusyText = showBusyText.replaceAll('+', ' ');
    }
    this._dynamoService.getDetailsScan(api).subscribe((formResponse) => {
      // SEND DATA FROM HERE TO PARENT COMPONENT
      this.loader = environment.displayNone;
      this.showBusyText = '';
      for (let i = 0; i < formResponse.data.length; i++) {

        if (formResponse.data[i].type == 'pageInit') {
          if (formResponse.data[i].clearPage) {

          }
        }
        else if (formResponse.data[i].type == 'notify') {
          NotNotify = false;
          if (formResponse.data[i].msg !== undefined || formResponse.data[i].alert !== undefined) {
            if (formResponse.data[i].alert !== null || formResponse.data[i].msg !== null) {
              this.setmessage = formResponse.data[i];
            }
          }

        }
        else if (formResponse.data[i].type == 'action') {
          NotNotify = false;
          this.handleAction(formResponse.data[i]);

        }
        else {
          NotNotify = true;
        }

      }

      if (NotNotify) {

        this.handleResInParent.emit(formResponse);
      }


    }, error => this.handleError(error));
  }

  expandParentIfExist(idParentIndex) {
    let parentId: any;
    parentId = idParentIndex.parents;
    if (this.treeControl !== undefined && this.treeControl.dataNodes !== undefined) {
      for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
        for (let j = 0; j < parentId.length; j++) {
          if (this.treeControl.dataNodes[i].filename.split('_')[1] == parentId[j]) {
            this.treeControl.expand(this.treeControl.dataNodes[i]);

          }

        }

      }
    }
  }

  expandedParentIfExist(parents) {

    if (this.treeControl !== undefined && this.treeControl.dataNodes !== undefined) {
      for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
        for (let j = 0; j < parents.length; j++) {
          for (let k = 0; k < parents[j].parents.length; k++) {
            if (this.treeControl.dataNodes[i].filename.split('_')[1] == parents[j].parents[k]) {
              this.treeControl.expand(this.treeControl.dataNodes[i]);

            }

          }
          if (this.treeControl.dataNodes[i].filename.split('_')[1] == parents[j].index) {
            this.treeControl.expand(this.treeControl.dataNodes[i]);

          }
        }

      }
    }
  }


  clicked(id) {
    // alert(id);
  }


  cancel(param, api_route, showMenu, popup_zindex?) {

    let obj = { 'action': param, 'onPush': api_route, 'showMenu': showMenu };
    this.handleCancelInParent.emit(obj);



  }
  handleAction(response) {
    if (response.newPage) {
      window.open(response.url, '_blank');
    }
    else {
      window.open(response.url, '_self');
    }

    if (response.newPage && response.success && response.showMenu) {
      let obj = { 'action': 'routing', 'onPush': '', 'showMenu': response.showMenu };
      this.handleCancelInParent.emit(obj);

    }

  }



  enableSubmitButtonInParent(event) {

    event == event == undefined || event ? true : false;

    let ind = this.buttonresponsePage.findIndex(x => x.buttonType == 'submit');
    if (ind >= 0) {
      this.buttonresponsePage[ind].isEnabled = event;
    }


  }
  handleError(error) {

    if (error.error !== undefined) {
      for (let i = 0; i < error.error.data.length; i++) {
        if (error.error.data[i].type == 'notify') {
          if (error.error.data[i].msg !== undefined || error.error.data[i].alert !== undefined) {
            if (error.error.data[i].alert !== null || error.error.data[i].msg !== null) {
              this.setmessage = error.error.data[i];
            }
          }

        }
      }

      this.handleResInParent.emit(error.error);
    }
    else if (error.message !== undefined) {
      alert(error.message);
    }

    else {
      if (error.error.alert !== undefined) {
        alert(error.error.alert);
      }
      else {
        toast(error.statusText, 4000);
      }
    }

  }
  print() {
    window.print();
  }


}
