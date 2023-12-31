import { Component, OnInit } from '@angular/core';
import { SplashScreenService } from '../../../core/shared';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent implements OnInit {
  // The screen starts with the maximum opacity
  public opacityChange = 1;
  public splashTransition;
  // First access the splash is visible
  public showSplash = true;
  readonly ANIMATION_DURATION = 1;

  constructor(private splashScreenStateService: SplashScreenService) {}

  ngOnInit(): void {}

  private hideSplashAnimation() {
    // Setting the transition
    this.splashTransition = `opacity ${this.ANIMATION_DURATION}s`;
    this.opacityChange = 0;
    setTimeout(() => {
      // After the transition is ended the showSplash will be hided
      this.showSplash = !this.showSplash;
    }, 1000);
  }
}
