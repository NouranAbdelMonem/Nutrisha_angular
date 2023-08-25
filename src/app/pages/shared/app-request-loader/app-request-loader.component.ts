import { Component } from '@angular/core';
import { RequestLoaderService } from '../../../core/shared';

@Component({
  selector: 'app-app-request-loader',
  templateUrl: './app-request-loader.component.html',
  styleUrls: ['./app-request-loader.component.scss'],
})
export class AppRequestLoaderComponent {
  constructor(public requestLoadingService: RequestLoaderService) {}
}
