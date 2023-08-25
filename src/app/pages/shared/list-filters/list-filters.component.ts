import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-list-filters',
  templateUrl: './list-filters.component.html',
  styleUrls: ['./list-filters.component.scss']
})
export class ListFiltersComponent implements OnInit {


  @Input() searchTerm = new Subject<string>();
  // @Output() searchTermChange = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

}
