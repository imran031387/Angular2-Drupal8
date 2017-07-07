import { Injectable } from '@angular/core';
import {AppService} from "../app.service";
import {Observable} from "rxjs";

@Injectable()
export class MenuService {

  constructor(private appService: AppService) {}

  /**
   * Get the menu tree by name.
   * Dependency :: rest_menu_tree Modue.
   * @param menu_name
   * @returns {Observable<R|T>}
   */
  getMenu(menu_name):Observable<any>{
    return this.appService.get('entity/menu/'+ menu_name+ '/tree?_format=json').map(res => res.json()).catch(err => Observable.throw(err));
  }
}
