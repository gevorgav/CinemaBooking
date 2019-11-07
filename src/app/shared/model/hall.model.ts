import {Navigator} from './navigator.interface';

export class HallModel implements Navigator {
  private _id: string;
  private _name: string;
  private _seatsCount: number;
  private _cinemaId: string;

  constructor(id: string, name: string, seatsCount: number, cinemaId: string) {
    this._id = id;
    this._name = name;
    this._cinemaId = cinemaId;
    this._seatsCount = seatsCount;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get cinemaId(): string {
    return this._cinemaId;
  }

  set cinemaId(value: string) {
    this._cinemaId = value;
  }

  get seatsCount(): number {
    return this._seatsCount;
  }

  set seatsCount(value: number) {
    this._seatsCount = value;
  }
}
