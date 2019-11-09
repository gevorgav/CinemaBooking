import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BookingPageComponent} from './booking-page.component';
import {NgbModal, NgbModalConfig, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AppComponent} from '../app.component';
import {NavigationComponent} from '../navigation/navigation.component';
import {DynamicDataTableComponent} from '../dynamic-data-table/dynamic-data-table.component';
import {NavigationService} from '../shared/service/navigation.service';
import {DataService} from '../shared/service/data.service';
import {CinemaModel} from '../shared/model/cinema.model';
import {HallModel} from '../shared/model/hall.model';
import {MovieModel} from '../shared/model/movie.model';
import {of} from 'rxjs/internal/observable/of';
import {AvailableSessionsModel} from '../shared/model/available-sessions.model';

describe('BookingPageComponent', () => {
  let component: BookingPageComponent;
  let fixture: ComponentFixture<BookingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
      ],
      declarations: [
        BookingPageComponent,
        DynamicDataTableComponent
      ],
      providers: [
        NgbModal,
        NgbModalConfig,
        NavigationService,
        DataService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingPageComponent);
    component = fixture.componentInstance;

    component.navigationFields = {
      cinema: new CinemaModel('2', 'cinema 2'),
      hall: new HallModel('3', 'hall 2', 32, '2'),
      movie: new MovieModel('3', 'Movie 3')
    };

    component.availableSessions = of([new AvailableSessionsModel('1', new Map<string, boolean>(), '2', '3', '4', 5515646544111)]);

    component.seatsCount = component.navigationFields.hall.seatsCount;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'cinema-booking'`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('QUICK BOOK');
  });

  it(`should have right seats count`, () => {
    const canvas: HTMLElement  = document.getElementById('seatsId') as HTMLElement;
    expect(component.navigationFields.hall.seatsCount.toString()).toEqual(canvas.innerText.slice(0, 2));
  });
});
