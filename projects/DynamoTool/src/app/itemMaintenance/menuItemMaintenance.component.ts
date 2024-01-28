import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemMaintenanceService } from './itemMaintenance.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { toast } from 'angular2-materialize';
import { GenericPageService } from '../genericPage/genericPage.service';
import { UserPrefrenceService } from '../userPrefrence/userprefrence.service';

@Component({
    selector: 'menuItemTree',
    templateUrl: './menuItemMaintenance.component.html',
    styleUrls: ['./itemMaintenance.component.css'],
    providers: [ItemMaintenanceService, GenericPageService, UserPrefrenceService]
})

export class MenuItemMaintenance implements OnInit {

    @ViewChild('tvChk') tree;
    p = 1;
    totalPage = 100;
    treemneu: any;
    boxes: any;
    itemGridListHead: string;
    fullImagePath: string;
    tableclass = '';
    tokenNo: string;
    companyName: string;
    title: string;
    headergridmenu: any;
    nodesgridselection: any;
    headergridselection: any;
    nodesgrid: any;
    gridoptions: any;
    gridselectionoptions: any;
    nodeTree: any;
    treeoptions: any;
    menuButton: any;
    menuSelectionButton: any;
    menutreeButton: string;
    getFirstPageAPI: string;
    getNextPageAPI: string;
    getLastPageAPI: string;
    pageingShow: string;
    loader: string;
    colorgui: string;
    checkedList = [];
    checkedListSelection = [];
    isCheckAll: boolean;
    isCheckAllSelecttion: boolean;
    responsemaindata: any;
    responseselectiondata: any;
    mainTitle: string;
    selectionTitle: string;
    maintableclass: string;
    selectiontableclass: string;
    responseDtForm: any;
    showMenuPopup: string;
    cc: string;
    hexkey: string;
    ddName: string;
    viewId: string;
    modalPop: string;
    nodeClickAPI: string;
    menuCodeAPI: string;
    menuItemAPI: string;
    treeAPICall: string;
    removenodesgrid: any;
    removegridoptions: any;
    setmessage: any;
    constructor(private _itemMaintenanceService: ItemMaintenanceService, private _gpServices: GenericPageService, private _activeRoute: ActivatedRoute, private titleService: Title) { }
    ngOnInit() {
       //
        this.removenodesgrid = [
            {
                menu: 'remove'
            }
        ];
        this.removegridoptions = {
            allowDrag: true,
            allowDrop: true
        };
        this.modalPop = '';
        this.loader = environment.displayBlock;
        this.colorgui = sessionStorage.getItem('colorgui');
        this.fullImagePath = '../../assets/img/lightbox/plus-white.png';
        this.title = this._activeRoute.snapshot.queryParams['title'];
        this.companyName = localStorage.getItem('companyName');
        this.titleService.setTitle(this._activeRoute.snapshot.queryParams['title']);
        const token: string = this._activeRoute.snapshot.queryParams['t'];
        this.tokenNo = token;
        localStorage.removeItem('Unauthorized');

        if (token !== undefined) {

            this.loader = 'block';
            this._itemMaintenanceService.getItemGridListUsingToken(token)
                .subscribe(
                    (gridList) => {

                        this.loader = environment.displayNone;
                       
                        if (gridList.msg !== undefined) {
                            toast(gridList.msg, 4000);
                            return false;
                        } else {
                            this.resetAll(gridList);
                        }
                    }, (error) => {

                        this.loader = environment.displayNone;
                        //toast(error.error.msg[0], 4000);
                        for(let jmsg = 0; jmsg < error.error.msg.length;jmsg++)		                       
                        {		
                        toast(error.error.msg[jmsg], 4000); 		
                        }	
                        return false;
                       
                    }
                );
        } else {
            this.loader = environment.displayBlock;
            this._itemMaintenanceService.getItemGridList()
                .subscribe(
                    (gridList) => {
                        this.loader = environment.displayNone;
                      
                        if (gridList.msg !== undefined) {
                            toast(gridList.msg, 4000);
                            return false;
                        } else {
                            this.resetAll(gridList);
                            // for (let i = 0; i < gridList.data.length; i++) {

                            //     if (gridList.data[i].type === 'menutree') {

                            //         this.menutreeButton = gridList.data[i - 1];
                            //         this.treeAPICall = gridList.data[i - 1].APICall;
                            //         this.nodeTree = gridList.data[i].children;
                            //         this.nodeClickAPI = gridList.data[i].nodeClickAPI;
                            //         this.treeoptions = {
                            //             allowDrag: true
                            //         };
                            //     }
                            //     else if (gridList.data[i].title === 'Menu Codes') {

                            //         let menusNumber;
                            //         for (let p = 0; p < gridList.data[i].head.length; p++) {
                            //             if (gridList.data[i].head[p].type === 'checkbox') {
                            //                 menusNumber = p;
                            //             }
                            //         }
                            //         this.mainTitle = gridList.data[i].title;
                            //         this.maintableclass = gridList.data[i].tableclass;
                            //         this.menuButton = gridList.data[i - 1];
                            //         this.headergridmenu = gridList.data[i].head;
                            //         const mdata = [];
                            //         for (let k = 0; k < gridList.data[i].body.length; k++) {
                            //             const cols = {
                            //                 name: gridList.data[i].body[k].columns[0].value,
                            //                 menuname: gridList.data[i].body[k].columns[0].value,
                            //                 title: gridList.data[i].body[k].columns[1].value,
                            //                 menu: 'menuCodes',
                            //                 id: gridList.data[i].body[k].id,
                            //                 hexkey: gridList.data[i].body[k].hexkey,
                            //                 type: gridList.data[i].head[menusNumber].type,
                            //                 checked: gridList.data[i].body[k].columns[menusNumber].checked,
                            //                 readonly: gridList.data[i].body[k].columns[menusNumber].readonly

                            //             };
                            //             mdata.push(cols);
                            //         }

                            //         this.responsemaindata = gridList.data[i];
                            //         this.nodesgrid = mdata;
                            //         this.gridoptions = {
                            //             allowDrag: true,
                            //             allowDrop: true
                            //         };
                            //     }
                            //     else if (gridList.data[i].title === 'Menu Items') {

                            //         let selectionNumber;
                            //         for (let p = 0; p < gridList.data[i].head.length; p++) {
                            //             if (gridList.data[i].head[p].type === 'checkbox') {
                            //                 selectionNumber = p;
                            //             }
                            //         }

                            //         this.selectionTitle = gridList.data[i].title;
                            //         this.selectiontableclass = gridList.data[i].tableclass;
                            //         this.menuSelectionButton = gridList.data[i - 1];
                            //         this.headergridselection = gridList.data[i].head;
                            //         const data = [];
                            //         for (let k = 0; k < gridList.data[i].body.length; k++) {
                            //             const cols = {
                            //                 name: gridList.data[i].body[k].columns[0].value,
                            //                 menu: 'menuItems',
                            //                 id: gridList.data[i].body[k].id,
                            //                 hexkey: gridList.data[i].body[k].hexkey,
                            //                 type: gridList.data[i].head[selectionNumber].type,
                            //                 checked: gridList.data[i].body[k].columns[selectionNumber].checked,
                            //                 readonly: gridList.data[i].body[k].columns[selectionNumber].readonly
                            //             };
                            //             data.push(cols);
                            //         }

                            //         this.responseselectiondata = gridList.data[i];
                            //         this.nodesgridselection = data;
                            //         this.gridselectionoptions = {
                            //             allowDrag: true,
                            //             allowDrop: true
                            //         };
                            //     }
                            // }
                        }
                    }, (error) => {
                        this.loader = environment.displayNone;
                       
                        for (let jmsg = 0; jmsg < error.error.msg.length; jmsg++) {
                            toast(error.error.msg[jmsg], 4000);
                        }
                        return false;
                    }
                );
        }

    }
    resetAll(gridList) {

        this.checkedListSelection = [];
        this.checkedList = [];
        this.loader = environment.displayNone;
        if (gridList.msg !== undefined) {
            toast(gridList.msg, 4000);
        }

        for (let i = 0; i < gridList.data.length; i++) {
            if (gridList.data[i].type === 'menutree') {
                this.menutreeButton = gridList.data[i - 1];
                this.treeAPICall = gridList.data[i - 1].APICall;
                this.nodeClickAPI = gridList.data[i].nodeClickAPI;
                this.nodeTree = [gridList.data[i]];
                this.treeoptions = {
                    allowDrag: true
                };
            } else if (gridList.data[i].title === 'Menu Codes') {

                this.menuCodeAPI = gridList.data[i].apiRowSelect;
                let menusNumber;
                for (let p = 0; p < gridList.data[i].head.length; p++) {
                    if (gridList.data[i].head[p].type === 'checkbox') {
                        menusNumber = p;
                    }
                }
                this.mainTitle = gridList.data[i].title;
                this.maintableclass = gridList.data[i].tableclass;
                this.menuButton = gridList.data[i - 1];
                this.headergridmenu = gridList.data[i].head;
                const mdata = [];

                for (let k = 0; k < gridList.data[i].body.length; k++) {
                    const data = [];

                    const cols = {
                        name: gridList.data[i].body[k].columns[0].value,
                        menuname: gridList.data[i].body[k].columns[0].value,
                        title: gridList.data[i].body[k].columns[1].value,
                        menu: 'menuCodes',
                        id: gridList.data[i].body[k].id,
                        hexkey: gridList.data[i].body[k].hexkey,
                        type: gridList.data[i].head[menusNumber].type,
                        checked: gridList.data[i].body[k].columns[menusNumber].checked,
                        readonly: gridList.data[i].body[k].columns[menusNumber].readonly

                    };
                    mdata.push(cols);
                }
                this.isCheckAll = false;
                this.responsemaindata = gridList.data[i];
                this.nodesgrid = mdata;
                this.gridoptions = {
                    allowDrag: true,
                    allowDrop: false
                };
            } else if (gridList.data[i].title === 'Menu Items') {

                this.menuItemAPI = gridList.data[i].apiRowSelect;
                let selectionNumber;
                for (let p = 0; p < gridList.data[i].head.length; p++) {
                    if (gridList.data[i].head[p].type === 'checkbox') {
                        selectionNumber = p;
                    }
                }

                this.selectionTitle = gridList.data[i].title;
                this.selectiontableclass = gridList.data[i].tableclass;
                this.menuSelectionButton = gridList.data[i - 1];
                this.headergridselection = gridList.data[i].head;
                const data = [];
                for (let k = 0; k < gridList.data[i].body.length; k++) {
                    const cols = {
                        name: gridList.data[i].body[k].columns[0].value,
                        menu: 'menuItems',
                        id: gridList.data[i].body[k].id,
                        hexkey: gridList.data[i].body[k].hexkey,
                        type: gridList.data[i].head[selectionNumber].type,
                        checked: gridList.data[i].body[k].columns[selectionNumber].checked,
                        readonly: gridList.data[i].body[k].columns[selectionNumber].readonly
                    };
                    data.push(cols);
                }
                this.isCheckAllSelecttion = false;
                this.responseselectiondata = gridList.data[i];
                this.nodesgridselection = data;
                this.gridselectionoptions = {
                    allowDrag: true,
                    allowDrop: false
                };
                this.removenodesgrid = [
                    {
                        menu: 'remove'
                    }
                ];
                this.removegridoptions = {
                    allowDrag: true,
                    allowDrop: true
                };
            }
        }
    }
    checkAll(event, selection) {
        if (selection === 'menuItems') {

            let selectionNumber;
            for (let p = 0; p < this.headergridselection.length; p++) {
                if (this.headergridselection[p].type === 'checkbox') {
                    selectionNumber = p;
                }
            }
            this.checkedListSelection = [];

            const data = [];
            for (let i = 0; i < this.responseselectiondata.body.length; i++) {
                const cols = {
                    name: this.responseselectiondata.body[i].columns[0].value,
                    menu: 'menuItems',
                    id: this.responseselectiondata.body[i].id,
                    hexkey: this.responseselectiondata.body[i].hexkey,
                    type: this.responseselectiondata.head[selectionNumber].type,
                    checked: event.target.checked ? true : false,
                    readonly: this.responseselectiondata.body[i].columns[selectionNumber].readonly
                };
                if (event.target.checked) {
                    if (!this.responseselectiondata.body[i].columns[selectionNumber].readonly) {
                        this.checkedListSelection.push(this.responseselectiondata.body[i].hexkey);
                    } else {
                        this.checkedListSelection = null;
                    }
                }
                data.push(cols);
            }
            this.nodesgridselection = data;
            this.gridselectionoptions = {
                allowDrag: true,
                allowDrop: false
            };
        } else {

            let menusNumber;
            for (let p = 0; p < this.headergridmenu.length; p++) {
                if (this.headergridmenu[p].type === 'checkbox') {
                    menusNumber = p;
                }
            }
            this.checkedList = [];

            const mdata = [];
            for (let k = 0; k < this.responsemaindata.body.length; k++) {

                const cols = {
                    name: this.responsemaindata.body[k].columns[0].value,
                    title: this.responsemaindata.body[k].columns[1].value,
                    menu: 'menuCodes',
                    id: this.responsemaindata.body[k].id,
                    hexkey: this.responsemaindata.body[k].hexkey,
                    type: this.responsemaindata.head[menusNumber].type,
                    checked: event.target.checked ? true : false,
                    readonly: this.responsemaindata.body[k].columns[menusNumber].readonly

                };
                if (event.target.checked) {
                    if (!this.responsemaindata.body[k].columns[menusNumber].readonly) {
                        this.checkedList.push(this.responsemaindata.body[k].hexkey);
                    } else {
                        this.checkedList = null;
                    }
                }
                mdata.push(cols);
            }
            this.nodesgrid = mdata;
            this.gridoptions = {
                allowDrag: true,
                allowDrop: false
            };
        }
    }
    onCheckboxChange(itemData, event, selection) {

        if (selection === 'menuItems') {
            if (event.target.checked) {
                this.checkedListSelection.push(itemData.hexkey);
            } else {
                for (let i = 0; i < this.nodesgridselection.length; i++) {
                    if (this.checkedListSelection[i] === itemData.hexkey) {
                        this.checkedListSelection.splice(i, 1);
                        if (this.checkedListSelection.length === 0) {
                            this.isCheckAllSelecttion = false;
                        } else {
                            this.isCheckAllSelecttion = true;
                        }
                    }
                }
            }
            if (this.nodesgridselection.length === this.checkedListSelection.length) {
                this.isCheckAllSelecttion = true;
            } else {
                this.isCheckAllSelecttion = false;
            }
        } else {
            if (event.target.checked) {
                this.checkedList.push(itemData.hexkey);
            } else {
                for (let i = 0; i < this.nodesgrid.length; i++) {
                    if (this.checkedList[i] === itemData.hexkey) {
                        this.checkedList.splice(i, 1);
                        if (this.checkedList.length === 0) {
                            this.isCheckAll = false;
                        } else {
                            this.isCheckAll = true;
                        }
                    }
                }
            }
            if (this.nodesgrid.length === this.checkedList.length) {
                this.isCheckAll = true;
            } else {
                this.isCheckAll = false;
            }
        }
    }

