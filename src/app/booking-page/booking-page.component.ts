import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavigationService} from '../shared/service/navigation.service';
import {NavigationFields} from '../shared/model/navigator.interface';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../shared/service/data.service';
import {Observable} from 'rxjs/internal/Observable';
import {AvailableSessionsModel} from '../shared/model/available-sessions.model';
import {TableConfig} from '../shared/model/table-config.interface';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css']
})
export class BookingPageComponent implements OnInit {
  public title = 'QUICK BOOK';

  /**
   * navigationFields its get when you navigate
   */
  public navigationFields: NavigationFields;
  public availableSessions: Observable<AvailableSessionsModel[]>;
  public activate;
  public seatsCount: number;
  public selectedSession: AvailableSessionsModel;

  /**
   * tdLength is column length in dataTable
   */
  public tdLength = 8;
  /**
   * Its configuration object for dataTable
   */
  public tableConfig: TableConfig;

  public statusChangeMessage = ' ';
  public selectedKey: number;
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
          this.tableConfig = {
            trCount: new Array(Math.ceil(this.seatsCount / 8)),
            tdLength: new Array(this.tdLength),
            lastTdCount: new Array(this.seatsCount % 8)
          };
          this.initAvailableSessions();
        }
      );
  }

  private initAvailableSessions() {
    this.availableSessions = this.dataService.getAvailableSessions(this.navigationFields.cinema.id,
      this.navigationFields.hall.id, this.navigationFields.movie.id);
  }


  showModal(key: number) {
    this.selectedKey = key;
    this.statusChangeMessage = !!this.selectedSession.seats.get(key + '') ? 'Cancel your booking' : 'Booking';
    this.modalService.open(this.modal);
  }

  selectSession(i: number, availableSession: AvailableSessionsModel) {
    this.activate = i;
    this.selectedSession = availableSession;
  }

  /**
   * Booking logic
   */
  bookingSeat() {
    const timeNow = new Date();
    if (timeNow.getTime() - this.selectedSession.startDateMilliseconds > 300000) {
      this.saveSuccess = false;
      this.saveMessage = 'You can\'t book a seat after less than 5 minutes left before the session.';
    } else {
      const status = this.selectedSession.seats.get(this.selectedKey + '');
      if (!status) {
        this.selectedSession.seats.set(this.selectedKey + '', !status);
      } else {
        this.selectedSession.seats.delete(this.selectedKey + '');
      }
      this.saveBookedSeat(this.selectedSession);
    }
  }

  getAvailableSeats(availableSession: AvailableSessionsModel) {
    return this.seatsCount - availableSession.seats.size;
  }

  /**
   * Data to save
   * @param availableSession
   */
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
