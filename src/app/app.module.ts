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


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    BookingPageComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [
    DataService,
    NavigationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