    deleteCheckedData(checkBoxApi, selction) {
        if (selction === 'menuItems') {
            if (this.checkedListSelection.length < 1) {
                toast('please select any one from menu items', 4000);
                return false;
            }
            this.loader = environment.displayBlock;
            const cols = {
                'hexkeys': this.checkedListSelection
            };
            this._itemMaintenanceService.reportDelete(cols, checkBoxApi)
                .subscribe(
                    response => {

                        this.loader = environment.displayNone;
                        if (response.msg !== undefined) {
                            // toast(response.msg, 4000);

                            this.resetAll(response);
                        }

                    }, error => {
                        this.loader = environment.displayNone;
                        toast(error.error.msg, 4000);
                    });
        } else {
            if (this.checkedList.length < 1) {
                toast('please select any one from menu codes', 4000);
                return false;
            }
            this.loader = environment.displayBlock;
            const cols = {
                'hexkeys': this.checkedList
            };
            this._itemMaintenanceService.reportDelete(cols, checkBoxApi)
                .subscribe(
                    response => {

                        this.loader = environment.displayNone;
                        if (response.msg !== undefined) {
                            // toast(response.msg, 4000);

                            this.resetAll(response);
                        }

                    }, error => {
                        this.loader = environment.displayNone;
                        toast(error.error.msg, 4000);
                    });
        }
    }
    
