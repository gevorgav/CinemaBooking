/**
 * @author Gevorg Avetisyan on 1/21/2020.
 */
import {DataService} from '../data.service';
import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs/internal/Observable';
import {AvailableSessionsModel} from '../../model/available-sessions.model';
import {of} from 'rxjs/internal/observable/of';

@Injectable()
export class MockDataService extends DataService {

  constructor(db: AngularFirestore) {
    super(db);
  }

  public getAvailableSessions(cinemaId: string, hallId: string, movieId: string): Observable<AvailableSessionsModel[]> {
    const sessions = [];
    const seats: Map<string, boolean> = new Map([['13', true], ['15', true], ['1', true]]);

    sessions.push(new AvailableSessionsModel('hQAzZsXIqthhCPseVdyr', seats, '5WUb4GnFySxbw2YEqyLX',
      'vsnGpeNUEO64HUZ2RPP4', '3iO3E9Q5F081tP8kJFYt', 1573288777645));
    return of(sessions);
  }
}
