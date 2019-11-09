import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {DynamicDataTableComponent} from '../dynamic-data-table/dynamic-data-table.component';
import {NavigationService} from '../shared/service/navigation.service';
import {DataService} from '../shared/service/data.service';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
      ],
      declarations: [
        NavigationComponent,
        DynamicDataTableComponent
      ],
      providers: [
        NavigationService,
        DataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
