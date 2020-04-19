import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {NavigationComponent} from './navigation/navigation.component';
import {BookingPageComponent} from './booking-page/booking-page.component';
import {DataService} from './shared/service/data.service';
import {NavigationService} from './shared/service/navigation.service';
import {NgbActiveModal, NgbModal, NgbModalConfig, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DynamicDataTableComponent } from './dynamic-data-table/dynamic-data-table.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    BookingPageComponent,
    DynamicDataTableComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [
    DataService,
    NavigationService,
    NgbModalConfig,
    NgbModal,
    NgbActiveModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
