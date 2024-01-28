import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { toast } from 'angular2-materialize';
import { environment } from '../../environments/environment';
import { nfapply } from 'q';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TestMenuService } from './testMenu.service';
@Component({
  selector: 'test-menu',
  templateUrl: './testMenu.component.html',
  styleUrls: ['./testMenu.component.css'],
  providers: [ TestMenuService ]
})
export class TestMenuComponent implements OnInit {
  api: string;
  loader: string;
  displayViewresponse: any;
  displaySubGridresp: any;
  navigationcss: string;
  navigatinresponse: string;
  expanded: boolean;
  userName: string;
  patientclass: string;
  pageName: string;
  responseDtForm: any;
  setmessage: any;
  response: any;
  hideOnmobile: string;
  deviceInfo = null;
  showPopUpResp: boolean = true;
  popUpTitle: string;
  messageToSendP: string = 'my component';
  displayViewPopUp: any;
  displaySubGridPopUp: any;
  displayViewPopUpArr: any[] = [];
  displaySubGridPopUpArr: any[] = [];
  displayViewPageArr: any[] = [];
  displaySubGridPageArr: any[] = [];
  mainPopuptitle: string;
  showPopUp: string;
  showClose: boolean;
  popup_width: any;
  popup_height: any;
  popup_top: string;
  pageData: any;
  popup_style: any;
  onCloseApi: string;
  url: string;
  static_data: any;
  clientMenu: any;
  data: any;
  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _testMenuService: TestMenuService) {

  }
  ngOnInit() {
  this.data =   {'data': [
        {
            'clearPage': true,
            'type': 'pageInit'
        },
        {
            'cc': 'DY',
            'formSubmit': true,
            'ddname': 'ITEMSEARCH',
            'viewid': 'I',
            'enterKeySubmits': true,
            'width': '600px',
            'hexkey': '',
            'type': 'form',
            'title': 'Item Search',
            'divs': [
                {
                    'divclass': 'row',
                    'fields': [{
                        'divclass': 'input-field col  s8',
                        'size': 40,
                        'readonly': false,
                        'maxlength': 40,
                        'inputclass': 'validate',
                        'tabindex': 1,
                        'name': 'searchphrase',
                        'focus': true,
                        'label': 'Item Search Phrase',
                        'type': 'text',
                        'value': ''
                    }]
                },
                {
                    'divclass': 'row',
                    'fields': [{
                        'divclass': 'col  s4',
                        'tabindex': 2,
                        'name': 'incdisc',
                        'label': 'Include Discontinued Items',
                        'type': 'switch',
                        'value': false
                    }]
                },
                {
                    'divclass': 'row',
                    'fields': [{
                        'divclass': 'col  s6',
                        'tabindex': 3,
                        'name': 'noinvwhs',
                        'label': 'Include even if not available in my whs',
                        'type': 'switch',
                        'value': false
                    }]
                },
                {
                    'divclass': 'row',
                    'fields': [{
                        'divclass': 'col  s6',
                        'tabindex': 4,
                        'name': 'noinvco',
                        'label': 'Include even if not available in company',
                        'type': 'switch',
                        'value': false
                    }]
                }
            ]
        },
        {
            'buttons': [
                {
                    'buttonType': 'submit',
                    'onPush': '/dt/dyitem/searchForm',
                    'isEnabled': true,
                    'icon': 'fa fa-search',
                    'action': 'api_call',
                    'text': 'Search',
                    'class': 'DTButton-green'
                },
                {
                    'buttonType': 'cancel',
                    'showMenu': true,
                    'onPush': 'dynamoToolHome',
                    'isEnabled': true,
                    'icon': 'fa fa-times-circle',
                    'action': 'routing',
                    'text': 'Cancel',
                    'class': 'DTButton-red'
                }
            ],
            'type': 'buttons'
        }
    ]};
     }

  getSelected(clientDetails) {

    let api = clientDetails.api;
    let url = clientDetails.url;
    let newtab = clientDetails.newtab;
    this._testMenuService.getDetails(api,url,newtab)
            .subscribe(response => {
                this.loader = environment.displayNone;
                if (response === null) {
                    return false;
                }
                else if (response.msg !== undefined) {
                    toast(response.msg, 4000);
                    return false;
                }
                else if(response.alert !=='' && response.alert !== undefined){
                    alert(response.alert);
                    return;
                }
                else if (response.msg !== undefined || response.alert !== undefined) {
                    if (response.alert !== null || response.msg !== null) {
                        this.setmessage = response;
                        return false;
                    }
                } else {

                    for (let k = 0; k < response.data.length; k++) {
                        if (response.data[k].type === 'displayView') {
                            this.displayViewresponse = response;

                        } else if (response.data[k].type === 'displayGrid') {

                            this.displaySubGridresp = response.data[k];
                            if (response.data[k].navigation !== undefined) {
                                this.navigationcss = environment.displayBlock;
                                this.navigatinresponse = response.data[k].navigation;
                            } else {
                                this.navigationcss = environment.displayNone;
                            }
                        } else if (response.data[k].type === 'form') {
                            this.responseDtForm = response;

                        }
                    }
                }
            }, error => {

                this.loader = environment.displayNone;
                if(error.message !== undefined) {
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
            });

  }

}