    deleteNode(node) : void {
        if (node.parent != null) {
            node.parent.data.children.splice(node.parent.data.children.indexOf(node.data), 1)
            this.tree.treeModel.update()
        }
        alert(node.srcElement.outerText);
    }
   
    onMoveNode($event) {

        if ($event.node.menu === 'menuItems') {
            this.isCheckAllSelecttion = false;
            // this.resetAll('menuItems');
        } else {
            this.isCheckAll = false;
            //  this.resetAll('menuCodes');
        }
      //  console.log('Moved', $event.node.name, 'to', $event.to.parent.name, 'at index', $event.to.index);
        if ($event.to.parent.name === undefined) {
            // this.setallowDrag = false;
            // this.setallowDrop = false;
        }
    }
    onEvent($event) {
        console.log('Moved', $event.node.name, 'to', $event.to.parent.name, 'at index', $event.to.index);
    }
    // save checked items
    saveTreeNode(treeView) {
        this.loader = environment.displayBlock;
        if (treeView.treeModel.nodes.length > 0) {
            const cols = {
                treemenu: treeView.treeModel.nodes
            };
            this._itemMaintenanceService.dataPost(treeView.treeModel.nodes, this.treeAPICall)
                .subscribe(
                    response => {
                        this.loader = environment.displayNone;
                        if (response === null) {
                            return false;
                        } else if (response.msg !== undefined) {
                            this.resetAll(response);
                        }
                    }, error => {
                        this.loader = environment.displayNone;
                        toast(error.error.msg, 4000);
                    });
        }
    }
    editSelectionMenu(name: string) {

        alert('Edit :- ' + name);
    }
    deleteSelectionMenu(name: string) {
        alert('Delete :- ' + name);
    }
    // get page according to navigation

