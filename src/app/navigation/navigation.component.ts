import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {NavigationModel} from '../shared/model/navigation.model';
import {NavigationService} from '../shared/service/navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public navigation: Observable<NavigationModel[]>;

  constructor(private navigationService: NavigationService) {
  }

  ngOnInit() {
    this.initCinemas();
  }

  private initCinemas() {
    this.navigation = this.navigationService.buildNavigation();
  }

  changeCollapseValue(navigationModel: NavigationModel) {
    navigationModel.collapsed = !navigationModel.collapsed;
  }

  navigate(cinema: any, hall: any, movie: any) {
    this.navigationService.navigate.next({cinema, hall, movie});
  }
}
