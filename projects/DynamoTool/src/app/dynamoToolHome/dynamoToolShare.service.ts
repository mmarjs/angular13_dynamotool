import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { element } from 'protractor';
@Injectable()
export class DynamoToolShareService {
  private baseUrl;
  hexKeyGrid: any;
  validateFormError: boolean = false;
  customTime: string;

  constructor(private _httpClient: HttpClient, private _activatedRoute: ActivatedRoute, private _router: Router) {
    if (window.location.hostname === 'localhost') {
      this.baseUrl = environment.dybaseUrl;
    } else {
      if (window.location.protocol.includes('s')) {
        this.baseUrl = window.location.origin + environment.httpsPort; //  8443
      } else {
        this.baseUrl = window.location.origin + environment.httpPort; // 8888
      }
    }

  }





  getDetails(api: string, title: string, url_item: string, newtab: boolean = false): Observable<any> {
    // api title url

    if (url_item !== undefined && url_item !== null && url_item !== '') {

      if (newtab == true) {

        window.open(url_item, '_blank');
      } else if (newtab == false) {
        window.location.href = url_item;
      }

    } else if (api !== '') {

      const httpOptions = {
        headers: new HttpHeaders({
          'accept': 'text/html'
        })
      };

      // alert(this.baseUrl + api);
      //const resType = {responseType: 'text'};
      return this._httpClient.get(this.baseUrl + api, httpOptions);
      // return this._httpClient.get(this.baseUrl + api,resType);

    } else if (url_item === '/DY/gui/itemInquiry') {
      this._router.navigate(['itemInquiry']);
    }
  }

