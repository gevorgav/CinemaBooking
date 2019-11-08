/**
 * @author Gevorg Avetisyan on 11/7/2019.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {NavigationModel} from '../model/navigation.model';
import {map} from 'rxjs/operators';
import {DataService} from './data.service';
import {CinemaModel} from '../model/cinema.model';
import {HallModel} from '../model/hall.model';
import {MovieModel} from '../model/movie.model';
import {Subject} from 'rxjs/internal/Subject';
import {NavigationFields} from '../model/navigator.interface';

@Injectable()
export class NavigationService {
  private _navigate = new Subject<NavigationFields>();

  constructor(private dataService: DataService) {
  }
  public getNavigationForCinema(): Observable<NavigationModel[]> {
    return this.dataService.getCinemas().pipe(
      map((results: CinemaModel[]) => {
        const navigation: NavigationModel[] = [];
        results.forEach(value => {
          navigation.push(new NavigationModel(value, this.getNavigationForHall(value.id)));
        });
        return navigation;
      })
    );
  }


  get navigate(): Subject<NavigationFields> {
    return this._navigate;
  }

  public getNavigationForHall(cinemaId: string): Observable<NavigationModel[]> {
    return this.dataService.getHallsByCinemaId(cinemaId).pipe(
      map((results: HallModel[]) => {
        const navigation: NavigationModel[] = [];
        results.forEach(value => {
          navigation.push(new NavigationModel(value, this.getNavigationForMovie(cinemaId, value.id)));
        });
        return navigation;
      })
    );
  }

  public getNavigationForMovie(cinemaId: string, hallId: string): Observable<NavigationModel[]> {
    return this.dataService.getMoviesByCinemaHallIds(cinemaId, hallId).pipe(
      map((results: MovieModel[]) => {
        const navigation: NavigationModel[] = [];
        results.forEach(value => {
          navigation.push(new NavigationModel(value, null));
        });
        return navigation;
      })
    );
  }
}

