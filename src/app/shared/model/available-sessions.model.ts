export class AvailableSessionsModel {
  private _id: string;
  private _seats: Map<string, boolean>;
  private _hall: string;
  private _movie: string;
  private _cinema: string;

  constructor(id: string, seats: Map<string, boolean>, hall: string, movie: string, cinema: string) {
    this._id = id;
    this._seats = seats;
    this._hall = hall;
    this._movie = movie;
    this._cinema = cinema;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get seats(): Map<string, boolean> {
    return this._seats;
  }

  set seats(value: Map<string, boolean>) {
    this._seats = value;
  }

  get hall(): string {
    return this._hall;
  }

  set hall(value: string) {
    this._hall = value;
  }

  get movie(): string {
    return this._movie;
  }

  set movie(value: string) {
    this._movie = value;
  }

  get cinema(): string {
    return this._cinema;
  }

  set cinema(value: string) {
    this._cinema = value;
  }
}
