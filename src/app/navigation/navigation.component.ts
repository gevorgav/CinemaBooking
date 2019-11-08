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
    this.navigation = this.navigationService.getNavigationForCinema();
  }

  getCinemaChildrenNavigation(cinemaNavigationModel: NavigationModel) {
    if (cinemaNavigationModel.children) {
      cinemaNavigationModel.children = null;
    } else {
      cinemaNavigationModel.children = this.navigationService.getNavigationForHall(cinemaNavigationModel.item.id);
    }
  }

  getHallChildrenNavigation(hallNavigationModel: NavigationModel, cinemaId: string) {
    if (hallNavigationModel.children) {
      hallNavigationModel.children = null;
    } else {
      hallNavigationModel.children = this.navigationService.getNavigationForMovie(cinemaId, hallNavigationModel.item.id);
    }
  }

  navigate(cinema: any, hall: any, movie: any) {
    this.navigationService.navigate.next({cinema, hall, movie});
  }
}
