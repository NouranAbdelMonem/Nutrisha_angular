import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-header',
  templateUrl: './details-header.component.html',
  styleUrls: ['./details-header.component.scss'],
})
export class DetailsHeaderComponent implements OnInit {
  @Input() headerTitle: string;

  constructor() {}

  ngOnInit(): void {}
}
