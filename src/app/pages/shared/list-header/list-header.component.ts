import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss']
})
export class ListHeaderComponent implements OnInit {

  @Input() permissions: string | string[] = '';
  @Input() headerTitle: string;
  @Input() withAddButton;
  @Input() searchTerm = new Subject<string>();

  @Output() addClicked = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
