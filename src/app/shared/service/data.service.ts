/**
 * @author Gevorg Avetisyan on 11/6/2019.
 */
import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {CinemaModel} from '../model/cinema.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {ConverterUtil} from '../converter.util';
import {HallModel} from '../model/hall.model';
import {MovieModel} from '../model/movie.model';
import {AvailableSessionsModel} from '../model/available-sessions.model';
import {from} from 'rxjs/internal/observable/from';

@Injectable()
/**
 * DataService provides for handling data from Firebase.
 */
export class DataService {
  constructor(private db: AngularFirestore) {
  }

  public getCinemas(): Observable<CinemaModel[]> {
    return this.db.collection(ConverterUtil.CINEMA).get()
      .pipe(
        map(res => {
          const cinemas = [];
          res.docs.forEach(value => {
            cinemas.push(ConverterUtil.firebaseCinemaToCinemaModel(value));
          });
          return cinemas;
        })
      );
  }

  public getHallsByCinemaId(cinemaId: string): Observable<HallModel[]> {
    const hall = this.db.collection(ConverterUtil.HALL).get().toPromise()
      .then(res => {
        return res.query.where(ConverterUtil.CINEMA, '==', this.db.collection(ConverterUtil.CINEMA).doc(cinemaId).ref).get();
      })
      .then(resQuery => {
        const halls: HallModel[] = [];
        resQuery.forEach(result => {
          halls.push(ConverterUtil.firebaseHallToHallModel(result));
        });
        return halls;
      });
    return from(hall);
  }

  public getMoviesByCinemaHallIds(cinemaId: string, hallId: string): Observable<MovieModel[]> {
    const movies = this.getMoviesFromAvailableSessions(cinemaId, hallId)
      .then(moviesPromise => {
        return Promise.all(moviesPromise);
      }).then(results => {
        const moviesModel = [];
        results.forEach(res => {
          moviesModel.push(ConverterUtil.firebaseMovieToMovieModel(res));
        });
        return moviesModel;
      });
    return from(movies);
  }

  public getAvailableSessions(cinemaId: string, hallId: string, movieId: string): Observable<AvailableSessionsModel[]> {
    const sessions = this.db.collection(ConverterUtil.AVAILABLE_SESSIONS).get().toPromise()
      .then(res => {
        return res.query.where(ConverterUtil.CINEMA, '==', this.db.collection(ConverterUtil.CINEMA).doc(cinemaId).ref)
          .where(ConverterUtil.HALL, '==', this.db.collection(ConverterUtil.HALL).doc(hallId).ref)
          .where(ConverterUtil.MOVIE, '==', this.db.collection(ConverterUtil.MOVIE).doc(movieId).ref).get();
      }).then(resQuery => {
        const sessionList: AvailableSessionsModel[] = [];
        resQuery.forEach(result => {
          sessionList.push(ConverterUtil.firebaseSessionsToSessionsModel(result));
        });
        return sessionList;
      });
    return from(sessions);
  }

  public saveSeats(availableSession: AvailableSessionsModel): Observable<boolean> {
    const now = Date.now();
    const document = {
      seats: ConverterUtil.mapToObject(availableSession.seats),
      modified: now
    };
    return from(this.db.collection(ConverterUtil.AVAILABLE_SESSIONS).doc(availableSession.id).update(document)
      .then(res => true).catch(err => false));
  }

  private getMoviesFromAvailableSessions(cinemaId: string, hallId: string): Promise<any[]> {
    return this.db.collection(ConverterUtil.AVAILABLE_SESSIONS).get().toPromise()
      .then(res => {
        return res.query.where(ConverterUtil.CINEMA, '==', this.db.collection(ConverterUtil.CINEMA).doc(cinemaId).ref)
          .where(ConverterUtil.HALL, '==', this.db.collection(ConverterUtil.HALL).doc(hallId).ref).get();
      })
      .then(resQuery => {
        const movies: string[] = [];
        resQuery.forEach(result => {
          const movieId = result.data().movie.id;
          if (movies.indexOf(movieId) === -1) {
            movies.push(movieId);
          }
        });
        return movies;
      }).then(movies => {
        const promiseMovies = [];
        movies.forEach(itemMovie => {
          promiseMovies.push(this.db.collection(ConverterUtil.MOVIE).doc(itemMovie).get().toPromise());
        });
        return promiseMovies;
      });
  }

}

