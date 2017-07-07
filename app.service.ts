import { Injectable } from '@angular/core';
import {Http, RequestOptionsArgs, Response, Headers, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class AppService {

  private serverUrl: string = 'http://www.drupal-api.com/'
  private token: string = localStorage.getItem('currentToken');
  private headers: Headers = new Headers(
      {
        'Accept': 'application/json',
        'Content-Type': 'application/hal+json',
        'Authorization': 'Bearer ' + JSON.parse(this.token)
      });

  constructor(private http: Http) {
    // Initialize the call for getting the token.
    let token_headers = new Headers();
    token_headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams;
    urlSearchParams.append('grant_type', 'password');
    urlSearchParams.append('client_id', 'd3513a81-0629-45f4-8958-7fdb163eca00');
    urlSearchParams.append('client_secret', 'mimran');
    urlSearchParams.append('username', 'admin');
    urlSearchParams.append('password', 'password');

    let body = urlSearchParams.toString();

    // Check whether the token is existed in the localstorage
    let savedToken = localStorage.getItem('currentToken');
    if(!savedToken){
      let token = this.http.post('http://www.drupal-api.com/oauth/token',body,{headers:token_headers}).subscribe(res => {
        var body = res.json();
        if(body.access_token){
          localStorage.setItem('currentToken', JSON.stringify(body.access_token));
        }
      }, err => {
        console.log(err);
      });
    }
  }


  /**
   * Setup New Token When Expired.
   */

  setNewToken(){
    // Initialize the call for getting the token.
    let token_headers = new Headers();
    token_headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams;
    urlSearchParams.append('grant_type', 'password');
    urlSearchParams.append('client_id', 'a75cd843-49ad-41ab-b119-eba1ef1d590c');
    urlSearchParams.append('client_secret', 'mimran');
    urlSearchParams.append('username', 'admin');
    urlSearchParams.append('password', 'password');

    let body = urlSearchParams.toString();

    // Setup New TOKEN in the localstorage
      let token = this.http.post('http://www.drupal-api.com/oauth/token',body,{headers:token_headers}).subscribe(res => {
        var body = res.json();
        if(body.access_token){
          localStorage.setItem('currentToken', JSON.stringify(body.access_token));
          location.reload();
        }
      }, err => {
        console.log(err);
      });

  }

  /**
   *
   * @param url
   * @returns {string}
   * Setup the url for making the REST API calls.
   */
  getUrl(url: string){
    return this.serverUrl + url;
  }

  getOptions(options : RequestOptionsArgs ): RequestOptionsArgs {
    let op = {headers: this.headers};
    let combined = Object.assign(op, options);
    return combined;
  }

  /**
   * Performs a request with `get` http method.
   * @param endpoint
   * @param options
   * @returns {Observable<Response>}
   */

  get(endpoint: string, options?: RequestOptionsArgs): Observable<Response>{
    let op = this.getOptions(options);
    let url = this.getUrl(endpoint);
    return this.http.get(url,op);
  }

  /**
   * Performs a request with `post` http method.
   * @param endpoint
   * @param body
   * @param options
   * @returns {Observable<Response>}
   */

  post(endpoint: string, body: any, options?: RequestOptionsArgs): Observable<Response>{
    let url = this.getUrl(endpoint);
    return this.http.post(endpoint, body, options);
  }

  /**
   * Performs a request with `put` http method.
   * @param endpoint
   * @param body
   * @param options
   * @returns {Observable<Response>}
   */

  put(endpoint: string, body: any, options?: RequestOptionsArgs): Observable<Response>{
    let url = this.getUrl(endpoint);
    return this.http.put(endpoint, body, options);
  }

  /**
   * Performs a request with `delete` http method.
   * @param endpoint
   * @param options
   * @returns {Observable<Response>}
   */

  delete(endpoint: string, options?: RequestOptionsArgs): Observable<Response>{
    let url = this.getUrl(endpoint);
    return this.http.delete(endpoint, options);
  }

}
