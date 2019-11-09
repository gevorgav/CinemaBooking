import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AvailableSessionsModel} from '../shared/model/available-sessions.model';
import {TableConfig} from '../shared/model/table-config.interface';

@Component({
  selector: 'app-dynamic-data-table',
  templateUrl: './dynamic-data-table.component.html',
  styleUrls: ['./dynamic-data-table.component.css']
})
/**
 * Configurable dynamic table component, its depending on the count of seats and tdLength(count of column)
 */
export class DynamicDataTableComponent implements OnInit {

  @Input() selectedSession: AvailableSessionsModel;
  @Input() tableConfig: TableConfig;

  @Output() cellClick = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit() {
  }

  getStatus(tr: number, td: number): boolean {
    const key = this.getKey(tr, td);
    return !!this.selectedSession.seats.get(key + '');
  }

  getKey(tr: number, td: number) {
    return tr * this.tableConfig.tdLength.length + td + 1;
  }

  onClickCell(trIndex: number, tdIndex: number) {
    const key = this.getKey(trIndex, tdIndex);
    this.cellClick.emit(key);
  }
}