    getPage(url: string) {
        this.loader = environment.displayBlock;
        if (url === '') {
            this.loader = environment.displayNone;
            this.ngOnInit();
        } else {
            this._itemMaintenanceService.getItemInquiryPerpage(url)
                .subscribe((itemInquiryData) => {
                    if (itemInquiryData.matchingItems === undefined) {
                        // toast(itemInquiryData.msg, 4000);\
                        alert(itemInquiryData.msg);
                        this.loader = environment.displayNone;
                        return false;
                    }

                    this.loader = environment.displayNone;
                }, error => {
                    toast(error.error.msg, 4000);
                });
        }
    }

    getButtonReceipt(response) {
        this.loader = environment.displayBlock;
        this._gpServices.menuApiCall(response.APICall)
            .subscribe(
                resApiCall => {
                    this.loader = environment.displayNone;
                    if (resApiCall === null) {
                        return false;
                    }
                    
                    /*else if (resApiCall.msg !== undefined) {
                        toast(resApiCall.msg, 4000);
                        return false;
                    } else {
                        this.modalPop = 'custom-body';
                        this.hexkey = resApiCall.data[0].hexkey;
                        this.cc = resApiCall.data[0].cc;
                        this.ddName = resApiCall.data[0].ddname;
                        this.viewId = resApiCall.data[0].viewid;
                        this.responseDtForm = resApiCall;
                        this.showMenuPopup = environment.displayBlock;
                    }
                    */
                   else {
                   for (let i = 0; i < resApiCall.data.length; i++) {
                    if (resApiCall.data[i].type == "notify") {
                        if (resApiCall.data[i].msg !== undefined || resApiCall.data[i].alert !== undefined) {
                            if (resApiCall.data[i].alert !== null || resApiCall.data[i].msg !== null) {
                                this.setmessage = response.data[i];
                                }
                        }
                    }
                    else {
                        this.modalPop = 'custom-body';
                        this.hexkey = resApiCall.data[i].hexkey;
                        this.cc = resApiCall.data[i].cc;
                        this.ddName = resApiCall.data[i].ddname;
                        this.viewId = resApiCall.data[i].viewid;
                        this.responseDtForm = resApiCall;
                        this.showMenuPopup = environment.displayBlock;
                    }
                  }
                }
                }, error => {
                    this.loader = environment.displayNone;
                    toast(error.error.msg, 4000);
                }
            );
    }

    

