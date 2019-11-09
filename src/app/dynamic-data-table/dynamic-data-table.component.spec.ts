import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DynamicDataTableComponent} from './dynamic-data-table.component';
import {AvailableSessionsModel} from '../shared/model/available-sessions.model';

describe('DynamicDataTableComponent', () => {
  let component: DynamicDataTableComponent;
  let fixture: ComponentFixture<DynamicDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DynamicDataTableComponent
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDataTableComponent);
    component = fixture.componentInstance;

    component.selectedSession = new AvailableSessionsModel('1', new Map<string, boolean>(), '2', '3', '4', 5515646544111);

    component.tableConfig = {
      trCount: new Array(4),
      tdLength: new Array(8),
      lastTdCount: Array()
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
