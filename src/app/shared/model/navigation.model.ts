import {Navigator} from './navigator.interface';
import {Observable} from 'rxjs';

export class NavigationModel {
  public item: Navigator;
  public children: Observable<NavigationModel[]>;
  public collapsed: boolean;

  constructor(item: Navigator, children: Observable<NavigationModel[]>, collapsed: boolean = false) {
    this.item = item;
    this.children = children;
    this.collapsed = collapsed;
  }
}

