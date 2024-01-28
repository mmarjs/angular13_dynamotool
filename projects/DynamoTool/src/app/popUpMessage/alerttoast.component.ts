import { Component, Input, Output, EventEmitter } from '@angular/core';
import { toast } from 'angular2-materialize';
import { environment } from 'projects/DynamoTool/src/environments/environment';
declare var Swal: any;

@Component({
    selector: 'app-message',
    template: ''
})
export class AlertToastComponent {
    private baseUrl: string;
    private soundFilePath: string;
    constructor() {
        this.baseUrl = window.location.origin;
        if (window.location.href.includes('/DY/guitest')) {
            this.soundFilePath = '/DY/guitest';
        } else if (window.location.href.includes('/DY/gui')) {
            this.soundFilePath = '/DY/gui';
        } else if (window.location.href.includes('/CD/guitest')) {
            this.soundFilePath = '/CD/guitest';
        } else if (window.location.href.includes('/CD/gui')) {
            this.soundFilePath = '/CD/gui';
        }
    }
    audio: any;
    @Output() sendmessage: EventEmitter<string> = new EventEmitter();
    @Input()
    set messageResponse(response: any) {
       if (response === undefined || response === null) {
            return;
        } else {
            if ((response.alert !== null && response.msg === undefined) || response.URL !== undefined) {
             if (response.title !== undefined && response.URL == undefined) {
               if (response.soundNotification) {
                  this.playAudio();
                        setTimeout(() => {
                            this.stopAudio();
                        }, response.soundTime);
                    }
                    Swal.fire({
                        title: response.title,
                        html: response.alert
                    });

                    ////// 19Feb /////
                    this.setCustomStyle(response.icon, response.iconColor, response.title, response.align);
                } else if (response.URL == undefined) { alert(response.alert); }
                // TO HANDLE SERVICE NOT AVAILABLE
                if (response.title !== '' && response.URL !== undefined && response.statusCode == undefined) {
                   Swal.fire({
                        title: response.title + '<br/><br/>' + environment.unknownError,
                        html: `Please try again later <br><br>URL = ${response.URL}`

                    });
               this.setCustomStyle(response.icon, response.iconColor);
                } else if (response.title == '' && response.URL !== undefined && response.statusCode == undefined) {
                    Swal.fire({
                        title: environment.unknownError,
                        html: `Please try again later <br><br>URL = ${response.URL}`
                    });
                  this.setCustomStyle(response.icon, response.iconColor);
                }  else if (response.URL !== undefined && response.statusCode == 503) {
                    Swal.fire({
                        title: response.title,
                        html: `${response.message} <br><br> URL = ${response.URL}`
                      });
                   this.setCustomStyle(response.icon, response.iconColor);
                }
            } else if (response.msg !== null && response.alert === undefined) {
                for (let i = 0; i < response.msg.length; i++) {
                    toast(response.msg[i], Number(sessionStorage.getItem('toastTimeOut'))); // 500
                }
            } else if (response.msg !== null && response.msg !== undefined && response.alert !== null) {
                for (let i = 0; i < response.msg.length; i++) {
                    toast(response.msg[i], Number(sessionStorage.getItem('toastTimeOut')));
                }
                alert(response.alert);
            }
            this.sendmessage.emit('success');
        }
    }
    setCustomStyle(icon: string, iconColor: string, title?: string , align?: string) {
        let swal: any; let newDiv: any; let newIcon: any; let setWidth: any; let setmargin: any;
        icon = icon !== undefined ? icon : 'fa-exclamation';
        iconColor = iconColor !== undefined ? iconColor : 'red';
        swal = document.getElementsByClassName('swal2-html-container');
        newDiv = document.createElement('div');
        if (icon !== '') {
            newDiv.classList.add('icon', iconColor, 'setIconSize', 'setIconSizes');
            newIcon = document.createElement('i');
            newIcon.classList.add('fa', icon, 'faColorAlert');
            swal[0].appendChild(newDiv);
            newDiv.appendChild(newIcon);
        }

         // document.getElementsByClassName('swal2-popup').style.min-width = '590px';
      if (title !== undefined && title.length > 0) {
        if (icon == '' || icon == undefined || icon == null) {
          setWidth = '100%';
          setmargin = '5px';
        } else {
            setWidth = '100%';
            setmargin = '15px';
        }
      if (title.length < 40) {
       setWidth = '315px';
        } else if (title.length > 40 && title.length < 60) {
        setWidth = '590px';
        } else {
        setWidth = '100%';
        // 89 characters
      }
   document.querySelector<HTMLElement>('.swal2-popup').style.minWidth = setWidth;

   /////// Addd 19 Feb///////////
   document.querySelector<HTMLElement>('.swal2-title').style.textAlign = align;
   document.querySelector<HTMLElement>('.swal2-html-container').style.textAlign = align;
   document.querySelector<HTMLElement>('.swal2-html-container').style.marginLeft = setmargin;
   document.querySelector<HTMLElement>('.swal2-confirm').className = 'DTB-green DTButton DTButton-green btn center';
   document.querySelector<HTMLElement>('.swal2-deny').className = 'DTB-red DTButton DTButton-green btn center';
   document.querySelector<HTMLElement>('.swal2-cancel').className = 'DTB-gray DTButton DTButton-green btn center';
 

    }
    }

    // tslint:disable-next-line: use-lifecycle-interface
    ngOnInit() {
        this.audio = new Audio();
        const timeOut = sessionStorage.getItem('toastTimeOut');
        if (timeOut == undefined || timeOut == '') {
            sessionStorage.setItem('toastTimeOut', '4000');
        }
    }

    playAudio() {
        if (window.location.href.includes('localhost')) {
           this.audio.src = '../../assets/audio/tone.wav';
        } else {
            this.audio.src = this.baseUrl + this.soundFilePath + '/assets/audio/tone.wav';
        }

        this.audio.load();
        const playPromise = this.audio.play();
        this.handleAudioError(playPromise);
    }

    stopAudio() {
        this.audio.src = '';
        this.audio.load();
        const playPromise = this.audio.play();
        this.handleAudioError(playPromise);
    }

    handleAudioError(playPromise: any) {
        if (playPromise !== undefined) {
            playPromise.then(function () {
                // Automatic playback started!
            }).catch(function (error) {
                // Automatic playback failed.
                // Show a UI element to let the user manually start playback.
            });
        }
    }
}
