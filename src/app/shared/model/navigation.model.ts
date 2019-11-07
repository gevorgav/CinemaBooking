import {Navigator} from './navigator.interface';
import {Observable} from 'rxjs';

export class NavigationModel {
  public item: Navigator;
  public children: Observable<NavigationModel[]>;

  constructor(item: Navigator, children: Observable<NavigationModel[]>) {
    this.item = item;
    this.children = children;
  }
}

