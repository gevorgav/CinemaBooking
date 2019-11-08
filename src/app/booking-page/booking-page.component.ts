import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavigationService} from '../shared/service/navigation.service';
import {NavigationFields} from '../shared/model/navigator.interface';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../shared/service/data.service';
import {Observable} from 'rxjs/internal/Observable';
import {AvailableSessionsModel} from '../shared/model/available-sessions.model';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css']
})
export class BookingPageComponent implements OnInit {

  public navigationFields: NavigationFields;
  public availableSessions: Observable<AvailableSessionsModel[]>;
  public activate;
  public seatsCount: number;
  public selectedSession: AvailableSessionsModel;
  public trCount = [];
  public tdLength = 8;
  public tdCount = new Array(this.tdLength);
  public lastTdCount = [];
  public statusChangeMessage = ' ';
  public selectedLocation: { tr: number, td: number };
  public saveSuccess: boolean;
  public saveMessage: string;

  @ViewChild('modal', {static: true}) modal: ElementRef;

  constructor(private modalService: NgbModal,
              private config: NgbModalConfig,
              private navigationService: NavigationService,
              private dataService: DataService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.navigationService.navigate
      .subscribe(res => {
          this.navigationFields = res;
          this.seatsCount = this.navigationFields.hall.seatsCount;
          this.trCount = new Array(Math.ceil(this.seatsCount / 8));
          this.lastTdCount = new Array(this.seatsCount % 8);
          this.initAvailableSessions();
        }
      );
  }

  private initAvailableSessions() {
    this.availableSessions = this.dataService.getAvailableSessions(this.navigationFields.cinema.id,
      this.navigationFields.hall.id, this.navigationFields.movie.id);
  }

  showModal(tr: any, td: any) {
    const status = this.getStatus(tr, td);
    this.selectedLocation = {tr, td};
    this.statusChangeMessage = status ? 'Cancel your booking' : 'Booking';
    this.modalService.open(this.modal);
  }

  selectSession(i: number, availableSession: AvailableSessionsModel) {
    this.activate = i;
    this.selectedSession = availableSession;
  }

  getStatus(tr: number, td: number): boolean {
    const key = this.getKey(tr, td);
    return !!this.selectedSession.seats.get(key + '');
  }

  getKey(tr: number, td: number) {
    return tr * this.tdLength + td + 1;
  }

  bookingSeat() {
    const timeNow = new Date();
    if (timeNow.getTime() - this.selectedSession.startDateMilliseconds > 300000) {
      this.saveSuccess = false;
      this.saveMessage = 'You can\'t book a seat after less than 5 minutes left before the session.';
    } else {
      const status = this.getStatus(this.selectedLocation.tr, this.selectedLocation.td);
      const selectedKey = this.getKey(this.selectedLocation.tr, this.selectedLocation.td);
      if (!status) {
        this.selectedSession.seats.set(selectedKey + '', !status);
      } else {
        this.selectedSession.seats.delete(selectedKey + '');
      }
      this.saveBookedSeat(this.selectedSession);
    }
  }

  getAvailableSeats(availableSession: AvailableSessionsModel) {
    return this.seatsCount - availableSession.seats.size;
  }

  private saveBookedSeat(availableSession: AvailableSessionsModel) {
    this.dataService.saveSeats(availableSession).subscribe(res => {
      if (res) {
        this.saveSuccess = true;
        this.saveMessage = 'You had successfully booked/to free a seat.';
      } else {
        this.saveSuccess = false;
        this.saveMessage = 'Sorry something went wrong.';
      }
    });
  }
}
