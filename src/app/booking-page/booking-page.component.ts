import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../shared/service/navigation.service';
import {NavigationFields} from '../shared/model/navigator.interface';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css']
})
export class BookingPageComponent implements OnInit {

  public navigationFields: NavigationFields;

  constructor(private navigationService: NavigationService) {
  }

  ngOnInit() {
    this.navigationService.navigate.subscribe(res => {
      this.navigationFields = res;
    });
  }

}
