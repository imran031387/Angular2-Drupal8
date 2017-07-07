import { Injectable } from '@angular/core';
import {AppService} from "../app.service";
import {Observable} from "rxjs";

@Injectable()
export class BlockService {

  constructor(private appService: AppService) { }

  /**
   * Get all blocks by it's name.
   * @param block_type
   * @returns {Observable<R|T>}
   */
  getAllBlocks(block_type):Observable<any>{
    return this.appService.get('jsonapi/block_content/'+ block_type).map(res => res.json()).catch(err => Observable.throw(err));
  }

  /**
   * Get Specific block by it's ID and type
   * @param block_type
   * @param id
   * @returns {Observable<R|T>}
   */

  getBlock(block_type,id):Observable<any>{
    return this.appService.get('jsonapi/block_content/'+ block_type + '/' + id).map(res => res.json()).catch(err => Observable.throw(err));
  }

}
