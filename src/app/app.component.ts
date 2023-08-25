import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslationService, SplashScreenService } from './core/shared';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private _unsubscribe = new Subject<void>();

  constructor(
    private store: Store,
    public translationService: TranslationService,
    private splashScreenService: SplashScreenService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.splashScreenService.hide();
    }, 5000);

    this.translationService.initializeLanguage(
      this.translationService.getSelectedLanguage()
    );
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
