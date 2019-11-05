export class AvailableSessionsModel {
  private _id: string;
  private _seats: Map<number, boolean>;
  private _hall: string;
  private _movie: string;
  
  constructor(id: string, seats: Map<number, boolean>, hall: string, movie: string) {
    this._id = id;
    this._seats = seats;
    this._hall = hall;
    this._movie = movie;
  }
  
  get id(): string {
    return this._id;
  }
  
  set id(value: string) {
    this._id = value;
  }
  
  get seats(): Map<number, boolean> {
    return this._seats;
  }
  
  set seats(value: Map<number, boolean>) {
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
}
