import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  DayOfWeek,
  DayOfWeekKeys,
} from '../../../core/shared/models/day-of-week';

@Component({
  selector: 'app-day-of-week-tabs',
  templateUrl: './day-of-week-tabs.component.html',
  styleUrls: ['./day-of-week-tabs.component.scss'],
})
export class DayOfWeekTabsComponent implements OnInit {
  @Input()
  set selectedDay(value: DayOfWeek) {
    this._selectedDay = value;
  }

  @Output() selectedDayChange = new EventEmitter<DayOfWeek>();

  _selectedDay: DayOfWeek;
  dayOfWeek = DayOfWeek;
  dayOfWeekKeys = DayOfWeekKeys;
  constructor() {}

  ngOnInit(): void {}
}
