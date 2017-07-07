import { Injectable } from '@angular/core';
import {AppService} from "../app.service";
import {Observable} from "rxjs";

@Injectable()
export class NodeService {

  constructor(private appService: AppService) {}

    /**
     * Get All nodes for a specific content type.
     * @param content_type
     * @returns {Observable<R|T>}
     */
    getAllNodes(content_type: string):Observable<any>{
       return this.appService.get('jsonapi/node/'+ content_type).map(res => res.json()).catch(err => Observable.throw(err));
    }

    /**
     * Get a individual node by it's type and ID.
     * @param content_type
     * @param id
     * @returns {Observable<R|T>}
     */
    getNode(content_type: string, id):Observable<any>{
        return this.appService.get('jsonapi/node/'+ content_type + '/' + id).map(res => res.json()).catch(err => Observable.throw(err));
    }
}
