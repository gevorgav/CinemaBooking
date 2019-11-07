import {Component, OnInit} from '@angular/core';
import {DataService} from '../shared/service/data.service';
import {Observable, of} from 'rxjs';
import {CinemaModel} from '../shared/model/cinema.model';
import {HallModel} from '../shared/model/hall.model';
import {NavigationModel} from '../shared/model/navigation.model';
import {Navigator} from '../shared/model/navigator.interface';
import {flatMap, map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public navigation: NavigationModel;
  public cinemas: Observable<CinemaModel[]>;
  public halls: Observable<HallModel[]>;
  
  constructor(private dataService: DataService) {
  }
  
  ngOnInit() {
    this.initCinemas();
  }
  
  public getHalls(cinemaId: string, navigationModel: Observable<NavigationModel[]>) {
    navigationModel = (this.getNavigationModel(this.dataService.getHallsByCinemaId(cinemaId)));
  }
  
  private initCinemas() {
    this.navigation = new NavigationModel(null, this.getNavigationModel(this.dataService.getCinemas()));
  }
  
  private getNavigationModel(items: Observable<Navigator[]>): Observable<NavigationModel[]> {
    return items.pipe(flatMap(items1 => {
      let navigations = [];
      items1.forEach(value => {
        navigations.push(new NavigationModel((value as Navigator), of([])));
      });
      return navigations;
    }));
  }
}
