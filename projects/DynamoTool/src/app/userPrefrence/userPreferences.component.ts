import { Component, OnInit, ViewChild, ElementRef, DebugElement } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UserPrefrenceService } from './userprefrence.service';
import 'materialize-css';
import { toast } from 'angular2-materialize';
import { environment } from '../../environments/environment';
@ Component({
  selector: 'app-userpreferences',
  templateUrl: './userPreferences.component.html',
  styleUrls: ['./userPreferences.component.css'],
  providers: [UserPrefrenceService]
})

export class UserPreferencesComponent implements OnInit {

  constructor(private _userPrefrenceService: UserPrefrenceService, private _activeRoute: ActivatedRoute,
    private _router: Router, private titleService: Title) {
  }

  tokenNo: string;
  statusMessage = '';
  filterText: string;
  title: string;
  companyName: string;
  showheading: string;
  tableclass = '';
  color: string;
  loader: string;
  setcolor: string;
  userColorbody: any;
  userColorhead: any;
  tableClass: string;
  CDcolor: string;
  CD: string;
  selectedColor: any;
  defaultColor: string;
  myColor: string;
  selectedType: string;
  selectedName: any;
  cellIndex: string;
  childresponse: any;
  sendParameter: any;

  public SData = [];

  ngOnInit() {

    this.color = this._activeRoute.snapshot.queryParams['guicolor'];
    this.loader = 'none';
    this.selectedType = '';
    this.titleService.setTitle(this._activeRoute.snapshot.queryParams['title']);
    this.companyName = this._activeRoute.snapshot.queryParams['companyname'];
    this.showheading = this._activeRoute.snapshot.queryParams['showheading'];
    this.title = this._activeRoute.snapshot.queryParams['title'];
    if (this.showheading === 'true') {
      this.companyName = this._activeRoute.snapshot.queryParams['companyname'];
      this.title = this._activeRoute.snapshot.queryParams['title'];
      this.titleService.setTitle(this._activeRoute.snapshot.queryParams['title']);
    } else {
      this.title = '';
      this.companyName = '';
      this.titleService.setTitle('');
    }

    const token: string = this._activeRoute.snapshot.queryParams['t'];
    this.tokenNo = token;

    if (token !== undefined) {

      this.loader = 'block';
      this._userPrefrenceService.getUserColorWithToken(token)
        .subscribe((response) => {
         /* if (resp.msg !== undefined) {
            toast(resp.msg, 4000);
            return false;
          } else {
            this.userColorhead = resp.data[0].head;
            this.childresponse = resp.data[0];
          }
          */
         if (response == undefined) {
            return false;
         }
         else {
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].type == "notify") {
                if (response.data[i].alert !== undefined && response.data[i].alert !== null) {
                    alert(response.data[i].alert);
                    }
                else if (response.data[i].msg !== undefined && response.data[i].msg !== null) {
                    for (let jmsg = 0; jmsg < response.data[i].msg.length; jmsg++) {
                        toast(response.data[i].msg[jmsg], 4000);
                    }

                }
            }
            else {
              this.userColorhead = response.data[i].head;
              this.childresponse = response.data[i];
            }
          }
         }
        }, (error) => {
          toast(error.error.msg, 4000);
        });
      this.loader = 'none';
    } else {

      this._userPrefrenceService.getUserColor()
        .subscribe((response) => {

        /*  if (resp.msg !== undefined) {
            //  toast(resp.msg, 4000);
            return false;
          } else {
            this.userColorhead = resp.data[0].head;
            this.childresponse = resp.data[0];
          }
          */
         if (response == undefined) {
          return false;
       }
       else {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].type == "notify") {
              if (response.data[i].alert !== undefined && response.data[i].alert !== null) {
                  alert(response.data[i].alert);
                  }
              else if (response.data[i].msg !== undefined && response.data[i].msg !== null) {
                  for (let jmsg = 0; jmsg < response.data[i].msg.length; jmsg++) {
                      toast(response.data[i].msg[jmsg], 4000);
                  }

              }
          }
          else {
            this.userColorhead = response.data[i].head;
            this.childresponse = response.data[i];
          }
        }
       }
        }, (error) => {
          toast(error.error.msg, 4000);
        });
    }
  }
  getColor(event) {

    if (this.CD === undefined) {
      return false;
    }
    this.loader = 'block';
    if (this.selectedType === 'My Color') {
      this.selectedName = this.cellIndex;
      this.setcolor = '#FFFFCC';

      const cols = {
        'cc': this.CD,
        'defaultcolor': this.defaultColor,
        'mycolor': event.target.value
      };
      this.SData.push(cols);
    } else if (this.selectedType === 'Default Color') {
      this.selectedName = this.cellIndex;
      this.setcolor = '#FFFFCC';

      const cols = {
        'cc': this.CD,
        'defaultcolor': event.target.value,
        'mycolor': this.CDcolor
      };
      this.SData.push(cols);
    } else {
      this.loader = environment.displayNone;
      return false;
    }
    if (this.SData.length > 0) {
      for (let k = 0; k < this.SData.length; k++) {
        if (this.SData[k].cc === this.CD) {
          if (this.selectedType === 'My Color') {
            if (this.SData[k].mycolor !== event.target.value) {
              this.SData.splice(k, 1);
            }
          } else if (this.selectedType === 'Default Color') {
            if (this.SData[k].defaultcolor !== event.target.value) {
              this.SData.splice(k, 1);
            }
          }
        }
      }
    }

    const mdata = [];
    for (let i = 0; i < this.userColorbody.length; i++) {
      const data = [];
      for (let j = 0; j < this.userColorbody[i].items.length; j++) {

        if (this.selectedType === 'My Color') {
          if (this.userColorbody[i].items[0].name.value === this.CD && this.userColorbody[i].items[3].name.value === this.CDcolor) {

            if (j === 3) {
              const cols = {
                name: { value: event.target.value, type: '' },
                head: this.userColorbody[i].items[j].head,
                readonly: this.userColorhead[j].readonly,
                hexkey: this.userColorbody[i].items[j].hexkey,
                cellIndex: i + '' + j
              };
              data.push(cols);
            } else {
              const cols = {
                name: this.userColorbody[i].items[j].name,
                head: this.userColorbody[i].items[j].head,
                readonly: this.userColorhead[j].readonly,
                hexkey: this.userColorbody[i].items[j].hexkey,
                cellIndex: i + '' + j
              };
              data.push(cols);
            }
          } else {
            const cols = {
              name: this.userColorbody[i].items[j].name,
              head: this.userColorbody[i].items[j].head,
              readonly: this.userColorhead[j].readonly,
              hexkey: this.userColorbody[i].items[j].hexkey,
              cellIndex: i + '' + j
            };
            data.push(cols);
          }
        } if (this.selectedType === 'Default Color') {
          if (this.userColorbody[i].items[0].name.value === this.CD && this.userColorbody[i].items[3].name.value === this.CDcolor) {

            if (j === 2) {
              const cols = {
                name: { value: event.target.value, type: '' },
                head: this.userColorbody[i].items[j].head,
                readonly: this.userColorhead[j].readonly,
                hexkey: this.userColorbody[i].items[j].hexkey,
                cellIndex: i + '' + j
              };
              data.push(cols);
            } else {
              const cols = {
                name: this.userColorbody[i].items[j].name,
                head: this.userColorbody[i].items[j].head,
                readonly: this.userColorhead[j].readonly,
                hexkey: this.userColorbody[i].items[j].hexkey,
                cellIndex: i + '' + j
              };
              data.push(cols);
            }
          } else {
            const cols = {
              name: this.userColorbody[i].items[j].name,
              head: this.userColorbody[i].items[j].head,
              readonly: this.userColorhead[j].readonly,
              hexkey: this.userColorbody[i].items[j].hexkey,
              cellIndex: i + '' + j
            };
            data.push(cols);
          }
        }
      }
      const mcols = {
        items: data
      };
      mdata.push(mcols);
    }
    this.userColorbody = null;
    this.userColorbody = mdata;
    this.childresponse = mdata;
    if (this.selectedType === 'My Color') {
      this.CDcolor = event.target.value;
    } else if (this.selectedType === 'Default Color') {
      this.defaultColor = event.target.value;
    }
    this.loader = 'none';
  }

  getselectedIndex(event) {

    this.userColorbody = event.userColorbody;
    if (event.head.head === 'Default Color') {
      if (event.head.readonly) {
        return false;
      } else {
        this.selectedType = 'Default Color';
        this.defaultColor = event.color.items[2].name.value;
        this.color = event.color.items[2].name.value;
        this.CD = event.color.items[0].name.value;
        this.CDcolor = event.color.items[3].name.value;
        this.cellIndex = event.index + '' + event.event.currentTarget.cellIndex;
        this.setcolor = '#FFFFCC';
        this.selectedName = event.head.cellIndex;
      }
    } else if (event.head.head === 'My Color') {
      this.selectedType = 'My Color';
      this.defaultColor = event.color.items[2].name.value;
      this.color = event.color.items[3].name.value;
      this.CD = event.color.items[0].name.value;
      this.CDcolor = event.color.items[3].name.value;
      this.cellIndex = event.index + '' + event.event.currentTarget.cellIndex;
      this.setcolor = '#FFFFCC';
      this.selectedName = event.head.cellIndex;
    } else {
      this.selectedType = '';
      this.selectedColor = event.color.items;
      return false;
    }
  }

  closewindows() {

    this.loader = 'block';
    this._userPrefrenceService.saveUserPreference(JSON.stringify(this.SData))
      .subscribe((res) => {
        this.loader = 'none';
        toast(res.msg, 4000);
        this.SData = [];
      }, (error) => {
        this.loader = 'none';
        toast(error.error.msg, 4000);
        this.SData = [];
      });
  }

  saveUserPreference(value) {

    this.loader = 'block';
    const data = [];
    if (this.childresponse.head === undefined) {

      for (let i = 0; i < this.childresponse.length; i++) {
        const cols = {
          cc: this.childresponse[i].items[0].name.value,
          defaultcolor: this.childresponse[i].items[2].name.value,
          mycolor: this.childresponse[i].items[3].name.value
        };
        data.push(cols);
      }
    } else {

      for (let i = 0; i < this.childresponse.body.length; i++) {
        const cols = {
          cc: this.childresponse.body[i].columns[0].value,
          defaultcolor: this.childresponse.body[i].columns[2].value,
          mycolor: this.childresponse.body[i].columns[3].value
        };
        data.push(cols);
      }
    }
    this._userPrefrenceService.saveUserPreference(JSON.stringify(data))
      .subscribe((response) => {
        this.loader = 'none';
       // toast(res.msg, 4000);
       if (response == undefined) {
        return false;
     }
     else {
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].type == "notify") {
            if (response.data[i].alert !== undefined && response.data[i].alert !== null) {
                alert(response.data[i].alert);
                }
            else if (response.data[i].msg !== undefined && response.data[i].msg !== null) {
                for (let jmsg = 0; jmsg < response.data[i].msg.length; jmsg++) {
                    toast(response.data[i].msg[jmsg], 4000);
                }

            }
        }

      }
     }
        this.SData = [];
      }, (error) => {
        this.loader = 'none';
        toast(error.error.msg, 4000);
        this.SData = [];
      });
  }
}
