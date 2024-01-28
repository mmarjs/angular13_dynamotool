import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable()
export class TestMenuService {
    private baseUrl;
    constructor(private _httpClient: HttpClient) {

    }
    getDetails(api: string,url: string,newtab: boolean): Observable<any> {
       
        
         const httpOptions = {
             headers: new HttpHeaders({
                 'accept': 'application/json'
             }),
             withCredentials: true,
         };
         if(url!==undefined || url!==null || url!=="") {

         if(newtab==true) {
            
         window.open(url, '_blank');
          
         
         }
         else if(newtab==false){
          window.location.href = url;
         }
        }
         else {
             return this._httpClient.get(this.baseUrl + url, httpOptions);
         }
     }
}