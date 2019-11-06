import {Component} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs/internal/Observable';
import {DataService} from './shared/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // public cinema = firebase.database().ref('/cinema');
  public title = 'cinema-booking';
  public hall: Observable<any>;
  public navTree: Observable<any>;

  constructor(db: AngularFirestore, private dataService: DataService) {
    // this.cinema.child('hall').once('value').then(res => {
    //   console.log(res);
    // });
    dataService.getCinemas().subscribe(res => {
      console.log(res);
    });
    dataService.getHallsByCinemaId('3iO3E9Q5F081tP8kJFYt').subscribe(res => {
      console.log(res);
    });
    dataService.getMoviesByCinemaHallIds('3iO3E9Q5F081tP8kJFYt', '5WUb4GnFySxbw2YEqyLX').subscribe(res => {
      console.log(res);
    });
    dataService.getAvailableSessions('3iO3E9Q5F081tP8kJFYt', '5WUb4GnFySxbw2YEqyLX', 'vsnGpeNUEO64HUZ2RPP4')
      .subscribe(res => console.log(res));


    db.collection('hall').get().subscribe(res => {
      res.query.where('cinema', '==', db.collection('cinema').doc('3iO3E9Q5F081tP8kJFYt').ref).get().then(result => {
        result.forEach(value => {
          // console.log(value.data());
        });
      });
    });
    // parent.collection('cinema').doc('3iO3E9Q5F081tP8kJFYt').onSnapshot((snapshot: DocumentSnapshot) => {
    //   console.log(snapshot);
    // });
    // this.navTree.subscribe((res) => {
    //   console.log(res);
    // });
  }
}
