import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-no-data-placeholder',
  templateUrl: './no-data-placeholder.component.html',
  styleUrls: ['./no-data-placeholder.component.scss']
})
export class NoDataPlaceholderComponent implements OnInit {

  @Input() data: any[];

  @Input() classes: string;
  constructor() { }

  ngOnInit(): void {
  }

}
