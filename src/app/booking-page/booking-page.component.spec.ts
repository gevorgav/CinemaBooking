import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {BookingPageComponent} from './booking-page.component';
import {NgbModal, NgbModalConfig, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {DynamicDataTableComponent} from '../dynamic-data-table/dynamic-data-table.component';
import {NavigationService} from '../shared/service/navigation.service';
import {CinemaModel} from '../shared/model/cinema.model';
import {HallModel} from '../shared/model/hall.model';
import {MovieModel} from '../shared/model/movie.model';
import {MockDataService} from '../shared/service/mock-service/mock-data.service';
import {DataService} from '../shared/service/data.service';


declare global {
  namespace jasmine {
    interface Matchers<T> {
      toBeOlderThan(expected: any, expectationFailOutput?: any): boolean;
    }
  }
}


describe('BookingPageComponent', () => {
  let component: BookingPageComponent;
  let fixture: ComponentFixture<BookingPageComponent>;
  let dataService: Partial<DataService>;

  let age = 5;

  beforeEach(async(() => {

    jasmine.addMatchers({
      toBeOlderThan: function () {
        return {
          compare: function (actualAge, expectAge) {
            var result = {pass: false, message: ''};
            if (actualAge > expectAge) {
              result.pass = true;
              result.message = 'test is passed';
            } else {
              result.pass = false;
              result.message = 'test fails';
            }
            return result;
          }
        };
      }
    });

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
        {provide: DataService, useClass: MockDataService}
      ]
    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingPageComponent);
    component = fixture.componentInstance;

    dataService = TestBed.get(DataService);

    component.navigationFields = {
      cinema: new CinemaModel('2', 'cinema 2'),
      hall: new HallModel('3', 'hall 2', 29, '2'),
      movie: new MovieModel('3', 'Movie 3')
    };

    component.availableSessions = dataService.getAvailableSessions('c2', 'h1', 'm1');

    component.seatsCount = component.navigationFields.hall.seatsCount;

    fixture.detectChanges();
  });

  it('check before aftereach method', () => {
    expect(age).toEqual(106);
  });

  it('after aftereach method', () => {
    expect(age).toBeOlderThan(100);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'cinema-booking'`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('QUICK BOOK');
  });

  it('case foo with null ', function () {
    let result =  component.foo(null, null, null);
    expect(result).toEqual(0);
  });

  it('case foo with null ', function () {
    let result =  component.foo(null, null, null);
    expect(result).toEqual(0);
  });

  it(`should have right seats count`, inject([DataService], (dataService) => {
    dataService.getAvailableSessions().subscribe(result => {
      const canvas: HTMLElement = document.getElementById('seatsId') as HTMLElement;
      const busySeatsCount = result[0].seats.size;
      expect((component.navigationFields.hall.seatsCount - busySeatsCount).toString()).toBe(canvas.innerText.slice(0, 2));
    });
  }));

  afterEach( () => {
    age = 106;
  });

});
