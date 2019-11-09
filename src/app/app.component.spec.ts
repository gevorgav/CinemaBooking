import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {BookingPageComponent} from './booking-page/booking-page.component';
import {NgbModal, NgbModalConfig, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavigationService} from './shared/service/navigation.service';
import {DataService} from './shared/service/data.service';
import {DynamicDataTableComponent} from './dynamic-data-table/dynamic-data-table.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
      ],
      declarations: [
        AppComponent,
        NavigationComponent,
        BookingPageComponent,
        DynamicDataTableComponent
      ],
      providers: [
        NgbModal,
        NgbModalConfig,
        NavigationService,
        DataService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
