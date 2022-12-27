import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  serverUrl: string = 'https://localhost:5001/api/';
  constructor(private http: HttpClient) { }
  
  // sendRequest({ 
  //   body = { },
  //   query = '',
  //   url,
  //   method = 'POST'
  // }): Observable<any>{
  //   const URL: string = this.serverUrl + url + query;

  //   if (method == 'GET') {
  //     this.http.get<any>
  //   }
  // }
}
