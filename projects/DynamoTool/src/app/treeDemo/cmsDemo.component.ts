import { FlatTreeControl } from "@angular/cdk/tree";
import { Component, Injectable, QueryList, EventEmitter, ElementRef, Input, ViewChildren, Output } from "@angular/core";
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree";
import { BehaviorSubject, Observable, of as observableOf } from "rxjs";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { Router, ActivatedRoute } from "@angular/router";
import { DynamoToolShareService } from "../dynamoToolHome/dynamoToolShare.service";
import { CmsService } from "./cms.service";
import { toast } from "angular2-materialize";
import { environment } from "../../environments/environment";

/**
 * File node data with nested structure.
 * Each node has a filename, and a type or a list of children.
 */

/** FOR ACCORDION */

import { OnInit, ViewChild } from "@angular/core";
import { MatAccordion } from "@angular/material/expansion";
// import { findIndex } from 'rxjs/operators';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export class FileNode {
  id: string;
  children: FileNode[];
  filename: string;
  type: any;
}

/** Flat node with expandable and level information */
export class FileFlatNode {
  constructor(public expandable: boolean, public filename: string, public level: number, public type: any, public id: string) {}
}

/**
 * The file structure tree data in string. The data could be parsed into a Json object
 */

const TREE_DATA = JSON.stringify({
  Categories: {
    Product: "app",
    Brand: "app",
  },
  Documents: {
    angular: {
      src: {
        compiler: "ts",
        core: "ts",
      },
    },
    material2: {
      src: {
        button: "ts",
        checkbox: "ts",
        input: "ts",
      },
    },
  },
  Downloads: {
    October: "pdf",
    November: "pdf",
    Tutorial: "html",
  },
  Pictures: {
    "Photo Booth Library": {
      Contents: "dir",
      Pictures: "dir",
    },
    Sun: "png",
    Woods: "jpg",
  },
});

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

  get data(): FileNode[] {
    return this.dataChange.value;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Parse the string to json object.
    const dataObject = JSON.parse(TREE_DATA);
    const data = this.buildFileTree(dataObject, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `FileNode`.
   */
  buildFileTree(obj: { [key: string]: any }, level: number, parentId: string = "0"): FileNode[] {
    return Object.keys(obj).reduce<FileNode[]>((accumulator, key, idx) => {
      const value = obj[key];
      const node = new FileNode();
      node.filename = key;
      /**
       * Make sure your node has an id so we can properly rearrange the tree during drag'n'drop.
       * By passing parentId to buildFileTree, it constructs a path of indexes which make
       * it possible find the exact sub-array that the node was grabbed from when dropped.
       */
      node.id = `${parentId}/${idx}`;

      if (value != null) {
        if (typeof value === "object") {
          node.children = this.buildFileTree(value, level + 1, node.id);
        } else {
          node.type = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }
}

/**
 * @title Tree with flat nodes
 */
@Component({
  selector: "multi-part-tree",
  templateUrl: "cmsDemo.component.html",
  styleUrls: ["cmsDemo.component.css"],
  providers: [FileDatabase, CmsService, DynamoToolShareService],
})
// tslint:disable-next-line: class-name
export class cmsDemoComponent implements OnInit {
  treeControl: FlatTreeControl<FileFlatNode>;
  treeFlattener: MatTreeFlattener<FileNode, FileFlatNode>;
  dataSource: MatTreeFlatDataSource<FileNode, FileFlatNode>;
  expandedNodeSet = new Set<string>();
  dragging = false;
  expandTimeout: any;
  expandDelay = 1000;
  panelOpenState = false;
  accordionList: any;
  currentId: Number;
  mainContent = { showMainContent: "", formWidth: "", data: "" }; // it will hold main form data
  showExpansion: any[] = []; // It will hold data of expansion panel
  formFields: any[] = []; // to hold form fields
  fieldsName: any[] = [];
  staticData: any;
  responseEditNotepad: any = [];
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
  isValidSubmit: boolean = false;
  requiredFormValidation: boolean = false;
  clearSignature: boolean = false;
  mainContentIdSet: number = -1;
  buttonHighestTabindex: any[] = [];
  highestButtonTab: number = -1;
  htmlEditTabindex: any[] = [];
  htmlData: any[] = [];
  isHtmlEdit: boolean = false;
  showBusyText: string;
  setIndex: any[] = [];
  setSessionIndex: any[] = [];
  ipAddressInvalid: boolean = false;
  macAddressInvalid: boolean = false;
  urlInvalid: boolean = false;
  emailInvalid: boolean = false;
  ustelephoneInvalid: boolean = false;
  hexadecimalInvalid: boolean = false;
  validationFormMessage: any = environment.formRequiredMessage;
  @Input()
  set showDataExpansion(response: any) {
    this.bindResponse(response, "addMenu");
  }
  @Input()
  set sendDataFromMultiPart(response: any) {
    if (response !== undefined && response !== "" && response.sendDataFromMultiPart) {
      this.submitAll(response.onPush);
    }
  }
  @Input()
  set enableButtonFromParent(response: any) {
    if (response == undefined || response == null || response == "") {
      return;
    } else if (response.length > 0) {
      for (let k = 0; k < response.length; k++) {
        const btnInd = this.buttonresponsePage.findIndex((x) => x.text == response[k].buttonstext || x.buttonType == response[k].buttonType);

        if (btnInd >= 0) {
          this.buttonresponsePage[btnInd].isEnabled = response[k].isEnabled;
        }
      }
    }
  }

  @Input() datazIndex: any;
  @Output() handleCancelInParent: EventEmitter<any> = new EventEmitter();
  @Output() handleSubmitInParent: EventEmitter<any> = new EventEmitter();
  @Output() widthMultiPart: EventEmitter<any> = new EventEmitter();
  @Output() handleButtonInParent: EventEmitter<any> = new EventEmitter();

  @ViewChild("accordion", { static: true }) Accordion: MatAccordion;

  constructor(
    database: FileDatabase,
    private _cmsServices: CmsService,
    private _dynamoService: DynamoToolShareService,
    private _activeRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel, this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<FileFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    database.dataChange.subscribe((data) => this.rebuildTreeForData(data));

    /** Accordion Data End */
  }
  ngOnInit() {
    this.loader = environment.displayNone;
    sessionStorage.setItem("entryGridDataArr", "");
  }

  transformer = (node: FileNode, level: number) => {
    return new FileFlatNode(!!node.children, node.filename, level, node.type, node.id);
  };
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
        node.children.map((child) => addExpandedChildren(child, expanded));
      }
    }
    this.dataSource.data.forEach((node) => {
      addExpandedChildren(node, this.expandedNodeSet);
    });
    return result;
  }

  /**
   * Handle the drop - here we rearrange the data based on the drop event,
   * then rebuild the tree.
   * */
  drop(event: CdkDragDrop<string[]>) {
    // ignore drops outside of the tree
    if (!event.isPointerOverContainer) {
      return;
    }

    // construct a list of visible nodes, this will match the DOM.
    // the cdkDragDrop event.currentIndex jives with visible nodes.
    // it calls rememberExpandedTreeNodes to persist expand state
    const visibleNodes = this.visibleNodes();
    // deep clone the data source so we can mutate it
    const changedData = JSON.parse(JSON.stringify(this.dataSource.data));
    // recursive find function to find siblings of node
    function findNodeSiblings(arr: Array<any>, id: string): Array<any> {
      let result, subResult;
      arr.forEach((item) => {
        if (item.id === id) {
          result = arr;
        } else if (item.children) {
          subResult = findNodeSiblings(item.children, id);
          if (subResult) {
            result = subResult;
          }
        }
      });
      return result;
    }

    // remove the node from its old place
    const node = event.item.data;
    const siblings = findNodeSiblings(changedData, node.id);
    const siblingIndex = siblings.findIndex((n) => n.id === node.id);
    const nodeToInsert: FileNode = siblings.splice(siblingIndex, 1)[0];

    // determine where to insert the node
    const nodeAtDest = visibleNodes[event.currentIndex];
    if (nodeAtDest.id === nodeToInsert.id) {
      return;
    }

    // determine drop index relative to destination array
    let relativeIndex = event.currentIndex; // default if no parent
    const nodeAtDestFlatNode = this.treeControl.dataNodes.find((n) => nodeAtDest.id === n.id);
    const parent = this.getParentNode(nodeAtDestFlatNode);
    if (parent) {
      const parentIndex = visibleNodes.findIndex((n) => n.id === parent.id) + 1;
      relativeIndex = event.currentIndex - parentIndex;
    }
    // insert node
    const newSiblings = findNodeSiblings(changedData, nodeAtDest.id);
    if (!newSiblings) {
      return;
    }
    newSiblings.splice(relativeIndex, 0, nodeToInsert);
    this.rebuildTreeForData(changedData);
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

  rebuildTreeForData(data: any) {
    this.rememberExpandedTreeNodes(this.treeControl, this.expandedNodeSet);
    this.dataSource.data = data;
    this.forgetMissingExpandedNodes(this.treeControl, this.expandedNodeSet);
    this.expandNodesById(this.treeControl.dataNodes, Array.from(this.expandedNodeSet));
  }

  private rememberExpandedTreeNodes(treeControl: FlatTreeControl<FileFlatNode>, expandedNodeSet: Set<string>) {
    if (treeControl.dataNodes) {
      treeControl.dataNodes.forEach((node) => {
        if (treeControl.isExpandable(node) && treeControl.isExpanded(node)) {
          expandedNodeSet.add(node.id);
        }
      });
    }
  }

  private forgetMissingExpandedNodes(treeControl: FlatTreeControl<FileFlatNode>, expandedNodeSet: Set<string>) {
    if (treeControl.dataNodes) {
      expandedNodeSet.forEach((nodeId) => {
        // maintain expanded node state
        if (!treeControl.dataNodes.find((n) => n.id === nodeId)) {
          expandedNodeSet.delete(nodeId);
        }
      });
    }
  }

  private expandNodesById(flatNodes: FileFlatNode[], ids: string[]) {
    if (!flatNodes || flatNodes.length === 0) {
      return;
    }
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
    //
    this.showExpansion = [];
    this.mainContent = { showMainContent: "", formWidth: "", data: "" };
    if (this.dragging) {
      this.dragging = false;
      return;
    }

    if (hasChild !== undefined) {
      for (let i = 0; i < this.accordionList.data.length; i++) {
        if (this.accordionList.data[i].id == node.id && !this.accordionList.data[i].hasOwnProperty("mainForm")) {
          this.showExpansion.push(this.accordionList.data[i]);
        } else if (this.accordionList.data[i].id == node.id && this.accordionList.data[i].hasOwnProperty("mainForm")) {
          this.mainContent.showMainContent = JSON.stringify(true);
          this.mainContent.formWidth = this.accordionList.data[i].data.data[0].width;
          this.mainContent.data = this.accordionList.data[i].data;
        }
      }
    }
  }

  apiCall(addMenu) {
    this._cmsServices.apiCall("/dt/examples/getFileMaintenance").subscribe(
      (response) => {
        if (response === null) {
          return false;
        } else {
          this.response = response;
          this.loader = environment.displayNone;

          this.bindResponse(response, addMenu);
        }
      },
      (error) => this.handleError(error)
    );
  }

  setExpanderFromApi(response) {
    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i].type == "expander") {
        for (let j = 0; j < response.data[i].action.length; j++) {
          const ind = this.showExpansion.findIndex((x) => x.viewId == response.data[i].action[j].id);
          this.showExpansion[ind].isDisabled = response.data[i].action[j].isDisabled;
          this.showExpansion[ind].isExpanded = response.data[i].action[j].isExpanded;
          this.showExpansion[ind].titleColor = response.data[i].action[j].titleColor;
          this.showExpansion[ind].hideContent = response.data[i].action[j].hideContent;
        }
      }
    }
  }

  setManualFocusForm(tab, btnObj) {
    if (tab == btnObj.tabindex) {
      this.mainContent.showMainContent = JSON.stringify(false);
      setTimeout(() => {
        this.mainContent.showMainContent = JSON.stringify(true);
        this.mainContent.data = this.accordionList.data[this.mainContentIdSet].data;
      }, 5);
    } else {
      return;
    }
  }

  bindResponse(result, addMenu) {
    this.formFields = [];
    this.buttonresponsePage = [];
    this.showExpansion = [];
    let widthDynamic: string;
    sessionStorage.removeItem(`Notepad`);
    let widthDynamicMain: any;
    let pageInIt: any;
    const dataObject = [];
    const entryGridIndexArr = [];
    // result = this._cmsServices.getStaticData();
    if (result !== undefined) {
      for (let i = 0; i < result.data.length; i++) {
        if (result.data[i].type == "pageInit") {
          pageInIt = result.data[i];
          if (result.data[i].showBusy !== undefined && result.data[i].showBusy) {
            this.loader = environment.displayBlock;
          }
        }
        if (result.data[i].mainView !== undefined) {
          const data = [];
          data.push(pageInIt);
          data.push(result.data[i].mainView);
          // data.push({ "viewId" : result.data[i].mainView.id });
          widthDynamic = result.data[i].mainView.width !== undefined ? result.data[i].mainView.width : "100%";
          widthDynamicMain = widthDynamic;
          const result1 = {
            id: result.data[i].id == "someID" ? "addMenu" : "addMenu",
            mainForm: true,
            title: result.data[i].title,
            data: { data: data },
            isDisabled: result.data[i].isDisabled,
          };

          dataObject.push(result1);
        }
        if (result.data[i].subViews !== undefined) {
          for (let j = 0; j < result.data[i].subViews.length; j++) {
            if (result.data[i].subViews[j].view.type == "entryGrid") {
              entryGridIndexArr.push({ gridIndex: result.data[i].subViews[j].view.gridRefNo, expanderTitle: result.data[i].subViews[j].title });
            }
            if (result.data[i].subViews[j].view.type == "htmlEdit" && result.data[i].subViews[j].view.readonly == false) {
              {
                const customObj = { hexkey: "", filename: "", type: "", name: "", value: "" };
                customObj.hexkey = result.data[i].subViews[j].view.hexkey;
                customObj.filename = result.data[i].subViews[j].view.filename;
                customObj.type = "htmledit";
                customObj.name = result.data[i].subViews[j].view.name;
                customObj.value = result.data[i].subViews[j].view.htmledit;
                this.responseEditNotepad.push(customObj);
                sessionStorage.removeItem(`Notepad`);
                sessionStorage.setItem(`Notepad`, JSON.stringify(this.responseEditNotepad));
              }
            }
            const data = [];
            widthDynamicMain = widthDynamic;
            const isMultiPart = result.data[i].subViews[j].view.type == "displayGrid" ? true : false;
            data.push(pageInIt);
            // TO HANDLE relatedGrid object
            result.data[i].subViews[j].view.isMultiPart = isMultiPart;
            /** id of expander */
            result.data[i].subViews[j].view.viewId = result.data[i].subViews[j].id;
            data.push(result.data[i].subViews[j].view);
            const result1 = {
              id: result.data[i].subViews[j].id == "someID" ? "addMenu" : "addMenu",
              mainForm: false,
              title: result.data[i].subViews[j].title,
              description: result.data[i].subViews[j].description,
              data: { data: data },
              isDisabled: result.data[i].subViews[j].isDisabled,
              viewId: result.data[i].subViews[j].id,
              hideContent: false,
              isExpanded: result.data[i].subViews[j].isExpanded,
              titleColor: result.data[i].subViews[j].titleColor,
              tabindex: result.data[i].subViews[j].tabindex, // added 4 oct 2021
              updateApi: result.data[i].subViews[j].onFirstExpandApi,
            };
            dataObject.push(result1);
            // VIEW LENGTH
          }
        }
        if (result.data[i].type == "buttons") {
          for (let j = 0; j < result.data[i].buttons.length; j++) {
            this.buttonresponsePage.push(result.data[i].buttons[j]);
            this.buttonHighestTabindex.push(result.data[i].buttons[j].tabindex);
            // USE TO SEND DATA FROM ENTRYGRID COMPONENT ON NAVIGATION CLICK WITHOUT CLICKING ON SAVE BUTTON
            if (result.data[i].buttons[j].buttonType !== undefined && result.data[i].buttons[j].buttonType == "submit") {
              this.submitApiEntryGridMultipart = result.data[i].buttons[j].onPush;
            }
          }
          // HANDLE navigation inside button object
          if (result.data[i].navigation !== undefined) {
            this.formsNavigation = result.data[i].navigation;
            this.formsNavigationCss = environment.displayBlock;
          }
          // FIND HIGHEST TABINDEX OF BUTTON
          this.highestButtonTab = Math.max(...this.buttonHighestTabindex);
        }
      }
    }

    this.accordionList = { data: dataObject };

    this.getPreviousState(this.accordionList);
    for (let i = 0; i < this.accordionList.data.length; i++) {
      if (this.accordionList.data[i].id == addMenu && !this.accordionList.data[i].mainForm) {
        this.showExpansion.push(this.accordionList.data[i]);
        this.formFields.push(this.accordionList.data[i].data);
      }
      if (this.accordionList.data[i].id == addMenu && this.accordionList.data[i].mainForm) {
        this.mainContent.showMainContent = JSON.stringify(true);

        this.mainContent.formWidth = this.accordionList.data[i].data.data[0].width;
        this.mainContent.data = this.accordionList.data[i].data;
        this.formFields.push(this.accordionList.data[i].data);
        this.mainContentIdSet = i; // ADDED 18 Oct 2021
      }
    }

    if (widthDynamic !== undefined && widthDynamic !== "") {
      this.setwidthMultiPart(widthDynamicMain);
    }

    this.loader = environment.displayNone;
    sessionStorage.setItem("isValidonMultipart", JSON.stringify(false));
    // console.log(entryGridIndexArr);
    sessionStorage.setItem("entryGridIndexArr", JSON.stringify(entryGridIndexArr));
  }

  setwidthMultiPart(widthDynamic) {
    // use this width inside parent component
    this.widthMultiPart.emit(widthDynamic);
  }
  /** CHECK ANY FIELD ON FORM IS INVALID */
  anyInvalidField(event) {
    event = event !== undefined && event ? true : false;
  }
  sendNofileOnSubmit(event: boolean = true) {
    if (!event) {
      // CODE TO UNBIND DATA OF FILE OBJECT WHEN USER CLICK ON SAVE BUTTON
      this.sendNoFile = true;
    }
  }

  /** ADDED TO TAKE PREVIOUS STATE OF MULTIPART FORM TO DETECT CHANGE */
  getPreviousState(data) {
    sessionStorage.setItem("accordionList", JSON.stringify(data));
  }
  /** functions of accordion */

  beforePanelClosed(panel) {
    panel.isExpanded = false;
  }

  handleShowBusy(url) {
    const property = this._dynamoService.getValue(url, "showBusy");
    if (property) {
      this.loader = environment.displayBlock;
    }
    const showBusyText = this._dynamoService.getValueShowBusyText(url, "showBusyText");
    if (showBusyText !== undefined && showBusyText.length > 0) {
      this.showBusyText = showBusyText.replaceAll("+", " ");
    }
  }

  beforePanelOpened(panel, index?, api?) {
    const indexs = this.setIndex.indexOf(panel.tabindex);
    panel.isExpanded = true;
    if (indexs == -1) {
      if (api !== undefined) {
        this.handleShowBusy(api);
        let ind = -1;
        this._cmsServices.getExpainderDetails(api).subscribe(
          (response) => {
            this.loader = environment.displayNone;
            this.setIndex.push(panel.tabindex);
            if (response === null) {
              return false;
            } else {
              for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].type == "pageInit") {
                } else {
                  ind = this.showExpansion.findIndex((x) => x.tabindex == response.data[i].tabindex);
                  if (ind >= 0) {
                    this.showExpansion[ind].data.data[1] = response;
                    panel.data = response;
                  }
                }
              }
            }
          },
          (error) => this.handleError(error)
        );
      }
    }
  }

  afterPanelClosed() {
    // console.log("Panel closed!");
  }
  afterPanelOpened(event) {
    // console.log("Panel opened!");
  }

  closeAllPanels() {
    this.Accordion.closeAll();
  }
  openAllPanels() {
    this.Accordion.openAll();
  }
  clicked(id) {}

  sendFileData(event) {
    this.fileDataArray.push(event);
  }

  submitAll(onPush, showMenu?, action?, btnObj?) {
    const notepadData = JSON.parse(sessionStorage.getItem(`Notepad`));
    if (!btnObj.isEnabled) {
      return false;
    }
    this.validationFormMessage = environment.formRequiredMessage;
    const checkProperty = this._dynamoService.getValue(onPush, "showBusy");
    const showBusyText = this._dynamoService.getValueShowBusyText(onPush, "showBusyText");
    if (showBusyText !== undefined && showBusyText.length > 0) {
      this.showBusyText = showBusyText.replaceAll("+", " ");
    }
    if (checkProperty) {
      setTimeout(() => {
        //this.loader = environment.displayBlock;
      }, 50);
    }

    let invalidMessage: string = "";
    this.requiredFormValidation = false;
    // SHOW BUSY INDICATOR
    const ind = this.buttonresponsePage.findIndex((x) => x.buttonType == "submit");
    if (ind >= 0) {
      invalidMessage = this.buttonresponsePage[ind].invalidMessage;
    }

    if (btnObj !== undefined && btnObj !== "") {
      const btnInd = this.buttonresponsePage.findIndex((x) => x.disableOnClick == true && x.text == btnObj.text);

      if (btnInd >= 0) {
        this.buttonresponsePage[btnInd].isEnabled = false;
      }
    }
    const data = [];

    let ddname;
    let viewid;
    let cc;
    let hexkey;
    let isEntryGrid: boolean = false;
    let NotNotify = false;
    let entryGridDataArr: any[] = [];
    const addressField = [];
    const mainContent = JSON.parse(JSON.stringify(this.mainContent.data));
    for (let k = 0; k < mainContent.data.length; k++) {
      if (mainContent.data[k].type == "form") {
        ddname = mainContent.data[k].ddname;
        viewid = mainContent.data[k].viewid;
        cc = mainContent.data[k].cc;
        hexkey = mainContent.data[k].hexkey;
        for (let m = 0; m < mainContent.data[k].divs.length; m++) {
          // "onFocus": "geolocate()
          if (mainContent.data[k].divs[m].fields !== undefined) {
            for (let n = 0; n < mainContent.data[k].divs[m].fields.length; n++) {
              //////////////Rahul Validation 20 May 2022 /////////
              if (
                (mainContent.data[k].divs[m].fields[n].required != undefined && mainContent.data[k].divs[m].fields[n].required) ||
                mainContent.data[k].divs[m].fields[n].value != ""
              ) {
                // type text
                if (
                  mainContent.data[k].divs[m].fields[n].type !== undefined &&
                  mainContent.data[k].divs[m].fields[n].type == "text" &&
                  (mainContent.data[k].divs[m].fields[n].minlength !== undefined || mainContent.data[k].divs[m].fields[n].maxlength !== undefined) &&
                  (mainContent.data[k].divs[m].fields[n].hidden == false || mainContent.data[k].divs[m].fields[n].hidden == undefined)
                ) {
                  if (mainContent.data[k].divs[m].fields[n].value.length < mainContent.data[k].divs[m].fields[n].minlength) {
                    toast(
                      `Please enter at least ${mainContent.data[k].divs[m].fields[n].minlength} characters for ${mainContent.data[k].divs[m].fields[n].label}`,
                      Number(sessionStorage.getItem("toastTimeOut"))
                    );
                    const ind = this.buttonresponsePage.findIndex((x) => x.buttonType == "submit");
                    this.buttonresponsePage[ind].isEnabled = true;
                    return false;
                  } else if (mainContent.data[k].divs[m].fields[n].value.length > mainContent.data[k].divs[m].fields[n].maxlength) {
                    toast(
                      `Please enter maximum  ${mainContent.data[k].divs[m].fields[n].maxlength} characters  for ${mainContent.data[k].divs[m].fields[n].label}`,
                      Number(sessionStorage.getItem("toastTimeOut"))
                    );
                    const ind = this.buttonresponsePage.findIndex((x) => x.buttonType == "submit");
                    this.buttonresponsePage[ind].isEnabled = true;
                    return false;
                  }
                } /* type number*/ else if (
                  mainContent.data[k].divs[m].fields[n].type !== undefined &&
                  mainContent.data[k].divs[m].fields[n].type == "number" &&
                  (mainContent.data[k].divs[m].fields[n].min !== undefined || mainContent.data[k].divs[m].fields[n].max !== undefined) &&
                  (mainContent.data[k].divs[m].fields[n].hidden == false || mainContent.data[k].divs[m].fields[n].hidden == undefined)
                ) {
                  if (mainContent.data[k].divs[m].fields[n].value < mainContent.data[k].divs[m].fields[n].min) {
                    toast(
                      `Please enter  number greater than ${mainContent.data[k].divs[m].fields[n].min} for ${mainContent.data[k].divs[m].fields[n].label}`,
                      Number(sessionStorage.getItem("toastTimeOut"))
                    );
                    const ind = this.buttonresponsePage.findIndex((x) => x.buttonType == "submit");
                    this.buttonresponsePage[ind].isEnabled = true;
                    return false;
                  } else if (mainContent.data[k].divs[m].fields[n].value > mainContent.data[k].divs[m].fields[n].max) {
                    toast(
                      `Please enter number less than  ${mainContent.data[k].divs[m].fields[n].max} for ${mainContent.data[k].divs[m].fields[n].label}`,
                      Number(sessionStorage.getItem("toastTimeOut"))
                    );
                    const ind = this.buttonresponsePage.findIndex((x) => x.buttonType == "submit");
                    this.buttonresponsePage[ind].isEnabled = true;
                    return false;
                  }
                } /* type date */ else if (
                  mainContent.data[k].divs[m].fields[n].type !== undefined &&
                  mainContent.data[k].divs[m].fields[n].type == "date" &&
                  (mainContent.data[k].divs[m].fields[n].min !== undefined || mainContent.data[k].divs[m].fields[n].max !== undefined) &&
                  (mainContent.data[k].divs[m].fields[n].hidden == false || mainContent.data[k].divs[m].fields[n].hidden == undefined)
                ) {
                  if (mainContent.data[k].divs[m].fields[n].value < mainContent.data[k].divs[m].fields[n].min) {
                    toast(
                      `Please enter  date must be after ${mainContent.data[k].divs[m].fields[n].min} for ${mainContent.data[k].divs[m].fields[n].label}`,
                      Number(sessionStorage.getItem("toastTimeOut"))
                    );
                    const ind = this.buttonresponsePage.findIndex((x) => x.buttonType == "submit");
                    this.buttonresponsePage[ind].isEnabled = true;
                    return false;
                  } else if (mainContent.data[k].divs[m].fields[n].value > mainContent.data[k].divs[m].fields[n].max) {
                    toast(
                      `Please enter date must be after  ${mainContent.data[k].divs[m].fields[n].max} for ${mainContent.data[k].divs[m].fields[n].label}`,
                      Number(sessionStorage.getItem("toastTimeOut"))
                    );
                    const ind = this.buttonresponsePage.findIndex((x) => x.buttonType == "submit");
                    this.buttonresponsePage[ind].isEnabled = true;
                    return false;
                  }
                } /* type IP Address */ else if (
                  mainContent.data[k].divs[m].fields[n].type !== undefined &&
                  mainContent.data[k].divs[m].fields[n].type == "ipAddress" &&
                  (mainContent.data[k].divs[m].fields[n].min !== undefined || mainContent.data[k].divs[m].fields[n].max !== undefined) &&
                  (mainContent.data[k].divs[m].fields[n].hidden == false || mainContent.data[k].divs[m].fields[n].hidden == undefined)
                ) {
                  if (mainContent.data[k].divs[m].fields[n].value.length < mainContent.data[k].divs[m].fields[n].min) {
                    toast(
                      `Please enter at least ${mainContent.data[k].divs[m].fields[n].min} characters for ${mainContent.data[k].divs[m].fields[n].label}`,
                      Number(sessionStorage.getItem("toastTimeOut"))
                    );
                    const ind = this.buttonresponsePage.findIndex((x) => x.buttonType == "submit");
                    this.buttonresponsePage[ind].isEnabled = true;
                    return false;
                  } else if (mainContent.data[k].divs[m].fields[n].value.length > mainContent.data[k].divs[m].fields[n].max) {
                    toast(
                      `Please enter at least  ${mainContent.data[k].divs[m].fields[n].max} characters for ${mainContent.data[k].divs[m].fields[n].label}`,
                      Number(sessionStorage.getItem("toastTimeOut"))
                    );
                    const ind = this.buttonresponsePage.findIndex((x) => x.buttonType == "submit");
                    this.buttonresponsePage[ind].isEnabled = true;
                    return false;
                  }
                  this.ipAddressInvalid = !this._dynamoService.validateIPaddress(mainContent.data[k].divs[m].fields[n].value) ? true : false;
                  if (this.ipAddressInvalid) {
                    toast(
                      `Please enter valid ip address for ${mainContent.data[k].divs[m].fields[n].label}`,
                      Number(sessionStorage.getItem("toastTimeOut"))
                    );
                    const ind = this.buttonresponsePage.findIndex((x) => x.buttonType == "submit");
                    this.buttonresponsePage[ind].isEnabled = true;
                    return false;
                  }
                } /* type IP Mac Address */ else if (
                  mainContent.data[k].divs[m].fields[n].type !== undefined &&
                  mainContent.data[k].divs[m].fields[n].type == "macAddress" &&
                  (mainContent.data[k].divs[m].fields[n].min !== undefined || mainContent.data[k].divs[m].fields[n].max !== undefined) &&
                  (mainContent.data[k].divs[m].fields[n].hidden == false || mainContent.data[k].divs[m].fields[n].hidden == undefined)
                ) {
                  if (mainContent.data[k].divs[m].fields[n].value.length < mainContent.data[k].divs[m].fields[n].min) {
                    toast(
                      `Please enter at least ${mainContent.data[k].divs[m].fields[n].min} characters for ${mainContent.data[k].divs[m].fields[n].label}`,
                      Number(sessionStorage.getItem("toastTimeOut"))
                    );
                    const ind = this.buttonresponsePage.findIndex((x) => x.buttonType == "submit");
                    this.buttonresponsePage[ind].isEnabled = true;
                    return false;
                  } else if (mainContent.data[k].divs[m].fields[n].value.length > mainContent.data[k].divs[m].fields[n].max) {
                    toast(
                      `Please enter at least  ${mainContent.data[k].divs[m].fields[n].max} characters for ${mainContent.data[k].divs[m].fields[n].label}`,
                      Number(sessionStorage.getItem("toastTimeOut"))
                    );
                    const ind = this.buttonresponsePage.findIndex((x) => x.buttonType == "submit");
                    this.buttonresponsePage[ind].isEnabled = true;
                    return false;
                  }
                  this.macAddressInvalid = !this._dynamoService.validateMacAddress(mainContent.data[k].divs[m].fields[n].value) ? true : false;
                  if (this.macAddressInvalid) {
                    toast(
                      `Please enter valid mac address for ${mainContent.data[k].divs[m].fields[n].label}`,
                      Number(sessionStorage.getItem("toastTimeOut"))
                    );
                    const ind = this.buttonresponsePage.findIndex((x) => x.buttonType == "submit");
                    this.buttonresponsePage[ind].isEnabled = true;
                    return false;
                  }
                } /* type IP USA Telephone Number */ else if (
                  mainContent.data[k].divs[m].fields[n].type !== undefined &&
                  mainContent.data[k].divs[m].fields[n].type == "usTelephoneNumber" &&
                  (mainContent.data[k].divs[m].fields[n].hidden == false || mainContent.data[k].divs[m].fields[n].hidden == undefined)
                ) {
                  if (mainContent.data[k].divs[m].fields[n].value.length < mainContent.data[k].divs[m].fields[n].min) {
                    toast(
                      `Please enter at least ${mainContent.data[k].divs[m].fields[n].min} characters for ${mainContent.data[k].divs[m].fields[n].label}`,
                      Number(sessionStorage.getItem("toastTimeOut"))
                    );
                    const ind = this.buttonresponsePage.findIndex((x) => x.buttonType == "submit");
                    this.buttonresponsePage[ind].isEnabled = true;
                    return false;
                  } else if (mainContent.data[k].divs[m].fields[n].value.length > mainContent.data[k].divs[m].fields[n].max) {
                    toast(
                      `Please enter at least  ${mainContent.data[k].divs[m].fields[n].max} characters for ${mainContent.data[k].divs[m].fields[n].label}`,
                      Number(sessionStorage.getItem("toastTimeOut"))
                    );
                    const ind = this.buttonresponsePage.findIndex((x) => x.buttonType == "submit");
                    this.buttonresponsePage[ind].isEnabled = true;
                    return false;
                  }
                  this.ustelephoneInvalid = !this._dynamoService.validatePhoneNumber(mainContent.data[k].divs[m].fields[n].value) ? true : false;
                  if (this.ustelephoneInvalid) {
                    toast(
                      `Please enter valid Phone Number for ${mainContent.data[k].divs[m].fields[n].label}`,
                      Number(sessionStorage.getItem("toastTimeOut"))
                    );
                    const ind = this.buttonresponsePage.findIndex((x) => x.buttonType == "submit");
                    this.buttonresponsePage[ind].isEnabled = true;
                    return false;
                  }
                } /* type IP Mac URL */ else if (
                  mainContent.data[k].divs[m].fields[n].type !== undefined &&
                  mainContent.data[k].divs[m].fields[n].type == "url" &&
                  (mainContent.data[k].divs[m].fields[n].hidden == false || mainContent.data[k].divs[m].fields[n].hidden == undefined)
                ) {
                  if (mainContent.data[k].divs[m].fields[n].value.length < mainContent.data[k].divs[m].fields[n].min) {
                    toast(
                      `Please enter at least ${mainContent.data[k].divs[m].fields[n].min} characters for ${mainContent.data[k].divs[m].fields[n].label}`,
                      Number(sessionStorage.getItem("toastTimeOut"))
                    );
                    const ind = this.buttonresponsePage.findIndex((x) => x.buttonType == "submit");
                    this.buttonresponsePage[ind].isEnabled = true;
                    return false;
                  } else if (mainContent.data[k].divs[m].fields[n].value.length > mainContent.data[k].divs[m].fields[n].max) {
                    toast(
                      `Please enter at least  ${mainContent.data[k].divs[m].fields[n].max} characters for ${mainContent.data[k].divs[m].fields[n].label}`,
                      Number(sessionStorage.getItem("toastTimeOut"))
                    );
                    const ind = this.buttonresponsePage.findIndex((x) => x.buttonType == "submit");
                    this.buttonresponsePage[ind].isEnabled = true;
                    return false;
                  }
                  this.urlInvalid = !this._dynamoService.validateURL(mainContent.data[k].divs[m].fields[n].value) ? true : false;
                  if (this.urlInvalid) {
                    toast(
                      `Please enter valid url for ${mainContent.data[k].divs[m].fields[n].label}`,
                      Number(sessionStorage.getItem("toastTimeOut"))
                    );
                    const ind = this.buttonresponsePage.findIndex((x) => x.buttonType == "submit");
                    this.buttonresponsePage[ind].isEnabled = true;
                    return false;
                  }
                } /* type Email */ else if (
                  mainContent.data[k].divs[m].fields[n].type !== undefined &&
                  mainContent.data[k].divs[m].fields[n].type == "email" &&
                  (mainContent.data[k].divs[m].fields[n].hidden == false || mainContent.data[k].divs[m].fields[n].hidden == undefined)
                ) {
                  this.emailInvalid = !this._dynamoService.validateEmail(mainContent.data[k].divs[m].fields[n].value) ? true : false;
                  if (this.emailInvalid) {
                    toast(
                      `Please enter valid email for ${mainContent.data[k].divs[m].fields[n].label}`,
                      Number(sessionStorage.getItem("toastTimeOut"))
                    );
                    const ind = this.buttonresponsePage.findIndex((x) => x.buttonType == "submit");
                    this.buttonresponsePage[ind].isEnabled = true;
                    return false;
                  }
                }
              }

              if (
                mainContent.data[k].divs[m].fields[n].type == "file" &&
                mainContent.data[k].divs[m].fields[n].onFocus == undefined &&
                this.fileDataArray.length > 0 &&
                !this.sendNoFile
              ) {
                for (let r = 0; r < this.fileDataArray.length; r++) {
                  data.push({
                    name: this.fileDataArray[r].fileFieldName,
                    value: this.fileDataArray[r].fileData,
                    type: mainContent.data[k].divs[m].fields[n].type,
                    readonly: mainContent.data[k].divs[m].fields[n].readonly ? mainContent.data[k].divs[m].fields[n].readonly : false,
                  });
                }
              } else if (
                mainContent.data[k].divs[m].fields[n].type !== "file" &&
                mainContent.data[k].divs[m].fields[n].type !== "signature" &&
                mainContent.data[k].divs[m].fields[n].onFocus == undefined
              ) {
                // check for require field

                if (
                  !mainContent.data[k].divs[m].fields[n].hidden &&
                  !this.requiredFormValidation &&
                  mainContent.data[k].divs[m].fields[n].required !== undefined &&
                  mainContent.data[k].divs[m].fields[n].required &&
                  mainContent.data[k].divs[m].fields[n].value == ""
                ) {
                  this.requiredFormValidation = true;
                }
                const cols = {
                  name: mainContent.data[k].divs[m].fields[n].name,
                  value:
                    mainContent.data[k].divs[m].fields[n].value == "true" || mainContent.data[k].divs[m].fields[n].value == "false"
                      ? JSON.parse(mainContent.data[k].divs[m].fields[n].value)
                      : mainContent.data[k].divs[m].fields[n].type == "number"
                      ? this._dynamoService.parseValue(
                          mainContent.data[k].divs[m].fields[n].type,
                          mainContent.data[k].divs[m].fields[n].value,
                          mainContent.data[k].divs[m].fields[n].numberPipe,
                          mainContent.data[k].divs[m].fields[n].isDecimal
                        )
                      : mainContent.data[k].divs[m].fields[n].value,
                  type: mainContent.data[k].divs[m].fields[n].type,
                  readonly: mainContent.data[k].divs[m].fields[n].readonly ? mainContent.data[k].divs[m].fields[n].readonly : false,
                };
                if (mainContent.data[k].divs[m].fields[n].type == "select" || mainContent.data[k].divs[m].fields[n].type == "radio") {
                  cols["show"] = this._dynamoService.getShowMultipart(mainContent.data[k].divs[m].fields[n]);
                }
                data.push(cols);
              } else if (mainContent.data[k].divs[m].fields[n].type == "signature") {
                let signData: any;
                // CHECK FOR TYPE SIGNATURE

                signData = <HTMLInputElement>document.getElementById(mainContent.data[k].divs[m].fields[n].name);

                // check for require field

                if (
                  signData !== null &&
                  !this.requiredFormValidation &&
                  mainContent.data[k].divs[m].fields[n].required !== undefined &&
                  mainContent.data[k].divs[m].fields[n].required &&
                  signData.value == ""
                ) {
                  this.requiredFormValidation = true;
                } else if (signData !== null) {
                  data.push({
                    name: mainContent.data[k].divs[m].fields[n].name,
                    value: signData.value,
                    type: mainContent.data[k].divs[m].fields[n].type,
                    readonly: mainContent.data[k].divs[m].fields[n].readonly ? mainContent.data[k].divs[m].fields[n].readonly : false,
                  });
                }
              } else if (
                mainContent.data[k].divs[m].fields[n].onFocus !== undefined &&
                mainContent.data[k].divs[m].fields[n].onFocus == "geolocate()"
              ) {
                addressField.push(mainContent.data[k].divs[m].fields[n].name);
              }
            }
          }
        }
      }
    }

    for (let i = 0; i < this.showExpansion.length; i++) {
      for (let k = 0; k < this.showExpansion[i].data.data.length; k++) {
        if (this.showExpansion[i].data.data[k].type == "form") {
          // this.showExpansion[i].isExpanded
          for (let m = 0; m < this.showExpansion[i].data.data[k].divs.length; m++) {
            if (this.showExpansion[i].data.data[k].divs[m].fields !== undefined) {
              for (let n = 0; n < this.showExpansion[i].data.data[k].divs[m].fields.length; n++) {
                if (
                  this.showExpansion[i].data.data[k].divs[m].fields[n].type == "file" &&
                  this.showExpansion[i].data.data[k].divs[m].fields[n].onFocus == undefined &&
                  this.fileDataArray.length > 0 &&
                  !this.sendNoFile
                ) {
                  for (let r = 0; r < this.fileDataArray.length; r++) {
                    data.push({
                      name: this.fileDataArray[r].fileFieldName,
                      value: this.fileDataArray[r].fileData,
                      type: this.showExpansion[i].data.data[k].divs[m].fields[n].type,
                      readonly: this.showExpansion[i].data.data[k].divs[m].fields[n].readonly
                        ? this.showExpansion[i].data.data[k].divs[m].fields[n].readonly
                        : false,
                    });
                  }
                } else if (
                  this.showExpansion[i].data.data[k].divs[m].fields[n].type !== "file" &&
                  this.showExpansion[i].data.data[k].divs[m].fields[n].type !== "signature" &&
                  this.showExpansion[i].data.data[k].divs[m].fields[n].onFocus == undefined
                ) {
                  // check for require field

                  if (
                    !this.showExpansion[i].data.data[k].divs[m].fields[n].hidden &&
                    !this.requiredFormValidation &&
                    this.showExpansion[i].data.data[k].divs[m].fields[n] !== undefined &&
                    this.showExpansion[i].data.data[k].divs[m].fields[n].required !== undefined &&
                    this.showExpansion[i].data.data[k].divs[m].fields[n].required &&
                    this.showExpansion[i].data.data[k].divs[m].fields[n].value == ""
                  ) {
                    this.requiredFormValidation = true;
                    if (!this.showExpansion[i].isExpanded) {
                      this.showExpansion[i].isExpanded = true;
                    }
                  }
                  //////// Min Max Validation 20April /////////
                  // FOR NUMBER AND DATE NIHARIKA
                  if (
                    ((this.showExpansion[i].data.data[k].divs[m].fields[n].hidden == undefined ||
                      !this.showExpansion[i].data.data[k].divs[m].fields[n].hidden) &&
                      (this.showExpansion[i].data.data[k].divs[m].fields[n].type == "number" ||
                        this.showExpansion[i].data.data[k].divs[m].fields[n].type == "date") &&
                      this.showExpansion[i].data.data[k].divs[m].fields[n] !== undefined &&
                      !this.requiredFormValidation &&
                      (this.showExpansion[i].data.data[k].divs[m].fields[n].required ||
                        this.showExpansion[i].data.data[k].divs[m].fields[n].required == undefined) &&
                      this.showExpansion[i].data.data[k].divs[m].fields[n].value !== "" &&
                      this.showExpansion[i].data.data[k].divs[m].fields[n].value !== 0 &&
                      this.showExpansion[i].data.data[k].divs[m].fields[n].max !== undefined &&
                      this.showExpansion[i].data.data[k].divs[m].fields[n].value !== "" &&
                      this.showExpansion[i].data.data[k].divs[m].fields[n].value !== 0 &&
                      this.showExpansion[i].data.data[k].divs[m].fields[n].value > this.showExpansion[i].data.data[k].divs[m].fields[n].max) ||
                    (this.showExpansion[i].data.data[k].divs[m].fields[n].min !== undefined &&
                      this.showExpansion[i].data.data[k].divs[m].fields[n].value !== "" &&
                      this.showExpansion[i].data.data[k].divs[m].fields[n].value !== 0 &&
                      this.showExpansion[i].data.data[k].divs[m].fields[n].value < this.showExpansion[i].data.data[k].divs[m].fields[n].min)
                  ) {
                    //   console.log('label',this.showExpansion[i].data.data[k].divs[m].fields[n].label);
                    // alert(this.showExpansion[i].data.data[k].divs[m].fields[n].value + 'type number');

                    this.validationFormMessage =
                      this.showExpansion[i].data.data[k].divs[m].fields[n].type == "number"
                        ? "Incorrect Min/max value for type number"
                        : "Incorrect Min/max value for type date";
                    this.requiredFormValidation = true;
                    if (!this.showExpansion[i].isExpanded) {
                      this.showExpansion[i].isExpanded = true;
                    }
                  }
                  // FOR STRING VALIDATIONS 12 may 2022
                  if (
                    ((this.showExpansion[i].data.data[k].divs[m].fields[n].hidden == undefined ||
                      !this.showExpansion[i].data.data[k].divs[m].fields[n].hidden) &&
                      this.showExpansion[i].data.data[k].divs[m].fields[n].type == "text" &&
                      this.showExpansion[i].data.data[k].divs[m].fields[n] !== undefined &&
                      !this.requiredFormValidation &&
                      (this.showExpansion[i].data.data[k].divs[m].fields[n].required ||
                        this.showExpansion[i].data.data[k].divs[m].fields[n].required == undefined) &&
                      this.showExpansion[i].data.data[k].divs[m].fields[n].value !== "" &&
                      this.showExpansion[i].data.data[k].divs[m].fields[n].value !== 0 &&
                      this.showExpansion[i].data.data[k].divs[m].fields[n].maxlength !== undefined &&
                      this.showExpansion[i].data.data[k].divs[m].fields[n].value !== "" &&
                      this.showExpansion[i].data.data[k].divs[m].fields[n].value !== 0 &&
                      this.showExpansion[i].data.data[k].divs[m].fields[n].value.length >
                        this.showExpansion[i].data.data[k].divs[m].fields[n].maxlength) ||
                    (this.showExpansion[i].data.data[k].divs[m].fields[n].minlength !== undefined &&
                      this.showExpansion[i].data.data[k].divs[m].fields[n].value !== "" &&
                      this.showExpansion[i].data.data[k].divs[m].fields[n].value !== 0 &&
                      this.showExpansion[i].data.data[k].divs[m].fields[n].value.length <
                        this.showExpansion[i].data.data[k].divs[m].fields[n].minlength)
                  ) {
                    // console.log('label',this.showExpansion[i].data.data[k].divs[m].fields[n].label);
                    // alert(this.showExpansion[i].data.data[k].divs[m].fields[n].value + 'type number');

                    this.validationFormMessage = "Incorrect Minimum/Maximum value for type string";
                    this.requiredFormValidation = true;
                    if (!this.showExpansion[i].isExpanded) {
                      this.showExpansion[i].isExpanded = true;
                    }
                  }

                  const cols = {
                    name: this.showExpansion[i].data.data[k].divs[m].fields[n].name,
                    value:
                      this.showExpansion[i].data.data[k].divs[m].fields[n].value == "true" ||
                      this.showExpansion[i].data.data[k].divs[m].fields[n].value == "false"
                        ? JSON.parse(this.showExpansion[i].data.data[k].divs[m].fields[n].value)
                        : this.showExpansion[i].data.data[k].divs[m].fields[n].type == "number"
                        ? this._dynamoService.parseValue(
                            this.showExpansion[i].data.data[k].divs[m].fields[n].type,
                            this.showExpansion[i].data.data[k].divs[m].fields[n].value,
                            this.showExpansion[i].data.data[k].divs[m].fields[n].numberPipe,
                            this.showExpansion[i].data.data[k].divs[m].fields[n].isDecimal
                          )
                        : this.showExpansion[i].data.data[k].divs[m].fields[n].value,
                    type: this.showExpansion[i].data.data[k].divs[m].fields[n].type,
                    readonly: this.showExpansion[i].data.data[k].divs[m].fields[n].readonly
                      ? this.showExpansion[i].data.data[k].divs[m].fields[n].readonly
                      : false,
                  };
                  if (
                    this.showExpansion[i].data.data[k].divs[m].fields[n].type == "select" ||
                    this.showExpansion[i].data.data[k].divs[m].fields[n].type == "radio"
                  ) {
                    cols["show"] = this._dynamoService.getShowMultipart(this.showExpansion[i].data.data[k].divs[m].fields[n]);
                  }
                  data.push(cols);
                } else if (this.showExpansion[i].data.data[k].divs[m].fields[n].type == "signature") {
                  let signData: any;
                  // CHECK FOR TYPE SIGNATURE

                  signData = <HTMLInputElement>document.getElementById(this.showExpansion[i].data.data[k].divs[m].fields[n].name);

                  // check for require field

                  if (
                    signData !== null &&
                    !this.requiredFormValidation &&
                    this.showExpansion[i].data.data[k].divs[m].fields[n].required !== undefined &&
                    this.showExpansion[i].data.data[k].divs[m].fields[n].required &&
                    signData.value == ""
                  ) {
                    this.requiredFormValidation = true;
                    if (!this.showExpansion[i].isExpanded) {
                      this.showExpansion[i].isExpanded = true;
                    }
                  } else if (signData !== null) {
                    data.push({
                      name: this.showExpansion[i].data.data[k].divs[m].fields[n].name,
                      value: signData.value,
                      type: this.showExpansion[i].data.data[k].divs[m].fields[n].type,
                      readonly: this.showExpansion[i].data.data[k].divs[m].fields[n].readonly
                        ? this.showExpansion[i].data.data[k].divs[m].fields[n].readonly
                        : false,
                    });
                  }
                } else if (
                  this.showExpansion[i].data.data[k].divs[m].fields[n].onFocus !== undefined &&
                  this.showExpansion[i].data.data[k].divs[m].fields[n].onFocus == "geolocate()"
                ) {
                  addressField.push(mainContent.data[k].divs[m].fields[n].name);
                }
              }
            }
          }
        } else if (this.showExpansion[i].data.data[k].type == "entryGrid") {
          isEntryGrid = true;
        } else if (this.showExpansion[i].data.data[k].type == "htmlEdit" && !this.showExpansion[i].data.data[k].readonly) {
          this.isHtmlEdit = true;
        }
      }
    }

    /////////////// handele html data /////////

    if (this.isHtmlEdit == true) {
      this.htmlEditTabindex = [];
      for (let i = 0; i < notepadData.length; i++) {
        if (notepadData[i].hexkey == "") {
          data.push({
            name: notepadData[i].name,
            value: notepadData[i].value,
            type: notepadData[i].type,
            readonly: notepadData[i].readonly ? notepadData[i].readonly : false,
          });
        } else {
          this.htmlEditTabindex.push(notepadData[i]);
        }
      }
    }

    // HANDLE VALUE OF ADDRESS COMPONENT
    if (addressField.length > 0) {
      addressField.splice(0, addressField.length, ...new Set(addressField));

      for (let m = 0; m < addressField.length; m++) {
        const fieldValue = <HTMLInputElement>document.getElementById(addressField[m]);

        data.push({
          name: addressField[m],
          value: fieldValue.value,
          type: fieldValue.type,
          readonly: fieldValue.readOnly ? fieldValue.readOnly : false,
        });
      }
    }
    const pcols = {
      type: "formData",
      cc: cc,
      ddname: ddname,
      hexkey: hexkey,
      viewid: viewid,
      fields: data,
    };
    // DATA TO GIVE IN API CALL
    let data_grid: any;

    if (
      sessionStorage.getItem("entryGridDataArr") !== undefined &&
      sessionStorage.getItem("entryGridDataArr") !== null &&
      sessionStorage.getItem("entryGridDataArr").length > 0 &&
      isEntryGrid
    ) {
      entryGridDataArr = JSON.parse(sessionStorage.getItem("entryGridDataArr"));
    }
    const allEntryGridData = [];
    const allData = [];
    /** FOR VIEW ID AND DDNAME */
    for (let i = 0; i < entryGridDataArr.length; i++) {
      if (entryGridDataArr[i].length > 0) {
        for (let j = 0; j < entryGridDataArr[i].length; j++) {
          if (entryGridDataArr[i][j].dataIndex !== undefined) {
            allData.push({ dataIndex: entryGridDataArr[i][j].dataIndex, cc: entryGridDataArr[i][j].cc, ddname: entryGridDataArr[i][j].ddname });

            break;
          }
        }
      } else {
        allData.push({ dataIndex: null, cc: null, ddname: null });
      }
    }

    for (let i = 0; i < entryGridDataArr.length; i++) {
      if (entryGridDataArr[i].length > 0) {
        const fieldRowArrEn = [];
        for (let j = 0; j < entryGridDataArr[i].length; j++) {
          let invalidField: boolean = false;
          let requiredField = false;
          const hexkey = entryGridDataArr[i][j].hexkey;
          const isDeleted = entryGridDataArr[i][j].isDeleted;
          const editForm = entryGridDataArr[i][j].editForm;
          const field_Columns = [];
          if (entryGridDataArr[i][j].items !== undefined) {
            for (let m = 0; m < entryGridDataArr[i][j].items.length; m++) {
              for (let n = 0; n < entryGridDataArr[i][j].items[m].degColumns.length; n++) {
                if (
                  entryGridDataArr[i][j].items[m].degColumns[n].hasOwnProperty("name") &&
                  entryGridDataArr[i][j].items[m].degColumns[n].name.length !== 0
                ) {
                  const field_Column = {
                    name: entryGridDataArr[i][j].items[m].degColumns[n].name,
                    value:
                      entryGridDataArr[i][j].items[m].degColumns[n].type !== "radio" &&
                      entryGridDataArr[i][j].items[m].degColumns[n].type !== "search"
                        ? entryGridDataArr[i][j].items[m].degColumns[n].type == "switch" && entryGridDataArr[i][j].items[m].degColumns[n].value == ""
                          ? false
                          : this._dynamoService.parseValue(
                              entryGridDataArr[i][j].items[m].degColumns[n].type,
                              entryGridDataArr[i][j].items[m].degColumns[n].value,
                              entryGridDataArr[i][j].items[m].degColumns[n].numberPipe,
                              entryGridDataArr[i][j].items[m].degColumns[n].isDecimal
                            )
                        : this._dynamoService.parseValue(
                            entryGridDataArr[i][j].items[m].degColumns[n].type,
                            entryGridDataArr[i][j].items[m].degColumns[n].value1,
                            entryGridDataArr[i][j].items[m].degColumns[n].numberPipe,
                            entryGridDataArr[i][j].items[m].degColumns[n].isDecimal
                          ),
                    // 'value': entryGridDataArr[i][j].items[m].degColumns[n].type !== 'radio' && entryGridDataArr[i][j].items[m].degColumns[n].type !== 'search' ? (entryGridDataArr[i][j].items[m].degColumns[n].type == 'switch' && entryGridDataArr[i][j].items[m].degColumns[n].value == '') ? false : entryGridDataArr[i][j].items[m].degColumns[n].value : entryGridDataArr[i][j].items[m].degColumns[n].value1,
                    isValid: entryGridDataArr[i][j].items[m].degColumns[n].isValid,
                    required: entryGridDataArr[i][j].items[m].degColumns[n].required,
                    readonly: entryGridDataArr[i][j].items[m].degColumns[n].readonly ? entryGridDataArr[i][j].items[m].degColumns[n].readonly : false,
                  };

                  field_Columns.push(field_Column);
                  if (!entryGridDataArr[i][j].items[m].degColumns[n].isValid) {
                    invalidField = true;
                  }
                  // ADDED FOR REQUIRED
                  if (
                    entryGridDataArr[i][j].items[m].degColumns[n].required &&
                    entryGridDataArr[i][j].items[m].degColumns[n].value !== 0 &&
                    entryGridDataArr[i][j].items[m].degColumns[n].value.length >= 1
                  ) {
                    requiredField = true;
                  }
                }
              }
            }
          }

          const field_row_value = {
            fields: field_Columns, // field_row
            hexkey: hexkey,
            isDeleted: isDeleted,
            editForm: editForm,
            invalidField: invalidField,
            requiredField: requiredField,
          };

          // fieldRowArrEn.push(field_row_value);
          if (field_row_value.isDeleted !== undefined) {
            fieldRowArrEn.push(field_row_value);
          }
        }
        if (allData[i] !== undefined && allData[i].dataIndex !== null) {
          allEntryGridData.push({
            gridRefNo: allData[i].dataIndex,
            cc: allData[i].cc,
            ddname: allData[i].ddname,
            rows: fieldRowArrEn,
            type: "entryGridData",
          });
        }
      }
    }

    // FORMAT REQUIRED
    data_grid = {
      data: [],
    };

    const data_to_insert = data_grid.data.length;
    data_grid.data[data_to_insert] = pcols;
    // ADD DATA FOR HTMLEDIT SECTION 30 OCT 2021
    if (hexkey != "" || hexkey != undefined) {
      data_grid.data[data_grid.data.length] = { type: "notepad", content: this.htmlEditTabindex };
    }
    let fieldsValid: boolean = true;
    const isInvalid = [];
    let requiredFieldsValid = true;
    const requiredField = [];
    if (allEntryGridData.length > 0) {
      for (let i = 0; i < allEntryGridData.length; i++) {
        // FIND INDEX OF INVALID FIELD
        if (allEntryGridData[i].rows.findIndex((x) => x.invalidField == true) >= 0) {
          fieldsValid = false;
          isInvalid.push(fieldsValid);
        }
        data_grid.data[data_grid.data.length] = allEntryGridData[i];
      }

      // REQUIRED ENTRYGRID 3 JUNE

      for (let i = 0; i < allEntryGridData.length; i++) {
        for (let j = 0; j < allEntryGridData[i].rows.length; j++) {
          if (!allEntryGridData[i].rows[j].isDeleted) {
            for (let k = 0; k < allEntryGridData[i].rows[j].fields.length; k++) {
              if (allEntryGridData[i].rows[j].fields[k].required && allEntryGridData[i].rows[j].fields[k].value.length >= 1) {
                allEntryGridData[i].rows[j].fields[k].requiredValid = true;
              } else if (allEntryGridData[i].rows[j].fields[k].required && allEntryGridData[i].rows[j].fields[k].value.length == 0) {
                requiredFieldsValid = false;
                allEntryGridData[i].rows[j].fields[k].requiredValid = false;
                requiredField.push({
                  requiredFieldsValid: requiredFieldsValid,
                  name: allEntryGridData[i].rows[j].fields[k].name,
                  gridRefNo: allEntryGridData[i].gridRefNo,
                });
              }
            }
          }
        }
      }
    }
    const isValidonMultipart = JSON.parse(sessionStorage.getItem("isValidonMultipart"));

    if (isInvalid.indexOf(false) >= 0 || isValidonMultipart) {
      toast(invalidMessage, Number(sessionStorage.getItem("toastTimeOut")));
      setTimeout(() => {
        this.loader = environment.displayNone;
      }, 50);
      const ind = this.buttonresponsePage.findIndex((x) => x.buttonType == "submit");
      this.buttonresponsePage[ind].isEnabled = true;
    } else if (this.requiredFormValidation) {
      // alert(this.requiredFormValidation + 'ght');
      toast(this.validationFormMessage, Number(sessionStorage.getItem("toastTimeOut")));
      setTimeout(() => {
        this.loader = environment.displayNone;
      }, 50);
      const ind = this.buttonresponsePage.findIndex((x) => x.buttonType == "submit");
      this.buttonresponsePage[ind].isEnabled = true;
    } else if (requiredField.findIndex((x) => x.requiredFieldsValid == false) >= 0) {
      // FOR REQUIRED ON ENTRYGRID VALIDATION
      const gridIndex = requiredField.findIndex((x) => x.requiredFieldsValid == false);
      // Find which enrtyGrid in expander
      const subViewInd = requiredField[gridIndex].gridRefNo;
      const entryGridIndexArr = JSON.parse(sessionStorage.getItem("entryGridIndexArr"));
      const gridTitle = entryGridIndexArr.findIndex((x) => x.gridIndex == subViewInd);
      let title = "";
      if (gridTitle >= 0) {
        title = entryGridIndexArr[gridTitle].expanderTitle;
      }
      this.loader = environment.displayNone;
      toast(`Please fill required field on entryGrid ${title}`, Number(sessionStorage.getItem("toastTimeOut")));
      setTimeout(() => {
        this.loader = environment.displayNone;
      }, 50);
      // OPEN THE ENTRYGRID
      const entryGridExpanIndex = this.showExpansion.findIndex((x) => x.title == title);
      this.showExpansion[entryGridExpanIndex].isExpanded = true;
      // ENABLE SUBMIT BUTTON
      const ind = this.buttonresponsePage.findIndex((x) => x.buttonType == "submit");
      this.buttonresponsePage[ind].isEnabled = true;
    } else {
      // console.log(data_grid);
      // alert('remove return');
      // return;
      this._cmsServices.sendData(onPush, data_grid).subscribe(
        (response) => {
          this.loader = environment.displayNone;
          this.showBusyText = "";

          if (response === null || response === undefined) {
            return false;
          } else {
            const formResponse = JSON.parse(JSON.stringify(response));
            for (let i = 0; i < formResponse.data.length; i++) {
              if (formResponse.data[i].type == "pageInit") {
                if (formResponse.data[i].clearPage) {
                }
              } else if (formResponse.data[i].navigation == undefined && formResponse.data[i].type == "buttons") {
                NotNotify = false;
                for (let k = 0; k < formResponse.data[i].buttons.length; k++) {
                  const btnInd = this.buttonresponsePage.findIndex((x) => x.text == formResponse.data[i].buttons[k].text);

                  if (btnInd >= 0) {
                    this.buttonresponsePage[btnInd].isEnabled = formResponse.data[i].buttons[k].isEnabled;
                  } else {
                    NotNotify = true;
                  }
                }
                /* const btnInd = this.buttonresponsePage.findIndex(x => x.disableOnClick == true && x.isEnabled == false && x.text == formResponse.data[i].buttons[0].text);
                  if (btnInd >= 0) {
                    this.buttonresponsePage[btnInd].isEnabled = true;
                  } */
              } else if (formResponse.data[i].type == "notify") {
                if (formResponse.data[i].redirectUrl != undefined && formResponse.data[i].redirectUrl) {
                  window.location.href = formResponse.data[i].redirectUrl;
                  return;
                }
                NotNotify = false;
                this.handleNotify(formResponse.data[i]);
                this.isValidSubmit = formResponse.data[i].isValid;
              } else if (formResponse.data[i].type == "action") {
                NotNotify = false;
                this.handleAction(formResponse.data[i]);
              } else {
                NotNotify = true;
              }
            }

            if (NotNotify) {
              // USE TIMEOUT TO SHOW TOAST MESSAGE
              setTimeout(() => {
                this.loader = environment.displayNone;
                this.handleSubmitInParent.emit(response);
              }, 500);
            }
            this.loader = environment.displayNone;
            this.showBusyText = "";
          }
        },
        (error) => this.handleError(error)
      );
    }
    this.loader = environment.displayNone;
  }

  cancel(param, api_route, showMenu, popup_zindex?, btnObj?) {
    if (btnObj !== undefined && !btnObj.isEnabled) {
      return false;
    }
    if (btnObj !== undefined && btnObj !== "") {
      const btnInd = this.buttonresponsePage.findIndex((x) => x.disableOnClick == true && x.text == btnObj.text);

      if (btnInd >= 0) {
        this.buttonresponsePage[btnInd].isEnabled = false;
      }
    }

    const obj = { action: param, onPush: api_route, showMenu: showMenu };
    this.handleCancelInParent.emit(obj);
  }
  handleAction(response) {
    if (response.newPage) {
      window.open(response.url, "_blank");
    } else {
      window.open(response.url, "_self");
    }

    if (response.newPage && response.success && response.showMenu) {
      const obj = { action: "routing", onPush: "", showMenu: response.showMenu };
      this.handleCancelInParent.emit(obj);
    }
  }

  handleMultiPartForm(event) {
    this.handleSubmitInParent.emit(event);
  }

  buttonAPICall(api, showMenu?, action?, btnObj?) {
    if (!btnObj.isEnabled) {
      return false;
    }
    if (btnObj !== undefined && btnObj !== "") {
      const btnInd = this.buttonresponsePage.findIndex((x) => x.disableOnClick == true && x.text == btnObj.text);

      if (btnInd >= 0) {
        this.buttonresponsePage[btnInd].isEnabled = false;
      }
      //// Added 8feb////
      if (this.datazIndex > 0) {
        this.buttonresponsePage[btnInd].isEnabled = true;
      }
    }
    let checkChange = false;
    const args = {
      api: api,
      showMenu: showMenu,
      action: action,
      buttonType: btnObj.buttonType,
      formChanges: checkChange,
      isMultiPart: false,
      popup_zindex: this.datazIndex,
    };

    if (action == "clear_signature") {
      const signData = sessionStorage.getItem("signature");
      const setData = <HTMLInputElement>document.getElementById(signData);
      setData.value = "";
      // EMPTY CANVAS
      this.clearSignature = true;
    }
    /** IMPLEMENTING FOR HANDLING FORM CHANGES TRUE */

    if (action == "api_call") {
      checkChange = !this.isValidSubmit ? this.checkChangeFormEntry() : false;

      if (checkChange) {
        args.isMultiPart = true;
      }

      args.formChanges = checkChange;
    }
    this.handleButtonInParent.emit(args);
  }

  checkChangeFormEntry() {
    let checkChange = false;
    checkChange = this.checkChange();
    const checkChangeEntryGrid =
      sessionStorage.getItem("detectChangeEntryGrid") !== "" ? JSON.parse(sessionStorage.getItem("detectChangeEntryGrid")) : false;

    if (!checkChange && !checkChangeEntryGrid) {
      checkChange = false;
      sessionStorage.setItem("entryGridDataArr", "");
      sessionStorage.setItem("setEntryGrid", "");
      sessionStorage.setItem("gridRefNumber", "");
      sessionStorage.setItem("detectChangeEntryGrid", "");
    } else if ((checkChange && !checkChangeEntryGrid) || (!checkChange && checkChangeEntryGrid)) {
      checkChange = true;
    } else if (checkChange && checkChangeEntryGrid) {
      checkChange = true;
    }

    return checkChange;
  }

  checkChange() {
    let checkChange: boolean = false;
    const mainContent = JSON.parse(sessionStorage.getItem("accordionList"));

    const changeContent = this.accordionList;

    // COMPARING BOTH OBJECT
    for (let i = 0; i < mainContent.data.length; i++) {
      for (let j = 0; j < mainContent.data[i].data.data.length; j++) {
        for (let m = 0; m < changeContent.data.length; m++) {
          for (let n = 0; n < changeContent.data[m].data.data.length; n++) {
            if (changeContent.data[m].data.data[n] !== undefined && changeContent.data[m].data.data[n].type == "form") {
              for (let p = 0; p < changeContent.data[m].data.data[n].divs.length; p++) {
                if (changeContent.data[m].data.data[n].divs[p].fields !== undefined) {
                  for (let q = 0; q < changeContent.data[m].data.data[n].divs[p].fields.length; q++) {
                    if (mainContent.data[i].data.data[j].type == "form") {
                      for (let r = 0; r < mainContent.data[i].data.data[j].divs.length; r++) {
                        if (mainContent.data[i].data.data[j].divs[r].fields !== undefined) {
                          for (let s = 0; s < mainContent.data[i].data.data[j].divs[r].fields.length; s++) {
                            if (
                              changeContent.data[m].data.data[n].divs[p].fields[q].type &&
                              changeContent.data[m].data.data[n].divs[p].fields[q].type !== "hidden" &&
                              changeContent.data[m].data.data[n].divs[p].fields[q].name == mainContent.data[i].data.data[j].divs[r].fields[s].name
                            ) {
                              if (
                                changeContent.data[m].data.data[n].divs[p].fields[q].value &&
                                typeof changeContent.data[m].data.data[n].divs[p].fields[q].value !== "boolean" &&
                                changeContent.data[m].data.data[n].divs[p].fields[q].value.toString().trim() !==
                                  mainContent.data[i].data.data[j].divs[r].fields[s].value.toString().trim()
                              ) {
                                checkChange = true;
                                break;
                              } else if (
                                changeContent.data[m].data.data[n].divs[p].fields[q].value !== undefined &&
                                typeof changeContent.data[m].data.data[n].divs[p].fields[q].value == "boolean" &&
                                changeContent.data[m].data.data[n].divs[p].fields[q].value !==
                                  mainContent.data[i].data.data[j].divs[r].fields[s].value
                              ) {
                                checkChange = true;
                                break;
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

    return checkChange;
  }

  navChangedHandlerForm(url: string) {
    let NotNotify = false;

    let checkChange: boolean = false;
    // SHOW BUSY INDICATOR

    const checkProperty = this._dynamoService.getValue(url, "showBusy");
    const showBusyText = this._dynamoService.getValueShowBusyText(url, "showBusyText");
    if (showBusyText !== undefined && showBusyText.length > 0) {
      this.showBusyText = showBusyText.replaceAll("+", " ");
    }
    if (checkProperty) {
      this.loader = environment.displayBlock;
    }

    /** CHECK FIELDS IN FORM IF CHANGED ADD formChange Parameter In Query String */

    if (!this.isValidSubmit) {
      checkChange = this.checkChangeFormEntry();
    }

    if (url.includes("?")) {
      url = url + "&formChanges=" + encodeURIComponent(checkChange);
    } else {
      url = url + "?formChanges=" + encodeURIComponent(checkChange);
    }

    this._cmsServices.getDetails(url).subscribe(
      (formResponse) => {
        for (let i = 0; i < formResponse.data.length; i++) {
          if (formResponse.data[i].type == "pageInit") {
          } else if (formResponse.data[i].type == "notify") {
            if (formResponse.data[i].redirectUrl != undefined && formResponse.data[i].redirectUrl) {
              window.location.href = formResponse.data[i].redirectUrl;
              return;
            }
            NotNotify = false;
            this.handleNotify(formResponse.data[i]);
          } else if (formResponse.data[i].type == "action") {
            NotNotify = false;
            this.handleAction(formResponse.data[i]);
          } else {
            NotNotify = true;
          }
        }

        if (NotNotify) {
          this.handleSubmitInParent.emit(formResponse);
        }

        this.loader = environment.displayNone;
        this.showBusyText = "";
      },
      (error) => this.handleError(error)
    );
  }

  enableSubmitButtonInParent(event) {
    // event == event == undefined || event ? true : false;

    const ind = this.buttonresponsePage.findIndex((x) => x.buttonType == "submit");
    if (ind >= 0) {
      this.buttonresponsePage[ind].isEnabled = event;
    }
  }

  handleNotify(response) {
    if (response.alert !== undefined || response.msg !== undefined) {
      this.setmessage = response;
    }

    if (response.success && response.showMenu) {
      setTimeout(() => {
        const obj = { action: "routing", onPush: "", showMenu: response.showMenu };
        this.handleCancelInParent.emit(obj);
      }, 500);
    }
  }

  handleError(error) {
    if (error.error !== undefined && error.error.data !== undefined) {
      for (let i = 0; i < error.error.data.length; i++) {
        if (error.error.data[i].type == "notify") {
          this.handleNotify(error.error.data[i]);
        }
      }

      this.handleSubmitInParent.emit(error.error);
    } else if (error.name !== undefined && error.name === "HttpErrorResponse" && error.status === 0 && error.statusText === "Unknown Error") {
      this.handleNotify({ alert: "alert", URL: error.url, title: error.title !== undefined ? error.title : "" });
    } else if (error.name !== undefined && error.name === "HttpErrorResponse" && error.status === 503 && error.statusText === "Service Unavailable") {
      this.handleNotify({
        alert: "alert",
        URL: error.url,
        title: environment.serviceNotAvailable,
        statusCode: 503,
        message: error.error.message ? error.error.message : "Server Error 503",
      });
    } else if (error.message !== undefined) {
      alert(error.message);
    } else {
      if (error.error.alert !== undefined) {
        this.handleNotify(error.error);
      } else {
        toast(error.statusText, Number(sessionStorage.getItem("toastTimeOut")));
      }
    }
  }
  print() {
    window.print();
  }
}
