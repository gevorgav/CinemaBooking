/**
 * @author Gevorg Avetisyan on 11/6/2019.
 */
import {CinemaModel} from './model/cinema.model';
import {HallModel} from './model/hall.model';
import {MovieModel} from './model/movie.model';
import {AvailableSessionsModel} from './model/available-sessions.model';

export class ConverterUtil {

  public static CINEMA = 'cinema';
  public static HALL = 'hall';
  public static MOVIE = 'movie';
  public static AVAILABLE_SESSIONS = 'availableSessions';
  public static NAME = 'name';
  public static SEATS_COUNT = 'seatsCount';
  public static ID = 'id';
  public static SEATS = 'seats';
  public static DATE = 'date';

  public static firebaseCinemaToCinemaModel(data: any): CinemaModel {
    return new CinemaModel(data.id, data.data()[ConverterUtil.NAME]);
  }

  public static firebaseHallToHallModel(data: any): HallModel {
    return new HallModel(data.id, data.data()[ConverterUtil.NAME],
      data.data()[ConverterUtil.SEATS_COUNT],
      data.data()[ConverterUtil.CINEMA][ConverterUtil.ID]);
  }

  public static firebaseSessionsToSessionsModel(data: any): AvailableSessionsModel {
    return new AvailableSessionsModel(
      data.id,
      new Map(Object.entries(data.data()[ConverterUtil.SEATS])),
      data.data()[ConverterUtil.HALL][ConverterUtil.ID],
      data.data()[ConverterUtil.MOVIE][ConverterUtil.ID],
      data.data()[ConverterUtil.CINEMA][ConverterUtil.ID],
      data.data()[ConverterUtil.DATE]);
  }

  public static firebaseMovieToMovieModel(data: any): MovieModel {
    return new MovieModel(data.id, data.data()[ConverterUtil.NAME]);
  }

  public static mapToObject(map: Map<string, boolean>) {
    const obj = {};
    for (const prop of map) {
      obj[prop[0]] = prop[1];
    }
    return obj;
  }
}