  getDetailsByhexkey(api, hexkey): Observable<any> {

    let api_hex;
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/json'
      })
    };
    if (api.includes('?')) {
      api_hex = '&hexkey=';
    } else {
      api_hex = '?hexkey=';
    }
    // FOR API CALL COMPONENT
    if (api.indexOf(window.location.origin) >= 0) {
      return this._httpClient.get(api + api_hex + encodeURIComponent(hexkey), httpOptions);
    } else {
      return this._httpClient.get(this.baseUrl + api + api_hex + encodeURIComponent(hexkey), httpOptions);
    }
  }
  DeleteByhexkey(api, hexkey): Observable<any> {

    let api_hex;
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/json'
      })
    };
    if (api.includes('?')) {
      api_hex = '&hexkeys=';
    } else {
      api_hex = '?hexkeys=';
    }
    return this._httpClient.get(this.baseUrl + api + api_hex + encodeURIComponent(hexkey.join()), httpOptions);
  }

  getDetailsScan(api): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/json'
      })
    };
    // alert(this.baseUrl + api);
    // if(api.indexOf(window.location.origin)
    if (api.indexOf(window.location.origin) >= 0) {
      return this._httpClient.get(api, httpOptions);
    } else {
      return this._httpClient.get(this.baseUrl + api, httpOptions);
    }
  }

  LogOut(url): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/json'
      })
    };
    return this._httpClient.get(this.baseUrl + url, httpOptions);
  }

  menuNext(menuData, formapi): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/json'
      })
    };

    return this._httpClient.post(this.baseUrl + formapi, JSON.stringify(menuData), httpOptions);

  }

  uploadFile(fileData, api, searchPhrase?): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({

      })
    };

    const fileDataNew = {
      'fileData': fileData,
      'searchPhrase': searchPhrase
    };

    return this._httpClient.post(this.baseUrl + api, fileDataNew, httpOptions);

  }

  getSelectedItemInquiry(optionApi: string, optpgm): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/json'
      })
    };

    return this._httpClient.get(this.baseUrl + optionApi + '&optpgm=' + encodeURIComponent(optpgm), httpOptions);

  }

  saveItemNotepad(ItemVaule: string, hexkey: string, filename: string, saveapi: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/json'
      })
    };
    const menuData = {
      'filename': filename,
      'hexkey': hexkey,
      'htmledit': ItemVaule
    };
    return this._httpClient.post(this.baseUrl + saveapi, menuData, httpOptions);
  }

  getSecondMenu(api, menucode, title, icon, iconcolor, parentmenu, cc) {

    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/json'
      })
    };

    const args = 'menucode=' + encodeURIComponent(menucode) + '&title=' + encodeURIComponent(title) + '&icon=' + encodeURIComponent(icon) + '&iconcolor=' + encodeURIComponent(iconcolor) + '&parentmenu=' + encodeURIComponent(parentmenu) + '&cc=' + encodeURIComponent(cc);

    return this._httpClient.get(this.baseUrl + api + args, httpOptions);

  }

  setCustomHourMinute(fromIcon, degColumn, event) {

    // comment 16 dec 2021 const setFourDigit = fromIcon == false ? event.target.value.replace(/\s+/g, '').split('') : event;
    const setFourDigit = event.target !== undefined ? event.target.value.replace(/\s+/g, '').split('') : event;
    let setInHour: any;
    let setInMinute: any;
    let formatValid: boolean = false;
    let setCustomHour: any;
    let setCustomMinute: any;
    const max = degColumn.max;
    const min = degColumn.min;
    const amArray = [7, 8, 9, 10, 11];
    const pmArray = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const format = degColumn.format;
    // comment 16 dec 2021 const timeVal = fromIcon == false ? event.target.value.toString().toLowerCase() : event.toString().toLowerCase();
    const timeVal = event.target !== undefined ? event.target.value.toString().toLowerCase() : event.toString().toLowerCase();
    let validationMessage: string = '';
    /* 16 dec 2021 CHECK IF ONLY AM OR PM IS ENTERED */
    //  formatValid =   typeof(JSON.parse(setFourDigit[0])) !== 'number' ? false : true;
    if (format == 24) {
      // CASE 1 NO COLON PM OPTION 700P 715 700 p 700PM >= 3 7p
      if (setFourDigit.length >= 1 && timeVal.indexOf(':') == -1 && (timeVal.indexOf('p') !== -1 || timeVal.indexOf('pm') !== -1 || timeVal.indexOf('a') !== -1 || timeVal.indexOf('am') !== -1)) { // 6:15

        setInHour = setFourDigit[0];
        setInMinute = setFourDigit[2] !== undefined ? setFourDigit[1] + setFourDigit[2] : setFourDigit[1];
        setInMinute = setInMinute.toLowerCase();
        setInMinute = setInMinute.replace(/[pmpama]/g, '');
        // 175


        if (setInMinute > 59 || timeVal.indexOf('p') !== -1 || timeVal.indexOf('a') !== -1) {
          setInHour = setFourDigit[0] + setFourDigit[1];
          setInMinute = setFourDigit[2] !== undefined ? setFourDigit[2] : '';
          if (setInHour > 24) {
            setInHour = setFourDigit[0];
            setInMinute = setFourDigit[1] + setFourDigit[2];

          }
        }
        /*  setInHour = setFourDigit[0];
         setInMinute = setFourDigit[1] !== undefined && setFourDigit[2] == undefined ? setFourDigit[1] : setFourDigit[2] !== undefined ? setFourDigit[1] + setFourDigit[2] : setFourDigit[1];
         setInMinute = setInMinute.toLowerCase();
         setInMinute = setInMinute.replace(/[pmpama]/g, ''); */
        // 11p

        // 0318 p
        // check if 2nd digit is also number
        if (setFourDigit[2] !== undefined && setFourDigit[2].indexOf('p') == -1 && setFourDigit[2].indexOf('P') == -1 && setFourDigit[2].indexOf('a') == -1 && setFourDigit[2].indexOf('A') == -1 && typeof (Number(setFourDigit[2])) == 'number') {

          setInHour = setFourDigit[0];
          setInMinute = setFourDigit[1] + setFourDigit[2];
        }
        // check if 3rd digit is also number
        if (setFourDigit[3] !== undefined && setFourDigit[3].indexOf('p') == -1 && setFourDigit[3].indexOf('P') == -1 && setFourDigit[3].indexOf('a') == -1 && setFourDigit[3].indexOf('A') == -1 && typeof (Number(setFourDigit[3])) == 'number') {

          setInHour = setFourDigit[0] + setFourDigit[1];
          setInMinute = setFourDigit[2] + setFourDigit[3];
        }
        setInHour = setInHour.toLowerCase();
        setInHour = setInHour.replace(/[pmpama]/g, '');
        if (setInHour < 12 && timeVal.indexOf('p') !== -1) {
          setInHour = 12 + Number(setInHour);

        } else if (setInHour.length == 1) {
          setInHour = '0' + setInHour;
        } else if (setInHour.length == 2) {
          setInHour = setInHour;
        }

        setInMinute = setInMinute.toLowerCase();
        if (setInMinute.indexOf('p') !== -1 || setInMinute.indexOf('pm') !== -1 || setInMinute.indexOf('a') !== -1 || setInMinute.indexOf('am') !== -1 || setInMinute.length == 0) {
          setInMinute = setInMinute.replace(/[pmpama]/g, '');
          setInMinute = '00';

        }
        // modify 2 dec 2021 for setting 041 -> 04:10
        this.customTime = (setInHour.toString().length == 1 ? '0' + setInHour : setInHour) + ':' + (setInMinute.toString().length == 1 ? setInMinute + '0' : setInMinute);
        //  alert('custom time' + this.customTime);
        formatValid = true;
      }
      // CASE 2  NO COLON NO PM OPTION 1710 720 2320  >=3
      else if (setFourDigit.length >= 1 && timeVal.indexOf(':') == -1 && (timeVal.indexOf('p') == -1 && timeVal.indexOf('pm') == -1 && timeVal.indexOf('pm') == -1)) { // 6:15

        //2320 23 500

        if (setFourDigit.length == 3) {
          if (Number(setFourDigit[0]) == 0) {
            setInHour = setFourDigit[0] + setFourDigit[1]; // 3dec modify to handle 041 to 04:10
            setInMinute = setFourDigit[2]; // 3dec modify to handle 215 to 02:15
          } else {
            setInHour = setFourDigit[0];
            setInMinute = setFourDigit[1] + setFourDigit[2];
          }
          // 175
          /*  if (setInMinute > 59) {
            setInHour = setFourDigit[0] + setFourDigit[1];
            setInMinute = setFourDigit[2];
          }*/
          if (Number(setInHour) > 24) {
            setInHour = setFourDigit[0];
            setInMinute = setFourDigit[1] + setFourDigit[2];
          }
          if (setInHour.length == 1) {
            setInHour = '0' + setInHour;
          }
          this.customTime = setInHour + ':' + setInMinute;
        } else if (setFourDigit.length == 4) {
          setInHour = setFourDigit[0] + setFourDigit[1];
          setInMinute = setFourDigit[2] + setFourDigit[3];

        } else if (setFourDigit.length == 2) {
          setInHour = setFourDigit[0] + setFourDigit[1];
          setInMinute = '00';

        } else if (setFourDigit.length == 1) {
          // 0 -> 00:00 new case
          setInHour = '0' + setFourDigit[0];
          setInMinute = '00';

        }

        this.customTime = (setInHour.toString().length == 1 ? '0' + setInHour : setInHour) + ':' + (setInMinute.toString().length == 1 ? setInMinute + '0' : setInMinute);
        // alert('custom time' + this.customTime);
        formatValid = true;
      }
      // CASE 3 COLON OPTION 6:15 6:15P 12:15
      else if (timeVal.indexOf(':') !== -1) { // 6:15
        //HANDLE FOR COLON AND NO PM
        //6:15 or 6:15p 15:5 1:5 23:20p

        if (setFourDigit.length >= 2) {
          setInHour = timeVal.split(':')[0];
          setInMinute = timeVal.split(':')[1];
          if (setInHour.length == 1) {
            setInHour = '0' + setInHour;
          }
          if (setInMinute.length == 1) {
            setInMinute = '0' + setInMinute; // 3 dec modify
          }
          if (timeVal.indexOf('p') !== -1 || timeVal.indexOf('pm') !== -1) {

            setInMinute = setInMinute.replace(/[pmp.]/g, '');
            setInMinute = setInMinute.trim();
            if (setInHour < 12) {
              setInHour = 12 + Number(setInHour);
            }
          }
          if (timeVal.indexOf('a') !== -1 || timeVal.indexOf('am') !== -1) {

            setInMinute = setInMinute.replace(/[ama.]/g, '');
            setInMinute = setInMinute.trim();

          }
          this.customTime = setInHour + ':' + setInMinute;
        }
        // modify 3 dec 2021
        this.customTime = (setInHour.toString().length == 1 ? '0' + setInHour : setInHour) + ':' + (setInMinute.toString().length == 1 ? '0' + setInMinute : setInMinute);

        formatValid = true;
      }
      // CHECK FOR 25, 26 ..
      //  alert('hour'+ setInHour);

      setCustomHour = this.customTime.split(':')[0];
      setCustomMinute = this.customTime.split(':')[1];

      // 24 HOUR VALIDATION
      if (Number(setCustomHour) > Number(max.split(':')[0]) || (Number(setCustomMinute) > Number(max.split(':')[1]) && Number(setCustomHour) == Number(max.split(':')[0]))) {
        //  toast(`Time must be before ${max}`, Number(sessionStorage.getItem('toastTimeOut')));
        validationMessage = `Time must be before ${max}`;
        formatValid = false;

      }
      if (Number(setCustomHour) < Number(min.split(':')[0]) || Number(setCustomMinute) < Number(min.split(':')[1])) {
        // toast(`Time must be after ${min}`, Number(sessionStorage.getItem('toastTimeOut')));
        validationMessage = `Time must be after ${min}`;
        formatValid = false;

      }
      const reg = new RegExp('^[0-9]*(:)?[0-9]*$');
      // 7s
      if (Number(setCustomMinute) > 59 || Number(setCustomHour) > 23 || !reg.test(this.customTime)) {

        // toast('Invalid Time', Number(sessionStorage.getItem('toastTimeOut')));
        formatValid = false;
        validationMessage = 'Invalid Time';


      }
    }

    if (format == 12) {

      if (setFourDigit.length > 8 && !fromIcon) { // 9 DEC 2021
        //  toast('Invalid Time', Number(sessionStorage.getItem('toastTimeOut')));
        validationMessage = 'Invalid Time';
        formatValid = false;
        this.customTime = '';

      }
      // number only no am pm no colon
      else if (timeVal.indexOf(':') == -1 && (timeVal.indexOf('p') == -1 && timeVal.indexOf('pm') == -1 && timeVal.indexOf('pm') == -1 && timeVal.indexOf('a') == -1 && timeVal.indexOf('am') == -1 && timeVal.indexOf('am') == -1)) { // 6:15


        if (setFourDigit.length == 2) {
          setInHour = setFourDigit[0] + setFourDigit[1];
          if (setInMinute == undefined) {
            setInMinute = '00';
          }
        }
        if (setFourDigit.length == 1) { // 5 to 5:00 pm 11 to 11:00 am
          setInHour = setFourDigit[0];

          if (setInMinute == undefined) {
            setInMinute = '00';
          }
        }
        if (setFourDigit.length == 4) { // 1115  1718
          setInHour = setFourDigit[0] + setFourDigit[1];
          setInMinute = setFourDigit[2] + setFourDigit[3];

        }
        if (setFourDigit.length == 3) { // 615 135 175  041
          setInHour = Number(setFourDigit[0]);
          setInMinute = setFourDigit[1] + setFourDigit[2];
          if (Number(setInHour) == 0) { // 2 dec
            setInHour = setFourDigit[0] + setFourDigit[1];
            setInHour = Number(setInHour);
            setInMinute = setFourDigit[2];
          }


        }


        // comment just
        if (setInHour !== undefined && amArray.includes(Number(setInHour))) {


          this.customTime = (setInHour.toString().length == 1 ? setInHour : setInHour) + ':' + (setInMinute.toString().length == 1 ? setInMinute + '0' : setInMinute) + ' ' + 'am'; // + 'am'
        } else if (setInHour !== undefined && pmArray.includes(Number(setInHour))) {

          this.customTime = (setInHour.toString().length == 1 ? '0' + setInHour : setInHour) + ':' + (setInMinute.toString().length == 1 ? setInMinute + '0' : setInMinute) + ' ' + 'pm'; //  + 'pm'
        }
        /** WHEN HOUR > 12 */
        if (Number(setInHour) > 12 && (Number(setInHour) <= 23)) {
          setInHour = Number(setInHour) - 12;
          formatValid = true;
          this.customTime = (setInHour.toString().length == 1 ? '0' + setInHour : setInHour) + ':' + (setInMinute.toString().length == 1 ? setInMinute + '0' : setInMinute) + ' ' + 'pm';
        }
        else if (Number(setInHour) > 24) {
          formatValid = false;
          this.customTime = (setInHour.toString().length == 1 ? '0' + setInHour : setInHour) + ':' + (setInMinute.toString().length == 1 ? setInMinute + '0' : setInMinute);
        }
        else if (Number(setInHour) == 24) {
          setInHour = Number(setInHour) - 12;
          formatValid = true;
          this.customTime = (setInHour.toString().length == 1 ? '0' + setInHour : setInHour) + ':' + (setInMinute.toString().length == 1 ? setInMinute + '0' : setInMinute) + ' ' + 'am';
        }
        // HANDLE FOR 12
        if (setInHour !== undefined && Number(setInHour) == 12) {
          this.customTime = setInHour + ':' + setInMinute + ' ' + 'pm';
        }
        /*
        3 dec modify
        if (setInHour !== undefined && Number(setInHour) == 12 && Number(setInMinute) == 0) {
          this.customTime = setInHour + ':' + setInMinute + ' ' + 'am';
        } */


        formatValid = true;

        if (this.customTime !== undefined) {

          setCustomHour = this.customTime.split(':')[0];
          setCustomMinute = this.customTime.split(':')[1];
        }

      }
      // CASE 2 NO COLON AM PM  OPTIONS
      else if (setFourDigit.length >= 1 && timeVal.indexOf(':') == -1 && (timeVal.indexOf('p') !== -1 || timeVal.indexOf('pm') !== -1 || timeVal.indexOf('pm') !== -1 || timeVal.indexOf('a') !== -1 || timeVal.indexOf('am') !== -1 || timeVal.indexOf('am') !== -1)) { // 6:15


        if (setFourDigit.length == 2) { // 9a 8a 8p 9p
          setInHour = setFourDigit[0];
          // set am pm 9a -> 09:00 am

          setInMinute = '00';
          if (timeVal.indexOf('a') !== -1) {
            this.customTime = '0' + setInHour + ':' + setInMinute + ' ' + 'am';
          } else if (timeVal.indexOf('p') !== -1) {
            this.customTime = '0' + setInHour + ':' + setInMinute + ' ' + 'pm';
          }


        } else if (setFourDigit.length == 3) { // 95a 11a 13a  15a

          setInHour = setFourDigit[0];
          // set am pm / one added 17p
          //3pm
          if (timeVal.indexOf('a') !== -1 || timeVal.indexOf('p') !== -1) {

            setInHour = setFourDigit[0] + setFourDigit[1];
            setInHour = setInHour.toLowerCase().replace(/[pmpama]/g, '');
            if (Number(setInHour) <= 12) {
              setInHour = setFourDigit[0] + setFourDigit[1];
              setInHour = setInHour.toLowerCase().replace(/[pmpama]/g, '');
              setInMinute = '00';
            } else if (Number(setInHour) > 12) {
              setInHour = setFourDigit[0];
              setInMinute = '0' + setFourDigit[1];
            }
          }



          if (timeVal.indexOf('a') !== -1) { // changed 2 dec 2021 to set 041a to 04:10 am
            this.customTime = (setInHour.length == 1 ? '0' + setInHour : setInHour) + ':' + setInMinute + ' ' + 'am';
          } else if (timeVal.indexOf('p') !== -1) {
            this.customTime = (setInHour.length == 1 ? '0' + setInHour : setInHour) + ':' + setInMinute + ' ' + 'pm';
          }

        } else if (setFourDigit.length >= 4) { // 915a 115a 820am 13am
          // 12pm 0102pm
          setInHour = setFourDigit[0];
          // set am pm   09:15 am 01:15a
          if (timeVal.indexOf('a') !== -1 || timeVal.indexOf('p') !== -1) {

            if (Number(setFourDigit[0] + setFourDigit[1]) > 12) {
              setInHour = setFourDigit[0];
              setInMinute = setFourDigit[1] + setFourDigit[2];
            } else {
              setInHour = setFourDigit[0] + setFourDigit[1];
              setInMinute = setFourDigit[2] + setFourDigit[3];
            }
            setInMinute = setInMinute.toLowerCase().replace(/[pmpama]/g, '');
          }
          // 2 dec modify to handle 041a should be 04:10 am
          if (timeVal.indexOf('a') !== -1) {
            this.customTime = (setInHour.length == 1 ? '0' + setInHour : setInHour) + ':' + (setInMinute.length == 1 ? setInMinute + '0' : setInMinute.length == 0 ? '00' : setInMinute) + ' ' + 'am';
          } else if (timeVal.indexOf('p') !== -1) {
            this.customTime = (setInHour.length == 1 ? '0' + setInHour : setInHour) + ':' + (setInMinute.length == 1 ? setInMinute + '0' : setInMinute.length == 0 ? '00' : setInMinute) + ' ' + 'pm';
          }

        }

        formatValid = true;

        if (this.customTime !== undefined) {

          setCustomHour = this.customTime.split(':')[0];
          setCustomMinute = this.customTime.split(':')[1];
        }

      }

      // CASE 3  COLON
      else if (setFourDigit.length >= 1 && timeVal.indexOf(':') !== -1) {

        // 1:5 -> 01:05 pm, 11:15 -> 11:15 am, 12:5 -> 12:05 pm 13:10
        // QA  7:1 p


        setInHour = timeVal.split(':')[0];
        setInMinute = timeVal.split(':')[1];
        // unset am pm in minute
        if (timeVal.indexOf('a') !== -1 || (timeVal.indexOf('p') !== -1)) {
          setInMinute = setInMinute.replace(/[pmpama]/g, '');
          setInMinute = setInMinute.trim();
        }

        if (timeVal.indexOf('a') !== -1) {

          this.customTime = (setInHour.length == 1 ? '0' + setInHour : setInHour) + ':' + (setInMinute.length == 1 ? '0' + setInMinute : setInMinute) + ' ' + 'am';
        } else if (timeVal.indexOf('p') !== -1) {
          this.customTime = (setInHour.length == 1 ? '0' + setInHour : setInHour) + ':' + (setInMinute.length == 1 ? '0' + setInMinute : setInMinute) + ' ' + 'pm';
        } else {
          // setHour
          if (amArray.includes(Number(setInHour))) {
            this.customTime = (setInHour.length == 1 ? '0' + setInHour : setInHour) + ':' + (setInMinute.length == 1 ? '0' + setInMinute : setInMinute) + ' ' + 'am';
          } else if (pmArray.includes(Number(setInHour))) {
            this.customTime = (setInHour.length == 1 ? '0' + setInHour : setInHour) + ':' + (setInMinute.length == 1 ? '0' + setInMinute : setInMinute) + ' ' + 'pm';
          }
          /** WHEN HOUR > 12 */
          if (Number(setInHour) > 12 && (Number(setInHour) <= 23)) {
            setInHour = Number(setInHour) - 12;
            formatValid = true;
            this.customTime = (setInHour.toString().length == 1 ? '0' + setInHour : setInHour) + ':' + (setInMinute.toString().length == 1 ? '0' + setInMinute : setInMinute) + ' ' + 'pm';

          }
          else if (Number(setInHour) > 24) {
            formatValid = false;
            this.customTime = (setInHour.toString().length == 1 ? '0' + setInHour : setInHour) + ':' + (setInMinute.toString().length == 1 ? '0' + setInMinute : setInMinute);
          }
          else if (Number(setInHour) == 24) {
            setInHour = Number(setInHour) - 12;
            formatValid = true;
            this.customTime = (setInHour.toString().length == 1 ? '0' + setInHour : setInHour) + ':' + (setInMinute.toString().length == 1 ? '0' + setInMinute : setInMinute) + ' ' + 'am';
          }
          // HANDLE FOR 12
          if (Number(setInHour) == 12) {
            this.customTime = (setInHour.length == 1 ? '0' + setInHour : setInHour) + ':' + (setInMinute.length == 1 ? '0' + setInMinute : setInMinute) + ' ' + 'pm';
          }
          // modify 3 dec
          // if (Number(setInHour) == 12 && Number(setInMinute) == 0) {
          // this.customTime = (setInHour.length == 1 ? '0' + setInHour : setInHour) + ':' + (setInMinute.length == 1 ? '0' + setInMinute : setInMinute) + ' ' + 'am';
          //  }
        }

        formatValid = true;

        // MIN MAX
        if (this.customTime !== undefined) {

          setCustomHour = Number(this.customTime.split(':')[0]);
          setCustomMinute = this.customTime.split(':')[1];
        }
        // Number(setCustomHour) > Number(max.split(':')[0]) use index

      }
      const reg = new RegExp('^[0-9]*(:)?[0-9 ]*(am|pm)$');

      if (!reg.test(this.customTime) || Number(setCustomMinute) > 59) {
        // only am or pm
        // toast('Invalid Time', Number(sessionStorage.getItem('toastTimeOut')));
        formatValid = false;
        validationMessage = 'Invalid Time';
        // this.customTime = '';

      }
      // 1 DEC check for max
      else if (this.customTime.indexOf('p') !== -1 && pmArray.indexOf(Number(setCustomHour)) > pmArray.indexOf(Number(max.split(':')[0])) || (this.customTime.indexOf('p') !== -1 && Number(setCustomMinute.slice(0, 2)) > Number(max.split(':')[1].slice(0, 2))) && Number(setCustomHour) == Number(max.split(':')[0])) {
        // AND

        formatValid = false;
        // toast(`Time must be ${max} or earlier`, Number(sessionStorage.getItem('toastTimeOut')));
        validationMessage = `Time must be ${max} or earlier`;
      }
      // MIN
      else if (this.customTime !== undefined && this.customTime.indexOf('a') !== -1 && amArray.indexOf(Number(setCustomHour)) < amArray.indexOf(Number(min.split(':')[0])) || (Number(setCustomMinute.slice(0, 2)) < Number(min.split(':')[1].slice(0, 2)) && Number(setCustomHour) == Number(min.split(':')[0]))) {

        // CHECK FOR MIN "min": "08:00 am"

        formatValid = false;
        // toast(`Time must be ${min} or later`, Number(sessionStorage.getItem('toastTimeOut')));
        validationMessage = `Time must be ${min} or later`;

      }

    }


    return { formatValid: formatValid, value: this.customTime, validationMessage: validationMessage };



  }


  enableFormBtn() {
    return [{ 'buttonType': 'submit', 'isEnabled': true },
    { 'buttonType': 'button', 'isEnabled': true }];
  }


  getValue(url, param) {

    let arrValue;
    let checkShowBusy;

    if (url !== undefined && url.includes('?')) {
      const urlParam = url.split('?');
      if (urlParam[1].includes('&')) {
        arrValue = urlParam[1].split('&');

        if (arrValue.length > 0) {
          for (let i = 0; i < arrValue.length; i++) {
            if (arrValue[i].includes(param)) {
              checkShowBusy = arrValue[i];
              const check = checkShowBusy.split('=');

              return check[1];
            }
          }
        }
      } else {
        const checkParam = urlParam[1].split('=');
        if (checkParam !== undefined && checkParam[0] == param) {
          return checkParam[1];
        }
      }
    } else {
      return false;
    }
  }
  getValueShowBusyText(url, param) {
    let arrValue;
    let checkShowBusy;

    if (url !== undefined && url.includes('?')) {
      const urlParam = url.split('?');
      if (urlParam[1].includes('&')) {
        arrValue = urlParam[1].split('&');

        if (arrValue.length > 0) {
          for (let i = 0; i < arrValue.length; i++) {
            if (arrValue[i].includes(param)) {
              checkShowBusy = arrValue[i];
              const check = checkShowBusy.split('=');

              return check[1];
            }
          }
        }
      } else {
        const checkParam = urlParam[1].split('=');
        if (checkParam !== undefined && checkParam[0] == param) {
          return checkParam[1];
        }
      }
    } else {
      return false;
    }
  }
  getShowForm(dtForm) {

    const fields = dtForm.fields;
    for (let i = 0; i < fields.length; i++) {
      if (fields[i].options !== undefined) {
        for (let j = 0; j < fields[i].options.length; j++) {
          if (fields[i].options[j].value == fields[i].value) {
            return (fields[i].options[j].show !== undefined ? fields[i].options[j].show : '');
          }

        }
      }

    }

  }
  getShowMultipart(fields) {
    if (fields.options !== undefined) {
      for (let j = 0; j < fields.options.length; j++) {
        if (fields.options[j].value == fields.value) {
          return (fields.options[j].show !== undefined ? fields.options[j].show : '');
        }

      }

    }



  }

  dateValidate(date, min?, max?) {
    //alert('date validation');

    const dateValue = date.value.split('-')[2];
    const monthValue = date.value.split('-')[1];
    const dateMonth = {
      '01': 'jan', '02': 'feb', '03': 'march',
      '04': 'april', '05': 'may', '06': 'june',
      '07': 'july', '08': 'aug', '09': 'sept',
      '10': 'oct', '11': 'nov', '12': 'dec'
    };
    // BLANK VALUE
    if (date.value == '') {
      return false;
    } else if (date.min !== undefined && date.value < date.min) {
      // ADDED 24 DEC 2021 TO CHECK MIN & MAX
      return false;
    } else if (date.min !== undefined && date.value > date.max) {
      // ADDED 24 DEC 2021 TO CHECK MIN & MAX
      return false;
    } else {
      // dateMonth[monthValue] gives name month
      // SET DATE IN FEBRUARY MONTH ACCORDING TO LEAP YEAR
      const isLeap = new Date(date.value.split('-')[0], 1, 29).getDate() === 29;
      const datesInFeb = isLeap ? '29' : '28';
      let monthDate = {
        jan: '31', feb: datesInFeb, march: '31', april: '30',
        may: '31', june: '30', july: '31', aug: '31', sept: '30', oct: '31', nov: '30', dec: '31'
      };
      if (dateValue <= monthDate[dateMonth[monthValue]]) {
        return true;
      } else {
        return false;
      }
    }
  }

  parseValue(type, value, numberPipe?, isDecimal?) {
    if (type == 'number' && value == '')
      return 0;
    const retValue = (type == 'number' && JSON.stringify(value).includes('.')) ? parseFloat(value) : (type == 'number' && !JSON.stringify(value).includes('.')) ? JSON.parse(value) : value;
    return retValue;
  }

  /* parseValue(type,value,numberPipe?,isDecimal?) {

      const retValue = (type == 'number')  ?  value.toString().includes('.0') ?  (this. convertToDecimalAppendRow(numberPipe,value,isDecimal)) : JSON.parse(value) : value;
      return retValue;
      } */

  convertToDecimalAppendRow(numberPipe: any, value: any, isDecimal: boolean) {

    if (numberPipe !== undefined) {
      const npipeStart = Number((numberPipe.split('.')[1]).split('-')[0]);
      const npipeEnd = Number((numberPipe.split('.')[1]).split('-')[1]);
      if (isDecimal) {
        // tslint:disable-next-line:curly
        if (npipeStart == npipeEnd) {
          value = parseFloat(value).toFixed(npipeEnd);
        }
        if (npipeStart == 0 && value.toString().includes('.')) {
          value = value.split('.')[0] + '.' + value.split('.')[1].substr(0, npipeEnd);
        }
        // numberSplit = value;
        if (value.split('.')[0].includes(0)) {
          value = this.removeZeroBeforeDecimal(value, numberPipe);
        } // comment 21 july 2021
      }
    }

    return value;
  }

  converToFloatNumber(value) {
    let newVal: any;
    if (value == .00) {
      let tmp = parseFloat(value.toString()).toFixed(2);
      newVal = parseFloat(tmp).toFixed(2);
      //0.00
    } else {
      newVal = JSON.parse(value);
    }
    return newVal;
  }

  setHexkey(hexkey) {
    /** WHEN USER DON'T PERFORM ANY OPERATION ON DISPLAYGRID */

    this.hexKeyGrid = hexkey;
    sessionStorage.setItem('hexkeygrid', JSON.stringify(hexkey));

  }
  getGridHexKey(sendData) {
    if (sendData) {
      const data = JSON.parse(sessionStorage.getItem('hexkeygrid'));
      return data;
    }
  }
  removeZeroBeforeDecimal(numberSplit, numberPipe?) {

    // alert('dynamo service');
    let value: any;
    let a = numberSplit.toString();
    if (numberPipe !== undefined && numberPipe.split('.')[0] == '' && a.includes('.') && numberSplit.split('.')[0] == 0) {
      value = '.' + numberSplit.split('.')[1];
      return value;
    }

    else {
      return numberSplit;
    }

  }

  validateIPaddress(ipaddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
      return (true);
    }

    return (false);
  }
  validateURL(value) {
    let pattern = new RegExp(/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i);
    return pattern.test(value);
  }


  validateEmail(value) {
    let pattern = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    return pattern.test(value);
  }

  validatePhoneNumber(value) {


    let pattern = new RegExp(/^[0-9]{10}$/);
    return pattern.test(value);
  }

  validateMacAddress(value) {
    let pattern = new RegExp(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}\\.[0-9a-fA-F]{4}\\.[0-9a-fA-F]{4})$/);

    return (pattern.test(value));
  }
  validatehexaDecimal(value) {

    let pattern = /[0-9A-Fa-f]{6}/g;
    if (pattern.test(value)) {
      return true;
    } else {
      return false;
    }

  }



}
