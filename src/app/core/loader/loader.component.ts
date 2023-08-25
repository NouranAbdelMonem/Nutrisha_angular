import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ display: '', opacity: '0' }),
        animate(800, style({ opacity: '1' })),
      ]),
      transition(':leave', [
        style({ opacity: '1' }),
        animate(800, style({ opacity: '0' })),
      ]),
    ]),
  ],
})
export class LoaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