    responseMessage(event) {
        if (event === 'cancel') {
            this.modalPop = '';
            this.showMenuPopup = environment.displayNone;
        }
    }

    receiveDtForm(event) {
        this.loader = environment.displayBlock;
        const data = [];
        for (let i = 0; i < event.data._directives.length; i++) {
            if (event.dtFormList[0].fields[i].style !== undefined) {
                if (event.dtFormList[0].fields[i].style.split(':')[1] === 'uppercase') {
                    const cols = {
                        name: event.data._directives[i].name.toLowerCase(),
                        value: event.data._directives[i].viewModel.toUpperCase() === undefined ? '' : event.data._directives[i].viewModel.toUpperCase()
                    };
                    data.push(cols);
                } else {
                    const cols = {
                        name: event.data._directives[i].name.toLowerCase(),
                        value: event.data._directives[i].viewModel === undefined ? '' : event.data._directives[i].viewModel
                    };
                    data.push(cols);
                }
            } else {
                const cols = {
                    name: event.data._directives[i].name.toLowerCase(),
                    value: event.data._directives[i].viewModel === undefined ? '' : event.data._directives[i].viewModel
                };
                data.push(cols);
            }
        }
        let pcols = {};
        if (this.hexkey !== '') {
            pcols = {
                cc: this.cc,
                ddname: this.ddName,
                hexkey: this.hexkey,
                viewid: this.viewId,
                fields: data
            };
        } else {
            pcols = {
                cc: this.cc,
                ddname: this.ddName,
                viewid: this.viewId,
                fields: data
            };
        }
        this._itemMaintenanceService.menuNext(pcols, event.submitapi)
            .subscribe(
                response => {
                    this.loader = environment.displayNone;
                    if (response === null) {
                        return false;
                    }
                    /* else if (formResponse.msg !== undefined) {
                        this.resetAll(formResponse);
                        this.showMenuPopup = environment.displayNone;
                    } else {
                        this.responseDtForm = formResponse;
                    }*/
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].type == "notify") {
                          if (response.data[i].msg !== undefined || response.data[i].alert !== undefined) {
                            if (response.data[i].alert !== null || response.data[i].msg !== null) {
                              this.setmessage = response.data[i];
                            }
                          }
                        }
                        else {
                            this.responseDtForm = response;
                        }
                    }
                }, error => {
                    this.loader = environment.displayNone;
                    toast(error.error.msg, 4000);
                });
    }

    onSelect(event, type) {
        // console.log(event.node.data);
        if (!event.node.data.readonly) {
            this.loader = environment.displayBlock;
            if (type === 'menutree') {
                this._itemMaintenanceService.getNodeEdit(this.nodeClickAPI, event.node.data.id)
                    .subscribe(
                        response => {
                            this.loader = environment.displayNone;
                            if (response === null) {
                                return false;
                            }
                            /* else if (response.msg !== undefined) {
                                toast(response.msg, 4000);
                                return false;
                            } else {
                                this.modalPop = 'custom-body';
                                this.hexkey = response.data[0].submitApi.includes('saveMenuItem') ? response.data[0].hexkey : response.data[0].submitApi.includes('saveMenuCode') ? response.data[0].hexkey : '';
                                this.cc = response.data[0].cc;
                                this.ddName = response.data[0].ddname;
                                this.viewId = response.data[0].viewid;
                                this.responseDtForm = response;
                                this.showMenuPopup = environment.displayBlock;
                            }*/
                            else {
                            for (let i = 0; i < response.data.length; i++) {
                                if (response.data[i].type == "notify") {
                                  if (response.data[i].msg !== undefined || response.data[i].alert !== undefined) {
                                    if (response.data[i].alert !== null || response.data[i].msg !== null) {
                                      this.setmessage = response.data[i];
                                    }
                                  }
                                }
                                else {
                                    this.modalPop = 'custom-body';
                                    this.hexkey = response.data[i].submitApi.includes('saveMenuItem') ? response.data[i].hexkey : response.data[i].submitApi.includes('saveMenuCode') ? response.data[i].hexkey : '';
                                    this.cc = response.data[i].cc;
                                    this.ddName = response.data[i].ddname;
                                    this.viewId = response.data[i].viewid;
                                    this.responseDtForm = response;
                                    this.showMenuPopup = environment.displayBlock;
                                }
                            }
                        }
                        }, error => {
                            this.loader = environment.displayNone;
                            toast(error.error.msg, 4000);
                        });
            } else if (type === 'menuCodes') {
                this._itemMaintenanceService.getMenuEdit(this.menuCodeAPI, event.node.data.hexkey)
                    .subscribe(
                        response => {
                            this.loader = environment.displayNone;
                            if (response === null) {
                                return false;
                            } 
                           else {
                            for (let i = 0; i < response.data.length; i++) {
                                if (response.data[i].type == "notify") {
                                  if (response.data[i].msg !== undefined || response.data[i].alert !== undefined) {
                                    if (response.data[i].alert !== null || response.data[i].msg !== null) {
                                      this.setmessage = response.data[i];
                                    }
                                  }
                                }
                                else {
                                    this.modalPop = 'custom-body';
                                    this.hexkey = response.data[i].hexkey;
                                    this.cc = response.data[i].cc;
                                    this.ddName = response.data[i].ddname;
                                    this.viewId = response.data[i].viewid;
                                    this.responseDtForm = response;
                                    this.showMenuPopup = environment.displayBlock;
                                }
                            }
                        }
                        }, error => {
                            this.loader = environment.displayNone;
                            toast(error.error.msg, 4000);
                        });
            } else {
                this._itemMaintenanceService.getMenuEdit(this.menuItemAPI, event.node.data.hexkey)
                    .subscribe(
                        response => {
                            this.loader = environment.displayNone;
                            if (response === null) {
                                return false;
                            } 
                            
                            else {
                                for (let i = 0; i < response.data.length; i++) {
                                    if (response.data[i].type == "notify") {
                                      if (response.data[i].msg !== undefined || response.data[i].alert !== undefined) {
                                        if (response.data[i].alert !== null || response.data[i].msg !== null) {
                                          this.setmessage = response.data[i];
                                        }
                                      }
                                    }
                                    else {
                                        this.modalPop = 'custom-body';
                                        this.hexkey = response.data[i].hexkey;
                                        this.cc = response.data[i].cc;
                                        this.ddName = response.data[i].ddname;
                                        this.viewId = response.data[i].viewid;
                                        this.responseDtForm = response;
                                        this.showMenuPopup = environment.displayBlock;
                                    }
                                }
                            }
                        }, error => {
                            this.loader = environment.displayNone;
                            toast(error.error.msg, 4000);
                        });
            }
        }
    }
}

